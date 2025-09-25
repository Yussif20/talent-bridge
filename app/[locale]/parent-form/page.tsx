import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ParentForm() {
  const t = useTranslations("ParentForm");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Parent Behavioral Characteristics Form
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This simplified form helps identify twice-exceptional
            characteristics from a parent&apos;s perspective. Please complete all 15
            questions based on your observations of your child.
          </p>
        </div>

        {/* Form Preview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Assessment Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">
                    15
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Total Questions
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    General behavioral observations
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-300 font-semibold">
                    5
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Minutes
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Estimated completion time
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-300 font-semibold">
                    ⚡
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Instant Results
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Immediate scoring and analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-300 font-semibold">
                    📊
                  </span>
                </div>
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Detailed Report
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    PDF download available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Instructions for Parents
            </h3>
            <ul className="text-green-800 dark:text-green-200 space-y-2 text-sm">
              <li>
                • Think about your child's typical behavior at home and in
                social settings
              </li>
              <li>
                • Rate each behavior: Never (0), Sometimes (1), Always (2)
              </li>
              <li>
                • Provide your child's name, a unique ID, and your email address
              </li>
              <li>• Be honest and objective in your observations</li>
              <li>• Results are for educational screening purposes only</li>
            </ul>
          </div>

          {/* Sample Questions Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sample Questions
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div>• Shows advanced vocabulary for their age</div>
              <div>• Demonstrates exceptional problem-solving abilities</div>
              <div>• Has difficulty with social interactions</div>
              <div>• Shows intense focus on specific interests</div>
              <div>• Exhibits emotional sensitivity</div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
              *These are sample questions. The actual form contains 15
              comprehensive behavioral indicators.
            </p>
          </div>

          {/* Placeholder for Form */}
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Form Under Development
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              The interactive parent assessment form will be implemented in the
              next development phase.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4">
          <Link
            href="/en"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/en/teacher-form"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Teacher Form
          </Link>
        </div>
      </div>
    </div>
  );
}
