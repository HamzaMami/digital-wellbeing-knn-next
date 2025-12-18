import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            About This Project
          </h1>
          <p className="text-gray-600">How the Digital Well-Being Classifier Works</p>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            This is a machine learning project that predicts digital well-being levels based on social media
            habits and lifestyle factors. Built as an educational tool, it demonstrates the practical
            application of K-Nearest Neighbors (KNN) algorithm with SMOTE balancing for handling
            imbalanced datasets.
          </p>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Technical Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">🤖 Algorithm</h3>
              <p className="text-gray-700">
                <strong>K-Nearest Neighbors (KNN)</strong> with k=5 neighbors. This algorithm classifies
                new data points based on the majority class of their 5 nearest neighbors in the feature space.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">📊 Dataset</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>500 samples after data cleaning</li>
                <li>15 features (6 numeric + 9 categorical encoded)</li>
                <li>3 classes: Balanced (72.4%), Moderate (26.2%), At Risk (1.4%)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">⚖️ SMOTE Balancing</h3>
              <p className="text-gray-700">
                <strong>Synthetic Minority Over-sampling Technique (SMOTE)</strong> was used to address
                severe class imbalance. The "At Risk" class was synthetically increased from 6 to 289 samples,
                ensuring the model learns all classes equally rather than always predicting the majority class.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">📈 Performance</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Overall accuracy: 68%</li>
                <li>Training samples after SMOTE: 867</li>
                <li>Test samples: 100 (kept imbalanced to reflect real-world distribution)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Input Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Numeric Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Age (10-100 years)</li>
                <li>• Daily Screen Time (0-24 hours)</li>
                <li>• Sleep Quality (1-10 scale)</li>
                <li>• Stress Level (1-10 scale)</li>
                <li>• Days Without Social Media (0-30)</li>
                <li>• Exercise Frequency (0-14 times/week)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Categorical Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Gender (Female, Male, Other)</li>
                <li>• Primary Platform (Facebook, Instagram, LinkedIn, TikTok, X, YouTube)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                *One-hot encoded into 9 binary features
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Technology Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js 14 (App Router)</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• React Hooks</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• FastAPI (Python)</li>
                <li>• scikit-learn 1.5.3</li>
                <li>• imbalanced-learn (SMOTE)</li>
                <li>• Pydantic validation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Why SMOTE Matters</h2>
          <p className="text-gray-700 leading-relaxed">
            Without SMOTE, the model would have only 6 "At Risk" examples to learn from (1.4% of data).
            This causes the model to always predict "Balanced" since it gets 72% accuracy by ignoring
            minority classes. SMOTE creates synthetic examples through interpolation, allowing the model
            to learn patterns in underrepresented categories - crucial when detecting at-risk users is
            most important!
          </p>
        </div>

        {/* Educational Notice */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Educational Purpose</h2>
          <p className="text-gray-700 leading-relaxed">
            This project was created for educational purposes to demonstrate:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Full-stack machine learning deployment</li>
            <li>Handling imbalanced datasets with SMOTE</li>
            <li>Building RESTful ML APIs with FastAPI</li>
            <li>Modern web development with Next.js</li>
            <li>Ethical AI considerations in healthcare applications</li>
          </ul>
          <p className="text-gray-700 font-semibold mt-4">
            ⚠️ This tool does not provide medical advice. Always consult qualified professionals for
            mental health concerns.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
