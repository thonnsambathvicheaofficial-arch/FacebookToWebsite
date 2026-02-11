# Quick Deploy to Vercel

The fastest way to deploy this project:

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

## Manual Deploy (5 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click **Deploy** (it will fail - that's OK!)

### 3. Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```env
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
FACEBOOK_CLIENT_ID=<from Facebook Developers>
FACEBOOK_CLIENT_SECRET=<from Facebook Developers>
FACEBOOK_APP_TOKEN=<from Facebook Developers>
```

### 4. Redeploy

Go to Deployments → Click "..." → Redeploy

### 5. Configure Facebook App

Add to Facebook Login → Valid OAuth Redirect URIs:
```
https://your-project.vercel.app/api/auth/callback/facebook
```

**Done!** 🎉

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
