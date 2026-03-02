from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
import uuid


class BookingStatus:
    PENDING = "pending"
    APPROVED = "approved"
    DENIED = "denied"
    RESCHEDULED = "rescheduled"
    COMPLETED = "completed"
    REFUNDED = "refunded"


class Booking(BaseModel):
    booking_id: str = Field(default_factory=lambda: f"book_{uuid.uuid4().hex[:12]}")
    user_id: str
    user_email: str
    user_name: str
    package_id: str
    package_name: str
    amount: float
    currency: str = "usd"
    stripe_session_id: Optional[str] = None
    payment_status: str = "pending"  # pending, paid, refunded
    booking_status: str = BookingStatus.PENDING
    admin_notes: Optional[str] = None
    suggested_datetime: Optional[str] = None  # Admin can suggest reschedule
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class BookingUpdate(BaseModel):
    booking_status: Optional[str] = None
    admin_notes: Optional[str] = None
    suggested_datetime: Optional[str] = None


class Notification(BaseModel):
    notification_id: str = Field(default_factory=lambda: f"notif_{uuid.uuid4().hex[:12]}")
    user_id: str
    booking_id: str
    title: str
    message: str
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
