# EolianVR Website - PRD

## Problem Statement
Build a modernized, innovative, futuristic website for EolianVR, Inc. — a defense tech company specializing in AR/VR solutions. Inspired by Anduril and Palantir aesthetics.

## Architecture
- **Frontend**: React (CRA) + Tailwind CSS + Framer Motion + Shadcn UI
- **Backend**: FastAPI + MongoDB (Motor)
- **Design**: Dark theme (#050505), red accents (#FF0B1B), Unbounded + JetBrains Mono fonts

## User Personas
- Defense/government procurement officers evaluating AR/VR solutions
- Military unit commanders exploring C2/mission planning tools
- Enterprise decision-makers considering ARTAK adoption

## Core Requirements
- Single-page website with smooth scroll navigation
- Hero section with animated tactical canvas background
- ARTAK product showcase (bento grid: C2, Pre-Mission Planning, ROC Drill)
- Block 2 features technical specs
- Cross-platform compatibility showcase
- Contact form (stores submissions in MongoDB)

## What's Been Implemented (Dec 2025)
- [x] Navigation: Fixed dark nav with smooth scroll, mobile hamburger menu
- [x] Hero: Animated canvas tactical grid, bold Unbounded heading, CTAs
- [x] Product Section: 4-panel bento grid with images, system labels, descriptions
- [x] Features Section: 10 Block 2 features in 2-column grid with icons
- [x] Platform Section: 6 device platform cards + scrolling marquee
- [x] Contact Section: Terminal-style form with MongoDB persistence
- [x] Footer: Logo, links, copyright
- [x] Backend: Contact form API (POST/GET /api/contact)
- [x] Testing: 100% backend (7/7), 95% frontend pass rate

## P0/P1/P2 Features Remaining
### P1
- Video background integration for hero section (user expressed interest)
- Email notification on form submission (SendGrid/Resend)
- News/blog section

### P2
- Team bios section
- Partner logos section
- 3D globe element (react-globe.gl or Three.js)
- Admin dashboard for contact submissions

## Next Tasks
1. Add actual video background to hero (user wanted to explore this)
2. Set up email notifications for contact form
3. Build news/blog section
4. Add team bios and partner logos
