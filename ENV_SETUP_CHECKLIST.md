# Environment Variables Setup Checklist

## Your Generated Secret
```
NEXTAUTH_SECRET=aQjD3Q96E/QsWl8XaH2uDeRJyXsqPQKlFg6yMSKI5lE=
```
**✅ Copy this value - you'll need it in Step 3**

---

## Step 1: Get Your Vercel Deployment URL

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project
3. Look for the deployment URL (e.g., `your-project-abc123.vercel.app`)
4. Copy this URL

---

## Step 2: Set Up Facebook App

### 2.1 Go to Facebook Developers
1. Visit: https://developers.facebook.com/apps
2. Click on your app (or create a new one if you haven't)

### 2.2 Get Your App Credentials

**App ID and Secret:**
1. Go to **Settings → Basic**
2. Copy your **App ID** 
3. Click **Show** next to **App Secret** and copy it
4. Save these values

**App Token:**
1. Go to: https://developers.facebook.com/tools/accesstoken/
2. Look for your app in the list
3. Copy the **App Token** (NOT the User Access Token)
4. Save this value

### 2.3 Configure OAuth Redirect

1. In your Facebook App, go to **Facebook Login → Settings**
2. In **Valid OAuth Redirect URIs**, add:
   ```
   https://your-project-abc123.vercel.app/api/auth/callback/facebook
   ```
   (Replace with your actual Vercel URL from Step 1)
3. Click **Save Changes**

### 2.4 Add App Domain

1. Still in **Settings → Basic**
2. Scroll to **App Domains**
3. Add your Vercel domain:
   ```
   your-project-abc123.vercel.app
   ```
4. Click **Save Changes**

---

## Step 3: Add Environment Variables in Vercel

### 3.1 Navigate to Settings
1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Click **Environment Variables** in the left sidebar

### 3.2 Add Each Variable

Add these **5 variables** one by one:

#### Variable 1: NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://your-project-abc123.vercel.app
```
(Use your actual Vercel URL - NO trailing slash!)

Select: ✅ Production ✅ Preview ✅ Development

Click **Save**

---

#### Variable 2: NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: aQjD3Q96E/QsWl8XaH2uDeRJyXsqPQKlFg6yMSKI5lE=
```
(Use the secret generated above)

Select: ✅ Production ✅ Preview ✅ Development

Click **Save**

---

#### Variable 3: FACEBOOK_CLIENT_ID
```
Key: FACEBOOK_CLIENT_ID
Value: <Your Facebook App ID from Step 2.2>
```

Select: ✅ Production ✅ Preview ✅ Development

Click **Save**

---

#### Variable 4: FACEBOOK_CLIENT_SECRET
```
Key: FACEBOOK_CLIENT_SECRET
Value: <Your Facebook App Secret from Step 2.2>
```

Select: ✅ Production ✅ Preview ✅ Development

Click **Save**

---

#### Variable 5: FACEBOOK_APP_TOKEN
```
Key: FACEBOOK_APP_TOKEN
Value: <Your Facebook App Token from Step 2.2>
```

Select: ✅ Production ✅ Preview ✅ Development

Click **Save**

---

## Step 4: Redeploy

### 4.1 Trigger Redeploy
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** (optional, makes it faster)
5. Click **"Redeploy"**

### 4.2 Wait for Deployment
- Usually takes 1-2 minutes
- Watch the build logs for any errors

---

## Step 5: Test Your Deployment

### 5.1 Test the Homepage
1. Visit your Vercel URL
2. You should see the landing page with:
   - URL input field
   - Facebook login button

### 5.2 Test URL Scraping
1. Paste a public Facebook page URL (e.g., `https://facebook.com/nike`)
2. Click "Generate Website"
3. Should redirect to editor (or show error if page is private)

### 5.3 Test Facebook Login
1. Click "Continue with Facebook"
2. Should redirect to Facebook login
3. After login, should return to your app

---

## Troubleshooting

### Error: "Invalid OAuth Redirect URI"
**Fix:** Make sure the redirect URI in Facebook matches EXACTLY:
```
https://your-actual-vercel-url.vercel.app/api/auth/callback/facebook
```

### Error: "NEXTAUTH_URL mismatch"
**Fix:** Ensure `NEXTAUTH_URL` has NO trailing slash and matches your deployment URL

### Error: "Failed to fetch page data"
**Fix:** Check that `FACEBOOK_APP_TOKEN` is set correctly

### Build Fails
**Fix:** Check the build logs in Vercel. Common issues:
- TypeScript errors (shouldn't happen if local build works)
- Missing dependencies (check package.json)

---

## Verification Checklist

After redeployment, verify:

- [ ] Homepage loads correctly
- [ ] Can paste a Facebook URL and click "Generate Website"
- [ ] Facebook login button works
- [ ] No console errors in browser dev tools
- [ ] Environment variables are all set in Vercel

---

## Next Steps After Successful Deployment

1. **Test with Real Data**: Try generating a site from a real Cambodian business page
2. **Share with Beta Users**: Get feedback from 2-3 friendly business owners
3. **Monitor Errors**: Check Vercel logs for any runtime errors
4. **Plan Database**: When ready, set up Supabase for persistent storage

---

**Need Help?**
- Check deployment logs in Vercel
- Review DEPLOYMENT_GUIDE.md for detailed troubleshooting
- Facebook Developer Docs: https://developers.facebook.com/docs/

Good luck! 🚀
