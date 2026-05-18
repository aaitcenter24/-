import { CountryConfig } from '../types';

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'BD',
    name: { bn: 'বাংলাদেশ', en: 'Bangladesh', ar: 'بنغلاديش' },
    currency: { name: 'Taka', symbol: '৳', format: 'lakh' },
    landUnits: [
      { label: 'Decimal', ratio: 1 },
      { label: 'Bigha', ratio: 33 },
      { label: 'Katha', ratio: 1.65 },
      { label: 'Acre', ratio: 100 },
      { label: 'Chhatak', ratio: 0.1033 }
    ],
    goldUnits: [
      { label: 'Bhori', ratio: 11.664 },
      { label: 'Gram', ratio: 1 },
      { label: 'Ana', ratio: 0.729 },
      { label: 'Roti', ratio: 0.486 }
    ],
    silverUnits: [
      { label: 'Bhori', ratio: 11.664 },
      { label: 'Gram', ratio: 1 }
    ],
    primaryLanguage: 'bn',
    defaultMadhhab: 'Hanafi',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Islamic inheritance in Bangladesh is governed by the Muslim Family Laws Ordinance 1961, State Acquisition and Tenancy Act 1950, and Hanafi Fara'id rules. Land records follow C.S., S.A., R.S., and B.S. Khatian systems.",
      bn: "বাংলাদেশে মুসলিম উত্তরাধিকার প্রধানত ১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশ, ১৯৫০ সালের স্টেট অ্যাকুইজিশন অ্যান্ড টেন্যান্সি অ্যাক্ট এবং হানাফি ফারায়েজ নীতি দ্বারা পরিচালিত হয়। ভূমির রেকর্ড সি.এস., এস.এ., আর.এস. এবং বি.এস. খতিয়ান পদ্ধতি অনুসরণ করে।",
      ar: "يتم تنظيم الميراث الإسلامي في بنغلاديش من خلال قانون الأحوال الشخصية للمسلمين لعام 1961 وقوانين حيازة الأراضي. تتبع السجلات العقارية أنظمة CS و SA و RS و BS."
    },
    hijriPrimary: false,
    paymentMethods: ['bKash', 'Nagad', 'Rocket', 'DBBL Nexus', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '৳১০০০' }
  },
  {
    code: 'SA',
    name: { bn: 'সৌদি আরব', en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    currency: { name: 'Riyal', symbol: 'SAR', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }, 
      { label: 'Hectare', ratio: 247.105 },
      { label: 'Feddan', ratio: 103.74 },
      { label: 'Qirat', ratio: 4.32 }
    ],
    goldUnits: [
      { label: 'Gram', ratio: 1 }, 
      { label: 'Mithqal', ratio: 4.25 },
      { label: 'Tola', ratio: 11.664 }
    ],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Hanbali',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Governed by the Saudi Personal Status Law (Royal Decree M/73, 2021) and Hanbali Sharia as the primary judicial source. Managed by the Court of Personal Status and MoJ.",
      bn: "সৌদি ব্যক্তিগত মর্যাদা আইন (রয়্যাল ডিক্রি M/73, 2021) এবং প্রধান বিচারিক উৎস হিসেবে হাম্বলী শরীয়াহ দ্বারা পরিচালিত। এটি ব্যক্তিগত মর্যাদা আদালত এবং বিচার মন্ত্রণালয় দ্বারা নিয়ন্ত্রিত।",
      ar: "تخضع لقانون الأحوال الشخصية السعودي (مرسوم ملي م/٧٣، ٢٠٢١) والشريعة الحنبلية كمصدر قضائي أساسي. وتتولى إدارتها محكمة الأحوال الشخصية ووزارة العدل."
    },
    hijriPrimary: true,
    paymentMethods: ['STC Pay', 'Mada', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '100 SAR' }
  },
  {
    code: 'PK',
    name: { bn: 'পাকিস্তান', en: 'Pakistan', ar: 'باكستان' },
    currency: { name: 'Rupee', symbol: '₨', format: 'lakh' },
    landUnits: [
      { label: 'Marla', ratio: 0.625 }, 
      { label: 'Kanal', ratio: 12.5 }, 
      { label: 'Acre', ratio: 100 }
    ],
    goldUnits: [
      { label: 'Tola', ratio: 11.664 }, 
      { label: 'Gram', ratio: 1 }, 
      { label: 'Masha', ratio: 0.972 },
      { label: 'Ratti', ratio: 0.1215 }
    ],
    silverUnits: [{ label: 'Tola', ratio: 11.664 }, { label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ur',
    defaultMadhhab: 'Hanafi',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Inheritance follows the Muslim Personal Law (Shariat) Application Act 1962 and West Pakistan Land Revenue Act 1967. Provincial land record laws apply for valuation and distribution.",
      bn: "উত্তরাধিকার মুসলিম পার্সোনাল ল (শরীয়ত) অ্যাপ্লিকেশন অ্যাক্ট ১৯৬২ এবং পশ্চিম পাকিস্তান ল্যান্ড রেভিনিউ অ্যাক্ট ১৯৬৭ অনুসরণ করে। মূল্যায়ন এবং বন্টনের জন্য প্রাদেশিক ভূমি রেকর্ড আইন প্রযোজ্য।",
      ar: "يتبع الميراث قانون تطبيق القانون الشخصي للمسلمين (الشريعة) لعام 1962 وقانون إيرادات الأراضي في غرب باكستان لعام 1967."
    },
    hijriPrimary: false,
    paymentMethods: ['JazzCash', 'EasyPaisa', 'Card', 'HBL Pay', 'Bank Transfer'],
    subscriptionPrice: { pro: '1500 PKR' }
  },
  {
    code: 'AE',
    name: { bn: 'সংযুক্ত আরব আমিরাত', en: 'UAE', ar: 'الإمارات العربية المتحدة' },
    currency: { name: 'Dirham', symbol: 'AED', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Square Foot', ratio: 0.0023 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Maliki',
    legalStatus: 'stage1',
    legalFramework: {
      en: "UAE Personal Status Law (Federal Law No. 28 of 2005) governs Muslim estates based on Maliki principles. UAE courts enforce automatic Sharia division on registered assets.",
      bn: "সংযুক্ত আরব আমিরাতের ব্যক্তিগত মর্যাদা আইন (২০০৫ সালের ২৮ নম্বর ফেডারেল আইন) মালিকি নীতির ভিত্তিতে মুসলিম এস্টেট পরিচালনা করে। আমিরাতের আদালত নিবন্ধিত সম্পদের ওপর স্বয়ংক্রিয় শরীয়াহ বন্টন কার্যকর করে।",
      ar: "ينظم قانون الأحوال الشخصية الإماراتي (القانون الاتحادي رقم ٢٨ لسنة ٢٠٠٥) تركات المسلمين بناءً على المبادئ المالكية."
    },
    hijriPrimary: false,
    paymentMethods: ['Card', 'Apple Pay', 'Samsung Pay', 'Bank Transfer'],
    subscriptionPrice: { pro: '100 AED' }
  },
  {
    code: 'MY',
    name: { bn: 'মালয়েশিয়া', en: 'Malaysia', ar: 'ماليزيا' },
    currency: { name: 'Ringgit', symbol: 'RM', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }, 
      { label: 'Hectare', ratio: 247.105 },
      { label: 'Acre', ratio: 100 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ms',
    defaultMadhhab: "Shafi'i",
    legalStatus: 'stage1',
    legalFramework: {
      en: "Governed by the Islamic Family Law (Federal Territories) Act 1984 and Shafi'i Fara'id rules. Managed by Syariah Courts and Amanah Raya Berhad (ARB).",
      bn: "১৯৮৪ সালের ইসলামিক ফ্যামিলি ল (ফেডারেল টেরিটরি) অ্যাক্ট এবং শাফেয়ী ফারায়েজ নীতি দ্বারা পরিচালিত। এটি শরীয়াহ আদালত এবং আমানাহ রায়া বেরহাদ (ARB) দ্বারা নিয়ন্ত্রিত।",
      ar: "يخضع لقانون أحكام الأسرة الإسلامية (الأقاليم الاتحادية) لعام 1984 وقواعد الفرائض الشافعية."
    },
    hijriPrimary: false,
    paymentMethods: ['FPX', 'Touch \'n Go', 'GrabPay', 'Maybank2u', 'Card'],
    subscriptionPrice: { pro: '100 MYR' }
  },
  {
    code: 'ID',
    name: { bn: 'ইন্দোনেশিয়া', en: 'Indonesia', ar: 'إندونيسيا' },
    currency: { name: 'Rupiah', symbol: 'Rp', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }, 
      { label: 'Hectare', ratio: 247.105 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'id',
    defaultMadhhab: "Shafi'i",
    legalStatus: 'stage1',
    legalFramework: {
      en: "Governed by Kompilasi Hukum Islam (KHI, 1991) and Shafi'i fiqh. Religious Courts (Pengadilan Agama) have exclusive jurisdiction over Muslim inheritance.",
      bn: "কোম্পিলাসি হুকুম ইসলাম (KHI, 1991) এবং শাফেয়ী ফিকহ দ্বারা পরিচালিত। ধর্মীয় আদালত (পেঙ্গাদিলান আগামা) মুসলিম উত্তরাধিকারের ওপর একচ্ছত্র এখতিয়ার রাখে।",
      ar: "يخضع لمجموعة قوانين الأحكام الإسلامية (KHI, 1991) والفقه الشافعي. وتتمتع المحاكم الدينية بالولاية القضائية الحصرية."
    },
    hijriPrimary: false,
    paymentMethods: ['GoPay', 'OVO', 'Dana', 'QRIS', 'VA', 'Card'],
    subscriptionPrice: { pro: '300,000 IDR' }
  },
  {
    code: 'EG',
    name: { bn: 'মিশর', en: 'Egypt', ar: 'مصر' },
    currency: { name: 'Pound', symbol: 'EGP', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Feddan', ratio: 103.8 },
      { label: 'Qirat', ratio: 4.325 },
      { label: 'Sahm', ratio: 0.18 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Hanafi',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Egyptian Law of Inheritance No. 77 of 1943 (Hanafi-based) and Law No. 71 of 1946 (Mandatory Bequest). Inheritance is strictly regulated by these statutes.",
      bn: "মিশরীয় উত্তরাধিকার আইন ১৯৪৩-এর ৭৭ নম্বর (হানাফি-ভিত্তিক) এবং ১৯৪৬-এর ৭১ নম্বর আইন (ম্যান্ডেটরি বেকুয়েস্ট) অনুযায়ী পরিচালিত। উত্তরাধিকার কঠোরভাবে এই সংবিধিবদ্ধ আইন দ্বারা নিয়ন্ত্রিত।",
      ar: "يخضع لقانون الميراث المصري رقم ٧٧ لسنة ١٩٤٣ (المستند إلى المذهب الحنفي) وقانون الوصية رقم ٧١ لسنة ١٩٤٦ (الوصية الواجبة)."
    },
    hijriPrimary: false,
    paymentMethods: ['Vodafone Cash', 'Fawry', 'InstaPay', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '500 EGP' }
  },
  {
    code: 'JO',
    name: { bn: 'জর্ডান', en: 'Jordan', ar: 'الأردن' },
    currency: { name: 'Dinar', symbol: 'JD', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Dunam', ratio: 24.71 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Hanafi',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Jordanian Personal Status Law No. 36 of 2010 and Law of Inheritance No. 239 of 1944. Sharia courts apply Hanafi jurisprudence for Muslim citizens.",
      bn: "জর্ডানীয় ব্যক্তিগত মর্যাদা আইন ২০১০-এর ৩৬ নম্বর এবং উত্তরাধিকার আইন ১৯৪৪-এর ২৩৯ নম্বর অনুযায়ী পরিচালিত। শরীয়াহ আদালত মুসলিম নাগরিকদের জন্য হানাফি ফিকহ প্রয়োগ করে।",
      ar: "يخضع لقانون الأحوال الشخصية الأردني رقم ٣٦ لسنة ٢٠١٠ وقانون الميراث رقم ٢٣٩ لسنة ١٩٤٤."
    },
    hijriPrimary: false,
    paymentMethods: ['CliQ', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '20 JOD' }
  },
  {
    code: 'KW',
    name: { bn: 'কুয়েত', en: 'Kuwait', ar: 'الكويت' },
    currency: { name: 'Dinar', symbol: 'KD', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Hanbali',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Kuwaiti Personal Status Law No. 51 of 1984. Inheritance is governed by Sharia, predominantly following the Hanbali school.",
      bn: "কুয়েতি ব্যক্তিগত মর্যাদা আইন ১৯৮৪-এর ৫১ নম্বর। উত্তরাধিকার শরীয়াহ দ্বারা পরিচালিত হয়, প্রধানত হাম্বলী মাযহাব অনুসরণ করে।",
      ar: "ينظم قانون الأحوال الشخصية الكويتي رقم ٥١ لسنة ١٩٨٤ الميراث وفق أحكام الشريعة، وبشكل أساسي المذهب الحنبلي."
    },
    hijriPrimary: true,
    paymentMethods: ['KNET', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '10 KWD' }
  },
  {
    code: 'QA',
    name: { bn: 'কাতার', en: 'Qatar', ar: 'قطر' },
    currency: { name: 'Riyal', symbol: 'QAR', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Hanbali',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Qatari Family Law No. 22 of 2006. Inheritance is strictly governed by Hanbali Sharia as codified in the Family Law.",
      bn: "কাতারি ফ্যামিলি ল ২০০৬-এর ২২ নম্বর। উত্তরাধিকার পারিবারিক আইনে সংহিতাবদ্ধ হাম্বলী শরীয়াহ দ্বারা কঠোরভাবে পরিচালিত হয়।",
      ar: "يخضع لقانون الأسرة القطري رقم ٢٢ لسنة ٢٠٠٦، حيث يتم تنظيم الميراث وفقاً للشريعة الحنبلية."
    },
    hijriPrimary: true,
    paymentMethods: ['QPay', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '100 QAR' }
  },
  {
    code: 'TR',
    name: { bn: 'তুরস্ক', en: 'Turkey', ar: 'تركيا' },
    currency: { name: 'Lira', symbol: '₺', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Decare', ratio: 24.71 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'tr',
    defaultMadhhab: 'Hanafi',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Calculations follow Hanafi Fara'id for religious guidance. Note: Turkey applies secular Civil Code (No. 4721) for official legal estate distribution.",
      bn: "ধর্মীয় নির্দেশনার জন্য হানাফি ফারায়েজ অনুসরণ করা হয়। দ্রষ্টব্য: তুরস্ক সরকারি আইনি এস্টেট বন্টনের জন্য ধর্মনিরপেক্ষ সিভিল কোড (নং ৪৭২১) প্রয়োগ করে।",
      ar: "تتبع الحسابات الفرائض الحنفية للإرشاد الديني. ملاحظة: تطبق تركيا القانون المدني العلماني (رقم ٤٧٢١) لتوزيع التركات القانوني الرسمي."
    },
    hijriPrimary: false,
    paymentMethods: ['Papara', 'PayTR', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '500 TRY' }
  },
  {
    code: 'MA',
    name: { bn: 'মরক্কো', en: 'Morocco', ar: 'المغرب' },
    currency: { name: 'Dirham', symbol: 'MAD', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }, 
      { label: 'Hectare', ratio: 247.105 },
      { label: 'Feddan', ratio: 10.37 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'ar',
    defaultMadhhab: 'Maliki',
    legalStatus: 'stage1',
    legalFramework: {
      en: "Governed by Moudawwana (Moroccan Family Code 2004) based on Maliki Sharia. Involves traditional Adoul and modern Notary systems.",
      bn: "মালিকি শরীয়াহ-ভিত্তিক মুদাওয়ানা (মরক্কো ফ্যামিলি কোড ২০০৪) দ্বারা পরিচালিত। এতে ঐতিহ্যবাহী আদৌল এবং আধুনিক নোটারি পদ্ধতি অন্তর্ভুক্ত।",
      ar: "تخضع لمدونة الأسرة المغربية (٢٠٠٤) المستندة إلى الشريعة المالكية. تشمل أنظمة العدول التقليدية والتوثيق الحديث."
    },
    hijriPrimary: false,
    paymentMethods: ['CIH Pay', 'CMI', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: '250 MAD' }
  },
  {
    code: 'ZA',
    name: { bn: 'দক্ষিণ আফ্রিকা', en: 'South Africa', ar: 'جنوب أفريقيا' },
    currency: { name: 'Rand', symbol: 'R', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Hectare', ratio: 247.105 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'en',
    defaultMadhhab: 'Shafi\'i',
    legalStatus: 'stage1',
    legalFramework: {
      en: "South African Muslim inheritance is processed via Sharia-compliant Wills recognized under the Wills Act. Often involves the Muslim Judicial Council (MJC).",
      bn: "দক্ষিণ আফ্রিকায় মুসলিম উত্তরাধিকার উইল অ্যাক্টের অধীনে স্বীকৃত শরীয়াহ-সম্মত উইলের মাধ্যমে প্রক্রিয়া করা হয়। প্রায়শই মুসলিম জুডিশিয়াল কাউন্সিল (MJC) এতে অন্তর্ভুক্ত থাকে।",
      ar: "تتم معالجة الميراث الإسلامي في جنوب أفريقيا من خلال وصايا متوافقة مع الشريعة ومعترف بها بموجب قانون الوصايا."
    },
    hijriPrimary: false,
    paymentMethods: ['Ozow', 'PayFast', 'SnapScan', 'Card', 'Bank Transfer'],
    subscriptionPrice: { pro: 'R 99' }
  },
  {
    code: 'US',
    name: { bn: 'মার্কিন যুক্তরাষ্ট্র', en: 'USA', ar: 'الولايات المتحدة' },
    currency: { name: 'USD', symbol: '$', format: 'million' },
    landUnits: [{ label: 'Acre', ratio: 100 }, { label: 'Square Foot', ratio: 0.0023 }],
    goldUnits: [{ label: 'Gram', ratio: 1 }, { label: 'Ounce', ratio: 31.103 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    primaryLanguage: 'en',
    defaultMadhhab: 'Hanafi',
    legalStatus: 'stage2',
    legalFramework: {
      en: "In the USA, state laws on probate apply. Muslims are strongly advised to have a Sharia-compliant Will (Wasiyah).",
      bn: "মার্কিন যুক্তরাষ্ট্রে প্রবেট সংক্রান্ত রাষ্ট্রীয় আইন প্রযোজ্য। মুসলমানদের একটি শরীয়াহ-সম্মত উইল (ওসীয়াহ) রাখার পরামর্শ দেওয়া হয়।",
      ar: "في الولايات المتحدة، تنطبق قوانين الولايات المتعلقة بالوصايا والتركات. يُنصح المسلمون بشدة بوضع وصية متوافقة مع الشريعة الإسلامية."
    },
    hijriPrimary: false,
    paymentMethods: ['International Card'],
    subscriptionPrice: { pro: '$4.99' }
  }
];

export const getCountryConfig = (code: string): CountryConfig => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
};
