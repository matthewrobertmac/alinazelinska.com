from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, timezone
import uuid


class UserBase(BaseModel):
    email: str
    name: str
    picture: Optional[str] = None
    language_learning: Optional[str] = None  # ukrainian, russian, english
    timezone: Optional[str] = "UTC"
    

class UserCreate(UserBase):
    password: Optional[str] = None  # None for Google OAuth users


class User(UserBase):
    user_id: str = Field(default_factory=lambda: f"user_{uuid.uuid4().hex[:12]}")
    role: str = "user"  # user or admin
    auth_provider: str = "email"  # email or google
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class UserSession(BaseModel):
    session_id: str = Field(default_factory=lambda: f"sess_{uuid.uuid4().hex}")
    user_id: str
    session_token: str
    expires_at: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class UserProfile(BaseModel):
    name: Optional[str] = None
    picture: Optional[str] = None
    language_learning: Optional[str] = None
    timezone: Optional[str] = None
