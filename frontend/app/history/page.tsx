'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAnonymousUserId, hasUserHistory, clearAnonymousUserId } from '@/lib/userId';
import { api } from '@/lib/api';

interface Assessment {
  id: number;
  prediction: string;
  confidence_at_risk: number;
  confidence_moderate: number;
  confidence_balanced: number;
  created_at: string;
  daily_screen_time_hrs: number;
  sleep_quality: number;
  stress_level: number;
}

interface Stats {
  total_assessments: number;
  at_risk_count: number;
  moderate_count: number;
  balanced_count: number;
  trend: string;
  latest_prediction: string;
  first_assessment: string;
  latest_assessment: string;
}

interface HistoryResponse {
  status: string;
  count: number;
  assessments: Assessment[];
}

interface StatsResponse {
  status: string;
  stats: Stats | null;
}

export default function HistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    if (!hasUserHistory()) {
      setLoading(false);
      return;
    }

    try {
      const userId = getAnonymousUserId();
      const [historyResponse, statsResponse] = await Promise.all([
        api.getUserHistory(userId),
        api.getUserStats(userId)
      ]);

      setAssessments((historyResponse as HistoryResponse).assessments || []);
      setStats((statsResponse as StatsResponse).stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async () => {
    if (!confirm('Are you sure you want to delete all your assessment history? This cannot be undone.')) {
      return;
    }

    try {
      const userId = getAnonymousUserId();
      await api.deleteUserHistory(userId);
      clearAnonymousUserId();
      setAssessments([]);
      setStats(null);
      alert('History deleted successfully');
    } catch {
      alert('Failed to delete history');
    }
  };

  const getCategoryColor = (prediction: string) => {
    switch (prediction) {
      case 'At Risk': return '#ef4444';
      case 'Moderate': return '#f59e0b';
      case 'Balanced': return '#22c55e';
      default: return 'var(--color-text-dim)';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➡️';
      default: return '❓';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page-bg" style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner"></div>
          <p className="loading-text">Loading your history...</p>
        </div>
      </div>
    );
  }

  if (!hasUserHistory() || assessments.length === 0) {
    return (
      <div className="page-bg" style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
        <div className="form-container">
          <div className="card" style={{ textAlign: 'center' }}>
            <h1 className="card-title">📊 Assessment History</h1>
            <p className="card-description">No assessments found. Take your first assessment to start tracking!</p>
            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => router.push('/assessment')} className="btn-primary">
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg" style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
      <div className="form-container">
        {/* Header */}
        <div className="header" style={{ marginBottom: '2rem' }}>
          <h1 className="title">📊 Your Assessment History</h1>
          <p className="subtitle">Track your digital well-being progress over time</p>
        </div>

        {error && (
          <div className="error-box">
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Statistics Overview */}
        {stats && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 className="card-title">Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.total_assessments}</div>
                <div className="stat-label">Total Assessments</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: getCategoryColor(stats.latest_prediction) }}>
                  {stats.latest_prediction}
                </div>
                <div className="stat-label">Latest Result</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{getTrendIcon(stats.trend)}</div>
                <div className="stat-label" style={{ textTransform: 'capitalize' }}>
                  {stats.trend === 'insufficient_data' ? 'New User' : stats.trend}
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-text)', marginBottom: '1rem' }}>
                Category Breakdown
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-label">At Risk</span>
                    <span className="confidence-value">{stats.at_risk_count} assessments</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(stats.at_risk_count / stats.total_assessments) * 100}%`,
                        backgroundColor: '#ef4444'
                      }}
                    />
                  </div>
                </div>
                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-label">Moderate</span>
                    <span className="confidence-value">{stats.moderate_count} assessments</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(stats.moderate_count / stats.total_assessments) * 100}%`,
                        backgroundColor: '#f59e0b'
                      }}
                    />
                  </div>
                </div>
                <div className="confidence-item">
                  <div className="confidence-header">
                    <span className="confidence-label">Balanced</span>
                    <span className="confidence-value">{stats.balanced_count} assessments</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(stats.balanced_count / stats.total_assessments) * 100}%`,
                        backgroundColor: '#22c55e'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment List */}
        <div className="card">
          <h2 className="card-title">Past Assessments</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {assessments.map((assessment) => (
              <div 
                key={assessment.id}
                style={{
                  background: 'var(--bg-primary)',
                  border: `2px solid ${getCategoryColor(assessment.prediction)}`,
                  borderRadius: '0.5rem',
                  padding: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600',
                      color: getCategoryColor(assessment.prediction)
                    }}>
                      {assessment.prediction}
                    </span>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', marginTop: '0.25rem' }}>
                      {formatDate(assessment.created_at)}
                    </p>
                  </div>
                  <div style={{ fontSize: '2rem' }}>
                    {assessment.prediction === 'At Risk' ? '😟' : 
                     assessment.prediction === 'Moderate' ? '😐' : '😊'}
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-dim)'
                }}>
                  <div>
                    <strong style={{ color: 'var(--color-text)' }}>Screen Time:</strong> {assessment.daily_screen_time_hrs}h
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-text)' }}>Sleep:</strong> {assessment.sleep_quality}/10
                  </div>
                  <div>
                    <strong style={{ color: 'var(--color-text)' }}>Stress:</strong> {assessment.stress_level}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="actions" style={{ marginTop: '2rem' }}>
          <button onClick={() => router.push('/assessment')} className="btn-primary">
            Take New Assessment
          </button>
          <button onClick={() => router.push('/')} className="btn-secondary">
            Back to Home
          </button>
          <button 
            onClick={handleDeleteHistory} 
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: '2px solid #ef4444',
              color: '#ef4444',
              borderRadius: '0.5rem',
              fontWeight: '600',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
          >
            Delete History
          </button>
        </div>
      </div>
    </div>
  );
}
