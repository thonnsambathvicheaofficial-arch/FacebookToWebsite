# Project: DigitalStore KH (Facebook to Website Platform)

## Overview
**DigitalStore KH** is a platform designed to empower Cambodian businesses by automatically generating professional, mobile-optimized websites directly from their Facebook Pages.

## Documentation
*   [Technical Specification](./TECHNICAL_SPEC.md) - Detailed system architecture, technology stack, and data strategies.
*   [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md) - Phased development plan from setup to launch.

## Key Features
1.  **Instant Website Generation:** Connect a Facebook Page, get a website in seconds.
2.  **Mobile-First PWA:** Fast, installable web apps optimized for unstable networks.
3.  **Khmer Language Support:** Built-in localization and font handling.
4.  **Zero-Code Customization:** effortless editing for non-technical users.

## Getting Started
To begin development, please refer to **Phase 1** of the [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md).

## Technology Stack
*   **Frontend:** Next.js 14, Tailwind CSS
*   **Backend:** Next.js Server Functions, Supabase (PostgreSQL)
*   **Hosting:** Vercel
*   **Payments:** KHQR / ABA Pay Integration (Future)

## Project Status

✅ **Phase 1**: Foundation & Facebook API Integration  
✅ **Phase 2**: Website Generator Engine  
✅ **Phase 3**: Editor Interface & PWA  
✅ **Phase 4**: Production Polish & i18n  
✅ **Phase 5**: URL-based Page Scraping (No OAuth Required!)

**Status**: Ready for Production Deployment 🚀

## Deployment

### Quick Deploy to Vercel

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for a 5-minute deployment guide.

### Detailed Deployment Guide

For comprehensive deployment instructions including:
- Environment variable configuration
- Facebook App setup for production
- Custom domain configuration
- Wildcard subdomain setup for multi-tenancy
- Troubleshooting tips

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Features

### ✨ Dual Onboarding Paths
1. **Paste URL** - Simply paste any public Facebook Page URL (no login required!)
2. **OAuth Login** - Connect your Facebook account for advanced features

### 🎨 Professional Templates
- Mobile-first responsive design
- Khmer language support (Battambang & Kantumruy Pro fonts)
- PWA capabilities for offline access
- Automatic product extraction from posts

### 🛠️ Visual Editor
- Real-time preview
- Color customization
- Product visibility controls
- Contact information management

---
*Built with ❤️ for Cambodian businesses*
## Setup & Installation

### 1. Facebook Developer App
To use the Facebook Login and Graph API, you must create a Facebook App:
1.  Go to [developers.facebook.com](https://developers.facebook.com/).
2.  Create a new App (Type: **Business**).
3.  Add the **Facebook Login for Business** product.
4.  In the basic settings, copy your `App ID` and `App Secret`.
5.  Add `http://localhost:3000` to "Valid OAuth Redirect URIs" in the Facebook Login settings.

### 2. Environment Variables
Rename `.env.local.example` (if applicable) or edit `.env.local` directly:
- Set `FACEBOOK_CLIENT_ID` with your App ID.
- Set `FACEBOOK_CLIENT_SECRET` with your App Secret.
- `NEXTAUTH_SECRET` is already set to a placeholder, change it for production. 

### 3. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

