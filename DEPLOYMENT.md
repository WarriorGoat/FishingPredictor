# 🚀 Deployment Guide - Fishing Predictor

## Quick Deployment Options

### Option 1: Render.com (Recommended - Easiest)

**Why Render?**
- Free tier available
- Auto-deploys from GitHub
- Built-in environment variables
- Supports Node.js backend
- Easy SSL/HTTPS

**Steps:**

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Modern refactor complete"
   git push origin feature/modern-refactor
   ```

2. **Sign up at Render.com**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `FishingPredictor` repo
   - Branch: `feature/modern-refactor`

4. **Configure Service**
   ```
   Name: fishing-predictor
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

5. **Add Environment Variable**
   - In Render dashboard, go to "Environment"
   - Add: `VISUAL_CROSSING_API_KEY` = your_key_here

6. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your app will be live at: `https://fishing-predictor.onrender.com`

**Note:** Free tier may spin down after inactivity. First request after idle will be slow (~30 seconds).

---

### Option 2: Railway.app

**Steps:**

1. **Sign up at Railway.app**
   - Go to https://railway.app
   - Sign up with GitHub

2. **New Project from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `FishingPredictor`

3. **Add Variables**
   - Go to Variables tab
   - Add `VISUAL_CROSSING_API_KEY`
   - Add `PORT=3000`

4. **Deploy**
   - Railway auto-detects Node.js
   - Deploys automatically

---

### Option 3: Heroku

**Steps:**

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku

   # Others: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create fishing-predictor
   ```

3. **Set Environment Variable**
   ```bash
   heroku config:set VISUAL_CROSSING_API_KEY=your_key_here
   ```

4. **Deploy**
   ```bash
   git push heroku feature/modern-refactor:main
   ```

5. **Open App**
   ```bash
   heroku open
   ```

---

### Option 4: DigitalOcean App Platform

**Steps:**

1. **Create DigitalOcean Account**
   - Go to https://www.digitalocean.com/products/app-platform

2. **Create New App**
   - Connect GitHub
   - Select repository and branch

3. **Configure**
   ```
   Type: Web Service
   Source: GitHub
   Branch: feature/modern-refactor
   Build Command: npm install
   Run Command: npm start
   ```

4. **Environment Variables**
   - Add `VISUAL_CROSSING_API_KEY`

5. **Launch**
   - Click "Launch App"

---

## GitHub Pages + Backend Workaround

If you must use GitHub Pages for the frontend:

### Step 1: Deploy Backend Separately

Deploy backend to Render/Railway as described above. Note the URL (e.g., `https://fishing-api.onrender.com`).

### Step 2: Update Frontend Config

Create `public/assets/js/config.js`:
```javascript
export const API_BASE = 'https://fishing-api.onrender.com/api';
```

Update imports in API files to use this base URL.

### Step 3: Deploy Frontend to GitHub Pages

```bash
# In repository settings, enable GitHub Pages from main branch
# Push only the public/ folder contents to main branch
```

**Limitations:**
- Two separate deployments to manage
- CORS configuration needed
- More complex setup

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VISUAL_CROSSING_API_KEY` | Yes | Get from https://www.visualcrossing.com/weather-api |
| `PORT` | No | Port number (default: 3000) |
| `NODE_ENV` | No | Set to `production` for production |

---

## Post-Deployment Checklist

- [ ] App loads successfully
- [ ] State dropdown populates
- [ ] Station dropdown populates after selecting state
- [ ] Submit button fetches data
- [ ] All three cards show data (tides, weather, moon/sun)
- [ ] No console errors
- [ ] Mobile responsive (test on phone)
- [ ] API key not visible in client-side code

---

## Troubleshooting Deployment

### "Application Error" or 500 errors
**Cause:** Missing environment variable or wrong start command
**Fix:** Check environment variables are set correctly

### CORS errors in browser console
**Cause:** Backend not allowing frontend domain
**Fix:** Update CORS config in `server/index.js` to allow your domain

### "Module not found" errors
**Cause:** Dependencies not installed
**Fix:** Ensure build command includes `npm install`

### App works locally but not in production
**Causes:**
1. Environment variables not set
2. Different Node version
3. Case-sensitive file paths (Linux vs macOS)

**Fix:** Check logs in deployment platform dashboard

---

## Monitoring & Logs

**Render:**
- Dashboard → Your Service → Logs

**Railway:**
- Project → Deployments → View Logs

**Heroku:**
```bash
heroku logs --tail
```

---

## Cost Estimates

| Platform | Free Tier | Paid Plan |
|----------|-----------|-----------|
| Render | 750 hours/month | $7/month |
| Railway | $5 credit/month | $5-20/month |
| Heroku | 550-1000 dyno hours | $7/month |
| DigitalOcean | None | $5/month |

**Recommendation:** Start with Render's free tier. Upgrade if you need:
- No spin-down delays
- Custom domain
- More resources

---

## Custom Domain Setup

### On Render:

1. Go to Settings → Custom Domain
2. Add your domain (e.g., `fishing.yourdomain.com`)
3. Update DNS records as shown:
   ```
   Type: CNAME
   Name: fishing
   Value: your-app.onrender.com
   ```

### SSL Certificate
All platforms provide free SSL (HTTPS) automatically!

---

## Continuous Deployment

All platforms support auto-deploy:

**Enable:**
- Render: Enabled by default
- Railway: Enabled by default
- Heroku: Connect GitHub in dashboard

**How it works:**
1. Push to GitHub
2. Platform detects changes
3. Automatically rebuilds and deploys
4. ~2-5 minutes from push to live

---

## Backup Strategy

**Recommended:**
1. Keep code in GitHub (version control)
2. Document environment variables
3. Export database backups (if you add a database later)

---

## Performance Tips

1. **Enable caching** (add later)
2. **Use CDN** for static assets (optional)
3. **Add monitoring** (Sentry, LogRocket)
4. **Optimize images** (already done!)

---

## Need Help?

- Check platform documentation
- Review server logs
- Open issue on GitHub
- Email support of hosting platform

---

**Remember:** Always test in production after deployment. Free tiers may have limitations but are perfect for personal projects and testing!
