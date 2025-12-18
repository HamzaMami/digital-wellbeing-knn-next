/**
 * Constants for the Digital Well-Being application
 */

export const GENDER_OPTIONS = ['Female', 'Male'] as const;

export const PLATFORM_OPTIONS = [
  'Facebook',
  'Instagram',
  'LinkedIn',
  'TikTok',
  'X',
  'YouTube'
] as const;

export const CATEGORY_COLORS = {
  'At Risk': {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
    badge: 'bg-red-500',
    gradient: 'from-red-500 to-red-600'
  },
  'Moderate': {
    bg: 'bg-amber-50',
    border: 'border-amber-500',
    text: 'text-amber-700',
    badge: 'bg-amber-500',
    gradient: 'from-amber-500 to-amber-600'
  },
  'Balanced': {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
    badge: 'bg-green-500',
    gradient: 'from-green-500 to-green-600'
  }
} as const;

export const CATEGORY_ICONS = {
  'At Risk': '🔴',
  'Moderate': '🟡',
  'Balanced': '🟢'
} as const;

export const SLIDER_CONFIGS = {
  age: {
    min: 10,
    max: 100,
    step: 1,
    label: 'Age',
    description: 'Your age in years'
  },
  daily_screen_time_hrs: {
    min: 0,
    max: 24,
    step: 0.5,
    label: 'Daily Screen Time',
    description: 'Average hours per day on social media',
    suffix: 'hours'
  },
  sleep_quality: {
    min: 1,
    max: 10,
    step: 1,
    label: 'Sleep Quality',
    description: '1 = Very poor, 10 = Excellent',
    emoji: ['😴', '😪', '😐', '😊', '😃']
  },
  stress_level: {
    min: 1,
    max: 10,
    step: 1,
    label: 'Stress Level',
    description: '1 = Very low, 10 = Very high'
  },
  days_without_social_media: {
    min: 0,
    max: 30,
    step: 1,
    label: 'Days Without Social Media',
    description: 'Days per month without using social media',
    suffix: 'days/month'
  },
  exercise_frequency_week: {
    min: 0,
    max: 14,
    step: 1,
    label: 'Exercise Frequency',
    description: 'Number of exercise sessions per week',
    suffix: 'times/week'
  }
} as const;

export const API_ENDPOINTS = {
  HEALTH: '/api/v1/health',
  PREDICT: '/api/v1/predict',
  MODEL_INFO: '/api/v1/model-info',
  FEATURES: '/api/v1/features'
} as const;
