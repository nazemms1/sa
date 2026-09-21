export interface HolidayItem {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  icon: string;
}

export interface TrackingStep {
  title: string;
  date: string;
  location: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackingResult {
  code: string;
  status: string;
  statusColor: string;
  origin: string;
  destination: string;
  type: string;
  estimatedDelivery: string;
  weight: string;
  volume: string;
  steps: TrackingStep[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  features: string[];
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  location: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  city: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentTranslation {
  header: {
    brandName: string;
    brandSubtitle: string;
    nav: {
      home: string;
      services: string;
      tracking: string;
      holidays: string;
      calculator: string;
      process: string;
      whyUs: string;
      faq: string;
      contact: string;
    };
    contactPhone: string;
    whatsappText: string;
    quoteBtn: string;
    languageName: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    quickTrackPlaceholder: string;
    quickTrackBtn: string;
    highlights: {
      weeklySailings: string;
      chinaWarehouses: string;
      syrianClearance: string;
    };
    stats: {
      containers: string;
      containersLabel: string;
      deliveryRate: string;
      deliveryRateLabel: string;
      syriaHubs: string;
      syriaHubsLabel: string;
      chinaWarehouses: string;
      chinaWarehousesLabel: string;
    };
    routeCard: {
      title: string;
      airOption: string;
      airDays: string;
      seaOption: string;
      seaDays: string;
      origin: string;
      destination: string;
      statusBadge: string;
      liveContainer: string;
      containerType: string;
      airportDest: string;
      portsDest: string;
      transitStatus: string;
      ctaBtn: string;
      insuranceBadge: string;
      originHub: string;
      destHub: string;
      saHubsLabel: string;
      finalDeliveryLabel: string;
    };
  };
  holidaysNotice: {
    tag: string;
    title: string;
    subtitle: string;
    fromText: string;
    toText: string;
    alertMessage: string;
    adviceTitle: string;
    adviceText: string;
    mainScheduleTitle: string;
    holidayClosure: string;
    verifiedBadge: string;
    holidays: HolidayItem[];
  };
  tracking: {
    sectionTag: string;
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    trackBtn: string;
    sampleClick: string;
    demoCodes: string[];
    notFound: string;
    resultTitle: string;
    originLabel: string;
    destLabel: string;
    etaLabel: string;
    typeLabel: string;
    weightLabel: string;
    volLabel: string;
    journeyTitle: string;
    trackingCodeLabel: string;
  };
  calculator: {
    sectionTag: string;
    title: string;
    subtitle: string;
    shippingType: string;
    seaType: string;
    airType: string;
    originCity: string;
    destCity: string;
    weightLabel: string;
    cbmLabel: string;
    goodsType: string;
    generalCargo: string;
    textiles: string;
    electronics: string;
    machinery: string;
    calculateBtn: string;
    estimatedCost: string;
    disclaimer: string;
    includes: string[];
    confirmBtn: string;
    cbmRateLabel: string;
    kgRateLabel: string;
    seaLclHint: string;
    sea20Hint: string;
    sea40Hint: string;
    destOptions: {
      damascus: string;
      lattakia: string;
      tartous: string;
      aleppo: string;
      homs: string;
    };
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    detailsBtn: string;
    items: ServiceItem[];
  };
  process: {
    sectionTag: string;
    title: string;
    subtitle: string;
    securedBadge: string;
    steps: StepItem[];
  };
  whyUs: {
    sectionTag: string;
    title: string;
    subtitle: string;
    guaranteeBadge: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  quoteModal: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    companyPlaceholder: string;
    typeLabel: string;
    detailsPlaceholder: string;
    submitBtn: string;
    successMessage: string;
    seaOptionBtn: string;
    airOptionBtn: string;
    responseGuarantee: string;
    successTitle: string;
  };
  testimonials: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    chinaTitle: string;
    guangzhouAddress: string;
    yiwuAddress: string;
    syriaTitle: string;
    damascusAddress: string;
    lattakiaAddress: string;
    phoneLabel: string;
    emailLabel: string;
    whatsappBtn: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    servicesTitle: string;
    officesTitle: string;
    rights: string;
    chinaTagline: string;
    directContactTitle: string;
    backToTop: string;
  };
}

export const sampleTrackingData: Record<"ar" | "en", Record<string, TrackingResult>> = {
  ar: {
    "SA-8842-SY": {
      code: "SA-8842-SY",
      status: "في الطريق البحري نحو اللاذقية",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      origin: "مستودع إيوا (الصين)",
      destination: "ميناء اللاذقية (سوريا)",
      type: "شحن بحري جزئي LCL",
      estimatedDelivery: "28 أيلول 2026",
      weight: "4,250 كغ",
      volume: "18.5 CBM",
      steps: [
        { title: "استلام وتجميع البضائع", date: "02 أيلول 2026", location: "مستودع S.A. في إيوا", completed: true },
        { title: "التغليف وفحص الجودة", date: "04 أيلول 2026", location: "مستودع إيوا المركز", completed: true },
        { title: "تحميل الحاوية والجمارك", date: "07 أيلول 2026", location: "ميناء نينغبو الصيني", completed: true },
        { title: "مغادرة السفينة للميناء", date: "10 أيلول 2026", location: "الخط البحري الآسيوي", completed: true, current: true },
        { title: "الوصول والتخليص الجمركي", date: "24 أيلول 2026", location: "ميناء اللاذقية السوري", completed: false },
        { title: "التسليم لباب المستودع", date: "28 أيلول 2026", location: "دمشق - سوريا", completed: false },
      ],
    },
    "SA-9102-GZ": {
      code: "SA-9102-GZ",
      status: "وصل مطار دمشق الدولي",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      origin: "مطار غوانزو (الصين)",
      destination: "مطار دمشق الدولي (سوريا)",
      type: "شحن جوي سريع Air Freight",
      estimatedDelivery: "22 أيلول 2026",
      weight: "380 كغ",
      volume: "1.8 CBM",
      steps: [
        { title: "استلام البضائع بالصين", date: "18 أيلول 2026", location: "مكتب S.A. غوانزو", completed: true },
        { title: "الفحص وإصدار البوليصة الجوية", date: "19 أيلول 2026", location: "مطار غوانزو الدولي", completed: true },
        { title: "الإقلاع والترانزيت", date: "20 أيلول 2026", location: "رحلة الشحن الجوي", completed: true },
        { title: "وصول المطار والتخليص النهائي", date: "21 أيلول 2026", location: "مطار دمشق الدولي", completed: true, current: true },
        { title: "تسليم الشحنة للعميل", date: "22 أيلول 2026", location: "دمشق", completed: false },
      ],
    },
    "SA-7731-YW": {
      code: "SA-7731-YW",
      status: "قيد التجميع والفرز في إيوا",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
      origin: "إيوا (الصين)",
      destination: "حلب (سوريا)",
      type: "شحن بحري حاوية كاملة FCL",
      estimatedDelivery: "05 تشرين الأول 2026",
      weight: "12,800 كغ",
      volume: "58 CBM",
      steps: [
        { title: "استلام البضائع من المصانع", date: "19 أيلول 2026", location: "مستودع إيوا الرئيسي", completed: true, current: true },
        { title: "الفحص الجمركي والتأمين", date: "22 أيلول 2026", location: "مستودع إيوا", completed: false },
        { title: "تحميل الحاوية وربط الرصاص", date: "24 أيلول 2026", location: "ميناء نينغبو", completed: false },
        { title: "الإبحار نحو سوريا", date: "26 أيلول 2026", location: "البحر المتوسط", completed: false },
        { title: "التخليص والنقل الداخلي", date: "03 تشرين الأول 2026", location: "ميناء طرطوس / حلب", completed: false },
      ],
    },
  },
  en: {
    "SA-8842-SY": {
      code: "SA-8842-SY",
      status: "In Sea Transit to Lattakia Port",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      origin: "Yiwu Hub (China)",
      destination: "Lattakia Port (Syria)",
      type: "Sea Freight LCL Consolidation",
      estimatedDelivery: "Sep 28, 2026",
      weight: "4,250 KG",
      volume: "18.5 CBM",
      steps: [
        { title: "Cargo Collection & Sorting", date: "Sep 02, 2026", location: "S.A. Yiwu Hub", completed: true },
        { title: "Palletizing & QC Inspection", date: "Sep 04, 2026", location: "Yiwu Central Warehouse", completed: true },
        { title: "Container Loading & Customs", date: "Sep 07, 2026", location: "Ningbo Port, China", completed: true },
        { title: "Vessel Departure", date: "Sep 10, 2026", location: "Asian Sea Route", completed: true, current: true },
        { title: "Arrival & Syrian Clearance", date: "Sep 24, 2026", location: "Lattakia Port, Syria", completed: false },
        { title: "Final Door Delivery", date: "Sep 28, 2026", location: "Damascus - Syria", completed: false },
      ],
    },
    "SA-9102-GZ": {
      code: "SA-9102-GZ",
      status: "Arrived at Damascus Int'l Airport",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      origin: "Guangzhou Airport (China)",
      destination: "Damascus Int'l Airport (Syria)",
      type: "Express Air Freight",
      estimatedDelivery: "Sep 22, 2026",
      weight: "380 KG",
      volume: "1.8 CBM",
      steps: [
        { title: "Cargo Received in China", date: "Sep 18, 2026", location: "S.A. Guangzhou Hub", completed: true },
        { title: "Air Waybill Issuance & QC", date: "Sep 19, 2026", location: "Guangzhou Int'l Airport", completed: true },
        { title: "Flight Takeoff & Transit", date: "Sep 20, 2026", location: "Air Cargo Transit Flight", completed: true },
        { title: "Airport Arrival & Clearance", date: "Sep 21, 2026", location: "Damascus Int'l Airport", completed: true, current: true },
        { title: "Delivery to Consignee", date: "Sep 22, 2026", location: "Damascus, Syria", completed: false },
      ],
    },
    "SA-7731-YW": {
      code: "SA-7731-YW",
      status: "Consolidation & Packing in Yiwu",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
      origin: "Yiwu (China)",
      destination: "Aleppo (Syria)",
      type: "Sea Freight FCL 40ft HQ Container",
      estimatedDelivery: "Oct 05, 2026",
      weight: "12,800 KG",
      volume: "58 CBM",
      steps: [
        { title: "Receiving Cargo from Factories", date: "Sep 19, 2026", location: "Yiwu Central Hub", completed: true, current: true },
        { title: "Customs Declaration & Insurance", date: "Sep 22, 2026", location: "Yiwu Warehouse", completed: false },
        { title: "Container Loading & Sealing", date: "Sep 24, 2026", location: "Ningbo Port", completed: false },
        { title: "Maritime Voyage to Syria", date: "Sep 26, 2026", location: "Mediterranean Route", completed: false },
        { title: "Clearance & Inland Trucking", date: "Oct 03, 2026", location: "Tartous Port / Aleppo", completed: false },
      ],
    },
  },
};

export const siteContent: Record<"ar" | "en", ContentTranslation> = {
  ar: {
    header: {
      brandName: "S.A. LOGISTICS",
      brandSubtitle: "الفرسان للشحن اللوجستي والتخليص الجمركي",
      nav: {
        home: "الرئيسية",
        services: "خدماتنا",
        tracking: "تتبع شحنتك",
        holidays: "عطل الصين 2026",
        calculator: "حاسبة الأسعار",
        process: "خطوات الشحن",
        whyUs: "لماذا نحن",
        faq: "الأسئلة الشائعة",
        contact: "اتصل بنا",
      },
      contactPhone: "+963 944 000 000",
      whatsappText: "واتساب مباشر",
      quoteBtn: "طلب سعر شحن",
      languageName: "English",
    },
    hero: {
      badge: "خبرة أكثر من 15 عاماً في الشحن بين الصين وسوريا",
      titleStart: "شريككم اللوجستي الموثوق لنقل البضائع من",
      titleHighlight: "الصين إلى سوريا",
      titleEnd: "بأعلى معايير الأمان والسرعة",
      subtitle:
        "نقدّم حلول شحن بحري وجوي متكاملة، تخليص جمركي محترف في الموانئ السورية، ومستودعات تجميع خاصة في إيوا وغوانزو لتأمين شحناتكم حتى باب المستودع.",
      primaryCta: "احسب تكلفة شحنتك الآن",
      secondaryCta: "جدول العطل الرسمية بالصين",
      quickTrackPlaceholder: "أدخل رقم البوليصة أو التتبع (مثال: SA-8842-SY)...",
      quickTrackBtn: "تتبع الشحنة",
      highlights: {
        weeklySailings: "رحلات بحرية أسبوعية مؤكدة",
        chinaWarehouses: "مستودعات تجميع وفحص بالصين",
        syrianClearance: "تخليص باللاذقية وطرطوس ودمشق",
      },
      stats: {
        containers: "+12,500",
        containersLabel: "حاوية مشحونة بنجاح",
        deliveryRate: "99.4%",
        deliveryRateLabel: "نسبة التسليم في الموعد المحدد",
        syriaHubs: "4 موانئ ومنافذ",
        syriaHubsLabel: "تخليص جمركي سوري مباشر",
        chinaWarehouses: "2 مستودعات ضخمة",
        chinaWarehousesLabel: "في إيوا وغوانزو لجمع وتغليف البضائع",
      },
      routeCard: {
        title: "خط الشحن المباشر (الصين ⬅️ سوريا)",
        airOption: "شحن جوي سريع ✈️",
        airDays: "3 - 5 أيام",
        seaOption: "شحن بحري منتظم 🚢",
        seaDays: "22 - 28 يوماً",
        origin: "غوانزو / إيوا / نينغبو",
        destination: "اللاذقية / طرطوس / دمشق",
        statusBadge: "رحلات أسبوعية مؤكدة",
        liveContainer: "حاوية 40 قدم هيدروليك HQ",
        containerType: "متابعة لحظية وتغطية تأمينية كاملة",
        airportDest: "مطار دمشق الدولي",
        portsDest: "موانئ اللاذقية وطرطوس",
        transitStatus: "جارٍ النقل",
        ctaBtn: "احصل على الاستشارة والشحن الآن",
        insuranceBadge: "تغطية تأمينية 100%",
        originHub: "إيوا / غوانزو",
        destHub: "اللاذقية / دمشق",
        saHubsLabel: "مستودعات S.A.",
        finalDeliveryLabel: "التسليم النهائي",
      },
    },
    holidaysNotice: {
      tag: "تنويه هام للتجار والمستوردين",
      title: "العطل الرسمية بالصين 2026",
      subtitle:
        "حرصاً منا على تنظيم أعمالكم ومواعيد شحناتكم بالشكل الأمثل، نود إعلامكم بمواعيد العطل الرسمية بالصين خلال الفترة المقبلة:",
      fromText: "من تاريخ",
      toText: "إلى تاريخ",
      alertMessage:
        "يرجى مراعاة مواعيد العطل عند تسليم البضائع وذلك لضمان سير عمليات الشحن والتسليم ضمن المواعيد المحكورة والتفادي لأي تأخير في الموانئ والمصانع الصينية.",
      adviceTitle: "نصيحة فريق S.A. LOGISTICS للتجار:",
      adviceText:
        "نوصي بإنهاء تجهيز وتأكيد استلام البضائع من المصانع قبل تاريخ 20 سبتمبر لضمان تحميلها على آخر رحلات بحرية قبل عطلة اليوم الوطني الصيني.",
      mainScheduleTitle: "مواعيد العطل الرسمية بالصين لعام 2026",
      holidayClosure: "إغلاق المصانع والموانئ الصينية",
      verifiedBadge: "تحديث معتمد لمواعيد الشحن والتسليم",
      holidays: [
        {
          id: "mid-autumn",
          name: "عطلة منتصف الخريف (Mid-Autumn Festival)",
          startDate: "25/9/2026",
          endDate: "27/9/2026",
          icon: "moon",
        },
        {
          id: "national-day",
          name: "عطلة اليوم الوطني الصيني (National Day Holiday)",
          startDate: "1/10/2026",
          endDate: "7/10/2026",
          icon: "building",
        },
      ],
    },
    tracking: {
      sectionTag: "تتبع حي ومباشر",
      title: "تابع مسار شحنتك خطوة بخطوة",
      subtitle:
        "أدخل رقم الشحنة لمتابعة تحرك البضاعة من مستودعاتنا بالصين مروراً بالرحلة البحرية أو الجوية وحتى وصولها للموانئ السورية.",
      inputPlaceholder: "أدخل رقم التتبع (جرب: SA-8842-SY أو SA-9102-GZ)...",
      trackBtn: "بحث",
      sampleClick: "أو انقر على أحد الأرقام التجريبية التالية:",
      demoCodes: ["SA-8842-SY", "SA-9102-GZ", "SA-7731-YW"],
      notFound: "عذراً، لم نجد شحنة بهذا الرقم. يرجى التأكد من الرقم والتحقق مجدداً.",
      resultTitle: "تفاصيل الشحنة الحالية",
      originLabel: "المصدر",
      destLabel: "الوجهة النهائي",
      etaLabel: "تاريخ الوصول المتوقع",
      typeLabel: "نوع الشحن",
      weightLabel: "الوزن الكلي",
      volLabel: "الحجم الإجمالي",
      journeyTitle: "خط السير والتسلسل الزمني للشحنة",
      trackingCodeLabel: "رقم التتبع",
    },
    calculator: {
      sectionTag: "حاسبة الأسعار التقديرية",
      title: "احسب تكلفة شحن بضائعك فوراً",
      subtitle: "أدخل بيانات شحنتك للحصول على تقدير فوري لتكلفة الشحن والتخليص إلى سوريا.",
      shippingType: "طريقة الشحن",
      seaType: "شحن بحري (CBM)",
      airType: "شحن جوي (KG)",
      originCity: "مدينة التحميل بالصين",
      destCity: "المدينة المستهدفة بسوريا",
      weightLabel: "الوزن التقريبي (كيلوغرام)",
      cbmLabel: "الحجم التقريبي (متر مكعب CBM)",
      goodsType: "نوع البضاعة",
      generalCargo: "بضائع عامة ومواد منزلية",
      textiles: "أقمشة وألبسة جاهزة",
      electronics: "أجهزة إلكترونية ومعدات",
      machinery: "آلات وخطوط إنتاج ثقيلة",
      calculateBtn: "احسب التكلفة التقديرية",
      estimatedCost: "التكلفة التقديرية المتوقعة",
      disclaimer: "* الأسعار تقديرية وتخضع لمعاينة الفواتير النهائية وتغيرات أسعار الوقود والجمارك.",
      includes: [
        "شامل الاستلام والفرز بمستودعاتنا في الصين",
        "تغطية التثبيت والتغليف بحاويات آمنة",
        "متابعة المانيفست والتسليم للموانئ السورية",
      ],
      confirmBtn: "تأكيد طلب السعر والتثبيت",
      cbmRateLabel: "معدل التكلفة للحجم",
      kgRateLabel: "معدل التكلفة للوزن",
      seaLclHint: "0.5 CBM (طرد جزئي LCL)",
      sea20Hint: "30 CBM (حاوية 20 قدم)",
      sea40Hint: "68 CBM (حاوية 40 قدم HQ)",
      destOptions: {
        damascus: "دمشق وريفها (شامل النقل الداخلي)",
        lattakia: "اللاذقية (تسليم ميناء اللاذقية)",
        tartous: "طرطوس (تسليم ميناء طرطوس)",
        aleppo: "حلب (شامل النقل الداخلي)",
        homs: "حمص وحماة (شامل النقل الداخلي)",
      },
    },
    services: {
      sectionTag: "خدماتنا الشاملة",
      title: "حلول لوجستية متكاملة من الصين إلى سوريا",
      subtitle:
        "نضع بين يديك منظومة شحن احترافية تناسب كافة أنواع البضائع والكميات مع ضمان السلامة والتفتيش.",
      detailsBtn: "طلب تفاصيل الخدمة",
      items: [
        {
          id: "sea-freight",
          title: "الشحن البحري (FCL & LCL)",
          description:
            "نقل كامل للحاويات (FCL) أو شحن جزئي تجميعي (LCL) من موانئ نينغبو، شنجن وغوانزو إلى اللاذقية وطرطوس بأفضل الأسعار.",
          iconName: "ship",
          badge: "الأكثر طلباً",
          features: ["حاويات 20 قدم و 40 قدم HQ", "تجميع بضائع جزئية أسبوعياً", "تأمين شامل على البضائع"],
        },
        {
          id: "air-freight",
          title: "الشحن الجوي السريع",
          description:
            "خدمة الشحن الجوي الفائق السرعة للبضائع الثمينة والعينات العاجلة خلال 3 إلى 5 أيام مع التخليص بمطار دمشق الدولي.",
          iconName: "plane",
          badge: "سريع ومستعجل",
          features: ["رحلات جوية منتظمة", "تخليص سريع في المطار", "مثالي للعينات والأجهزة الإلكترونية"],
        },
        {
          id: "warehousing",
          title: "التجميع والفحص بالصين",
          description:
            "مستودعات ضخمة ومجهزة في إيوا وغوانزو لاستلام البضائع من مختلف المصانع، مطابقتها، وفحص جودتها قبل التحميل.",
          iconName: "warehouse",
          badge: "مستودعات خاصة",
          features: ["مستودع إيوا المركز", "مستودع غوانزو التجاري", "فحص الجودة والتغليف الخشبي"],
        },
        {
          id: "customs-clearance",
          title: "التخليص الجمركي السوري",
          description:
            "فريق متخصص يملك خبرة واسعة في التخليص الجمركي في كافة المنافذ والموانئ السورية بسرعة ودقة متناهية.",
          iconName: "file-check",
          badge: "خبرة 15 سنة",
          features: ["إصدار البيان الجمركي", "تخفيض التكاليف والرسوم", "استخراج الموافقات الرسمية"],
        },
        {
          id: "door-delivery",
          title: "النقل والتسليم الداخلي",
          description:
            "نقل البضائع بعد التخليص إلى باب مستودعك أو معملك في دمشق، حلب، حمص، اللاذقية، وكافة المحافظات السورية.",
          iconName: "truck",
          badge: "باب لباب",
          features: ["أسطول شاحنات حديث", "تتبع جغرافي للشاحنات", "تسليم آمن وفوري"],
        },
        {
          id: "financial-support",
          title: "تسديد الموردين والوثائق",
          description:
            "تقديم خدمات الدعم التجاري وتحويل المستحقات المالية للمصانع الصينية بأمان تام وتوثيق الفواتير الرسمية.",
          iconName: "coins",
          badge: "دعم تجاري",
          features: ["تحويلات مالية آمنة", "تدقيق الفواتير وشهادات المنشأ", "متابعة الموردين الصينيين"],
        },
      ],
    },
    process: {
      sectionTag: "آلية العمل",
      title: "كيف تصل بضائعك بأمان وسرعة؟",
      subtitle: "خمس خطوات واضحة ومدروسة تضمن لك رحلة شحن مريحة وخالية من العقبات.",
      securedBadge: "خطوة مكتملة ومؤمنة",
      steps: [
        {
          number: "01",
          title: "استلام وتجميع البضائع",
          description: "يتم استلام الشحنة من المصانع الصينية وتجميعها في مستودعاتنا في إيوا أو غوانزو.",
          location: "الصين - المستودعات",
        },
        {
          number: "02",
          title: "الفحص التغليف والفرز",
          description: "يقوم فريقنا بفحص البضائع، إعادة التغليف لحمايتها، وإصدار المانيفست ورقم التتبع.",
          location: "إيوا / غوانزو",
        },
        {
          number: "03",
          title: "التحميل والجمارك الصينية",
          description: "تحميل الحاوية أو تجهيز طرد الشحن الجوي وإنهاء إجراءات التصدير في الموانئ الصينية.",
          location: "موانئ نينغبو / شنجن / غوانزو",
        },
        {
          number: "04",
          title: "الإبحار أو الطيران نحو سوريا",
          description: "متابعة المسار المباشر عبر الخطوط الملاحية والجوية العالمية مع توفير تحديثات حية.",
          location: "مسار النقل الدولي",
        },
        {
          number: "05",
          title: "التخليص والتسليم لباب مستودعك",
          description: "التخليص الجمركي في الموانئ السورية ونقل الشحنة فوراً إلى عنوانك المحدد في سوريا.",
          location: "اللاذقية / طرطوس / دمشق",
        },
      ],
    },
    whyUs: {
      sectionTag: "نقاط القوة",
      title: "لماذا يختار كبار التجار شركة S.A. LOGISTICS؟",
      subtitle: "نحن لا ننقل البضائع فحسب، بل نحمي استثماراتك ونضمن استقرار تدفق أعمالك التجارية.",
      guaranteeBadge: "مواصفات قياسية مضمونة",
      features: [
        {
          title: "خبرة متعمقة في السوق والموانئ السورية",
          description: "نمتلك دراية كاملة بالإجراءات القوانين الجمركية السورية، مما يضمن لك تخليصاً بلا تعقيدات.",
          icon: "shield-check",
        },
        {
          title: "مكاتب ومستودعات مملوكة بالصين",
          description: "فريق عربي وصيني متواجد ميدانياً في غوانزو وإيوا لمتابعة الموردين واستلام البضائع.",
          icon: "building-2",
        },
        {
          title: "شفافية وتكلفة منافسة مدروسة",
          description: "لا توجد أي تكاليف خفية. نقدّم لك تفصيلاً كاملاً لرسوم الشحن والتخليص من البداية.",
          icon: "award",
        },
        {
          title: "تأمين شامل وتتبع أسبوعي مستمر",
          description: "نظام تتبع حي متاح على مدار الساعة مع ضمانات وتأمين لحماية شحنتك من أي أضرار.",
          icon: "clock",
        },
      ],
    },
    quoteModal: {
      title: "طلب عرض سعر شحن مخصص",
      subtitle: "أدخل تفاصيل شحنتك وسيتواصل معك مستشار الشحن لدينا خلال 30 دقيقة.",
      namePlaceholder: "الاسم الكامل / اسم الشركة",
      phonePlaceholder: "رقم الهاتف / الواتساب (مثال: 0944000000)",
      companyPlaceholder: "نوع البضاعة والكمية",
      typeLabel: "نوع الشحن المطلوب",
      detailsPlaceholder: "ملاحظات إضافية (الوزن، CBM، تفاصيل التغليف، مدينة الاستلام بالصين)...",
      submitBtn: "إرسال طلب السعر فوراً",
      successMessage: "تم إرسال طلبك بنجاح! سيتواصل معك فريق S.A. LOGISTICS في أقرب وقت.",
      seaOptionBtn: "شحن بحري (FCL/LCL)",
      airOptionBtn: "شحن جوي سريع",
      responseGuarantee: "استجابة سريعة خلال 30 دقيقة",
      successTitle: "تم استلام طلبك بنجاح!",
    },
    testimonials: {
      sectionTag: "آراء عملائنا",
      title: "ماذا يقول تجار سوريا عن خدماتنا؟",
      subtitle: "ثقة مئات الشركات والتجار في دمشق وحلب واللاذقية هي وسام فخرنا.",
      items: [
        {
          id: "1",
          name: "الأستاذ محمد الخطيب",
          company: "شركة الخطيب لاستيراد الإلكترونيات",
          city: "دمشق - سوريا",
          quote:
            "تعاملنا مع S.A. LOGISTICS لأكثر من 5 سنوات في شحن الحاويات من إيوا. السرعة والتخليص الجمركي في اللاذقية ممتاز جداً ودون أي تأخير.",
          rating: 5,
        },
        {
          id: "2",
          name: "الحاج أحمد البرادعي",
          company: "مؤسسة البرادعي لتجارة الأقمشة",
          city: "حلب - سوريا",
          quote:
            "خدمة التجميع بالصين أراحتنا كثيراً. نجمع البضائع من 4 مصانع مختلفة بمستودعهم بغوانزو ويوصلونها بحاوية واحدة ملائمة وبأسعار منافسة.",
          rating: 5,
        },
        {
          id: "3",
          name: "المهندس سامر المصري",
          company: "شركة آفاق لتجهيزات الخطوط الإنتاجية",
          city: "اللاذقية - سوريا",
          quote:
            "الشحن الجوي السريع والتخليص الجمركي لديهم يعتمد عليه في الآلات والمعدات المستعجلة. احترافية عالية وشفافية متكاملة.",
          rating: 5,
        },
      ],
    },
    faq: {
      sectionTag: "الأسئلة الشائعة",
      title: "إجابات على أكثر الاستفسارات تداولاً",
      subtitle: "كل ما تحتاج معرفته عن الشحن من الصين إلى سوريا والإجراءات الجمركية.",
      items: [
        {
          question: "كم تستغرق مدة الشحن البحري من الصين إلى الموانئ السورية؟",
          answer:
            "تستغرق الرحلة البحرية المباشرة من موانئ الصين (نينغبو، غوانزو، شنجن) إلى ميناء اللاذقية أو طرطوس حوالي 22 إلى 28 يوماً حسب الخط الملاحي والظروف الجوية.",
        },
        {
          question: "هل توفرون خدمة الشحن الجزئي (LCL) للبضائع ذات الحجم الصغير؟",
          answer:
            "نعم بالتأكيد. نوفر خدمة تجميع البضائع الجزئية (LCL) أسبوعياً من مستودعاتنا في إيوا وغوانزو، حيث يمكنك شحن أي كمية بدءاً من 1 CBM فقط دون الحاجة لحجز حاوية كاملة.",
        },
        {
          question: "كيف تؤثر العطل الرسمية بالصين على مواعيد الشحن؟",
          answer:
            "خلال العطل الرسمية الكبرى كعطلة اليوم الوطني الصيني (1-7 أكتوبر) وعيد رأس السنة الصينية، تتوقف المصانع الصينية وبعض الموانئ عن العمل. لذلك نوصي بتسليم البضائع لمستودعاتنا قبل العطلة بأسبوع على الأقل لضمان تحميلها.",
        },
        {
          question: "هل تشمل خدماتكم التخليص الجمركي في سوريا والتوصيل للمستودع؟",
          answer:
            "نعم، خدماتنا شاملاً ومكتملة من الباب إلى الباب (Door-to-Door). نقوم باستلام البضائع بالصين، الشحن، التخليص الجمركي الكامل في الموانئ السورية، والتوصيل النهائي بسياراتنا لمستودعك في أي محافظة.",
        },
        {
          question: "ما هي الأوراق والوثائق المطلوبة لبدء عملية الشحن؟",
          answer:
            "نحتاج فقط إلى الفاتورة التجارية (Commercial Invoice) وقائمة التعبئة (Packing List). يقفل فريقنا بالصين إصدار شهادات المنشأ والبيان الجمركي وكافة الوثائق اللازمة.",
        },
      ],
    },
    contact: {
      sectionTag: "تواصل معنا",
      title: "نحن هنا لخدمتكم ومتابعة شحناتكم",
      subtitle: "تواصل مع مكاتبنا في الصين وسوريا أو قم بزيارتنا للحصول على استشارة لوجستية مجانية.",
      chinaTitle: "مكاتب ومستودعات الصين",
      guangzhouAddress: "غوانزو - حي يوشيو - المركز التجاري الدولي - برج A - طابق 12",
      yiwuAddress: "إيوا - المنطقة الصناعية Chouzhou North Rd - مستودعات S.A. اللوجستية المركزية",
      syriaTitle: "مكاتب سوريا الرئيسية",
      damascusAddress: "دمشق - المزرعة - شارع الملك عادل - بناء الفرسان التجاري",
      lattakiaAddress: "اللاذقية - شارع المرفأ - مقابل البوابة الرئيسية لمركبات الشحن",
      phoneLabel: "الهاتف المباشر / الاستعلامات:",
      emailLabel: "البريد الإلكتروني:",
      whatsappBtn: "محادثة سريعة عبر الواتساب",
    },
    footer: {
      description:
        "S.A. LOGISTICS - حلول لوجستية متقدمة ونقل محترف للبضائع من الصين إلى سوريا بأعلى مستويات الجودة والأمان والتأمين الشامل.",
      quickLinks: "روابط سريعة",
      servicesTitle: "خدمات الشحن",
      officesTitle: "مكاتبنا الرئيسية",
      rights: "جميع الحقوق محفوظة © 2026 شركة S.A. LOGISTICS للخدمات اللوجستية.",
      chinaTagline: "PEOPLE CARGO GLOBAL REACH BETTER TOMORROW",
      directContactTitle: "التواصل المباشر والاستعلامات",
      backToTop: "العودة للأعلى",
    },
  },
  en: {
    header: {
      brandName: "S.A. LOGISTICS",
      brandSubtitle: "Smart Solutions for Advance Logistics",
      nav: {
        home: "Home",
        services: "Services",
        tracking: "Track Cargo",
        holidays: "China Holidays 2026",
        calculator: "Rate Calculator",
        process: "Shipping Steps",
        whyUs: "Why Choose Us",
        faq: "FAQ",
        contact: "Contact",
      },
      contactPhone: "+963 944 000 000",
      whatsappText: "Direct WhatsApp",
      quoteBtn: "Request Quote",
      languageName: "العربية",
    },
    hero: {
      badge: "15+ Years of China to Syria Logistics Excellence",
      titleStart: "Your Trusted Partner for Freight & Shipping from",
      titleHighlight: "China to Syria",
      titleEnd: "with World-Class Speed & Safety",
      subtitle:
        "Comprehensive Sea & Air freight solutions, fast customs clearance at Syrian ports, and state-of-the-art consolidation warehouses in Yiwu & Guangzhou.",
      primaryCta: "Calculate Shipping Cost",
      secondaryCta: "China Holidays 2026 Schedule",
      quickTrackPlaceholder: "Enter Tracking or Bill of Lading (e.g. SA-8842-SY)...",
      quickTrackBtn: "Track Cargo",
      highlights: {
        weeklySailings: "Confirmed Weekly Maritime Sailings",
        chinaWarehouses: "China Warehousing & QC Hubs",
        syrianClearance: "Clearance in Lattakia, Tartous & Damascus",
      },
      stats: {
        containers: "+12,500",
        containersLabel: "Containers Successfully Shipped",
        deliveryRate: "99.4%",
        deliveryRateLabel: "On-Time Delivery Rate",
        syriaHubs: "4 Hubs",
        syriaHubsLabel: "Direct Syrian Customs Clearance",
        chinaWarehouses: "2 Major Hubs",
        chinaWarehousesLabel: "In Yiwu & Guangzhou for Packing",
      },
      routeCard: {
        title: "Direct Shipping Route (China ⬅️ Syria)",
        airOption: "Express Air Freight ✈️",
        airDays: "3 - 5 Days",
        seaOption: "Regular Sea Freight 🚢",
        seaDays: "22 - 28 Days",
        origin: "Guangzhou / Yiwu / Ningbo",
        destination: "Lattakia / Tartous / Damascus",
        statusBadge: "Confirmed Weekly Sailings",
        liveContainer: "40ft High Cube Container",
        containerType: "Real-time GPS Tracking & Full Insurance",
        airportDest: "Damascus Int'l Airport",
        portsDest: "Lattakia & Tartous Ports",
        transitStatus: "In Transit",
        ctaBtn: "Get Shipping Consultation Now",
        insuranceBadge: "100% Cargo Insurance Coverage",
        originHub: "Yiwu / Guangzhou",
        destHub: "Lattakia / Damascus",
        saHubsLabel: "S.A. Hubs",
        finalDeliveryLabel: "Final Delivery",
      },
    },
    holidaysNotice: {
      tag: "Important Announcement for Importers",
      title: "China Official Holidays 2026",
      subtitle:
        "To help streamline your logistics schedule and shipment timings, please note the official public holiday dates in China during the upcoming period:",
      fromText: "From Date",
      toText: "To Date",
      alertMessage:
        "Please account for holiday closures when handing over cargo to ensure smooth shipping operations and avoid factory or port delays.",
      adviceTitle: "S.A. LOGISTICS Advice for Shippers:",
      adviceText:
        "We strongly advise finalizing cargo dispatch from factories before September 20th to secure spots on the last vessels departing prior to Golden Week.",
      mainScheduleTitle: "Official China Public Holidays Schedule 2026",
      holidayClosure: "Chinese Factories & Ports Closure",
      verifiedBadge: "Verified Shipping Schedule Update",
      holidays: [
        {
          id: "mid-autumn",
          name: "Mid-Autumn Festival Holiday",
          startDate: "25/09/2026",
          endDate: "27/09/2026",
          icon: "moon",
        },
        {
          id: "national-day",
          name: "China National Day Holiday (Golden Week)",
          startDate: "01/10/2026",
          endDate: "07/10/2026",
          icon: "building",
        },
      ],
    },
    tracking: {
      sectionTag: "Live Tracking System",
      title: "Track Your Cargo in Real-Time",
      subtitle:
        "Enter your tracking code to follow your cargo journey step-by-step from China warehouses to Syrian ports.",
      inputPlaceholder: "Enter tracking number (e.g. SA-8842-SY or SA-9102-GZ)...",
      trackBtn: "Track",
      sampleClick: "Or click a demo tracking code below:",
      demoCodes: ["SA-8842-SY", "SA-9102-GZ", "SA-7731-YW"],
      notFound: "No shipment found with this tracking number. Please check and try again.",
      resultTitle: "Shipment Overview",
      originLabel: "Origin Hub",
      destLabel: "Final Destination",
      etaLabel: "Estimated Delivery",
      typeLabel: "Service Type",
      weightLabel: "Total Weight",
      volLabel: "Total Volume",
      journeyTitle: "Cargo Journey Timeline",
      trackingCodeLabel: "Tracking Number",
    },
    calculator: {
      sectionTag: "Shipping Cost Estimator",
      title: "Instant Shipping Rate Calculator",
      subtitle: "Enter your cargo dimensions or weight for an instant estimate to Syria.",
      shippingType: "Transportation Mode",
      seaType: "Sea Freight (CBM)",
      airType: "Air Cargo (KG)",
      originCity: "China Loading City",
      destCity: "Syria Destination City",
      weightLabel: "Approx Weight (KG)",
      cbmLabel: "Approx Volume (CBM)",
      goodsType: "Cargo Category",
      generalCargo: "General Goods & Home Items",
      textiles: "Textiles & Garments",
      electronics: "Electronics & Devices",
      machinery: "Heavy Machinery & Equipment",
      calculateBtn: "Calculate Estimate",
      estimatedCost: "Estimated Total Freight Cost",
      disclaimer: "* Rates are indicative and subject to final packing list verification & fuel surcharges.",
      includes: [
        "Includes receiving & sorting at China hub",
        "Includes secure palletizing & containerization",
        "Includes Syrian port manifest processing",
      ],
      confirmBtn: "Confirm Quote & Book Cargo",
      cbmRateLabel: "Rate for Volume",
      kgRateLabel: "Rate for Weight",
      seaLclHint: "0.5 CBM (LCL Parcel)",
      sea20Hint: "30 CBM (20ft Container)",
      sea40Hint: "68 CBM (40ft HQ Container)",
      destOptions: {
        damascus: "Damascus & Suburbs (Inland Trucking Included)",
        lattakia: "Lattakia (Lattakia Port Delivery)",
        tartous: "Tartous (Tartous Port Delivery)",
        aleppo: "Aleppo (Inland Trucking Included)",
        homs: "Homs & Hama (Inland Trucking Included)",
      },
    },
    services: {
      sectionTag: "Our Comprehensive Services",
      title: "Complete China to Syria Logistics Solutions",
      subtitle: "Tailored freight options for every cargo size with guaranteed inspection & safety.",
      detailsBtn: "Request Service Details",
      items: [
        {
          id: "sea-freight",
          title: "Sea Freight (FCL & LCL)",
          description:
            "Full Container Loads (FCL) or Less than Container Loads (LCL) consolidation from Ningbo, Shenzhen & Guangzhou to Lattakia and Tartous ports.",
          iconName: "ship",
          badge: "Most Popular",
          features: ["20ft & 40ft High Cube", "Weekly LCL consolidations", "Full cargo marine insurance"],
        },
        {
          id: "air-freight",
          title: "Express Air Freight",
          description:
            "Ultra-fast air cargo for urgent shipments and commercial samples delivering within 3 to 5 days with airport clearance.",
          iconName: "plane",
          badge: "Express Speed",
          features: ["Scheduled air flights", "Rapid airport clearance", "Ideal for electronics & samples"],
        },
        {
          id: "warehousing",
          title: "China Consolidation & Quality Control",
          description:
            "Modern warehouses in Yiwu & Guangzhou to receive cargo from multiple suppliers, conduct QC inspections, and repack securely.",
          iconName: "warehouse",
          badge: "Owned Hubs",
          features: ["Yiwu Central Warehouse", "Guangzhou Trade Hub", "Quality verification & crates"],
        },
        {
          id: "customs-clearance",
          title: "Syrian Customs Clearance",
          description:
            "Experienced team providing swift and compliant customs handling across Syrian sea and land ports.",
          iconName: "file-check",
          badge: "15+ Yrs Expertise",
          features: ["Customs declaration issue", "Duty optimization", "Official permit acquisition"],
        },
        {
          id: "door-delivery",
          title: "Inland Syrian Delivery",
          description:
            "Direct container trucking from ports straight to your store or warehouse door in Damascus, Aleppo, Homs, and Lattakia.",
          iconName: "truck",
          badge: "Door-to-Door",
          features: ["Modern trailer fleet", "GPS tracked transport", "Safe door delivery"],
        },
        {
          id: "financial-support",
          title: "Supplier Settlement & Documentation",
          description:
            "Commercial support for secure payments to Chinese manufacturers, invoice verification, and Certificate of Origin processing.",
          iconName: "coins",
          badge: "Trade Support",
          features: ["Secure payment assistance", "Invoice & COO authentication", "China supplier liaison"],
        },
      ],
    },
    process: {
      sectionTag: "Workflow Process",
      title: "How Your Cargo Reaches Syria Safely",
      subtitle: "A streamlined 5-step shipping process designed for seamless reliability.",
      securedBadge: "Verified & Secured Step",
      steps: [
        {
          number: "01",
          title: "Cargo Collection",
          description: "Cargo is collected from Chinese factories and brought to our Yiwu or Guangzhou warehouse.",
          location: "China Warehouses",
        },
        {
          number: "02",
          title: "QC & Consolidation",
          description: "Our team inspects, reinforces packaging, and generates bill of lading & tracking code.",
          location: "Yiwu / Guangzhou Hub",
        },
        {
          number: "03",
          title: "Loading & China Customs",
          description: "Container loading or air palletizing with export declaration at Chinese exit ports.",
          location: "Ningbo / Guangzhou Port",
        },
        {
          number: "04",
          title: "International Transit",
          description: "Live sea sailing or air transit monitored by our 24/7 logistics desk.",
          location: "Maritime / Air Route",
        },
        {
          number: "05",
          title: "Clearance & Door Delivery",
          description: "Fast customs clearance in Lattakia/Tartous and final trucking to your warehouse in Syria.",
          location: "Lattakia / Damascus / Aleppo",
        },
      ],
    },
    whyUs: {
      sectionTag: "Our Strengths",
      title: "Why Leading Importers Choose S.A. LOGISTICS?",
      subtitle: "We don't just move cargo—we protect your business supply chain with total dedication.",
      guaranteeBadge: "Guaranteed Standard Specs",
      features: [
        {
          title: "Deep Syrian Market & Customs Knowledge",
          description: "15+ years of specialized experience ensuring hassle-free clearance at Syrian ports.",
          icon: "shield-check",
        },
        {
          title: "Owned Logistics Hubs in China",
          description: "Bilingual staff stationed on the ground in Guangzhou & Yiwu for direct supplier handling.",
          icon: "building-2",
        },
        {
          title: "Transparent & Competitive Freight Pricing",
          description: "Zero hidden fees. Full breakdown of shipping and clearance rates provided upfront.",
          icon: "award",
        },
        {
          title: "24/7 Live Tracking & Full Marine Insurance",
          description: "Real-time updates and complete coverage protecting your cargo against all transit risks.",
          icon: "clock",
        },
      ],
    },
    quoteModal: {
      title: "Request a Custom Freight Quote",
      subtitle: "Provide your shipment details and our cargo specialist will contact you within 30 minutes.",
      namePlaceholder: "Full Name / Company Name",
      phonePlaceholder: "Phone / WhatsApp (e.g. +963 944 000000)",
      companyPlaceholder: "Cargo category & volume",
      typeLabel: "Select Freight Mode",
      detailsPlaceholder: "Additional notes (weight, CBM, special handling, China loading city)...",
      submitBtn: "Submit Quote Request",
      successMessage: "Thank you! Your quote request has been received. S.A. LOGISTICS team will contact you shortly.",
      seaOptionBtn: "Sea Freight (FCL/LCL)",
      airOptionBtn: "Express Air Freight",
      responseGuarantee: "Fast Response Within 30 Mins",
      successTitle: "Quote Request Received Successfully!",
    },
    testimonials: {
      sectionTag: "Client Testimonials",
      title: "Trusted by Syrian Merchants & Importers",
      subtitle: "Hear what top business leaders across Syria say about shipping with S.A. LOGISTICS.",
      items: [
        {
          id: "1",
          name: "Mr. Mohammad Al-Khatib",
          company: "Al-Khatib Electronics Importing",
          city: "Damascus - Syria",
          quote:
            "We have been shipping container loads from Yiwu with S.A. LOGISTICS for over 5 years. Their clearance speed at Lattakia port is unmatched.",
          rating: 5,
        },
        {
          id: "2",
          name: "Haj Ahmad Al-Baradei",
          company: "Baradei Textile Establishment",
          city: "Aleppo - Syria",
          quote:
            "Their China consolidation hub saved us enormous money. They collect from 4 factories into one 40ft HQ container seamlessly.",
          rating: 5,
        },
        {
          id: "3",
          name: "Eng. Samer Al-Masri",
          company: "Afaq Industrial Lines Co.",
          city: "Lattakia - Syria",
          quote:
            "Their express air cargo and airport clearance for machinery spare parts is highly reliable and transparent.",
          rating: 5,
        },
      ],
    },
    faq: {
      sectionTag: "Frequently Asked Questions",
      title: "Answers to Common Questions",
      subtitle: "Everything you need to know about China to Syria logistics and customs procedures.",
      items: [
        {
          question: "How long does sea freight take from China to Syrian ports?",
          answer:
            "Direct maritime voyage from major China ports (Ningbo, Guangzhou, Shenzhen) to Lattakia or Tartous port takes approximately 22 to 28 days depending on the shipping line.",
        },
        {
          question: "Do you offer LCL (Less than Container Load) for small cargo?",
          answer:
            "Yes! We provide weekly LCL consolidation from our Yiwu and Guangzhou hubs. You can ship starting from just 1 CBM without needing to rent a full container.",
        },
        {
          question: "How do China Official Holidays affect shipment schedules?",
          answer:
            "During major holidays like China National Day (Oct 1-7) and Chinese New Year, factories close. We recommend delivering cargo to our warehouses at least 7 days prior to maintain sailing dates.",
        },
        {
          question: "Does your service cover door-to-door delivery inside Syria?",
          answer:
            "Yes, we provide end-to-end door-to-door logistics: pickup in China, sea/air shipping, full customs clearance, and direct inland trucking to your warehouse in any Syrian governorate.",
        },
        {
          question: "What documents are required to initiate shipping?",
          answer:
            "We simply require the Commercial Invoice and Packing List. Our team handles Certificate of Origin, manifest filings, and port clearance documentation.",
        },
      ],
    },
    contact: {
      sectionTag: "Contact Us",
      title: "We Are Here to Assist Your Business",
      subtitle: "Connect with our offices in China and Syria or visit us for a free logistics consultation.",
      chinaTitle: "China Offices & Hubs",
      guangzhouAddress: "Guangzhou - Yuexiu District - Int'l Trade Center - Tower A, 12th Fl",
      yiwuAddress: "Yiwu - Chouzhou North Rd Industrial Zone - S.A. Logistics Central Hub",
      syriaTitle: "Syria Head Offices",
      damascusAddress: "Damascus - Mazraa - King Adel St - Al-Fursan Commercial Bldg",
      lattakiaAddress: "Lattakia - Port St - Opposite Main Freight Gate",
      phoneLabel: "Direct Phone / Inquiries:",
      emailLabel: "Official Email:",
      whatsappBtn: "Chat on WhatsApp Now",
    },
    footer: {
      description:
        "S.A. LOGISTICS - Advanced logistics solutions and professional freight handling from China to Syria with uncompromised quality and full cargo insurance.",
      quickLinks: "Quick Navigation",
      servicesTitle: "Freight Services",
      officesTitle: "Our Hubs",
      rights: "All Rights Reserved © 2026 S.A. LOGISTICS Co.",
      chinaTagline: "PEOPLE CARGO GLOBAL REACH BETTER TOMORROW",
      directContactTitle: "Direct Inquiries & Contact",
      backToTop: "Back to Top",
    },
  },
};
