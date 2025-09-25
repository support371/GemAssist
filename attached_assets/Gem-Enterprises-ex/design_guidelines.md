# GEM Enterprise Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from enterprise cybersecurity leaders like CrowdStrike, Palo Alto Networks, and real estate platforms like Compass. The platform requires professional credibility while maintaining modern aesthetics for dual cybersecurity/real estate focus.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Dark: 210 25% 8% (Deep navy for backgrounds)
- Light: 210 15% 95% (Clean off-white)

**Brand Colors:**
- Primary: 210 100% 50% (Professional blue)
- Success: 142 76% 36% (Security green)
- Warning: 45 93% 47% (Alert amber)
- Danger: 0 84% 60% (Threat red)

**Accent Strategy:**
- Minimal accent usage - rely on primary blue and security green
- No gold/yellow accents to maintain professional tone

### Typography
**Font Stack:** Inter (Google Fonts)
- Headings: 600-700 weight, larger scales for hero sections
- Body: 400 weight, 500 for emphasis
- Code/Technical: JetBrains Mono for security logs/data

### Layout System
**Tailwind Spacing:** Consistent use of 4, 6, 8, 12, 16 units
- Container max-widths: 7xl for main content
- Section padding: py-16 for desktop, py-8 mobile
- Component spacing: gap-6 standard, gap-8 for major sections

### Component Library

**Navigation:**
- Fixed header with glassmorphism effect (backdrop-blur-md)
- Dual-brand navigation indicating both cybersecurity and real estate services
- Secure client portal access prominently featured

**Hero Sections:**
- Full-viewport height with subtle gradient overlays
- Professional imagery showing security operations centers or modern real estate
- Clear value propositions for both service verticals

**Security Dashboard Elements:**
- Real-time monitoring cards with live metrics
- Threat level indicators using color-coded status system
- Clean data visualization with minimal chartjunk

**Forms:**
- Secure styling with validation states
- Multi-step forms for complex processes (power of attorney, client onboarding)
- Clear progress indicators

**Client Portal Components:**
- Role-based access visual indicators
- Service status cards with clear iconography
- Document management interface with security badges

### Visual Treatment

**Gradients:**
- Subtle navy-to-blue gradients for hero backgrounds (210 25% 8% to 210 40% 12%)
- Success gradients for positive metrics (142 76% 36% to 142 60% 45%)

**Background Treatments:**
- Clean geometric patterns for enterprise credibility
- Subtle grid overlays in dashboard sections
- Professional photography with blue/teal color grading

**Component Styling:**
- Rounded corners: rounded-lg standard, rounded-xl for cards
- Shadows: Professional drop shadows, avoid harsh edges
- Borders: Subtle 1px borders in neutral grays

### Animations
**Minimal Implementation:**
- Smooth transitions on navigation state changes
- Subtle fade-ins for dashboard metric updates
- No distracting hover animations - rely on solid hover states

## Images
**Hero Image Requirements:**
- Large hero image featuring split-screen concept: security operations center on one side, modern real estate on the other
- Professional team photos for about section
- Clean architectural photography for real estate services
- Cybersecurity iconography (shields, locks, network diagrams) as supporting graphics
- Client testimonial headshots with professional lighting

**Placement:**
- Hero: Full-width background image with overlay
- Services: Icon-based imagery, not photography
- About: Team photography in grid layout
- Portfolio: Project showcase imagery for both verticals

## Key Design Principles
1. **Dual-Industry Credibility:** Visual elements must work for both cybersecurity and real estate audiences
2. **Enterprise Trust:** Conservative, professional aesthetic over trendy design
3. **Data Clarity:** Security metrics and real estate data must be immediately readable
4. **Secure Aesthetics:** Visual cues that communicate security and reliability throughout