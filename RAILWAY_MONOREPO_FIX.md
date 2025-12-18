# 🚂 Railway Monorepo Deployment Fix

Your repo has both frontend and backend - Railway needs to know which one to build for each service.

## ✅ Quick Fix: Set Root Directory in Railway Dashboard

### For Backend Service:

1. Go to your backend project in Railway
2. Click **Settings** → **General**
3. Find **Root Directory**
4. Set it to: `backend`
5. Click **Save**
6. Redeploy (click "Deploy" again)

### For Frontend Service:

1. Go to your frontend project in Railway  
2. Click **Settings** → **General**
3. Find **Root Directory**
4. Set it to: `frontend`
5. Click **Save**
6. Redeploy

---

## 🔧 Alternative: Deploy Each as Separate Service

### Deploy Backend:

```
1. New Project → Deploy from GitHub
2. Select your repo
3. ⚙️ Settings → Root Directory = "backend"
4. Railway will build only the backend folder
```

### Deploy Frontend:

```
1. New Project → Deploy from GitHub  
2. Select SAME repo
3. ⚙️ Settings → Root Directory = "frontend"
4. Railway will build only the frontend folder
```

---

## 📝 What I Added:

- ✅ `backend/railway.json` - Backend config
- ✅ `frontend/railway.json` - Frontend config
- ✅ `backend/runtime.txt` - Python version spec

Now commit and push:

```powershell
git add .
git commit -m "Fix Railway monorepo configuration"
git push
```

Then in Railway dashboard, set the Root Directory for each service!

---

## 🎯 Result:

After setting Root Directory:
- Backend builds from `/backend` folder only
- Frontend builds from `/frontend` folder only
- No more confusion! 🎉
