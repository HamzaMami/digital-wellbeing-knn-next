from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from app.database import get_db
from app.models.database_models import Assessment
import uuid

router = APIRouter(prefix="/api/v1/history", tags=["history"])

class SaveAssessmentRequest(BaseModel):
    input_data: dict
    prediction: dict

@router.post("/save")
async def save_assessment(
    user_id: str,
    request: SaveAssessmentRequest,
    db: Session = Depends(get_db)
):
    """
    Save an assessment with its prediction results anonymously
    """
    try:
        input_data = request.input_data
        prediction = request.prediction
        
        assessment = Assessment(
            user_id=user_id,
            age=input_data["age"],
            gender=input_data["gender"],
            daily_screen_time_hrs=input_data["daily_screen_time_hrs"],
            primary_platform=input_data["primary_platform"],
            sleep_quality=input_data["sleep_quality"],
            stress_level=input_data["stress_level"],
            days_without_social_media=input_data["days_without_social_media"],
            exercise_frequency_week=input_data["exercise_frequency_week"],
            prediction=prediction["prediction"],
            confidence_at_risk=prediction["confidence"]["At Risk"],
            confidence_moderate=prediction["confidence"]["Moderate"],
            confidence_balanced=prediction["confidence"]["Balanced"]
        )
        
        db.add(assessment)
        db.commit()
        db.refresh(assessment)
        
        return {
            "status": "success",
            "message": "Assessment saved successfully",
            "assessment_id": assessment.id
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save assessment: {str(e)}")


@router.get("/user/{user_id}")
async def get_user_history(
    user_id: str,
    db: Session = Depends(get_db)
):
    """
    Get all assessments for an anonymous user
    """
    try:
        assessments = db.query(Assessment).filter(
            Assessment.user_id == user_id
        ).order_by(Assessment.created_at.desc()).all()
        
        return {
            "status": "success",
            "count": len(assessments),
            "assessments": [assessment.to_dict() for assessment in assessments]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")


@router.get("/stats/{user_id}")
async def get_user_stats(
    user_id: str,
    db: Session = Depends(get_db)
):
    """
    Get statistics and trends for a user
    """
    try:
        assessments = db.query(Assessment).filter(
            Assessment.user_id == user_id
        ).order_by(Assessment.created_at.asc()).all()
        
        if not assessments:
            return {
                "status": "success",
                "message": "No assessments found",
                "stats": None
            }
        
        # Calculate statistics
        total = len(assessments)
        predictions = [a.prediction for a in assessments]
        at_risk_count = predictions.count("At Risk")
        moderate_count = predictions.count("Moderate")
        balanced_count = predictions.count("Balanced")
        
        # Get trend (improvement/decline)
        if len(assessments) >= 2:
            first = assessments[0].prediction
            last = assessments[-1].prediction
            
            score_map = {"At Risk": 1, "Moderate": 2, "Balanced": 3}
            trend = "improving" if score_map[last] > score_map[first] else \
                   "declining" if score_map[last] < score_map[first] else "stable"
        else:
            trend = "insufficient_data"
        
        return {
            "status": "success",
            "stats": {
                "total_assessments": total,
                "at_risk_count": at_risk_count,
                "moderate_count": moderate_count,
                "balanced_count": balanced_count,
                "trend": trend,
                "latest_prediction": assessments[-1].prediction,
                "first_assessment": assessments[0].created_at.isoformat(),
                "latest_assessment": assessments[-1].created_at.isoformat()
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate stats: {str(e)}")


@router.delete("/user/{user_id}")
async def delete_user_history(
    user_id: str,
    db: Session = Depends(get_db)
):
    """
    Delete all assessments for a user (GDPR compliance)
    """
    try:
        deleted_count = db.query(Assessment).filter(
            Assessment.user_id == user_id
        ).delete()
        
        db.commit()
        
        return {
            "status": "success",
            "message": f"Deleted {deleted_count} assessments"
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete history: {str(e)}")
