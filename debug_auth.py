#!/usr/bin/env python3
"""
Debug authentication issue - test session cookie handling
"""

import asyncio
import aiohttp
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://linguazeal.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

ADMIN_EMAIL = "zelinskayaalinaig@gmail.com"
ADMIN_PASSWORD = "mylina"

async def debug_admin_auth():
    """Debug admin authentication flow"""
    jar = aiohttp.CookieJar(unsafe=True)
    session = aiohttp.ClientSession(cookie_jar=jar)
    
    try:
        print("🔍 Debugging Admin Authentication")
        print(f"📍 API Base URL: {API_BASE_URL}")
        print("-" * 50)
        
        # Step 1: Login as admin
        print("1. Attempting admin login...")
        payload = {
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }
        
        async with session.post(
            f"{API_BASE_URL}/auth/login",
            json=payload,
            headers={'Content-Type': 'application/json'}
        ) as response:
            print(f"   Status: {response.status}")
            print(f"   Headers: {dict(response.headers)}")
            print(f"   Cookies: {response.cookies}")
            
            if response.status == 200:
                data = await response.json()
                print(f"   Response: {data}")
                
                # Check if session cookie was set
                session_cookie = None
                for cookie_name, cookie_morsel in response.cookies.items():
                    if cookie_name == 'session_token':
                        session_cookie = cookie_morsel.value
                        print(f"   Session Token: {session_cookie[:20]}...")
                        break
                
                if not session_cookie:
                    print("   ❌ No session_token cookie found!")
                    return
                
                # Step 2: Test /auth/me with cookies
                print("\n2. Testing /auth/me with cookies...")
                async with session.get(f"{API_BASE_URL}/auth/me") as me_response:
                    print(f"   Status: {me_response.status}")
                    print(f"   Request cookies: {session.cookie_jar}")
                    
                    if me_response.status == 200:
                        me_data = await me_response.json()
                        print(f"   ✅ Success: {me_data}")
                    else:
                        error_text = await me_response.text()
                        print(f"   ❌ Failed: {error_text}")
                
                # Step 3: Test /auth/me with Authorization header
                print("\n3. Testing /auth/me with Authorization header...")
                async with session.get(
                    f"{API_BASE_URL}/auth/me",
                    headers={'Authorization': f'Bearer {session_cookie}'}
                ) as auth_response:
                    print(f"   Status: {auth_response.status}")
                    
                    if auth_response.status == 200:
                        auth_data = await auth_response.json()
                        print(f"   ✅ Success: {auth_data}")
                    else:
                        error_text = await auth_response.text()
                        print(f"   ❌ Failed: {error_text}")
                
                # Step 4: Test admin endpoints
                print("\n4. Testing admin endpoints...")
                async with session.get(f"{API_BASE_URL}/admin/bookings/stats") as admin_response:
                    print(f"   Status: {admin_response.status}")
                    
                    if admin_response.status == 200:
                        admin_data = await admin_response.json()
                        print(f"   ✅ Admin access successful: {admin_data}")
                    else:
                        error_text = await admin_response.text()
                        print(f"   ❌ Admin access failed: {error_text}")
                        
            else:
                error_text = await response.text()
                print(f"   ❌ Login failed: {error_text}")
                
    finally:
        await session.close()

if __name__ == "__main__":
    asyncio.run(debug_admin_auth())