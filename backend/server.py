from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, 
    CheckoutSessionRequest, 
    CheckoutSessionResponse,
    CheckoutStatusResponse
)

# Import route modules
from routes import auth as auth_routes
from routes import users as user_routes
from routes import admin as admin_routes
from utils.email_service import send_booking_created_email


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Set database for route modules
auth_routes.set_db(db)
user_routes.set_db(db)
admin_routes.set_db(db)

# Stripe configuration
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')

# Lesson packages - prices in EUR (base currency)
LESSON_PACKAGES = {
    "trial": {
        "name": "Trial Lesson",
        "price": 15.00,
        "currency": "eur",
        "description": "30-minute trial lesson"
    },
    "standard": {
        "name": "Standard Lesson",
        "price": 30.00,
        "currency": "eur",
        "description": "60-minute standard lesson"
    },
    "intensive": {
        "name": "Intensive Pack",
        "price": 120.00,
        "currency": "eur",
        "description": "5 x 60-minute lessons package"
    }
}

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Payment Models
class CheckoutRequest(BaseModel):
    package_id: str
    origin_url: str
    email: Optional[str] = None
    user_id: Optional[str] = None
    user_name: Optional[str] = None

class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    package_id: str
    package_name: str
    amount: float
    currency: str
    status: str = "pending"
    payment_status: str = "pending"
    email: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# Payment Endpoints
@api_router.post("/payments/checkout/session")
async def create_checkout_session(request: CheckoutRequest, http_request: Request):
    """Create a Stripe checkout session for lesson booking"""
    
    # Validate package
    if request.package_id not in LESSON_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid package selected")
    
    package = LESSON_PACKAGES[request.package_id]
    
    # Initialize Stripe checkout
    host_url = str(http_request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    # Build success and cancel URLs dynamically from frontend origin
    success_url = f"{request.origin_url}/booking?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{request.origin_url}/booking"
    
    # Create checkout session with card + crypto support
    checkout_request = CheckoutSessionRequest(
        amount=package["price"],
        currency=package["currency"],
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "package_id": request.package_id,
            "package_name": package["name"],
            "email": request.email or ""
        },
        payment_methods=["card", "crypto"]  # Enable both card and crypto payments
    )
    
    try:
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record
        transaction = PaymentTransaction(
            session_id=session.session_id,
            package_id=request.package_id,
            package_name=package["name"],
            amount=package["price"],
            currency=package["currency"],
            email=request.email,
            status="initiated",
            payment_status="pending"
        )
        
        await db.payment_transactions.insert_one(transaction.model_dump())
        
        # Create booking record if user is authenticated
        if request.user_id:
            booking = {
                "booking_id": f"book_{uuid.uuid4().hex[:12]}",
                "user_id": request.user_id,
                "user_email": request.email or "",
                "user_name": request.user_name or "",
                "package_id": request.package_id,
                "package_name": package["name"],
                "amount": package["price"],
                "currency": package["currency"],
                "stripe_session_id": session.session_id,
                "payment_status": "pending",
                "booking_status": "pending",
                "admin_notes": None,
                "suggested_datetime": None,
                "created_at": datetime.now(timezone.utc).isoformat(),
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
            await db.bookings.insert_one(booking)
        
        return {"url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        logger.error(f"Error creating checkout session: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/payments/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, http_request: Request):
    """Get the status of a checkout session and update database"""
    
    # Initialize Stripe checkout
    host_url = str(http_request.base_url)
    webhook_url = f"{host_url}api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update transaction in database
        update_data = {
            "status": status.status,
            "payment_status": status.payment_status,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": update_data}
        )
        
        # Also update booking payment status if exists
        if status.payment_status == "paid":
            await db.bookings.update_one(
                {"stripe_session_id": session_id},
                {"$set": {"payment_status": "paid", "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
        
        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency,
            "metadata": status.metadata
        }
        
    except Exception as e:
        logger.error(f"Error getting checkout status: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature", "")
        
        host_url = str(request.base_url)
        webhook_url = f"{host_url}api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Update transaction based on webhook event
        if webhook_response.session_id:
            update_data = {
                "payment_status": webhook_response.payment_status,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
            
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": update_data}
            )
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@api_router.get("/payments/packages")
async def get_packages():
    """Get available lesson packages"""
    return LESSON_PACKAGES


# PayPal Booking Model
class PayPalBookingRequest(BaseModel):
    package_id: str
    user_id: Optional[str] = None
    user_name: str = "PayPal Customer"
    user_email: str = ""
    payment_method: str = "paypal"
    amount: float


@api_router.post("/bookings/create")
async def create_booking(request: PayPalBookingRequest):
    """Create a booking record for PayPal payments"""
    
    if request.package_id not in LESSON_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid package")
    
    package = LESSON_PACKAGES[request.package_id]
    
    booking = {
        "booking_id": f"book_{uuid.uuid4().hex[:12]}",
        "user_id": request.user_id or f"guest_{uuid.uuid4().hex[:8]}",
        "user_email": request.user_email,
        "user_name": request.user_name,
        "package_id": request.package_id,
        "package_name": package["name"],
        "amount": request.amount,
        "currency": "eur",
        "payment_method": request.payment_method,
        "stripe_session_id": None,
        "payment_status": "pending_verification",  # Manual verification needed for PayPal
        "booking_status": "pending",
        "admin_notes": "Payment via PayPal - please verify payment received",
        "suggested_datetime": None,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.bookings.insert_one(booking)
    
    # Send confirmation email to user and notification to admin
    try:
        await send_booking_created_email(
            user_email=request.user_email,
            user_name=request.user_name,
            booking_details={
                "booking_id": booking["booking_id"],
                "package_name": package["name"],
                "amount": request.amount,
                "currency": "EUR"
            }
        )
    except Exception as e:
        logger.error(f"Failed to send booking email: {str(e)}")
        # Don't fail the request if email fails
    
    return {"booking_id": booking["booking_id"], "status": "created"}

# Include all routers
app.include_router(api_router)
app.include_router(auth_routes.router, prefix="/api")
app.include_router(user_routes.router, prefix="/api")
app.include_router(admin_routes.router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    # Initialize admin user
    await auth_routes.init_admin_user()
    logger.info("Admin user initialized")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()