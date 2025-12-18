/**
 * API client for communicating with the FastAPI backend
 */

import { AssessmentFormData, PredictionResponse, ModelInfo, HealthStatus, FeaturesInfo } from './types';
import { API_ENDPOINTS } from './constants';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new ApiError(response.status, error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const api = {
  /**
   * Check API health status
   */
  checkHealth: (): Promise<HealthStatus> => {
    return fetchAPI<HealthStatus>(API_ENDPOINTS.HEALTH);
  },

  /**
   * Submit assessment and get prediction
   */
  predict: (data: AssessmentFormData): Promise<PredictionResponse> => {
    return fetchAPI<PredictionResponse>(API_ENDPOINTS.PREDICT, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Get model information
   */
  getModelInfo: (): Promise<ModelInfo> => {
    return fetchAPI<ModelInfo>(API_ENDPOINTS.MODEL_INFO);
  },

  /**
   * Get features information
   */
  getFeaturesInfo: (): Promise<FeaturesInfo> => {
    return fetchAPI<FeaturesInfo>(API_ENDPOINTS.FEATURES);
  },

  /**
   * Save assessment to history
   */
  saveAssessment: (userId: string, inputData: AssessmentFormData, prediction: PredictionResponse) => {
    return fetchAPI(`/api/v1/history/save?user_id=${userId}`, {
      method: 'POST',
      body: JSON.stringify({
        input_data: inputData,
        prediction: prediction,
      }),
    });
  },

  /**
   * Get user assessment history
   */
  getUserHistory: (userId: string) => {
    return fetchAPI(`/api/v1/history/user/${userId}`);
  },

  /**
   * Get user statistics
   */
  getUserStats: (userId: string) => {
    return fetchAPI(`/api/v1/history/stats/${userId}`);
  },

  /**
   * Delete user history
   */
  deleteUserHistory: (userId: string) => {
    return fetchAPI(`/api/v1/history/user/${userId}`, {
      method: 'DELETE',
    });
  },
};
