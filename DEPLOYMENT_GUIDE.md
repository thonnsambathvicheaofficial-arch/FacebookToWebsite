# Vercel Deployment Guide for DigitalStore KH

This guide will walk you through deploying your Facebook-to-Website platform to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier is fine to start)
- Facebook Developer App configured
- Domain name (optional, but recommended for production)

---

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit - Facebook to Website Platform"
```

### 1.2 Create `.gitignore`

Make sure your `.gitignore` includes:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### 1.3 Push to GitHub

```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Configure Facebook App for Production

### 2.1 Update Facebook App Settings

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Go to **Settings > Basic**
4. Add your production domain to **App Domains**:
   - `your-domain.vercel.app` (or your custom domain)

### 2.2 Configure OAuth Redirect URIs

1. Go to **Facebook Login > Settings**
2. Add to **Valid OAuth Redirect URIs**:
   ```
   https://your-domain.vercel.app/api/auth/callback/facebook
   ```

### 2.3 Get Your App Token

1. Go to [Facebook Access Token Tool](https://developers.facebook.com/tools/accesstoken/)
2. Copy your **App Token** (not User Token)
3. Save this for Step 4

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Click **"Import"**

### 3.2 Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.3 Click "Deploy"

Wait for the initial deployment (this will fail because environment variables are missing - that's expected!)

---

## Step 4: Add Environment Variables

### 4.1 Go to Project Settings

1. In Vercel dashboard, go to your project
2. Click **"Settings"** tab
3. Click **"Environment Variables"**

### 4.2 Add Required Variables

Add each of these variables:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Your production URL |
| `NEXTAUTH_SECRET` | Generate using command below | Must be secure random string |
| `FACEBOOK_CLIENT_ID` | Your FB App ID | From Facebook Developers |
| `FACEBOOK_CLIENT_SECRET` | Your FB App Secret | From Facebook Developers |
| `FACEBOOK_APP_TOKEN` | Your FB App Token | From Step 2.3 |

### 4.3 Generate NEXTAUTH_SECRET

Run this command locally to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online: https://generate-secret.vercel.app/32

### 4.4 Set Environment for All Deployments

Make sure to select:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Step 5: Redeploy

### 5.1 Trigger Redeploy

1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

OR simply push a new commit:

```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

### 5.2 Verify Deployment

1. Wait for deployment to complete (usually 1-2 minutes)
2. Click **"Visit"** to see your live site
3. Test the Facebook login flow

---

## Step 6: Configure Custom Domain (Optional)

### 6.1 Add Domain in Vercel

1. Go to **"Settings"** > **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `digitalstore-kh.com`)

### 6.2 Configure DNS

Vercel will show you DNS records to add. Typically:

**For root domain (digitalstore-kh.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.3 Enable Wildcard Subdomain (for multi-tenant sites)

**Important for your platform!** This allows `shop1.yourdomain.com`, `shop2.yourdomain.com`, etc.

Add this DNS record:
```
Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

### 6.4 Update Environment Variables

Update `NEXTAUTH_URL` to your custom domain:
```
NEXTAUTH_URL=https://digitalstore-kh.com
```

### 6.5 Update Facebook App

Update OAuth redirect URI in Facebook:
```
https://digitalstore-kh.com/api/auth/callback/facebook
```

---

## Step 7: Verify Everything Works

### 7.1 Test Checklist

- [ ] Homepage loads correctly
- [ ] Facebook login works
- [ ] URL scraping works (paste a Facebook page URL)
- [ ] Editor interface loads
- [ ] Preview page displays correctly
- [ ] PWA manifest is accessible at `/manifest.json`
- [ ] Images load from Facebook CDN

### 7.2 Check Logs

If something doesn't work:

1. Go to **"Deployments"** tab
2. Click on the latest deployment
3. Click **"Functions"** tab to see server logs
4. Check for errors

---

## Step 8: Performance Optimization (Post-Deploy)

### 8.1 Enable Analytics

1. Go to **"Analytics"** tab
2. Enable Vercel Analytics (free tier available)

### 8.2 Configure Caching

Add this to `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  // ... existing config
  
  // Cache static assets for 1 year
  async headers() {
    return [
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 8.3 Monitor Performance

Use Vercel's built-in tools:
- **Speed Insights**: Track Core Web Vitals
- **Web Analytics**: Monitor traffic and user behavior

---

## Troubleshooting

### Issue: "Invalid OAuth Redirect URI"

**Solution**: Make sure you added the exact redirect URI to Facebook:
```
https://your-domain.vercel.app/api/auth/callback/facebook
```

### Issue: "NEXTAUTH_URL mismatch"

**Solution**: Ensure `NEXTAUTH_URL` matches your actual domain (no trailing slash)

### Issue: Images not loading

**Solution**: Check that Facebook CDN domains are in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '**.fbcdn.net' },
    { protocol: 'https', hostname: 'graph.facebook.com' },
  ],
}
```

### Issue: Build fails

**Solution**: Check the build logs in Vercel. Common issues:
- TypeScript errors (fix locally first)
- Missing dependencies (check `package.json`)
- Environment variables not set

---

## Production Checklist

Before going live:

- [ ] All environment variables set correctly
- [ ] Facebook App is in **Live Mode** (not Development)
- [ ] Custom domain configured (if using)
- [ ] SSL certificate is active (automatic with Vercel)
- [ ] Test on mobile devices
- [ ] Test with real Facebook pages
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure backup/database (when you add Supabase)

---

## Next Steps

1. **Add Database**: Connect Supabase for persistent storage
2. **Set up Monitoring**: Use Sentry or LogRocket for error tracking
3. **Enable Webhooks**: Real-time sync with Facebook pages
4. **Add Payment**: Integrate KHQR for subscriptions
5. **Marketing**: Launch to Cambodian business communities!

---

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Facebook App Setup](https://developers.facebook.com/docs/development/create-an-app)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

**Need Help?** 
- Vercel Support: https://vercel.com/support
- Next.js Discord: https://nextjs.org/discord
- Facebook Developer Community: https://developers.facebook.com/community/

Good luck with your deployment! 🚀🇰🇭
