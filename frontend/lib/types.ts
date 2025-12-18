/**
 * TypeScript interfaces for the Digital Well-Being application
 */

export interface AssessmentFormData {
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  daily_screen_time_hrs: number;
  primary_platform: 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'X' | 'YouTube';
  sleep_quality: number;
  stress_level: number;
  days_without_social_media: number;
  exercise_frequency_week: number;
}

export interface PredictionResponse {
  prediction: 'At Risk' | 'Moderate' | 'Balanced';
  confidence: {
    'At Risk': number;
    'Moderate': number;
    'Balanced': number;
  };
  recommendations: string[];
  feature_impact: Record<string, number>;
}

export interface ModelInfo {
  algorithm: string;
  n_neighbors: number;
  features: number;
  feature_names: string[];
  classes: string[];
  balanced_with_smote: boolean;
  accuracy: number;
  training_samples: number;
}

export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  version: string;
}

export interface FeaturesInfo {
  numeric_features: string[];
  categorical_features: Record<string, string[]>;
}

export type WellBeingCategory = 'At Risk' | 'Moderate' | 'Balanced';
