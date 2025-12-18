'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PredictionResponse, AssessmentFormData } from '@/lib/types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/lib/constants';

export default function ResultsPage() {
  const router = useRouter();
  
  // Lazy initialization - reads sessionStorage only once on mount
  const [result] = useState<PredictionResponse | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('predictionResult');
    return stored ? JSON.parse(stored) : null;
  });

  const [assessmentData] = useState<AssessmentFormData | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('assessmentData');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    // Redirect if no data
    if (!result || !assessmentData) {
      router.push('/assessment');
    }
  }, [result, assessmentData, router]);

  if (!result || !assessmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="loading-text">Loading your results...</p>
        </div>
      </div>
    );
  }

  const category = result.prediction;
  const colors = CATEGORY_COLORS[category];
  const icon = CATEGORY_ICONS[category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 py-12 px-4">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Your Digital Well-Being Results</h1>
          <p className="subtitle">Based on your assessment responses</p>
        </div>

        {/* Main Result Card */}
        <div className={`result-card ${colors.bg} ${colors.border}`}>
          <div className="result-icon">{icon}</div>
          <h2 className={`result-title ${colors.text}`}>{category}</h2>
          <p className="result-description">
            {category === 'Balanced' && 'Great job! You have a healthy relationship with social media.'}
            {category === 'Moderate' && "You're doing okay, but there's room for improvement."}
            {category === 'At Risk' && 'Your digital habits may be affecting your well-being.'}
          </p>
        </div>

        {/* Confidence Levels */}
        <div className="card">
          <h3 className="card-title">Confidence Levels</h3>
          <div className="space-y-4">
            {Object.entries(result.confidence)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, conf]) => {
                const catColors = CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS];
                const percentage = Math.round(conf);
                return (
                  <div key={cat} className="confidence-item">
                    <div className="confidence-header">
                      <span className="confidence-label">
                        {CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS]} {cat}
                      </span>
                      <span className="confidence-value">{percentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${catColors.gradient}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h3 className="card-title">Personalized Recommendations</h3>
          <div className="recommendations-list">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <div className="recommendation-number">{index + 1}</div>
                <p className="recommendation-text">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Impact */}
        {Object.keys(result.feature_impact).length > 0 && (
          <div className="card">
            <h3 className="card-title">Key Factors</h3>
            <p className="card-description">
              These factors had the most impact on your result:
            </p>
            <div className="space-y-3">
              {Object.entries(result.feature_impact)
                .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
                .map(([feature, impact]) => {
                  const isPositive = impact > 0;
                  const percentage = Math.abs(impact) * 100;
                  return (
                    <div key={feature} className="factor-item">
                      <span className={`factor-icon ${isPositive ? 'negative' : 'positive'}`}>
                        {isPositive ? '⚠️' : '✅'}
                      </span>
                      <div className="factor-content">
                        <p className="factor-label">{feature.replace(/_/g, ' ')}</p>
                        <div className="factor-bar">
                          <div
                            className={`factor-fill ${isPositive ? 'negative' : 'positive'}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="actions">
          <button onClick={() => router.push('/assessment')} className="btn-primary">
            Retake Assessment
          </button>
          <button onClick={() => router.push('/')} className="btn-secondary">
            Back to Home
          </button>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <p>
            <strong>⚠️ Important:</strong> This assessment is for educational purposes only and
            does not constitute medical advice. If you&apos;re experiencing mental health concerns,
            please consult a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
