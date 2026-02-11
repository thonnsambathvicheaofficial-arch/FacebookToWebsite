# Facebook Page to Professional Website Platform (Technical Specification)

## 1. Executive Summary
This document outlines the technical architecture and implementation strategy for a platform that automates website creation for Cambodian businesses using their Facebook Page data. The goal is to bridge the gap between social media presence and professional e-commerce, offering a mobile-optimized, fast, and SEO-friendly website (PWA) specifically tailored for the local market.

## 2. Technical Architecture

### 2.1 Technology Stack
*   **Frontend Framework:** Next.js 14+ (App Router)
    *   *Rationale:* Superior SEO capabilities (SSR/ISG), built-in image optimization, and rapid development.
*   **Styling:** Tailwind CSS + Headless UI / Shadcn
    *   *Rationale:* Utility-first approach allows for rapid prototyping and highly customizable themes without bloat.
*   **Database:** PostgreSQL (via Supabase or Neon)
    *   *Rationale:* Relational data model suits structured business data (Products, Categories, Orders). Supabase offers real-time features and authentication out-of-the-box.
*   **Content Extraction & Sync:** Node.js Microservices/Serverless Functions
    *   *Rationale:* Isolate the Facebook Graph API logic to handle rate limits and background processing efficiently.
*   **Image Handling:** Cloudinary or AWS S3 + Image Optimization Service
    *   *Rationale:* Facebook image URLs expire; we must download, optimize (WebP/AVIF), and serve from our own CDN.
*   **PWA Support:** `next-pwa` module
    *   *Rationale:* Essential for offline capabilities and "installable" app experience.

### 2.2 System Components
1.  **Extraction Engine:** Connects to Facebook Graph API, fetches page data (Info, Feed, Photos, Reviews), and normalizes it.
2.  **Core Platform:** User dashboard for managing the generated site, selecting themes, and customizing content.
3.  **Generator Engine:** Dynamic rendering system that maps normalized data to Next.js templates.
4.  **Deployment Pipeline:** Automated subdomain provisioning (e.g., `shop-name.kh-store.com`) and SSL management.

## 3. Facebook Data Extraction Strategy

### 3.1 Authentication & Permissions
*   **Login with Facebook:** Use OAuth 2.0 to get a User Access Token.
*   **Permissions Required:**
    *   `pages_show_list`: To list user's pages.
    *   `pages_read_engagement`: to read content Posted by the Page.
    *   `pages_read_user_content`: To read user content on the Page.
    *   `public_profile`: Basic user info.

### 3.2 Data Mapping Strategy
*   **Business Info:** Map `about`, `phone`, `email`, `website`, `location` to the site's Footer and Contact page.
*   **Posts as Products:**
    *   *Heuristic:* Detect posts with images and keywords like "Price", "USD", "Rl", "$", "៛".
    *   *Extraction:* Use Regex/NLP to parse price and product title from the post caption.
    *   *Images:* Download full-res images from post attachments.
*   **Albums as Collections:** Map Facebook Albums to "Product Categories" or "Galleries".
*   **Reviews:** Import latest 5-star reviews for social proof.

### 3.3 Rate Limiting & Updates
*   Implement Webhooks (`page_feed`) to listen for new posts and auto-update the website.
*   Use a Redis queue (BullMQ) to handle initial heavy data import to avoid API timeouts.

## 4. Website Generation Engine

### 4.1 Template System
*   **Modular Blocks:** Header, Hero (Cover Photo), Product Grid (Feed), About Us, Contact, Footer.
*   **Theming:** Use CSS variables for primary colors (extracted from Page profile pic or manually set) and fonts.
*   **Layouts:**
    *   *Retail:* Grid-heavy, price-focused.
    *   *Service/Restaurant:* Menu/List-focused, booking-oriented.
    *   *Portfolio:* Image-heavy, masonry layouts.

### 4.2 PWA Implementation
*   **Manifest Generation:** Auto-generate `manifest.json` using the Page's Name, Logo, and primary color.
*   **Service Workers:** Cache extracting critical CSS/JS and the last 20 loaded products for offline browsing.
*   **Install Prompt:** Custom "Install App" button for iOS/Android users.

## 5. User Interface Design (Editing Workflow)

### 5.1 Onboarding Flow (The "Magic" Moment)
1.  User logs in with Facebook.
2.  Selects a Page from the list.
3.  **Loading Screen (10-30s):** System fetches data, analyzes colors, and builds the initial site.
4.  **Preview:** User sees a fully formed website immediately.

### 5.2 The Editor
*   **WYSIWYG Lite:** Avoiding complex drag-and-drop. Use a "Sidebar Editor" approach (Click an element -> Edit properties in sidebar).
*   **Toggle Sections:** "Show/Hide" toggle for sections imported from Facebook (e.g., "Hide this post from website").
*   **Localization:** Interface available in **Khmer** and English.

## 6. Deployment & Hosting

### 6.1 Hosting Infrastructure
*   **Vercel / Netlify:** Best for scalable frontend hosting with global CDN.
*   **DNS Management:**
    *   Subdomains: `*.yourservice.com` (Wildcard DNS record).
    *   Custom Domains: Use CNAME records (Vercel automatic SSL generation).

### 6.2 Cambodia Specifics
*   **Cloudflare CDN:** Ensure edge caching is active near the region (Singapore/Bangkok nodes often serve KH well).
*   **Image Optimization:** Aggressive compression (AVIF/WebP) is critical for local 4G networks.

## 7. Monetization Model

### 7.1 Tiered Pricing
*   **Free (Starter):**
    *   Subdomain (`shop-name.service.com`).
    *   Sync manually (Sync button).
    *   Ad-supported footer.
*   **Pro ($5 - $10 / month):**
    *   Custom Domain (`shop-name.com`).
    *   Real-time auto-sync.
    *   No ads.
    *   SEO Tools.
    *   WhatsApp/Telegram direct ordering button.
*   **Enterprise (Agency):**
    *   For agencies managing multiple pages.

### 7.2 Local Payment Integration
*   Integrate **KHQR** (Acleda / ABA) for subscription payments.
*   Allow "Pay via Telegram" workflow for manual verify if API integration is complex initially.

## 8. Technical Challenges & Solutions

| Challenge | Solution |
| :--- | :--- |
| **API Limitations** | Facebook Graph API has strict rate limits. **Solution:** Webhooks for incremental updates; avoid full re-scrapes. Cache aggressively. |
| **Unstructured Data** | Post captions are messy. **Solution:** Use a robust parser (or LLM via OpenAI API) to identify "Product Name" vs. "Description" vs. "Price". |
| **Low-Res Images** | FB compresses images. **Solution:** Fetch the `full_res` URL if available; use CSS filters to handle artifacts; encourage users to upload high-res in the Editor. |
| **Khmer Fonts** | Rendering issues. **Solution:** Enforce web-safe Google Fonts (`Battambang`, `Kantumruy Pro`, `Siemreap`) universally. |
| **User Trust** | "Is this real?" **Solution:** Display "Verified by Facebook" badge on the generated site if the FB page is verified. |
