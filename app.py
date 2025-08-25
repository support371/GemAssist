import os
import logging
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy

# Try to import the original notion client for existing functionality
try:
    from notion_client import Client as NotionClient
    NOTION_LIBRARY_AVAILABLE = True
except ImportError:
    NOTION_LIBRARY_AVAILABLE = False
    NotionClient = None
    logging.warning("Notion library not available")

# Try to import custom leadership client
try:
    from gem_notion_client import get_leadership_data_from_notion
    LEADERSHIP_CLIENT_AVAILABLE = True
except ImportError:
    LEADERSHIP_CLIENT_AVAILABLE = False
    get_leadership_data_from_notion = lambda: []
    logging.warning("Custom leadership client not available")

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

def get_notion_team_data():
    """Fetch team member data from Notion database"""
    if not NOTION_LIBRARY_AVAILABLE or not NotionClient:
        return []
        
    try:
        notion = NotionClient(auth=os.environ.get('NOTION_INTEGRATION_SECRET'))
        database_id = os.environ.get('NOTION_DATABASE_ID')
        
        if not notion or not database_id:
            return []
        
        # Query the database
        response = notion.databases.query(database_id=database_id)
        
        team_members = []
        for page in response['results']:
            properties = page['properties']
            
            # Extract member data
            member = {
                'name': '',
                'position': '',
                'department': '',
                'email': '',
                'bio': '',
                'image': ''
            }
            
            # Try common field names for team member data
            for prop_name, prop_data in properties.items():
                prop_type = prop_data['type']
                
                if prop_type == 'title' and prop_data['title']:
                    member['name'] = prop_data['title'][0]['plain_text']
                elif prop_type == 'rich_text' and prop_data['rich_text']:
                    text_content = prop_data['rich_text'][0]['plain_text']
                    if 'position' in prop_name.lower() or 'role' in prop_name.lower():
                        member['position'] = text_content
                    elif 'department' in prop_name.lower() or 'division' in prop_name.lower():
                        member['department'] = text_content
                    elif 'email' in prop_name.lower():
                        member['email'] = text_content
                    elif 'bio' in prop_name.lower() or 'description' in prop_name.lower():
                        member['bio'] = text_content
                elif prop_type == 'select' and prop_data['select']:
                    if 'department' in prop_name.lower() or 'division' in prop_name.lower():
                        member['department'] = prop_data['select']['name']
                elif prop_type == 'files' and prop_data['files']:
                    member['image'] = prop_data['files'][0]['file']['url']
            
            if member['name']:  # Only add if we have at least a name
                team_members.append(member)
        
        return team_members
    
    except Exception as e:
        logging.error(f"Error fetching Notion data: {e}")
        return []

def categorize_team_members(team_members):
    """Categorize team members into cybersecurity and real estate divisions"""
    cybersecurity_team = []
    real_estate_team = []
    
    cybersecurity_keywords = ['cyber', 'security', 'threat', 'analyst', 'monitoring', 'compliance', 'incident', 'forensic']
    real_estate_keywords = ['real estate', 'property', 'investment', 'mortgage', 'leasing', 'portfolio', 'advisor', 'broker']
    
    for member in team_members:
        member_text = f"{member['position']} {member['department']} {member['bio']}".lower()
        
        if any(keyword in member_text for keyword in cybersecurity_keywords):
            cybersecurity_team.append(member)
        elif any(keyword in member_text for keyword in real_estate_keywords):
            real_estate_team.append(member)
        else:
            # Default assignment based on company structure
            if 'manager' in member['position'].lower() or 'ceo' in member['position'].lower():
                cybersecurity_team.append(member)
            else:
                real_estate_team.append(member)
    
    return cybersecurity_team, real_estate_team

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "gem-assist-enterprise-secret-key")

# Database configuration
database_url = os.environ.get('DATABASE_URL')
if database_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size
    app.config['UPLOAD_FOLDER'] = 'static/uploads'
    USE_DATABASE = True
else:
    USE_DATABASE = False
    logging.warning("Database not configured - testimonials will not be saved")

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'avi', 'mov', 'wmv', 'webm'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'avi', 'mov', 'wmv', 'webm'}
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Initialize database if available
if USE_DATABASE:
    from models import db, Testimonial, ContactSubmission, NewsletterSubscriber, ServiceType, TestimonialStatus
    db.init_app(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
else:
    db = None
    Testimonial = None
    ContactSubmission = None
    NewsletterSubscriber = None
    ServiceType = None
    TestimonialStatus = None

def allowed_file(filename, file_type='any'):
    if file_type == 'video':
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_VIDEO_EXTENSIONS
    elif file_type == 'image':
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
    else:
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Routes
@app.route('/')
def index():
    """Home page with main services overview"""
    return render_template('index.html')

@app.route('/about')
def about():
    """About Gem Assist Enterprise"""
    return render_template('about.html')

@app.route('/services')
def services():
    """Services overview page"""
    return render_template('services.html')

@app.route('/contact')
def contact():
    """Contact information and form"""
    return render_template('contact.html')

@app.route('/telegram-bot-automation')
def telegram_bot():
    """Telegram bot automation services"""
    return render_template('telegram_bot.html')

@app.route('/recovery-service-handbook')
def recovery_service():
    """Professional Asset Recovery Service Handbook"""
    return render_template('recovery-handbook.html')

@app.route('/business-analysis-service')
def business_analysis():
    """Comprehensive Business Analysis & Integration Service"""
    return render_template('business-analysis.html')

@app.route('/leadership-vision')
def leadership_vision():
    """Leadership Team, Vision & Mission"""
    return render_template('leadership-vision.html')

@app.route('/leadership')
def leadership():
    """Company Leadership and Board Members"""
    leadership_data = get_leadership_data_from_notion()
    return render_template('leadership.html', leadership_data=leadership_data)

@app.route('/api/leadership-data')
def api_leadership_data():
    """API endpoint for leadership data"""
    leadership_data = get_leadership_data_from_notion()
    return jsonify(leadership_data)

@app.route('/market-insights')
def market_insights():
    """Active Market Insights and Trends"""
    return render_template('market_insights.html')

@app.route('/power_of_attorney')
def power_of_attorney():
    """Power of Attorney services"""
    return render_template('power-of-attorney.html')

@app.route('/monitoring-threats')
def monitoring():
    """Threat monitoring services"""
    return render_template('monitoring.html')

@app.route('/real-estate-testimonials')
def testimonials():
    """Client testimonials for real estate services"""
    if USE_DATABASE:
        approved_testimonials = Testimonial.query.filter_by(status=TestimonialStatus.APPROVED).order_by(Testimonial.display_order, Testimonial.submitted_at.desc()).all()
        featured_testimonials = [t for t in approved_testimonials if t.is_featured]
        regular_testimonials = [t for t in approved_testimonials if not t.is_featured]
    else:
        featured_testimonials = []
        regular_testimonials = []
    
    return render_template('testimonials.html', 
                         featured_testimonials=featured_testimonials,
                         regular_testimonials=regular_testimonials)

@app.route('/partners-and-trustees')
def partners():
    """Partners and trustees information"""
    return render_template('partners.html')

@app.route('/client-access')
def client_access():
    """Client portal access"""
    return render_template('client.html')

@app.route('/admin-panel')
def admin_panel():
    """Administrative panel"""
    return render_template('admin.html')

@app.route('/gem-news-and-newsletter')
def news():
    """News and newsletter page"""
    return render_template('news.html')

@app.route('/teams')
def teams():
    """Team members and structure"""
    team_data = get_notion_team_data()
    cybersecurity_team, real_estate_team = categorize_team_members(team_data)
    
    return render_template('teams.html', 
                         cybersecurity_team=cybersecurity_team,
                         real_estate_team=real_estate_team)

@app.route('/investment-portfolio')
def investment_portfolio():
    """Investment portfolio services"""
    return render_template('portfolio.html')

@app.route('/vip-board-members')
def vip_board():
    """VIP Board Members - Executive Leadership"""
    return render_template('vip_board.html')

@app.route('/submit-testimonial', methods=['GET', 'POST'])
def submit_testimonial():
    """Handle testimonial submission"""
    if request.method == 'POST':
        if not USE_DATABASE:
            flash('Database not configured. Testimonial submission is temporarily unavailable.', 'error')
            return redirect(url_for('submit_testimonial'))
        
        try:
            # Get form data
            testimonial = Testimonial(
                client_name=request.form.get('client_name'),
                client_email=request.form.get('client_email'),
                client_phone=request.form.get('client_phone'),
                company_name=request.form.get('company_name'),
                company_position=request.form.get('company_position'),
                service_type=ServiceType[request.form.get('service_type', 'OTHER').upper()],
                rating=float(request.form.get('rating', 5)),
                title=request.form.get('title'),
                testimonial_text=request.form.get('testimonial_text'),
                consent_to_display=request.form.get('consent_display') == 'on',
                consent_to_contact=request.form.get('consent_contact') == 'on'
            )
            
            # Handle video upload
            if 'video_file' in request.files:
                video = request.files['video_file']
                if video and video.filename and allowed_file(video.filename, 'video'):
                    filename = secure_filename(f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{video.filename}")
                    video_path = os.path.join('static/uploads/videos', filename)
                    video.save(video_path)
                    testimonial.video_url = f'/static/uploads/videos/{filename}'
            
            # Handle image upload
            if 'image_file' in request.files:
                image = request.files['image_file']
                if image and image.filename and allowed_file(image.filename, 'image'):
                    filename = secure_filename(f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{image.filename}")
                    image_path = os.path.join('static/uploads/testimonials', filename)
                    image.save(image_path)
                    testimonial.image_url = f'/static/uploads/testimonials/{filename}'
            
            # Handle company logo upload
            if 'logo_file' in request.files:
                logo = request.files['logo_file']
                if logo and logo.filename and allowed_file(logo.filename, 'image'):
                    filename = secure_filename(f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{logo.filename}")
                    logo_path = os.path.join('static/uploads/logos', filename)
                    logo.save(logo_path)
                    testimonial.company_logo_url = f'/static/uploads/logos/{filename}'
            
            # Save to database
            db.session.add(testimonial)
            db.session.commit()
            
            flash('Thank you for your testimonial! It will be reviewed and published soon.', 'success')
            return redirect(url_for('testimonials'))
            
        except Exception as e:
            logging.error(f"Error submitting testimonial: {e}")
            flash('An error occurred while submitting your testimonial. Please try again.', 'error')
            return redirect(url_for('submit_testimonial'))
    
    return render_template('submit_testimonial.html')

@app.route('/admin/testimonials')
def admin_testimonials():
    """Admin panel for managing testimonials"""
    if not USE_DATABASE:
        flash('Database not configured.', 'error')
        return redirect(url_for('admin_panel'))
    
    pending = Testimonial.query.filter_by(status=TestimonialStatus.PENDING).order_by(Testimonial.submitted_at.desc()).all()
    approved = Testimonial.query.filter_by(status=TestimonialStatus.APPROVED).order_by(Testimonial.submitted_at.desc()).all()
    rejected = Testimonial.query.filter_by(status=TestimonialStatus.REJECTED).order_by(Testimonial.submitted_at.desc()).all()
    
    return render_template('admin_testimonials.html', 
                         pending=pending,
                         approved=approved,
                         rejected=rejected)

@app.route('/admin/testimonial/<int:id>/approve', methods=['POST'])
def approve_testimonial(id):
    """Approve a testimonial"""
    if not USE_DATABASE:
        return jsonify({'error': 'Database not configured'}), 500
    
    testimonial = Testimonial.query.get_or_404(id)
    testimonial.status = TestimonialStatus.APPROVED
    testimonial.approved_at = datetime.utcnow()
    testimonial.approved_by = 'Admin'  # You can add authentication later
    
    db.session.commit()
    flash('Testimonial approved successfully!', 'success')
    return redirect(url_for('admin_testimonials'))

@app.route('/admin/testimonial/<int:id>/reject', methods=['POST'])
def reject_testimonial(id):
    """Reject a testimonial"""
    if not USE_DATABASE:
        return jsonify({'error': 'Database not configured'}), 500
    
    testimonial = Testimonial.query.get_or_404(id)
    testimonial.status = TestimonialStatus.REJECTED
    
    db.session.commit()
    flash('Testimonial rejected.', 'info')
    return redirect(url_for('admin_testimonials'))

@app.route('/admin/testimonial/<int:id>/feature', methods=['POST'])
def feature_testimonial(id):
    """Toggle featured status of a testimonial"""
    if not USE_DATABASE:
        return jsonify({'error': 'Database not configured'}), 500
    
    testimonial = Testimonial.query.get_or_404(id)
    testimonial.is_featured = not testimonial.is_featured
    
    db.session.commit()
    status = 'featured' if testimonial.is_featured else 'unfeatured'
    flash(f'Testimonial {status} successfully!', 'success')
    return redirect(url_for('admin_testimonials'))

@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors"""
    return render_template('index.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return render_template('index.html'), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
