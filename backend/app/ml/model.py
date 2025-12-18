"""
ML Model Handler
Loads trained KNN model and handles predictions
"""
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple


class WellBeingPredictor:
    """Handles loading and predictions for the Digital Well-Being KNN model"""
    
    def __init__(self, model_path: str = "./app/models"):
        self.model_path = Path(model_path)
        self.model = None
        self.scaler = None
        self.feature_columns = None
        self.load_models()
    
    def load_models(self):
        """Load trained model, scaler, and feature columns"""
        try:
            self.model = joblib.load(self.model_path / "knn_model.pkl")
            self.scaler = joblib.load(self.model_path / "scaler.pkl")
            self.feature_columns = joblib.load(self.model_path / "feature_columns.pkl")
            print(f"✅ Models loaded successfully from {self.model_path}")
            print(f"📊 Features: {len(self.feature_columns)}")
        except Exception as e:
            print(f"❌ Error loading models: {e}")
            raise
    
    def preprocess_input(self, input_data: Dict) -> pd.DataFrame:
        """
        Preprocess user input into model-ready features
        
        Args:
            input_data: Dictionary with user inputs
            
        Returns:
            DataFrame with engineered features matching training
        """
        # Create base dataframe with numeric features
        data = {
            'Age': [input_data['age']],
            'Daily_Screen_Time(hrs)': [input_data['daily_screen_time_hrs']],
            'Sleep_Quality(1-10)': [input_data['sleep_quality']],
            'Stress_Level(1-10)': [input_data['stress_level']],
            'Days_Without_Social_Media': [input_data['days_without_social_media']],
            'Exercise_Frequency(week)': [input_data['exercise_frequency_week']]
        }
        
        # One-hot encode Gender (matches pd.get_dummies with columns=['Gender'])
        genders = ['Female', 'Male', 'Other']
        for gender in genders:
            data[f'Gender_{gender}'] = [1 if input_data['gender'] == gender else 0]
        
        # One-hot encode Social_Media_Platform (matches pd.get_dummies with columns=['Social_Media_Platform'])
        # Map user-friendly names to exact CSV column values
        platform_mapping = {
            'Facebook': 'Facebook',
            'Instagram': 'Instagram',
            'LinkedIn': 'LinkedIn',
            'TikTok': 'TikTok',
            'X': 'X (Twitter)',  # CSV has "X (Twitter)" not just "X"
            'YouTube': 'YouTube'
        }
        
        platforms = ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'X (Twitter)', 'YouTube']
        user_platform = input_data['primary_platform']
        mapped_platform = platform_mapping.get(user_platform, user_platform)
        
        for platform in platforms:
            data[f'Social_Media_Platform_{platform}'] = [1 if mapped_platform == platform else 0]
        
        df = pd.DataFrame(data)
        
        # Ensure column order matches training (uses feature_columns.pkl)
        df = df[self.feature_columns]
        
        return df
    
    def predict(self, input_data: Dict) -> Tuple[str, Dict[str, float], Dict[str, float]]:
        """
        Make prediction and return confidence scores
        
        Args:
            input_data: User input dictionary
            
        Returns:
            Tuple of (prediction, confidence_dict, feature_impact)
        """
        # Preprocess input
        X = self.preprocess_input(input_data)
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Get prediction (model was trained with string labels)
        prediction_label = self.model.predict(X_scaled)[0]
        
        # Get confidence (probability estimates)
        # KNN doesn't have predict_proba, so we use distance-based confidence
        distances, indices = self.model.kneighbors(X_scaled)
        
        # Get labels of k nearest neighbors (these are numeric indices)
        neighbor_indices = self.model._y[indices[0]]
        
        # Get the actual class labels - model stores them as strings in classes_
        if hasattr(self.model, 'classes_'):
            classes = self.model.classes_
        else:
            # Fallback: assume alphabetical order
            classes = np.array(["At Risk", "Balanced", "Moderate"])
        
        # Map numeric indices to string labels
        neighbor_labels = classes[neighbor_indices]
        
        # Get unique classes
        unique_classes = ["At Risk", "Moderate", "Balanced"]
        
        # Calculate confidence as percentage of each class in neighbors
        confidence = {}
        for class_name in unique_classes:
            count = np.sum(neighbor_labels == class_name)
            confidence[class_name] = float(count / len(neighbor_labels)) * 100
        
        # Calculate feature impact (simplified version)
        feature_impact = self._calculate_feature_impact(input_data)
        
        return prediction_label, confidence, feature_impact
    
    def _calculate_feature_impact(self, input_data: Dict) -> Dict[str, float]:
        """
        Calculate simplified feature impact scores
        Higher stress/screen time = positive impact (worse)
        Higher sleep/exercise = negative impact (better)
        """
        impact = {}
        
        # Negative factors (higher = worse)
        if input_data['stress_level'] >= 7:
            impact['stress_level'] = float(input_data['stress_level'] - 5) / 5
        
        if input_data['daily_screen_time_hrs'] >= 6:
            impact['daily_screen_time_hrs'] = float(input_data['daily_screen_time_hrs'] - 4) / 8
        
        # Positive factors (higher = better, so negative impact)
        if input_data['sleep_quality'] <= 6:
            impact['sleep_quality'] = -float(8 - input_data['sleep_quality']) / 8
        
        if input_data['exercise_frequency_week'] <= 2:
            impact['exercise_frequency_week'] = -float(4 - input_data['exercise_frequency_week']) / 4
        
        if input_data['days_without_social_media'] <= 3:
            impact['days_without_social_media'] = -float(5 - input_data['days_without_social_media']) / 5
        
        return impact
    
    def get_recommendations(self, prediction: str, input_data: Dict) -> List[str]:
        """
        Generate personalized recommendations based on prediction and inputs
        
        Args:
            prediction: Model prediction (At Risk, Moderate, Balanced)
            input_data: User input data
            
        Returns:
            List of recommendation strings
        """
        recommendations = []
        
        if prediction == "At Risk":
            recommendations.append("🚨 Consider seeking professional support for digital well-being")
            
            if input_data['daily_screen_time_hrs'] >= 8:
                recommendations.append(f"📱 Reduce screen time from {input_data['daily_screen_time_hrs']}h to under 6h daily")
            
            if input_data['sleep_quality'] <= 5:
                recommendations.append("😴 Prioritize sleep hygiene - aim for 7-9 hours of quality sleep")
            
            if input_data['stress_level'] >= 8:
                recommendations.append("🧘 Practice stress management techniques (meditation, deep breathing)")
            
            if input_data['days_without_social_media'] == 0:
                recommendations.append("🔕 Try at least 1-2 days per week without social media")
            
            if input_data['exercise_frequency_week'] <= 1:
                recommendations.append("🏃 Increase physical activity to 3-4 times per week")
        
        elif prediction == "Moderate":
            recommendations.append("⚖️ You're on the right track - small improvements can make a big difference")
            
            if input_data['daily_screen_time_hrs'] >= 6:
                recommendations.append(f"📱 Try reducing screen time by 1-2 hours (currently {input_data['daily_screen_time_hrs']}h)")
            
            if input_data['sleep_quality'] <= 7:
                recommendations.append("😴 Improve sleep quality - establish a consistent bedtime routine")
            
            if input_data['stress_level'] >= 6:
                recommendations.append("🧘 Incorporate daily stress-relief activities (10-15 min)")
            
            if input_data['days_without_social_media'] <= 2:
                recommendations.append("🔕 Aim for 2-3 social media-free days per week")
            
            if input_data['exercise_frequency_week'] <= 3:
                recommendations.append("🏃 Boost exercise to 4-5 times per week for better balance")
        
        else:  # Balanced
            recommendations.append("🎉 Great job maintaining digital well-being balance!")
            recommendations.append("✅ Continue current healthy habits with screen time and lifestyle")
            recommendations.append("🔄 Stay mindful of changes that could affect your balance")
            recommendations.append("💪 Consider mentoring others about healthy digital habits")
        
        return recommendations
    
    def get_model_info(self) -> Dict:
        """Return model metadata"""
        return {
            "algorithm": "K-Nearest Neighbors",
            "n_neighbors": self.model.n_neighbors if hasattr(self.model, 'n_neighbors') else 5,
            "features": len(self.feature_columns),
            "feature_names": self.feature_columns,
            "classes": ["At Risk", "Moderate", "Balanced"],
            "balanced_with_smote": True,
            "accuracy": 0.68,  # From training
            "training_samples": 867  # After SMOTE
        }


# Global instance
predictor: WellBeingPredictor = None


def get_predictor() -> WellBeingPredictor:
    """Get or create predictor instance"""
    global predictor
    if predictor is None:
        predictor = WellBeingPredictor()
    return predictor
