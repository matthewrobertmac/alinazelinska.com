from fastapi import APIRouter, HTTPException, Request, UploadFile, File
from datetime import datetime, timezone
import uuid
import base64
import os
import hashlib
from pydantic import BaseModel

router = APIRouter(prefix="/users", tags=["users"])

db = None

def set_db(database):
    global db
    db = database


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


async def get_current_user(request: Request):
    """Helper to get current user from session"""
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
    
    # Check expiry
    expires_at = datetime.fromisoformat(session["expires_at"])
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    
    return user


@router.get("/profile")
async def get_profile(request: Request):
    """Get current user's profile"""
    user = await get_current_user(request)
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "name": user["name"],
        "picture": user.get("picture"),
        "language_learning": user.get("language_learning"),
        "timezone": user.get("timezone"),
        "role": user["role"],
        "auth_provider": user.get("auth_provider"),
        "created_at": user.get("created_at")
    }


@router.put("/profile")
async def update_profile(request: Request):
    """Update user profile"""
    user = await get_current_user(request)
    body = await request.json()
    
    update_data = {}
    
    if "name" in body:
        update_data["name"] = body["name"]
    if "language_learning" in body:
        update_data["language_learning"] = body["language_learning"]
    if "timezone" in body:
        update_data["timezone"] = body["timezone"]
    
    if update_data:
        update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
        await db.users.update_one(
            {"user_id": user["user_id"]},
            {"$set": update_data}
        )
    
    updated_user = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0})
    return {
        "user_id": updated_user["user_id"],
        "email": updated_user["email"],
        "name": updated_user["name"],
        "picture": updated_user.get("picture"),
        "language_learning": updated_user.get("language_learning"),
        "timezone": updated_user.get("timezone"),
        "role": updated_user["role"]
    }


@router.post("/profile/picture")
async def upload_profile_picture(request: Request, file: UploadFile = File(...)):
    """Upload profile picture"""
    user = await get_current_user(request)
    
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Use JPEG, PNG, WebP, or GIF")
    
    # Read file and convert to base64
    contents = await file.read()
    
    # Limit file size (2MB)
    if len(contents) > 2 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 2MB")
    
    # Store as base64 data URL
    base64_data = base64.b64encode(contents).decode("utf-8")
    picture_url = f"data:{file.content_type};base64,{base64_data}"
    
    await db.users.update_one(
        {"user_id": user["user_id"]},
        {"$set": {
            "picture": picture_url,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"picture": picture_url}


@router.get("/notifications")
async def get_notifications(request: Request):
    """Get user's notifications"""
    user = await get_current_user(request)
    
    notifications = await db.notifications.find(
        {"user_id": user["user_id"]},
        {"_id": 0}
    ).sort("created_at", -1).to_list(50)
    
    return notifications


@router.put("/notifications/{notification_id}/read")
async def mark_notification_read(notification_id: str, request: Request):
    """Mark a notification as read"""
    user = await get_current_user(request)
    
    result = await db.notifications.update_one(
        {"notification_id": notification_id, "user_id": user["user_id"]},
        {"$set": {"read": True}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found")
    
    return {"message": "Marked as read"}


@router.get("/bookings")
async def get_user_bookings(request: Request):
    """Get user's booking history"""
    user = await get_current_user(request)
    
    bookings = await db.bookings.find(
        {"user_id": user["user_id"]},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    return bookings


@router.post("/change-password")
async def change_password(password_request: ChangePasswordRequest, request: Request):
    """Change user password (for email/password auth users only)"""
    user = await get_current_user(request)
    
    # Check if user uses email/password auth
    if user.get("auth_provider") != "email":
        raise HTTPException(
            status_code=400, 
            detail="Password change is only available for email/password accounts"
        )
    
    # Verify current password
    current_password_hash = hash_password(password_request.current_password)
    if user.get("password_hash") != current_password_hash:
        raise HTTPException(status_code=401, detail="Current password is incorrect")
    
    # Validate new password
    if len(password_request.new_password) < 6:
        raise HTTPException(status_code=400, detail="New password must be at least 6 characters")
    
    # Update password
    new_password_hash = hash_password(password_request.new_password)
    await db.users.update_one(
        {"user_id": user["user_id"]},
        {"$set": {
            "password_hash": new_password_hash,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"message": "Password changed successfully"}
