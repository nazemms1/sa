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
      gateways: string;
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
    taglineHeader: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    companyStatement: string;
    primaryCta: string;
    secondaryCta: string;
    quickTrackPlaceholder: string;
    quickTrackBtn: string;
    highlights: {
      airSeaFclLcl: string;
      regionalExpertise: string;
      finalDelivery: string;
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
  gateways: {
    sectionTag: string;
    title: string;
    subtitle: string;
    latakiaTitle: string;
    beirutTitle: string;
    aqabaTitle: string;
    features: string[];
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
    motto: string;
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
    officialAddress: string;
    officialPhone: string;
    officialEmail: string;
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
      status: "في الطريق البحري نحو ميناء اللاذقية",
      statusColor: "bg-amber-100 text-amber-800 border-amber-300",
      origin: "مستودع إيوا المركز (الصين)",
      destination: "ميناء اللاذقية (سوريا)",
      type: "شحن بحري جزئي LCL Consolidation",
      estimatedDelivery: "28 أيلول 2026",
      weight: "4,250 كغ",
      volume: "18.5 CBM",
      steps: [
        { title: "استلام وتجميع البضائع", date: "02 أيلول 2026", location: "مستودع S.A. في إيوا", completed: true },
        { title: "التغليف وفحص الجودة", date: "04 أيلول 2026", location: "مستودع إيوا المركز", completed: true },
        { title: "تحميل الحاوية والجمارك", date: "07 أيلول 2026", location: "ميناء نينغبو الصيني", completed: true },
        { title: "مغادرة السفينة للميناء", date: "10 أيلول 2026", location: "الخط البحري الآسيوي", completed: true, current: true },
        { title: "الوصول والتخليص الجمركي", date: "24 أيلول 2026", location: "ميناء اللاذقية السوري", completed: false },
        { title: "التسليم لباب المستودع", date: "28 أيلول 2026", location: "دمشق - شارع الحمراء", completed: false },
      ],
    },
    "SA-9102-GZ": {
      code: "SA-9102-GZ",
      status: "وصل مطار دمشق الدولي",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      origin: "مطار غوانزو الدولي (الصين)",
      destination: "مطار دمشق الدولي (سوريا)",
      type: "شحن جوي سريع Air Freight Solutions",
      estimatedDelivery: "22 أيلول 2026",
      weight: "380 كغ",
      volume: "1.8 CBM",
      steps: [
        { title: "استلام البضائع بالصين", date: "18 أيلول 2026", location: "مكتب S.A. غوانزو", completed: true },
        { title: "الفحص وإصدار البوليصة الجوية", date: "19 أيلول 2026", location: "مطار غوانزو الدولي", completed: true },
        { title: "الإقلاع والترانزيت", date: "20 أيلول 2026", location: "رحلة الشحن الجوي", completed: true },
        { title: "وصول المطار والتخليص النهائي", date: "21 أيلول 2026", location: "مطار دمشق الدولي", completed: true, current: true },
        { title: "تسليم الشحنة للعميل", date: "22 أيلول 2026", location: "دمشق - سوريا", completed: false },
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
      origin: "Yiwu Central Hub (China)",
      destination: "Lattakia Port (Syria)",
      type: "Sea Freight LCL Consolidation",
      estimatedDelivery: "Sep 28, 2026",
      weight: "4,250 KG",
      volume: "18.5 CBM",
      steps: [
        { title: "Cargo Pickup & Consolidation", date: "Sep 02, 2026", location: "S.A. Yiwu Hub", completed: true },
        { title: "Quality Check & Crating", date: "Sep 04, 2026", location: "Yiwu Central Warehouse", completed: true },
        { title: "Container Stuffing & Customs", date: "Sep 07, 2026", location: "Ningbo Port, China", completed: true },
        { title: "Ocean Vessel Departure", date: "Sep 10, 2026", location: "Asian Sea Transit Route", completed: true, current: true },
        { title: "Port Arrival & Customs Clearance", date: "Sep 24, 2026", location: "Lattakia Port, Syria", completed: false },
        { title: "Final Delivery to Warehouse", date: "Sep 28, 2026", location: "Al-Hamra St, Damascus", completed: false },
      ],
    },
    "SA-9102-GZ": {
      code: "SA-9102-GZ",
      status: "Arrived at Damascus Int'l Airport",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      origin: "Guangzhou Int'l Airport (China)",
      destination: "Damascus Int'l Airport (Syria)",
      type: "Express Air Freight Solutions",
      estimatedDelivery: "Sep 22, 2026",
      weight: "380 KG",
      volume: "1.8 CBM",
      steps: [
        { title: "Origin Air Pickup", date: "Sep 18, 2026", location: "S.A. Guangzhou Hub", completed: true },
        { title: "Air Cargo Booking & AWB", date: "Sep 19, 2026", location: "Guangzhou Int'l Airport", completed: true },
        { title: "International Flight Transit", date: "Sep 20, 2026", location: "Air Cargo Flight", completed: true },
        { title: "Airport Handling & Clearance", date: "Sep 21, 2026", location: "Damascus Int'l Airport", completed: true, current: true },
        { title: "Final Door Delivery", date: "Sep 22, 2026", location: "Damascus, Syria", completed: false },
      ],
    },
    "SA-7731-YW": {
      code: "SA-7731-YW",
      status: "Consolidation & Packing in Yiwu",
      statusColor: "bg-blue-100 text-blue-800 border-blue-300",
      origin: "Yiwu Hub (China)",
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
      brandSubtitle: "Smart Solutions for Advance Logistics",
      nav: {
        home: "الرئيسية",
        services: "خدمات الشحن",
        gateways: "المنافذ والموانئ",
        tracking: "تتبع شحنتك",
        holidays: "عطل الصين 2026",
        calculator: "حاسبة الأسعار",
        process: "خطوات التنسيق",
        whyUs: "لماذا نحن",
        faq: "الأسئلة الشائعة",
        contact: "اتصل بنا",
      },
      contactPhone: "+963 9666 42574",
      whatsappText: "واتساب مباشر",
      quoteBtn: "طلب سعر شحن",
      languageName: "English",
    },
    hero: {
      badge: "INTERNATIONAL FREIGHT FORWARDING & LOGISTICS",
      taglineHeader: "FROM WORLDWIDE ORIGINS",
      titleStart: "GLOBAL FREIGHT. REGIONAL EXPERTISE.",
      titleHighlight: "RELIABLE DELIVERY",
      titleEnd: "TO SYRIA.",
      subtitle:
        "International Air Freight | Sea Freight | FCL | LCL | Customs Clearance | Inland Transportation | Final Delivery",
      companyStatement:
        "SA LOGISTICS connects businesses worldwide with Syria through reliable, coordinated freight forwarding and logistics solutions.",
      primaryCta: "احسب تكلفة شحنتك فوراً",
      secondaryCta: "جدول العطل الرسمية بالصين 2026",
      quickTrackPlaceholder: "أدخل رقم البوليصة أو التتبع (مثال: SA-8842-SY)...",
      quickTrackBtn: "تتبع الشحنة",
      highlights: {
        airSeaFclLcl: "Air & Sea Freight (FCL / LCL)",
        regionalExpertise: "خبرة إقليمية وتخليص جمركي موثوق",
        finalDelivery: "نقل داخلي وتسليم لباب المستودع",
      },
      stats: {
        containers: "+12,500",
        containersLabel: "حاوية وطرد مشحون بنجاح",
        deliveryRate: "99.4%",
        deliveryRateLabel: "نسبة التسليم الملتزم بالموعد",
        syriaHubs: "4 منافذ رئيسية",
        syriaHubsLabel: "تخليص جمركي سوري مباشر",
        chinaWarehouses: "2 مستودعات مركزية",
        chinaWarehousesLabel: "في إيوا وغوانزو لجمع البضائع",
      },
      routeCard: {
        title: "تنسيق الشحن المتكامل (العالم ⬅️ سوريا)",
        airOption: "الشحن الجوي السريع ✈️",
        airDays: "3 - 5 أيام",
        seaOption: "الشحن البحري المنتظم 🚢",
        seaDays: "22 - 28 يوماً",
        origin: "المصادر العالمية / الصين",
        destination: "موانئ ومطارات سوريا",
        statusBadge: "ONE COORDINATED LOGISTICS SOLUTION",
        liveContainer: "حاوية 40 قدم هيدروليك HQ",
        containerType: "متابعة لحظية وتغطية تأمينية شاملة",
        airportDest: "مطار دمشق الدولي",
        portsDest: "موانئ اللاذقية وبيروت والعقبة",
        transitStatus: "IN TRANSIT",
        ctaBtn: "احصل على استشارة وتثبيت الشحن",
        insuranceBadge: "تغطية تأمينية 100%",
        originHub: "مستودعات الصين والعالم",
        destHub: "موانئ دمشق واللاذقية",
        saHubsLabel: "مراكز تجميع S.A.",
        finalDeliveryLabel: "التسليم النهائي",
      },
    },
    gateways: {
      sectionTag: "KEY REGIONAL GATEWAYS",
      title: "منافذ وموانئ الوصول الرئيسية إلى سوريا",
      subtitle: "نربط البضائع القادمة من مختلف المصادر العالمية عبر أهم الموانئ والمنافذ الملاحية والجريّة الإقليمية.",
      latakiaTitle: "ميناء اللاذقية (LATAKIA PORT)",
      beirutTitle: "ميناء بيروت (BEIRUT PORT)",
      aqabaTitle: "ميناء العقبة (AQABA PORT)",
      features: [
        "FCL Container Shipping (حاويات كاملة)",
        "LCL Consolidation (شحن تجميعي جزئي)",
        "Port Coordination (تنسيق الموانئ)",
        "Shipping Documentation (الوثائق الملاحية)",
        "Customs Clearance (التخليص الجمركي)",
        "Transit Cargo (بضائع الترانزيت)",
        "Inland Transportation (النقل الداخلي)",
        "Final Delivery (التسليم لباب المستودع)",
      ],
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
      originCity: "مدينة التحميل بالصين / العالم",
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
        "شامل الاستلام والفرز بمستودعاتنا في الصين والعالم",
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
      sectionTag: "COMPLETE LOGISTICS SOLUTIONS",
      title: "خدماتنا اللوجستية الشاملة",
      subtitle:
        "نضع بين يديك منظومة شحن احترافية تناسب كافة أنواع البضائع والكميات مع ضمان السلامة والتفتيش من المبدأ حتى باب المستودع.",
      detailsBtn: "طلب تفاصيل الخدمة",
      items: [
        {
          id: "sea-freight",
          title: "SEA FREIGHT (FCL & LCL)",
          description:
            "حلول نقل كامل للحاويات (FCL) أو شحن جزئي تجميعي (LCL) من المصادر العالمية وموانئ نينغبو وشورزو وغوانزو إلى ميناء اللاذقية وبيروت والعقبة.",
          iconName: "ship",
          badge: "FCL / LCL",
          features: ["Dedicated Container Solutions", "Flexible Consolidation", "Full Marine Insurance"],
        },
        {
          id: "air-freight",
          title: "AIR FREIGHT SOLUTIONS",
          description:
            "خدمة الشحن الجوي الدولي السريع للشحنات المستعجلة، المواد الطبية والأدوية، الشحنات الإغاثية والعينات التجارية مع التخليص بمطار دمشق الدولي.",
          iconName: "plane",
          badge: "EXPRESS AIR",
          features: ["Import & Export Air Freight", "Priority & Time-Critical", "Airport Clearance & Final Delivery"],
        },
        {
          id: "road-transit",
          title: "ROAD TRANSPORT & TRANSIT",
          description:
            "حلول النقل البري المحلي والإقليمي والعابر للحدود (Transit Cargo) مع أسطول شاحنات حديث مخصص للتسليم النهائي والموانئ البرية.",
          iconName: "truck",
          badge: "TRANSIT",
          features: ["Domestic & Regional Transport", "Cross-Border Logistics", "Final-Mile Delivery"],
        },
        {
          id: "customs-clearance",
          title: "CUSTOMS CLEARANCE",
          description:
            "إدارة متكاملة لإجراءات الاستيراد والتصدير، الترانزيت، توثيق المستندات وتنسيق إطلاق الشحنات في المنافذ البحرية والجوية والبرية.",
          iconName: "file-check",
          badge: "EXPERTISE",
          features: ["Import & Export Procedures", "Customs Documentation", "Cargo Release Coordination"],
        },
        {
          id: "special-project",
          title: "SPECIAL & PROJECT CARGO",
          description:
            "شحن وتداول المعدات والآلات الثقيلة، قطع الغيار، البضائع ذات الأحجام الضخمة (Oversized) والبضائع الخاضعة لإجراءات خاصة.",
          iconName: "warehouse",
          badge: "PROJECT CARGO",
          features: ["Heavy Machinery & Lines", "Oversized Cargo Handling", "Regulated Shipments Support"],
        },
        {
          id: "financial-support",
          title: "END-TO-END COORDINATION",
          description:
            "تنسيق لوجستي متكامل من حجز الشحنة واستلامها من المصانع حتى التخليص النهائي وتسديد الفواتير والتسليم بأعلى درجات الأمان.",
          iconName: "coins",
          badge: "END-TO-END",
          features: ["Full Operational Tracking", "Documentation Verification", "Responsive Service"],
        },
      ],
    },
    process: {
      sectionTag: "COMPLETE LOGISTICS COORDINATION",
      title: "إدارة المسار التشغيلي المتكامل (5 مراحل)",
      subtitle: "منظومة عمل موحدة تضمن لك متابعة شحنتك من حجز الشحن الدولي مروراً بالتخليص الجمركي وحتى التسليم النهائي.",
      securedBadge: "خطوة مكتملة ومؤمنة",
      steps: [
        {
          number: "01",
          title: "AIR FREIGHT (الشحن الجوي)",
          description: "شحن جوي دولي للبضائع العامة، المستعجلة، الطبية والإغاثية والمواد الخاصة.",
          location: "المطارات العالمية ➔ دمشق",
        },
        {
          number: "02",
          title: "SEA FREIGHT (الشحن البحري)",
          description: "حلول الحاوية الكاملة FCL والشحن الجزئي LCL لربط المصادر العالمية بالمنافذ الإقليمية.",
          location: "الموانئ العالمية ➔ اللاذقية/بيروت/العقبة",
        },
        {
          number: "03",
          title: "ROAD TRANSPORT & TRANSIT",
          description: "خدمات النقل البري المحلي والإقليمي والترانزيت عبر الحدود الإقليمية.",
          location: "المنافذ والحدود البرية",
        },
        {
          number: "04",
          title: "CUSTOMS CLEARANCE",
          description: "التخريج الجمركي، إعداد الوثائق، استخراج الموافقات والإفراج عن الشحنة.",
          location: "الموانئ والمطارات السورية",
        },
        {
          number: "05",
          title: "SPECIAL & PROJECT CARGO",
          description: "نقل الآلات، خطوط الإنتاج، القطع الضخمة والتسليم لباب المستودع النهائي.",
          location: "دمشق / اللاذقية / حلب",
        },
      ],
    },
    whyUs: {
      sectionTag: "WHY SA LOGISTICS?",
      title: "لماذا تختار شركة S.A. LOGISTICS؟",
      subtitle: "LOCAL KNOWLEDGE. REGIONAL REACH. INTERNATIONAL CONNECTIVITY.",
      guaranteeBadge: "YOUR CARGO. OUR COMMITMENT.",
      motto: "LET'S MOVE YOUR CARGO TO SYRIA.",
      features: [
        {
          title: "GLOBAL CONNECTIVITY",
          description: "حلول شحن دولية متكاملة تنطلق من جميع المصادر والأسواق العالمية.",
          icon: "shield-check",
        },
        {
          title: "SYRIA & LEVANT EXPERTISE",
          description: "دراية عميقة ودقيقة بالإجراءات والأنظمة الجمركية واللوجستية في سوريا والمنطقة.",
          icon: "building-2",
        },
        {
          title: "END-TO-END COORDINATION",
          description: "تنسيق كامل يبدأ من حجز الشحنة مروراً بالوثائق وحتى التخليص والتسليم النهائي.",
          icon: "award",
        },
        {
          title: "CUSTOMER-FOCUSED OPERATIONS",
          description: "حلول مخصصة تعتمد على نوع البضاعة، درجة الاستعجال، الوجهة ومتطلبات التشغيل.",
          icon: "clock",
        },
      ],
    },
    quoteModal: {
      title: "Request a Custom Freight Quote",
      subtitle: "أدخل تفاصيل شحنتك وسيتواصل معك مستشار الشحن في S.A. LOGISTICS خلال 30 دقيقة.",
      namePlaceholder: "Full Name / Company Name",
      phonePlaceholder: "Phone / WhatsApp (+963 9666 42574)",
      companyPlaceholder: "Cargo category & volume",
      typeLabel: "Select Freight Mode",
      detailsPlaceholder: "Additional notes (Weight, CBM, Origin port, Destination in Syria)...",
      submitBtn: "Submit Quote Request",
      successMessage: "Thank you! Your quote request has been received. S.A. LOGISTICS team will contact you shortly.",
      seaOptionBtn: "Sea Freight (FCL/LCL)",
      airOptionBtn: "Express Air Freight",
      responseGuarantee: "Fast Response Within 30 Mins",
      successTitle: "Quote Request Received Successfully!",
    },
    testimonials: {
      sectionTag: "CLIENT TRUST",
      title: "ماذا يقول شركاؤنا وتجار سوريا؟",
      subtitle: "ثقة مئات الشركات التجارية والصناعية في دمشق وحلب واللاذقية هي وسام فخرنا.",
      items: [
        {
          id: "1",
          name: "الأستاذ محمد الخطيب",
          company: "شركة الخطيب لاستيراد الإلكترونيات",
          city: "دمشق - سوريا",
          quote:
            "تعاملنا مع S.A. LOGISTICS لأكثر من 5 سنوات في شحن الحاويات. السرعة والتنسيق في ميناء اللاذقية والتخليص ممتاز جداً ودون أي تأخير.",
          rating: 5,
        },
        {
          id: "2",
          name: "الحاج أحمد البرادعي",
          company: "مؤسسة البرادعي لتجارة الأقمشة",
          city: "حلب - سوريا",
          quote:
            "خدمة التجميع والشحن الجزئي LCL أراحتنا كثيراً. نجمع البضائع من عدة مصانع ويوصلونها بحاوية واحدة ملائمة وبأسعار منافسة.",
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
      sectionTag: "FREQUENTLY ASKED QUESTIONS",
      title: "الأسئلة الشائعة حول الشحن إلى سوريا",
      subtitle: "إجابات وافية على كافة الاستفسارات المتعلقة بموانئ الوصول، الشحن الجوي والبحري والتخليص.",
      items: [
        {
          question: "ما هي أهم الموانئ والمنافذ الإقليمية التي تستخدمونها للشحن إلى سوريا؟",
          answer:
            "نستخدم عدة منافذ رئيسية تشمل ميناء اللاذقية (LATAKIA PORT)، ميناء بيروت (BEIRUT PORT)، وميناء العقبة (AQABA PORT)، بالإضافة إلى مطار دمشق الدولي والمنافذ البرية الإقليمية.",
        },
        {
          question: "هل توفرون خدمات الشحن الكامل (FCL) والشحن التجميعي الجزئي (LCL)؟",
          answer:
            "نعم بالتأكيد. نوفر خدمات FCL للحاويات الكاملة مخصصة للشحنات الكبيرة، وخدمات LCL للشحنات والمرسلات الأكثر مرونة بدءاً من 1 CBM فقط.",
        },
        {
          question: "ما هي أنواع الشحنات الجوية المتاحة عبر خدماتكم؟",
          answer:
            "تشمل خدمات الشحن الجوي لدينا البضائع العامة، الشحنات المستعجلة (Priority & Time-Critical)، الأدوية والمواد الحساسة للحرارة (Pharmaceutical)، الشحنات الإغاثية (Humanitarian & Emergency)، والآلات والمعدات الخاصة.",
        },
        {
          question: "هل تشمل خدماتكم التخليص الجمركي والنقل الداخلي النهائي (Final-mile delivery)؟",
          answer:
            "نعم، خدماتنا شاملة ومكتملة من الباب إلى الباب (End-to-End Coordination): الاستلام من المصدر العالمي، الشحن الدولي، التخليص الجمركي الكامل، والنقل البري الداخلي حتى باب مستودعك في دمشق أو أي محافظة سورية.",
        },
        {
          question: "كيف يمكنني التواصل المباشر مع مكتب الشركة الرئيسي في دمشق؟",
          answer:
            "يمكنكم زيارة مكتبنا في دمشق - شارع الحمراء (بالقرب من فندق بلـو تاور)، أو الاتصال المباشر على الهاتف +963 9666 42574 أو البريد الإلكتروني الرسمي SA.LOGISTICS.SY@GMAIL.COM.",
        },
      ],
    },
    contact: {
      sectionTag: "YOUR CARGO. OUR COMMITMENT.",
      title: "تواصل مع فريق S.A. LOGISTICS",
      subtitle: "تواصل مع مكتبنا الرئيسي بدمشق أو مكاتبنا بالصين للحصول على استشارة لوجستية وتنسيق شحناتكم.",
      chinaTitle: "China Logistics Hubs",
      guangzhouAddress: "Guangzhou - Yuexiu District - Int'l Trade Center - Tower A",
      yiwuAddress: "Yiwu - Chouzhou North Rd Industrial Zone - S.A. Central Hub",
      syriaTitle: "المكتب الرئيسي في سوريا",
      damascusAddress: "دمشق - شارع الحمراء - بالقرب من فندق بلـو تاور (Blue Tower Hotel)",
      lattakiaAddress: "اللاذقية - شارع المرفأ - مقابل البوابة الرئيسية لمركبات الشحن",
      phoneLabel: "الهاتف المباشر:",
      emailLabel: "البريد الإلكتروني الرسمي:",
      whatsappBtn: "محادثة سريعة عبر الواتساب",
      officialAddress: "Al-Hamra St, Near Blue Tower Hotel, Damascus, Syria",
      officialPhone: "+963 9666 42574",
      officialEmail: "SA.LOGISTICS.SY@GMAIL.COM",
    },
    footer: {
      description:
        "S.A. LOGISTICS | INTERNATIONAL FREIGHT TO, FROM & THROUGH SYRIA. Reliable, coordinated freight forwarding and complete logistics solutions.",
      quickLinks: "Quick Navigation",
      servicesTitle: "Services",
      officesTitle: "Our Gateways",
      rights: "All Rights Reserved © 2026 S.A. LOGISTICS Co.",
      chinaTagline: "PEOPLE CARGO GLOBAL REACH BETTER TOMORROW",
      directContactTitle: "Direct Inquiries",
      backToTop: "Back to Top",
    },
  },
  en: {
    header: {
      brandName: "S.A. LOGISTICS",
      brandSubtitle: "Smart Solutions for Advance Logistics",
      nav: {
        home: "Home",
        services: "Services",
        gateways: "Regional Gateways",
        tracking: "Track Cargo",
        holidays: "China Holidays 2026",
        calculator: "Rate Calculator",
        process: "Coordination Steps",
        whyUs: "Why Choose Us",
        faq: "FAQ",
        contact: "Contact Us",
      },
      contactPhone: "+963 9666 42574",
      whatsappText: "Direct WhatsApp",
      quoteBtn: "Request Quote",
      languageName: "العربية",
    },
    hero: {
      badge: "INTERNATIONAL FREIGHT FORWARDING & LOGISTICS",
      taglineHeader: "FROM WORLDWIDE ORIGINS",
      titleStart: "GLOBAL FREIGHT. REGIONAL EXPERTISE.",
      titleHighlight: "RELIABLE DELIVERY",
      titleEnd: "TO SYRIA.",
      subtitle:
        "International Air Freight | Sea Freight | FCL | LCL | Customs Clearance | Inland Transportation | Final Delivery",
      companyStatement:
        "SA LOGISTICS connects businesses worldwide with Syria through reliable, coordinated freight forwarding and logistics solutions.",
      primaryCta: "Calculate Shipping Cost Now",
      secondaryCta: "China Holidays 2026 Schedule",
      quickTrackPlaceholder: "Enter Tracking or Bill of Lading (e.g. SA-8842-SY)...",
      quickTrackBtn: "Track Cargo",
      highlights: {
        airSeaFclLcl: "Air & Sea Freight (FCL / LCL)",
        regionalExpertise: "Regional Expertise & Reliable Customs",
        finalDelivery: "Inland Transport & Final Delivery",
      },
      stats: {
        containers: "+12,500",
        containersLabel: "Containers & Shipments Delivered",
        deliveryRate: "99.4%",
        deliveryRateLabel: "On-Time Delivery Rate",
        syriaHubs: "4 Key Gateways",
        syriaHubsLabel: "Direct Syrian Customs Clearance",
        chinaWarehouses: "2 Major Hubs",
        chinaWarehousesLabel: "In Yiwu & Guangzhou for Packing",
      },
      routeCard: {
        title: "End-to-End Shipment Coordination",
        airOption: "Express Air Freight ✈️",
        airDays: "3 - 5 Days",
        seaOption: "Regular Sea Freight 🚢",
        seaDays: "22 - 28 Days",
        origin: "Worldwide Origins & China",
        destination: "Syrian Ports & Airports",
        statusBadge: "ONE COORDINATED LOGISTICS SOLUTION",
        liveContainer: "40ft High Cube Container",
        containerType: "Real-time Tracking & Full Insurance",
        airportDest: "Damascus Int'l Airport",
        portsDest: "Latakia, Beirut & Aqaba Ports",
        transitStatus: "IN TRANSIT",
        ctaBtn: "Get Shipping Consultation & Booking",
        insuranceBadge: "100% Cargo Insurance Coverage",
        originHub: "Global & China Hubs",
        destHub: "Damascus & Latakia Ports",
        saHubsLabel: "S.A. Hubs",
        finalDeliveryLabel: "Final Delivery",
      },
    },
    gateways: {
      sectionTag: "KEY REGIONAL GATEWAYS",
      title: "Key Ocean & Land Gateways to Syria",
      subtitle: "Connecting international cargo from worldwide origins through Syria's major regional maritime and transit ports.",
      latakiaTitle: "LATAKIA PORT (Syria)",
      beirutTitle: "BEIRUT PORT (Lebanon Gateway)",
      aqabaTitle: "AQABA PORT (Jordan Gateway)",
      features: [
        "FCL Container Shipping",
        "LCL Consolidation",
        "Port Coordination",
        "Shipping Documentation",
        "Customs Clearance",
        "Transit Cargo Handling",
        "Inland Transportation",
        "Final Door Delivery",
      ],
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
      originCity: "Worldwide / China Origin",
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
        lattakia: "Latakia (Latakia Port Delivery)",
        tartous: "Tartous (Tartous Port Delivery)",
        aleppo: "Aleppo (Inland Trucking Included)",
        homs: "Homs & Hama (Inland Trucking Included)",
      },
    },
    services: {
      sectionTag: "COMPLETE LOGISTICS SOLUTIONS",
      title: "Our Comprehensive Logistics Solutions",
      subtitle: "End-to-end freight coordination connecting global markets with Syria and the region.",
      detailsBtn: "Request Service Details",
      items: [
        {
          id: "sea-freight",
          title: "SEA FREIGHT (FCL & LCL)",
          description:
            "Dedicated Full Container Loads (FCL) and flexible Less than Container Load (LCL) consolidation connecting global origins with Latakia, Beirut & Aqaba ports.",
          iconName: "ship",
          badge: "FCL / LCL",
          features: ["Dedicated Container Solutions", "Flexible Consolidation", "Full Marine Insurance"],
        },
        {
          id: "air-freight",
          title: "AIR FREIGHT SOLUTIONS",
          description:
            "Fast, reliable international air cargo for general, urgent, pharmaceutical, humanitarian & temperature-sensitive shipments to Damascus Int'l Airport.",
          iconName: "plane",
          badge: "EXPRESS AIR",
          features: ["Import & Export Air Freight", "Priority & Time-Critical", "Airport Clearance & Final Delivery"],
        },
        {
          id: "road-transit",
          title: "ROAD TRANSPORT & TRANSIT",
          description:
            "Domestic, regional, and cross-border transportation solutions providing seamless transit cargo moving from ports to final Syrian destinations.",
          iconName: "truck",
          badge: "TRANSIT",
          features: ["Domestic & Regional Transport", "Cross-Border Logistics", "Final-Mile Delivery"],
        },
        {
          id: "customs-clearance",
          title: "CUSTOMS CLEARANCE",
          description:
            "Complete coordination of import, export, transit, documentation requirements, and cargo-release at all Syrian ports and land borders.",
          iconName: "file-check",
          badge: "EXPERTISE",
          features: ["Import & Export Procedures", "Customs Documentation", "Cargo Release Coordination"],
        },
        {
          id: "special-project",
          title: "SPECIAL & PROJECT CARGO",
          description:
            "Handling machinery, industrial equipment, spare parts, oversized cargo, regulated shipments, and special handling requirements.",
          iconName: "warehouse",
          badge: "PROJECT CARGO",
          features: ["Heavy Machinery & Lines", "Oversized Cargo Handling", "Regulated Shipments Support"],
        },
        {
          id: "financial-support",
          title: "END-TO-END COORDINATION",
          description:
            "SA LOGISTICS manages the shipment journey through one coordinated operational process - from booking to final delivery.",
          iconName: "coins",
          badge: "END-TO-END",
          features: ["Full Operational Tracking", "Documentation Verification", "Responsive Service"],
        },
      ],
    },
    process: {
      sectionTag: "COMPLETE LOGISTICS COORDINATION",
      title: "One Partner. Complete Logistics Coordination (5 Pillars)",
      subtitle: "SA LOGISTICS manages the shipment journey through one coordinated operational process.",
      securedBadge: "Verified & Secured Step",
      steps: [
        {
          number: "01",
          title: "AIR FREIGHT",
          description: "International air cargo for general, urgent, pharmaceutical, humanitarian, and special cargo.",
          location: "Global Airports ➔ Damascus",
        },
        {
          number: "02",
          title: "SEA FREIGHT",
          description: "FCL and LCL solutions connecting global origins with regional gateways and Syria.",
          location: "Global Ports ➔ Latakia/Beirut/Aqaba",
        },
        {
          number: "03",
          title: "ROAD TRANSPORT & TRANSIT",
          description: "Domestic, regional, and cross-border transportation solutions.",
          location: "Regional Land Borders",
        },
        {
          number: "04",
          title: "CUSTOMS CLEARANCE",
          description: "Import, export, transit, documentation, and cargo-release coordination.",
          location: "Syrian Ports & Customs",
        },
        {
          number: "05",
          title: "SPECIAL & PROJECT CARGO",
          description: "Machinery, industrial equipment, spare parts, oversized cargo, and final-mile delivery.",
          location: "Damascus / Latakia / Aleppo",
        },
      ],
    },
    whyUs: {
      sectionTag: "WHY SA LOGISTICS?",
      title: "Why Choose S.A. LOGISTICS?",
      subtitle: "LOCAL KNOWLEDGE. REGIONAL REACH. INTERNATIONAL CONNECTIVITY.",
      guaranteeBadge: "YOUR CARGO. OUR COMMITMENT.",
      motto: "LET'S MOVE YOUR CARGO TO SYRIA.",
      features: [
        {
          title: "GLOBAL CONNECTIVITY",
          description: "International freight solutions from worldwide origins.",
          icon: "shield-check",
        },
        {
          title: "SYRIA & LEVANT EXPERTISE",
          description: "Strong operational understanding of regional logistics and customs environments.",
          icon: "building-2",
        },
        {
          title: "END-TO-END COORDINATION",
          description: "From freight booking and documentation to customs clearance and final delivery.",
          icon: "award",
        },
        {
          title: "CUSTOMER-FOCUSED OPERATIONS",
          description: "Solutions adapted to cargo type, origin, urgency, destination, and operational requirements.",
          icon: "clock",
        },
      ],
    },
    quoteModal: {
      title: "Request a Custom Freight Quote",
      subtitle: "Provide your shipment details and our cargo specialist will contact you within 30 minutes.",
      namePlaceholder: "Full Name / Company Name",
      phonePlaceholder: "Phone / WhatsApp (+963 9666 42574)",
      companyPlaceholder: "Cargo category & volume",
      typeLabel: "Select Freight Mode",
      detailsPlaceholder: "Additional notes (Weight, CBM, Origin port, Destination in Syria)...",
      submitBtn: "Submit Quote Request",
      successMessage: "Thank you! Your quote request has been received. S.A. LOGISTICS team will contact you shortly.",
      seaOptionBtn: "Sea Freight (FCL/LCL)",
      airOptionBtn: "Express Air Freight",
      responseGuarantee: "Fast Response Within 30 Mins",
      successTitle: "Quote Request Received Successfully!",
    },
    testimonials: {
      sectionTag: "CLIENT TRUST",
      title: "Trusted by Merchants & Importers in Syria",
      subtitle: "Hear what top business leaders across Syria say about shipping with S.A. LOGISTICS.",
      items: [
        {
          id: "1",
          name: "Mr. Mohammad Al-Khatib",
          company: "Al-Khatib Electronics Importing",
          city: "Damascus - Syria",
          quote:
            "We have been shipping container loads with S.A. LOGISTICS for over 5 years. Their clearance speed at Latakia port is unmatched.",
          rating: 5,
        },
        {
          id: "2",
          name: "Haj Ahmad Al-Baradei",
          company: "Baradei Textile Establishment",
          city: "Aleppo - Syria",
          quote:
            "Their LCL consolidation service saved us enormous money. They collect from multiple suppliers into one container seamlessly.",
          rating: 5,
        },
        {
          id: "3",
          name: "Eng. Samer Al-Masri",
          company: "Afaq Industrial Lines Co.",
          city: "Latakia - Syria",
          quote:
            "Their express air cargo and airport clearance for machinery spare parts is highly reliable and transparent.",
          rating: 5,
        },
      ],
    },
    faq: {
      sectionTag: "FREQUENTLY ASKED QUESTIONS",
      title: "Answers to Common Questions",
      subtitle: "Everything you need to know about international freight to Syria, key gateways, and customs procedures.",
      items: [
        {
          question: "Which key regional ports and gateways do you operate through to Syria?",
          answer:
            "We operate through Latakia Port (LATAKIA PORT), Beirut Port (BEIRUT PORT), Aqaba Port (AQABA PORT), Damascus International Airport, and regional land borders for seamless transit cargo.",
        },
        {
          question: "Do you offer both FCL (Full Container Load) and LCL (Less than Container Load)?",
          answer:
            "Yes! We provide dedicated container solutions for FCL shipments as well as flexible LCL consolidation starting from 1 CBM for smaller shipments.",
        },
        {
          question: "What types of air freight cargo solutions do you handle?",
          answer:
            "Our air freight solutions cover import/export air cargo, airport-to-airport, priority/time-critical shipments, pharmaceutical & temperature-sensitive cargo, humanitarian cargo, and special project equipment.",
        },
        {
          question: "Does your service cover customs clearance and inland transportation to final delivery?",
          answer:
            "Yes, we manage complete end-to-end coordination: global origin pickup, ocean/air freight, customs declaration at regional gateways, and direct inland trucking to your warehouse door in Syria.",
        },
        {
          question: "How can I contact your main office in Damascus?",
          answer:
            "You can visit our main office at Al-Hamra St, Near Blue Tower Hotel, Damascus, Syria. Or call us directly at +963 9666 42574 or email SA.LOGISTICS.SY@GMAIL.COM.",
        },
      ],
    },
    contact: {
      sectionTag: "YOUR CARGO. OUR COMMITMENT.",
      title: "Contact S.A. LOGISTICS Team",
      subtitle: "Connect with our main office in Damascus or our global logistics desk for shipping consultation.",
      chinaTitle: "China & Global Logistics Hubs",
      guangzhouAddress: "Guangzhou - Yuexiu District - Int'l Trade Center - Tower A",
      yiwuAddress: "Yiwu - Chouzhou North Rd Industrial Zone - S.A. Central Hub",
      syriaTitle: "Syria Main Office",
      damascusAddress: "Al-Hamra St, Near Blue Tower Hotel, Damascus, Syria",
      lattakiaAddress: "Latakia Port Street - Opposite Main Freight Entrance",
      phoneLabel: "Direct Phone:",
      emailLabel: "Official Email:",
      whatsappBtn: "Chat on WhatsApp Now",
      officialAddress: "Al-Hamra St, Near Blue Tower Hotel, Damascus, Syria",
      officialPhone: "+963 9666 42574",
      officialEmail: "SA.LOGISTICS.SY@GMAIL.COM",
    },
    footer: {
      description:
        "S.A. LOGISTICS | INTERNATIONAL FREIGHT TO, FROM & THROUGH SYRIA. Reliable, coordinated freight forwarding and complete logistics solutions.",
      quickLinks: "Quick Navigation",
      servicesTitle: "Services",
      officesTitle: "Our Gateways",
      rights: "All Rights Reserved © 2026 S.A. LOGISTICS Co.",
      chinaTagline: "PEOPLE CARGO GLOBAL REACH BETTER TOMORROW",
      directContactTitle: "Direct Inquiries",
      backToTop: "Back to Top",
    },
  },
};
