import os
import asyncio
import logging
import resend
from dotenv import load_dotenv

load_dotenv()

# Configure Resend
resend.api_key = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "zelinskayaalinaig@gmail.com")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "zelinskayaalinaig@gmail.com")

logger = logging.getLogger(__name__)


async def send_email(to_email: str, subject: str, html_content: str):
    """Send an email using Resend API"""
    params = {
        "from": SENDER_EMAIL,
        "to": [to_email],
        "subject": subject,
        "html": html_content
    }

    try:
        # Run sync SDK in thread to keep FastAPI non-blocking
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent to {to_email}: {email.get('id')}")
        return {
            "status": "success",
            "email_id": email.get("id")
        }
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {str(e)}")
        return {
            "status": "error",
            "error": str(e)
        }


async def send_booking_created_email(user_email: str, user_name: str, booking_details: dict):
    """Send email when a new booking is created"""
    subject = "New Lesson Booking Received"
    
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #ec4899; text-align: center;">Booking Confirmation</h2>
        <p>Dear {user_name},</p>
        <p>Thank you for booking a lesson with Alina Zelinska! Your booking has been received and is pending approval.</p>
        
        <div style="background-color: #fce7f3; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #831843;">Booking Details:</h3>
            <p style="margin: 5px 0;"><strong>Package:</strong> {booking_details.get('package_name', 'N/A')}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> {booking_details.get('amount', 0)} {booking_details.get('currency', 'EUR')}</p>
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> {booking_details.get('booking_id', 'N/A')}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #ca8a04;">Pending Approval</span></p>
        </div>
        
        <p>You will receive another email once Alina reviews and approves your booking.</p>
        
        <p style="margin-top: 30px;">Best regards,<br><strong>Alina Zelinska</strong><br>Language Tutor</p>
    </div>
    """
    
    # Send to user
    await send_email(user_email, subject, html_content)
    
    # Notify admin
    admin_subject = f"New Booking from {user_name}"
    admin_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #ec4899; text-align: center;">New Booking Alert</h2>
        <p>A new lesson booking has been created:</p>
        
        <div style="background-color: #fce7f3; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Student:</strong> {user_name} ({user_email})</p>
            <p style="margin: 5px 0;"><strong>Package:</strong> {booking_details.get('package_name', 'N/A')}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> {booking_details.get('amount', 0)} {booking_details.get('currency', 'EUR')}</p>
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> {booking_details.get('booking_id', 'N/A')}</p>
        </div>
        
        <p>Please log in to your admin dashboard to review and approve this booking.</p>
    </div>
    """
    
    await send_email(ADMIN_EMAIL, admin_subject, admin_html)


async def send_booking_status_email(user_email: str, user_name: str, status: str, booking_details: dict, admin_notes: str = None):
    """Send email when booking status changes"""
    
    status_config = {
        "approved": {
            "subject": "Your Lesson Booking is Approved! 🎉",
            "title": "Booking Approved",
            "color": "#16a34a",
            "message": "Great news! Alina has approved your lesson booking. Get ready for an amazing learning experience!"
        },
        "denied": {
            "subject": "Booking Update - Unable to Approve",
            "title": "Booking Not Approved",
            "color": "#dc2626",
            "message": "Unfortunately, Alina is unable to approve your booking at this time. If you made a payment, a refund will be processed shortly."
        },
        "completed": {
            "subject": "Lesson Completed - Thank You! 🌟",
            "title": "Lesson Completed",
            "color": "#7c3aed",
            "message": "Your lesson has been completed. Thank you for learning with Alina! We hope to see you again soon."
        }
    }
    
    config = status_config.get(status, {
        "subject": f"Booking Status Update: {status.capitalize()}",
        "title": f"Booking {status.capitalize()}",
        "color": "#6b7280",
        "message": f"Your booking status has been updated to: {status}"
    })
    
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: {config['color']}; text-align: center;">{config['title']}</h2>
        <p>Dear {user_name},</p>
        <p>{config['message']}</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Booking Details:</h3>
            <p style="margin: 5px 0;"><strong>Package:</strong> {booking_details.get('package_name', 'N/A')}</p>
            <p style="margin: 5px 0;"><strong>Amount:</strong> {booking_details.get('amount', 0)} {booking_details.get('currency', 'EUR')}</p>
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> {booking_details.get('booking_id', 'N/A')}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: {config['color']};">{status.capitalize()}</span></p>
        </div>
        
        {f'<div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;"><p style="margin: 0;"><strong>Note from Alina:</strong> {admin_notes}</p></div>' if admin_notes else ''}
        
        <p style="margin-top: 30px;">Best regards,<br><strong>Alina Zelinska</strong><br>Language Tutor</p>
    </div>
    """
    
    await send_email(user_email, config['subject'], html_content)
