"use client";

import { useLocale } from "next-intl";
import Link from "next/link";

export default function AboutPage() {
  const locale = useLocale();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-green-100 to-blue-100 dark:from-green-900/10 dark:to-blue-900/10 rounded-full blur-3xl opacity-40"></div>

      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {locale === "ar" ? "حول TalentBridge" : "About TalentBridge"}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            {locale === "ar"
              ? "دعم الطلاب ثنائيي الاستثناء"
              : "Supporting Twice-Exceptional Students"}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "مهمتنا هي مساعدة المعلمين والأسر في تحديد ورعاية الطلاب ثنائيي الاستثناء من خلال التقييم السلوكي الشامل والتخطيط التعليمي الفردي."
              : "Our mission is to help educators and families identify and nurture twice-exceptional students through comprehensive behavioral assessment and individualized educational planning."}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={`/${locale}/parent-form`}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {locale === "ar" ? "تقييم ولي الأمر" : "Parent Assessment"}
            </Link>
            <Link
              href={`/${locale}/teacher-form`}
              className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {locale === "ar" ? "تقييم المعلم" : "Teacher Assessment"}
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {locale === "ar" ? "مهمتنا" : "Our Mission"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {locale === "ar"
                  ? "نؤمن بأن كل طالب ثنائي الاستثناء يستحق أن يُعترف به ويُفهم ويُدعم. أدوات التقييم الشاملة لدينا تسد الفجوة بين الموهبة وتحديات التعلم."
                  : "We believe every twice-exceptional student deserves to be recognized, understood, and supported. Our comprehensive assessment tools bridge the gap between giftedness and learning challenges."}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {locale === "ar"
                  ? "من خلال توفير أدوات الفحص القائمة على الأدلة، نمكن المعلمين والأسر من اتخاذ قرارات مدروسة حول دعم الطلاب واستراتيجيات التدخل."
                  : "By providing evidence-based screening tools, we empower educators and families to make informed decisions about student support and intervention strategies."}
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌟</div>
                  <h3 className="text-2xl font-bold mb-4">
                    {locale === "ar" ? "رؤيتنا" : "Our Vision"}
                  </h3>
                  <p className="opacity-90">
                    {locale === "ar"
                      ? "عالم يتم فيه تحديد كل طالب ثنائي الاستثناء مبكراً ويحصل على الدعم الذي يحتاجه للازدهار."
                      : "A world where every twice-exceptional student is identified early and receives the support they need to thrive."}
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-80 animate-bounce delay-300"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-400 rounded-full opacity-60 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === "ar"
                ? "لماذا تختار TalentBridge؟"
                : "Why Choose TalentBridge?"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {locale === "ar"
                ? "أدوات شاملة مصممة من قبل خبراء للتحديد الدقيق والدعم."
                : "Comprehensive tools designed by experts for accurate identification and support."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {locale === "ar" ? "تحديد دقيق" : "Accurate Identification"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "استخدام أحدث المعايير العلمية لتحديد الطلاب ثنائيي الاستثناء"
                  : "Using latest scientific standards to identify 2e students"}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {locale === "ar" ? "تقارير شاملة" : "Comprehensive Reports"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "تقارير مفصلة تساعد المعلمين والأسر على فهم احتياجات الطالب"
                  : "Detailed reports helping teachers and families understand student needs"}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {locale === "ar" ? "خطط تدخل فردية" : "Individual Plans"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "خطط مصممة خصيصاً لكل طالب بناءً على نقاط القوة والتحديات"
                  : "Plans designed specifically for each student based on strengths and challenges"}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {locale === "ar" ? "دعم مستمر" : "Ongoing Support"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "متابعة مستمرة وتحديث للخطط التعليمية"
                  : "Continuous follow-up and updating of educational plans"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is 2e Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🧠✨</div>
                <h3 className="text-2xl font-bold mb-4">
                  {locale === "ar"
                    ? "التحديد المبكر مهم"
                    : "Early Identification Matters"}
                </h3>
                <p className="opacity-90">
                  {locale === "ar"
                    ? "تحديد الطلاب ثنائيي الاستثناء مبكراً يساعد في توفير الدعم المناسب لمواهبهم وتحدياتهم."
                    : "Identifying twice-exceptional students early helps provide appropriate support for both their gifts and challenges."}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {locale === "ar"
                  ? "ما هم الطلاب ثنائيي الاستثناء؟"
                  : "What are Twice-Exceptional Students?"}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {locale === "ar"
                  ? "الطلاب ثنائيي الاستثناء (2e) هم أفراد يظهرون قدرات استثنائية وتحديات تعلمية في آن واحد. قد يكونون موهوبين في مجالات معينة بينما يواجهون إعاقات مثل التوحد أو فرط الحركة أو اضطرابات التعلم."
                  : "Twice-exceptional (2e) students are individuals who demonstrate both exceptional abilities and learning challenges. They may be gifted in certain areas while having disabilities such as autism, ADHD, or learning disorders."}
              </p>

              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-gray-600">
                    <span className="text-xl">🧠</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-lg leading-relaxed">
                      {locale === "ar"
                        ? "قدرات فكرية متقدمة مع تحديات الانتباه"
                        : "High intellectual ability with attention challenges"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-gray-600">
                    <span className="text-xl">🎨</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-lg leading-relaxed">
                      {locale === "ar"
                        ? "مواهب إبداعية مع صعوبات اجتماعية"
                        : "Creative talents with social difficulties"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-gray-600">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-orange-600 dark:text-orange-400 font-medium text-lg leading-relaxed">
                      {locale === "ar"
                        ? "الموهبة مع سمات طيف التوحد"
                        : "Giftedness with autism spectrum traits"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === "ar" ? "الحقائق والأرقام" : "Facts & Statistics"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                2-5%
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "من الطلاب ثنائيي الاستثناء"
                  : "of students are twice-exceptional"}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                75%
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "غير مشخصين بشكل صحيح"
                  : "remain undiagnosed"}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {locale === "ar" ? "مبكر" : "Early"}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === "ar"
                  ? "التحديد يؤدي لنتائج أفضل"
                  : "identification leads to better outcomes"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            {locale === "ar" ? "مستعد للبدء؟" : "Ready to Get Started?"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {locale === "ar"
              ? "اتخذ الخطوة الأولى في دعم طالبك ثنائي الاستثناء اليوم."
              : "Take the first step in supporting your twice-exceptional student today."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/parent-form`}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              {locale === "ar"
                ? "ابدأ تقييم ولي الأمر"
                : "Start Parent Assessment"}
            </Link>
            <Link
              href={`/${locale}/teacher-form`}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {locale === "ar"
                ? "ابدأ تقييم المعلم"
                : "Start Teacher Assessment"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
