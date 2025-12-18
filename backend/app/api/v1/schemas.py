"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field, validator
from typing import Dict, List


class PredictionRequest(BaseModel):
    """Request schema for prediction endpoint"""
    age: int = Field(..., ge=10, le=100, description="Age in years (10-100)")
    gender: str = Field(..., description="Gender (Female, Male, Other)")
    daily_screen_time_hrs: float = Field(..., ge=0, le=24, description="Daily screen time in hours (0-24)")
    primary_platform: str = Field(..., description="Primary social media platform")
    sleep_quality: int = Field(..., ge=1, le=10, description="Sleep quality rating (1-10)")
    stress_level: int = Field(..., ge=1, le=10, description="Stress level (1-10)")
    days_without_social_media: int = Field(..., ge=0, le=30, description="Days without social media per month (0-30)")
    exercise_frequency_week: int = Field(..., ge=0, le=14, description="Exercise frequency per week (0-14)")
    
    @validator('gender')
    def validate_gender(cls, v):
        allowed = ['Female', 'Male', 'Other']
        if v not in allowed:
            raise ValueError(f"Gender must be one of {allowed}")
        return v
    
    @validator('primary_platform')
    def validate_platform(cls, v):
        allowed = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'X', 'YouTube']
        if v not in allowed:
            raise ValueError(f"Platform must be one of {allowed}")
        return v
    
    class Config:
        json_schema_extra = {
            "example": {
                "age": 25,
                "gender": "Female",
                "daily_screen_time_hrs": 6.5,
                "primary_platform": "Instagram",
                "sleep_quality": 7,
                "stress_level": 6,
                "days_without_social_media": 2,
                "exercise_frequency_week": 3
            }
        }


class PredictionResponse(BaseModel):
    """Response schema for prediction endpoint"""
    prediction: str = Field(..., description="Predicted well-being category")
    confidence: Dict[str, float] = Field(..., description="Confidence scores for each class")
    recommendations: List[str] = Field(..., description="Personalized recommendations")
    feature_impact: Dict[str, float] = Field(default_factory=dict, description="Impact of key features")
    
    class Config:
        json_schema_extra = {
            "example": {
                "prediction": "Moderate",
                "confidence": {
                    "At Risk": 0.2,
                    "Moderate": 0.6,
                    "Balanced": 0.2
                },
                "recommendations": [
                    "Try reducing screen time by 1-2 hours",
                    "Improve sleep quality - establish a consistent bedtime routine",
                    "Incorporate daily stress-relief activities (10-15 min)"
                ],
                "feature_impact": {
                    "stress_level": 0.4,
                    "sleep_quality": -0.5,
                    "daily_screen_time_hrs": 0.3
                }
            }
        }


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    model_loaded: bool
    version: str


class ModelInfoResponse(BaseModel):
    """Model information response"""
    algorithm: str
    n_neighbors: int
    features: int
    feature_names: List[str]
    classes: List[str]
    balanced_with_smote: bool
    accuracy: float
    training_samples: int


class FeaturesInfoResponse(BaseModel):
    """Features information response"""
    numeric_features: List[str]
    categorical_features: Dict[str, List[str]]
