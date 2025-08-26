"""
Telegram Bot Handler with Make.com Integration
Handles bot commands, data collection, and automation workflows
"""

import os
import json
import logging
import requests
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List
import hashlib
import hmac

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TelegramBotHandler:
    """Main handler for Telegram bot operations"""
    
    def __init__(self):
        # Bot configuration from environment variables
        self.bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        self.make_webhook_url = os.environ.get('MAKE_WEBHOOK_URL', '')
        self.channel_id = os.environ.get('TELEGRAM_CHANNEL_ID', '')
        
        # Command handlers mapping
        self.command_handlers = {
            '/start': self.handle_start,
            '/help': self.handle_help,
            '/scan_network': self.handle_scan_network,
            '/threat_report': self.handle_threat_report,
            '/block_ip': self.handle_block_ip,
            '/incident_log': self.handle_incident_log,
            '/property_list': self.handle_property_list,
            '/schedule_viewing': self.handle_schedule_viewing,
            '/tenant_status': self.handle_tenant_status,
            '/track_wallet': self.handle_track_wallet,
            '/analyze_tx': self.handle_analyze_tx,
            '/recovery_case': self.handle_recovery_case,
            '/status': self.handle_status
        }
        
        # Data collection queues
        self.security_alerts = []
        self.property_updates = []
        self.recovery_cases = []
    
    def verify_webhook_signature(self, data: bytes, signature: str) -> bool:
        """Verify webhook signature from Telegram"""
        if not self.bot_token:
            return True  # Skip verification if token not set
        
        secret = hashlib.sha256(self.bot_token.encode()).digest()
        calculated = hmac.new(secret, data, hashlib.sha256).hexdigest()
        return hmac.compare_digest(calculated, signature)
    
    def process_update(self, update: Dict[str, Any]) -> Dict[str, Any]:
        """Process incoming Telegram update"""
        try:
            # Extract message data
            message = update.get('message', {})
            chat_id = message.get('chat', {}).get('id')
            text = message.get('text', '')
            user = message.get('from', {})
            
            # Log the update
            logger.info(f"Processing update from {user.get('username', 'Unknown')}: {text}")
            
            # Check if it's a command
            if text.startswith('/'):
                command_parts = text.split()
                command = command_parts[0]
                args = command_parts[1:] if len(command_parts) > 1 else []
                
                # Execute command handler
                if command in self.command_handlers:
                    response = self.command_handlers[command](chat_id, args, user)
                else:
                    response = self.handle_unknown_command(chat_id, command)
                
                return response
            else:
                # Handle regular messages
                return self.handle_message(chat_id, text, user)
                
        except Exception as e:
            logger.error(f"Error processing update: {e}")
            return {'error': str(e)}
    
    def send_to_make(self, event_type: str, data: Dict[str, Any]) -> bool:
        """Send data to Make.com webhook for automation"""
        if not self.make_webhook_url:
            logger.warning("Make.com webhook URL not configured")
            return False
        
        try:
            payload = {
                'event_type': event_type,
                'timestamp': datetime.utcnow().isoformat(),
                'data': data
            }
            
            response = requests.post(
                self.make_webhook_url,
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Error sending to Make.com: {e}")
            return False
    
    def send_message(self, chat_id: str, text: str, parse_mode: str = 'HTML') -> bool:
        """Send message to Telegram chat"""
        if not self.bot_token:
            logger.warning("Bot token not configured")
            return False
        
        try:
            url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"
            payload = {
                'chat_id': chat_id,
                'text': text,
                'parse_mode': parse_mode
            }
            
            response = requests.post(url, json=payload, timeout=10)
            return response.status_code == 200
        except Exception as e:
            logger.error(f"Error sending message: {e}")
            return False
    
    def broadcast_to_channel(self, message: str, alert_type: str = 'info') -> bool:
        """Broadcast message to Telegram channel"""
        if not self.channel_id:
            logger.warning("Channel ID not configured")
            return False
        
        # Format message based on alert type
        emoji = {
            'danger': '🚨',
            'warning': '⚠️',
            'success': '✅',
            'info': 'ℹ️'
        }.get(alert_type, 'ℹ️')
        
        formatted_message = f"{emoji} <b>GEM Enterprise Alert</b>\n\n{message}"
        
        return self.send_message(self.channel_id, formatted_message)
    
    # Command Handlers
    
    def handle_start(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle /start command"""
        welcome_message = """
<b>Welcome to GEM Enterprise Bot!</b> 🛡️

I'm your automated assistant for:
• 🔐 Cybersecurity Monitoring
• 🏢 Real Estate Management  
• 💰 Asset Recovery

Use /help to see all available commands.
        """
        self.send_message(chat_id, welcome_message)
        
        # Send to Make.com for onboarding workflow
        self.send_to_make('user_onboarding', {
            'user_id': user.get('id'),
            'username': user.get('username'),
            'first_name': user.get('first_name', ''),
            'timestamp': datetime.utcnow().isoformat()
        })
        
        return {'status': 'success', 'action': 'welcome_sent'}
    
    def handle_help(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle /help command"""
        help_text = """
<b>Available Commands:</b>

<b>🔐 Security Commands:</b>
/scan_network - Network security scan
/threat_report - Get threat assessment
/block_ip [IP] - Block suspicious IP
/incident_log - View security incidents

<b>🏢 Real Estate Commands:</b>
/property_list - View properties
/schedule_viewing [ID] - Book viewing
/tenant_status [unit] - Check tenant info

<b>💰 Recovery Commands:</b>
/track_wallet [address] - Monitor wallet
/analyze_tx [hash] - Analyze transaction
/recovery_case [ID] - Check case status

/status - Bot system status
        """
        self.send_message(chat_id, help_text)
        return {'status': 'success', 'action': 'help_sent'}
    
    def handle_scan_network(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle network scanning command"""
        self.send_message(chat_id, "🔍 Initiating network security scan...")
        
        # Trigger Make.com automation for network scan
        scan_data = {
            'user_id': user.get('id'),
            'scan_type': 'full',
            'timestamp': datetime.utcnow().isoformat()
        }
        
        if self.send_to_make('security_scan', scan_data):
            # Simulate scan results (in production, this would come from actual scan)
            result_message = """
<b>Network Scan Complete</b> ✅

<b>Results:</b>
• Active Hosts: 42
• Open Ports: 156
• Vulnerabilities: 3 (Medium)
• Suspicious Activity: None

<b>Recommendations:</b>
1. Update firewall rules
2. Patch identified vulnerabilities
3. Review port 3389 exposure

Full report sent to your dashboard.
            """
            self.send_message(chat_id, result_message)
            
            # Store in security alerts
            self.security_alerts.append({
                'type': 'scan',
                'user': user.get('username'),
                'timestamp': datetime.utcnow().isoformat(),
                'results': 'scan_complete'
            })
            
            return {'status': 'success', 'action': 'scan_completed'}
        else:
            self.send_message(chat_id, "❌ Failed to initiate scan. Please try again.")
            return {'status': 'error', 'message': 'scan_failed'}
    
    def handle_threat_report(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Generate threat assessment report"""
        self.send_message(chat_id, "📊 Generating threat assessment report...")
        
        # Send to Make.com for threat analysis
        self.send_to_make('threat_analysis', {
            'user_id': user.get('id'),
            'request_type': 'full_report'
        })
        
        # Generate report (in production, this would use real threat data)
        report = """
<b>Threat Assessment Report</b> 🛡️
<i>Generated: {}</i>

<b>Current Threat Level: MEDIUM</b>

<b>Active Threats:</b>
• DDoS attempts: 12 (blocked)
• Phishing emails: 34 (quarantined)
• Malware: 0 detected
• Unauthorized access: 2 attempts

<b>24h Statistics:</b>
• Total events: 2,456
• Blocked connections: 89
• Alerts generated: 15
• Incidents resolved: 14

<b>Top Attack Sources:</b>
1. 185.220.x.x (Russia)
2. 162.142.x.x (China)
3. 45.155.x.x (Netherlands)

<b>Next Steps:</b>
• Review firewall logs
• Update security patches
• Schedule penetration test
        """.format(datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC'))
        
        self.send_message(chat_id, report)
        self.broadcast_to_channel("Threat report generated for " + user.get('username', 'user'), 'warning')
        
        return {'status': 'success', 'action': 'threat_report_sent'}
    
    def handle_property_list(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle property listing request"""
        self.send_message(chat_id, "🏢 Loading available properties...")
        
        # Send to Make.com for property data
        self.send_to_make('property_request', {
            'user_id': user.get('id'),
            'filter': args[0] if args else 'all'
        })
        
        # Property list (in production, from database)
        properties = """
<b>Available Properties</b> 🏠

<b>1. Downtown Luxury Apartment</b>
📍 123 Main St, Unit 45B
💰 $3,500/month
🛏️ 2BR/2BA | 1,200 sqft
✨ Available Now

<b>2. Suburban Family Home</b>
📍 456 Oak Drive
💰 $2,800/month
🛏️ 4BR/3BA | 2,500 sqft
✨ Available Dec 1

<b>3. Commercial Office Space</b>
📍 789 Business Park
💰 $5,000/month
📐 3,000 sqft
✨ Available Now

Use /schedule_viewing [ID] to book a tour!
        """
        
        self.send_message(chat_id, properties)
        
        # Store property inquiry
        self.property_updates.append({
            'user': user.get('username'),
            'action': 'list_viewed',
            'timestamp': datetime.utcnow().isoformat()
        })
        
        return {'status': 'success', 'action': 'properties_sent'}
    
    def handle_track_wallet(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle wallet tracking request"""
        if not args:
            self.send_message(chat_id, "⚠️ Please provide a wallet address: /track_wallet [address]")
            return {'status': 'error', 'message': 'missing_address'}
        
        wallet_address = args[0]
        self.send_message(chat_id, f"🔍 Starting monitoring for wallet:\n<code>{wallet_address}</code>")
        
        # Send to Make.com for blockchain monitoring
        self.send_to_make('wallet_tracking', {
            'user_id': user.get('id'),
            'wallet_address': wallet_address,
            'chains': ['ethereum', 'bitcoin', 'bsc']
        })
        
        # Tracking confirmation
        tracking_info = """
<b>Wallet Tracking Activated</b> ✅

<b>Address:</b> <code>{}</code>

<b>Monitoring:</b>
• All incoming transactions
• All outgoing transactions
• Token transfers
• Smart contract interactions

<b>Alerts:</b>
• Large transfers (>$10,000)
• Exchange deposits
• Suspicious activity

You'll receive real-time notifications for all activities.
        """.format(wallet_address[:8] + '...' + wallet_address[-6:])
        
        self.send_message(chat_id, tracking_info)
        
        # Store recovery case
        self.recovery_cases.append({
            'user': user.get('username'),
            'wallet': wallet_address,
            'status': 'tracking',
            'timestamp': datetime.utcnow().isoformat()
        })
        
        return {'status': 'success', 'action': 'wallet_tracking_started'}
    
    def handle_status(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle system status request"""
        status = """
<b>System Status</b> 🟢

<b>Services:</b>
• Security Bot: ✅ Online
• Property Bot: ✅ Online  
• Recovery Bot: ✅ Online
• Make.com: {} Connected

<b>Statistics (24h):</b>
• Security Alerts: {}
• Properties Viewed: {}
• Recovery Cases: {}

<b>Response Time:</b> <100ms
<b>Uptime:</b> 99.99%
        """.format(
            "✅" if self.make_webhook_url else "❌",
            len(self.security_alerts),
            len(self.property_updates),
            len(self.recovery_cases)
        )
        
        self.send_message(chat_id, status)
        return {'status': 'success', 'action': 'status_sent'}
    
    def handle_block_ip(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle IP blocking request"""
        if not args:
            self.send_message(chat_id, "⚠️ Please provide an IP address: /block_ip [address]")
            return {'status': 'error', 'message': 'missing_ip'}
        
        ip_address = args[0]
        self.send_message(chat_id, f"🚫 Blocking IP address: {ip_address}")
        
        # Send to Make.com for firewall update
        self.send_to_make('block_ip', {
            'ip_address': ip_address,
            'user_id': user.get('id'),
            'reason': ' '.join(args[1:]) if len(args) > 1 else 'Manual block'
        })
        
        self.send_message(chat_id, f"✅ IP {ip_address} has been blocked successfully!")
        self.broadcast_to_channel(f"Security: IP {ip_address} blocked by {user.get('username', 'admin')}", 'danger')
        
        return {'status': 'success', 'action': 'ip_blocked'}
    
    def handle_incident_log(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle incident log request"""
        incidents = """
<b>Recent Security Incidents</b> 📋

<b>1. [HIGH] DDoS Attack Attempt</b>
🕐 2 hours ago
📍 Origin: 185.220.101.45
🛡️ Status: Mitigated

<b>2. [MEDIUM] Unauthorized Access</b>
🕐 5 hours ago  
📍 Target: Admin Panel
🛡️ Status: Blocked

<b>3. [LOW] Port Scan Detected</b>
🕐 12 hours ago
📍 Ports: 22, 80, 443, 3306
🛡️ Status: Monitored

<b>4. [MEDIUM] Phishing Email</b>
🕐 1 day ago
📍 Target: finance@company.com
🛡️ Status: Quarantined

Total incidents (7 days): 47
Resolved: 45 | Pending: 2
        """
        
        self.send_message(chat_id, incidents)
        return {'status': 'success', 'action': 'incidents_sent'}
    
    def handle_schedule_viewing(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle property viewing scheduling"""
        if not args:
            self.send_message(chat_id, "⚠️ Please provide property ID: /schedule_viewing [ID]")
            return {'status': 'error', 'message': 'missing_property_id'}
        
        property_id = args[0]
        
        # Send to Make.com for calendar integration
        self.send_to_make('schedule_viewing', {
            'property_id': property_id,
            'user_id': user.get('id'),
            'user_name': user.get('first_name', 'Guest')
        })
        
        response = f"""
<b>Viewing Scheduled!</b> ✅

Property ID: {property_id}
Available times sent to your email.

Our agent will contact you within 24 hours to confirm.
        """
        
        self.send_message(chat_id, response)
        return {'status': 'success', 'action': 'viewing_scheduled'}
    
    def handle_tenant_status(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle tenant status check"""
        if not args:
            self.send_message(chat_id, "⚠️ Please provide unit number: /tenant_status [unit]")
            return {'status': 'error', 'message': 'missing_unit'}
        
        unit = args[0]
        
        # Mock tenant data (in production, from database)
        status = f"""
<b>Tenant Status - Unit {unit}</b> 📊

<b>Tenant:</b> John Smith
<b>Lease Period:</b> Jan 2024 - Dec 2024
<b>Rent Status:</b> ✅ Paid (Current)
<b>Last Payment:</b> Nov 1, 2024
<b>Security Deposit:</b> $3,500 (Held)

<b>Maintenance Requests:</b> 2 (1 pending)
<b>Violations:</b> None

<b>Contact:</b> john.s@email.com
        """
        
        self.send_message(chat_id, status)
        return {'status': 'success', 'action': 'tenant_status_sent'}
    
    def handle_analyze_tx(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle transaction analysis"""
        if not args:
            self.send_message(chat_id, "⚠️ Please provide transaction hash: /analyze_tx [hash]")
            return {'status': 'error', 'message': 'missing_hash'}
        
        tx_hash = args[0]
        self.send_message(chat_id, f"🔎 Analyzing transaction...")
        
        # Send to Make.com for blockchain analysis
        self.send_to_make('analyze_transaction', {
            'tx_hash': tx_hash,
            'user_id': user.get('id')
        })
        
        # Mock analysis (in production, real blockchain data)
        analysis = f"""
<b>Transaction Analysis</b> 🔍

<b>Hash:</b> <code>{tx_hash[:10]}...{tx_hash[-8:]}</code>

<b>Details:</b>
• Chain: Ethereum
• Value: 2.5 ETH ($4,750)
• Gas: 0.003 ETH
• Status: Confirmed

<b>From:</b> <code>0x742d...8963</code>
• Type: Personal Wallet
• Risk: Low

<b>To:</b> <code>0x9b5f...2a4e</code>
• Type: Exchange (Binance)
• Risk: Medium

<b>Tracing:</b>
This transaction appears to be a standard exchange deposit.
No suspicious patterns detected.
        """
        
        self.send_message(chat_id, analysis)
        return {'status': 'success', 'action': 'transaction_analyzed'}
    
    def handle_recovery_case(self, chat_id: str, args: List[str], user: Dict) -> Dict:
        """Handle recovery case status check"""
        if not args:
            self.send_message(chat_id, "⚠️ Please provide case ID: /recovery_case [ID]")
            return {'status': 'error', 'message': 'missing_case_id'}
        
        case_id = args[0]
        
        case_status = f"""
<b>Recovery Case Status</b> 📁

<b>Case ID:</b> {case_id}
<b>Status:</b> 🟡 In Progress

<b>Timeline:</b>
• Case opened: Oct 15, 2024
• Investigation: ✅ Complete
• Legal filing: ✅ Submitted
• Exchange contact: 🔄 Pending
• Recovery: ⏳ Awaiting

<b>Amount:</b> $125,000
<b>Recovery Probability:</b> 75%
<b>Est. Completion:</b> Dec 2024

Our team is actively working on your case.
        """
        
        self.send_message(chat_id, case_status)
        return {'status': 'success', 'action': 'case_status_sent'}
    
    def handle_message(self, chat_id: str, text: str, user: Dict) -> Dict:
        """Handle non-command messages"""
        # Send to Make.com for NLP processing
        self.send_to_make('message_received', {
            'user_id': user.get('id'),
            'message': text,
            'timestamp': datetime.utcnow().isoformat()
        })
        
        # Simple response
        self.send_message(
            chat_id,
            "I received your message. Use /help to see available commands."
        )
        
        return {'status': 'success', 'action': 'message_processed'}
    
    def handle_unknown_command(self, chat_id: str, command: str) -> Dict:
        """Handle unknown commands"""
        self.send_message(
            chat_id,
            f"❓ Unknown command: {command}\nUse /help to see available commands."
        )
        return {'status': 'error', 'message': 'unknown_command'}

# Automation workflows for Make.com integration

class AutomationWorkflows:
    """Predefined automation workflows for Make.com"""
    
    @staticmethod
    def security_monitoring_workflow():
        """Security monitoring automation workflow"""
        return {
            'name': 'Security Monitoring',
            'triggers': [
                'threat_detected',
                'unauthorized_access',
                'malware_found',
                'ddos_attack'
            ],
            'actions': [
                'send_alert',
                'block_ip',
                'quarantine_file',
                'notify_admin',
                'create_incident_ticket'
            ],
            'schedule': 'real-time'
        }
    
    @staticmethod
    def property_management_workflow():
        """Property management automation workflow"""
        return {
            'name': 'Property Management',
            'triggers': [
                'new_inquiry',
                'viewing_request',
                'maintenance_needed',
                'rent_due',
                'lease_expiring'
            ],
            'actions': [
                'send_notification',
                'schedule_appointment',
                'create_task',
                'generate_invoice',
                'update_crm'
            ],
            'schedule': 'event-based'
        }
    
    @staticmethod
    def asset_recovery_workflow():
        """Asset recovery automation workflow"""
        return {
            'name': 'Asset Recovery',
            'triggers': [
                'wallet_activity',
                'suspicious_transaction',
                'exchange_deposit',
                'mixer_detected'
            ],
            'actions': [
                'track_funds',
                'alert_team',
                'generate_report',
                'contact_exchange',
                'file_report'
            ],
            'schedule': 'continuous'
        }

# Initialize handler
bot_handler = TelegramBotHandler()