# 🚀 Deployment Guide

Complete guide for deploying the Digital Well-Being Assessment application to production.

## 📋 Prerequisites

- ✅ Working application (tested locally)
- ✅ ML models (.pkl files) ready
- ✅ GitHub repository set up
- ✅ Backend tested on http://localhost:8000
- ✅ Frontend tested on http://localhost:3000

## 🎨 Application Status

**✅ FULLY FUNCTIONAL**
- Backend API working with confidence calculation
- Frontend displaying results correctly
- Clean purple-themed UI
- All bugs fixed and tested

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)

#### Deploy Backend to Render

1. **Create Render Account**: https://render.com

2. **Create New Web Service**:
   - Connect GitHub repository
   - Select `backend` folder
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables (if needed)

3. **Upload Model Files**:
   - Use Render's persistent disk or
   - Store in cloud (S3, Google Cloud Storage) and download on startup

4. **Note Backend URL**: e.g., `https://your-app.onrender.com`

#### Deploy Frontend to Vercel

1. **Create Vercel Account**: https://vercel.com

2. **Import Project**:
   - Connect GitHub repository
   - Select `frontend` folder
   - Framework: Next.js
   - Node.js Version: 20.x

3. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

4. **Deploy**: Vercel auto-deploys on push to main branch

### Option 2: Railway (Full Stack)

1. **Create Railway Account**: https://railway.app

2. **Deploy Backend**:
   - New Project → Deploy from GitHub
   - Select backend directory
   - Add `Procfile`: `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Configure model files storage

3. **Deploy Frontend**:
   - Add service → Deploy from GitHub
   - Select frontend directory
   - Set environment variable: `NEXT_PUBLIC_API_URL`

### Option 3: Docker + Cloud (AWS/GCP/Azure)

#### Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY models ./app/models

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

CMD ["npm", "start"]
```

## ⚙️ Configuration

### Backend Environment Variables

```env
# Optional: Add if needed
CORS_ORIGINS=["https://your-frontend.vercel.app"]
MODEL_PATH=/app/models
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🗄️ Model Files Storage

### Option A: Include in Repository (Not Recommended)
- Large files (>100MB) → Git LFS required
- Increases deploy time

### Option B: Cloud Storage (Recommended)
```python
# Download models on startup
import boto3
import os

def download_models():
    s3 = boto3.client('s3')
    models = ['knn_model.pkl', 'scaler.pkl', 'feature_columns.pkl']
    for model in models:
        s3.download_file('your-bucket', model, f'app/models/{model}')
```

### Option C: Environment-Specific Loading
- Dev: Local files
- Prod: Cloud storage or bundled

## 🔒 Security Checklist

- ✅ CORS configured correctly
- ✅ No sensitive data in Git
- ✅ Environment variables secured
- ✅ HTTPS enabled
- ✅ Rate limiting added (optional)
- ✅ Input validation on both frontend and backend

## 📊 Monitoring

### Health Check Endpoints

- Backend: `GET /api/v1/health`
- Expected response: `{"status": "healthy", "model_loaded": true}`

### Logging

```python
# Add to backend for production
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Log predictions
logger.info(f"Prediction: {result}")
```

## 🚨 Troubleshooting

### Issue: Models Not Loading

**Check**:
- Files exist in correct directory
- Permissions set correctly
- scikit-learn version matches (1.5.2)

### Issue: CORS Errors

**Fix**: Update `backend/app/main.py`:
```python
origins = [
    "http://localhost:3000",
    "https://your-frontend.vercel.app"
]
```

### Issue: Build Fails

**Frontend**:
- Check Node.js version (≥20.9.0)
- Clear `.next` folder and rebuild

**Backend**:
- Check Python version (3.11+)
- Verify all dependencies install

## 📈 Performance Optimization

### Frontend
- ✅ Already using Next.js App Router (optimized)
- ✅ Lazy state initialization implemented
- Consider: Image optimization, code splitting

### Backend
- ✅ FastAPI is already fast
- Consider: Redis caching for predictions
- Consider: Load balancing for scale

## 🎯 Post-Deployment Testing

1. **Test API**: `curl https://your-backend.com/api/v1/health`
2. **Test Frontend**: Visit deployed URL
3. **Test Full Flow**: 
   - Submit assessment
   - Verify prediction
   - Check confidence levels
   - Verify recommendations

## 📝 Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible  
- [ ] Environment variables configured
- [ ] Model files accessible
- [ ] CORS configured
- [ ] HTTPS working
- [ ] Health check passing
- [ ] Full integration test passed
- [ ] Error logging configured
- [ ] Documentation updated with URLs

## 🆘 Support

If you encounter issues:
1. Check logs on hosting platform
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for frontend errors

---

**✅ Your app is now production-ready!**

For questions or issues, refer to the main [README.md](README.md) or project documentation.
