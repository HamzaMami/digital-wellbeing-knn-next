import Link from 'next/link';

export default function Home() {
  return (
    <div className="page-bg">
      <main className="hero">
        {/* Header */}
        <div>
          <h1 className="hero-title">
            Digital <span>Well-Being</span> Assessment
          </h1>
          <p className="hero-subtitle">
            Understand your relationship with social media and get personalized recommendations
            powered by machine learning
          </p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">68%</div>
            <div className="stat-label">Model Accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">500+</div>
            <div className="stat-label">Training Samples</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Well-Being Categories</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="cta-section">
          <Link href="/assessment" className="cta-button">
            Take Assessment →
          </Link>
          <p className="cta-note">Takes only 2 minutes</p>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Personalized Analysis</h3>
            <p className="feature-text">
              Get insights tailored to your digital habits and lifestyle patterns
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3 className="feature-title">ML-Powered</h3>
            <p className="feature-text">
              KNN algorithm trained on 500+ samples with SMOTE balancing
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">Actionable Recommendations</h3>
            <p className="feature-text">
              Receive specific suggestions to improve your digital well-being
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Privacy First</h3>
            <p className="feature-text">
              No data storage - instant predictions with complete privacy
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer">
          <p>
            <strong>⚠️ Educational Tool:</strong> This is a machine learning project for educational
            purposes. Results are predictions, not medical diagnoses. If you&apos;re struggling with mental
            health, please consult qualified professionals.
          </p>
        </div>
      </main>
    </div>
  );
}
