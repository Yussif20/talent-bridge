"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Link from "next/link";

interface FormData {
  childName: string;
  grade: string;
  gender: string;
  parentName: string;
  birthDate: string;
  answers: number[];
}

interface ApiResponse {
  result: number;
  evaluation: string;
  disability: string;
}

export default function ParentForm() {
  const locale = useLocale();
  const t = useTranslations("ParentForm");
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    grade: "",
    gender: "",
    parentName: "",
    birthDate: "",
    answers: new Array(15).fill(-1),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Parent assessment questions
  const questions = [
    {
      en: "My child shows distinctive abilities or interests in specific areas (such as mathematics, art, technology...).",
      ar: "يُظهر ابني/ابنتي قدرات أو اهتمامات مميزة في مجالات معينة (مثل الرياضيات، الفن، التكنولوجيا…).",
    },
    {
      en: "Asks deep or unusual questions that show advanced thinking.",
      ar: "يطرح أسئلة عميقة أو غير مألوفة تدل على تفكير متقدم.",
    },
    {
      en: "Shows contrast between excellence in some areas and clear difficulties in others.",
      ar: "يظهر تباينًا بين تفوقه في بعض المجالات وصعوبات واضحة في مجالات أخرى.",
    },
    {
      en: "Shows feelings of frustration or low self-confidence due to this gap.",
      ar: "يُبدي مشاعر إحباط أو انخفاض ثقة بالنفس بسبب هذه الفجوة.",
    },
    {
      en: "Interacts enthusiastically with creative or exploratory activities.",
      ar: "يتفاعل بحماس مع الأنشطة الإبداعية أو الاستكشافية.",
    },
    {
      en: "Has difficulty concentrating or organizing daily tasks.",
      ar: "يواجه صعوبة في التركيز أو تنظيم المهام اليومية.",
    },
    {
      en: "Suffers from difficulties in reading or writing compared to their level in conversation or comprehension.",
      ar: "يعاني من صعوبات في القراءة أو الكتابة مقارنة بمستواه في المحادثة أو الفهم.",
    },
    {
      en: "Prefers individual work or isolation over group activities.",
      ar: "يفضّل العمل الفردي أو العزلة على الأنشطة الجماعية.",
    },
    {
      en: "Shows distraction or hyperactivity, but focuses deeply when doing what they love.",
      ar: "يظهر تشتتًا أو فرط حركة، لكنه يركز بعمق عند ممارسة ما يحبه.",
    },
    {
      en: "Shows unexpected or different responses in social situations.",
      ar: "يُظهر استجابات غير متوقعة أو مختلفة في المواقف الاجتماعية.",
    },
    {
      en: "Has rich vocabulary or way of expression compared to their age.",
      ar: "لديه مفردات أو طريقة تعبير غنية مقارنة بعمره.",
    },
    {
      en: "Shows speed in learning new concepts or solving practical problems.",
      ar: "يظهر سرعة في تعلم مفاهيم جديدة أو في حل المشكلات العملية.",
    },
    {
      en: "Uses unconventional methods to express themselves (drawing, writing, creating solutions).",
      ar: "يستخدم أساليب غير تقليدية للتعبير عن نفسه (رسم، كتابة، ابتكار حلول).",
    },
    {
      en: "Shows creativity or many diverse ideas in a short time.",
      ar: "يبدي إبداعًا أو أفكارًا كثيرة ومتنوعة خلال وقت قصير.",
    },
    {
      en: "Shows artistic sense or special inclinations in specific areas (music, design, scientific experiments...).",
      ar: "يظهر حسًا فنيًا أو ميولًا خاصة في مجالات محددة (الموسيقى، التصميم، التجارب العلمية…).",
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
      !formData.childName ||
      !formData.grade ||
      !formData.gender ||
      !formData.parentName ||
      !formData.birthDate
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
        evaluation = "Low risk for twice-exceptional characteristics";
        disability = "None indicated";
      } else if (totalScore <= 20) {
        evaluation = "Moderate indicators of twice-exceptional characteristics";
        disability = "Further assessment recommended";
      } else {
        evaluation = "Strong indicators of twice-exceptional characteristics";
        disability = "Professional evaluation recommended";
      }

      const requestBody = {
        result: totalScore,
        evaluation: evaluation,
        disability: disability,
        surveyType: "Parents",
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
                href={`/${locale}/teacher-form`}
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
              >
                {locale === "ar" ? "استمارة المعلم" : "Teacher Form"}
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {locale === "ar" ? "تقييم ولي الأمر" : "Parent Assessment"}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 mb-8 border border-green-200 dark:border-green-800">
          <h2 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-4">
            {t("instructions.title")}
          </h2>
          <ul className="text-green-800 dark:text-green-200 space-y-2">
            {t.raw("instructions.items").map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
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
                  {locale === "ar" ? "اسم الطالب" : "Student Name"} *
                </label>
                <input
                  type="text"
                  value={formData.childName}
                  onChange={(e) =>
                    handleInputChange("childName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {locale === "ar" ? "الصف الدراسي" : "Grade Level"} *
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => handleInputChange("grade", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {locale === "ar" ? "الجنس" : "Gender"} *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {locale === "ar" ? "ذكر" : "Male"}
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      {locale === "ar" ? "أنثى" : "Female"}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {locale === "ar" ? "اسم ولي الأمر" : "Parent Name"} *
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) =>
                    handleInputChange("parentName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {locale === "ar" ? "تاريخ الميلاد" : "Birth Date"} *
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
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
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 leading-relaxed">
                        {locale === "ar" ? question.ar : question.en}
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
                              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {value === 0 &&
                                (locale === "ar" ? "لا ينطبق" : "Never")}
                              {value === 1 &&
                                (locale === "ar" ? "أحياناً" : "Sometimes")}
                              {value === 2 &&
                                (locale === "ar" ? "دائماً" : "Always")}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
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
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
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
            href={`/${locale}/teacher-form`}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            {locale === "ar" ? "استمارة المعلم" : "Teacher Form"}
          </Link>
        </div>
      </div>
    </div>
  );
}
