// General assessment questions (10 questions)
export const generalQuestions = [
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
export const disabilityCategories = [
  {
    id: "unified",
    ar: "البند السلوكي المرتبط بالتوحد والموهبة الشاملة",
    en: "Unified and Giftedness Related Behaviors",
  },
  {
    id: "Autism",
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
export const getDisabilityQuestions = (disabilityId: string) => {
  const questions = {
    unified: [
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
    "visual-impairment": [
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
