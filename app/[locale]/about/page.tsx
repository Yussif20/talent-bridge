import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About TalentBridge
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Supporting educators and families in identifying and nurturing
            twice-exceptional students through comprehensive behavioral
            assessment and individualized planning.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* What is Twice-Exceptional */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What is Twice-Exceptional?
              </h2>
            </div>
            <div className="text-gray-600 dark:text-gray-300 space-y-4">
              <p>
                Twice-exceptional (2e) students are individuals who demonstrate
                both giftedness and one or more disabilities. These students
                possess exceptional abilities in certain areas while
                simultaneously facing challenges in others.
              </p>
              <p>Common combinations include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Giftedness with Autism Spectrum Disorder</li>
                <li>High intellectual ability with ADHD</li>
                <li>Creative talents with Learning Disabilities</li>
                <li>Advanced reasoning with Social/Emotional challenges</li>
              </ul>
            </div>
          </div>

          {/* How TalentBridge Helps */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                How TalentBridge Helps
              </h2>
            </div>
            <div className="text-gray-600 dark:text-gray-300 space-y-4">
              <p>
                Our comprehensive assessment tool provides educators and
                families with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Evidence-based behavioral screening forms</li>
                <li>Instant analysis and scoring</li>
                <li>Identification of strengths and challenges</li>
                <li>Customized 4-week intervention plans</li>
                <li>Professional PDF reports for documentation</li>
                <li>Email delivery for easy sharing</li>
              </ul>
              <p className="text-sm italic bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                Important: This tool is for educational screening purposes only
                and does not constitute a medical or psychological diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Process */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Assessment Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  1
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Choose Form
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Select Teacher Form (70 questions) or Parent Form (15 questions)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-300">
                  2
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Complete Assessment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Rate behaviors using Never (0), Sometimes (1), Always (2) scale
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                  3
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get Results
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive instant scoring with strengths and challenges analysis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                  4
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Action Plan
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download personalized 4-week intervention plan and reports
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Evidence-Based Assessment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our screening tools are based on research-validated behavioral
              indicators for identifying twice-exceptional characteristics
              across multiple domains.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Instant Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get immediate results with detailed scoring, classification
              levels, and identification of strengths and areas needing support.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Individualized Plans
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Receive customized 4-week intervention plans with specific
              activities, goals, and strategies tailored to the assessment
              results.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Assessment?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose the appropriate form to start identifying twice-exceptional
            characteristics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/teacher-form"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Teacher Assessment Form
            </Link>
            <Link
              href="/en/parent-form"
              className="px-8 py-4 bg-white/20 backdrop-blur text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Parent Assessment Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
