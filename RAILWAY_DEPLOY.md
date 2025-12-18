# 🚂 Railway Deployment Guide

Deploy your Digital Well-Being Assessment app to Railway in minutes!

## 📋 Prerequisites

1. ✅ Code pushed to GitHub
2. ✅ Railway account (sign up at https://railway.app with GitHub)
3. ✅ Your `.pkl` model files ready

---

## 🔧 Step 1: Prepare Backend for Railway

### Create Procfile for Backend

Railway needs to know how to start your app. Let's create a `Procfile`:

```bash
# In backend/ directory, create a file named "Procfile" (no extension)
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Update Backend Dependencies

Make sure your `requirements.txt` includes:
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy>=2.0.0
```

---

## 🚀 Step 2: Deploy Backend to Railway

### Option A: Deploy from GitHub (Recommended)

1. **Go to Railway**: https://railway.app
2. **Click**: "New Project"
3. **Select**: "Deploy from GitHub repo"
4. **Choose**: Your `digital-wellbeing-knn` repository
5. **Railway will detect**: Python automatically
6. **Set Root Directory**: 
   - Click "Settings"
   - Set "Root Directory" to `backend`
7. **Add Environment Variables**:
   - Click "Variables"
   - Add: `PORT` = `8000` (Railway auto-provides this, but you can set it)
8. **Deploy**: Railway will automatically build and deploy!

### Option B: Deploy via Railway CLI

```powershell
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd backend

# Initialize and deploy
railway init
railway up
```

### Upload Model Files (.pkl)

Your model files are too large for Git. Options:

**Option 1: Upload via Railway CLI**
```powershell
railway shell
# Then upload files manually through the dashboard
```

**Option 2: Host on Cloud Storage**
Update `backend/app/ml/model.py` to download from cloud:
```python
# Add at startup
import requests
if not os.path.exists('app/models/knn_model.pkl'):
    models_url = "YOUR_CLOUD_URL"  # Google Drive, Dropbox, AWS S3
    # Download models
```

**Option 3: Use Railway Volumes (Persistent Storage)**
- In Railway dashboard → Settings → Add Volume
- Mount path: `/app/models`
- Upload files through Railway shell

---

## 🎨 Step 3: Deploy Frontend to Railway

### Update Environment Variable

Create `frontend/.env.production`:
```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

### Deploy Frontend

1. **New Project**: In Railway, click "New Project" again
2. **From GitHub**: Select same repository
3. **Set Root Directory**: `frontend`
4. **Environment Variables**:
   - Click "Variables"
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`
   - (You'll get your backend URL from Step 2)
5. **Deploy**: Railway detects Next.js and deploys!

---

## 🔗 Step 4: Configure CORS

Update your backend CORS to allow Railway frontend:

In `backend/app/main.py`:
```python
origins = [
    "http://localhost:3000",
    "https://your-frontend.railway.app",  # Add your Railway frontend URL
    "https://*.railway.app",  # Allow all Railway domains
]
```

Commit and push changes:
```powershell
git add backend/app/main.py
git commit -m "Update CORS for Railway deployment"
git push
```

Railway will auto-redeploy!

---

## ✅ Step 5: Verify Deployment

### Test Backend
```powershell
# Check health endpoint
curl https://your-backend.railway.app/api/v1/health

# Check API docs
# Open: https://your-backend.railway.app/docs
```

### Test Frontend
- Open: `https://your-frontend.railway.app`
- Take an assessment
- Check results

---

## 🗄️ Step 6: Database Setup

Railway automatically creates a SQLite database file. For production:

### Option A: Use Railway PostgreSQL (Recommended)

1. **Add PostgreSQL**:
   - In backend project → "New" → "Database" → "PostgreSQL"
2. **Update Backend**:
   ```python
   # In backend/app/database.py
   import os
   DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./digital_wellbeing.db")
   engine = create_engine(DATABASE_URL)
   ```
3. **Add Dependency**:
   ```
   # In requirements.txt
   psycopg2-binary>=2.9.0
   ```

### Option B: Keep SQLite (Simpler)
- Railway will create `digital_wellbeing.db` automatically
- Data persists with Railway Volumes

---

## 💰 Pricing

**Railway Free Tier**:
- ✅ $5 credit/month
- ✅ Good for development and low traffic
- ✅ 500 hours of execution time

**Upgrade** if you need more resources.

---

## 🔧 Common Issues & Fixes

### Issue: Model files not found
**Fix**: Upload via Railway Volumes or use cloud storage

### Issue: CORS errors
**Fix**: Add Railway domain to CORS origins in `main.py`

### Issue: Database resets
**Fix**: Use Railway PostgreSQL or add Volume for SQLite

### Issue: Build fails
**Fix**: Check logs in Railway dashboard, ensure `requirements.txt` is complete

---

## 📊 Monitor Your App

Railway Dashboard shows:
- 📈 CPU/Memory usage
- 📝 Logs (click "View Logs")
- 🔄 Deployments history
- ⚙️ Settings & environment variables

---

## 🔄 Auto-Deploy from GitHub

Railway automatically deploys when you push to GitHub!

```powershell
# Make changes
git add .
git commit -m "Update feature"
git push

# Railway will automatically redeploy both frontend and backend!
```

---

## 🎯 Your Live URLs

After deployment, you'll have:
- **Backend**: `https://digital-wellbeing-backend.railway.app`
- **Frontend**: `https://digital-wellbeing-frontend.railway.app`
- **API Docs**: `https://digital-wellbeing-backend.railway.app/docs`

Share these with users! 🚀

---

## 🆘 Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check logs in Railway dashboard for errors

---

**Ready to deploy?** Start with Step 2! 🎉
