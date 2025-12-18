# Digital Well-Being Predictor - Backend API

FastAPI backend for serving KNN model predictions.

## Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Copy Trained Models

**Important**: Copy your trained models from the original ML project:

```bash
# Create models directory if not exists
mkdir -p app/models

# Copy the 3 pickle files from your ML project
# You need to copy these files:
# - knn_model.pkl
# - scaler.pkl  
# - feature_columns.pkl
```

If you don't have the models yet, train them first:

```bash
cd ../path/to/original/ml/project
python src/train_model.py
```

Then copy the generated `.pkl` files to `backend/app/models/`

### 4. Run the Server

```bash
# Make sure you're in the backend directory with venv activated
python -m uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Health Check
```bash
GET /api/v1/health
```

### Make Prediction
```bash
POST /api/v1/predict
Content-Type: application/json

{
  "age": 25,
  "gender": "Female",
  "daily_screen_time_hrs": 6.5,
  "primary_platform": "Instagram",
  "sleep_quality": 7,
  "stress_level": 6,
  "days_without_social_media": 2,
  "exercise_frequency_week": 3
}
```

### Model Info
```bash
GET /api/v1/model-info
```

### Features Info
```bash
GET /api/v1/features
```

## Testing with curl

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Make prediction
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

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints.py # API routes
│   │       └── schemas.py   # Pydantic models
│   ├── ml/
│   │   ├── model.py         # ML model handler
│   │   └── __init__.py
│   └── models/              # ⚠️ PUT YOUR .pkl FILES HERE
│       ├── knn_model.pkl
│       ├── scaler.pkl
│       └── feature_columns.pkl
├── tests/
├── requirements.txt
└── README.md
```

## Common Issues

### "Models not found" error
Make sure you copied all 3 `.pkl` files to `app/models/` directory.

### CORS errors from frontend
Add your frontend URL to the `origins` list in `app/main.py`

### Import errors
Make sure virtual environment is activated and dependencies are installed.

## Next Steps

1. ✅ Setup backend (you are here)
2. ⏭️ Create Next.js frontend
3. ⏭️ Connect frontend to this API
4. ⏭️ Deploy both applications
