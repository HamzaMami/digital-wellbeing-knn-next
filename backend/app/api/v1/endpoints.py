"""
API Endpoints for Digital Well-Being Predictor
"""
from fastapi import APIRouter, HTTPException
from app.api.v1.schemas import (
    PredictionRequest,
    PredictionResponse,
    HealthResponse,
    ModelInfoResponse,
    FeaturesInfoResponse
)
from app.ml.model import get_predictor

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint
    Returns API status and model loading status
    """
    try:
        predictor = get_predictor()
        model_loaded = predictor.model is not None
        return {
            "status": "healthy",
            "model_loaded": model_loaded,
            "version": "1.0.0"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "model_loaded": False,
            "version": "1.0.0"
        }


@router.post("/predict", response_model=PredictionResponse)
async def predict_wellbeing(request: PredictionRequest):
    """
    Predict digital well-being level
    
    Takes user input and returns:
    - Predicted well-being category (At Risk, Moderate, Balanced)
    - Confidence scores for each category
    - Personalized recommendations
    - Feature impact analysis
    """
    try:
        predictor = get_predictor()
        
        # Convert request to dict
        input_data = request.dict()
        
        # Make prediction
        prediction, confidence, feature_impact = predictor.predict(input_data)
        
        # Get recommendations
        recommendations = predictor.get_recommendations(prediction, input_data)
        
        return {
            "prediction": prediction,
            "confidence": confidence,
            "recommendations": recommendations,
            "feature_impact": feature_impact
        }
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.get("/model-info", response_model=ModelInfoResponse)
async def get_model_info():
    """
    Get model metadata and information
    
    Returns details about the trained model:
    - Algorithm used
    - Number of neighbors (k)
    - Features count
    - Training accuracy
    - SMOTE balancing info
    """
    try:
        predictor = get_predictor()
        return predictor.get_model_info()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/features", response_model=FeaturesInfoResponse)
async def get_features_info():
    """
    Get information about model features
    
    Returns:
    - List of numeric features
    - Dictionary of categorical features with their possible values
    """
    return {
        "numeric_features": [
            "Age",
            "Daily_Screen_Time(hrs)",
            "Sleep_Quality(1-10)",
            "Stress_Level(1-10)",
            "Days_Without_Social_Media",
            "Exercise_Frequency(week)"
        ],
        "categorical_features": {
            "Gender": ["Female", "Male", "Other"],
            "Platform": ["Facebook", "Instagram", "LinkedIn", "TikTok", "X", "YouTube"]
        }
    }
