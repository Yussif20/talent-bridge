"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

interface FormData {
  studentName: string;
  studentAge: string;
  teacherEmail: string;
  answers: number[];
}

interface ApiResponse {
  result: number;
  evaluation: string;
  disability: string;
}

export default function TeacherForm() {
  const locale = useLocale();
  const t = useTranslations("TeacherForm");
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentAge: "",
    teacherEmail: "",
    answers: new Array(15).fill(-1),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Teacher assessment questions
  const questions = [
    {
      en: "Student demonstrates exceptional academic ability in one or more subjects",
      ar: "يُظهر الطالب قدرة أكاديمية استثنائية في موضوع أو أكثر",
    },
    {
      en: "Student shows advanced problem-solving and critical thinking skills",
      ar: "يُظهر الطالب مهارات متقدمة في حل المشكلات والتفكير النقدي",
    },
    {
      en: "Student has difficulty maintaining attention during lessons",
      ar: "يواجه الطالب صعوبة في الحفاظ على الانتباه أثناء الدروس",
    },
    {
      en: "Student shows inconsistent academic performance across subjects",
      ar: "يُظهر الطالب أداءً أكاديمياً غير متسق عبر المواد",
    },
    {
      en: "Student demonstrates advanced vocabulary and language skills",
      ar: "يُظهر الطالب مفردات ومهارات لغوية متقدمة",
    },
    {
      en: "Student has difficulty with written assignments or handwriting",
      ar: "يواجه الطالب صعوبة في المهام المكتوبة أو الكتابة اليدوية",
    },
    {
      en: "Student shows creative and original thinking",
      ar: "يُظهر الطالب تفكيراً إبداعياً وأصيلاً",
    },
    {
      en: "Student struggles with social interactions with peers",
      ar: "يواجه الطالب صعوبات في التفاعلات الاجتماعية مع الأقران",
    },
    {
      en: "Student demonstrates exceptional memory in areas of interest",
      ar: "يُظهر الطالب ذاكرة استثنائية في مجالات الاهتمام",
    },
    {
      en: "Student has difficulty following classroom routines and procedures",
      ar: "يواجه الطالب صعوبة في اتباع روتين وإجراءات الفصل الدراسي",
    },
    {
      en: "Student shows perfectionist tendencies and fear of making mistakes",
      ar: "يُظهر الطالب نزعات كمالية وخوفاً من ارتكاب الأخطاء",
    },
    {
      en: "Student demonstrates advanced reasoning abilities",
      ar: "يُظهر الطالب قدرات استدلال متقدمة",
    },
    {
      en: "Student has difficulty organizing tasks and materials",
      ar: "يواجه الطالب صعوبة في تنظيم المهام والمواد",
    },
    {
      en: "Student shows intense focus on specific topics or interests",
      ar: "يُظهر الطالب تركيزاً مكثفاً على مواضيع أو اهتمامات محددة",
    },
    {
      en: "Student exhibits emotional sensitivity or overreactions to situations",
      ar: "يُظهر الطالب حساسية عاطفية أو ردود فعل مفرطة للمواقف",
    },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...formData.answers];
    newAnswers[questionIndex] = value;
    setFormData((prev) => ({ ...prev, answers: newAnswers }));
  };

  const calculateResult = () => {
    return formData.answers.reduce(
      (sum, answer) => sum + (answer === -1 ? 0 : answer),
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate form
    if (
      !formData.studentName ||
      !formData.studentAge ||
      !formData.teacherEmail
    ) {
      setError(t("form.required"));
      setIsSubmitting(false);
      return;
    }

    if (formData.answers.some((answer) => answer === -1)) {
      setError("Please answer all questions");
      setIsSubmitting(false);
      return;
    }

    try {
      const totalScore = calculateResult();

      // Determine evaluation and disability based on score
      let evaluation = "";
      let disability = "";

      if (totalScore <= 10) {
        evaluation = "Low indicators of twice-exceptional characteristics";
        disability = "No significant concerns identified";
      } else if (totalScore <= 20) {
        evaluation = "Moderate indicators of twice-exceptional characteristics";
        disability = "Further classroom observations recommended";
      } else {
        evaluation = "Strong indicators of twice-exceptional characteristics";
        disability = "Comprehensive educational evaluation recommended";
      }

      const requestBody = {
        result: totalScore,
        evaluation: evaluation,
        disability: disability,
        surveyType: "Teachers",
      };

      console.log("Submitting to API:", requestBody);

      const response = await fetch("/api/survey/SurveyResult/Save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const apiResult = await response.json();
      console.log("API Success:", apiResult);

      // Successfully submitted to API
      setResult({
        result: totalScore,
        evaluation: evaluation,
        disability: disability,
      });
    } catch (error) {
      console.error("Detailed error:", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorName =
        error instanceof Error ? error.constructor.name : typeof error;

      console.error("Error type:", errorName);
      console.error("Error message:", errorMessage);

      if (error instanceof TypeError && errorMessage.includes("fetch")) {
        setError(
          "Network error: Please check your internet connection. This might be a CORS issue - try running the app on a server."
        );
      } else if (errorMessage.includes("HTTP")) {
        setError(`Server error: ${errorMessage}`);
      } else {
        setError(t("results.error") + ` (${errorMessage})`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("results.title")}
              </h1>
              <p className="text-xl text-green-600 dark:text-green-400 mb-8">
                {t("results.success")}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {locale === "ar" ? "النتيجة الإجمالية" : "Total Score"}
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {result.result}/30
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {locale === "ar" ? "التقييم" : "Evaluation"}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {result.evaluation}
                </p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {locale === "ar" ? "التوصية" : "Recommendation"}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {result.disability}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
                {locale === "ar" ? "ملاحظة مهمة" : "Important Note"}
              </h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                {t("disclaimer")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}`}
                className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
              </Link>
              <Link
                href={`/${locale}/parent-form`}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                {locale === "ar" ? "استمارة ولي الأمر" : "Parent Form"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-green-100 to-blue-100 dark:from-green-900/10 dark:to-blue-900/10 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/40 backdrop-blur-sm text-purple-800 dark:text-purple-200 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            {locale === "ar" ? "تقييم المعلم" : "Teacher Assessment"}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 mb-8 border border-purple-200 dark:border-purple-800">
          <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-300 mb-4">
            {t("instructions.title")}
          </h2>
          <ul className="text-purple-800 dark:text-purple-200 space-y-2">
            {t.raw("instructions.items").map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700"
        >
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {locale === "ar" ? "المعلومات الأساسية" : "Basic Information"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("form.studentName")} *
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) =>
                    handleInputChange("studentName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("form.studentAge")} *
                </label>
                <input
                  type="number"
                  min="5"
                  max="18"
                  value={formData.studentAge}
                  onChange={(e) =>
                    handleInputChange("studentAge", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("form.teacherEmail")} *
              </label>
              <input
                type="email"
                value={formData.teacherEmail}
                onChange={(e) =>
                  handleInputChange("teacherEmail", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                required
              />
            </div>
          </div>

          {/* Assessment Questions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t("form.questions.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("form.questions.subtitle")}
            </p>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    {index + 1}. {locale === "ar" ? question.ar : question.en}
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-3">
                    {[0, 1, 2].map((value) => (
                      <label
                        key={value}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={value}
                          checked={formData.answers[index] === value}
                          onChange={() => handleAnswerChange(index, value)}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {value === 0 && t("form.options.never")}
                          {value === 1 && t("form.options.sometimes")}
                          {value === 2 && t("form.options.always")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isSubmitting ? "animate-pulse" : ""
              }`}
            >
              {isSubmitting ? t("form.submitting") : t("form.submit")}
            </button>
          </div>
        </form>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link
            href={`/${locale}`}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <Link
            href={`/${locale}/parent-form`}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            {locale === "ar" ? "استمارة ولي الأمر" : "Parent Form"}
          </Link>
        </div>
      </div>
    </div>
  );
}
