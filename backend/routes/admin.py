from fastapi import APIRouter, HTTPException, Request
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel
import logging

# Import email service
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.email_service import send_booking_status_email

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["admin"])

db = None

def set_db(database):
    global db
    db = database


class BookingUpdateRequest(BaseModel):
    booking_status: str  # approved, denied, rescheduled
    admin_notes: Optional[str] = None
    suggested_datetime: Optional[str] = None


async def require_admin(request: Request):
    """Check if user is admin"""
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    session = await db.user_sessions.find_one({"session_token": session_token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return user


@router.get("/bookings")
async def get_all_bookings(request: Request, status: Optional[str] = None):
    """Get all bookings (admin only)"""
    await require_admin(request)
    
    query = {}
    if status:
        query["booking_status"] = status
    
    bookings = await db.bookings.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).to_list(500)
    
    return bookings


@router.get("/bookings/stats")
async def get_booking_stats(request: Request):
    """Get booking statistics (admin only)"""
    await require_admin(request)
    
    total = await db.bookings.count_documents({})
    pending = await db.bookings.count_documents({"booking_status": "pending"})
    approved = await db.bookings.count_documents({"booking_status": "approved"})
    denied = await db.bookings.count_documents({"booking_status": "denied"})
    completed = await db.bookings.count_documents({"booking_status": "completed"})
    
    # Calculate revenue
    revenue_cursor = db.bookings.find({"payment_status": "paid", "booking_status": {"$ne": "refunded"}})
    revenue = 0
    async for booking in revenue_cursor:
        revenue += booking.get("amount", 0)
    
    return {
        "total": total,
        "pending": pending,
        "approved": approved,
        "denied": denied,
        "completed": completed,
        "revenue": revenue
    }


@router.put("/bookings/{booking_id}")
async def update_booking(booking_id: str, update: BookingUpdateRequest, request: Request):
    """Update booking status (admin only)"""
    admin = await require_admin(request)
    
    # Get the booking
    booking = await db.bookings.find_one({"booking_id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    update_data = {
        "booking_status": update.booking_status,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    if update.admin_notes:
        update_data["admin_notes"] = update.admin_notes
    
    if update.suggested_datetime:
        update_data["suggested_datetime"] = update.suggested_datetime
    
    # If denied and payment was made, mark for refund
    if update.booking_status == "denied" and booking.get("payment_status") == "paid":
        update_data["payment_status"] = "refund_pending"
    
    await db.bookings.update_one(
        {"booking_id": booking_id},
        {"$set": update_data}
    )
    
    # Create notification for user
    status_messages = {
        "approved": "Your lesson booking has been approved!",
        "denied": "Your lesson booking was not approved. A refund will be processed.",
        "rescheduled": f"Alina has suggested rescheduling your lesson to: {update.suggested_datetime or 'a new time'}.",
        "completed": "Your lesson has been marked as completed. Thank you!"
    }
    
    notification = {
        "notification_id": f"notif_{datetime.now(timezone.utc).timestamp()}",
        "user_id": booking["user_id"],
        "booking_id": booking_id,
        "title": f"Booking {update.booking_status.capitalize()}",
        "message": status_messages.get(update.booking_status, f"Your booking status changed to: {update.booking_status}"),
        "read": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    if update.admin_notes:
        notification["message"] += f" Note from Alina: {update.admin_notes}"
    
    await db.notifications.insert_one(notification)
    
    # Get updated booking
    updated_booking = await db.bookings.find_one({"booking_id": booking_id}, {"_id": 0})
    
    # Send email notification to user about status change
    try:
        await send_booking_status_email(
            user_email=booking["user_email"],
            user_name=booking["user_name"],
            status=update.booking_status,
            booking_details={
                "booking_id": booking_id,
                "package_name": booking.get("package_name", "N/A"),
                "amount": booking.get("amount", 0),
                "currency": booking.get("currency", "EUR")
            },
            admin_notes=update.admin_notes
        )
    except Exception as e:
        logger.error(f"Failed to send status update email: {str(e)}")
        # Don't fail the request if email fails
    
    return updated_booking


@router.get("/users")
async def get_all_users(
    request: Request,
    limit: int = 100,  # Default limit
    skip: int = 0      # Pagination offset
):
    """Get all users with pagination (admin only)"""
    await require_admin(request)
    
    # Limit maximum results to 100 for performance
    limit = min(limit, 100)
    
    users = await db.users.find(
        {},
        {"_id": 0, "password_hash": 0}
    ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    
    # Get total count for pagination
    total_count = await db.users.count_documents({})
    
    return {
        "users": users,
        "total": total_count,
        "limit": limit,
        "skip": skip
    }


@router.get("/users/{user_id}")
async def get_user_details(user_id: str, request: Request):
    """Get user details with their bookings (admin only)"""
    await require_admin(request)
    
    user = await db.users.find_one({"user_id": user_id}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    bookings = await db.bookings.find(
        {"user_id": user_id},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    return {
        "user": user,
        "bookings": bookings
    }
