"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import Link from "next/link";

interface BasicInfo {
  studentName: string;
  gender: string;
  birthDate: string;
  examinerName: string;
  examDate: string;
  examinerTitle: string;
  schoolName: string;
  grade: string;
}

interface FormData {
  basicInfo: BasicInfo;
  generalAnswers: number[];
  selectedDisability?: string;
  disabilityAnswers: number[];
}

interface ApiResponse {
  result: number;
  evaluation: string;
  disability: string;
}

type FormStep =
  | "basic"
  | "general"
  | "disability-select"
  | "disability-form"
  | "results";

export default function TeacherForm() {
  const locale = useLocale();

  // Form state management
  const [currentStep, setCurrentStep] = useState<FormStep>("basic");
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      studentName: "",
      gender: "",
      birthDate: "",
      examinerName: "",
      examDate: "",
      examinerTitle: "",
      schoolName: "",
      grade: "",
    },
    generalAnswers: new Array(10).fill(-1),
    disabilityAnswers: new Array(10).fill(-1),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // General assessment questions (10 questions)
  const generalQuestions = [
    {
      ar: "يُظهر تباينًا ملحوظًا بين الأداء الأكاديمي والقدرات المعرفية",
      en: "Shows noticeable variation between academic performance and cognitive abilities",
    },
    {
      ar: "لديه اهتمامات متقدمة أو غير معتادة في مجالات محددة",
      en: "Has advanced or unusual interests in specific areas",
    },
    {
      ar: "يطرح أسئلة عميقة أو غير تقليدية تدل على تفكير نقدي",
      en: "Asks deep or unconventional questions showing critical thinking",
    },
    {
      ar: "يعاني من صعوبات في المهارات الأساسية رغم أدائه العالي في مهارات أخرى",
      en: "Struggles with basic skills despite high performance in other skills",
    },
    {
      ar: "يُظهر مشاعر الإحباط أو تدني احترام الذات بسبب الفجوة بين قدراته وأدائه",
      en: "Shows frustration or low self-esteem due to gap between abilities and performance",
    },
    {
      ar: "يعمل بشكل أفضل عند منحه وقتًا إضافيًا أو دعمًا مخصصًا",
      en: "Works better when given extra time or specialized support",
    },
    {
      ar: "يتفاعل بشكل إيجابي مع الأنشطة الإبداعية أو الاستكشافية",
      en: "Responds positively to creative or exploratory activities",
    },
    {
      ar: "يميل إلى العزلة أو الانسحاب في البيئات غير الداعمة",
      en: "Tends to isolate or withdraw in unsupportive environments",
    },
    {
      ar: "يعاني من صعوبة في تنظيم المهام أو تتبع التعليمات المتعددة",
      en: "Has difficulty organizing tasks or following multiple instructions",
    },
    {
      ar: "يظهر أداء غير متوازن بين التقييمات الشفهية والتحريرية",
      en: "Shows unbalanced performance between oral and written assessments",
    },
  ];

  // Disability categories
  const disabilityCategories = [
    {
      id: "autism",
      ar: "البند السلوكي المرتبط بالتوحد والموهبة",
      en: "Autism and Giftedness Related Behaviors",
    },
    {
      id: "learning-difficulties",
      ar: "البند السلوكي المرتبط بصعوبات التعلم والموهبة",
      en: "Learning Difficulties and Giftedness Related Behaviors",
    },
    {
      id: "hearing-impairment",
      ar: "البند السلوكي المرتبط بالإعاقة السمعية والموهبة",
      en: "Hearing Impairment and Giftedness Related Behaviors",
    },
    {
      id: "visual-impairment",
      ar: "البند السلوكي المرتبط بالإعاقة البصرية والموهبة",
      en: "Visual Impairment and Giftedness Related Behaviors",
    },
    {
      id: "intellectual-disability",
      ar: "البند السلوكي المرتبط بالإعاقة الفكرية والموهبة",
      en: "Intellectual Disability and Giftedness Related Behaviors",
    },
    {
      id: "adhd",
      ar: "البند السلوكي المرتبط بفرط الحركة وتشتت الانتباه والموهبة",
      en: "ADHD and Giftedness Related Behaviors",
    },
    {
      id: "borderline-intelligence",
      ar: "البند السلوكي المرتبط بالذكاء الحدي والموهبة",
      en: "Borderline Intelligence and Giftedness Related Behaviors",
    },
    {
      id: "multiple-disabilities",
      ar: "البند السلوكي المرتبط بالإعاقات المتعددة والموهبة",
      en: "Multiple Disabilities and Giftedness Related Behaviors",
    },
  ];

  // Disability-specific questions - All 8 categories with 10 questions each
  const getDisabilityQuestions = (disabilityId: string) => {
    const questions = {
      autism: [
        {
          ar: "يُظهر قدرات عالية في الحفظ أو التذكر التفصيلي لمعلومات محددة",
          en: "Shows high abilities in memorization or detailed recall of specific information",
        },
        {
          ar: "يميل إلى الانخراط العميق في موضوعات محددة دون اهتمام بالمواضيع الأخرى",
          en: "Tends to deeply engage in specific topics without interest in other subjects",
        },
        {
          ar: "يفضل الأنشطة الفردية على الجماعية، ويواجه صعوبة في التفاعل الاجتماعي",
          en: "Prefers individual over group activities, has difficulty with social interaction",
        },
        {
          ar: "يفكر بطريقة غير تقليدية، ويقترح حلولًا مبتكرة لمشكلات معقدة",
          en: "Thinks unconventionally and suggests innovative solutions to complex problems",
        },
        {
          ar: "يُظهر اهتمامًا شديدًا بالتفاصيل الدقيقة أو الأنماط المتكررة",
          en: "Shows intense interest in fine details or repetitive patterns",
        },
        {
          ar: "يعاني من صعوبة في تفسير الإشارات الاجتماعية أو التعبير عن مشاعره",
          en: "Has difficulty interpreting social cues or expressing emotions",
        },
        {
          ar: "يتضايق من التغييرات المفاجئة أو الخروج عن الروتين",
          en: "Gets upset by sudden changes or deviations from routine",
        },
        {
          ar: "يميل إلى التواصل غير اللفظي (مثل الرسم أو الكتابة) أكثر من الكلام المباشر",
          en: "Tends toward non-verbal communication (like drawing or writing) more than direct speech",
        },
        {
          ar: "يتفاعل بشكل غير متوقع في المواقف الاجتماعية، رغم نضجه العقلي",
          en: "Reacts unexpectedly in social situations despite mental maturity",
        },
        {
          ar: "يُظهر اهتمامًا مبكرًا بالقراءة أو المفاهيم المجردة",
          en: "Shows early interest in reading or abstract concepts",
        },
      ],
      "learning-difficulties": [
        {
          ar: "يُظهر فهمًا عاليًا للمفاهيم المجردة رغم ضعف الأداء في القراءة أو الإملاء",
          en: "Shows high understanding of abstract concepts despite weak reading or spelling performance",
        },
        {
          ar: "يمتلك مفردات غنية عند التحدث، لكنه يواجه صعوبات في التعبير الكتابي",
          en: "Has rich vocabulary when speaking but faces difficulties in written expression",
        },
        {
          ar: "يتفاعل بشكل مميز في النقاشات الشفهية لكنه يتجنب القراءة الجهرية",
          en: "Interacts distinctively in oral discussions but avoids reading aloud",
        },
        {
          ar: "يظهر أداء ممتازًا عند تنفيذ المهام الشفوية أو العملية مقارنة بالكتابية",
          en: "Shows excellent performance in oral or practical tasks compared to written ones",
        },
        {
          ar: "يعاني من صعوبة في تنظيم الأفكار أثناء الكتابة رغم وضوحها في المناقشة",
          en: "Has difficulty organizing thoughts during writing despite their clarity in discussion",
        },
        {
          ar: "يتضايق من المهام التي تتطلب كتابة طويلة، ويفضل العرض الشفهي أو المرئي",
          en: "Gets frustrated with tasks requiring lengthy writing, prefers oral or visual presentation",
        },
        {
          ar: "يخطئ في الإملاء رغم تكرار التدريب والممارسة",
          en: "Makes spelling errors despite repeated training and practice",
        },
        {
          ar: "يفهم التعليمات عند شرحها له شفهيًا، لكنه لا يتبع التعليمات المكتوبة بسهولة",
          en: "Understands instructions when explained orally but doesn't easily follow written instructions",
        },
        {
          ar: "يتمتع بقدرات تحليلية أو منطقية قوية، لكنه يعاني من بطء في إنجاز المهام الورقية",
          en: "Has strong analytical or logical abilities but struggles with slow completion of paper tasks",
        },
        {
          ar: "يشعر بالإحباط أو تدني الثقة بالنفس بسبب ضعف الأداء الأكاديمي رغم الموهبة",
          en: "Feels frustrated or has low self-confidence due to weak academic performance despite giftedness",
        },
      ],
      "hearing-impairment": [
        {
          ar: "يُظهر قدرات بصرية عالية في التعلم والفهم",
          en: "Shows high visual abilities in learning and understanding",
        },
        {
          ar: "يتفوق في المهام التي تعتمد على الملاحظة البصرية والتفاصيل",
          en: "Excels in tasks that rely on visual observation and details",
        },
        {
          ar: "يستخدم الإشارات أو الرسوم للتعبير عن أفكار معقدة بوضوح",
          en: "Uses gestures or drawings to express complex ideas clearly",
        },
        {
          ar: "يُظهر فهمًا عميقًا للمفاهيم المجردة عند عرضها بصريًا",
          en: "Shows deep understanding of abstract concepts when presented visually",
        },
        {
          ar: "يميل إلى التركيز الشديد على المهام البصرية لفترات طويلة",
          en: "Tends to focus intensely on visual tasks for long periods",
        },
        {
          ar: "يبدع في الأنشطة الفنية أو التصميمية أو التكنولوجية",
          en: "Excels in artistic, design, or technological activities",
        },
        {
          ar: "يتفاعل إيجابيًا مع التعلم التفاعلي والألعاب التعليمية البصرية",
          en: "Responds positively to interactive learning and visual educational games",
        },
        {
          ar: "يُظهر مهارات قوية في حل المشكلات عند استخدام الأدوات البصرية",
          en: "Shows strong problem-solving skills when using visual tools",
        },
        {
          ar: "يعبر عن الإحباط عندما تكون المعلومات غير مصحوبة بدعم بصري",
          en: "Expresses frustration when information is not accompanied by visual support",
        },
        {
          ar: "يتميز بذاكرة بصرية قوية ويتذكر التفاصيل البصرية بدقة",
          en: "Has strong visual memory and remembers visual details accurately",
        },
      ],
      "visual-impairment": [
        {
          ar: "يُظهر قدرات سمعية متقدمة في التعلم والاستيعاب",
          en: "Shows advanced auditory abilities in learning and comprehension",
        },
        {
          ar: "يتفوق في المهام اللفظية والحوارات المعقدة",
          en: "Excels in verbal tasks and complex dialogues",
        },
        {
          ar: "يمتلك مهارات استماع عالية ويلتقط التفاصيل الصوتية بدقة",
          en: "Has high listening skills and captures audio details accurately",
        },
        {
          ar: "يُظهر ذاكرة سمعية قوية ويحفظ المعلومات المنطوقة بسهولة",
          en: "Shows strong auditory memory and memorizes spoken information easily",
        },
        {
          ar: "يتميز في الأنشطة الموسيقية أو الأدبية أو اللغوية",
          en: "Excels in musical, literary, or linguistic activities",
        },
        {
          ar: "يعبر عن أفكاره بطلاقة ووضوح شفهيًا",
          en: "Expresses thoughts fluently and clearly orally",
        },
        {
          ar: "يستخدم حواسه الأخرى (اللمس والشم) بشكل إبداعي للتعلم",
          en: "Uses other senses (touch and smell) creatively for learning",
        },
        {
          ar: "يُظهر تركيزًا عاليًا في البيئات الهادئة المناسبة للاستماع",
          en: "Shows high concentration in quiet environments suitable for listening",
        },
        {
          ar: "يتفاعل إيجابيًا مع التقنيات المساعدة والمواد الصوتية",
          en: "Responds positively to assistive technologies and audio materials",
        },
        {
          ar: "يعاني من الإحباط عند عدم توفر المواد التعليمية بتنسيقات يمكن الوصول إليها",
          en: "Gets frustrated when educational materials are not available in accessible formats",
        },
      ],
      "intellectual-disability": [
        {
          ar: "يُظهر مهارات خاصة في مجالات محددة رغم التأخر العام في التطور",
          en: "Shows special skills in specific areas despite general developmental delay",
        },
        {
          ar: "يتعلم بطريقة أفضل عند استخدام طرق تدريس مبسطة ومتدرجة",
          en: "Learns better when using simplified and gradual teaching methods",
        },
        {
          ar: "يُظهر قدرة على الإبداع في المجالات العملية أو الفنية",
          en: "Shows ability for creativity in practical or artistic fields",
        },
        {
          ar: "يحتاج لوقت إضافي لمعالجة المعلومات ولكنه يصل لنتائج مدهشة أحيانًا",
          en: "Needs extra time to process information but sometimes reaches amazing results",
        },
        {
          ar: "يستجيب بشكل إيجابي للتعزيز والتشجيع المستمر",
          en: "Responds positively to continuous reinforcement and encouragement",
        },
        {
          ar: "يُظهر مثابرة عالية في المهام التي يجدها ممتعة أو ذات معنى",
          en: "Shows high persistence in tasks that are enjoyable or meaningful to them",
        },
        {
          ar: "يتفاعل جيدًا في البيئات التعليمية الداعمة وغير المهددة",
          en: "Interacts well in supportive and non-threatening educational environments",
        },
        {
          ar: "يُظهر تحسنًا ملحوظًا عند تلقي التدريب المخصص لاحتياجاته",
          en: "Shows noticeable improvement when receiving training tailored to their needs",
        },
        {
          ar: "يميل إلى التعلم من خلال التجربة المباشرة والأنشطة العملية",
          en: "Tends to learn through direct experience and hands-on activities",
        },
        {
          ar: "يعبر عن إحباطه عند مواجهة توقعات غير واقعية أو مهام معقدة جداً",
          en: "Expresses frustration when facing unrealistic expectations or overly complex tasks",
        },
      ],
      adhd: [
        {
          ar: "يُظهر طاقة عالية وحماسًا في المجالات التي يهتم بها",
          en: "Shows high energy and enthusiasm in areas of interest",
        },
        {
          ar: "يتفوق في المهام التي تتطلب تفكيرًا سريعًا وحلولًا إبداعية",
          en: "Excels in tasks requiring quick thinking and creative solutions",
        },
        {
          ar: "يُظهر قدرة على التركيز العميق عندما يكون الموضوع مثيرًا لاهتمامه",
          en: "Shows ability for deep focus when the subject is of interest to them",
        },
        {
          ar: "يميل إلى تعدد المهام ويمكنه إدارة عدة أنشطة في وقت واحد",
          en: "Tends to multitask and can manage several activities at once",
        },
        {
          ar: "يبدع في البيئات التعليمية النشطة والتفاعلية",
          en: "Excels in active and interactive learning environments",
        },
        {
          ar: "يُظهر مرونة في التفكير وقدرة على الانتقال بين الأفكار بسرعة",
          en: "Shows flexibility in thinking and ability to shift between ideas quickly",
        },
        {
          ar: "يتضايق من المهام الروتينية أو المتكررة ويفضل التحديات الجديدة",
          en: "Gets frustrated with routine or repetitive tasks and prefers new challenges",
        },
        {
          ar: "يحتاج إلى فترات راحة منتظمة أو تغيير في الأنشطة للحفاظ على التركيز",
          en: "Needs regular breaks or activity changes to maintain focus",
        },
        {
          ar: "يتفاعل إيجابيًا مع الأنشطة التي تشمل الحركة أو التطبيق العملي",
          en: "Responds positively to activities that include movement or practical application",
        },
        {
          ar: "يُظهر قدرة على التفكير خارج الصندوق وإيجاد حلول غير تقليدية",
          en: "Shows ability to think outside the box and find unconventional solutions",
        },
      ],
      "borderline-intelligence": [
        {
          ar: "يُظهر أداءً متقلبًا، قد يتفوق في بعض المهام ويواجه صعوبة في أخرى",
          en: "Shows fluctuating performance, may excel in some tasks while struggling in others",
        },
        {
          ar: "يتعلم بشكل أفضل عندما تُقدم المعلومات بطريقة ملموسة ومرئية",
          en: "Learns better when information is presented in concrete and visual ways",
        },
        {
          ar: "يُظهر مهارات عملية قوية في الأنشطة اليومية أو المهنية",
          en: "Shows strong practical skills in daily or vocational activities",
        },
        {
          ar: "يحتاج لوقت إضافي لمعالجة المعلومات المعقدة ولكنه قادر على الفهم",
          en: "Needs extra time to process complex information but is capable of understanding",
        },
        {
          ar: "يستفيد من التكرار والممارسة المنتظمة لإتقان المهارات",
          en: "Benefits from repetition and regular practice to master skills",
        },
        {
          ar: "يُظهر حماسًا وإبداعًا في الأنشطة التي تناسب قدراته",
          en: "Shows enthusiasm and creativity in activities that match their abilities",
        },
        {
          ar: "يتفاعل جيدًا مع التوجيه والدعم الفردي المخصص",
          en: "Responds well to individualized guidance and support",
        },
        {
          ar: "يميل إلى الأداء الأفضل في البيئات التعليمية الهادئة وغير المضغوطة",
          en: "Tends to perform better in calm and pressure-free educational environments",
        },
        {
          ar: "يُظهر قدرة على التعلم الاجتماعي والاستفادة من النماذج والقدوة",
          en: "Shows ability for social learning and benefiting from models and role models",
        },
        {
          ar: "يشعر بالإحباط عندما تكون التوقعات عالية جداً أو عندما يُقارن بأقرانه",
          en: "Feels frustrated when expectations are too high or when compared to peers",
        },
      ],
      "multiple-disabilities": [
        {
          ar: "يُظهر قدرات مميزة في مجال واحد أو أكثر رغم وجود إعاقات متعددة",
          en: "Shows distinctive abilities in one or more areas despite having multiple disabilities",
        },
        {
          ar: "يتكيف مع التقنيات المساعدة المتنوعة ويستفيد منها بطريقة إبداعية",
          en: "Adapts to various assistive technologies and uses them creatively",
        },
        {
          ar: "يستجيب بشكل إيجابي للتعلم متعدد الحواس والطرق المتنوعة",
          en: "Responds positively to multisensory learning and diverse methods",
        },
        {
          ar: "يُظهر عزيمة قوية ومثابرة في التغلب على التحديات اليومية",
          en: "Shows strong determination and persistence in overcoming daily challenges",
        },
        {
          ar: "يتفاعل بشكل مميز مع الأنشطة المصممة خصيصًا لاحتياجاته المتعددة",
          en: "Interacts distinctively with activities specifically designed for their multiple needs",
        },
        {
          ar: "يُظهر تحسنًا ملحوظًا عند تلقي خدمات شاملة ومتكاملة",
          en: "Shows noticeable improvement when receiving comprehensive and integrated services",
        },
        {
          ar: "يميل إلى التعبير عن ذاته بطرق غير تقليدية ولكنها فعالة",
          en: "Tends to express themselves in unconventional but effective ways",
        },
        {
          ar: "يحتاج إلى بيئة تعليمية عالية التخصص ومرونة في التوقعات",
          en: "Needs a highly specialized educational environment and flexibility in expectations",
        },
        {
          ar: "يستفيد من العمل مع فريق متعدد التخصصات لدعم تطوره الشامل",
          en: "Benefits from working with a multidisciplinary team to support comprehensive development",
        },
        {
          ar: "يُظهر تقدمًا بطيئًا ولكنه مستمر في المهارات التي يتم التركيز عليها",
          en: "Shows slow but consistent progress in skills that are focused upon",
        },
      ],
    };

    return questions[disabilityId as keyof typeof questions] || [];
  };

  // Form handlers
  const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value,
      },
    }));
  };

  const handleGeneralAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...formData.generalAnswers];
    newAnswers[questionIndex] = value;
    setFormData((prev) => ({ ...prev, generalAnswers: newAnswers }));
  };

  const handleDisabilityAnswerChange = (
    questionIndex: number,
    value: number
  ) => {
    const newAnswers = [...formData.disabilityAnswers];
    newAnswers[questionIndex] = value;
    setFormData((prev) => ({ ...prev, disabilityAnswers: newAnswers }));
  };

  const validateBasicInfo = () => {
    const { basicInfo } = formData;
    return Object.values(basicInfo).every((value) => value.trim() !== "");
  };

  const validateGeneralAnswers = () => {
    return !formData.generalAnswers.some((answer) => answer === -1);
  };

  const validateDisabilityAnswers = () => {
    return !formData.disabilityAnswers.some((answer) => answer === -1);
  };

  const nextStep = () => {
    switch (currentStep) {
      case "basic":
        if (validateBasicInfo()) {
          setCurrentStep("general");
          setError(null);
        } else {
          setError(
            locale === "ar"
              ? "يرجى ملء جميع الحقول المطلوبة"
              : "Please fill all required fields"
          );
        }
        break;
      case "general":
        if (validateGeneralAnswers()) {
          setCurrentStep("disability-select");
          setError(null);
        } else {
          setError(
            locale === "ar"
              ? "يرجى الإجابة على جميع الأسئلة"
              : "Please answer all questions"
          );
        }
        break;
      case "disability-select":
        if (formData.selectedDisability) {
          setCurrentStep("disability-form");
          setError(null);
        } else {
          setError(
            locale === "ar"
              ? "يرجى اختيار فئة الإعاقة"
              : "Please select a disability category"
          );
        }
        break;
      case "disability-form":
        if (validateDisabilityAnswers()) {
          handleSubmit();
        } else {
          setError(
            locale === "ar"
              ? "يرجى الإجابة على جميع الأسئلة"
              : "Please answer all questions"
          );
        }
        break;
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case "general":
        setCurrentStep("basic");
        break;
      case "disability-select":
        setCurrentStep("general");
        break;
      case "disability-form":
        setCurrentStep("disability-select");
        break;
    }
    setError(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const generalScore = formData.generalAnswers.reduce(
        (sum, answer) => sum + (answer === -1 ? 0 : answer),
        0
      );
      const disabilityScore = formData.disabilityAnswers.reduce(
        (sum, answer) => sum + (answer === -1 ? 0 : answer),
        0
      );
      const totalScore = generalScore + disabilityScore;

      let evaluation = "";
      let disability = "";

      if (totalScore <= 10) {
        evaluation = "Low indicators of twice-exceptional characteristics";
        disability = "No significant concerns identified";
      } else if (totalScore <= 30) {
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

      setResult({
        result: totalScore,
        evaluation: evaluation,
        disability: disability,
      });
      setCurrentStep("results");
    } catch (error) {
      console.error("Detailed error:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectDisability = (disabilityId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedDisability: disabilityId,
      disabilityAnswers: new Array(10).fill(-1),
    }));
  };

  // Render different steps
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {locale === "ar" ? "بيانات أولية" : "Basic Information"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "اسم الطالب" : "Student Name"} *
          </label>
          <input
            type="text"
            value={formData.basicInfo.studentName}
            onChange={(e) =>
              handleBasicInfoChange("studentName", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>

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
                checked={formData.basicInfo.gender === "male"}
                onChange={(e) =>
                  handleBasicInfoChange("gender", e.target.value)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
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
                checked={formData.basicInfo.gender === "female"}
                onChange={(e) =>
                  handleBasicInfoChange("gender", e.target.value)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {locale === "ar" ? "أنثى" : "Female"}
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "تاريخ الميلاد" : "Birth Date"} *
          </label>
          <input
            type="date"
            value={formData.basicInfo.birthDate}
            onChange={(e) => handleBasicInfoChange("birthDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "اسم الفاحص" : "Examiner Name"} *
          </label>
          <input
            type="text"
            value={formData.basicInfo.examinerName}
            onChange={(e) =>
              handleBasicInfoChange("examinerName", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar"
              ? "تاريخ الفحص/ الملاحظة"
              : "Exam/Observation Date"}{" "}
            *
          </label>
          <input
            type="date"
            value={formData.basicInfo.examDate}
            onChange={(e) => handleBasicInfoChange("examDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "صفة الفاحص" : "Examiner Title"} *
          </label>
          <input
            type="text"
            value={formData.basicInfo.examinerTitle}
            onChange={(e) =>
              handleBasicInfoChange("examinerTitle", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "اسم المدرسة" : "School Name"} *
          </label>
          <input
            type="text"
            value={formData.basicInfo.schoolName}
            onChange={(e) =>
              handleBasicInfoChange("schoolName", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {locale === "ar" ? "الصف الدراسي للطالب" : "Student's Grade Level"}{" "}
            *
          </label>
          <input
            type="text"
            value={formData.basicInfo.grade}
            onChange={(e) => handleBasicInfoChange("grade", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderGeneralAssessmentStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {locale === "ar"
            ? "الخصائص السلوكية لمزدوجي الاستثنائية"
            : "Behavioral Characteristics for Twice-Exceptional Students"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {locale === "ar" ? "البند السلوكي العام" : "General Behavioral Items"}
        </p>
      </div>

      <div className="space-y-6">
        {generalQuestions.map((question, index) => (
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
                        name={`general-question-${index}`}
                        value={value}
                        checked={formData.generalAnswers[index] === value}
                        onChange={() => handleGeneralAnswerChange(index, value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {value === 0 &&
                          (locale === "ar" ? "لا تنطبق" : "Never")}
                        {value === 1 &&
                          (locale === "ar" ? "أحياناً" : "Sometimes")}
                        {value === 2 && (locale === "ar" ? "دائماً" : "Always")}
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
  );

  const renderDisabilitySelectionStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {locale === "ar"
            ? "اختر فئة الإعاقة للتقييم"
            : "Select Disability Category for Assessment"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {locale === "ar"
            ? "اختر الفئة الأنسب بناءً على ملاحظاتك للطالب"
            : "Choose the most appropriate category based on your observations of the student"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disabilityCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => selectDisability(category.id)}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              formData.selectedDisability === category.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300"
            }`}
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {locale === "ar" ? category.ar : category.en}
            </h3>
            <div className="flex justify-center">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  formData.selectedDisability === category.id
                    ? "border-blue-500 bg-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {formData.selectedDisability === category.id && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDisabilityFormStep = () => {
    const questions = getDisabilityQuestions(formData.selectedDisability!);
    const selectedCategory = disabilityCategories.find(
      (cat) => cat.id === formData.selectedDisability
    );

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === "ar" ? selectedCategory?.ar : selectedCategory?.en}
          </h2>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
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
                          name={`disability-question-${index}`}
                          value={value}
                          checked={formData.disabilityAnswers[index] === value}
                          onChange={() =>
                            handleDisabilityAnswerChange(index, value)
                          }
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {value === 0 &&
                            (locale === "ar" ? "لا ينطبق" : "Never")}
                          {value === 1 &&
                            (locale === "ar" ? "أحياناً" : "Sometimes")}
                          {value === 2 &&
                            (locale === "ar" ? "كثيراً" : "Often")}
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
    );
  };

  const renderResultsStep = () => (
    <div className="text-center space-y-8">
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
        {locale === "ar"
          ? "تم إرسال التقييم بنجاح"
          : "Assessment Completed Successfully"}
      </h1>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          {locale === "ar" ? "نتيجة التقييم" : "Assessment Results"}
        </h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {result?.result}/40
        </p>
        <p className="text-blue-800 dark:text-blue-200">{result?.evaluation}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link
          href={`/${locale}`}
          className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
        >
          {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
        </Link>
        <Link
          href={`/${locale}/parent-form`}
          className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {locale === "ar" ? "استمارة ولي الأمر" : "Parent Form"}
        </Link>
      </div>
    </div>
  );

  if (currentStep === "results") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            {renderResultsStep()}
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

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {["basic", "general", "disability-select", "disability-form"].map(
              (step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep === step
                        ? "bg-blue-600 text-white"
                        : [
                            "basic",
                            "general",
                            "disability-select",
                            "disability-form",
                          ].indexOf(currentStep) > index
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-24 h-1 mx-2 ${
                        [
                          "basic",
                          "general",
                          "disability-select",
                          "disability-form",
                        ].indexOf(currentStep) > index
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            {locale === "ar" ? "تقييم المعلم" : "Teacher Assessment"}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {locale === "ar"
              ? "استمارة تقييم المعلم للطلاب ثنائيي الاستثناء"
              : "Teacher Assessment Form for Twice-Exceptional Students"}
          </h1>
        </div>

        {/* Form Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {currentStep === "basic" && renderBasicInfoStep()}
          {currentStep === "general" && renderGeneralAssessmentStep()}
          {currentStep === "disability-select" &&
            renderDisabilitySelectionStep()}
          {currentStep === "disability-form" && renderDisabilityFormStep()}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === "basic"}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                currentStep === "basic"
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {locale === "ar" ? "السابق" : "Previous"}
            </button>

            <button
              onClick={nextStep}
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isSubmitting ? "animate-pulse" : ""
              }`}
            >
              {isSubmitting
                ? locale === "ar"
                  ? "جارٍ الإرسال..."
                  : "Submitting..."
                : currentStep === "disability-form"
                ? locale === "ar"
                  ? "إرسال التقييم"
                  : "Submit Assessment"
                : locale === "ar"
                ? "التالي"
                : "Next"}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-4 mt-8">
          <Link
            href={`/${locale}`}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <Link
            href={`/${locale}/parent-form`}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            {locale === "ar" ? "استمارة ولي الأمر" : "Parent Form"}
          </Link>
        </div>
      </div>
    </div>
  );
}
