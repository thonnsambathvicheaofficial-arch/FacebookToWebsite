# Implementation Roadmap: Facebook to Website Generator

## Phase 1: Foundation & Extraction (Weeks 1-3)
**Goal:** Successfully connect to Facebook API and view raw data.

1.  **Project Setup:**
    *   Initialize Next.js repo with Tailwind CSS.
    *   Set up Supabase project (PostgreSQL).
2.  **Facebook App Setup:**
    *   Create App in Meta Developers Portal.
    *   Configure Facebook Login product.
    *   Set up Test Users and Test Pages.
3.  **Authentication Module:**
    *   Implement `NextAuth.js` with Facebook Provider.
    *   Store `access_token` securely in Supabase.
4.  **Extraction Service (v1):**
    *   Build API route to fetch Page Feed (`/me/feed`).
    *   Build parser to extract image URLs and caption text.
    *   Display raw JSON data in a "Debug" dashboard.

## Phase 2: The Generator Engine (Weeks 4-6)
**Goal:** Turn raw data into a visual website.

1.  **Data Modeling:**
    *   Define DB Schema: `Sites`, `Pages`, `Products`, `ThemeConfig`.
2.  **Template Development (Theme "Phnom Penh"):**
    *   Create a clean, mobile-first e-commerce layout.
    *   Components: Navbar (Logo + Contact), Hero Slider (Cover Photos), Product Grid.
3.  **Mapping Logic:**
    *   Algorithm to convert FB Post -> Product Card.
    *   Regex for Price Extraction (e.g., `Price: $10`, `តម្លៃ: 40000`).
4.  **Preview Mode:**
    *   Allow user to modify the Site Title and Colors in a settings form and see live updates.

## Phase 3: Customization & PWA (Weeks 7-9)
**Goal:** Make it a deployable product.

1.  **Editor Interface:**
    *   Implement "Hide/Show" toggles for posts.
    *   Allow manual editing of Product Title/Price (correcting the auto-parser).
2.  **Image Optimization:**
    *   Integrate image proxy to serve FB images via Next/Image (caching them).
3.  **PWA Integration:**
    *   Add `next-pwa`.
    *   Generate `manifest.json` dynamically based on user settings.
    *   Service Worker configuration for offline fallback.

## Phase 4: Production & Deployment (Weeks 10-12)
**Goal:** Live URL and onboarding.

1.  **Domain Management:**
    *   Implement Wildcard Subdomains on Vercel (`*.myapp.com`).
    *   Middleware to rewrite requests based on subdomain to specific site ID.
2.  **Polishing:**
    *   Khmer Language Support (i18n for platform UI).
    *   Loading skeletons and error states.
3.  **Launch:**
    *   Deploy to production.
    *   Beta testing with 5 friendly local business owners.

## Phase 5: Future Enhancements (Post-Launch)
*   **Webhooks:** Real-time updates when a user posts on FB.
*   **E-commerce:** "Add to Cart" with Telegram checkout integration.
*   **AI Integration:** Use OpenAI to rewrite captions into SEO-friendly descriptions.
