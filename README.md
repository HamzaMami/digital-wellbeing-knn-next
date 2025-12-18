# Digital Well-Being Assessment 💜

A full-stack machine learning web application that predicts digital well-being levels based on social media habits using K-Nearest Neighbors algorithm with SMOTE balancing.

## 🎯 Project Overview

- **Purpose**: Predict digital well-being (At Risk, Moderate, Balanced) from user habits
- **Algorithm**: K-Nearest Neighbors (k=5) with SMOTE oversampling
- **Accuracy**: 68% (balanced across all classes)
- **Stack**: Next.js 16 + TypeScript + FastAPI + scikit-learn 1.5.2
- **Design**: Modern purple-themed UI with clean, semantic CSS
- **Status**: ✅ **FULLY FUNCTIONAL & PRODUCTION-READY**

## 📁 Project Structure

```
digital_wellbeing_knn/
├── backend/                   # FastAPI Python backend
│   ├── app/
│   │   ├── main.py           # FastAPI application
│   │   ├── api/v1/           # API endpoints & schemas
│   │   ├── ml/               # ML model handler
│   │   └── models/           # ⚠️ PUT YOUR .pkl FILES HERE
│   ├── requirements.txt
│   └── README.md
│
├── frontend/                  # Next.js TypeScript frontend
│   ├── app/                  # Pages (App Router)
│   ├── components/           # React components
│   ├── lib/                  # Utils, types, API client
│   ├── package.json
│   └── README.md
│
├── NEXTJS_PROJECT_OVERVIEW.md # Detailed project documentation
└── README.md                  # This file
```

## 🚀 Quick Start

### 1. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# ⚠️ IMPORTANT: Copy your trained ML models
# You need these 3 files in backend/app/models/:
# - knn_model.pkl
# - scaler.pkl
# - feature_columns.pkl

# Run the server
python -m uvicorn app.main:app --reload --port 8000
```

**Backend will be at**: http://localhost:8000
**API Docs**: http://localhost:8000/docs

### 2. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

**Frontend will be at**: http://localhost:3000

> **Note**: Requires Node.js 20.9.0 or higher for Next.js 16 compatibility

## 🎨 Features

### Frontend (Next.js 16)
- ✅ Beautiful purple-themed modern UI with glassmorphism effects
- ✅ Clean, semantic CSS classes (no verbose Tailwind utilities)
- ✅ Multi-section assessment form with interactive sliders
- ✅ Real-time form validation
- ✅ Results page with confidence level visualization
- ✅ Personalized recommendations based on predictions
- ✅ Key factors display showing impact analysis
- ✅ Fully responsive design
- ✅ Smooth animations and hover effects
- ✅ Educational about page
- ✅ Optimized React performance (lazy state initialization)

### Backend (FastAPI)
- ✅ RESTful API with auto-generated Swagger docs
- ✅ Pydantic v2 validation
- ✅ KNN model serving with confidence calculation
- ✅ Feature preprocessing matching training pipeline
- ✅ CORS configuration for frontend integration
- ✅ Health check endpoint
- ✅ Model metadata endpoint
- ✅ Comprehensive error handling

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Check API status |
| POST | `/api/v1/predict` | Get prediction |
| GET | `/api/v1/model-info` | Get model metadata |
| GET | `/api/v1/features` | Get features info |

### Example Request

```bash
curl -X POST http://localhost:8000/api/v1/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "gender": "Female",
    "daily_screen_time_hrs": 6.5,
    "primary_platform": "Instagram",
    "sleep_quality": 7,
    "stress_level": 6,
    "days_without_social_media": 2,
    "exercise_frequency_week": 3
  }'
```

## 🤖 Machine Learning Details

- **Algorithm**: K-Nearest Neighbors (k=5)
- **Features**: 15 total (6 numeric + 9 one-hot encoded)
- **Training Samples**: 867 (after SMOTE balancing)
- **Test Samples**: 100
- **SMOTE**: Balanced "At Risk" class from 6 to 289 samples
- **Preprocessing**: StandardScaler normalization

### Input Features

**Numeric (6)**:
- Age (10-100)
- Daily Screen Time (0-24 hrs)
- Sleep Quality (1-10)
- Stress Level (1-10)
- Days Without Social Media (0-30)
- Exercise Frequency (0-14 times/week)

**Categorical (2)**:
- Gender (Female, Male, Other)
- Primary Platform (Facebook, Instagram, LinkedIn, TikTok, X, YouTube)

## ⚠️ Important Notes

### Where Are the ML Models?

This repository **does not include** the trained `.pkl` files due to size/Git limitations.

**You need to**:
1. Train the model using your original ML project (`train_model.py`)
2. Copy these 3 files to `backend/app/models/`:
   - `knn_model.pkl`
   - `scaler.pkl`
   - `feature_columns.pkl`

Without these files, the backend will not start!

### Educational Purpose Only

⚠️ **This is an educational project** for learning ML deployment. It is NOT:
- A medical diagnosis tool
- A replacement for professional mental health advice
- Suitable for clinical use

If experiencing mental health concerns, consult qualified professionals.

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Framework | Next.js (App Router) | 16.0.10 |
| Frontend Language | TypeScript | 5.x |
| Styling | Tailwind CSS + Custom CSS | 4.x |
| UI Pattern | Clean Semantic Classes | Custom |
| Backend Framework | FastAPI | 0.104.1 |
| Backend Language | Python | 3.11+ |
| ML Library | scikit-learn | 1.5.2 |
| Balancing | imbalanced-learn (SMOTE) | 0.11.0+ |
| Validation | Pydantic | v2 |
| HTTP Client | Fetch API | Native |
| Node.js | Required | ≥20.9.0 |

## 📚 Documentation

- **Detailed Overview**: See `NEXTJS_PROJECT_OVERVIEW.md`
- **Backend README**: See `backend/README.md`
- **Frontend README**: See `frontend/README.md`
- **API Docs**: http://localhost:8000/docs (when running)

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack ML application development (Frontend + Backend + ML)
- ✅ RESTful API design with FastAPI and Swagger docs
- ✅ Handling imbalanced datasets with SMOTE oversampling
- ✅ Modern React patterns (hooks, client components, lazy initialization)
- ✅ TypeScript for type safety and better DX
- ✅ Clean CSS architecture with semantic class names
- ✅ Responsive UI design with modern glassmorphism effects
- ✅ API integration with proper error handling
- ✅ ML model deployment and serving
- ✅ Feature preprocessing pipeline alignment
- ✅ Confidence calculation for KNN predictions
- ✅ Professional documentation and code structure
- ✅ Debugging complex integration issues
- ✅ Version compatibility management (Node.js, scikit-learn)

## ✅ Development Status

1. ✅ Backend FastAPI structure created
2. ✅ ML model handler implemented with confidence calculation
3. ✅ Next.js 16 frontend created
4. ✅ Multi-section assessment form built
5. ✅ Results page with visualizations
6. ✅ About page added
7. ✅ Purple theme implemented
8. ✅ Clean CSS architecture (semantic class names)
9. ✅ React optimization (lazy state initialization)
10. ✅ All bugs fixed (confidence levels, class labels, feature names)
11. ✅ Full integration tested and working
12. ✅ Comprehensive documentation
13. ✅ **PROJECT COMPLETE & PRODUCTION-READY**

## 🤝 Contributing

This is an educational project for academic purposes. Feel free to:
- Fork and modify for your own learning
- Use as reference for similar projects
- Improve the code and documentation

## 📝 License

Educational/Academic use. Not licensed for commercial use.

## 👨‍💻 Author

Created as a school project demonstrating ML + Web Development integration.

---

**Ready to start!** Follow the Quick Start guide above to run the application locally.
