import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const INSTITUTIONS = [
  {
    id: "ku", name: "جامعة الكويت", short: "KU", type: "gov", icon: "🎓",
    url: "https://www.ku.edu.kw", phone: "25360000",
    desc: "أول جامعة بحثية حكومية في الكويت، تأسست 1966",
    colleges: [
      { name: "كلية الطب", degree: "bsc", stream: "sci", url: "https://med.ku.edu.kw", conditions: { minScore: 97, english: "IELTS 5.5 أو TOEFL iBT 60" }, majors: ["بكالوريوس العلوم الطبية", "دكتور طبيب"] },
      { name: "كلية طب الأسنان", degree: "bsc", stream: "sci", url: "https://dentistry.ku.edu.kw", conditions: { minScore: 95, english: "IELTS 5.0 أو TOEFL iBT 55" }, majors: ["بكالوريوس العلوم الطبية الأساسية", "دكتور في طب الأسنان"] },
      { name: "كلية الصيدلة", degree: "bsc", stream: "sci", url: "https://pharm.ku.edu.kw", conditions: { minScore: 93, english: "IELTS 5.0 أو TOEFL iBT 55" }, majors: ["دكتور في الصيدلة"] },
      { name: "كلية الهندسة والبترول", degree: "bsc", stream: "sci", url: "https://eng.ku.edu.kw", conditions: { minScore: 85, english: "IELTS 4.5 أو TOEFL iBT 45" }, majors: ["الهندسة الكيميائية", "الهندسة المدنية", "هندسة البترول", "هندسة الكمبيوتر", "الهندسة الكهربائية", "هندسة صناعية ونظم إدارية"] },
      { name: "كلية العلوم", degree: "bsc", stream: "sci", url: "https://sci.ku.edu.kw", conditions: { minScore: 75, english: "IELTS 4.0 أو TOEFL iBT 40" }, majors: ["الفيزياء", "الكيمياء", "الرياضيات", "الإحصاء وبحوث العمليات", "علم الحاسوب", "الجيولوجيا", "علوم البحار", "علوم البيئة", "بيولوجيا الحيوان", "بيولوجيا النبات", "الكيمياء الحيوية", "الميكروبيولوجيا", "الرياضيات المالية", "الأدلة الجنائية"] },
      { name: "كلية العلوم الطبية المساعدة", degree: "bsc", stream: "sci", url: "https://ahss.ku.edu.kw", conditions: { minScore: 80, english: "IELTS 4.5 أو TOEFL iBT 45" }, majors: ["تكنولوجيا الأشعة التشخيصية", "تكنولوجيا الطب النووي", "العلاج الطبيعي", "العلاج المهني", "المعلوماتية الصحية", "علوم الأشعة"] },
      { name: "كلية العلوم الإدارية", degree: "bsc", stream: "both", url: "https://bsa.ku.edu.kw", conditions: { minScore: 70, english: "IELTS 4.0 أو TOEFL iBT 40" }, majors: ["المحاسبة", "التمويل والمنشآت المالية", "إدارة الأعمال", "التسويق", "الاقتصاد", "نظم المعلومات", "إدارة العمليات وسلسلة الإمداد", "الإدارة العامة"] },
      { name: "كلية الآداب", degree: "bsc", stream: "both", url: "https://arts.ku.edu.kw", conditions: { minScore: 65, english: null }, majors: ["اللغة العربية", "اللغة الإنجليزية", "اللغة الفرنسية وثقافاتها", "التاريخ", "الفلسفة", "الأدب المقارن", "الإعلام", "الآثار"] },
      { name: "كلية التربية", degree: "bsc", stream: "both", url: "https://education.ku.edu.kw", conditions: { minScore: 65, english: null }, majors: ["رياض الأطفال", "اللغة العربية - ابتدائي", "اللغة الإنجليزية - ابتدائي", "اللغة العربية - متوسط/ثانوي", "اللغة الإنجليزية - متوسط/ثانوي", "الرياضيات - متوسط/ثانوي", "العلوم - متوسط/ثانوي", "الفيزياء - متوسط/ثانوي", "الكيمياء - متوسط/ثانوي", "الإدارة والتخطيط التربوي", "علم النفس التربوي"] },
      { name: "كلية الحقوق", degree: "bsc", stream: "both", url: "https://law.ku.edu.kw", conditions: { minScore: 70, english: null }, majors: ["القانون الخاص", "القانون العام"] },
      { name: "كلية الشريعة والدراسات الإسلامية", degree: "bsc", stream: "both", url: "https://sharia.ku.edu.kw", conditions: { minScore: 65, english: null }, majors: ["الشريعة الإسلامية", "أصول الدين"] },
      { name: "كلية العلوم الاجتماعية", degree: "bsc", stream: "both", url: "https://socialsciences.ku.edu.kw", conditions: { minScore: 65, english: null }, majors: ["علم النفس", "علم الاجتماع", "الخدمة الاجتماعية", "الجغرافيا", "العلوم السياسية"] },
      { name: "كلية الصحة العامة", degree: "bsc", stream: "sci", url: "https://publichealth.ku.edu.kw", conditions: { minScore: 75, english: "IELTS 4.5 أو TOEFL iBT 45" }, majors: ["ممارسة الصحة العامة", "تنمية صحة المجتمع"] },
      { name: "كلية العمارة", degree: "bsc", stream: "both", url: "https://arch.ku.edu.kw", conditions: { minScore: 75, english: null, note: "يُشترط اجتياز اختبار الرسم" }, majors: ["العمارة", "العمارة الداخلية", "التصميم المرئي"] },
      { name: "كلية العلوم الحياتية", degree: "bsc", stream: "sci", url: "https://ls.ku.edu.kw", conditions: { minScore: 80, english: "IELTS 4.5 أو TOEFL iBT 45" }, majors: ["علم الوراثة", "التكنولوجيا الحيوية"] },
    ]
  },
  {
    id: "paaet", name: "الهيئة العامة للتعليم التطبيقي", short: "PAAET", type: "gov", icon: "🔧",
    url: "https://www.paaet.edu.kw", phone: "24811860",
    desc: "الجهة الحكومية للتعليم التطبيقي والتدريب المهني",
    colleges: [
      { name: "كلية التربية الأساسية", degree: "bsc", stream: "both", url: "https://www.paaet.edu.kw/boe", conditions: { minScore: 60, english: null }, majors: ["تكنولوجيا التعليم", "دراسات إسلامية", "اللغة الإنجليزية", "اللغة الفرنسية", "التربية الموسيقية", "التربية الفنية", "علوم المكتبات والمعلومات", "الرياضيات", "العلوم", "الكهرباء", "معلم حاسوب", "تربية خاصة - علوم", "تربية خاصة - رياضيات"] },
      { name: "كلية الدراسات التجارية", degree: "dip", stream: "both", url: "https://www.paaet.edu.kw/bcs", conditions: { minScore: 55, english: null }, majors: ["المحاسبة", "التأمين", "البنوك", "القانون", "الإدارة المالية", "التسويق", "نظم المعلومات الإدارية", "الإدارة اللوجستية", "إدارة الموارد البشرية", "الحاسب الآلي"] },
      { name: "كلية الدراسات التكنولوجية", degree: "bsc", stream: "sci", url: "https://www.paaet.edu.kw/cst", conditions: { minScore: 65, english: null }, majors: ["هندسة الحاسب", "هندسة الإلكترونيات والاتصالات", "هندسة الميكانيك", "هندسة الكيمياء", "هندسة الكهرباء", "تقنية المعلومات"] },
      { name: "كلية العلوم الصحية", degree: "bsc", stream: "sci", url: "https://www.paaet.edu.kw/hsc", conditions: { minScore: 70, english: null }, majors: ["العلاج الطبيعي", "تقنية المختبرات الطبية", "تقنية الأشعة", "البصريات والعدسات", "تقنية القلب والأوعية", "الأجهزة الطبية"] },
      { name: "كلية التمريض", degree: "bsc", stream: "sci", url: "https://www.paaet.edu.kw/nursing", conditions: { minScore: 70, english: null }, majors: ["التمريض"] },
      { name: "المعهد العالي للاتصالات والملاحة", degree: "dip", stream: "sci", url: "https://www.paaet.edu.kw/hican", conditions: { minScore: 70, english: null }, majors: ["الملاحة الجوية", "اتصالات الطيران", "الإلكترونيات", "تقنية المعلومات"] },
      { name: "المعهد العالي للطاقة", degree: "dip", stream: "sci", url: "https://www.paaet.edu.kw/hie", conditions: { minScore: 65, english: null }, majors: ["هندسة الطاقة الكهربائية", "هندسة الطاقة الميكانيكية", "تكنولوجيا البترول"] },
      { name: "المعهد العالي للخدمات الإدارية", degree: "dip", stream: "both", url: "https://www.paaet.edu.kw/hias", conditions: { minScore: 55, english: null }, majors: ["الإدارة والأعمال", "السكرتارية والحاسب", "المحاسبة"] },
      { name: "معهد التدريب المهني", degree: "dip", stream: "both", url: "https://www.paaet.edu.kw/vti", conditions: { minScore: 50, english: null, note: "الأولوية للدرجات العملية والتقنية" }, majors: ["السيارات", "الكهرباء والإلكترونيات", "الميكانيك الصناعي", "التبريد والتكييف", "تقنية المعلومات"] },
    ]
  },
  {
    id: "auk", name: "الجامعة الأمريكية في الكويت", short: "AUK", type: "pri", icon: "🏛️",
    url: "http://www.auk.edu.kw", phone: "1802040",
    desc: "جامعة خاصة تعتمد المنهج الأمريكي في التعليم العالي",
    colleges: [
      { name: "كلية الفنون والعلوم الإنسانية", degree: "bsc", stream: "both", url: "http://www.auk.edu.kw/cas", conditions: { minScore: 65, english: "IELTS 5.5 أو TOEFL iBT 71" }, majors: ["العلوم السياسية", "علم النفس", "اللغة الإنجليزية وآدابها", "التصميم الجرافيكي", "دراسات الاتصال والإعلام"] },
      { name: "كلية الأعمال والاقتصاد", degree: "bsc", stream: "both", url: "http://www.auk.edu.kw/cbe", conditions: { minScore: 65, english: "IELTS 5.5 أو TOEFL iBT 71" }, majors: ["إدارة الأعمال", "المحاسبة", "التمويل", "الاقتصاد", "التسويق"] },
      { name: "كلية الهندسة", degree: "bsc", stream: "sci", url: "http://www.auk.edu.kw/coe", conditions: { minScore: 70, english: "IELTS 5.5 أو TOEFL iBT 71" }, majors: ["الهندسة الكيميائية", "الهندسة الكهربائية", "الهندسة الميكانيكية", "هندسة الحاسب"] },
    ]
  },
  {
    id: "gust", name: "جامعة الخليج للعلوم والتكنولوجيا", short: "GUST", type: "pri", icon: "🔬",
    url: "http://www.gust.edu.kw", phone: "25307000",
    desc: "جامعة خاصة بالشراكة مع جامعة ميسوري الأمريكية",
    colleges: [
      { name: "كلية الأعمال والإدارة", degree: "bsc", stream: "both", url: "http://www.gust.edu.kw/coba", conditions: { minScore: 60, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["إدارة الأعمال", "المحاسبة", "التمويل", "التسويق", "ريادة الأعمال"] },
      { name: "كلية الفنون والعلوم", degree: "bsc", stream: "both", url: "http://www.gust.edu.kw/cas", conditions: { minScore: 60, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["الرياضيات والإحصاء", "علم النفس", "علوم الحاسب", "اللغة الإنجليزية وآدابها"] },
      { name: "كلية نظم المعلومات", degree: "bsc", stream: "sci", url: "http://www.gust.edu.kw/cis", conditions: { minScore: 65, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["نظم المعلومات الإدارية", "هندسة البرمجيات", "أمن المعلومات"] },
    ]
  },
  {
    id: "aum", name: "جامعة الشرق الأوسط الأمريكية", short: "AUM", type: "pri", icon: "🌍",
    url: "http://www.aum.edu.kw", phone: "22251400",
    desc: "جامعة خاصة تعتمد المنهج الأمريكي بكليات متعددة",
    colleges: [
      { name: "كلية الهندسة والتكنولوجيا", degree: "bsc", stream: "sci", url: "http://www.aum.edu.kw/engineering", conditions: { minScore: 65, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["الهندسة الكيميائية", "الهندسة المدنية", "الهندسة الكهربائية", "الهندسة الميكانيكية", "هندسة الحاسب", "هندسة البترول"] },
      { name: "كلية الأعمال والإدارة", degree: "bsc", stream: "both", url: "http://www.aum.edu.kw/business", conditions: { minScore: 60, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["إدارة الأعمال", "المحاسبة والتدقيق", "التسويق", "الإدارة المالية", "ريادة الأعمال والابتكار"] },
      { name: "كلية تقنية المعلومات", degree: "bsc", stream: "sci", url: "http://www.aum.edu.kw/it", conditions: { minScore: 65, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["تقنية المعلومات", "الأمن السيبراني", "علوم البيانات"] },
    ]
  },
  {
    id: "kilaw", name: "كلية القانون الكويتية العالمية", short: "KILAW", type: "pri", icon: "⚖️",
    url: "http://www.kilaw.edu.kw", phone: "22280157",
    desc: "كلية متخصصة في تعليم القانون على المستوى المحلي والدولي",
    colleges: [
      { name: "أقسام القانون", degree: "bsc", stream: "both", url: "http://www.kilaw.edu.kw/programs", conditions: { minScore: 65, english: null }, majors: ["القانون الخاص", "القانون العام", "القانون الدولي", "الشريعة والقانون"] },
    ]
  },
  {
    id: "ack", name: "الكلية الاسترالية في الكويت", short: "ACK", type: "pri", icon: "🦘",
    url: "http://www.ack.edu.kw", phone: "25376111",
    desc: "كلية خاصة تعتمد المناهج الاسترالية في التعليم التطبيقي",
    colleges: [
      { name: "كلية الهندسة والتكنولوجيا", degree: "bsc", stream: "sci", url: "http://www.ack.edu.kw/engineering", conditions: { minScore: 60, english: "IELTS 5.0 أو TOEFL iBT 61" }, majors: ["الهندسة الميكانيكية", "الهندسة الكهربائية", "الهندسة المدنية", "هندسة الحاسب وتقنية المعلومات"] },
      { name: "كلية إدارة الأعمال", degree: "bsc", stream: "both", url: "http://www.ack.edu.kw/business", conditions: { minScore: 55, english: "IELTS 4.5 أو TOEFL iBT 45" }, majors: ["إدارة الأعمال", "المحاسبة"] },
    ]
  },
  {
    id: "kcst", name: "كلية الكويت للعلوم والتكنولوجيا", short: "KCST", type: "pri", icon: "💡",
    url: "http://www.kcst.edu.kw", phone: "1810010",
    desc: "كلية تطبيقية متخصصة في العلوم والتكنولوجيا والهندسة",
    colleges: [
      { name: "الأقسام التكنولوجية", degree: "bsc", stream: "sci", url: "http://www.kcst.edu.kw/programs", conditions: { minScore: 60, english: null }, majors: ["هندسة الحاسب", "هندسة الاتصالات", "الإلكترونيات", "إدارة الأعمال"] },
    ]
  },
];

const DATES = [
  { id: 1, title: "الاختبار الوطني", subtitle: "القدرات الأكاديمية - جامعة الكويت", date: "15 يوليو 2025", urgency: "high", icon: "📝", reg: "التسجيل: حتى 30 يونيو" },
  { id: 2, title: "اختبار اللغة الإنجليزية", subtitle: "جامعة الكويت", date: "22 يوليو 2025", urgency: "med", icon: "🗣️", reg: "حجز الموعد عبر الموقع" },
  { id: 3, title: "تقديم جامعة الكويت", subtitle: "بوابة القبول الإلكتروني", date: "1 أغسطس 2025", urgency: "low", icon: "🎓", reg: "do.ku.edu.kw" },
  { id: 4, title: "تقديم الهيئة التطبيقية", subtitle: "PAAET - كليات ومعاهد", date: "10 أغسطس 2025", urgency: "low", icon: "🔧", reg: "e.paaet.edu.kw" },
  { id: 5, title: "بعثات التعليم العالي", subtitle: "وزارة التعليم العالي - تقديم أولي", date: "15 سبتمبر 2025", urgency: "low", icon: "✈️", reg: "mohe.edu.kw" },
  { id: 6, title: "تقديم الجامعات الخاصة", subtitle: "AUK / GUST / AUM وغيرها", date: "مستمر", urgency: "info", icon: "🏛️", reg: "مواقع الجامعات مباشرة" },
];

const SCHOLARSHIPS = [
  { id: 1, country: "🇬🇧", name: "المملكة المتحدة", unis: "أكسفورد، كامبريدج، UCL وغيرها", status: "open", deadline: "30 يوليو 2025", fields: ["الطب", "الهندسة", "الأعمال", "القانون"] },
  { id: 2, country: "🇺🇸", name: "الولايات المتحدة", unis: "MIT، Harvard، Stanford وغيرها", status: "open", deadline: "15 أغسطس 2025", fields: ["الهندسة", "علوم الحاسب", "الأعمال", "العلوم"] },
  { id: 3, country: "🇦🇺", name: "أستراليا", unis: "جامعة ملبورن، ANU وغيرها", status: "open", deadline: "1 سبتمبر 2025", fields: ["الطب", "البيئة", "الهندسة"] },
  { id: 4, country: "🇩🇪", name: "ألمانيا", unis: "TU Munich، Heidelberg وغيرها", status: "study", deadline: "2026/2025", fields: ["الهندسة", "الفيزياء", "الكيمياء"] },
  { id: 5, country: "🇫🇷", name: "فرنسا", unis: "Sorbonne، Polytechnique وغيرها", status: "study", deadline: "2026/2025", fields: ["الآداب", "الهندسة", "الأعمال"] },
  { id: 6, country: "🇨🇦", name: "كندا", unis: "UBC، Toronto، McGill وغيرها", status: "upcoming", deadline: "أكتوبر 2025", fields: ["الطب", "الهندسة", "الأعمال"] },
];

const APTITUDE_QUESTIONS = [
  { id: 1, text: "أستمتع بحل المسائل الرياضية والمنطقية", cat: "sci" },
  { id: 2, text: "أحب القراءة والكتابة والتعبير عن أفكاري", cat: "arts" },
  { id: 3, text: "أجد نفسي مرتاحاً في المختبرات والتجارب العلمية", cat: "sci" },
  { id: 4, text: "أهتم بأحوال المجتمع وقضاياه", cat: "social" },
  { id: 5, text: "أميل للعمل مع الأرقام والبيانات المالية", cat: "biz" },
  { id: 6, text: "أحلم ببناء أشياء أو تصميم هياكل", cat: "eng" },
  { id: 7, text: "أستمتع برعاية الناس ومساعدتهم في صحتهم", cat: "med" },
  { id: 8, text: "أهتم بالقانون والحقوق والعدالة", cat: "law" },
  { id: 9, text: "أجيد التواصل والإقناع والتفاوض", cat: "biz" },
  { id: 10, text: "أحب البرمجة والتقنية والحاسوب", cat: "tech" },
  { id: 11, text: "أستمتع برسم الأشياء وتصميم الفضاءات", cat: "arts" },
  { id: 12, text: "أعتقد أن التدريس والتربية مهنة نبيلة", cat: "social" },
  { id: 13, text: "أميل للبحث العلمي والاكتشاف", cat: "sci" },
  { id: 14, text: "أهتم بسوق الأعمال وإنشاء المشاريع", cat: "biz" },
  { id: 15, text: "أجد الهندسة والتصنيع مجالاً مثيراً", cat: "eng" },
  { id: 16, text: "أستمتع بدراسة التاريخ والثقافات المختلفة", cat: "arts" },
  { id: 17, text: "أميل للعمل في المستشفيات والبيئة الطبية", cat: "med" },
  { id: 18, text: "أحب حل المشكلات التقنية في الأجهزة والأنظمة", cat: "tech" },
  { id: 19, text: "أهتم بالبيئة والموارد الطبيعية", cat: "sci" },
  { id: 20, text: "أجد نفسي قائداً في المجموعات", cat: "biz" },
];

const APTITUDE_RESULTS = {
  sci:    { title: "العلوم البحتة والطبيعية", emoji: "🔬", desc: "ميولك تتجه نحو العلوم والبحث العلمي. مجالات الفيزياء والكيمياء وعلوم الأحياء والرياضيات تناسبك.", recs: ["كلية العلوم - جامعة الكويت", "كلية العلوم الحياتية - جامعة الكويت", "كلية الدراسات التكنولوجية - PAAET"] },
  med:    { title: "الطب والعلوم الصحية", emoji: "🏥", desc: "لديك ميل قوي لمجالات الطب ورعاية المرضى والعلوم الصحية. هذا المجال يحتاج تضحية وصبراً.", recs: ["كلية الطب - جامعة الكويت", "كلية طب الأسنان - جامعة الكويت", "كلية الصيدلة - جامعة الكويت", "كلية العلوم الصحية - PAAET"] },
  eng:    { title: "الهندسة والتصميم", emoji: "⚙️", desc: "تميل نحو الهندسة والتصميم وبناء الأنظمة. المشاريع العملية والتقنية هي بيئتك المثالية.", recs: ["كلية الهندسة والبترول - جامعة الكويت", "كلية الهندسة - AUK", "كلية الهندسة والتكنولوجيا - AUM", "كلية الدراسات التكنولوجية - PAAET"] },
  tech:   { title: "تقنية المعلومات والبرمجة", emoji: "💻", desc: "ميولك واضحة نحو عالم التقنية والبرمجة وحل المشكلات الرقمية. مستقبل واعد ينتظرك.", recs: ["علم الحاسوب - كلية العلوم KU", "كلية نظم المعلومات - GUST", "كلية تقنية المعلومات - AUM", "كلية الدراسات التكنولوجية - PAAET"] },
  biz:    { title: "الأعمال والإدارة", emoji: "📊", desc: "لديك حس تجاري وقيادي. مجالات الإدارة والتمويل والتسويق وريادة الأعمال مناسبة لك.", recs: ["كلية العلوم الإدارية - جامعة الكويت", "كلية الأعمال - AUK", "كلية الأعمال - GUST", "كلية الدراسات التجارية - PAAET"] },
  law:    { title: "القانون والعدالة", emoji: "⚖️", desc: "ميولك نحو العدالة والقانون والحقوق. مجال يحتاج دقة في التفكير وقوة في الحجة.", recs: ["كلية الحقوق - جامعة الكويت", "كلية الشريعة والدراسات الإسلامية - KU", "KILAW - كلية القانون الكويتية العالمية"] },
  arts:   { title: "الآداب والفنون والإعلام", emoji: "🎨", desc: "تميل نحو التعبير الإبداعي والثقافة واللغات والتصميم. مجال يجمع الجمال بالمعنى.", recs: ["كلية الآداب - جامعة الكويت", "كلية العمارة - جامعة الكويت", "كلية الفنون والعلوم الإنسانية - AUK"] },
  social: { title: "العلوم الاجتماعية والتربية", emoji: "🤝", desc: "اهتمامك الكبير بالناس والمجتمع يجعلك مناسباً لمجالات التربية والخدمة الاجتماعية وعلم النفس.", recs: ["كلية العلوم الاجتماعية - جامعة الكويت", "كلية التربية - جامعة الكويت", "كلية التربية الأساسية - PAAET"] },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const COLORS = {
  navy: "#1a3a6b", navyLight: "#e8eef7", gold: "#C8A84B",
  green: "#1d6b4f", greenLight: "#e2f5ed",
  purple: "#5c3d99", purpleLight: "#ede8f8",
  red: "#c0392b", redLight: "#fbeaea",
  orange: "#d35400", orangeLight: "#fef0e7",
  gray: "#6b7280", grayLight: "#f3f4f6",
};

function Badge({ children, color = "navy" }) {
  const map = { navy: [COLORS.navyLight, COLORS.navy], green: [COLORS.greenLight, COLORS.green], purple: [COLORS.purpleLight, COLORS.purple], red: [COLORS.redLight, COLORS.red], orange: [COLORS.orangeLight, COLORS.orange], gray: [COLORS.grayLight, COLORS.gray] };
  const [bg, fg] = map[color] || map.navy;
  return <span style={{ background: bg, color: fg, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: 500, display: "inline-block" }}>{children}</span>;
}

function Pill({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 20, border: active ? "none" : "1px solid #d1d5db", background: active ? COLORS.navy : "white", color: active ? "white" : COLORS.gray, fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}>{children}</button>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px", ...style }}>{children}</div>;
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function HomeScreen({ setScreen }) {
  const totalMajors = INSTITUTIONS.reduce((a, i) => a + i.colleges.reduce((b, c) => b + c.majors.length, 0), 0);
  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, ${COLORS.navy} 0%, #2a5298 100%)`, padding: "24px 16px 32px", borderRadius: "0 0 24px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.navy, fontSize: 16 }}>خ</div>
            <span style={{ color: "white", fontSize: 18, fontWeight: 600 }}>خريّج</span>
          </div>
          <div style={{ width: 34, height: 34, background: "rgba(255,255,255,.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>🔔</div>
        </div>
        <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13, marginBottom: 4 }}>أهلاً بك في خريّج</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 600, marginBottom: 20 }}>دليلك لمرحلة ما بعد الثانوية 🎓</div>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[["8", "مؤسسة"], [`${totalMajors}+`, "تخصص"], ["6", "بعثات"]].map(([n, l]) => (
            <div key={l} style={{ background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 0", textAlign: "center" }}>
              <div style={{ color: COLORS.gold, fontSize: 20, fontWeight: 700 }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,.75)", fontSize: 11 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 80px" }}>
        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 24 }}>
          {[
            { icon: "🎓", label: "التخصصات", screen: "majors" },
            { icon: "📅", label: "المواعيد", screen: "dates" },
            { icon: "✈️", label: "البعثات", screen: "scholarships" },
            { icon: "🧠", label: "اختبار الميول", screen: "aptitude" },
          ].map(q => (
            <button key={q.screen} onClick={() => setScreen(q.screen)} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "inherit" }}>
              <span style={{ fontSize: 24 }}>{q.icon}</span>
              <span style={{ fontSize: 10, color: COLORS.gray, textAlign: "center" }}>{q.label}</span>
            </button>
          ))}
        </div>

        {/* Upcoming dates */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>مواعيد مهمة قادمة</span>
            <button onClick={() => setScreen("dates")} style={{ fontSize: 12, color: COLORS.navy, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>عرض الكل</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DATES.slice(0, 3).map(d => {
              const uc = { high: "red", med: "orange", low: "navy", info: "gray" };
              const lbl = { high: "عاجل", med: "قريب", low: "قادم", info: "مفتوح" };
              return (
                <Card key={d.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 22 }}>{d.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111" }}>{d.title}</div>
                    <div style={{ fontSize: 11, color: COLORS.gray, marginTop: 2 }}>{d.date}</div>
                  </div>
                  <Badge color={uc[d.urgency]}>{lbl[d.urgency]}</Badge>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Aptitude CTA */}
        <Card style={{ background: `linear-gradient(135deg, ${COLORS.purpleLight}, #f3f0ff)`, border: `1px solid #d4c8f8`, cursor: "pointer" }} >
          <div onClick={() => setScreen("aptitude")} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: 36 }}>🧠</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.purple }}>اكتشف تخصصك المناسب</div>
              <div style={{ fontSize: 12, color: COLORS.gray, marginTop: 4 }}>اختبار 20 سؤال لتحديد ميولك العلمية</div>
            </div>
            <span style={{ color: COLORS.purple, fontSize: 18 }}>←</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MajorsScreen() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [openInst, setOpenInst] = useState({});
  const [openCol, setOpenCol] = useState({});

  const filters = [
    { id: "all", label: "الكل" }, { id: "gov", label: "حكومي" }, { id: "pri", label: "خاص" },
    { id: "sci", label: "علمي" }, { id: "both", label: "أدبي وعلمي" }, { id: "bsc", label: "بكالوريوس" }, { id: "dip", label: "دبلوم" }
  ];

  const toggleInst = (id) => setOpenInst(p => ({ ...p, [id]: !p[id] }));
  const toggleCol = (id) => setOpenCol(p => ({ ...p, [id]: !p[id] }));

  const filteredInst = INSTITUTIONS.map(inst => {
    if (filter === "gov" && inst.type !== "gov") return null;
    if (filter === "pri" && inst.type !== "pri") return null;
    const cols = inst.colleges.map(col => {
      if (filter === "bsc" && col.degree !== "bsc") return null;
      if (filter === "dip" && col.degree !== "dip") return null;
      if (filter === "sci" && col.stream !== "sci" && col.stream !== "both") return null;
      if (filter === "both" && col.stream !== "both") return null;
      const majors = col.majors.filter(m => !q || m.includes(q) || col.name.includes(q) || inst.name.includes(q));
      if (!majors.length) return null;
      return { ...col, majors };
    }).filter(Boolean);
    if (!cols.length) return null;
    return { ...inst, colleges: cols };
  }).filter(Boolean);

  const totalMaj = filteredInst.reduce((a, i) => a + i.colleges.reduce((b, c) => b + c.majors.length, 0), 0);

  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 12 }}>استعرض التخصصات</div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="ابحث عن تخصص أو كلية..." style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, marginBottom: 12, fontFamily: "inherit", background: "white", color: "#111", direction: "rtl" }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {filters.map(f => <Pill key={f.id} active={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</Pill>)}
      </div>
      <div style={{ fontSize: 12, color: COLORS.gray, marginBottom: 12 }}>{totalMaj} تخصص · {filteredInst.length} مؤسسة</div>

      {filteredInst.map(inst => (
        <div key={inst.id} style={{ marginBottom: 10 }}>
          <div onClick={() => toggleInst(inst.id)} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, background: inst.type === "gov" ? COLORS.navyLight : COLORS.purpleLight, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{inst.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>{inst.name}</div>
              <div style={{ fontSize: 11, color: COLORS.gray, marginTop: 2 }}>
                <Badge color={inst.type === "gov" ? "navy" : "purple"}>{inst.type === "gov" ? "حكومي" : "خاص"}</Badge>
                {" "}{inst.colleges.reduce((a, c) => a + c.majors.length, 0)} تخصص
              </div>
            </div>
            <span style={{ color: COLORS.gray, fontSize: 16, transition: "transform .2s", transform: openInst[inst.id] ? "rotate(90deg)" : "rotate(0)" }}>›</span>
          </div>

          {openInst[inst.id] && (
            <div style={{ paddingRight: 14, marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
              {inst.colleges.map((col, ci) => {
                const cid = `${inst.id}-${ci}`;
                return (
                  <div key={cid} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                    <div onClick={() => toggleCol(cid)} style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: "#f9fafb" }}>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#111" }}>{col.name}</span>
                      <Badge color={col.degree === "bsc" ? "navy" : "green"}>{col.degree === "bsc" ? "بكالوريوس" : "دبلوم"}</Badge>
                      <Badge color={col.stream === "sci" ? "navy" : col.stream === "both" ? "green" : "orange"}>{col.stream === "sci" ? "علمي" : col.stream === "both" ? "علمي وأدبي" : "أدبي"}</Badge>
                      <span style={{ color: COLORS.gray, fontSize: 12 }}>{col.majors.length}</span>
                    </div>
                    {openCol[cid] && (
                      <div style={{ padding: "8px 12px" }}>
                        {/* Admission conditions */}
                        {col.conditions && (
                          <div style={{ background: COLORS.navyLight, borderRadius: 8, padding: "8px 10px", marginBottom: 10 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.navy, marginBottom: 5 }}>📋 شروط القبول</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <div style={{ fontSize: 11, color: "#333", display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ color: COLORS.gold }}>📊</span>
                                <span>الحد الأدنى للمعدل: <strong style={{ color: COLORS.navy }}>{col.conditions.minScore}%</strong></span>
                              </div>
                              {col.conditions.english ? (
                                <div style={{ fontSize: 11, color: "#333", display: "flex", alignItems: "center", gap: 6 }}>
                                  <span style={{ color: COLORS.gold }}>🗣️</span>
                                  <span>اختبار اللغة: <strong style={{ color: COLORS.navy }}>{col.conditions.english}</strong></span>
                                </div>
                              ) : (
                                <div style={{ fontSize: 11, color: COLORS.gray, display: "flex", alignItems: "center", gap: 6 }}>
                                  <span>🗣️</span>
                                  <span>لا يُشترط اختبار لغة إنجليزية</span>
                                </div>
                              )}
                              {col.conditions.note && (
                                <div style={{ fontSize: 11, color: COLORS.orange, display: "flex", alignItems: "center", gap: 6 }}>
                                  <span>ℹ️</span>
                                  <span>{col.conditions.note}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {/* Majors list */}
                        {col.majors.map((m, mi) => (
                          <div key={mi} style={{ padding: "6px 0", borderBottom: mi < col.majors.length - 1 ? "1px solid #f3f4f6" : "none", fontSize: 12, color: "#333", display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ color: COLORS.gold }}>◆</span> {m}
                          </div>
                        ))}
                        {/* More details link */}
                        <a href={col.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10, background: COLORS.navy, color: "white", borderRadius: 8, padding: "8px 12px", fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
                          <span>🔗</span>
                          <span>تفاصيل أكثر على موقع الكلية</span>
                          <span style={{ marginRight: "auto", marginLeft: 0 }}>←</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function DatesScreen() {
  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>المواعيد المهمة</div>
      <div style={{ fontSize: 13, color: COLORS.gray, marginBottom: 16 }}>تواريخ مهمة لخريجي الثانوية 2025</div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: 19, top: 0, bottom: 0, width: 2, background: "#e5e7eb" }} />
        {DATES.map((d, i) => {
          const uc = { high: [COLORS.redLight, COLORS.red, "عاجل"], med: [COLORS.orangeLight, COLORS.orange, "قريب"], low: [COLORS.navyLight, COLORS.navy, "قادم"], info: [COLORS.grayLight, COLORS.gray, "مستمر"] };
          const [bg, fg, lbl] = uc[d.urgency];
          return (
            <div key={d.id} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16, position: "relative" }}>
              <div style={{ width: 40, height: 40, background: bg, border: `2px solid ${fg}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, zIndex: 1 }}>{d.icon}</div>
              <Card style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{d.title}</div>
                  <Badge color={{ high: "red", med: "orange", low: "navy", info: "gray" }[d.urgency]}>{lbl}</Badge>
                </div>
                <div style={{ fontSize: 12, color: COLORS.gray }}>{d.subtitle}</div>
                <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: fg }}>📅 {d.date}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 11, color: COLORS.gray, background: "#f9fafb", padding: "4px 8px", borderRadius: 6 }}>ℹ️ {d.reg}</div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <Card style={{ background: COLORS.navyLight, border: `1px solid ${COLORS.navy}30`, marginTop: 8 }}>
        <div style={{ fontSize: 12, color: COLORS.navy, lineHeight: 1.7 }}>
          <strong>ملاحظة:</strong> المواعيد المذكورة تقريبية استناداً للجداول السابقة. تأكد دائماً من المواقع الرسمية للجامعات والهيئات للحصول على التواريخ الدقيقة.
        </div>
      </Card>
    </div>
  );
}

function ScholarshipsScreen() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>بعثات التعليم العالي</div>
      <div style={{ fontSize: 13, color: COLORS.gray, marginBottom: 16 }}>البعثات التابعة لوزارة التعليم العالي - الكويت</div>

      {/* Info card */}
      <Card style={{ background: COLORS.greenLight, border: `1px solid ${COLORS.green}30`, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: COLORS.green, fontWeight: 600, marginBottom: 4 }}>🎓 شروط البعثة العامة</div>
        <div style={{ fontSize: 12, color: "#334", lineHeight: 1.8 }}>
          • التقدم عبر موقع وزارة التعليم العالي mohe.edu.kw<br />
          • الحصول على نسبة لا تقل عن 80% في الثانوية العامة<br />
          • اجتياز اختبار اللغة الإنجليزية المطلوب<br />
          • التخصص المطلوب ضمن قائمة التخصصات المعتمدة
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SCHOLARSHIPS.map(s => {
          const statusMap = { open: ["#e2f5ed", COLORS.green, "التقديم مفتوح"], study: ["#f0f0f0", COLORS.gray, "قيد الدراسة"], upcoming: [COLORS.orangeLight, COLORS.orange, "قادماً"] };
          const [sbg, sfg, slbl] = statusMap[s.status];
          const isOpen = selected === s.id;
          return (
            <Card key={s.id} style={{ cursor: "pointer" }}>
              <div onClick={() => setSelected(isOpen ? null : s.id)} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 32 }}>{s.country}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray, marginTop: 2 }}>{s.unis}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 10, background: sbg, color: sfg, padding: "3px 8px", borderRadius: 20, fontWeight: 500 }}>{slbl}</div>
                  <div style={{ fontSize: 10, color: COLORS.gray, marginTop: 4, textAlign: "center" }}>{s.deadline}</div>
                </div>
              </div>
              {isOpen && (
                <div style={{ marginTop: 12, borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
                  <div style={{ fontSize: 12, color: COLORS.gray, marginBottom: 8 }}>التخصصات المتاحة:</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {s.fields.map(f => <span key={f} style={{ fontSize: 11, background: COLORS.navyLight, color: COLORS.navy, padding: "3px 10px", borderRadius: 20 }}>{f}</span>)}
                  </div>
                  <div style={{ marginTop: 12, padding: "8px 12px", background: "#f9fafb", borderRadius: 8, fontSize: 12, color: COLORS.gray }}>
                    للتقديم وإطلاع على التفاصيل الكاملة ادخل موقع وزارة التعليم العالي: <strong style={{ color: COLORS.navy }}>mohe.edu.kw</strong>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AptitudeScreen() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState(null);

  const answer = (val) => {
    const newAnswers = { ...answers, [APTITUDE_QUESTIONS[current].id]: { cat: APTITUDE_QUESTIONS[current].cat, val } };
    setAnswers(newAnswers);
    if (current < APTITUDE_QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate result
      const scores = {};
      Object.values(newAnswers).forEach(({ cat, val }) => {
        scores[cat] = (scores[cat] || 0) + val;
      });
      const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      setResult(APTITUDE_RESULTS[top]);
      setStep("result");
    }
  };

  const reset = () => { setStep("intro"); setAnswers({}); setCurrent(0); setResult(null); };

  if (step === "intro") return (
    <div style={{ padding: "16px 16px 80px" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>اختبار تحديد الميول</div>
      <div style={{ fontSize: 13, color: COLORS.gray, marginBottom: 20 }}>اكتشف التخصص الذي يناسب شخصيتك وميولك</div>
      <div style={{ textAlign: "center", padding: "40px 20px", background: "white", borderRadius: 16, border: "1px solid #e5e7eb", marginBottom: 20 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🧠</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#111", marginBottom: 8 }}>اختبار الميول العلمية</div>
        <div style={{ fontSize: 13, color: COLORS.gray, lineHeight: 1.7, marginBottom: 20 }}>
          {APTITUDE_QUESTIONS.length} سؤالاً بسيطاً يساعدك على معرفة توجهاتك الأكاديمية<br />
          يستغرق الاختبار حوالي 5 دقائق
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
          {["🔬 علوم", "⚙️ هندسة", "🏥 طب", "📊 أعمال", "⚖️ قانون", "🎨 فنون"].map(c => (
            <span key={c} style={{ fontSize: 11, color: COLORS.gray }}>{c}</span>
          ))}
        </div>
        <button onClick={() => setStep("quiz")} style={{ background: COLORS.navy, color: "white", border: "none", borderRadius: 12, padding: "12px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>ابدأ الاختبار ←</button>
      </div>
      <Card style={{ background: COLORS.navyLight, border: `1px solid ${COLORS.navy}20` }}>
        <div style={{ fontSize: 12, color: COLORS.navy, lineHeight: 1.8 }}>
          <strong>كيف يعمل الاختبار؟</strong><br />
          ستُعرض عليك 20 جملة، اختر مدى تطابقها مع شخصيتك من 1 إلى 5. النتيجة ستقترح عليك التخصصات الأنسب لك.
        </div>
      </Card>
    </div>
  );

  if (step === "quiz") {
    const q = APTITUDE_QUESTIONS[current];
    const pct = Math.round((current / APTITUDE_QUESTIONS.length) * 100);
    return (
      <div style={{ padding: "16px 16px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>سؤال {current + 1} من {APTITUDE_QUESTIONS.length}</div>
          <button onClick={reset} style={{ fontSize: 12, color: COLORS.gray, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>إلغاء</button>
        </div>
        {/* Progress */}
        <div style={{ background: "#e5e7eb", borderRadius: 20, height: 6, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ background: COLORS.navy, height: "100%", borderRadius: 20, width: `${pct}%`, transition: "width .3s" }} />
        </div>
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: "24px 20px", marginBottom: 20, minHeight: 120, display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 16, color: "#111", lineHeight: 1.6, textAlign: "center", width: "100%" }}>{q.text}</div>
        </div>
        <div style={{ fontSize: 12, color: COLORS.gray, textAlign: "center", marginBottom: 14 }}>مدى انطباق هذه الجملة عليك:</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {[
            [1, "لا أتفق أبداً", COLORS.redLight, COLORS.red],
            [2, "لا أتفق", "#fef0e7", COLORS.orange],
            [3, "محايد", COLORS.grayLight, COLORS.gray],
            [4, "أتفق", COLORS.navyLight, COLORS.navy],
            [5, "أتفق تماماً", COLORS.greenLight, COLORS.green],
          ].map(([val, lbl, bg, fg]) => (
            <button key={val} onClick={() => answer(val)} style={{ background: bg, border: `2px solid ${fg}`, borderRadius: 10, padding: "12px 8px", cursor: "pointer", fontFamily: "inherit", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: fg }}>{val}</span>
              <span style={{ fontSize: 9, color: fg, textAlign: "center", lineHeight: 1.3 }}>{lbl}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "result" && result) return (
    <div style={{ padding: "16px 16px 80px" }}>
      <div style={{ textAlign: "center", padding: "32px 20px", background: `linear-gradient(135deg, ${COLORS.navy}, #2a5298)`, borderRadius: 16, marginBottom: 16, color: "white" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>{result.emoji}</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>ميولك تتجه نحو</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.gold }}>{result.title}</div>
      </div>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, color: "#333", lineHeight: 1.8 }}>{result.desc}</div>
      </Card>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 10 }}>التخصصات المقترحة لك:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {result.recs.map((r, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 28, background: COLORS.navyLight, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: COLORS.navy, flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: "#111" }}>{r}</span>
          </Card>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={reset} style={{ flex: 1, background: "white", border: `1px solid ${COLORS.navy}`, color: COLORS.navy, borderRadius: 12, padding: "12px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>إعادة الاختبار</button>
      </div>
    </div>
  );
  return null;
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home");

  const tabs = [
    { id: "home", label: "الرئيسية", icon: "🏠" },
    { id: "majors", label: "التخصصات", icon: "📚" },
    { id: "aptitude", label: "اختبار الميول", icon: "🧠" },
    { id: "scholarships", label: "البعثات", icon: "✈️" },
    { id: "dates", label: "المواعيد", icon: "📅" },
  ];

  const screens = { home: HomeScreen, majors: MajorsScreen, dates: DatesScreen, scholarships: ScholarshipsScreen, aptitude: AptitudeScreen };
  const ActiveScreen = screens[screen] || HomeScreen;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#f8f9fa", minHeight: "100vh", position: "relative", fontFamily: "system-ui, -apple-system, sans-serif", direction: "rtl" }}>
      {/* Screen header */}
      {screen !== "home" && (
        <div style={{ background: COLORS.navy, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setScreen("home")} style={{ background: "rgba(255,255,255,.15)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: 16 }}>←</button>
          <div style={{ width: 28, height: 28, background: COLORS.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.navy, fontSize: 12 }}>خ</div>
          <span style={{ color: "white", fontWeight: 600, fontSize: 15 }}>{tabs.find(t => t.id === screen)?.label}</span>
        </div>
      )}

      <div style={{ paddingBottom: 64 }}>
        <ActiveScreen setScreen={setScreen} />
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "white", borderTop: "1px solid #e5e7eb", display: "flex", zIndex: 100 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setScreen(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 4px 10px", border: "none", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span style={{ fontSize: 9, color: screen === t.id ? COLORS.navy : COLORS.gray, fontWeight: screen === t.id ? 600 : 400 }}>{t.label}</span>
            {screen === t.id && <div style={{ width: 20, height: 2, background: COLORS.navy, borderRadius: 2, marginTop: 1 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
