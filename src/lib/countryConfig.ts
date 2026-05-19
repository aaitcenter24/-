import { CountryConfig } from '../types';

export const countryConfigs: Record<string, CountryConfig> = {
  BD: {
    countryCode: 'BD',
    name: { bn: 'বাংলাদেশ', en: 'Bangladesh', ar: 'بنغلاديش' },
    currency: { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', format: 'lakh' },
    landUnits: [
      { label: 'Decimal', ratio: 1 },
      { label: 'Acre', ratio: 100 },
      { label: 'Bigha', ratio: 33 },
      { label: 'Katha', ratio: 1.65 },
      { label: 'Chhatak', ratio: 0.1033 },
      { label: 'Square Meter', ratio: 0.0247 }
    ],
    goldUnits: [
      { label: 'Bhori', ratio: 11.664 },
      { label: 'Ana', ratio: 0.729 },
      { label: 'Roti', ratio: 0.1215 },
      { label: 'Gram', ratio: 1 }
    ],
    silverUnits: [
      { label: 'Bhori', ratio: 11.664 },
      { label: 'Gram', ratio: 1 }
    ],
    languages: {
      primary: 'bn',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanafi',
    paymentMethods: ['bKash', 'Nagad', 'Rocket', 'DBBL Nexus', 'Visa/Mastercard', 'Bank Transfer'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Muslim Family Laws Ordinance 1961 (MFLO)',
      statutorySource: 'Section 4 (Orphaned Grandchild Rule)',
      description: 'The primary statute governing Muslim personal law in Bangladesh. Section 4 introduces the landmark rule allowing grandchildren of a predeceased child to inherit their parent\'s share, which is a statutory modification to classical Hanafi rules.',
      keyPoints: [
        'MFLO Section 4: Children of a predeceased child inherit their deceased parent\'s proportional share.',
        'Registration Act 1908: Mandatory registration of all land deeds at the Sub-Registrar\'s office.',
        'State Acquisition and Tenancy Act 1950: Governs land ownership and transfers.',
        'Land Records: Recognizes C.S., S.A., R.S., and B.S. (Bangladesh Survey) Khatian records.',
        'Succession Certificate: Required for bank assets and liquid estates.'
      ],
      specificRules: 'Report Tone: 25-year experienced Bangladeshi Muslim inheritance lawyer. Terms used: Khatian No, Dag No, Mouza, Porcha, Namjari (Mutation), Sab-Registrar office.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '1000 BDT' }
  },
  PK: {
    countryCode: 'PK',
    name: { bn: 'পাকিস্তান', en: 'Pakistan', ar: 'باكستان', ur: 'پاکستان' },
    currency: { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', format: 'lakh' },
    landUnits: [
      { label: 'Marla', ratio: 1 }, 
      { label: 'Kanal', ratio: 20 }, 
      { label: 'Acre', ratio: 160 }
    ],
    goldUnits: [
      { label: 'Tola', ratio: 11.664 }, 
      { label: 'Masha', ratio: 0.972 },
      { label: 'Ratti', ratio: 0.1215 },
      { label: 'Gram', ratio: 1 }
    ],
    silverUnits: [{ label: 'Tola', ratio: 11.664 }, { label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ur',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanafi',
    paymentMethods: ['JazzCash', 'EasyPaisa', 'HBL Pay', 'Visa/Mastercard', 'Bank Transfer (IBAN)'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Muslim Personal Law (Shariat) Application Act 1962',
      statutorySource: 'Muslim Family Laws Ordinance 1961 (MFLO)',
      description: 'Mandates application of Shariat to all Muslims in Pakistan. It supersedes conflicting customary laws. Shares the "Orphaned Grandchild Rule" with Bangladesh under MFLO 1961.',
      keyPoints: [
        'Section 2 (MPLSAA): Directs courts to apply Muslim personal law in all inheritance cases involving Muslims.',
        'West Pakistan Land Revenue Act 1967: Governs land records (Khewat, Khasra, Khatauni) and mutations (Intiqal).',
        'Succession Certificate: Issued by NADRA/Civil Courts for financial assets.',
        'Orphaned Grandchild Rule: Statutory modification allows grandchildren to inherit through deceased parents.'
      ],
      specificRules: 'Report Tone: 25-year experienced Pakistani Muslim inheritance lawyer. Terms used: Khewat, Khasra, Khatauni, Fard, Intiqal, Patwari Circle.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '1500 PKR' }
  },
  SA: {
    countryCode: 'SA',
    name: { bn: 'সৌদি আরব', en: 'Saudi Arabia', ar: 'المملكة العربية السعودية' },
    currency: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 1 }, 
      { label: 'Hectare', ratio: 10000 },
      { label: 'Feddan', ratio: 4200 },
      { label: 'Qirat', ratio: 175 }
    ],
    goldUnits: [
      { label: 'Gram', ratio: 1 },
      { label: 'Mithqal', ratio: 4.25 },
      { label: 'Tola', ratio: 11.664 }
    ],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ar',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanbali',
    paymentMethods: ['STC Pay', 'Mada', 'Apple Pay', 'Visa/Mastercard', 'Bank Transfer (IBAN)'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Saudi Personal Status Law (Royal Decree M/73)',
      statutorySource: 'Ministry of Justice (Notary Public / Najiz)',
      description: 'The 2021 codification of personal status matters. Mandates Hanbali school as the default judicial reference. Inheritance deeds (صك الإرث) are issued by the court before any distribution.',
      keyPoints: [
        'Grandfather & Brothers: Hanbali position allows siblings to share with the grandfather (unlike Hanafi).',
        'Uterine Siblings: Receive their share even if the paternal grandfather is present.',
        'Property Freeze: All assets are legally frozen pending a court inheritance order.',
        'ZATCA: Administers zakat collection on individual assets.',
        'Real Estate Registration Law (M/6): Mandatory registration of inherited parcels with the General Authority for Real Estate.'
      ],
      specificRules: 'Report Tone: 25-year experienced Saudi Islamic inheritance specialist. Terms used: Raqm Al-Sak, Raqm Al-Qit\'a, Sak Al-Irth, Aqari.'
    },
    hijriPrimary: true,
    subscriptionPrice: { pro: '100 SAR' }
  },
  AE: {
    countryCode: 'AE',
    name: { bn: 'সংযুক্ত আরব আমিরাত', en: 'UAE', ar: 'الإمارات العربية المتحدة' },
    currency: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 1 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ar',
      secondary: 'en'
    },
    defaultMadhhab: 'Maliki',
    paymentMethods: ['Visa/Mastercard', 'Apple Pay', 'Samsung Pay', 'Bank Transfer (IBAN)', 'PayBy'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'UAE Federal Law No. 28 of 2005 on Personal Status (amended 2023)',
      statutorySource: 'Land Department / Personal Status Court',
      description: 'Primary legislation governing all Muslim personal status matters in the UAE. Courts apply Maliki school as the judicial default. Inheritance requires a court-issued certificate (شهادة الوراثة).',
      keyPoints: [
        'Maliki Distinction: Uterine siblings inherit alongside the grandfather.',
        'Property Freeze: Assets are frozen until a court inheritance certificate is registered with the Land Department (e.g., DLD Dubai).',
        'Non-Muslim Heirs: Strictly excluded from receiving shares from a Muslim estate.',
        'Expatriate Estate: Courts apply UAE Sharia law to Muslim residents unless a registered will specifies otherwise for non-realty assets.'
      ],
      specificRules: 'Report Tone: 25-year experienced UAE Islamic inheritance specialist. Terms used: Shahadat Al-Waratha, DLD, Plot No, Building No.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '100 AED' }
  },
  MY: {
    countryCode: 'MY',
    name: { bn: 'মালয়েশিয়া', en: 'Malaysia', ar: 'ماليزيا', ms: 'Malaysia' },
    currency: { code: 'MYR', name: 'Ringgit', symbol: 'RM', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 1 }, 
      { label: 'Hectare', ratio: 10000 },
      { label: 'Acre', ratio: 4046.86 },
      { label: 'Square Foot', ratio: 0.0929 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ms',
      secondary: 'en'
    },
    defaultMadhhab: "Shafi'i",
    paymentMethods: ['FPX', 'Touch \'n Go eWallet', 'GrabPay', 'Boost', 'Maybank2u', 'Visa/Mastercard'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Islamic Family Law (Federal Territories) Act 1984',
      statutorySource: 'Syariah Court / Amanah Raya Berhad',
      description: 'Inheritance (Faraid) is governed by Syariah courts. Follows Shafi\'i school as the state religion basis. Amanah Raya Berhad (ARB) acts as the official trustee corporation.',
      keyPoints: [
        'Shafi\'i Priority: Grandfather excludes brothers entirely (unlike Hanafi/Hanbali).',
        'Baitulmal: Unclaimed residue after Ashabul Furudh and Asaba is transferred to the State Islamic Religious Councils (SIRC).',
        'National Land Code 1965: Governs property registration; requires court Faraid certificate for transfers.',
        'Harta Pusaka: Small estates often managed by the Pejabat Tanah (Land Office).'
      ],
      specificRules: 'Report Tone: 25-year experienced Malaysian Syariah inheritance specialist. Terms used: Harta Pusaka, Geran, Mukim, Amanah Raya, Faraid Certificate.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '100 MYR' }
  },
  ID: {
    countryCode: 'ID',
    name: { bn: 'ইন্দোনেশিয়া', en: 'Indonesia', ar: 'إندونيسيا', id: 'Indonesia' },
    currency: { code: 'IDR', name: 'Rupiah', symbol: 'Rp', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }, 
      { label: 'Hectare', ratio: 247.105 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'id',
      secondary: 'en'
    },
    defaultMadhhab: "Shafi'i",
    paymentMethods: ['GoPay', 'OVO', 'Dana', 'QRIS', 'VA', 'Card'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Kompilasi Hukum Islam (KHI) 1991',
      statutorySource: 'Presidential Instruction No. 1 of 1991',
      description: 'KHI serves as the authoritative legal code for Islamic Personal Law in Indonesia. While based on Shafi\'i rules, it is uniquely adapted to Indonesian socio-legal context.',
      keyPoints: [
        'Ahli Waris Pengganti: Article 185 allows grandchildren to replace their deceased parents in the hierarchy.',
        'Wasiat Wajibah: Mandatory will for adopted children and parents who are non-Muslims (limited to 1/3).',
        'Harta Bersama: Joint property between husband and wife is automatically split 50/50 before inheritance.',
        'Religious Courts: Pengadilan Agama has exclusive jurisdiction over distribution certificates (SKHW).'
      ],
      specificRules: 'Article 185 KHI introduces "Substitute Heirs" (Ahli Waris Pengganti), where children of a deceased heir take their parent\'s place with a share not exceeding the share of a living heir of the same rank.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '300,000 IDR' }
  },
  EG: {
    countryCode: 'EG',
    name: { bn: 'মিশর', en: 'Egypt', ar: 'مصر' },
    currency: { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م', format: 'million' },
    landUnits: [
      { label: 'Feddan', ratio: 1 },
      { label: 'Qirat', ratio: 1 / 24 },
      { label: 'Sahm', ratio: 1 / 576 },
      { label: 'Square Meter', ratio: 1 / 4200.83 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ar',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanafi',
    paymentMethods: ['Vodafone Cash', 'Fawry', 'InstaPay', 'Visa/Mastercard', 'Bank Transfer'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Egyptian Law of Inheritance No. 77 of 1943',
      statutorySource: 'Sharia Court Succession Certificate (إعلام الوراثة)',
      description: 'The definitive Egyptian statute codifying Hanafi rules into civil law. Governs all Muslim inheritance cases in Egypt. Land must be registered at the Real Estate Registry (Shar Al-Aqari).',
      keyPoints: [
        'Hanafi Codification: Strict adherence to classical Hanafi rules (son excludes grandson).',
        'Succession Certificate: Sharia courts have exclusive jurisdiction to issue the "I\'lam Al-Waratha" required for asset transfer.',
        'Waqf Properties: Properties designated as endowments are excluded from inheritance and governed by the Ministry of Awqaf.',
        'Real Estate Registration Law: All property mutations require Shar Al-Aqari documentation.'
      ],
      specificRules: 'Report Tone: 25-year experienced Egyptian Muslim inheritance lawyer. Terms used: I\'lam Al-Waratha, Shar Al-Aqari, Basin No, Markaz, Governorate.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '500 EGP' }
  },
  JO: {
    countryCode: 'JO',
    name: { bn: 'জর্ডান', en: 'Jordan', ar: 'الأردن' },
    currency: { code: 'JOD', name: 'Jordanian Dinar', symbol: 'JD', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 1 },
      { label: 'Dunam', ratio: 1000 },
      { label: 'Hectare', ratio: 10000 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ar',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanafi',
    paymentMethods: ['CliQ', 'Visa/Mastercard', 'Bank Transfer (IBAN)'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Jordanian Personal Status Law No. 36 of 2010',
      statutorySource: 'Ministry of Justice - Sharia Courts',
      description: 'Comprehensive family legislation for Muslims. Applies Hanafi school as codified in Law No. 239 of 1944. Sharia courts issue the necessary Hujjat Al-Irth (Inheritance Deed).',
      keyPoints: [
        'Hujjat Al-Irth: Sharia court-issued certificate mandatory for all estate distribution.',
        'Department of Lands and Survey: Governs registration and transfer of real estate title deeds (Sanad Tasjeel).',
        'Hanafisequence: Strictly follows Hanafi sequence and blocking rules (father excludes grandfather).',
        'Mandatory Bequest: Jordan applies Wasiyah Wajibah for grandchildren of deceased children.'
      ],
      specificRules: 'Report Tone: 25-year experienced Jordanian Muslim inheritance lawyer. Terms used: Hujjat Al-Irth, Sanad Tasjeel, Basin No, Markaz.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '20 JOD' }
  },
  KW: {
    countryCode: 'KW',
    name: { bn: 'কুয়েত', en: 'Kuwait', ar: 'الكويت' },
    currency: { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'KD', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 1 },
      { label: 'Hectare', ratio: 10000 }
    ],
    goldUnits: [
      { label: 'Gram', ratio: 1 }
    ],
    silverUnits: [
      { label: 'Gram', ratio: 1 }
    ],
    languages: {
      primary: 'ar',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanbali',
    paymentMethods: ['KNET', 'K-Net Tap', 'Visa/Mastercard', 'Bank Transfer (IBAN)'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Kuwaiti Personal Status Law No. 51 of 1984',
      statutorySource: 'Ministry of Justice - Personal Status Courts',
      description: 'The foundational statute governing all Muslim personal status matters in Kuwait, including inheritance. Applies Hanbali school as the primary judicial reference, with court discretion to apply other Sunni madhabs where the Hanbali position may cause hardship. All inherited property must be transferred at the Real Estate Registration Directorate under the Ministry of Justice following court inheritance order. For non-Kuwaiti Muslim residents, Sharia inheritance applies to assets located in Kuwait.',
      keyPoints: [
        'Grandfather and brothers (Hanbali position): The grandfather does not fully exclude brothers. The Muqasamah principle applies: grandfather chooses between taking his share or dividing equally with brothers, whichever is more beneficial.',
        'Uterine siblings: Receive their prescribed share even when the paternal grandfather is present (Hanbali position).',
        'Daughter shares: 1/2 for sole daughter, 2/3 for two or more. If son exists, they become Asaba (son 2, daughter 1).',
        'Non-Muslim heirs: Strictly Zero share (Law No. 51/1984).',
        'Unborn child: Estate distribution suspended until birth; potential share reserved.',
        'Awl & Radd: Proportional reduction (Awl) and residue return (Radd) applied per Hanbali school.',
        'Baitulmal: If no eligible heir exists, estate transferred to Kuwait\'s Public Treasury.'
      ],
      specificRules: 'Citing Law No. 51/1984 and Hanbali fiqh (Ibn Qudama\'s Al-Kafi and Al-Mughni). The courts calculate both options (Muqasamah vs Share) for grandfathers and apply the more favorable one. Mandatory Bequest (Wasiat Wajibah) is also recognized for grandchildren up to 1/3.'
    },
    hijriPrimary: true,
    subscriptionPrice: { pro: '10 KWD' }
  },
  QA: {
    countryCode: 'QA',
    name: { bn: 'কাতার', en: 'Qatar', ar: 'قطر' },
    currency: { code: 'QAR', name: 'Riyal', symbol: 'QR', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ar',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanbali',
    paymentMethods: ['QPay', 'Card', 'Bank Transfer (IBAN)', 'Visa/Mastercard'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Qatari Family Law No. 22 of 2006',
      statutorySource: 'Article 245-250 (Heritage Rules)',
      description: 'Qatar follows the Hanbali school of jurisprudence for inheritance matters, codified in the Family Law of 2006.',
      keyPoints: [
        'Hanbali Doctrine: Strictly followed as the primary legal source.',
        'Non-Muslims: Article 2 prevents them from inheriting from a Muslim deceased.',
        'Grandfather: Shares with brothers in specific circumstances as per Hanbali rules.'
      ],
      specificRules: 'Qatar remains one of the few Gulf states that does not historically implement the modern "Mandatory Bequest" for grandchildren, adhering closely to classical Hanbali jurisprudence.'
    },
    hijriPrimary: true,
    subscriptionPrice: { pro: '100 QAR' }
  },
  TR: {
    countryCode: 'TR',
    name: { bn: 'তুরস্ক', en: 'Turkey', ar: 'تركيا', tr: 'Türkiye' },
    currency: { code: 'TRY', name: 'Lira', symbol: '₺', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Decare', ratio: 24.71 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'tr',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanafi',
    paymentMethods: ['Papara', 'PayTR', 'Troy Card', 'Visa/Mastercard', 'Bank Transfer'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Turkish Civil Code (Law No. 4721)',
      statutorySource: 'Articles 495-639 (Law of Succession)',
      description: 'Turkey uses a secular civil law system based on the Swiss Civil Code. However, many citizens use Sharia-compliant "Faraid" calculations for religious peace of mind.',
      keyPoints: [
        'Equal Shares: Secular law mandates equal inheritance for male and female children.',
        'Reserved Portion: "Saklı Pay" protects certain heirs from being completely disinherited via a will.',
        'Sharia Guidance: Diyanet (Presidency of Religious Affairs) provides Sharia certificates for voluntary distribution.'
      ],
      specificRules: 'Under secular law, grandchildren successfully represent their parents and inherit their parent\'s share equally. In the religious "Hanafi" mode of this app, traditional Sharia ratios (2:1) are applied.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '500 TRY' }
  },
  MA: {
    countryCode: 'MA',
    name: { bn: 'মরক্কো', en: 'Morocco', ar: 'المغرب' },
    currency: { code: 'MAD', name: 'Dirham', symbol: 'DH', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 }, 
      { label: 'Hectare', ratio: 247.105 },
      { label: 'Feddan', ratio: 10.37 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'ar',
      secondary: 'fr'
    },
    defaultMadhhab: 'Maliki',
    paymentMethods: ['CIH Pay', 'CMI', 'Maroc Telecom Money', 'Card', 'Bank Transfer'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'Moroccan Family Code (Moudawwana) 2004',
      statutorySource: 'Articles 321-395 (Inheritance)',
      description: 'Morocco utilizes Maliki Sharia as the basis for its Family Code. The 2004 reform modernised many aspects of personal status law while maintaining Sharia foundations.',
      keyPoints: [
        'Maliki Baseline: The Code explicitly references the Maliki school as the primary source for interpretation.',
        'Articles 360-395: Govern the distribution of assets, prioritization of debts, and mandatory bequests.',
        'Adoul Notaries: Two specialized notaries (Adoul) are required to certify the list of legal heirs.'
      ],
      specificRules: 'Articles 369-372 implement "Mandatory Bequest" (Wasiyah Wajibah) for grandchildren of deceased children (both sons and daughters), limited to 1/3 of the estate.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: '250 MAD' }
  },
  ZA: {
    countryCode: 'ZA',
    name: { bn: 'দক্ষিণ আফ্রিকা', en: 'South Africa', ar: 'جنوب أفريقيا' },
    currency: { code: 'ZAR', name: 'Rand', symbol: 'R', format: 'million' },
    landUnits: [
      { label: 'Square Meter', ratio: 0.0247 },
      { label: 'Hectare', ratio: 247.105 }
    ],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'en',
      secondary: 'af'
    },
    defaultMadhhab: "Shafi'i",
    paymentMethods: ['Ozow', 'PayFast', 'SnapScan', 'Card', 'Bank Transfer'],
    legalStatus: 'stage1',
    legalFramework: {
      title: 'South African Wills Act No. 7 of 1953',
      statutorySource: 'Constitutional Court ruling in Women\'s Legal Centre Trust',
      description: 'South Africa is a common law jurisdiction. Muslim marriages and inheritance are now recognized by the courts, but a Sharia-compliant Will is required for direct enforcement of Faraid.',
      keyPoints: [
        'Freedom of Testation: South Africans can leave their estate to whomever they choose, enabling Sharia-compliant Wills.',
        'MJC / NIHT: Local religious bodies issue Faraid certificates to guide executors.',
        'Intestate Succession: If no Will exists, the Intestate Succession Act applies, which now includes Muslim spouses.'
      ],
      specificRules: 'Since the 2022 Constitutional Court ruling, Muslim marriages must be recognized under the Marriage Act and Divorce Act, providing spouses with rights over the estate even if no Sharia Will was present.'
    },
    hijriPrimary: false,
    subscriptionPrice: { pro: 'R 99' }
  }
};

export const COUNTRIES: CountryConfig[] = Object.values(countryConfigs);

export const getCountryConfig = (code: string): CountryConfig => {
  const config = countryConfigs[code];
  if (config) return config;

  // Rule 7 — UNLISTED COUNTRY FALLBACK
  return {
    countryCode: code,
    name: { bn: code, en: code, ar: code },
    currency: { code: 'USD', name: 'US Dollar', symbol: '$', format: 'million' },
    landUnits: [{ label: 'Square Meter', ratio: 1 }],
    goldUnits: [{ label: 'Gram', ratio: 1 }],
    silverUnits: [{ label: 'Gram', ratio: 1 }],
    languages: {
      primary: 'en',
      secondary: 'en'
    },
    defaultMadhhab: 'Hanafi',
    paymentMethods: ['Card', 'Bank Transfer'],
    legalStatus: 'stage3',
    legalFramework: {
      title: 'Islamic Fara\'id Guidance (Advisory Mode)',
      statutorySource: 'Classical Sharia / Local Civil Law',
      description: 'Advisory mode — Islamic Fara\'id calculations provided for religious guidance. Civil law of your country may differ. Please consult a qualified legal professional.',
      keyPoints: [
        'Religious Guidance: Calculations are based on universal Islamic inheritance principles.',
        'Civil Law Override: Statutory laws in your jurisdiction may take precedence over religious distribution.',
        'Legal Consultation: Always verify the final distribution with a local attorney or Sharia council.'
      ],
      specificRules: 'This calculation is intended for personal faith-based planning and does not constitute formal legal advice under your country\'s specific statutes.'
    },
    hijriPrimary: false
  };
};
