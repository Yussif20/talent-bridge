import { useTranslations } from "next-intl";
import Link from "next/link";

export default function TeacherForm() {
  const t = useTranslations("TeacherForm");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Teacher Behavioral Characteristics Form
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This form helps identify twice-exceptional students by assessing
            behavioral characteristics across 8 different domains. Please
            complete all 70 questions based on your observations of the student.
          </p>
        </div>

        {/* Form Preview Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Assessment Domains
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  General Characteristics (10 questions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Autism Spectrum (10 questions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Learning Disabilities (10 questions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Hearing Impairment (10 questions)
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Visual Impairment (10 questions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Intellectual Disability (10 questions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  ADHD (5 questions)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">
                  Multiple Disabilities (5 questions)
                </span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
              Instructions
            </h3>
            <ul className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
              <li>
                • Rate each behavior based on your observations: Never (0),
                Sometimes (1), Always (2)
              </li>
              <li>
                • Complete all required fields: Student Name, Student ID, and
                your email address
              </li>
              <li>
                • The assessment takes approximately 15-20 minutes to complete
              </li>
              <li>• Results will be available immediately after submission</li>
            </ul>
          </div>

          {/* Placeholder for Form */}
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Form Under Development
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              The interactive form with all 70 questions will be implemented in
              the next phase.
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
            href="/en/parent-form"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Parent Form
          </Link>
        </div>
      </div>
    </div>
  );
}
