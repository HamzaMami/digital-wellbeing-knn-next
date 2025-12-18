from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # Anonymous UUID
    
    # Input data
    age = Column(Integer)
    gender = Column(String)
    daily_screen_time_hrs = Column(Float)
    primary_platform = Column(String)
    sleep_quality = Column(Integer)
    stress_level = Column(Integer)
    days_without_social_media = Column(Integer)
    exercise_frequency_week = Column(Integer)
    
    # Prediction results
    prediction = Column(String)
    confidence_at_risk = Column(Float)
    confidence_moderate = Column(Float)
    confidence_balanced = Column(Float)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "age": self.age,
            "gender": self.gender,
            "daily_screen_time_hrs": self.daily_screen_time_hrs,
            "primary_platform": self.primary_platform,
            "sleep_quality": self.sleep_quality,
            "stress_level": self.stress_level,
            "days_without_social_media": self.days_without_social_media,
            "exercise_frequency_week": self.exercise_frequency_week,
            "prediction": self.prediction,
            "confidence_at_risk": self.confidence_at_risk,
            "confidence_moderate": self.confidence_moderate,
            "confidence_balanced": self.confidence_balanced,
            "created_at": self.created_at.isoformat()
        }
