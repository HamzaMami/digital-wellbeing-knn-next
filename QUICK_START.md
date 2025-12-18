# 🚀 QUICK START GUIDE

Follow these steps to run the Digital Well-Being Assessment application.

## ⚠️ BEFORE YOU START

**You need the trained ML models!**

This project requires 3 pickle files that are not included in this repository:
- `knn_model.pkl`
- `scaler.pkl`
- `feature_columns.pkl`

### Where to get them?

1. If you have the original ML project, run the training script:
   ```bash
   cd path/to/original/ml/project
   python src/train_model.py
   ```

2. Copy the generated `.pkl` files from `models/` directory to:
   ```
   backend/app/models/
   ```

Without these files, the backend will NOT start!

---

## 📝 STEP-BY-STEP INSTRUCTIONS

### STEP 1: Setup Backend (Python/FastAPI)

Open a terminal and run:

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# IMPORTANT: Make sure your .pkl files are in app/models/

# Start the server
python -m uvicorn app.main:app --reload --port 8000
```

✅ **Backend should be running at**: http://localhost:8000
✅ **Check API docs at**: http://localhost:8000/docs

**Keep this terminal open!**

---

### STEP 2: Setup Frontend (Next.js)

Open a **NEW terminal** and run:

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

✅ **Frontend should be running at**: http://localhost:3000

**Keep this terminal open too!**

---

## 🎉 YOU'RE READY!

1. Open your browser to: http://localhost:3000
2. Click "Take Assessment"
3. Fill out the form
4. Submit to get your results!

---

## 🧪 TESTING THE API

You can test the backend independently:

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Make a prediction
curl -X POST http://localhost:8000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d "{\"age\": 25, \"gender\": \"Female\", \"daily_screen_time_hrs\": 6.5, \"primary_platform\": \"Instagram\", \"sleep_quality\": 7, \"stress_level\": 6, \"days_without_social_media\": 2, \"exercise_frequency_week\": 3}"
```

---

## ❓ TROUBLESHOOTING

### Backend won't start
- ✅ Check that virtual environment is activated
- ✅ Verify all 3 `.pkl` files are in `backend/app/models/`
- ✅ Run `pip install -r requirements.txt` again

### Frontend shows errors
- ✅ Make sure backend is running first
- ✅ Check that `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8000`
- ✅ Run `npm install` again

### CORS errors
- ✅ Backend's `allowed_origins` must include `http://localhost:3000`
- ✅ Check `backend/app/main.py` CORS configuration

### "Cannot connect to API"
- ✅ Ensure backend is running on port 8000
- ✅ Check firewall/antivirus settings
- ✅ Try accessing http://localhost:8000/docs directly

---

## 📊 Project Structure

```
digital_wellbeing_knn/
├── backend/          ← Terminal 1 (Python server)
│   └── app/
│       └── models/   ← PUT YOUR .pkl FILES HERE!
│
└── frontend/         ← Terminal 2 (Next.js dev server)
    └── app/
```

---

## 🎯 Development Workflow

1. **Backend Terminal**: Keep running `uvicorn app.main:app --reload`
2. **Frontend Terminal**: Keep running `npm run dev`
3. **Browser**: http://localhost:3000
4. Make changes → Auto-reloads!

---

## 🚢 NEXT STEPS

- [ ] Test the assessment form
- [ ] Check results visualization
- [ ] Read the About page
- [ ] Explore the API docs
- [ ] Deploy to production (Vercel + Railway)

---

**Need help?** Check the detailed documentation:
- `README.md` - Main project README
- `NEXTJS_PROJECT_OVERVIEW.md` - Comprehensive overview
- `backend/README.md` - Backend details
- `frontend/README.md` - Frontend details
