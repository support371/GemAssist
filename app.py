import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Create the Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "gem-assist-enterprise-secret-key")

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
    return render_template('telegram-bot.html')

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
    return render_template('testimonials.html')

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
    return render_template('teams.html')

@app.route('/investment-portfolio')
def investment_portfolio():
    """Investment portfolio services"""
    return render_template('portfolio.html')

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
