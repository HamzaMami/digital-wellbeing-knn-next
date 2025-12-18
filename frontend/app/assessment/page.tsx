'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AssessmentFormData } from '@/lib/types';
import { GENDER_OPTIONS, PLATFORM_OPTIONS, SLIDER_CONFIGS } from '@/lib/constants';
import { api } from '@/lib/api';
import { getAnonymousUserId } from '@/lib/userId';

export default function AssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AssessmentFormData>({
    age: 25,
    gender: 'Female',
    daily_screen_time_hrs: 5,
    primary_platform: 'Instagram',
    sleep_quality: 7,
    stress_level: 5,
    days_without_social_media: 2,
    exercise_frequency_week: 3,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await api.predict(formData);
      
      // Store result in sessionStorage
      sessionStorage.setItem('predictionResult', JSON.stringify(result));
      sessionStorage.setItem('assessmentData', JSON.stringify(formData));
      
      // Save to database anonymously
      const userId = getAnonymousUserId();
      await api.saveAssessment(userId, formData, result);
      
      // Navigate to results page
      router.push('/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const updateField = <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page-bg">
      <div className="form-container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Digital Well-Being Assessment</h1>
          <p className="subtitle">
            Answer these questions to receive your personalized well-being analysis
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form-card">
          {/* Personal Info Section */}
          <section className="form-section">
            <h2 className="section-title">Personal Information</h2>

            {/* Age Slider */}
            <div className="form-field">
              <label className="field-label">
                Age: <span className="field-value">{formData.age}</span> years
              </label>
              <input
                type="range"
                min={SLIDER_CONFIGS.age.min}
                max={SLIDER_CONFIGS.age.max}
                step={SLIDER_CONFIGS.age.step}
                value={formData.age}
                onChange={(e) => updateField('age', parseInt(e.target.value))}
                className="slider"
              />
              <p className="field-description">{SLIDER_CONFIGS.age.description}</p>
            </div>

            {/* Gender Radio */}
            <div className="form-field">
              <label className="field-label">Gender</label>
              <div className="radio-group">
                {GENDER_OPTIONS.map((gender) => (
                  <label key={gender} className="radio-label">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={(e) => updateField('gender', e.target.value as typeof formData.gender)}
                      className="radio-input"
                    />
                    <span className="radio-text">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Digital Habits Section */}
          <section className="form-section">
            <h2 className="section-title">Digital Habits</h2>

            {/* Screen Time Slider */}
            <div className="form-field">
              <label className="field-label">
                Daily Screen Time: <span className="field-value">{formData.daily_screen_time_hrs}</span> hours
              </label>
              <input
                type="range"
                min={SLIDER_CONFIGS.daily_screen_time_hrs.min}
                max={SLIDER_CONFIGS.daily_screen_time_hrs.max}
                step={SLIDER_CONFIGS.daily_screen_time_hrs.step}
                value={formData.daily_screen_time_hrs}
                onChange={(e) => updateField('daily_screen_time_hrs', parseFloat(e.target.value))}
                className="slider"
              />
              <p className="field-description">{SLIDER_CONFIGS.daily_screen_time_hrs.description}</p>
            </div>

            {/* Platform Select */}
            <div className="form-field">
              <label className="field-label">Primary Social Media Platform</label>
              <select
                value={formData.primary_platform}
                onChange={(e) => updateField('primary_platform', e.target.value as typeof formData.primary_platform)}
                className="select"
              >
                {PLATFORM_OPTIONS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            {/* Days Without Social Media */}
            <div className="form-field">
              <label className="field-label">
                Days Without Social Media: <span className="field-value">{formData.days_without_social_media}</span> days/month
              </label>
              <input
                type="range"
                min={SLIDER_CONFIGS.days_without_social_media.min}
                max={SLIDER_CONFIGS.days_without_social_media.max}
                step={SLIDER_CONFIGS.days_without_social_media.step}
                value={formData.days_without_social_media}
                onChange={(e) => updateField('days_without_social_media', parseInt(e.target.value))}
                className="slider"
              />
              <p className="field-description">{SLIDER_CONFIGS.days_without_social_media.description}</p>
            </div>
          </section>

          {/* Lifestyle Section */}
          <section className="form-section">
            <h2 className="section-title">Lifestyle</h2>

            {/* Sleep Quality */}
            <div className="form-field">
              <label className="field-label">
                Sleep Quality: <span className="field-value">{formData.sleep_quality}</span>/10
              </label>
              <input
                type="range"
                min={SLIDER_CONFIGS.sleep_quality.min}
                max={SLIDER_CONFIGS.sleep_quality.max}
                step={SLIDER_CONFIGS.sleep_quality.step}
                value={formData.sleep_quality}
                onChange={(e) => updateField('sleep_quality', parseInt(e.target.value))}
                className="slider"
              />
              <p className="field-description">{SLIDER_CONFIGS.sleep_quality.description}</p>
            </div>

            {/* Stress Level */}
            <div className="form-field">
              <label className="field-label">
                Stress Level: <span className="field-value">{formData.stress_level}</span>/10
              </label>
              <input
                type="range"
                min={SLIDER_CONFIGS.stress_level.min}
                max={SLIDER_CONFIGS.stress_level.max}
                step={SLIDER_CONFIGS.stress_level.step}
                value={formData.stress_level}
                onChange={(e) => updateField('stress_level', parseInt(e.target.value))}
                className="slider"
              />
              <p className="field-description">{SLIDER_CONFIGS.stress_level.description}</p>
            </div>

            {/* Exercise Frequency */}
            <div className="form-field">
              <label className="field-label">
                Exercise Frequency: <span className="field-value">{formData.exercise_frequency_week}</span> times/week
              </label>
              <input
                type="range"
                min={SLIDER_CONFIGS.exercise_frequency_week.min}
                max={SLIDER_CONFIGS.exercise_frequency_week.max}
                step={SLIDER_CONFIGS.exercise_frequency_week.step}
                value={formData.exercise_frequency_week}
                onChange={(e) => updateField('exercise_frequency_week', parseInt(e.target.value))}
                className="slider"
              />
              <p className="field-description">{SLIDER_CONFIGS.exercise_frequency_week.description}</p>
            </div>
          </section>

          {/* Error Display */}
          {error && (
            <div className="error-box">
              <p className="error-text">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Analyzing...' : 'Get My Results →'}
          </button>
        </form>

        {/* Back Link */}
        <button onClick={() => router.push('/')} className="back-link">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
