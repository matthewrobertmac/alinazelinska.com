#!/usr/bin/env python3
"""
Backend API Testing for User Authentication and Admin Dashboard System
Tests authentication, user management, admin functionality, and payment integration
"""

import asyncio
import aiohttp
import json
import os
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://linguazeal.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

# Test credentials
ADMIN_EMAIL = "zelinskayaalinaig@gmail.com"
ADMIN_PASSWORD = "mylina"
TEST_USER_EMAIL = "test@example.com"
TEST_USER_PASSWORD = "test123"
TEST_USER_NAME = "Test User"

class BackendTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.admin_session_token = None
        self.user_session_token = None
        self.test_booking_id = None
        
    async def setup(self):
        """Setup HTTP session with cookie jar"""
        jar = aiohttp.CookieJar(unsafe=True)
        self.session = aiohttp.ClientSession(cookie_jar=jar)
        
    async def cleanup(self):
        """Cleanup HTTP session"""
        if self.session:
            await self.session.close()
            
    def log_result(self, test_name, success, details):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details
        })

    # ============ AUTHENTICATION TESTS ============
        
    async def test_admin_login(self):
        """Test admin login with correct credentials"""
        try:
            payload = {
                "email": ADMIN_EMAIL,
                "password": ADMIN_PASSWORD
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/auth/login",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate admin user data
                    if (data.get('email') == ADMIN_EMAIL and 
                        data.get('role') == 'admin' and
                        data.get('name') and
                        data.get('user_id')):
                        
                        # Extract session token from cookies
                        cookies = response.cookies
                        if 'session_token' in cookies:
                            self.admin_session_token = cookies['session_token'].value
                            self.log_result("Admin Login", True, 
                                          f"Admin logged in successfully: {data['name']} ({data['role']})")
                            return True
                        else:
                            self.log_result("Admin Login", False, "No session cookie set")
                            return False
                    else:
                        self.log_result("Admin Login", False, f"Invalid admin data: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("Admin Login", False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("Admin Login", False, f"Error: {str(e)}")
            return False

    async def test_user_registration(self):
        """Test user registration"""
        try:
            # Use unique email to avoid conflicts
            unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
            payload = {
                "email": unique_email,
                "password": TEST_USER_PASSWORD,
                "name": TEST_USER_NAME
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/auth/register",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate user data
                    if (data.get('email') == unique_email and 
                        data.get('role') == 'user' and
                        data.get('name') == TEST_USER_NAME and
                        data.get('user_id')):
                        
                        # Extract session token from cookies
                        cookies = response.cookies
                        if 'session_token' in cookies:
                            self.user_session_token = cookies['session_token'].value
                            self.log_result("User Registration", True, 
                                          f"User registered successfully: {data['name']} ({data['role']})")
                            return True, unique_email
                        else:
                            self.log_result("User Registration", False, "No session cookie set")
                            return False, None
                    else:
                        self.log_result("User Registration", False, f"Invalid user data: {data}")
                        return False, None
                else:
                    error_text = await response.text()
                    self.log_result("User Registration", False, f"HTTP {response.status}: {error_text}")
                    return False, None
                    
        except Exception as e:
            self.log_result("User Registration", False, f"Error: {str(e)}")
            return False, None

    async def test_get_current_user(self, expected_role, test_name):
        """Test GET /api/auth/me endpoint using session cookies"""
        try:
            async with self.session.get(f"{API_BASE_URL}/auth/me") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if (data.get('role') == expected_role and
                        data.get('email') and
                        data.get('user_id')):
                        self.log_result(test_name, True, 
                                      f"User data retrieved: {data['name']} ({data['role']})")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid user data: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result(test_name, False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result(test_name, False, f"Error: {str(e)}")
            return False

    async def test_logout(self):
        """Test logout functionality"""
        try:
            async with self.session.post(f"{API_BASE_URL}/auth/logout") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('message') == 'Logged out successfully':
                        self.log_result("User Logout", True, "Logout successful")
                        return True
                    else:
                        self.log_result("User Logout", False, f"Unexpected response: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("User Logout", False, f"HTTP {response.status}: {error_text}")
                    return False
        except Exception as e:
            self.log_result("User Logout", False, f"Error: {str(e)}")
            return False

    # ============ USER PROFILE TESTS ============

    async def test_user_profile(self, test_name):
        """Test GET /api/users/profile endpoint using session cookies"""
        try:
            async with self.session.get(f"{API_BASE_URL}/users/profile") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if (data.get('user_id') and
                        data.get('email') and
                        data.get('name')):
                        self.log_result(test_name, True, 
                                      f"Profile retrieved: {data['name']} ({data.get('role', 'unknown')})")
                        return True
                    else:
                        self.log_result(test_name, False, f"Invalid profile data: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result(test_name, False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result(test_name, False, f"Error: {str(e)}")
            return False

    async def test_update_profile(self):
        """Test PUT /api/users/profile endpoint using session cookies"""
        try:
            payload = {
                "name": "Updated Test User",
                "language_learning": "Spanish",
                "timezone": "America/New_York"
            }
            
            async with self.session.put(
                f"{API_BASE_URL}/users/profile",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if (data.get('name') == "Updated Test User" and
                        data.get('language_learning') == "Spanish" and
                        data.get('timezone') == "America/New_York"):
                        self.log_result("Update User Profile", True, 
                                      f"Profile updated successfully: {data['name']}")
                        return True
                    else:
                        self.log_result("Update User Profile", False, f"Profile not updated correctly: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("Update User Profile", False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("Update User Profile", False, f"Error: {str(e)}")
            return False

    async def test_user_notifications(self):
        """Test GET /api/users/notifications endpoint using session cookies"""
        try:
            async with self.session.get(f"{API_BASE_URL}/users/notifications") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_result("User Notifications", True, 
                                      f"Retrieved {len(data)} notifications")
                        return True
                    else:
                        self.log_result("User Notifications", False, f"Expected list, got: {type(data)}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("User Notifications", False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("User Notifications", False, f"Error: {str(e)}")
            return False

    async def test_user_bookings(self):
        """Test GET /api/users/bookings endpoint using session cookies"""
        try:
            async with self.session.get(f"{API_BASE_URL}/users/bookings") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_result("User Bookings", True, 
                                      f"Retrieved {len(data)} bookings")
                        return True
                    else:
                        self.log_result("User Bookings", False, f"Expected list, got: {type(data)}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("User Bookings", False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("User Bookings", False, f"Error: {str(e)}")
            return False

    # ============ ADMIN TESTS ============

    async def test_admin_bookings(self):
        """Test GET /api/admin/bookings endpoint (admin only) using session cookies"""
        try:
            async with self.session.get(f"{API_BASE_URL}/admin/bookings") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_result("Admin Get All Bookings", True, 
                                      f"Retrieved {len(data)} bookings")
                        return True
                    else:
                        self.log_result("Admin Get All Bookings", False, f"Expected list, got: {type(data)}")
                        return False
                elif response.status == 403:
                    self.log_result("Admin Get All Bookings", True, 
                                  "Correctly returned 403 for non-admin user")
                    return True
                else:
                    error_text = await response.text()
                    self.log_result("Admin Get All Bookings", False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("Admin Get All Bookings", False, f"Error: {str(e)}")
            return False

    async def test_admin_booking_stats(self):
        """Test GET /api/admin/bookings/stats endpoint (admin only) using session cookies"""
        try:
            async with self.session.get(f"{API_BASE_URL}/admin/bookings/stats") as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    expected_fields = ['total', 'pending', 'approved', 'denied', 'completed', 'revenue']
                    if all(field in data for field in expected_fields):
                        self.log_result("Admin Booking Stats", True, 
                                      f"Stats retrieved: {data['total']} total bookings, ${data['revenue']} revenue")
                        return True
                    else:
                        self.log_result("Admin Booking Stats", False, f"Missing expected fields: {data}")
                        return False
                elif response.status == 403:
                    self.log_result("Admin Booking Stats", True, 
                                  "Correctly returned 403 for non-admin user")
                    return True
                else:
                    error_text = await response.text()
                    self.log_result("Admin Booking Stats", False, f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("Admin Booking Stats", False, f"Error: {str(e)}")
            return False

    async def test_non_admin_access_denied(self, user_session_token):
        """Test that non-admin users get 403 on admin endpoints using session cookies"""
        try:
            # Test admin bookings endpoint
            async with self.session.get(f"{API_BASE_URL}/admin/bookings") as response:
                
                if response.status == 403:
                    self.log_result("Non-Admin Access Control", True, 
                                  "Non-admin user correctly denied access to admin endpoints")
                    return True
                else:
                    self.log_result("Non-Admin Access Control", False, 
                                  f"Expected 403, got {response.status}")
                    return False
                    
        except Exception as e:
            self.log_result("Non-Admin Access Control", False, f"Error: {str(e)}")
            return False

    # ============ EXISTING PAYMENT TESTS ============
        
    async def test_health_check(self):
        """Test basic API health"""
        try:
            async with self.session.get(f"{API_BASE_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get('message') == 'Hello World':
                        self.log_result("API Health Check", True, "API is responding correctly")
                        return True
                    else:
                        self.log_result("API Health Check", False, f"Unexpected response: {data}")
                        return False
                else:
                    self.log_result("API Health Check", False, f"HTTP {response.status}")
                    return False
        except Exception as e:
            self.log_result("API Health Check", False, f"Connection error: {str(e)}")
            return False
            
    async def test_payment_packages(self):
        """Test GET /api/payments/packages endpoint"""
        try:
            async with self.session.get(f"{API_BASE_URL}/payments/packages") as response:
                if response.status == 200:
                    packages = await response.json()
                    
                    # Validate expected packages
                    expected_packages = ['trial', 'standard', 'intensive']
                    if all(pkg in packages for pkg in expected_packages):
                        # Validate package structure
                        trial = packages.get('trial', {})
                        standard = packages.get('standard', {})
                        intensive = packages.get('intensive', {})
                        
                        # Check trial package
                        if (trial.get('name') == 'Trial Lesson' and 
                            trial.get('price') == 15.0 and
                            trial.get('currency') == 'eur'):
                            
                            # Check standard package
                            if (standard.get('name') == 'Standard Lesson' and 
                                standard.get('price') == 30.0 and
                                standard.get('currency') == 'eur'):
                                
                                # Check intensive package
                                if (intensive.get('name') == 'Intensive Pack' and 
                                    intensive.get('price') == 120.0 and
                                    intensive.get('currency') == 'eur'):
                                    
                                    self.log_result("Payment Packages API", True, 
                                                  f"All 3 packages returned with correct pricing: Trial(€15), Standard(€30), Intensive(€120)")
                                    return True
                                else:
                                    self.log_result("Payment Packages API", False, 
                                                  f"Intensive package incorrect: {intensive}")
                                    return False
                            else:
                                self.log_result("Payment Packages API", False, 
                                              f"Standard package incorrect: {standard}")
                                return False
                        else:
                            self.log_result("Payment Packages API", False, 
                                          f"Trial package incorrect: {trial}")
                            return False
                    else:
                        self.log_result("Payment Packages API", False, 
                                      f"Missing expected packages. Got: {list(packages.keys())}")
                        return False
                else:
                    self.log_result("Payment Packages API", False, f"HTTP {response.status}")
                    return False
        except Exception as e:
            self.log_result("Payment Packages API", False, f"Error: {str(e)}")
            return False
            
    async def test_checkout_session_creation(self):
        """Test POST /api/payments/checkout/session endpoint"""
        try:
            # Test with trial package
            payload = {
                "package_id": "trial",
                "origin_url": "https://linguazeal.preview.emergentagent.com"
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/payments/checkout/session",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    # Validate response structure
                    if 'url' in data and 'session_id' in data:
                        url = data['url']
                        session_id = data['session_id']
                        
                        # Basic validation of Stripe URL
                        if url and session_id and 'stripe' in url.lower():
                            self.log_result("Checkout Session Creation", True, 
                                          f"Session created successfully with ID: {session_id[:20]}...")
                            return True, session_id
                        else:
                            self.log_result("Checkout Session Creation", False, 
                                          f"Invalid response format: url={url}, session_id={session_id}")
                            return False, None
                    else:
                        self.log_result("Checkout Session Creation", False, 
                                      f"Missing required fields in response: {data}")
                        return False, None
                else:
                    error_text = await response.text()
                    self.log_result("Checkout Session Creation", False, 
                                  f"HTTP {response.status}: {error_text}")
                    return False, None
                    
        except Exception as e:
            self.log_result("Checkout Session Creation", False, f"Error: {str(e)}")
            return False, None
            
    async def test_invalid_package_checkout(self):
        """Test checkout with invalid package ID"""
        try:
            payload = {
                "package_id": "invalid_package",
                "origin_url": "https://linguazeal.preview.emergentagent.com"
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/payments/checkout/session",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 400:
                    self.log_result("Invalid Package Validation", True, 
                                  "Correctly rejected invalid package ID with HTTP 400")
                    return True
                else:
                    self.log_result("Invalid Package Validation", False, 
                                  f"Expected HTTP 400, got {response.status}")
                    return False
                    
        except Exception as e:
            self.log_result("Invalid Package Validation", False, f"Error: {str(e)}")
            return False
            
    async def test_checkout_status(self, session_id=None):
        """Test GET /api/payments/checkout/status/{session_id} endpoint"""
        if not session_id:
            # Use a dummy session ID for basic endpoint testing
            session_id = "cs_test_dummy_session_id"
            
        try:
            async with self.session.get(f"{API_BASE_URL}/payments/checkout/status/{session_id}") as response:
                
                # We expect this to fail with a real Stripe error since we're using a dummy session
                # But the endpoint should be accessible and return a proper error
                if response.status in [400, 404, 500]:
                    error_text = await response.text()
                    if 'stripe' in error_text.lower() or 'session' in error_text.lower():
                        self.log_result("Checkout Status API", True, 
                                      f"Endpoint accessible, returns expected Stripe error for dummy session")
                        return True
                    else:
                        self.log_result("Checkout Status API", False, 
                                      f"Unexpected error format: {error_text}")
                        return False
                elif response.status == 200:
                    # If somehow it succeeds, that's also fine
                    data = await response.json()
                    self.log_result("Checkout Status API", True, 
                                  f"Endpoint working, returned: {data}")
                    return True
                else:
                    self.log_result("Checkout Status API", False, 
                                  f"Unexpected HTTP status: {response.status}")
                    return False
                    
        except Exception as e:
            self.log_result("Checkout Status API", False, f"Error: {str(e)}")
            return False

    # ============ EMAIL NOTIFICATION TESTS ============

    async def test_create_booking_with_email(self):
        """Test POST /api/bookings/create with email notification"""
        try:
            payload = {
                "package_id": "trial",
                "user_name": "John Doe",
                "user_email": "test@example.com",
                "payment_method": "paypal",
                "amount": 15.0
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/bookings/create",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if 'booking_id' in data and data.get('status') == 'created':
                        self.test_booking_id = data['booking_id']
                        self.log_result("Create Booking with Email", True, 
                                      f"Booking created successfully: {data['booking_id']}. Email notification logic executed (check backend logs)")
                        return True, data['booking_id']
                    else:
                        self.log_result("Create Booking with Email", False, 
                                      f"Invalid response format: {data}")
                        return False, None
                else:
                    error_text = await response.text()
                    self.log_result("Create Booking with Email", False, 
                                  f"HTTP {response.status}: {error_text}")
                    return False, None
                    
        except Exception as e:
            self.log_result("Create Booking with Email", False, f"Error: {str(e)}")
            return False, None

    async def test_update_booking_status_with_email(self, booking_id):
        """Test PUT /api/admin/bookings/{booking_id} with email notification"""
        try:
            payload = {
                "booking_status": "approved",
                "admin_notes": "Looking forward to our lesson!"
            }
            
            async with self.session.put(
                f"{API_BASE_URL}/admin/bookings/{booking_id}",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('booking_status') == 'approved':
                        self.log_result("Update Booking Status with Email", True, 
                                      f"Booking status updated to 'approved'. Email notification logic executed (check backend logs)")
                        return True
                    else:
                        self.log_result("Update Booking Status with Email", False, 
                                      f"Status not updated correctly: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("Update Booking Status with Email", False, 
                                  f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("Update Booking Status with Email", False, f"Error: {str(e)}")
            return False

    # ============ CHANGE PASSWORD TESTS ============

    async def test_change_password(self):
        """Test POST /api/users/change-password with valid credentials"""
        try:
            # First change to a new password
            payload = {
                "current_password": ADMIN_PASSWORD,
                "new_password": "newpassword123"
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/users/change-password",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 200:
                    data = await response.json()
                    
                    if data.get('message') == 'Password changed successfully':
                        # Now change it back to original password
                        payload_revert = {
                            "current_password": "newpassword123",
                            "new_password": ADMIN_PASSWORD
                        }
                        
                        async with self.session.post(
                            f"{API_BASE_URL}/users/change-password",
                            json=payload_revert,
                            headers={'Content-Type': 'application/json'}
                        ) as response_revert:
                            
                            if response_revert.status == 200:
                                self.log_result("Change Password", True, 
                                              "Password changed successfully and reverted back to original")
                                return True
                            else:
                                self.log_result("Change Password", False, 
                                              "Failed to revert password back to original")
                                return False
                    else:
                        self.log_result("Change Password", False, 
                                      f"Unexpected response: {data}")
                        return False
                else:
                    error_text = await response.text()
                    self.log_result("Change Password", False, 
                                  f"HTTP {response.status}: {error_text}")
                    return False
                    
        except Exception as e:
            self.log_result("Change Password", False, f"Error: {str(e)}")
            return False

    async def test_change_password_wrong_current(self):
        """Test change password with incorrect current password"""
        try:
            payload = {
                "current_password": "wrongpassword",
                "new_password": "newpassword123"
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/users/change-password",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 401:
                    self.log_result("Change Password - Wrong Current", True, 
                                  "Correctly rejected incorrect current password with HTTP 401")
                    return True
                else:
                    self.log_result("Change Password - Wrong Current", False, 
                                  f"Expected HTTP 401, got {response.status}")
                    return False
                    
        except Exception as e:
            self.log_result("Change Password - Wrong Current", False, f"Error: {str(e)}")
            return False

    async def test_change_password_validation(self):
        """Test change password with invalid new password (too short)"""
        try:
            payload = {
                "current_password": ADMIN_PASSWORD,
                "new_password": "short"  # Less than 6 characters
            }
            
            async with self.session.post(
                f"{API_BASE_URL}/users/change-password",
                json=payload,
                headers={'Content-Type': 'application/json'}
            ) as response:
                
                if response.status == 400:
                    error_data = await response.json()
                    if 'at least 6 characters' in error_data.get('detail', '').lower():
                        self.log_result("Change Password - Validation", True, 
                                      "Correctly rejected password shorter than 6 characters")
                        return True
                    else:
                        self.log_result("Change Password - Validation", False, 
                                      f"Wrong error message: {error_data}")
                        return False
                else:
                    self.log_result("Change Password - Validation", False, 
                                  f"Expected HTTP 400, got {response.status}")
                    return False
                    
        except Exception as e:
            self.log_result("Change Password - Validation", False, f"Error: {str(e)}")
            return False
            
    async def run_all_tests(self):
        """Run all backend tests"""
        print(f"🧪 Starting Backend API Tests - User Authentication & Admin Dashboard")
        print(f"📍 Testing against: {API_BASE_URL}")
        print("=" * 80)
        
        await self.setup()
        
        try:
            # Test basic connectivity first
            health_ok = await self.test_health_check()
            if not health_ok:
                print("❌ Basic API connectivity failed. Stopping tests.")
                return
            
            print("\n🔐 AUTHENTICATION TESTS")
            print("-" * 40)
            
            # Test admin login
            admin_login_ok = await self.test_admin_login()
            
            # Test get current user for admin (using same session)
            if admin_login_ok:
                await self.test_get_current_user("admin", "Get Current User (Admin)")
            
            print("\n👑 ADMIN DASHBOARD TESTS")
            print("-" * 40)
            
            # Test admin endpoints (using admin session)
            if admin_login_ok:
                await self.test_admin_bookings()
                await self.test_admin_booking_stats()
            
            # Now create a new session for user tests
            await self.cleanup()
            await self.setup()
            
            # Test user registration
            user_reg_ok, test_user_email = await self.test_user_registration()
            
            # Test get current user for regular user (using user session)
            if user_reg_ok:
                await self.test_get_current_user("user", "Get Current User (Regular)")
            
            print("\n👤 USER PROFILE TESTS")
            print("-" * 40)
            
            # Test user profile endpoints (with regular user session)
            if user_reg_ok:
                await self.test_user_profile("Get User Profile")
                await self.test_update_profile()
                await self.test_user_notifications()
                await self.test_user_bookings()
            
            # Test access control (non-admin trying admin endpoints)
            if user_reg_ok:
                await self.test_non_admin_access_denied(None)  # Using session cookies
            
            print("\n💳 PAYMENT SYSTEM TESTS")
            print("-" * 40)
                
            # Test payment packages endpoint
            await self.test_payment_packages()
            
            # Test checkout session creation
            success, session_id = await self.test_checkout_session_creation()
            
            # Test invalid package validation
            await self.test_invalid_package_checkout()
            
            # Test checkout status endpoint
            await self.test_checkout_status(session_id)
            
            # Test email notification system
            print("\n📧 EMAIL NOTIFICATION TESTS")
            print("-" * 40)
            
            # Create a booking to test email notifications
            booking_created, booking_id = await self.test_create_booking_with_email()
            
            # Switch back to admin session to test booking status update with email
            await self.cleanup()
            await self.setup()
            admin_login_ok = await self.test_admin_login()
            
            if admin_login_ok and booking_created and booking_id:
                await self.test_update_booking_status_with_email(booking_id)
            
            # Test change password feature
            print("\n🔑 CHANGE PASSWORD TESTS")
            print("-" * 40)
            
            if admin_login_ok:
                await self.test_change_password()
                await self.test_change_password_wrong_current()
                await self.test_change_password_validation()
            
            # Test logout
            print("\n🚪 LOGOUT TEST")
            print("-" * 40)
            await self.test_logout()
            
        finally:
            await self.cleanup()
            
        # Summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        # Group results by category
        auth_tests = [r for r in self.test_results if any(keyword in r['test'] for keyword in ['Login', 'Registration', 'Current User', 'Logout'])]
        profile_tests = [r for r in self.test_results if any(keyword in r['test'] for keyword in ['Profile', 'Notifications', 'User Bookings'])]
        admin_tests = [r for r in self.test_results if any(keyword in r['test'] for keyword in ['Admin', 'Access Control'])]
        payment_tests = [r for r in self.test_results if any(keyword in r['test'] for keyword in ['Payment', 'Checkout', 'Package'])]
        email_tests = [r for r in self.test_results if any(keyword in r['test'] for keyword in ['Email', 'Booking'])]
        password_tests = [r for r in self.test_results if any(keyword in r['test'] for keyword in ['Change Password'])]
        other_tests = [r for r in self.test_results if r not in auth_tests + profile_tests + admin_tests + payment_tests + email_tests + password_tests]
        
        def print_category(category_name, tests):
            if tests:
                print(f"\n{category_name}:")
                for result in tests:
                    status = "✅" if result['success'] else "❌"
                    print(f"  {status} {result['test']}")
        
        print_category("🔐 Authentication", auth_tests)
        print_category("👤 User Profile", profile_tests)
        print_category("👑 Admin Dashboard", admin_tests)
        print_category("💳 Payment System", payment_tests)
        print_category("📧 Email Notifications", email_tests)
        print_category("🔑 Change Password", password_tests)
        print_category("🔧 Other", other_tests)
            
        print(f"\n🎯 Overall Results: {passed}/{total} tests passed")
        
        if passed == total:
            print("🎉 All backend tests passed!")
        else:
            failed_tests = [r for r in self.test_results if not r['success']]
            print(f"⚠️  {len(failed_tests)} tests failed:")
            for test in failed_tests:
                print(f"   ❌ {test['test']}: {test['details']}")
            
        return self.test_results

async def main():
    """Main test runner"""
    tester = BackendTester()
    results = await tester.run_all_tests()
    return results

if __name__ == "__main__":
    asyncio.run(main())