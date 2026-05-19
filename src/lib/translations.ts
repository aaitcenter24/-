/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const TRANSLATIONS = {
  bn: {
    appName: "উত্তরাধিকার ক্যালকুলেটর",
    calculate: "হিসাব",
    rules: "বিধি",
    faq: "জিজ্ঞাসা",
    selectHeirs: "ওয়ারিশ নির্বাচন",
    assets: "সম্পদ",
    land: "জমি",
    money: "টাকা",
    gold: "স্বর্ণ",
    silver: "রৌপ্য",
    unitLand: "শতক",
    unitMoney: "৳",
    unitGold: "ভরি",
    unitSilver: "ভরি",
    reset: "রিসেট",
    calculateButton: "হিসাব করুন",
    back: "ফিরে যান",
    download: "ডাউনলোড",
    reportTitle: "সম্পত্তি বণ্টন রিপোর্ট",
    heirsCount: "ওয়ারিশ",
    calculationCorrect: "হিসাব সঠিক",
    summaryTitle: "অংশ বণ্টন সারসংক্ষেপ",
    stepsTitle: "হিসাবের ধাপসমূহ",
    detailsTitle: "বিস্তারিত তালিকা",
    heirHeader: "ওয়ারিশ",
    shareHeader: "অংশ",
    landHeader: "জমি",
    goldHeader: "স্বর্ণ",
    silverHeader: "রৌপ্য",
    moneyHeader: "টাকা",
    relationshipHeader: "সম্পর্ক",
    relOfDeceased: (h: string) => `মৃত ব্যক্তির ${h}`,
    sortByName: "নাম অনুযায়ী সাজান",
    settings: "সেটিংস",
    selectCountry: "দেশ নির্বাচন করুন",
    countryBD: "বাংলাদেশ",
    countryPK: "পাকিস্তান",
    countrySA: "সৌদি আরব",
    countryZA: "দক্ষিণ আফ্রিকা",
    countryAE: "সংযুক্ত আরব আমিরাত",
    countryMY: "মালয়েশিয়া",
    countryID: "ইন্দোনেশিয়া",
    countryTR: "তুরস্ক",
    countryMA: "মরক্কো",
    countryEG: "মিশর",
    countryJO: "জর্ডান",
    countryKW: "কুয়েত",
    countryQA: "কাতার",
    countryIN: "ভারত",
    countryUS: "মার্কিন যুক্তরাষ্ট্র",
    countryGB: "যুক্তরাজ্য",
    countryCA: "কানাডা",
    countryFR: "ফ্রান্স",
    countryDE: "জার্মানি",
    total: "মোট",
    customHeirTitle: "কাস্টম ওয়ারিশ (বিশেষ বিবেচনা)",
    addCustom: "যুক্ত করুন",
    customPlaceholder: "নাম (যেমন: দত্তক পুত্র)",
    customEmpty: "বিশেষ কোনো অংশ থাকলে এখানে যুক্ত করুন",
    deceasedNameLabel: "মৃত ব্যক্তির নাম",
    deceasedNamePlaceholder: "মৃত ব্যক্তির নাম লিখুন (ঐচ্ছিক)",
    heirNamePlaceholder: "ওয়ারিশের নাম",
    heirNamesTitle: "ওয়ারিশদের নাম লিখুন (ঐচ্ছিক)",
    errorHeirCount: "ওয়ারিশ সংখ্যা শূন্যের নিচে হতে পারে না।",
    errorAssetNegative: "সম্পদের পরিমাণ ঋণাত্মক হতে পারে না।",
    errorAssetInvalid: "অনুগ্রহ করে সঠিক সংখ্যা প্রদান করুন।",
    reportSummary: "প্রতিবেদনের সারসংক্ষেপ",
    advisoryTitle: "আইনি পরামর্শ বিজ্ঞপ্তি",
    advisoryText: "আপনার দেশে ইসলামী উত্তরাধিকার আইন সংবিধিবদ্ধ দেওয়ানি আইন নয়। এখানে প্রদত্ত হিসাবসমূহ শুধুমাত্র ব্যক্তিগত ধর্মীয় নির্দেশনার জন্য। কোনো সিদ্ধান্ত নেওয়ার আগে আপনার এলাকার আইন বিশেষজ্ঞের পরামর্শ নিন।",
    activeCountry: "সক্রিয় দেশ",
    activeMadhhab: "সক্রিয় মাজহাব",
    recalculatePrompt: (country: string, madhhab: string, langName: string, currency: string) => `আপনি আপনার দেশ পরিবর্তন করে ${country} বেছে নিয়েছেন।\nভাষা: ${langName} | মুদ্রা: ${currency} | মাজহাব: ${madhhab} (ডিফল্ট)\nসব হিসাব, একক, আইনি রেফারেন্স এবং ভাষা আপডেট করা হয়েছে। আপনি কি আপনার বর্তমান উত্তরাধিকার সমস্যাটি নতুন দেশের সেটিংসের সাথে পুনরায় হিসাব করতে চান?`,
    yes: "হ্যাঁ",
    no: "না",
    recalculateNow: "হ্যাঁ, পুনরায় হিসাব করুন",
    dismiss: "বাতিল",
    rulesHeader: "উত্তরাধিকার নীতিমালা",
    ruleTabs: {
      sa: "সৌদি আরব",
      bd: "বাংলাদেশ",
      za: "দক্ষিণ আফ্রিকা",
      pk: "পাকিস্তান",
      schools: "মাজহাবগত পার্থক্য"
    },
    faqHeader: "জিজ্ঞাসা ও সমাধান",
    footerTitle: "Inheritance Matrix",
    footerCopy: "© ২০২৬ • এআই লজিক",
    groups: {
      immediate: "নিকটাত্মীয় (স্বামী, স্ত্রী ও সন্তান)",
      ancestors: "পূর্বপুরুষ (পিতা-মাতা ও দাদা-দাদি)",
      siblings: "ভাই-বোন",
      extended: "অন্যান্য ওয়ারিশ"
    },
    share: "শেয়ার",
    downloadPDF: "পিডিএফ (PDF) ডাউনলোড",
    downloadPNG: "ইমেজ (PNG) ডাউনলোড",
    downloadJPG: "ইমেজ (JPG) ডাউনলোড",
    printReport: "রিপোর্ট প্রিন্ট করুন",
    shareText: "হেরিটেজ ম্যাট্রিক্স থেকে এই উত্তরাধিকার গণনাটি দেখুন!",
    copied: "ফলাফল ক্লিপবোর্ডে কপি করা হয়েছে!",
    history: "ইতিহাস",
    savedCalculations: "সংরক্ষিত হিসাবসমূহ",
    noSavedCalculations: "কোন সংরক্ষিত হিসাব খুঁজে পাওয়া যায়নি",
    loginToViewHistory: "আপনার হিসাব সংরক্ষণ করতে এবং এখানে দেখতে লগইন করুন",
    unknownDeceased: "অজ্ঞাত মৃত ব্যক্তি",
    loadDetails: "বিস্তারিত দেখুন",
    help: "সাহায্য",
    madhhab: "মাজহাব",
    selectMadhhab: "মাজহাব নির্বাচন করুন",
    hanafi: "হানাফী",
    maliki: "মালিকী",
    shafii: "শাফিঈ",
    hanbali: "হাম্বলী",
    tutorial: "টিউটোরিয়াল",
    howToUse: "ব্যবহারবিধি",
    stepByStep: "ধাপে ধাপে নির্দেশিকা",
    inputExplanation: "ইনপুট ফিল্ডের বিবরণ",
    shariaConcepts: "ইসলামি উত্তরাধিকারের ধারণা",
    madhhabsTitle: "মাজহাব ও আইনি পার্থক্য",
    casesTitle: "বিশেষ ও জটিল মাসয়ালা",
    feedback: "মতামত",
    feedbackTitle: "মতামত দিন বা ভুল রিপোর্ট করুন",
    feedbackType: "ধরনের ধরণ",
    suggestion: "পরামর্শ",
    discrepancy: "হিসাবগত ভুল",
    message: "আপনার বার্তা",
    submit: "জমা দিন",
    feedbackSuccess: "আপনার মতামত সফলভাবে জমা দেওয়া হয়েছে। ধন্যবাদ!",
    feedbackError: "জমা ব্যর্থ হয়েছে।",
    prayerTimes: "নামাজের সময়",
    qibla: "কিবলা",
    fajr: "ফজর",
    dhuhr: "যোহর",
    asr: "আসর",
    maghrib: "মাগরিব",
    isha: "এশা",
    nextPrayer: "পরবর্তী নামাজ",
    locating: "অবস্থান খুঁজছি...",
    notAvailable: "সহজলভ্য নয়",
    profile: "প্রোফাইল",
    userSettings: "ব্যবহারকারী সেটিংস",
    maritalStatus: "বৈবাহিক অবস্থা",
    single: "অবিবাহিত",
    married: "বিবাহিত",
    divorced: "বিবাহবিচ্ছেদ",
    widowed: "বিপত্নীক/বিধবা",
    notSpecified: "উল্লিখিত নয়",
    preferredLang: "পছন্দের ভাষা (নোটিফিকেশন)",
    emailNotifications: "ইমেইল নোটিফিকেশন",
    emailNotificationsDesc: "হিসাব সংরক্ষণ এবং গুরুত্বপূর্ণ আপডেট সম্পর্কে ইমেইল পেতে এটি সক্রিয় রাখুন।",
    saveChanges: "পরিবর্তন সংরক্ষণ করুন",
    profileUpdated: "প্রোফাইল সফলভাবে আপডেট করা হয়েছে",
    confirmSaveTitle: "হিসাব সংরক্ষণ",
    confirmSaveDesc: "আপনি কি নিশ্চিত যে আপনি এই হিসাবটি সংরক্ষণ করতে চান?",
    confirmSaveButton: "হ্যাঁ, সংরক্ষণ করুন",
    confirmCancelButton: "বাতিল",
    planLimitTitle: "সংরক্ষণ সীমা অতিক্রম",
    planLimitDesc: "ফ্রি প্ল্যানে আপনি সর্বোচ্চ ৩টি হিসাব সংরক্ষণ করতে পারেন। আনলিমিটেড সংরক্ষণের জন্য প্রো-তে আপগ্রেড করুন।",
    tour: {
      welcomeTitle: "স্বাগতম!",
      welcomeDesc: "আমাদের স্মার্ট উত্তরাধিকার ক্যালকুলেটর অ্যাপে আপনাকে স্বাগত জানাই।",
      deceasedTitle: "মৃত ব্যক্তির নাম",
      deceasedDesc: "প্রথমে মৃত ব্যক্তির নাম লিখুন।",
      heirsTitle: "ওয়ারিশ নির্বাচন",
      heirsDesc: "মৃত ব্যক্তির ওয়ারিশদের সংখ্যা নির্বাচন করুন।",
      assetsTitle: "সম্পত্তির বিবরণী",
      assetsDesc: "মৃত ব্যক্তির রেখে যাওয়া সকল সম্পত্তির হিসাব এখানে দিন।",
      aiTitle: "AI সহকারী",
      aiDesc: "জটিল উত্তরাধিকার আইন সম্পর্কে জানতে আমাদের এআই সহকারীর সাহায্য নিন।",
      langTitle: "ভাষা পরিবর্তন",
      langDesc: "এখান থেকে ভাষা পরিবর্তন করুন।",
      moreTitle: "অতিরিক্ত মেনু",
      moreDesc: "এটি সেটিংস, কিবলা কম্পাস এবং নামাজের সময় খুঁজে পাওয়ার জন্য এখানে ক্লিক করুন।",
      next: "পরবর্তী",
      prev: "পূর্ববর্তী",
      done: "সম্পন্ন"
    },
    privacyPolicy: {
      title: "গোপনীয়তা নীতি",
      lastUpdated: "শেষ আপডেট: ১৩ মে, ২০২৬",
      intro: "হেরিটেজ ম্যাট্রিক্স-এ আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই নীতিটি ব্যাখ্যা করে আমরা কীভাবে আপনার তথ্য সংগ্রহ এবং ব্যবহার করি।",
      dataCollection: {
        title: "তথ্য সংগ্রহ",
        desc: "আমরা আপনার প্রোফাইল তথ্য (নাম, ইমেইল) এবং আপনার করা উত্তরাধিকারের হিসাবগুলো সংরক্ষণ করি যাতে আপনি পরবর্তীতে সেগুলো দেখতে পারেন।"
      },
      firebase: {
        title: "নিরাপত্তা ও স্টোরেজ",
        desc: "আমরা আপনার তথ্য সুরক্ষিতভাবে সংরক্ষণ করতে গুগল ফারায়ারবেস (Firebase) ব্যবহার করি। আপনার তথ্য এনক্রিপশন প্রোটোকলের মাধ্যমে সুরক্ষিত থাকে।"
      },
      usage: {
        title: "তথ্যের ব্যবহার",
        desc: "সংগৃহীত তথ্য শুধুমাত্র আপনাকে সঠিক সেবা প্রদানের জন্য এবং অ্যাপের অভিজ্ঞতা উন্নত করার জন্য ব্যবহার করা হয়। আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।"
      },
      dataRetention: {
        title: "তথ্য সংরক্ষণ ও মুছে ফেলা",
        desc: "আপনার অ্যাকাউন্ট সক্রিয় থাকা পর্যন্ত অথবা আপনাকে সেবা প্রদানের জন্য প্রয়োজনীয় সময় পর্যন্ত আমরা তথ্য সংরক্ষণ করি। আপনি যেকোনো সময় আপনার ডেটা মুছে ফেলার অনুরোধ করতে পারেন।"
      },
      thirdParty: {
        title: "তৃতীয় পক্ষের প্রকাশ",
        desc: "আমরা কোনো অবস্থাতেই আপনার ব্যক্তিগত তথ্য বাইরের কোনো পক্ষের কাছে বিক্রি বা বিনিময় করি না।"
      },
      childPrivacy: {
        title: "শিশুদের গোপনীয়তা",
        desc: "আমাদের অ্যাপটি ১৩ বছরের কম বয়সী শিশুদের জন্য ডিজাইন করা হয়নি এবং আমরা জেনেশুনে শিশুদের থেকে কোনো তথ্য সংগ্রহ করি না।"
      },
      userRights: {
        title: "আপনার অধিকার",
        desc: "আপনার তথ্য দেখার, সংশোধন করার বা মুছে ফেলার পূর্ণ অধিকার আপনার রয়েছে।"
      },
      contact: {
        title: "যোগাযোগ",
        desc: "গোপনীয়তা বিষয়ক যেকোনো প্রশ্নে আমাদের aaitcenter24@gmail.com ঠিকানায় ইমেইল করুন।"
      },
      control: {
        title: "আপনার নিয়ন্ত্রণ",
        desc: "আপনি যেকোনো সময় আপনার মেডেল প্রোফাইল থেকে তথ্য আপডেট করতে পারেন অথবা আপনার হিসাবগুলো মুছে ফেলতে পারেন।"
      },
      commitment: "হেরিটেজ ম্যাট্রিক্স শূন্য-ডেটা-বিক্রয় নীতির সাথে ডিজাইন করা হয়েছে। বৈশ্বিক পর্যায়ে সঠিক ও হালাল উত্তরাধিকার সমাধান প্রদানের আমাদের মিশনে আপনার বিশ্বাসই মূল ভিত্তি।",
      close: "বন্ধ করুন",
      share: "পলিসি শেয়ার করুন",
      shareBody: "হেরিটেজ ম্যাট্রিক্স-এর গোপনীয়তা নীতি এখানে দেখুন: "
    },
    subscriptions: {
      title: "সাবস্ক্রিপশন প্যাকেজ",
      choosePlan: "আপনার জন্য সঠিক প্ল্যানটি বেছে নিন",
      free: {
        name: "ফ্রি (Free)",
        price: "৳০ / মাস",
        features: [
          "মাসে ৩টি পর্যন্ত হিসাব সংরক্ষণ",
          "বেসিক বণ্টন রিপোর্ট",
          "ইমেজ (PNG/JPG) ডাউনলোড",
          "কমিউনিটি সাপোর্ট"
        ],
        current: "বর্তমান প্ল্যান",
        get: "শুরু করুন"
      },
      pro: {
        name: "প্রো (Pro)",
        price: "৳৯৯ / মাস",
        features: [
          "আনলিমিটেড হিসাব সংরক্ষণ",
          "পিডিএফ (PDF) রিপোর্ট ডাউনলোড",
          "স্মার্ট AI সহকারীর সাহায্য",
          "অ্যাড-ফ্রি অভিজ্ঞতা",
          "প্রায়োরিটি সাপোর্ট"
        ],
        current: "অ্যাক্টিভেটেড",
        get: "প্রো-তে আপগ্রেড করুন"
      },
      backToApp: "অ্যাপে ফিরে যান"
    }
  },
  en: {
    appName: "Inheritance Calculator",
    calculate: "Calculator",
    rules: "Rules",
    faq: "FAQ",
    selectHeirs: "Select Heirs",
    assets: "Assets",
    land: "Land",
    money: "Cash",
    gold: "Gold",
    silver: "Silver",
    unitLand: "Dec",
    unitMoney: "$",
    unitGold: "Vori",
    unitSilver: "Vori",
    reset: "Reset",
    calculateButton: "Calculate",
    back: "Back",
    download: "Download",
    reportTitle: "Inheritance Report",
    heirsCount: "Heirs",
    calculationCorrect: "Calculation Verified",
    summaryTitle: "Distribution Summary",
    stepsTitle: "Calculation Steps",
    detailsTitle: "Detailed List",
    heirHeader: "Heir",
    shareHeader: "Share",
    landHeader: "Land",
    goldHeader: "Gold",
    silverHeader: "Silver",
    moneyHeader: "Cash",
    relationshipHeader: "Relationship",
    relOfDeceased: (h: string) => `${h} of Deceased`,
    sortByName: "Sort by Name",
    settings: "Settings",
    selectCountry: "Select Country",
    countryBD: "Bangladesh",
    countryPK: "Pakistan",
    countrySA: "Saudi Arabia",
    countryZA: "South Africa",
    countryAE: "UAE",
    countryMY: "Malaysia",
    countryID: "Indonesia",
    countryTR: "Turkey",
    countryMA: "Morocco",
    countryEG: "Egypt",
    countryJO: "Jordan",
    countryKW: "Kuwait",
    countryQA: "Qatar",
    countryIN: "India",
    countryUS: "USA",
    countryGB: "UK",
    countryCA: "Canada",
    countryFR: "France",
    countryDE: "Germany",
    total: "TOTAL",
    customHeirTitle: "Custom Heirs (Special Cases)",
    addCustom: "Add New",
    customPlaceholder: "Name (e.g. Adopted Son)",
    customEmpty: "Add special shares here if needed",
    deceasedNameLabel: "Name of Deceased",
    deceasedNamePlaceholder: "Enter deceased name (optional)",
    heirNamePlaceholder: "Heir Name",
    heirNamesTitle: "Enter Heir Names (Optional)",
    errorHeirCount: "Heir count cannot be below zero.",
    errorAssetNegative: "Asset value cannot be negative.",
    errorAssetInvalid: "Please enter a valid numeric value.",
    reportSummary: "Report Summary",
    advisoryTitle: "Legal Advisory Notice",
    advisoryText: "Islamic inheritance law is not the statutory civil law in your country. The calculations provided are based on Sharia principles for personal and religious guidance only. Please consult a qualified legal professional in your jurisdiction before executing any estate distribution.",
    activeCountry: "Active Country",
    activeMadhhab: "Active Madhhab",
    recalculatePrompt: (country: string, madhhab: string, langName: string, currency: string) => `You have changed your country to ${country}.\nLanguage: ${langName} | Currency: ${currency} | Madhhab: ${madhhab} (default)\nAll calculations, units, legal references, and language have been updated. Would you like to recalculate your current inheritance case with the new country settings?`,
    yes: "Yes",
    no: "No",
    recalculateNow: "Recalculate Now",
    dismiss: "Dismiss",
    rulesHeader: "Inheritance Laws",
    ruleTabs: {
      sa: "Saudi Arabia",
      bd: "Bangladesh",
      za: "South Africa",
      pk: "Pakistan",
      schools: "Madhhabs"
    },
    faqHeader: "Frequently Asked Questions",
    footerTitle: "Inheritance Matrix",
    footerCopy: "© 2026 • AI Logic",
    groups: {
      immediate: "Immediate (Spouse & Children)",
      ancestors: "Ancestors (Parents & Grandparents)",
      siblings: "Siblings",
      extended: "Extended Relatives"
    },
    share: "Share",
    downloadPDF: "Download PDF",
    downloadPNG: "Download PNG",
    downloadJPG: "Download JPG",
    printReport: "Print Report",
    shareText: "Check out this inheritance calculation from Heritage Matrix!",
    copied: "Result copied to clipboard!",
    history: "History",
    savedCalculations: "Saved Calculations",
    noSavedCalculations: "No saved calculations found",
    loginToViewHistory: "Login to save your calculations and view them here",
    unknownDeceased: "Unknown",
    loadDetails: "View Details",
    help: "Help",
    madhhab: "Madhhab",
    selectMadhhab: "Select Madhhab",
    hanafi: "Hanafi",
    maliki: "Maliki",
    shafii: "Shafi'i",
    hanbali: "Hanbali",
    tutorial: "Tutorial",
    howToUse: "How to Use",
    stepByStep: "Step-by-Step Guide",
    inputExplanation: "Input Field Details",
    shariaConcepts: "Islamic Inheritance Concepts",
    madhhabsTitle: "Madhhabs & Schools of Thought",
    casesTitle: "Special & Complex Cases",
    feedback: "Feedback",
    feedbackTitle: "Feedback or Report Issue",
    feedbackType: "Type",
    suggestion: "Suggestion",
    discrepancy: "Calculation Error",
    message: "Your Message",
    submit: "Submit",
    feedbackSuccess: "Your feedback has been submitted successfully. Thank you!",
    feedbackError: "Failed to submit feedback.",
    prayerTimes: "Prayer Times",
    qibla: "Qibla",
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    nextPrayer: "Next Prayer",
    locating: "Locating...",
    notAvailable: "Not Available",
    profile: "Profile",
    userSettings: "User Settings",
    maritalStatus: "Marital Status",
    single: "Single",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widowed",
    notSpecified: "Not Specified",
    preferredLang: "Preferred Language (Notifications)",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Enable to receive emails about saved calculations and important updates.",
    saveChanges: "Save Changes",
    profileUpdated: "Profile updated successfully",
    confirmSaveTitle: "Save Calculation",
    confirmSaveDesc: "Are you sure you want to save this calculation?",
    confirmSaveButton: "Yes, Save",
    confirmCancelButton: "Cancel",
    planLimitTitle: "Save Limit Reached",
    planLimitDesc: "On the free plan, you can save up to 3 calculations. Upgrade to Pro for unlimited saves.",
    tour: {
      welcomeTitle: "Welcome!",
      welcomeDesc: "Welcome to Heritage Matrix - The Precision Islamic Inheritance System.",
      deceasedTitle: "Deceased Name",
      deceasedDesc: "Start by entering the name of the deceased.",
      heirsTitle: "Select Heirs",
      heirsDesc: "Select the number of heirs for the deceased.",
      assetsTitle: "Asset Details",
      assetsDesc: "Input all assets left behind by the deceased.",
      aiTitle: "AI Assistant",
      aiDesc: "Get instant answers to complex inheritance questions with our AI assistant.",
      langTitle: "Language Change",
      langDesc: "Change the application language here.",
      moreTitle: "More Options",
      moreDesc: "Access Settings, Qibla compass, and Prayer times from this menu.",
      next: "Next",
      prev: "Back",
      done: "Done"
    },
    privacyPolicy: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: May 13, 2026",
      intro: "Your privacy is important to us at Heritage Matrix. This policy outlines how we collect, use, and protect your information.",
      dataCollection: {
        title: "Data Collection",
        desc: "We store your profile information (name, email) and your inheritance calculations so you can access them later."
      },
      firebase: {
        title: "Security & Storage",
        desc: "We use Google Firebase to securely store your data. Your information is protected via industry-standard encryption protocols."
      },
      usage: {
        title: "How We Use Data",
        desc: "Collected data is used solely to provide services to you and improve the app experience. We do not sell your personal data to third parties."
      },
      dataRetention: {
        title: "Retention & Deletion",
        desc: "We retain data as long as your account is active or needed to provide services. You can request data deletion at any time."
      },
      thirdParty: {
        title: "Third-Party Disclosure",
        desc: "We never sell or trade your personally identifiable information to outside parties."
      },
      childPrivacy: {
        title: "Children's Privacy",
        desc: "Our app is not designed for children under 13, and we do not knowingly collect information from children."
      },
      userRights: {
        title: "Your Rights",
        desc: "You have the right to access, rectify, or erase your personal data stored within our system."
      },
      contact: {
        title: "Contact Us",
        desc: "For any privacy-related questions, contact us at aaitcenter24@gmail.com."
      },
      control: {
        title: "Your Control",
        desc: "You can update your profile or delete your recorded calculations at any time from your settings."
      },
      commitment: "Heritage Matrix is designed with a zero-data-sale policy. Your trust is core to our mission of providing accurate and halal inheritance solutions globally.",
      close: "Close",
      share: "Share Policy",
      shareBody: "View the Heritage Matrix Privacy Policy here: "
    },
    subscriptions: {
      title: "Subscription Packages",
      choosePlan: "Choose the perfect plan for your needs",
      free: {
        name: "Free",
        price: "$0 / month",
        features: [
          "Up to 3 saved calculations",
          "Basic distribution reports",
          "Image (PNG/JPG) downloads",
          "Community support"
        ],
        current: "Current Plan",
        get: "Get Started"
      },
      pro: {
        name: "Pro",
        price: "$4.99 / month",
        features: [
          "Unlimited saved calculations",
          "PDF report downloads",
          "Full AI Assistant access",
          "Ad-free experience",
          "Priority support"
        ],
        current: "Activated",
        get: "Upgrade to Pro"
      },
      backToApp: "Back to App"
    }
  },
  ar: {
    appName: "حاسبة الميراث",
    calculate: "حاسبة",
    rules: "القواعد",
    faq: "الأسئلة",
    selectHeirs: "اختر الورثة",
    assets: "الأصول",
    land: "الأرض",
    money: "المال",
    gold: "الذهب",
    silver: "الفضة",
    unitLand: "م²",
    unitMoney: "ر.س",
    unitGold: "جرام",
    unitSilver: "جرام",
    reset: "إعادة ضبط",
    calculateButton: "احسب",
    back: "رجوع",
    download: "تحميل",
    reportTitle: "تقرير الميراث",
    heirsCount: "الورثة",
    calculationCorrect: "تم التحقق من الحساب",
    summaryTitle: "ملخص التوزيع",
    stepsTitle: "خطوات الحساب",
    detailsTitle: "القائمة المفصلة",
    heirHeader: "الوارث",
    shareHeader: "النصيب",
    landHeader: "الأرض",
    goldHeader: "الذهب",
    silverHeader: "الفضة",
    moneyHeader: "المال",
    relationshipHeader: "العلاقة",
    relOfDeceased: (h: string) => `${h} للمتوفى`,
    sortByName: "ترتيب حسب الاسم",
    settings: "الإعدادات",
    selectCountry: "اختر الدولة",
    countryBD: "بنجلاديش",
    countryPK: "باكستان",
    countrySA: "المملكة العربية السعودية",
    countryZA: "جنوب أفريقيا",
    countryAE: "الإمارات العربية المتحدة",
    countryMY: "ماليزيا",
    countryID: "إندونيسيا",
    countryTR: "تركيا",
    countryMA: "المغرب",
    countryEG: "مصر",
    countryJO: "الأردن",
    countryKW: "الكويت",
    countryQA: "قطر",
    countryIN: "الهند",
    countryUS: "الولايات المتحدة",
    countryGB: "المملكة المتحدة",
    countryCA: "كندا",
    countryFR: "فرنسا",
    countryDE: "ألمانيا",
    total: "المجموع",
    customHeirTitle: "ورثة مخصصون (حالات خاصة)",
    addCustom: "إضافة جديد",
    customPlaceholder: "الاسم (مثل ابن متبنى)",
    customEmpty: "أضف حصصاً خاصة هنا إذا لزم الأمر",
    deceasedNameLabel: "اسم المتوفى",
    deceasedNamePlaceholder: "أدخل اسم المتوفى (اختياري)",
    heirNamePlaceholder: "اسم الوارث",
    heirNamesTitle: "أدخل أسماء الورثة (اختياري)",
    errorHeirCount: "لا يمكن أن يكون عدد الورثة أقل من الصفر.",
    errorAssetNegative: "لا يمكن أن تكون قيمة الأصل سلبية.",
    errorAssetInvalid: "يرجى إدخال قيمة عددية صالحة.",
    reportSummary: "ملخص التقرير",
    advisoryTitle: "تنبيه استشاري قانوني",
    advisoryText: "قانون الميراث الإسلامي ليس القانون المدني التشريعي في بلدك. الحسابات المقدمة تستند إلى مبادئ الشريعة للإرشاد الشخصي والديني فقط. يرجى استشارة مختص قانوني مؤهل في ولايتك القضائية قبل تنفيذ أي توزيع للتركة.",
    activeCountry: "الدولة النشطة",
    activeMadhhab: "المذهب النشط",
    recalculatePrompt: (country: string, madhhab: string, langName: string, currency: string) => `لقد قمت بتغيير بلدك إلى ${country}.\nاللغة: ${langName} | العملة: ${currency} | المذهب: ${madhhab} (افتراضي)\nتم تحديث جميع الحسابات والوحدات والمراجع القانونية واللغة. هل ترغب في إعادة حساب حالة الميراث الحالية الخاصة بك مع إعدادات البلد الجديدة؟`,
    yes: "نعم",
    no: "لا",
    recalculateNow: "إعادة الحساب الآن",
    dismiss: "تجاهل",
    rulesHeader: "قوانين الميراث",
    ruleTabs: {
      sa: "السعودية",
      bd: "بنغلاديش",
      za: "جنوب أفريقيا",
      pk: "باكستان",
      schools: "المذاهب"
    },
    faqHeader: "الأسئلة الشائعة",
    footerTitle: "Heritage Matrix",
    footerCopy: "© 2026 • AI Logic",
    groups: {
      immediate: "الأقارب المباشرون (الزوج والزوجة والأبناء)",
      ancestors: "الأسلاف (الآباء والأجداد)",
      siblings: "الإخوة",
      extended: "الأقارب الممتدون"
    },
    share: "مشاركة",
    downloadPDF: "تحميل PDF",
    downloadPNG: "تحميل PNG",
    downloadJPG: "تحميل JPG",
    printReport: "طباعة التقرير",
    shareText: "اطلع على حساب الميراث هذا من Heritage Matrix!",
    copied: "تم نسخ النتيجة إلى الحافظة!",
    history: "السجل",
    savedCalculations: "الحسابات المحفوظة",
    noSavedCalculations: "لم يتم العثور على حسابات محفوظة",
    loginToViewHistory: "قم بتسجيل الدخول لحفظ حساباتك وعرضها هنا",
    unknownDeceased: "غير معروف",
    loadDetails: "عرض التفاصيل",
    help: "مساعدة",
    madhhab: "المذهب",
    selectMadhhab: "اختر المذهب",
    hanafi: "حنفي",
    maliki: "مالكي",
    shafii: "شافعي",
    hanbali: "حنبلي",
    tutorial: "تعليمات",
    howToUse: "كيفية الاستخدام",
    stepByStep: "دليل خطوة بخطوة",
    inputExplanation: "تفاصيل حقول الإدخال",
    shariaConcepts: "مفاهيم الميراث الإسلامي",
    madhhabsTitle: "المذاهب والاختلافات الفقهية",
    casesTitle: "المسائل الخاصة والمعقدة",
    feedback: "التعليقات",
    feedbackTitle: "إرسال تعليق أو بلاغ خطأ",
    feedbackType: "النوع",
    suggestion: "اقتراح",
    discrepancy: "خطأ في الحساب",
    message: "رسالتك",
    submit: "إرسال",
    feedbackSuccess: "تم إرسال تعليقاتك بنجاح. شكراً لك!",
    feedbackError: "فشل في إرسال التعليقات.",
    prayerTimes: "أوقات الصلاة",
    qibla: "القبلة",
    fajr: "الفجر",
    dhuhr: "الظهر",
    asr: "العصر",
    maghrib: "المغرب",
    isha: "العشاء",
    nextPrayer: "الصلاة القادمة",
    locating: "جاري تحديد الموقع...",
    notAvailable: "غير متوفر",
    profile: "الملف الشخصي",
    userSettings: "إعدادات المستخدم",
    maritalStatus: "الحالة الاجتماعية",
    single: "أعزب/عزباء",
    married: "متزوج/متزوجة",
    divorced: "مطلق/مطلقة",
    widowed: "أرمل/أرملة",
    notSpecified: "غير محدد",
    preferredLang: "اللغة المفضلة (الإشعارات)",
    emailNotifications: "إشعارات البريد الإلكتروني",
    emailNotificationsDesc: "قم بتفعيل هذا الخيار لتلقي رسائل البريد الإلكتروني حول الحسابات المحفوظة والتحديثات الهامة.",
    saveChanges: "حفظ التغييرات",
    profileUpdated: "تم تحديث الملف الشخصي بنجاح",
    confirmSaveTitle: "حفظ الحساب",
    confirmSaveDesc: "هل أنت متأكد أنك تريد حفظ هذا الحساب؟",
    confirmSaveButton: "نعم، حفظ",
    confirmCancelButton: "إلغاء",
    planLimitTitle: "تم الوصول إلى حد الحفظ",
    planLimitDesc: "في الخطة المجانية، يمكنك حفظ ما يصل إلى 3 حسابات. قم بالترقية إلى برو للحصول على حفظ غير محدود.",
    tour: {
      welcomeTitle: "أهلاً بك!",
      welcomeDesc: "أهلاً بك في حاسبة الميراث الذكية - النظام الدقيق للمواريث الإسلامية.",
      deceasedTitle: "اسم المتوفى",
      deceasedDesc: "ابدأ بإدخال اسم الشخص المتوفى.",
      heirsTitle: "اختيار الورثة",
      heirsDesc: "حدد عدد الورثة للمتوفى.",
      assetsTitle: "تفاصيل الأصول",
      assetsDesc: "أدخل جميع الأصول التي تركها المتوفى.",
      aiTitle: "المساعد الذكي",
      aiDesc: "احصل على إجابات فورية لأسئلة الميراث المعقدة مع مساعدنا الذكي.",
      langTitle: "تغيير اللغة",
      langDesc: "تغيير لغة التطبيق من هنا.",
      moreTitle: "المزيد من الخيارات",
      moreDesc: "الوصول إلى الإعدادات، بوصلة القبلة، وأوقات الصلاة من هذه القائمة.",
      next: "التالي",
      prev: "السابق",
      done: "تم"
    },
    privacyPolicy: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 13 مايو 2026",
      intro: "خصوصيتك تهمنا في هيريتيج ماتريكس. توضح هذه السياسة كيفية جمع معلوماتك واستخدامها وحمايتها.",
      dataCollection: {
        title: "جمع البيانات",
        desc: "نقوم بتخزين معلومات ملفك الشخصي (الاسم والبريد الإلكتروني) وحسابات الميراث الخاصة بك حتى تتمكن من الوصول إليها لاحقاً."
      },
      firebase: {
        title: "الأمان والتخزين",
        desc: "نحن نستخدم Google Firebase لتخزين بياناتك بشكل آمن. تتم حماية معلوماتك عبر بروتوكولات التشفير القياسية في الصناعة."
      },
      usage: {
        title: "كيفية استخدام البيانات",
        desc: "تُستخدم البيانات التي يتم جمعها فقط لتقديم الخدمات لك وتحسين تجربة التطبيق. نحن لا نبيع بياناتك الشخصية لأطراف ثالثة."
      },
      dataRetention: {
        title: "الاحتفاظ بالبيانات وحذفها",
        desc: "نحتفظ بالبيانات طوال فترة نشاط حسابك أو لتقديم الخدمات. يمكنك طلب حذف البيانات في أي وقت."
      },
      thirdParty: {
        title: "الإفصاح لطرف ثالث",
        desc: "لا نبيع أو نتاجر أبداً بمعلومات التعريف الشخصية الخاصة بك لأطراف خارجية."
      },
      childPrivacy: {
        title: "خصوصية الأطفال",
        desc: "تطبيقنا غير مصمم للأطفال دون سن 13 عاماً، ولا نجمع معلومات من الأطفال عن علم."
      },
      userRights: {
        title: "حقوقك",
        desc: "لديك الحق في الوصول إلى بياناتك الشخصية المخزنة في نظامنا أو تصحيحها أو مسحها."
      },
      contact: {
        title: "اتصل بنا",
        desc: "لأية أسئلة متعلقة بالخصوصية، اتصل بنا على aaitcenter24@gmail.com."
      },
      control: {
        title: "تحكمك",
        desc: "يمكنك تحديث ملفك الشخصي أو حذف حساباتك المسجلة في أي وقت من إعداداتك."
      },
      commitment: "تم تصميم Heritage Matrix بسياسة عدم بيع البيانات تماماً. ثقتكم هي جوهر مهمتنا المتمثلة في تقديم حلول ميراث دقيقة وحلال عالمياً.",
      close: "إغلاق",
      share: "مشاركة السياسة",
      shareBody: "اطلع على سياسة الخصوصية لـ Heritage Matrix هنا: "
    },
    subscriptions: {
      title: "باقات الاشتراك",
      choosePlan: "اختر الخطة المثالية لاحتياجاتك",
      free: {
        name: "مجاني",
        price: "0 ر.س / شهرياً",
        features: [
          "ما يصل إلى 3 حسابات محفوظة",
          "تقارير التوزيع الأساسية",
          "تحميل الصور (PNG/JPG)",
          "دعم المجتمع"
        ],
        current: "الخطة الحالية",
        get: "ابدأ الآن"
      },
      pro: {
        name: "برو",
        price: "19.99 ر.س / شهرياً",
        features: [
          "حسابات محفوظة غير محدودة",
          "تحميل تقارير PDF",
          "وصول كامل للمساعد الذكي",
          "تجربة خالية من الإعلانات",
          "دعم ذو أولوية"
        ],
        current: "مفعل",
        get: "ترقية إلى برو"
      },
      backToApp: "العودة للتطبيق"
    }
  },
  ur: {
    appName: "وراثت کا کیلکولیٹر",
    calculate: "حساب کریں",
    rules: "قواعد",
    faq: "سوال و جواب",
    selectHeirs: "وارثوں کا انتخاب",
    assets: "اثاثے",
    land: "زمین",
    money: "رقم",
    gold: "سونا",
    silver: "چاندی",
    unitLand: "رقم",
    unitMoney: "₨",
    unitGold: "تولہ",
    unitSilver: "تولہ",
    reset: "دوبارہ شروع",
    calculateButton: "حساب لگائیں",
    back: "واپس",
    download: "ڈاؤن لوڈ",
    reportTitle: "تقسیمِ وراثت کی رپورٹ",
    heirsCount: "وارثوں کی تعداد",
    calculationCorrect: "حساب درست ہے",
    summaryTitle: "خلاصہ تقسیم",
    stepsTitle: "حساب کے مراحل",
    detailsTitle: "تفصیلی رپورٹ",
    heirHeader: "وارث",
    shareHeader: "حصہ",
    landHeader: "زمین",
    goldHeader: "سونا",
    silverHeader: "چاندی",
    moneyHeader: "رقم",
    relationshipHeader: "رشتہ",
    relOfDeceased: (h: string) => `مرحوم کا ${h}`,
    sortByName: "نام کے مطابق ترتیب دیں",
    settings: "ترتیبات",
    selectCountry: "ملک منتخب کریں",
    activeCountry: "فعال ملک",
    activeMadhhab: "فعال مذہب",
    total: "کل",
    recalculateNow: "ابھی دوبارہ حساب کریں",
    dismiss: "خارج کریں",
    advisoryTitle: "قانونی نوٹس",
    advisoryText: "یہ حسابات صرف مذہبی رہنمائی کے لیے ہیں۔ قانونی فیصلے سے پہلے کسی ماہرِ قانون سے مشورہ کریں۔",
    rulesHeader: "وراثت کے اصول",
    ruleTabs: {
      sa: "سعودی عرب",
      bd: "بنگلہ دیش",
      za: "جنوبی افریقہ",
      pk: "پاکستان",
      schools: "فقہی مذاہب"
    },
    faqHeader: "اکثر پوچھے گئے سوالات",
    footerTitle: "Inheritance Matrix",
    footerCopy: "© 2026 • AI Logic",
    groups: {
      immediate: "قریبی خاندان",
      ancestors: "آباؤ اجداد",
      siblings: "بہن بھائی",
      extended: "دیگر وارث"
    },
    recalculatePrompt: (country: string, madhhab: string, langName: string, currency: string) => `آپ نے اپنا ملک تبدیل کر کے ${country} منتخب کیا ہے۔\nزبان: ${langName} | کرنسی: ${currency} | مذہب: ${madhhab}\nکیا آپ نئے ملک کی ترتیبات کے ساتھ دوبارہ حساب کرنا چاہتے ہیں؟`,
    yes: "جی ہاں",
    no: "جی نہیں",
    errorHeirCount: "وارثوں کی تعداد منفی نہیں ہو سکتی۔",
    errorAssetNegative: "اثاثوں کی مقدار منفی نہیں ہو سکتی۔",
    errorAssetInvalid: "براہ کرم درست نمبر درج کریں۔",
    reportSummary: "رپورٹ کا خلاصہ",
    madhhab: "مذہب",
    share: "شیئر",
    copied: "کاپی ہو گیا",
    history: "تاریخچہ",
    help: "مدد",
    feedback: "رائے",
    deceasedNameLabel: "مرحوم کا نام",
    deceasedNamePlaceholder: "مرحوم کا نام درج کریں (اختیاری)",
    heirNamePlaceholder: "وارث کا نام",
    heirNamesTitle: "وارثوں کے نام درج کریں (اختیاری)",
    unknownDeceased: "نامعلوم مرحوم",
    loadDetails: "تفصیلات لوڈ کریں",
    savedCalculations: "محفوظ کردہ حسابات",
    loginToViewHistory: "تاریخچہ دیکھنے کے لیے لاگ ان کریں",
    noSavedCalculations: "کوئی محفوظ حساب نہیں ملا",
    submit: "ارسال کریں",
    feedbackSuccess: "رائے بھیجنے کا شکریہ",
    feedbackError: "خرابی پیش آگئی",
    shareText: "وراثت کی تقسیم کا حساب",
    prayerTimes: "نماز کے اوقات",
    qibla: "قبلہ",
    confirmSaveTitle: "محفوظ کریں",
    confirmSaveDesc: "کیا آپ اس حساب کو محفوظ کرنا چاہتے ہیں؟",
    confirmSaveButton: "محفوظ کریں",
    confirmCancelButton: "کینسل",
    planLimitTitle: "حد ختم",
    planLimitDesc: "آپ کی مفت حد ختم ہو چکی ہے۔",
    casesTitle: "خاص مسائل",
    tour: {
      next: "اگلا",
      prev: "پیچھے",
      done: "مکمل",
      welcomeTitle: "خوش آمدید",
      welcomeDesc: "وراثت کے کیلکولیٹر میں خوش آمدید۔",
      deceasedTitle: "مرحوم کی معلومات",
      deceasedDesc: "مرحوم کا نام اور کُل اثاثے درج کریں۔",
      heirsTitle: "وارثوں کا انتخاب",
      heirsDesc: "وارثوں کا انتخاب کریں",
      assetsTitle: "اثاثے",
      assetsDesc: "اثاثوں کی تفصیلات",
      aiTitle: "اے آئی رپورٹ",
      aiDesc: "اے آئی سے تیار کردہ رپورٹ",
      langTitle: "زبان",
      langDesc: "زبان تبدیل کریں",
      moreTitle: "مزید",
      moreDesc: "مزید اختیارات"
    },
    privacyPolicy: {
      title: "رازداری کی پالیسی",
      lastUpdated: "آخری اپ ڈیٹ: 13 مئی 2026",
      intro: "ہیریٹیج میٹرکس میں آپ کی رازداری ہمارے لیے اہم ہے۔",
      dataCollection: { title: "ڈیٹا جمع کرنا", desc: "ہم آپ کی معلومات کو محفوظ طریقے سے جمع کرتے ہیں۔" },
      firebase: { title: "سیکورٹی", desc: "ہم گوگل فائر بیس استعمال کرتے ہیں۔" },
      usage: { title: "استعمال", desc: "آپ کا ڈیٹا فروخت نہیں کیا جاتا۔" },
      dataRetention: { title: "رکھنا اور حذف کرنا", desc: "آپ کسی بھی وقت ڈیٹا حذف کر سکتے ہیں۔" },
      thirdParty: { title: "تیسرا فریق", desc: "ہم معلومات شیئر نہیں کرتے۔" },
      childPrivacy: { title: "بچوں کی رازداری", desc: "یہ ایپ بچوں کے لیے نہیں ہے۔" },
      userRights: { title: "آپ کے حقوق", desc: "آپ کو اپنے ڈیٹا تک رسائی کا حق ہے۔" },
      contact: { title: "رابطہ", desc: "ہم سے رابطہ کریں: aaitcenter24@gmail.com" },
      control: { title: "کنٹرول", desc: "آپ اپنی ترتیبات خود کنٹرول کر سکتے ہیں۔" },
      commitment: "ہماری رازداری کی پالیسی آپ کے لیے وقف ہے۔",
      close: "بند کریں",
      share: "شیئر کریں",
      shareBody: "پالیسی دیکھیں: "
    },
    subscriptions: {
      title: "سبسکرپشن پیکجز",
      choosePlan: "اپنے لیے بہترین پلان کا انتخاب کریں",
      free: { name: "مفت", price: "0 روپے / مہینہ", features: ["3 محفوظ حسابات", "بنیادی رپورٹ", "ایمیج ڈاؤن لوڈ", "کمیونٹی سپورٹ"], current: "موجودہ پلان", get: "شروع کریں" },
      pro: { name: "پرو", price: "100 روپے / مہینہ", features: ["لامحدود حسابات", "پی ڈی ایف ڈاؤن لوڈ", "اے آئی اسسٹنٹ", "بغیر اشتہارات", "ترجیحی سپورٹ"], current: "فعال ہو گیا", get: "پرو پر اپ گریڈ کریں" },
      backToApp: "ایپ پر واپس"
    }
  },
  ms: {
    appName: "Kalkulator Warisan",
    calculate: "Kira",
    rules: "Syarat",
    faq: "Soalan Lazim",
    selectHeirs: "Pilih Waris",
    assets: "Harta",
    land: "Tanah",
    money: "Wang",
    gold: "Emas",
    silver: "Perak",
    unitLand: "unit",
    unitMoney: "RM",
    unitGold: "Gram",
    unitSilver: "Gram",
    reset: "Set semula",
    calculateButton: "Kira Sekarang",
    back: "Kembali",
    download: "Muat turun",
    reportTitle: "Laporan Pembahagian Harta",
    heirsCount: "Bilangan Waris",
    calculationCorrect: "Kiraan Betul",
    summaryTitle: "Ringkasan Pembahagian",
    stepsTitle: "Langkah Pengiraan",
    detailsTitle: "Pecahan Terperinci",
    heirHeader: "Waris",
    shareHeader: "Bahagian",
    landHeader: "Tanah",
    goldHeader: "Emas",
    silverHeader: "Perak",
    moneyHeader: "Wang",
    relationshipHeader: "Hubungan",
    relOfDeceased: (h: string) => `${h} Si Mati`,
    sortByName: "Susun mengikut Nama",
    settings: "Tetapan",
    selectCountry: "Pilih Negara",
    activeCountry: "Negara Aktif",
    activeMadhhab: "Mazhab Aktif",
    total: "Jumlah",
    recalculateNow: "Kira Semula Sekarang",
    dismiss: "Batal",
    advisoryTitle: "Nasihat Undang-undang",
    advisoryText: "Pengiraan ini adalah untuk panduan agama sahaja. Sila rujuk pakar undang-undang tempatan sebelum membuat keputusan.",
    rulesHeader: "Garis Panduan Pewarisan",
    ruleTabs: {
      sa: "Arab Saudi",
      bd: "Bangladesh",
      za: "Afrika Selatan",
      pk: "Pakistan",
      schools: "Mazhab"
    },
    faqHeader: "Soalan Lazim",
    footerTitle: "Inheritance Matrix",
    footerCopy: "© 2026 • AI Logic",
    groups: {
      immediate: "Keluarga Terdekat",
      ancestors: "Nenek Moyang",
      siblings: "Adik Beradik",
      extended: "Keluarga Besar"
    },
    recalculatePrompt: (country: string, madhhab: string, langName: string, currency: string) => `Anda telah menukar negara ke ${country}.\nBahasa: ${langName} | Mata Wang: ${currency} | Mazhab: ${madhhab}\nAdakah anda ingin mengira semula kes pewarisan semasa anda dengan tetapan negara baharu?`,
    yes: "Ya",
    no: "Tidak",
    errorHeirCount: "Bilangan waris tidak boleh negatif.",
    errorAssetNegative: "Jumlah harta tidak boleh negatif.",
    errorAssetInvalid: "Sila masukkan nombor yang sah.",
    reportSummary: "Ringkasan Laporan",
    madhhab: "Mazhab",
    share: "Kongsi",
    copied: "Disalin",
    history: "Sejarah",
    help: "Bantuan",
    feedback: "Maklum Balas",
    privacyPolicy: "Dasar Privasi",
    deceasedNameLabel: "Nama Si Mati",
    deceasedNamePlaceholder: "Masukkan nama si mati (pilihan)",
    heirNamePlaceholder: "Nama Waris",
    heirNamesTitle: "Masukkan Nama Waris (pilihan)",
    unknownDeceased: "Si Mati Tanpa Nama",
    loadDetails: "Muat Butiran",
    savedCalculations: "Kiraan Disimpan",
    loginToViewHistory: "Log masuk untuk lihat sejarah",
    noSavedCalculations: "Tiada kiraan disimpan",
    submit: "Hantar",
    feedbackSuccess: "Terima kasih atas maklum balas",
    feedbackError: "Ralat berlaku",
    shareText: "Kiraan Pembahagian Warisan",
    prayerTimes: "Waktu Solat",
    qibla: "Kiblat",
    confirmSaveTitle: "Simpan",
    confirmSaveDesc: "Adakah anda ingin menyimpan kiraan ini?",
    confirmSaveButton: "Simpan",
    confirmCancelButton: "Batal",
    planLimitTitle: "Had Dicapai",
    planLimitDesc: "Had percuma anda telah dicapai.",
    casesTitle: "Kes Khas",
    tour: {
      next: "Seterusnya",
      prev: "Sebelumnya",
      done: "Selesai",
      welcomeTitle: "Selamat Datang",
      welcomeDesc: "Selamat datang ke Kalkulator Warisan.",
      deceasedTitle: "Maklumat Si Mati",
      deceasedDesc: "Masukkan nama si mati dan jumlah harta.",
      heirsTitle: "Pilih Waris",
      heirsDesc: "Pilih waris yang berkenaan.",
      assetsTitle: "Harta",
      assetsDesc: "Butiran harta pusaka.",
      aiTitle: "Laporan AI",
      aiDesc: "Laporan rumusan AI.",
      langTitle: "Bahasa",
      langDesc: "Tukar bahasa.",
      moreTitle: "Lagi",
      moreDesc: "Lagi pilihan."
    }
  }
};

export const HELP_CONTENT = {
  bn: {
    steps: [
      { title: "১. মৃত ব্যক্তির তথ্য", text: "শুরুতেই মৃত ব্যক্তির নাম (ঐচ্ছিক) এবং রেখে যাওয়া অর্থের পরিমাণ, জমি (শতক/ম²), স্বর্ণ ও রৌপ্যের পরিমাণ লিখুন।" },
      { title: "২. ওয়ারিশ নির্বাচন", text: "কীবোর্ড বা বাটন ব্যবহার করে নিকটাত্মীয় (স্বামী, স্ত্রী ও সন্তান), পূর্বপুরুষ (পিতা-মাতা) এবং ভাই-বোনদের সংখ্যা দিন।" },
      { title: "৩. দেশ নির্বাচন", text: "সেটিংস থেকে আপনার দেশ (বাংলাদেশ, সৌদি আরব বা দক্ষিণ আফ্রিকা) নির্বাচন করুন। দেশ অনুযায়ী আইন ও মুদ্রার পরিবর্তন হবে।" },
      { title: "৪. হিসাব ও রিপোর্ট", text: "বণ্টন দেখতে 'হিসাব করুন' বাটনে ক্লিক করুন। এখান থেকে রিপোর্টটি PDF বা ইমেজ হিসেবে ডাউনলোড করতে পারবেন।" }
    ],
    fields: [
      { name: "জমি (Land)", desc: "বাংলাদেশে 'শতক', সৌদি আরবে 'বর্গমিটার (m²)' এবং দক্ষিণ আফ্রিকায় 'হেক্টর (ha)' হিসেবে জমি হিসাব করা হয়।" },
      { name: "নগদ অর্থ (Cash)", desc: "দফন-কাফন ও মৃত ব্যক্তির ঋণ পরিশোধের পর অবশিষ্ট নগদ অর্থের পরিমাণ দিন।" },
      { name: "স্বর্ণ ও রৌপ্য", desc: "মৃত ব্যক্তির কাছে থাকা স্বর্ণ ও রৌপ্যের মোট ওজন (ভরি/গ্রাম) দিন।" }
    ],
    theory: [
      { title: "আসহাবুল ফুরুজ (Fixed Sharer)", desc: "যাদের অংশ কুরআন ও সুন্নাহ দ্বারা নির্ধারিত। যেমন: স্বামী, স্ত্রী, মাতা, পিতা, কন্যা ইত্যাদি। কুরআনে মোট ১২ জন নির্ধারিত অংশীদারের কথা বলা হয়েছে।" },
      { title: "আসাবা (Residuary)", desc: "নির্ধারিত অংশীদারদের অংশ দেওয়ার পর অবশিষ্ট সম্পদ যারা পান। যেমন: পুত্র, ভাই, চাচা। পুত্র থাকলে মৃত ব্যক্তির কন্যারাও আসাবা হিসেবে ২:১ অনুপাতে ভাগ পান।" },
      { title: "আউল (Aul - Increase)", desc: "যদি নির্ধারিত অংশীদারদের মোট অংশের যোগফল ১-এর বেশি হয়ে যায়, তবে গাণিতিক পদ্ধতির মাধ্যমে সকলের অংশ আনুপাতিক হারে কমিয়ে সমন্বয় করা হয়।" },
      { title: "রাদ্দ (Radd - Return)", desc: "যদি আসাবা না থাকে এবং নির্ধারিত অংশীদারদের অংশ দেওয়ার পর সম্পদ অবশিষ্ট থাকে, তবে স্বামী ও স্ত্রী বাদে অন্যদের মধ্যে তা ফিরিয়ে দেওয়া হয়।" },
      { title: "হাজব (Exclusion)", desc: "নিকটবর্তী কোনো ওয়ারিশের উপস্থিতিতে দূরবর্তী কোনো ওয়ারিশ বঞ্চিত হওয়া। যেমন: পিতা থাকলে দাদা বঞ্চিত হন, পুত্র থাকলে নাতি বঞ্চিত হন।" }
    ],
    madhhabs: [
      { name: "হানাফী (Hanafi)", desc: "বাংলাদেশ, পাকিস্তান ও ভারতে সর্বাধিক প্রচলিত। এই মাজহাবে দাদা থাকলে ভাই-বোনেরা মিরাস থেকে পূর্ণ বঞ্চিত হয়।" },
      { name: "শাফিঈ ও মালিকী (Shafi'i & Maliki)", desc: "এই মাজহাবগুলোতে দাদা ও ভাইবোনেরা একত্রে মিরাস পান (মুকাসামা)। এছাড়া 'মুশতারাকা' মাসয়ালায় সহোদর ভাইদের অংশ দেওয়া হয়।" },
      { name: "হাম্বলী (Hanbali)", desc: "সৌদি আরবে প্রচলিত। এটি দাদা ও ভাইদের অংশীদারিত্ব সমর্থন করে কিন্তু 'মুশতারাকা' সমর্থন করে না।" }
    ],
    cases: [
      { name: "আল-আকদারিয়া (Al-Akdariya)", desc: "স্বামী, মা, দাদা ও ১ জন বোনের বিশেষ মাসয়ালা। এখানে বোনকে বঞ্চিত না করে দাদার অংশের সাথে যুক্ত করে পুনরায় ৪:৯ ও ২:৯ অনুপাতে ভাগ করা হয়।" },
      { name: "আল-মা’আদ্দা (Al-Ma’adda)", desc: "দাদা ও ভাইদের সহাবস্থানের মাসয়ালা। এখানে সহোদর ভাইয়েরা বৈমাত্রীয় ভাইদের গণনা করে দাদার অংশ কমিয়ে দেয় এবং পরে নিজেরা পুরোটা নিয়ে নেয়।" },
      { name: "মুশতারাকা (The Shared Case)", desc: "স্বামী, মা, বৈপিত্রীয় ভাই ও সহোদর ভাই থাকলে সহোদর ভাইয়েরা বৈপিত্রীয় ভাইদের সমান ১/৩ অংশে ভাগ করে নেয়।" },
      { name: "উম্মারিয়া (Umariyatayn)", desc: "যখন কেবল স্বামী/স্ত্রী এবং পিতা-মাতা থাকেন, তখন মাকে মোট সম্পত্তির ১/৩ না দিয়ে স্বামী/স্ত্রীর অংশ দেওয়ার পর অবশিষ্টের ১/৩ দেওয়া হয়।" }
    ]
  },
  en: {
    steps: [
      { title: "1. Deceased Info", text: "Start by entering the deceased person's name (optional) and the amount of cash, land (Dec/m²/ha), gold, and silver left behind." },
      { title: "2. Select Heirs", text: "Enter the number of surviving relatives using the buttons or keyboard for Immediate, Ancestors, and Siblings." },
      { title: "3. Choose Country", text: "Go to settings to select your country. Calculation logic, currency, and units will update accordingly." },
      { title: "4. Result & Report", text: "Click 'Calculate' to see the distribution. You can download the report as PDF, PNG, or JPG." }
    ],
    fields: [
      { name: "Land", desc: "Measured in 'Dec' (Decimal) for BD, 'm²' for Saudi Arabia, and 'ha' (Hectares) for South Africa." },
      { name: "Cash Assets", desc: "Enter the total liquid cash remaining after funeral expenses and debt settlements." },
      { name: "Gold & Silver", desc: "Total weight of gold and silver holdings (Vori/Gram) of the deceased." }
    ],
    theory: [
      { title: "Fixed Sharers (Faraid)", desc: "Heirs whose shares are explicitly defined in the Quran (e.g., Husband, Wife, Parents). There are 12 such primary relatives." },
      { title: "Residuaries (Asabah)", desc: "Relatives who inherit the remainder of the estate after fixed sharers are satisfied (e.g., Son, Father, Brother). Sons make daughters residuaries in a 2:1 ratio." },
      { title: "Aul (Increase)", desc: "A mathematical adjustment where the sum of calculated shares exceeds 1. All shares are reduced proportionally to fit the total estate." },
      { title: "Radd (Return)", desc: "The opposite of Aul; when there's a surplus after fixed shares and no residuaries exist, the excess returns to fixed sharers (except the spouse)." },
      { title: "Hajb (Exclusion)", desc: "The principle where closer relatives exclude more distant ones. E.g., the father excludes the grandfather; the son excludes the grandson." }
    ],
    madhhabs: [
      { name: "Hanafi School", desc: "Most common in South Asia. In this school, the paternal grandfather completely excludes all brothers and sisters." },
      { name: "Shafi'i & Maliki Schools", desc: "Common in SE Asia and Africa. They allow the grandfather to share the estate with siblings (Muqasama) and support the 'Shared Case'." },
      { name: "Hanbali School", desc: "Official in Saudi Arabia. It supports siblings sharing with the grandfather but rejects the 'Shared Case' (Mushtaraka)." }
    ],
    cases: [
      { name: "Al-Akdariya", desc: "A unique case with Husband, Mother, Grandfather, and Sister. In the majority view, the sister's share is recalibrated with the grandfather's portion." },
      { name: "Al-Ma'adda (The Counting)", desc: "A strategy where full siblings calculate consanguine siblings to reduce the grandfather's share in Muqasama before excluding them." },
      { name: "The Mushtaraka Case", desc: "Where full brothers are allowed to share the 1/3 portion with uterine siblings instead of getting nothing as residuaries." },
      { name: "The Umariya (Gharrawain)", desc: "Cases involving only a spouse and parents where the mother receives 1/3 of the 'Remainder' instead of 1/3 of the 'Total'." }
    ]
  },
  ar: {
    steps: [
      { title: "1. معلومات المتوفى", text: "ابدأ بإدخال اسم المتوفى (اختياري) ومقدار النقد والأرض (م²) والذهب والفضة المتبقية." },
      { title: "2. اختيار الورثة", text: "أدخل عدد الأقارب الأحياء باستخدام الأزرار أو لوحة المفاتيح للأقارب المباشرين والأسلاف والإخوة." },
      { title: "3. اختر الدولة", text: "انتقل إلى الإعدادات لاختيار بلدك. سيتم تحديث منطق الحساب والعملة والوحدات وفقاً لذلك." },
      { title: "4. النتيجة والتقرير", text: "انقر على 'احسب' لرؤية التوزيع. يمكنك تحميل التقرير كـ PDF أو PNG أو JPG." }
    ],
    fields: [
      { name: "الأرض", text: "تُقاس بالمتر المربع (m²) في المملكة العربية السعودية والهكتار في جنوب أفريقيا." },
      { name: "الأصول النقدية", text: "أدخل إجمالي النقد السائل المتبقي بعد نفقات الجنازة وتسوية الديون." },
      { name: "الذهب والفضة", text: "إجمالي وزن حيازات الذهب والفضة (جرام) للمتوفى." }
    ],
    theory: [
      { title: "أصحاب الفروض", text: "الورثة الذين حُددت أنصبتهم صراحة في القرآن الكريم (12 وارثاً مثل الزوج، الزوجة، الوالدين)." },
      { title: "العصبات", text: "الأقارب الذين يرثون ما تبقى من التركة بعد استيفاء أصحاب الفروض (مثل الابن، الأب، الأخ)." },
      { title: "العول", text: "زيادة في عدد السهام عن أصل المسألة، مما يترتب عليه نقص في أنصبة الورثة بنسبة سهامهم." },
      { title: "الرد", text: "عكس العول؛ عند وجود فائض بعد أصحاب الفروض وعدم وجود عصبة، يُرد الفائض عليهم (عدا الزوجين)." },
      { title: "الحجب", text: "منع وارث من الإرث كلياً أو جزئياً لوجود وارث آخر هو أقرب منه. مثل حجب الأب للجد." }
    ],
    madhhabs: [
      { name: "المذهب الحنفي", text: "الأكثر انتشاراً في شبه القارة الهندية. الجد فيه يحجب الإخوة تماماً كالأب." },
      { name: "الشافعية والمالكية", text: "ينتشرون في جنوب شرق آسيا وأفريقيا. يسمحون بمشاركة الجد للإخوة (المقاسمة) ويقبلون 'التشريك'." },
      { name: "المذهب الحنبلي", text: "المعتمد في المملكة العربية السعودية. يأخذ بالمقاسمة لكنه لا يرى التشريك في المسألة المشركة." }
    ],
    cases: [
      { name: "المسألة الأكدرية", text: "مسألة فريدة (زوج، أم، جد، أخت شقيقة) تُحل عند الجمهور بطريقة تضمن للأخت نصيباً بتعديل معين (4/9 و 2/9)." },
      { name: "المعاذة", text: "إستراتيجية يعدّ فيها الأشقاءُ الإخوةَ لأب على الجد لنقص حظه بالمقাসمة، ثم يحجب الأشقاء الإخوة لأب." },
      { name: "المسألة المشركة", text: "حالة (زوج، أم، إخوة لأم، وأخ شقيق) حيث يشارك الأخ الشقيق الإخوة لأم في ثلثهم عند الشافعية والمالكية." },
      { name: "المسألة العمريّة (الغراوين)", text: "المسألة التي تنحصر في أب وأم وأحد الزوجين، وتأخذ فيها الأم ثلث الباقي." }
    ]
  },
  ur: {
    steps: [
      { title: "1. مرحوم کی معلومات", text: "مرحوم کا نام (اختیاری) اور چھوڑی ہوئی نقد رقم، زمین، سونا اور چاندی کی تفصیلات درج کریں۔" },
      { title: "2. وارثوں کا انتخاب", text: "بٹن یا کی بورڈ کا استعمال کرتے ہوئے قریبی رشتہ داروں (شریک حیات، والدین اور اولاد) اور بہن بھائیوں کی تعداد درج کریں۔" },
      { title: "3. ملک کا انتخاب", text: "ترتیبات سے اپنا ملک منتخب کریں۔ ملک کے مطابق قوانین، کرنسی اور اکائیاں اپ ڈیٹ ہو جائیں گی۔" },
      { title: "4. نتیجہ اور رپورٹ", text: "'حساب کریں' پر کلک کریں تاکہ تقسیم دیکھی جا سکے۔ آپ رپورٹ کو PDF یا امیج کے طور پر ڈاؤن لوڈ کر سکتے ہیں۔" }
    ],
    fields: [
      { name: "زمین", desc: "پاکستان میں 'کنال/مرلہ' اور دیگر علاقوں میں م² یا ہیکٹر کے طور پر ناپی جاتی ہے۔" },
      { name: "نقد اثاثے", desc: "تدفین کے اخراجات اور قرضوں کی ادائیگی کے بعد بچنے والی کُل رقم درج کریں۔" },
      { name: "سونا اور چاندی", desc: "مرحوم کے سونا اور چاندی کے کُل وزن (تولہ/گرام) کی تفصیل۔" }
    ],
    theory: [
      { title: "اصحاب الفروض", desc: "وہ وارث جن کے حصے قرآن و سنت میں طے شدہ ہیں۔ جیسے: شوہر، بیوی، والدین۔ مجموعی طور پر ایسے 12 قریبی رشتہ دار ہیں۔" },
      { title: "عصبات", desc: "وہ رشتہ دار جو اصحاب الفروض کے حصے دینے کے بعد بچا ہوا مال وصول کرتے ہیں۔ جیسے: بیٹا، باپ، بھائی۔ بیٹا ہونے کی صورت میں بیٹیاں 2:1 کے تناسب سے شریک ہوتی ہیں۔" },
      { title: "عول", desc: "ایک ریاضیاتی طریقہ جب حصوں کا مجموعہ 1 سے بڑھ جائے۔ تمام حصوں کو متناسب طور پر کم کر دیا جاتا ہے۔" },
      { title: "رد", desc: "عول کا الٹ؛ جب اصحاب الفروض کے بعد مال بچ جائے اور کوئی عصبہ نہ ہو، تو بچا ہوا مال (شوہر/بیوی کے علاوہ) وارثوں کو واپس مل جاتا ہے۔" },
      { title: "حجب", desc: "وہ اصول جس میں قریبی رشتہ دار دور کے رشتہ داروں کو حصے سے محروم کر دیتے ہیں۔ مثلاً: باپ کی موجودگی میں دادا محروم ہو جاتا ہے۔" }
    ],
    madhhabs: [
      { name: "فقہ حنفی", desc: "برصغیر پاک و ہند میں سب سے زیادہ رائج۔ اس میں دادا کی موجودگی میں بہن بھائی محروم ہو جاتے ہیں۔" },
      { name: "شافعی اور مالکی", desc: "جنوب مشرقی ایشیا اور افریقہ میں رائج۔ یہ دادا کے ساتھ بہن بھائیوں کی شرکت (مقاسمہ) کو تسلیم کرتے ہیں۔" },
      { name: "فقہ حنبلی", desc: "سعودی عرب میں سرکاری طور پر رائج۔ یہ بھی دادا کے ساتھ بہن بھائیوں کی شرکت کی حمایت کرتا ہے۔" }
    ],
    cases: [
      { name: "الاکدریہ", desc: "شوہر، ماں، دادا اور ایک بہن کی موجودگی کا خاص مسئلہ۔ اس میں بہن کا حصہ دادا کے ساتھ ملا کر دوبارہ سے طے کیا جاتا ہے۔" },
      { name: "المعادہ", desc: "دادا کے ساتھ بہن بھائیوں کی تقسیم کا طریقہ۔" },
      { name: "المشرکہ", desc: "وہ مسئلہ جہاں سگے بھائیوں کو ماں جائے بھائیوں کے ساتھ ثلث (1/3) حصے میں شریک کیا جاتا ہے۔" },
      { name: "عمریتین", desc: "صرف شوہر/بیوی اور والدین کی موجودگی میں ماں کو 'باقی ماندہ' کا 1/3 دیا جاتا ہے۔" }
    ]
  },
  ms: {
    steps: [
      { title: "1. Maklumat Si Mati", text: "Mulakan dengan memasukkan nama si mati (pilihan) serta jumlah tunai, tanah, emas, dan perak yang ditinggalkan." },
      { title: "2. Pilih Waris", text: "Masukkan bilangan waris yang masih hidup menggunakan butang untuk Waris Dekat, Datuk/Nenek, dan Adik Beradik." },
      { title: "3. Pilih Negara", text: "Pergi ke tetapan untuk memilih negara anda. Logik pengiraan, mata wang, dan unit akan dikemas kini mengikut negara." },
      { title: "4. Keputusan & Laporan", text: "Klik 'Kira Sekarang' untuk melihat pembahagian. Anda boleh memuat turun laporan sebagai PDF atau imej." }
    ],
    fields: [
      { name: "Tanah", desc: "Diukur dalam unit m² untuk Arab Saudi atau hektar untuk Afrika Selatan mengikut konfigurasi negara." },
      { name: "Aset Tunai", desc: "Masukkan jumlah tunai bersih selepas ditolak belanja pengebumian dan penyelesaian hutang." },
      { name: "Emas & Perak", desc: "Jumlah berat pegangan emas dan perak si mati dalam unit gram atau mengikut tetapan." }
    ],
    theory: [
      { title: "Ashabul Furud", desc: "Waris yang bahagiannya ditentukan secara tetap dalam Al-Quran (cth: Suami, Isteri, Ibu, Bapa). Terdapat 12 kategori waris utama." },
      { title: "Asabah", desc: "Waris yang menerima baki harta selepas bahagian Ashabul Furud dipenuhi (cth: Anak Lelaki, Bapa, Saudara Lelaki)." },
      { title: "Aul", desc: "Pelarasan matematik apabila jumlah bahagian melebihi 1. Semua bahagian akan dikurangkan secara berkadar." },
      { title: "Radd", desc: "Kebalikan daripada Aul; apabila terdapat baki selepas Ashabul Furud dan tiada asabah, baki dipulangkan kepada waris (kecuali pasangan)." },
      { title: "Hajb", desc: "Prinsip di mana waris lebih dekat menghalang waris lebih jauh daripada menerima harta (cth: Bapa menghalang Datuk)." }
    ],
    madhhabs: [
      { name: "Mazhab Hanafi", desc: "Sangat biasa di Asia Selatan. Dalam mazhab ini, datuk menghalang semua saudara lelaki dan perempuan." },
      { name: "Mazhab Syafi'i & Maliki", desc: "Dominan di Malaysia dan Asia Tenggara. Datuk berkongsi harta dengan adik-beradik (Muqasama)." },
      { name: "Mazhab Hanbali", desc: "Rasmi di Arab Saudi. Menyokong perkongsian datuk dengan adik-beradik tetapi menolak kes Mushtaraka tertentu." }
    ],
    cases: [
      { name: "Al-Akdariya", desc: "Kes unik melibatkan Suami, Ibu, Datuk, dan Saudara Perempuan di mana pengiraan khas digunakan." },
      { name: "Al-Ma'adda", desc: "Strategi di mana saudara kandung 'mengira' saudara sebapa untuk mengurangkan bahagian datuk." },
      { name: "Kes Mushtaraka", desc: "Di mana saudara kandung dibenarkan berkongsi bahagian 1/3 dengan saudara seibu." },
      { name: "Kes Umariya", desc: "Kes melibatkan hanya pasangan dan ibu bapa di mana ibu menerima 1/3 daripada baki." }
    ]
  }
};

export const INHERITANCE_RULES = {
  bn: [
    {
      countryCode: "SA",
      title: "সৌদি আরবীয় উত্তরাধিকার অবকাঠামো (শরীআহ আইন)",
      content: "সৌদি আরবে উত্তরাধিকার বিভাজন 'পার্সোনাল স্ট্যাটাস ল' (রয়্যাল ডিক্রি M/73) দ্বারা কঠোরভাবে নিয়ন্ত্রিত। এটি মূলত হাম্বলী মযহাবের শরীয়াহ আইনের ওপর ভিত্তি করে তৈরি, যা ওয়ারিশদের সুনির্দিষ্ট অংশের পাশাপাশি মৃত ব্যক্তির অন্যান্য দায়বদ্ধতাকেও গুরুত্ব দেয়।",
      points: [
        "অগ্রাধিকারমূলক কাজ: সম্পদ বণ্টনের আগে চারটি ধারাবাহিক কাজ সম্পন্ন করতে হবে: ১. দাফন ও শেষকৃত্যের খরচ, ২. মৃত ব্যক্তির ঋণ (তাকাবি), ৩. অ-ওয়ারিশদের জন্য বৈধ ওসিয়ত (মোট সম্পত্তির সর্বোচ্চ ১/৩), ৪. অবশিষ্ট সম্পত্তি ওয়ারিশদের বণ্টন।",
        "প্রাপ্তিতে বাধা (মওয়ানি): ৩টি কারণে কেউ মিরাস থেকে বঞ্চিত হতে পারেন: ১. মৃত ব্যক্তিকে হত্যা করা (কিল), ২. ধর্মের ভিন্নতা (মুসলিম ও অমুসলিমের মধ্যে মিরাস হয় না), ৩. দাসত্ব (যা বর্তমানে নেই)।",
        "ওয়ারিশদের শ্রেণীবিভাগ: ১. সুনির্দিষ্ট অংশীদার (আসহাবুল ফুরুজ - ১২ জন), ২. অবশিষ্টভোগী (আসাবা), ৩. দূরবর্তী আত্মীয় (যাভিল আরহাম)।",
        "নিকটাত্মীয়দের অংশ: স্বামী পান ১/২ (সন্তান না থাকলে) অথবা ১/৪ (সন্তান থাকলে)। স্ত্রী পান ১/৪ (সন্তান না থাকলে) অথবা ১/৮ (সন্তান থাকলে)। কন্যা একজন হলে পান ১/২, একাধিক হলে ২/৩। পুত্র থাকলে কন্যারা আসাবা হিসেবে ২:১ অনুপাতে ভাগ পান।",
        "পিতা-মাতার অংশ: মা ১/৬ পান (সন্তান বা একাধিক ভাইবোন থাকলে), অন্যথায় ১/৩। পিতা ১/৬ পান (পুত্র সন্তান থাকলে), অন্যথায় অবশিষ্টভোগী হিসেবে অংশ পান।",
        "উম্মারিয়া মাসয়ালা: যখন কেবল স্বামী/স্ত্রী এবং পিতা-মাতা বেঁচে থাকে, তখন মা নির্ধারিত অংশের বদলে স্বামী/স্ত্রীর অংশ দেওয়ার পর অবশিষ্টের ১/৩ পান।",
        "আউল (Aul) ও রাদ্দ (Radd): যদি নির্ধারিত অংশগুলো মোট সম্পদের চেয়ে বেশি হয় তবে আনুপাতিক হারে কমানো হয় (আউল)। আর যদি সম্পদ উদ্বৃত্ত থাকে (আসাবা না থাকে) তবে স্বাম-স্ত্রী বাদে অন্যদের মধ্যে তা ফিরিয়ে দেওয়া হয় (রাদ্দ)।"
      ]
    },
    {
      countryCode: "BD",
      title: "বাংলাদেশী মুসলিম উত্তরাধিকার আইন (হানাফী মাযহাব)",
      content: "বাংলাদেশে প্রচলিত পারিবারিক আদালত ও মুসলিম আইন অনুযায়ী মিরাস বণ্টনের মূল নীতিসমূহ নিম্নরূপ:",
      points: [
        "জবিউল ফুরুজ (১২ জন): স্বামী, স্ত্রী, পিতা, মাতা, দাদা, দাদি/নানি, কন্যা, পুত্রের কন্যা, সহোদর বোন, বৈমাত্রীয় বোন, বৈপিত্রেয় ভাই ও বোন। এদের অংশ কুরআন দ্বারা নির্ধারিত।",
        "স্বামী: সন্তান থাকলে ১/৪, না থাকলে ১/২। স্ত্রী: সন্তান থাকলে ১/৮, না থাকলে ১/৪ পান।",
        "কন্যা: মাত্র ১ জন থাকলে ১/২, ২ বা ততোধিক থাকলে ২/৩। পুত্র থাকলে কন্যারা আসাবা (২:১) হন।",
        "পিতা-মাতা: সন্তান থাকলে ১/৬। সন্তান না থাকলে মাতার অংশ ৩/১ বা ১/৩ হতে পারে এবং পিতা আসাবা হন।",
        "পুত্রের কন্যা: যদি পুত্র/পুত্রের পুত্র না থাকে, তবে কন্যার মতো ১/২ বা ২/৩ অংশ পেতে পারেন।",
        "আসাবা (অবশিষ্টভোগী): ৪টি শ্রেণী (১. সন্তানাদি, ২. পিতা/দাদা, ৩. ভাই/ভাতিজা, ৪. চাচা/চাচাতো ভাই)। এক শ্রেণী থাকলে পরের শ্রেণী বঞ্চিত হয়।",
        "বণ্টন প্রক্রিয়া: প্রথমে জবিউল ফুরুজদের ভাগ দেওয়া হয়। এরপর ১-এর বেশি হলে 'আউল' এবং ১-এর কম হলে 'রাদ্দ' নিয়ম প্রয়োগ করা হয়। অবশিষ্ট অংশ আসাবাগণ পান।"
      ]
    },
     {
      countryCode: "ZA",
      title: "দক্ষিণ আফ্রিকা উত্তরাধিকার বিধি (শরীআহ আইন)",
      content: "দক্ষিণ আফ্রিকায় মুসলিম উত্তরাধিকারীদের জন্য শরীআহ ভিত্তিক মিরাস বণ্টনের সুনির্দিষ্ট বিধান রয়েছে যা ধর্মীয় বিশ্বাস ও আইনি কাঠামোর সমন্বয়ে পরিচালিত হয়।",
      points: [
        "শরীআহ ভিত্তিক বণ্টন: দক্ষিণ আফ্রিকায় মুসলিম সম্প্রদায়ের জন্য কুরআন ও সুন্নাহর নির্দেশিত মীরাস বণ্টন নীতি কার্যকর করা হয়।",
        "দক্ষিণ আফ্রিকার সরকারি ও শরীআহ আইন: দক্ষিণ আফ্রিকা সরকার শরীআহ আইন অনুসারে মুসলিমদের মিরাস বণ্টনকে ১০০% সঠিক রাখার নিশ্চয়তা দেয়।",
        "মুদ্রা ও পরিমাপ: এই ক্যালকুলেটরে দক্ষিণ আফ্রিকার মুদ্রা (ZAR - র্যান্ড) এবং ভূমি পরিমাপের একক (হেক্টর) ব্যবহার করা হয়েছে।",
        "ওয়ারিশদের অংশ: হানাফী বা শাফিঈ মাযহাবের (দক্ষিণ আফ্রিকার মুসলিমদের প্রধান মাযহাবসমূহ) ভিত্তিতে সুনির্দিষ্ট অংশীদার ও আসাবাদের মধ্যে মিরাস বণ্টন করা হয়।"
      ]
    },
    {
      countryCode: "PK",
      title: "পাকিস্তান উত্তরাধিকার বিধি (শরীআহ আইন)",
      content: "পাকিস্তানে উত্তরাধিকার বিভাজন মুসলিম পারিবারিক আইন অধ্যাদেশ (১৯৬১) এবং শরীআহ আইন দ্বারা পরিচালিত হয়।",
      points: [
        "শরীআহ ভিত্তিক বণ্টন: পাকিস্তানে কুরআন ও সুন্নাহ নির্ধারিত অংশ অনুযায়ী মীরাস বণ্টন করা হয়।",
        "১৯৬১ অধ্যাদেশ (সেকশন ৪): মৃত সন্তানের সন্তানরা (নাতি-নাতনি) তাদের পিতামাতার প্রাপ্য অংশ সরাসরি লাভ করেন, যা পাকিস্তানে আইনগতভাবে স্বীকৃত।",
        "মুদ্রা ও পরিমাপ: এই ক্যালকুলেটরে পাকিস্তানি রুপি (PKR) এবং ভূমি পরিমাপের একক (কানাল/মারলা) ব্যবহার করা হয়েছে।",
        "সরকারি নিশ্চয়তা: পাকিস্তান সরকার মুসলিম উত্তরাধিকার আইন ১০০% সঠিক রাখার জন্য প্রতিশ্রুতিবদ্ধ।"
      ]
    },
    {
      countryCode: "MY",
      title: "মালয়েশিয়া উত্তরাধিকার বিধি",
      content: "মালয়েশিয়ায় মুসলিমদের উত্তরাধিকার পৃথক রাজ্যের ইসলামিক পারিবারিক আইন এবং ফেডারেল টেরিটরি অ্যাক্ট দ্বারা পরিচালিত হয়। দেওয়ানি ও শরীয়াহ আদালতের জন্য শাফেয়ী মাযহাব হলো ডিফল্ট রেফারেন্স।",
      points: [
        "শাফেয়ী প্রধান রেফারেন্স: মালয়েশিয়ায় ফারায়েজ বন্টনের জন্য শাফেয়ী মাযহাব হলো আদর্শ আইনি কাঠামো।",
        "শরীয়াহ আদালতের তত্ত্বাবধান: মুসলিমদের এস্টেট বন্টন কঠোরভাবে শরীয়াহ আদালত দ্বারা পরিচালিত হয়।",
        "আমানাহ রায় (AmanahRaya): কোনো এক্সিকিউটর নিযুক্ত না থাকলে সরকারি ট্রাস্টি প্রায়ই মুসলিমদের এস্টেট পরিচালনা করে।",
        "হিবা ও ওসীয়াহ: মালয়েশিয়ানরা সাধারণত শরীয়াহর সীমানার মধ্যে সম্পদ পরিকল্পনা পরিচালনা করতে হিবা (উপহার) এবং ওসীয়াহ (উইল) ব্যবহার করে।"
      ]
    },
    {
      countryCode: "AE",
      title: "সংযুক্ত আরব আমিরাত (ইউএই) উত্তরাধিকার বিধি",
      content: "সংযুক্ত আরব আমিরাতের ২০০৫ সালের ২৮ নম্বর ফেডারেল ডিক্রি-আইন (সংশোধিত) মুসলিম নাগরিক এবং বাসিন্দাদের জন্য উত্তরাধিকার বন্টন নিয়ন্ত্রণ করে। এখানে ফারায়েজের শরীয়াহ নীতি কঠোরভাবে প্রয়োগ করা হয়।",
      points: [
        "সুন্নি মাযহাবের অগ্রাধিকার: আদালত প্রধানত মালিকি মাযহাব অনুসরণ করে, যদিও মামলার ওপর ভিত্তি করে অন্যান্য সুন্নি ব্যাখ্যা বিবেচনা করা হতে পারে।",
        "ইউনিফাইড পার্সোনাল স্ট্যাটাস কোর্ট: বিশেষায়িত আদালত দ্রুত এবং সঠিক শরীয়াহ সম্মতি নিশ্চিত করতে উত্তরাধিকার মামলা পরিচালনা করে।",
        "এস্টেট দায়বদ্ধতা: কোনো উত্তরাধিকার বন্টন করার আগে এস্টেট থেকে ঋণ এবং দাফন খরচ পরিশোধ করতে হয়।",
        "অ-মুসলিমদের জন্য বিকল্প: সাম্প্রতিক সংশোধনীগুলো অ-মুসলিমদের তাদের নিজ দেশের আইন বেছে নেওয়ার অনুমতি দেয়, তবে মুসলিমদের জন্য শরীয়াহ হলো ডিফল্ট এবং একমাত্র বিকল্প।"
      ]
    },
    {
      countryCode: "GENERAL",
      title: "মাজহাবগত পার্থক্য (মায়াজাহেব আরবা)",
      content: "চারজন ইমামের ইজতিহাদ ও গবেষণা অনুযায়ী বিশেষ কিছু ক্ষেত্রে বণ্টনের ভিন্নতা দেখা যায়। এই ক্যালকুলেটরটি সেই সূক্ষ্ম পাথক্যগুলো নিখুঁতভাবে গণনা করে।",
      points: [
        "দাদা ও ভাই-বোনের সম্পর্ক: হানাফী মাজহাব অনুযায়ী বাবা না থাকলে দাদা জীবিত থাকলে ভাই-বোনেরা পুরোপুরি বঞ্চিত হন। যুক্তি হলো: দাদা পিতার স্থলাভিষিক্ত, তাই পিতা যেমন ভাইদের বঞ্চিত করেন, দাদাও তাই করবেন। কিন্তু মালিকী, শাফিঈ ও হাম্বলী মাজহাব অনুযায়ী দাদা ভাই-বোনদের সাথে সম্পদ ভাগ করে নেন (মুকাসামা)। তাদের যুক্তি: ভাইয়েরা পিতার মাধ্যমে যেমন মিরাস পান, দাদাও পিতার মাধ্যমে পান; তাই তাদের অধিকার সমান পর্যায়ের।",
        "আল-মাআদ্দা (Al-Ma’adda): এটি কেবল ঐসব মাজহাবে কার্যকর যেখানে দাদা ও ভাইরা একত্রে মিরাস পান। এখানে সহোদর ও বৈমাত্রীয় ভাইদের একত্রে গণনা করা হয় যাতে দাদার অংশ কমে যায় (মুকাসামা পদ্ধতিতে), কিন্তু এরপর সহোদর ভাইয়েরা বৈমাত্রীয় ভাইদের বঞ্চিত করে পুরো অবশিষ্ট অংশ নিজেরা নিয়ে নেন।",
        "মুশতারাকা মাসআলা: যখন মৃত ব্যক্তি স্বামী, মা, একাধিক বৈপিত্রীয় ভাই-বোন এবং সহোদর ভাই রেখে যান, তখন হানাফী ও হাম্বলী মতে সহোদর ভাইয়েরা আসাবা হিসেবে কিছুই পান না (কারণ নির্ধারিত অংশীদারদের দেওয়ার পর কিছু অবশিষ্ট থাকে না)। তবে শাফিঈ ও মালিকী মাজহাবে সহোদর ভাই ও বৈপিত্রীয় ভাই-বোনেরা সম্মিলিতভাবে ১/৩ অংশ ভাগ করে নেন। যুক্তি: সহোদর ভাইয়ের মা-ও এক, তাই তারা অন্তত বৈপিত্রীয় ভাইদের সমান অংশ পাওয়ার দাবিদার ('হিমারিয়া' বা গাধার মাসআলা)।",
        "আকদারিয়া মাসআলা: স্বামী, মা, দাদা ও ১ জন সহোদর বোন থাকলে হাম্বলী, শাফিঈ ও মালিকী মতে বোনকে বঞ্চিত না করে বিশেষ পদ্ধতিতে ৪/৯ ও ২/৯ অনুপাতে বণ্টন করা হয় যাতে বোন তার নির্ধারিত ১/২ অংশের একটি অংশ পান।",
        "হানাফী (Hanafi): বাংলাদেশ, ভারত, পাকিস্তান ও তুরস্কে জনপ্রিয়। এটি সাধারণত দাদার উপস্থিতিতে ভাইদের বঞ্চিত করে।",
        "হাম্বলী (Hanbali): সৌদি আরবে প্রচলিত। এটি দাদা ও ভাইদের সহাবস্থান সমর্থন করে কিন্তু মুশতারাকা মাসআলা সমর্থন করে না।",
        "শাফিঈ ও মালিকী (Shafi'i & Maliki): দক্ষিণ পূর্ব এশিয়া ও উত্তর আফ্রিকায় জনপ্রিয়। এরা মুশতারাকা মাসআলা ও দাদার সাথে ভাইদের অংশীদারিত্ব উভয়টি সমর্থন করে।"
      ]
    },
  ],
  en: [
    {
      countryCode: "SA",
      title: "Saudi Arabian Inheritance Framework (Sharia Law)",
      content: "Inheritance in the Kingdom of Saudi Arabia is governed by the Personal Status Law (Royal Decree M/73) of 1443H. Based on the Hanbali school of Sharia, it ensures justice by following a mandatory hierarchy of distribution and clearing estate obligations before final settlement.",
      points: [
        "Hierarchy of Estate Claims: Before distribution, the following must be settled: 1. Funeral expenses, 2. Debts secured by assets, 3. Unsecured debts, 4. Legacies/Wills to non-heirs (max 1/3), 5. Distribution to legal heirs.",
        "Impediments to Inheritance (Mawani): 1. Intentional or quasi-intentional homicide of the deceased, 2. Difference in religion (No inheritance between Muslims and non-Muslims).",
        "The Twelve Fixed Heirs (Ashab al-Furud): Husband, Wife, Father, Mother, Paternal Grandfather, Paternal Grandmother, Daughter, Son's Daughter, Full Sister, Consanguine Sister, Uterine Brother, and Uterine Sister.",
        "Marital Interests: Husbands inherit 1/2 or 1/4. Wives inherit 1/4 or 1/8. Multiple wives share the fixed portion equally.",
        "Parental Shares: Father gets 1/6 with male descendants. Mother gets 1/6 with descendants or 2+ siblings, otherwise 1/3.",
        "Al-Gharrawain (The Two Umariyas): In cases involving only a spouse and parents, the mother takes 1/3 of the 'Remainder' to prevent her share from exceeding the father's.",
        "Aul (Increase) and Radd (Return): Systemic adjustments for when the sum of shares is greater (Aul) or less (Radd) than the total estate unit.",
        "Asabah (Residuaries): Heirs who receive the remaining balance of the estate after fixed sharers have been satisfied. Sons always take precedence and make daughters residuaries in a 2:1 ratio."
      ]
    },
    {
      countryCode: "BD",
      title: "Bangladeshi Muslim Inheritance Rules (Hanafi Law)",
      content: "Inheritance in Bangladesh is governed by Islamic Sharia (Hanafi school) and specifically the Muslim Family Laws Ordinance 1961:",
      points: [
        "Quranic Heirs (Dhawi al-Furud): 12 primary heirs have fixed shares in the Quran. These include the Spouse, Parents, Grandparents, Children, and Siblings.",
        "Marital Shares: Husband gets 1/2 or 1/4. Wife gets 1/4 or 1/8. The lower share applies if the deceased has children or son's children.",
        "Daughters: 1/2 for one, 2/3 for two or more. If a son is present, they become residuaries (Asabah) in a 2:1 ratio.",
        "Parents: Each gets 1/6 if children exist. Mothers may get 1/3 if no children/multiple siblings exist.",
        "Asabah Classes: 1. Children, 2. Father/Grandfather, 3. Siblings, 4. Uncles/Cousins. Higher classes exclude lower classes.",
        "Distribution Steps: 1. Assign shares to Quranic Heirs. 2. Apply Aul/Radd for balancing. 3. Distribute the remaining estate to Asabah."
      ]
    },
     {
      countryCode: "ZA",
      title: "South African Inheritance Rules (Sharia Law)",
      content: "Inheritance for Muslims in South Africa is guided by Sharia principles, often implemented through Sharia-compliant wills and recognized by South African legal frameworks in accordance with religious beliefs.",
      points: [
        "Sharia-Based Distribution: Distribution follows the fixed portions (Faraid) as prescribed in the Quran and Sunnah.",
        "Accuracy & Compliance: South African authorities and Sharia bodies ensure distribution remains 100% accurate according to Islamic Law.",
        "Currency & Units: This calculator uses South African Rand (ZAR) and metric units (Hectares/m2) as standard in the country.",
        "Primary Heirs: Marital partners, parents, and children receive their mandatory shares first, followed by residuaries (Asaba)."
      ]
    },
    {
      countryCode: "PK",
      title: "Pakistan Inheritance Rules (Sharia Law)",
      content: "Inheritance in Pakistan is governed by the Muslim Family Laws Ordinance (1961) and Sharia principles, ensuring that distribution follows the Islamic legal framework recognized by the government.",
      points: [
        "Sharia-Based Distribution: Following the fixed portions (Faraid) from the Quran and Sunnah.",
        "1961 Ordinance (Section 4): Children of deceased sons and daughters inherit their parents' shares directly, as per Pakistani law.",
        "Currency & Units: Using Pakistani Rupee (PKR) and local units (Kanal/Marla).",
        "Government Assurance: The State ensures distribution remains 100% accurate according to Muslim law."
      ]
    },
    {
      countryCode: "MY",
      title: "Malaysia Inheritance Rules",
      content: "Inheritance for Muslims in Malaysia is governed by the Islamic Family Law Enactments (individual states) and Federal Territories act. The Shafi'i school of thought is the default reference for civil and Syariah courts.",
      points: [
        "Shafi'i Primary Reference: The Shafi'i madhhab is the standard legal reference point for fara'id distribution in Malaysia.",
        "Syariah Court Oversight: Distribution of estates for Muslims is strictly handled by the Syariah Courts.",
        "AmanahRaya: The public trustee often manages estates for Muslims when no executor is appointed.",
        "Hibah and Wasiyah: Malaysians commonly use Hibah (gift) and Wasiyah (will) to manage estate planning within Sharia boundaries."
      ]
    },
    {
      countryCode: "AE",
      title: "UAE Inheritance Rules",
      content: "The UAE Federal Decree-Law No. 28 of 2005 on Personal Status (as amended) governs inheritance for Muslim citizens and residents. Sharia principles of Fara'id are strictly applied.",
      points: [
        "Sunni Madhhab Priority: Courts predominantly follow the Maliki school, though other Sunni interpretations may be considered based on the case.",
        "Unified Personal Status Court: Specialized courts handle inheritance cases to ensure fast and accurate Sharia compliance.",
        "Estate Liabilities: Debts and funeral expenses must be cleared from the gross estate before any inheritance is distributed.",
        "Non-Muslim Option: Recent amendments allow non-Muslims to opt for laws of their home country, but Sharia remains the default and only option for Muslims."
      ]
    },
    {
      countryCode: "GENERAL",
      title: "Differences Between Schools (Madhhabs)",
      content: "Islamic jurisprudence varies slightly across the four major schools (Hanafi, Maliki, Shafi'i, and Hanbali) regarding specific edge cases, particularly regarding the rights of the grandfather and full brothers.",
      points: [
        "Grandfather vs. Siblings: In the Hanafi school, the Paternal Grandfather completely excludes all brothers and sisters. Rationale: The Grandfather is a surrogate for the Father; as the father excludes siblings, so does the grandfather. In the other three schools (Maliki, Shafi'i, Hanbali), the grandfather shares the estate with siblings (Muqasama). Rationale: Siblings and the Grandfather are equally linked to the deceased through the Father.",
        "Al-Ma'adda (The Counting): In schools that allow siblings to share with the grandfather, Full siblings 'count' Consanguine siblings to reduce the grandfather's share in Muqasama, but then the Full siblings exclude the Consanguines and take the entire remaining portion.",
        "The Mushtaraka (Shared) Case: Occurs with Husband, Mother, Uterine Siblings, and Full Brothers. Hanafis and Hanbalis exclude the Full Brother (as he is a residuary and nothing remains). Shafi'is and Malikis allow the Full Brother to share the 1/3 portion with Uterine siblings. Rationale: They share the same mother, so the full brother should not receive less than the uterine brother ('The Donkey Case').",
        "Al-Akdariya: A unique case involving Husband, Mother, Grandfather, and one Full Sister. In the majority view (excluding Hanafi), a special calculation is used to ensure the sister receives a portion (4/9 and 2/9 adjustment) despite the presence of the grandfather.",
        "Hanafi (Hanafi): Prominent in South Asia and Turkey. Generally excludes siblings if a grandfather is present.",
        "Hanbali (Hanbali): Official in Saudi Arabia. Supports Muqasama but rejects the Mushtaraka (Shared) case.",
        "Shafi'i & Maliki (Shafi'i & Maliki): Popular in SE Asia and Africa. Supports both Muqasama and the Mushtaraka case."
      ]
    },
    {
      countryCode: "SA",
      title: "Special Jurisdictional Rules",
      content: "Detailed constraints based on Saudi Ministry of Justice guidelines:",
      points: [
        "Unborn Children (Al-Haml): The share of an unborn child is reserved according to the most favorable scenario until birth.",
        "Missing Persons (Al-Mafqud): Shares are reserved until the legal death of the missing person is declared by a court or their return.",
        "Hermaphrodites (Al-Khuntha): Shares are distributed in a way that provides for the least certain amount until the state is clarified.",
        "Public Treasury (Bayt al-Mal): In the absolute absence of any legal heirs, including distant kindred, the treasury inherits the estate to spend on public welfare."
      ]
    }
  ],
  ar: [
    {
      countryCode: "SA",
      title: "نظام الميراث الشامل في المملكة العربية السعودية",
      content: "يخضع الميراث في المملكة لنظام الأحوال الشخصية (م/73) لعام 1443هـ، المستمد من الشريعة الإسلامية وفق الراجح في المذهب الحنبلي، والذي يُطبق في دوائر التركات بمحاكم الأحوال الشخصية لضمان حقوق الورثة الشرعية والنظامية وفق تسلسل دقيق.",
      points: [
        "ترتيب الحقوق المتعلقة بالتركة: ترتب هذه الحقوق وفق الآتي: 1. مؤن تجهيز الميت بالمعروف، 2. الديون المتعلقة بعين التركة، 3. الديون المرسلة في الذمة، 4. الوصية لغير الوارث بحدود الثلث، 5. تقسيم الباقي على الورثة.",
        "موانع الإرث في النظام السعودي: 1. القتل العمد أو شبه العمد (المادة 190)، 2. اختلاف الدين (لا يرث المسلم الكافر ولا الكافر المسلم).",
        "أصحاب الفروض (الاثني عشر): هم الذين حُددت أنصبتهم في الكتاب والسنة: (الزوج، والزوجة، والأب، والأم، والجد لأب وإن علا، والجدة الوارثة، والبنت، وبنت الابن، والأخت الشقيقة، والأخت لأب، والأخ لأم، والأخت لأم).",
        "ميراث الزوجين: يرث الزوج النصف (عند عدم الفرع الوارث) والربع (عند وجوده). ترث الزوجة الربع (عند عدم الفرع الوارث) والثمن (عند وجوده)، وتشارك الزوجات في هذا القدر بالسوية بينهن.",
        "ميراث الأبوين: الأب يرث بالسدس فرضاً مع وجود فرع وارث مذكر، أو بالتعصيب عند عدم الفرع. الأم ترث السدس مع الفرع الوارث أو جمع من الإخوة، والثلث عند عدمهما.",
        "المسألة العمريّة (الغراوين): وهي حالتان (زوج، أم، أب) أو (زوجة، أم، أب)، وفيها تأخذ الأم 'ثلث الباقي' بعد نصيب الزوج أو الزوجة، وذلك تطبيقاً لقاعدة 'للذكر مثل حظ الأنثيين' بين الأب والأم.",
        "العول والرد: يتم تطبيق العول عند زيادة السهام عن أصل المسألة (يُنقص من نصيب الجميع)، ويكون الرد عند وجود فائض من التركة وعدم وجود عصبة (يُرد على أصحاب الفروض عدا الزوجين).",
        "ميراث الإخوة مع الجد: يطبق النظام السعودي القواعد الشرعية التي قد تحجب الإخوة بوجود الأب، وتفصيلات ميراثهم مع الجد عند عدم الأب."
      ]
    },
    {
      countryCode: "BD",
      title: "قواعد الميراث في بنغلاديش (المذهب الحنفي)",
      content: "تعتمد بنغلاديش في توزيع الميراث على أحكام المذهب الحنفي وقانون الأسرة لعام 1961:",
      points: [
        "أصحاب الفروض (12 وارثاً): يتم توزيع الأنصبة المقدرة شرعاً أولاً وفقاً لما جاء في القرآن الكريم.",
        "نصيب الزوجين: يرث الزوج النصف أو الربع، وترث الزوجة الربع أو الثمن حسب وجود الأبناء.",
        "البنات: تنفرد البنت بالنصف، ويشترك البنات في الثلثين. ومع وجود الابن، يصبحن عصبة بالغير (2:1).",
        "الأبوان: يرث كل منهমা السدس فرضاً عند وجود الولد. والأم قد ترث الثلث أو ثلث الباقي في حالات خاصة.",
        "العصبات: أربعة جهات (البنوة، الأبوة، الأخوة، العمومة) يقدم الأقرب فالأقرب.",
        "خطوات الحساب: 1- ذوو الفروض، 2- العول (عند زيادة السهام)، 3- الرد (عند وجود فائض)، 4- العصبات."
      ]
    },
    {
      countryCode: "ZA",
      title: "قواعد الميراث في جنوب أفريقيا (الشريعة الإسلامية)",
      content: "يتم توزيع الميراث للمسلمين في جنوب أفريقيا وفقاً لمبادئ الشريعة الإسلامية المعترف بها.",
      points: [
        "التوزيع الشرعي: يتبع التوزيع حصصاً محددة (الفرائض) كما هو مقرر في القرآن والسنة.",
        "الدقة والامتثال: تضمن الهيئات الشرعية في جنوب أفريقيا دقة التوزيع بنسبة 100% وفقاً للفقه الإسلامي.",
        "العملة والوحدات: تستخدم هذه الحاسبة الراند الجنوب أفريقي (ZAR) والهكتار كمعايير في الدولة.",
        "الورثة الأساسيين: يحصل الشركاء والوالدان والأبناء على حصصهم الإلزامية أولاً."
      ]
    },
    {
      countryCode: "PK",
      title: "قواعد الميراث في باكستان (الشريعة الإسلامية)",
      content: "يُحكم الميراث في باكستان بموجب قانون الأحوال الشخصية للمسلمين (1961) ومبادئ الشريعة الإسلامية.",
      points: [
        "التوزيع الشرعي: اتباع الحصص المحددة في القرآن والسنة.",
        "قانون 1961 (المادة 4): يرث أبناء الأبناء المتوفين حصة والديهم مباشرة، وفقاً للقانون الباكستاني.",
        "العملة والوحدات: استخدام الروبية الباكستانية (PKR) والوحدات المحلية (قنال/مرلة).",
        "الضمان الحكومي: تضمن الدولة دقة التوزيع بنسبة 100% وفقاً للشريعة الإسلامية."
      ]
    },
    {
      countryCode: "GENERAL",
      title: "اختلاف المذاهب الأربعة في الميراث",
      content: "تتفق المذاهب الأربعة في أصول الميراث وتختلف في بعض التفاصيل والمسائل الاجتهادية، لا سيما في علاقة الجد بالإخوة. تعامل الحاسبة هذه الفروق بدقة عالية.",
      points: [
        "ميراث الجد مع الإخوة: يرى المذهب الحنفي أن الجد يحجب الإخوة والأخوات تماماً كالأب. العلة: الجد أب عند فقده، فلا يرث معه الأخ. أما المذاهب الثلاثة (المالكية والشافعية والحنابلة) فيرون مشاركة الجد للإخوة (المقاسمة). العلة: استواؤهم في الدرجة من حيث الإدلاء بالأب.",
        "المعاذة: في مذاهب الجمهور، 'يعدّ' الإخوة الأشقاءُ الإخوةَ لأب على الجد لنقص حظه بالمقاسمة، ثم يأخذ الأشقاء نصيب الإخوة لأب ويحجبونهم.",
        "المسألة المشركة (المشركة): تقع عند وجود (زوج، وأم، وإخوة لأم، وأخ شقيق). عند الحنفية والحنابلة يسقط الأخ الشقيق لأنه عصبة ولم يبقَ له شيء. أما عند الشافعية والمالكية فيشترك الأخ الشقيق مع الإخوة لأم في الثلث. العلة: اجتماعهم في الأم ('مسألة الحمار' أو اليم).",
        "الأكدرية: مسألة فريدة (زوج، أم، جد، أخت شقيقة) تُحل عند الجمهور بطريقة خاصة تضمن للأخت نصيباً (تعديل 4/9 و 2/9) بخلاف المذهب الحنفي الذي يحجبها بالجد.",
        "المذهب الحنفي: ينتشر في شبه القارة الهندية وتركيا. يتميز بحجب الجد للإخوة.",
        "المذهب الحنبلي: المعتمد في القضاء السعودي. يأخذ بالمقاسمة لكنه لا يرى التشريك في المسألة المشركة.",
        "الشافعية والمالكية: يجمعون بين المقاسمة في الجد وبين التشريك في المسألة المشركة."
      ]
    },
    {
      countryCode: "SA",
      title: "أحكام خاصة (الحمل والمفقود والخنثى)",
      content: "يراعي النظام السعودي الحالات الاستثنائية لضمان عدم ضياع الحقوق:",
      points: [
        "إرث الحمل: يُوقف للحمل أوفر النصيبين (ذكر أو أنثى) حتى يولد حياً.",
        "إرث المفقود: يوقف نصيب المفقود حتى يثبت موته حقيقة أو حكماً، أو تنقضي المدة التي يغلب في مثلها هلاكه.",
        "إرث ذوي الأرحام: لا يرث ذوو الأرحام إلا عند عدم وجود أصحاب فروض يستغرقون التركة (عدا الزوجين) وعدم وجود عصبة."
      ]
    },
    {
      countryCode: "MY",
      title: "قواعد الميراث في ماليزيا",
      content: "يخضع ميراث المسلمين في ماليزيا لقوانين الأحوال الشخصية الإسلامية (في كل ولاية) وقوانين الأقاليم الاتحادية. ويعتبر المذهب الشافعي هو المرجع الأساسي للمحاكم المدنية والشرعية.",
      points: [
        "المذهب الشافعي كمرجع أساسي: المذهب الشافعي هو المرجع القانوني القياسي لتوزيع الفرائض في ماليزيا.",
        "رقابة المحاكم الشرعية: يتم التعامل مع توزيع تركات المسلمين حصرياً من قبل المحاكم الشرعية.",
        "أمانة رايا (AmanahRaya): غالباً ما يتولى الوصي العام إدارة تركات المسلمين عندما لا يتم تعيين وصي.",
        "الهبة والوصية: يستخدم الماليزيون عادةً الهبة والوصية لإدارة تخطيط التركات ضمن الحدود الشرعية."
      ]
    },
    {
      countryCode: "AE",
      title: "قواعد الميراث في الإمارات",
      content: "ينظم قانون الأحوال الشخصية الإماراتي (المرسوم بقانون اتحادي رقم ٢٨ لسنة ٢٠٠٥ وتعديلاته) الميراث للمواطنين والمسلمين المقيمين. وتطبق مبادئ الشريعة الإسلامية في الفرائض بصرامة.",
      points: [
        "أولوية المذاهب السنية: تتبع المحاكم المذهب المالكي بشكل أساسي، مع إمكانية النظر في التفسيرات السنية الأخرى حسب الحالة.",
        "محكمة الأحوال الشخصية الموحدة: تتولى محاكم متخصصة قضايا الميراث لضمان الامتثال السريع والدقيق للشريعة.",
        "التزامات التركة: يجب سداد الديون ونفقات الجنازة من إجمالي التركة قبل توزيع أي ميراث.",
        "خيار غير المسلمين: تسمح التعديلات الأخيرة لغير المسلمين باختيار قوانين بلدهم الأصلي، لكن الشريعة تظل الخيار الافتراضي والوحيد للمسلمين."
      ]
    }
  ],
  ur: [
    {
      countryCode: "PK",
      title: "پاکستانی وراثت کے اصول (قانونِ شریعہ)",
      content: "پاکستان میں وراثت کی تقسیم مسلم فیملی لاء آرڈیننس (1961) اور شریعت کے اصولوں کے تحت ہوتی ہے۔",
      points: [
        "شریعت کے مطابق تقسیم: قرآن و سنت میں طے شدہ حصوں (فرائض) کے مطابق۔",
        "1961 کا آرڈیننس (دفعہ 4): فوت شدہ بیٹے یا بیٹی کی اولاد اپنے والدین کا حصہ پانے کی حقدار ہے (پاکستانی قانون کے مطابق)۔",
        "کرنسی اور اکائیاں: اس کیلکولیٹر میں پاکستانی روپیہ (PKR) اور مقامی اکائیاں (کنال/مرلہ) استعمال کی گئی ہیں۔",
        "حکومتی ضمانت: ریاست اس بات کو یقینی بناتی ہے کہ تقسیم اسلامی قانون کے مطابق 100% درست ہو۔"
      ]
    },
    {
      countryCode: "GENERAL",
      title: "فقہی مذاہب کے درمیان فرق",
      content: "چاروں بڑے فقہی مذاہب (حنفی، مالکی، شافعی، اور حنبلی) کے درمیان کچھ مخصوص مسائل میں معمولی فرق پایا جاتا ہے۔",
      points: [
        "دادا بمقابلہ بہن بھائی: فقہ حنفی میں دادا کی موجودگی میں بہن بھائی محروم ہو جاتے ہیں۔ دیگر تین مذاہب میں دادا بہن بھائیوں کے ساتھ حصہ بانٹتا ہے (مقاسمہ)۔",
        "المشرکہ: یہ مسئلہ اس وقت پیدا ہوتا ہے جب شوہر، ماں، ماں جائے بہن بھائی اور سگے بھائی موجود ہوں۔ شافعی اور مالکی مذاہب سگے بھائیوں کو ماں جائے بھائیوں کے ساتھ شریک کرتے ہیں۔",
        "العول اور الرد: حصوں کی ریاضیاتی ایڈجسٹمنٹ جب ان کا مجموعہ 1 سے زیادہ یا کم ہو جائے۔"
      ]
    }
  ],
  ms: [
    {
      countryCode: "MY",
      title: "Garis Panduan Pewarisan Malaysia",
      content: "Pewarisan bagi orang Islam di Malaysia ditadbir oleh Enakmen Undang-undang Keluarga Islam (negeri-negeri) dan Akta Wilayah Persekutuan. Mazhab Syafi'i adalah rujukan utama bagi mahkamah sivil dan Syariah.",
      points: [
        "Rujukan Utama Syafi'i: Mazhab Syafi'i adalah titik rujukan undang-undang standard bagi pembahagian fara'id di Malaysia.",
        "Penyeliaan Mahkamah Syariah: Pembahagian harta pusaka orang Islam dikendalikan sepenuhnya oleh Mahkamah Syariah.",
        "AmanahRaya: Pemegang amanah awam sering menguruskan harta jika tiada wasi yang dilantik.",
        "Hibah dan Wasiat: Rakyat Malaysia biasa menggunakan Hibah (pemberian) dan Wasiat untuk merancang harta mengikut syarak."
      ]
    },
    {
      countryCode: "GENERAL",
      title: "Perbezaan Antara Mazhab",
      content: "Jurisprudensi Islam berbeza sedikit di antara empat mazhab utama (Hanafi, Maliki, Syafi'i, dan Hanbali) mengenai kes tertentu.",
      points: [
        "Datuk vs Adik-Beradik: Dalam mazhab Hanafi, datuk menghalang semua adik-beradik. Dalam tiga mazhab lain, datuk berkongsi harta dengan adik-beradik (Muqasama).",
        "Kes Mushtaraka: Berlaku apabila saudara kandung berkongsi bahagian 1/3 dengan saudara seibu (diterima dalam Mazhab Syafi'i & Maliki).",
        "Aul dan Radd: Pelarasan matematik apabila jumlah bahagian tidak menyamai 1."
      ]
    }
  ]
};

export const FAQ_DATA = {
  bn: [
    { q: "একজন ব্যক্তি ওয়ারিশ হিসেবে ভাই, বোন এবং কন্যা রেখে গেছেন। বণ্টন কী রূপ হবে?", a: "কন্যা ১/২ অংশ পাবেন। অবশিষ্ট ১/২ অংশ ভাই ও বোন আসাবা হিসেবে ২:১ অনুপাতে পাবেন। অর্থাৎ ভাই ১/৩ এবং বোন ১/৬ পাবেন।" },
    { q: "পুত্র, কন্যা এবং বোন থাকলে বোন কি সম্পত্তি পাবেন?", a: "না। মৃত ব্যক্তির পুত্র (বা পুরুষ বংশধর) থাকলে বোনেরা মিরাস থেকে বঞ্চিত হন।" },
    { q: "মাতা ও একমাত্র কন্যা থাকলে বণ্টন কেমন হবে?", a: "প্রাথমিকভাবে কন্যা ১/২ এবং মাতা ১/৬ পাবেন। যেহেতু কোনো আসাবা নেই, তাই 'রাদ্দ' নিয়মে কন্যা ৩/৪ এবং মাতা ১/৪ পাবেন।" },
    { q: "স্ত্রী, পুত্র এবং কন্যা থাকলে বণ্টন অনুপাত কেমন হয়?", a: "স্ত্রী ১/৮ অংশ পাবেন। অবশিষ্ট ৭/৮ অংশ পুত্র ও কন্যা ২:১ অনুপাতে আসাবা হিসেবে পাবেন (পুত্র ৭/১২ এবং কন্যা ৭/২৪)।" },
    { q: "স্বামী, ২ কন্যা, পিতা ও মাতা থাকলে কি আউল (Aul) হবে?", a: "হ্যাঁ। প্রাথমিক অংশসমূহ: স্বামী ১/৪, ২ কন্যা ২/৩, পিতা ১/৬, মাতা ১/৬। যোগফল ১-এর বেশি (১৫/১২) হওয়ায় আউল নিয়মে অংশগুলো ১৭/১৫ বা আনুপাতিক হারে কমানো হবে।" },
    { q: "মাতা, কন্যা ও স্ত্রী থাকলে কি রাদ্দ (Radd) নিয়ম প্রযোজ্য হবে?", a: "হ্যাঁ। যদি কোনো আসাবা (অবশিষ্টভোগী) না থাকে, তবে স্বামী/স্ত্রী বাদে অন্যদের মধ্যে উদ্বৃত্ত অংশ বণ্টন করা হয়। এক্ষেত্রে মাতা ও কন্যা বর্ধিত অংশ পাবেন।" },
    { q: "বৈপিত্রীয় ভাই ও বোন কতটুকু পায়?", a: "অংশীদারদের মধ্যে ১ জন থাকলে ১/৬ এবং ২ বা ততোধিক থাকলে সম্মিলিতভাবে ১/৩ অংশ পান, যদি মৃত ব্যক্তির সন্তান বা পিতা জীবিত না থাকেন।" },
    { q: "মৃত ব্যক্তির মা কখন ১/৬ আর কখন ১/৩ পাবেন?", a: "মৃতের সন্তান থাকলে অথবা ২ বা ততোধিক ভাইবোন থাকলে মা ১/৬ পাবেন। অন্যথায় ১/৩ পাবেন।" },
    { q: "মৃত ব্যক্তির কাছে থাকা স্বর্ণ ও রৌপ্য কি মিরাস হিসেবে গণ্য হবে?", a: "হ্যাঁ। কেবল নগদ অর্থ নয়, বরং মৃত ব্যক্তির মালিকানাধীন জমি, সোনা, রূপা এবং সকল ব্যবহার্য বস্তু মিরাস হিসেবে গণ্য হবে এবং ওয়ারিশদের মধ্যে বণ্টন করতে হবে।" },
    { q: "দাদা কি সবসময় ভাই-বোনদের বঞ্চিত করে?", a: "না। কেবল হানাফী মাজহাব অনুযায়ী দাদা ভাইদের বঞ্চিত করে। শাফিঈ, মালিকী ও হাম্বলী মাজহাবে দাদা ভাইবোনদের সাথে অংশ ভাগ করে নেন (যদি না পিতা জীবিত থাকেন)।" },
    { q: "মুশতারাকা মাসআলা কি?", a: "এটি এমন এক পরিস্থিতি যেখানে সহোদর ভাই বৈপিত্রীয় ভাইদের সাথে মিলে ১/৩ অংশ ভাগ করে নেন। এটি কেবল শাফিঈ ও মালিকী মাজহাবে কার্যকর।" }
  ],
  en: [
    { q: "If a person leaves a Brother, Sister, and Daughter, how is it shared?", a: "The Daughter gets 1/2. The remaining 1/2 is shared by the Brother and Sister as Residuaries (Asabah) in a 2:1 ratio (Brother 1/3, Sister 1/6)." },
    { q: "Can a sister inherit if there is a son and a daughter?", a: "No. The presence of a son (or any male descendant) excludes siblings from inheritance." },
    { q: "How is the property shared between a Mother and a single Daughter?", a: "Initially, Daughter gets 1/2 and Mother 1/6. Since there are no residuaries, the 'Radd' (Return) rule applies, increasing their shares to 3/4 and 1/4 respectively." },
    { q: "What is the share for a Wife, Son, and Daughter?", a: "The Wife gets 1/8. The remaining 7/8 is shared by the Son and Daughter in a 2:1 ratio (Son 7/12, Daughter 7/24)." },
    { q: "Does the 'Aul' rule apply for a Husband, 2 Daughters, Father, and Mother?", a: "Yes. Their initial shares (1/4, 2/3, 1/6, 1/6) sum to 15/12. Since this exceeds 1, all shares are reduced proportionally using the Aul principle (e.g., denominators change to 15 or 13 depending on total)." },
    { q: "What happens if there are only a Mother, Daughter, and Wife?", a: "The 'Radd' (Return) rule applies. Since there is no Residuary (Asaba), the surplus property is distributed back to the Mother and Daughter proportionally, as the Spouse's share is fixed." },
    { q: "What are the shares for Uterine Brothers and Sisters?", a: "A single Uterine sibling gets 1/6. Two or more share 1/3 equally. They only inherit if the deceased has no children or male ancestors (Father/Grandfather)." },
    { q: "When does the Mother get 1/6 instead of 1/3?", a: "The Mother gets 1/6 if the deceased has children (or son's children) or multiple siblings. Otherwise, she gets 1/3." },
    { q: "Can a non-Muslim relative inherit from a Muslim?", a: "No. Difference in religion is an impediment to inheritance in Islamic Law. A non-Muslim cannot inherit from a Muslim relative." },
    { q: "Does the Grandfather always exclude siblings?", a: "Only in the Hanafi school. In the Maliki, Shafi'i, and Hanbali schools, the grandfather shares the inheritance with siblings (through 'Muqasama') if the father is deceased." },
    { q: "What is the 'Shared Case' (Mushtaraka)?", a: "It's a specific scenario (Husband, Mother, Uterine siblings + Full brother) where the Full Brother is allowed to share the 1/3 portion with uterine siblings instead of getting nothing. This is supported by the Shafi'i and Maliki schools." }
  ],
  ar: [
    { q: "كيف يتم التعامل مع الديون في نظام الميراث السعودي؟", a: "تُعد تصفية الديون أولوية قصوى؛ حيث تُسدد ديون المتوفى من تركة المتوفى قبل توزيع أي نصيب على الورثة، وذلك طبقاً للمادة 191 من نظام الأحوال الشخصية، وتشمل ديون الله (كالزكاة) وديون البشر." },
    { q: "هل يرث الأحفاد بالوصية الواجبة في السعودية؟", a: "لا، النظام السعودي لا يأخذ بآلية 'الوصية الواجبة' الشائعة في بعض قوانين الدول الأخرى. الأحفاد الذين توفي والدهم قبل جدهم يُحجبون بوجود الأعمام، ولجدّهم أن يوصي لهم اختياراً بحدود الثلث." },
    { q: "ما هي حدود الوصية الشرعية في النظام السعودي؟", a: "تنفذ الوصية في حدود الثلث لغير الوارث، وما زاد عن الثلث يتوقف على إجازة بقية الورثة بعد الوفاة، ولا وصية لوارث إلا بإجازة الورثة." },
    { q: "هل يرث المطلق أو المطلقة؟", a: "ترث المطلقة رجعياً إذا توفي الزوج وهي في العدة. أما المطلقة بائناً فلا ترث إلا إذا طلقها الزوج في مرض موته المخوف بقصد حرمانه من الإرث، فتعامل بنقيض قصدها وتورث." },
    { q: "ما هو حكم اختلاف الدين في الميراث؟", a: "اختلاف الدين مانع قطعي من موانع الإرث؛ فلا يرث المسلمُ الكافرَ ولا الكافرُ المسلمَ، وذلك بنص المادة 190 من نظام الأحوال الشخصية." },
    { q: "ماذا لو لم يترك المتوفى أي وارث شرعي؟", a: "إذا انعدم أصحاب الفروض والعصبات وذوو الأرحام، فإن التركة تؤول إلى خزينة الدولة (بيت المال) لتصرف في مصالح المسلمين العامة." },
    { q: "كيف تقسم الحصص عند وجود أكثر من زوجة؟", a: "تشترك الزوجات (اثنتان أو ثلاث أو أربع) في نصيب الزوجة المقدر (الربع أو الثمن) بالتساوي بينهن." },
    { q: "هل يرث الولد من الزنا من أبيه؟", a: "لا، الولد من الزنا لا ينسب لأبيه ولا يرث منه، بل ينسب لأمه ويرث منها ومن قرابتها." },
    { q: "ما هي المسألة المشركة؟", a: "هي مسألة (زوج، وأم، وإخوة لأم، وأخ شقيق) حيث يشرك الشافعية والمالكية الأخ الشقيق مع الإخوة لأم في نصيبهم (الثلث)، بينما يسقط الأخ الشقيق عند الحنفية والحنابلة." },
    { q: "هل الجد يحجب الإخوة دائماً؟", a: "عند الحنفية نعم، الجد يحجب جميع الإخوة كالأب. أما عند الجمهور (المالكية والشافعية والحنابلة) فالجد لا يحجب الإخوة الأشقاء أو لأب بل يقاسمهم الميراث." }
  ],
  ur: [
    { q: "وراثت کی تقسیم کب شروع ہوتی ہے؟", a: "وراثت کی تقسیم تدفین کے اخراجات اور مرحوم کے تمام قرضوں کی ادائیگی کے بعد شروع ہوتی ہے۔" },
    { q: "کیا غیر مسلم رشتہ دار وارث ہو سکتے ہیں؟", a: "نامور فقہاء کے مطابق، مسلمانوں اور غیر مسلموں کے درمیان وراثت کا تبادلہ نہیں ہوتا۔" },
    { q: "عصبہ سے کیا مراد ہے؟", a: "عصبہ وہ وارث ہیں جن کا حصہ طے شدہ نہیں ہوتا، بلکہ وہ بچا ہوا مال وصول کرتے ہیں۔" },
    { q: "دواسطہ وارث کون ہوتے ہیں؟", a: "اگر بیٹا موجود ہو تو وہ پوتے کو محروم کر دیتا ہے۔ اسی طرح باپ دادا کو محروم کر دیتا ہے۔" }
  ],
  ms: [
    { q: "Bilakah harta pusaka dibahagikan?", a: "Harta dibahagikan selepas belanja pengebumian, penyelesaian hutang, dan pelaksanaan wasiat (maksimum 1/3 harta)." },
    { q: "Bolehkah bukan Islam mewarisi harta?", a: "Mengikut hukum syarak, tiada pewarisan antara Muslim dan bukan Muslim." },
    { q: "Apa itu Asabah?", a: "Asabah adalah waris yang menerima baki harta setelah waris Ashabul Furud menerima bahagian tetap mereka." },
    { q: "Apakah maksud Hajb?", a: "Hajb bermaksud pendinding, di mana waris lebih dekat menghalang waris lebih jauh daripada mendapat bahagian." }
  ]
};
