from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean, Enum
import enum

db = SQLAlchemy()

class ServiceType(enum.Enum):
    CYBERSECURITY = "cybersecurity"
    REAL_ESTATE = "real_estate"
    TELEGRAM_BOT = "telegram_bot"
    RECOVERY_SERVICE = "recovery_service"
    POWER_OF_ATTORNEY = "power_of_attorney"
    INVESTMENT = "investment"
    BUSINESS_ANALYSIS = "business_analysis"
    OTHER = "other"

class TestimonialStatus(enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    FEATURED = "featured"

class Testimonial(db.Model):
    __tablename__ = 'testimonials'
    
    id = Column(Integer, primary_key=True)
    
    # Client Information
    client_name = Column(String(100), nullable=False)
    client_email = Column(String(120), nullable=False)
    client_phone = Column(String(20))
    company_name = Column(String(100))
    company_position = Column(String(100))
    
    # Testimonial Content
    service_type = Column(Enum(ServiceType), nullable=False)
    rating = Column(Float, nullable=False, default=5.0)
    title = Column(String(200))
    testimonial_text = Column(Text, nullable=False)
    
    # Media Files
    video_url = Column(String(500))  # Path to uploaded video
    image_url = Column(String(500))  # Path to uploaded image/logo
    company_logo_url = Column(String(500))  # Company logo
    
    # Metadata
    status = Column(Enum(TestimonialStatus), default=TestimonialStatus.PENDING)
    submitted_at = Column(DateTime, default=datetime.utcnow)
    approved_at = Column(DateTime)
    approved_by = Column(String(100))
    
    # Display Options
    is_featured = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    
    # Consent
    consent_to_display = Column(Boolean, default=False)
    consent_to_contact = Column(Boolean, default=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'client_name': self.client_name,
            'company_name': self.company_name,
            'company_position': self.company_position,
            'service_type': self.service_type.value if self.service_type else None,
            'rating': self.rating,
            'title': self.title,
            'testimonial_text': self.testimonial_text,
            'video_url': self.video_url,
            'image_url': self.image_url,
            'company_logo_url': self.company_logo_url,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None,
            'is_featured': self.is_featured
        }

class ContactSubmission(db.Model):
    __tablename__ = 'contact_submissions'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), nullable=False)
    phone = Column(String(20))
    subject = Column(String(200))
    message = Column(Text, nullable=False)
    service_interest = Column(String(100))
    submitted_at = Column(DateTime, default=datetime.utcnow)
    is_read = Column(Boolean, default=False)
    responded_at = Column(DateTime)
    
class NewsletterSubscriber(db.Model):
    __tablename__ = 'newsletter_subscribers'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True, nullable=False)
    name = Column(String(100))
    subscribed_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    unsubscribed_at = Column(DateTime)

class VIPBoardMember(db.Model):
    __tablename__ = 'vip_board_members'
    
    id = Column(Integer, primary_key=True)
    position = Column(String(50), unique=True, nullable=False)  # CEO, CFO, COO, LEGAL
    name = Column(String(100), nullable=False)
    title = Column(String(200))
    bio = Column(Text)
    headshot_url = Column(String(500))  # Path to uploaded headshot
    linkedin_url = Column(String(200))
    email = Column(String(120))
    years_experience = Column(Integer)
    specialties = Column(Text)  # Comma-separated specialties
    achievements = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)