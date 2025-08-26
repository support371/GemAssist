
# GEM Telegram Workflow Master Reference

## Master Table of Bots

### 1. @GEMAssist_bot
**Purpose:** Central operations bot. Handles client intake, case submissions, KYC, scheduling, and automation.
**Commands:**
- /start
- /help
- /contact
- /services
- /toolkit
- /book
- /submitcase
- /refer
- /terms
- /dashboard
- /kyc
**Setup / Integrations:**
- AI-summarized RSS feeds (cybersecurity, finance, real estate)
- Trello/Notion logging
- Admin notifications
- Dashboard/KYC integration

### 2. @GemCyberAssist_bot
**Purpose:** Main client service assistant. Focused on asset recovery, legal intake, toolkit delivery, referrals, and compliance guidance.
**Commands:**
- /start
- /help
- /contact
- /services
- /toolkit
- /book
- /submitcase
- /refer
- /terms
- /dashboard
- /kyc
**Setup / Integrations:**
- Linked intake forms & PDF delivery
- Trello/Notion logging
- Admin notifications
- Future /dashboard client portal link

### 3. @CyberGEMSecure_bot (merged @CyberGEMBot + @gemCybersecurity_bot)
**Purpose:** Cybersecurity education + compliance + consulting bot. Public tips + client service.
**Commands:**
- /start
- /help
- /contact
- /dailygem
- /news
- /privacy
- /gdpr
- /monitor
- /consult
- /riskcheck
- /assist
- /tools
- /library
- /train
- /about
- /services
**Setup / Integrations:**
- RSS → AI feed posting
- Scheduled daily/motivational posts
- Trello/Notion logging
- Booking/consult forms
- Redirect /assist to @GemCyberAssist_bot

### 4. @realestatechannel_bot
**Purpose:** Real estate content & services hub. Market updates, client intake, brokerage, commercial improvement, and investment consultations.
**Commands:**
- /start
- /help
- /contact
- /updates
- /services
- /book
- /submitcase
- /refer
- /terms
- /dashboard
**Setup / Integrations:**
- RSS → AI feed posting (real estate, finance)
- Trello/Notion logging
- Admin notifications
- Client dashboard integration

### 5. @GemCybersecurity_bot (merged)
**Purpose:** Previously a cybersecurity + compliance bot (education + consulting). Now merged.
**Commands:** See @CyberGEMSecure_bot
**Setup / Integrations:** Consolidated into @CyberGEMSecure_bot to remove duplication

## Notes for Agents
1. Command overlaps (/help, /contact, /services, /terms, /dashboard) are intentional.
2. Workflow Logic:
   - Users start with @GEMAssist_bot (services / recovery) or @CyberGEMSecure_bot (education / consulting).
   - Real estate users start with @realestatechannel_bot.
   - AI-summarized RSS feeds broadcast automatically to relevant bots.
3. Logging & Admin:
   - All submissions, bookings, and RSS broadcasts logged in Trello/Notion.
   - Admins receive instant notifications for new submissions or workflow events.
4. Dashboard / KYC Integration:
   - /dashboard links direct clients to secure web portals.
   - /kyc / intake forms embedded or linked to Typeform/Tally/Notion.
