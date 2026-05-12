/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Assets, CalculationResult, HEIRS, ResultRow, Madhhab } from '../types';

export function calculateInheritance(
  counts: Record<string, number>, 
  assets: Assets,
  lang: 'bn' | 'en' | 'ar' = 'bn',
  deceasedName?: string,
  individualNames?: Record<string, string[]>,
  country: 'BD' | 'PK' | 'SA' | 'ZA' = 'BD',
  madhhab: Madhhab = 'Hanafi'
): CalculationResult {
  const rows: ResultRow[] = [];
  const steps: { text: string; heirIds: string[] }[] = [];
  
  const addStep = (text: string, heirIds: string[] = []) => {
    steps.push({ text, heirIds });
  };
  
  const t = {
    start: lang === 'bn' ? 'ইসলামী শরীয়াহ অনুযায়ী সম্পত্তির বণ্টন হিসাব করা হচ্ছে।' : lang === 'ar' ? 'يتم حساب توزيع التركة وفقاً للشريعة الإسلامية.' : 'Calculating estate distribution according to Islamic Law.',
    excluded: (h: string, reason?: string) => lang === 'bn' ? `${h} - ${reason || 'নিকটবর্তী উত্তরাধিকারীর উপস্থিতির কারণে বঞ্চিত'}।` : lang === 'ar' ? `${h} - ${reason || 'محجوب لوجود وارث أقرب'} .` : `${h} - ${reason || 'excluded due to closer relative'}.`,
    reason_far: lang === 'bn' ? 'নিকটতর উত্তরসূরি বিদ্যমান' : lang === 'ar' ? 'وجود وارث أقرب' : 'closer heir is alive',
    reason_father: lang === 'bn' ? 'পিতা জীবিত' : lang === 'ar' ? 'وجود الأب' : 'father is alive',
    reason_mother: lang === 'bn' ? 'মাতা জীবিত' : lang === 'ar' ? 'وجود الأم' : 'mother is alive',
    reason_son: lang === 'bn' ? 'পুত্র জীবিত' : lang === 'ar' ? 'وجود الابن' : 'son is alive',
    reason_grandfather: lang === 'bn' ? 'দাদা জীবিত' : lang === 'ar' ? 'وجود الجد' : 'grandfather is alive',
    reason_brother: lang === 'bn' ? 'সহোদর ভাই জীবিত' : lang === 'ar' ? 'وجود الأخ الشقيق' : 'full brother is alive',
    mushtaraka: lang === 'bn' ? 'মুশতারাকা মাসআলা: শাফিঈ ও মালিকী মাযহাব অনুযায়ী সহোদর ভাই বৈপিত্রীয় ভাইদের সাথে ১/৩ অংশে অংশীদার হয়েছেন।' : lang === 'ar' ? 'المسألة المشتركة: تشارك الأخ الشقيق مع الإخوة لأم في الثلث (مذهب الشافعية والمالكية).' : 'Mushtaraka Case: Full brother shared the 1/3 with uterine siblings (Shafi\'i/Maliki).',
    akdariya: lang === 'bn' ? 'আকদারিয়া মাসআলা: স্বামী, মাতা, দাদা ও এক সহোদর বোনের উপস্থিতিতে বিশেষ বণ্টন পদ্ধতি (মালিকী, শাফিঈ ও হাম্বলী)।' : lang === 'ar' ? 'المسألة الأكدرية: توزيع خاص للزوج والأم والجد والأخت الشقيقة (عند الجمهور).' : 'Al-Akdariya Case: Special distribution for Husband, Mother, Grandfather, and one Full Sister.',
    aul: lang === 'bn' ? 'আউল (Aul): মোট অংশ ১-এর বেশি থাকায় সকল অংশীদারের প্রাপ্য অংশ আনুপাতিক হারে কমানো হয়েছে (পবিত্র কুরআনের মূলনীতির আলোকে)।' : lang === 'ar' ? 'العول: تجاوز مجموع السهام أصل المسألة، فتم تخفيض الأنصبة بنسبة وتناسب.' : 'Aul Rule: Total shares exceeded 1, all portions reduced proportionally according to legal principles.',
    radd: lang === 'bn' ? 'রাদ্দ (Radd): আসাবা না থাকায় অংশীদারদের (স্বামী/স্ত্রী বাদে) অংশ আনুপাতিক হারে বাড়ানো হয়েছে (সুন্নাহর আলোকে)।' : lang === 'ar' ? 'الرد: عدم وجود عصبة، فتمت إعادة الفاضل من التركة على أصحاب الفروض (عدا الزوجين).' : 'Radd Rule: No residuaries, portions (excluding spouse) increased proportionally.',
    asaba: lang === 'bn' ? 'অবশিষ্টাংশ আসাবা হায়ারার্কি অনুযায়ী বণ্টন করা হয়েছে (হাদিসের বর্ণনা অনুযায়ী)।' : lang === 'ar' ? 'تم توزيع الباقي وفقاً لترتيب العصبات.' : 'Remainder distributed according to Asaba hierarchy (Sunnah reference).',
    umarayn: lang === 'bn' ? 'উমারায়ান মাসআলা (Gharrawayn): মাতা অবশিষ্ট সম্পত্তির ১/৩ অংশ পেয়েছেন (হযরত উমর রা. এর ফয়সালা)।' : lang === 'ar' ? 'المسألة العمرية: حازت الأم ثلث الباقي (قضاء سيدنا عمر رضي الله عنه).' : 'Umariyya Case: Mother received 1/3 of the remainder (Caliph Umar RA decision).',
    husband_full: lang === 'bn' ? 'স্বামী মোট সম্পত্তির ১/২ অংশ পাবেন কারণ মৃত ব্যক্তির কোনো সন্তান নেই (সূরা নিসা, আয়াত-১২)।' : lang === 'ar' ? 'يرث الزوج النصف لعدم وجود فرع وارث.' : 'Husband gets 1/2 as there are no children (Surah An-Nisa, 12).',
    husband_half: lang === 'bn' ? 'স্বামী মোট সম্পত্তির ১/৪ অংশ পাবেন কারণ মৃত ব্যক্তির সন্তান রয়েছে (সূরা নিসা, আয়াত-১২)।' : lang === 'ar' ? 'يرث الزوج الربع لوجود فرع وارث.' : 'Husband gets 1/4 as there are children (An-Nisa, 12).',
    wife_full: lang === 'bn' ? 'স্ত্রী মোট সম্পত্তির ১/৪ অংশ পাবেন কারণ মৃত ব্যক্তির কোনো সন্তান নেই (সূরা নিসা, আয়াত-১২)।' : lang === 'ar' ? 'ترث الزوجة الربع لعدم وجود فرع وارث.' : 'Wife gets 1/4 as there are no children (An-Nisa, 12).',
    wife_half: lang === 'bn' ? 'স্ত্রী মোট সম্পত্তির ১/৮ অংশ পাবেন কারণ মৃত ব্যক্তির সন্তান রয়েছে (সূরা নিসা, আয়াত-১২)।' : lang === 'ar' ? 'ترث الزوجة الثمن لوجود فرع وارث.' : 'Wife gets 1/8 as there are children (An-Nisa, 12).',
    mother_1_6: lang === 'bn' ? 'মাতা মোট সম্পত্তির ১/৬ অংশ পাবেন কারণ মৃত ব্যক্তির সন্তান অথবা একাধিক ভাই-বোন বিদ্যমান (সূরা নিসা, আয়াত-১১)।' : lang === 'ar' ? 'ترث الأم السدس لوجود فرع وارث أو جمع من الإخوة.' : 'Mother gets 1/6 due to presence of children or multiple siblings (An-Nisa, 11).',
    mother_1_3: lang === 'bn' ? 'মাতা মোট সম্পত্তির ১/৩ অংশ পাবেন কারণ মৃত ব্যক্তির কোনো সন্তান নেই এবং ভাই-বোন বড়জোড় একজন (সূরা নিসা, আয়াত-১১)।' : lang === 'ar' ? 'ترث الأم الثلث لعدم وجود فرع وارث أو جمع من الإخوة.' : 'Mother gets 1/3 as there are no children and max one sibling (An-Nisa, 11).',
    daughter_half: lang === 'bn' ? 'একমাত্র কন্যা হওয়ায় তিনি মোট সম্পত্তির ১/২ অংশ পাবেন (সূরা নিসা, আয়াত-১১)।' : lang === 'ar' ? 'ترث البنت الواحدة النصف إذا انفردت ولم يكن معها من يعصبها.' : 'Single daughter gets 1/2 of the estate (An-Nisa, 11).',
    daughters_2_3: lang === 'bn' ? 'একাধিক কন্যা হওয়ায় তারা সম্মিলিতভাবে ২/৩ অংশ পাবেন (সূরা নিসা, আয়াত-১১)।' : lang === 'ar' ? 'ترث البنات الثلثين إذا كن اثنتين فصاعداً ولم يكن معهن من يعصبهن.' : 'Multiple daughters share 2/3 of the estate (An-Nisa, 11).',
    son_daughter_residuary: lang === 'bn' ? 'পুত্র ও কন্যা আসাবা হিসেবে অবশিষ্ট সম্পত্তির অংশীদার হবেন, যেখানে পুত্র কন্যার দ্বিগুণ পাবেন (সূরা নিসা, আয়াত-১১)।' : lang === 'ar' ? 'يرث الأبناء والبنات بالتعصيب للذكر مثل حظ الأنثيين.' : 'Son and daughter inherit the remainder, with son getting twice as much as daughter (An-Nisa, 11).',
    khuntha_reserved: lang === 'bn' ? 'খুনসা (উভয়লিঙ্গ) উত্তরাধিকারীর জন্য একটি সম্ভাব্য অংশ সংরক্ষিত রাখা হয়েছে।' : lang === 'ar' ? 'تم وقف نصيب احتياطي للخنثى حتى يتبين حاله.' : 'A reserved share has been set aside for the Hermaphrodite heir.',
    mafqud_reserved: lang === 'bn' ? 'নিখোঁজ (মাফকুদ) উত্তরাধিকারীর জন্য তার প্রাপ্য অংশ সংরক্ষিত রাখা হয়েছে।' : lang === 'ar' ? 'تم وقف نصيب المفقود حتى يتبين حاله.' : 'Share for the missing heir (Al-Mafqud) is reserved.',
    bayt_al_mal: lang === 'bn' ? 'কোনো বৈধ উত্তরাধিকারী না থাকায় সম্পত্তি রাষ্ট্রীয় কোষাগারে (বাইতুল মাল) জমা হবে।' : lang === 'ar' ? 'بسبب انعدام الورثة الشرعيين، تؤول التركة إلى بيت المال.' : 'No legal heirs found, the estate is transferred to the Public Treasury (Bayt al-Mal).',
    distant_kindred: lang === 'bn' ? 'আসহাবুল ফুরুজ ও আসাবা না থাকায় অবশিষ্ট সম্পদ দূরবর্তী আত্মীয়দের (যাভিল আরহাম) মধ্যে বণ্টন করা হয়েছে।' : lang === 'ar' ? 'بسبب انعدام أصحاب الفروض والعصبات، تم توزيع التركة على ذوي الأرحام.' : 'Distributed to Distant Kindred (Dhawu al-Arham) as no fixed sharers or residuaries were found.',
  };

  const c = (id: string) => counts[id] || 0;

  // Indicators
  const hasMaleDescendant = c('son') > 0 || ((country === 'BD' || country === 'PK') && c('dead_son') > 0);
  const hasFemaleDescendant = c('daughter') > 0 || ((country === 'BD' || country === 'PK') && c('dead_daughter') > 0);
  const hasOffspring = hasMaleDescendant || hasFemaleDescendant;
  
  const sibCount = c('full_brother') + c('full_sister') + 
                 c('consanguine_brother') + c('consanguine_sister') + 
                 c('uterine_brother') + c('uterine_sister');
  const hasSiblings = sibCount >= 2;

  const excluded = new Map<string, string>();
  
  // Country Specific Logic (Saudi Arabia & South Africa)
  if (country === 'SA' || country === 'ZA') {
    excluded.set('dead_son', lang === 'bn' ? 'শরীয়াহ আইনে ওছিয়ত ব্যতিত মৃত সন্তানের সন্তানরা সরাসরি ওয়ারিশ নয়' : 'Children of deceased sons do not inherit directly in Sharia Law without a specific will.');
    excluded.set('dead_daughter', lang === 'bn' ? 'শরীয়াহ আইনে ওছিয়ত ব্যতিত মৃত সন্তানের সন্তানরা সরাসরি ওয়ারিশ নয়' : 'Children of deceased daughters do not inherit directly in Sharia Law without a specific will.');
  }

  // Basic Exclusions
  if (c('father') > 0) {
    excluded.set('grandfather', t.reason_father);
    excluded.set('grandmother_paternal', t.reason_father);
    excluded.set('great_grandfather', t.reason_father);
    excluded.set('full_brother', t.reason_father); excluded.set('full_sister', t.reason_father);
    excluded.set('consanguine_brother', t.reason_father); excluded.set('consanguine_sister', t.reason_father);
    excluded.set('uterine_brother', t.reason_father); excluded.set('uterine_sister', t.reason_father);
  }
  if (c('mother') > 0) {
    excluded.set('grandmother_paternal', t.reason_mother);
    excluded.set('grandmother_maternal', t.reason_mother);
    excluded.set('great_grandmother', t.reason_mother);
  }
  
  if (hasMaleDescendant) {
    excluded.set('full_brother', t.reason_son); excluded.set('full_sister', t.reason_son);
    excluded.set('consanguine_brother', t.reason_son); excluded.set('consanguine_sister', t.reason_son);
    excluded.set('uterine_brother', t.reason_son); excluded.set('uterine_sister', t.reason_son);
  }
  
  // Grandfather vs Siblings (Refined)
  let isMuqasamaActive = false;
  if (c('grandfather') > 0 && c('father') === 0) {
    if (madhhab === 'Hanafi') {
      const gReason = lang === 'bn' ? 'দাদা জীবিত (হানাফী মাযহাব অনুযায়ী ভাই-বোন বঞ্চিত)' : lang === 'ar' ? 'الجد بمنزلة الأب فيحجب الإخوة (المذهب الحنفي).' : 'Grandfather acts like the Father and excludes siblings (Hanafi School).';
      excluded.set('full_brother', gReason);
      excluded.set('full_sister', gReason);
      excluded.set('consanguine_brother', gReason);
      excluded.set('consanguine_sister', gReason);
      excluded.set('uterine_brother', gReason);
      excluded.set('uterine_sister', gReason);
    } else {
      // Majority (Maliki, Shafi'i, Hanbali) view
      // Uterine siblings are ALWAYS excluded by Grandfather
      excluded.set('uterine_brother', t.reason_grandfather);
      excluded.set('uterine_sister', t.reason_grandfather);
      
      const hasSiblingsToShare = c('full_brother') > 0 || c('full_sister') > 0 || c('consanguine_brother') > 0 || c('consanguine_sister') > 0;
      if (hasSiblingsToShare) {
        isMuqasamaActive = true;
      }
    }
  }

  if (c('grandfather') > 0) excluded.set('great_grandfather', t.reason_grandfather);
  if (c('grandmother_maternal') > 0 || c('grandmother_paternal') > 0) excluded.set('great_grandmother', t.reason_far);
  if (c('full_brother') > 0) {
    excluded.set('consanguine_brother', t.reason_brother);
    excluded.set('consanguine_sister', t.reason_brother);
  }

  addStep(t.start);
  const mName = lang === 'bn' ? (madhhab === 'Hanafi' ? 'হানাফী' : madhhab === 'Maliki' ? 'মালিকী' : madhhab === 'Shafi\'i' ? 'শাফিঈ' : 'হাম্বলী') : lang === 'ar' ? (madhhab === 'Hanafi' ? 'حنفي' : madhhab === 'Maliki' ? 'مالكي' : madhhab === 'Shafi\'i' ? 'شافعي' : 'حنبلي') : madhhab;
  addStep(lang === 'bn' ? `${mName} মাযহাব অনুযায়ী হিসাব করা হচ্ছে।` : lang === 'ar' ? `يتم الحساب وفقاً للمذهب الـ ${mName}.` : `Calculating according to ${mName} Madhhab.`);

  if (country === 'BD' || country === 'PK') addStep(lang === 'bn' ? 'মুসলিম পারিবারিক আইন অধ্যাদেশ (১৯৬১) ও হানাফী ফিকহ অনুযায়ী।' : 'According to Muslim Family Laws Ordinance (1961) and Hanafi Jurisprudence.');
  if (country === 'SA') addStep(lang === 'bn' ? 'সৌদি আরবের প্রচলিত হাম্বলী মাযহাব ও শরীয়াহ আইন অনুযায়ী।' : 'Calculating according to Hanbali law and Saudi legal frameworks.');
  if (country === 'ZA') addStep(lang === 'bn' ? 'দক্ষিণ আফ্রিকায় প্রচলিত শরীয়াহ ভিত্তিক মুসলিম উত্তরাধিকার আইন অনুযায়ী।' : 'Calculating according to Sharia-law based Islamic inheritance rules in South Africa.');

  const shares: Record<string, number> = {};
  
  // Fixed Sharers
  if (c('husband') > 0) { shares['husband'] = hasOffspring ? 1/4 : 1/2; addStep(hasOffspring ? t.husband_half : t.husband_full, ['husband']); }
  if (c('wife') > 0) { shares['wife'] = hasOffspring ? 1/8 : 1/4; addStep(hasOffspring ? t.wife_half : t.wife_full, ['wife']); }

  if (c('father') > 0 && hasMaleDescendant) {
    shares['father'] = 1/6;
    addStep(lang === 'bn' ? 'পিতা ১/৬ অংশ পাবেন যেহেতু মৃত ব্যক্তির পুরুষ উত্তরসূরি রয়েছে।' : 'Father gets 1/6 as there are male descendants.', ['father']);
  }
  if (!excluded.has('grandfather') && c('grandfather') > 0 && hasMaleDescendant) {
    shares['grandfather'] = 1/6;
    addStep(lang === 'bn' ? 'দাদা ১/৬ অংশ পাবেন যেহেতু মৃত ব্যক্তির পুরুষ উত্তরসূরি রয়েছে।' : 'Grandfather gets 1/6 as there are male descendants.', ['grandfather']);
  }

  if (c('mother') > 0) {
    const isUmarayn = !hasOffspring && sibCount < 2 && c('father') > 0 && (c('husband') > 0 || c('wife') > 0);
    if (isUmarayn) {
      const spouseShare = shares['husband'] || shares['wife'] || 0;
      shares['mother'] = (1 - spouseShare) * (1/3);
      addStep(t.umarayn, ['mother', 'father', 'husband', 'wife']);
    } else {
      shares['mother'] = (hasOffspring || hasSiblings) ? 1/6 : 1/3;
      addStep((hasOffspring || hasSiblings) ? t.mother_1_6 : t.mother_1_3, ['mother']);
    }
  }

  let gCount = 0;
  const gHeirs = ['grandmother_paternal', 'grandmother_maternal', 'great_grandmother'];
  gHeirs.forEach(id => {
    if (!excluded.has(id) && c(id) > 0) gCount += c(id);
  });
  if (gCount > 0) {
    const totalG = 1/6;
    const activeG = gHeirs.filter(id => !excluded.has(id) && c(id) > 0);
    activeG.forEach(id => {
      shares[id] = (totalG / gCount) * c(id);
    });
    addStep(lang === 'bn' ? `দাদি/নানি (${gCount} জন) সম্মিলিতভাবে ১/৬ অংশ পেয়েছেন।` : `Grandmothers shared 1/6 of the estate.`, activeG);
  }

  const totalDaughters = c('daughter') + ((country === 'BD' || country === 'PK') ? c('dead_daughter') : 0);
  if (totalDaughters > 0 && c('son') === 0 && (country === 'SA' || country === 'ZA' || c('dead_son') === 0)) {
    const totalDaughterShare = totalDaughters === 1 ? 1/2 : 2/3;
    const dHeirs: string[] = [];
    if (c('daughter') > 0) { shares['daughter'] = (totalDaughterShare / totalDaughters) * c('daughter'); dHeirs.push('daughter'); }
    if ((country === 'BD' || country === 'PK') && c('dead_daughter') > 0) { shares['dead_daughter'] = (totalDaughterShare / totalDaughters) * c('dead_daughter'); dHeirs.push('dead_daughter'); }
    addStep(totalDaughters === 1 ? t.daughter_half : t.daughters_2_3, dHeirs);
  }

  const utHeirs = ['uterine_brother', 'uterine_sister'];
  const activeUt = utHeirs.filter(id => !excluded.has(id) && c(id) > 0);
  const utCountValue = activeUt.reduce((sum, id) => sum + c(id), 0);
  if (utCountValue > 0) {
    const totalU = utCountValue === 1 ? 1/6 : 1/3;
    activeUt.forEach(id => {
      shares[id] = (totalU / utCountValue) * c(id);
    });
    addStep(utCountValue === 1 ? (lang === 'bn' ? 'বৈপিত্রেয় ভাই/বোন ১/৬ পেয়েছেন।' : 'Uterine brother/sister gets 1/6.') : (lang === 'bn' ? 'বৈপিত্রেয় ভাই ও বোন সম্মিলিতভাবে ১/৩ পেয়েছেন।' : 'Uterine brothers and sisters shared 1/3.'), activeUt);
  }

  // Special Case: Akdariya (Shafi'i, Maliki, Hanbali)
  if (madhhab !== 'Hanafi' && c('husband') > 0 && c('mother') > 0 && c('grandfather') > 0 && c('full_sister') === 1 && sibCount === 1 && !hasOffspring) {
    // Standard Sharer assignments first
    shares['husband'] = 3/9;
    shares['mother'] = 2/9;
    const combinedGfSister = 4/9;
    shares['grandfather'] = combinedGfSister * (2/3);
    shares['full_sister'] = combinedGfSister * (1/3);
    
    addStep(t.akdariya, ['husband', 'mother', 'grandfather', 'full_sister']);
  } else {
    // Normal rules for full sister
    const canSistersBeSharers = !hasMaleDescendant && c('father') === 0 && c('full_brother') === 0 && !hasFemaleDescendant && !isMuqasamaActive; 
    if (canSistersBeSharers && c('full_sister') > 0) {
      const totalFs = c('full_sister') === 1 ? 1/2 : 2/3;
      shares['full_sister'] = totalFs / c('full_sister');
      addStep(c('full_sister') === 1 ? (lang === 'bn' ? 'সহোদর বোন ১/২ পেয়েছেন।' : 'Full sister gets 1/2.') : (lang === 'bn' ? 'সহোদর বোনরা সম্মিলিতভাবে ২/৩ পেয়েছেন।' : 'Full sisters shared 2/3.'), ['full_sister']);
    }
  }

  // Consanguine Sister completion share (Takmela al-Thuluthayn)
  if (!hasMaleDescendant && c('father') === 0 && c('full_brother') === 0 && c('consanguine_brother') === 0 && c('full_sister') === 1 && c('consanguine_sister') > 0 && !hasFemaleDescendant) {
    const totalCs = 1/6;
    shares['consanguine_sister'] = totalCs / c('consanguine_sister');
    addStep(lang === 'bn' ? 'বৈমাত্রীয় বোন ১/৬ পেয়েছেন (পূর্ণ বোনের ১/২ অংশের পর ২/৩ পূর্ণ করতে)।' : 'Consanguine sister gets 1/6 (completion of 2/3).', ['consanguine_sister', 'full_sister']);
  } else if (!hasMaleDescendant && c('father') === 0 && c('full_brother') === 0 && c('consanguine_brother') === 0 && c('full_sister') === 0 && c('consanguine_sister') > 0 && !hasFemaleDescendant) {
    const totalCs = c('consanguine_sister') === 1 ? 1/2 : 2/3;
    shares['consanguine_sister'] = totalCs / c('consanguine_sister');
    addStep(c('consanguine_sister') === 1 ? (lang === 'bn' ? 'বৈমাত্রীয় বোন ১/২ পেয়েছেন।' : 'Consanguine sister gets 1/2.') : (lang === 'bn' ? 'বৈমাত্রীয় বোনরা সম্মিলিতভাবে ২/৩ পেয়েছেন।' : 'Consanguine sisters shared 2/3.'), ['consanguine_sister']);
  }

  if (c('khuntha_heir') > 0) { shares['khuntha_heir'] = 1/6; addStep(t.khuntha_reserved, ['khuntha_heir']); }
  if (c('mafqud_heir') > 0) { shares['mafqud_heir'] = 1/6; addStep(t.mafqud_reserved, ['mafqud_heir']); }

  // 4. Residuaries (Asaba)
  let totalFixed = Object.values(shares).reduce((a, b) => a + b, 0);
  if (totalFixed < 1) {
    let remainder = 1 - totalFixed;
    // Special Case: Mushtaraka (Shafi'i & Maliki)
    if ((madhhab === 'Shafi\'i' || madhhab === 'Maliki') && 
        c('husband') > 0 && c('mother') > 0 && 
        utCountValue >= 2 && c('full_brother') > 0) {
      const mushtarakaShare = 1/3;
      const combinedCount = utCountValue + c('full_brother');
      const perPerson = mushtarakaShare / combinedCount;
      
      // Update uterine shares
      if (c('uterine_brother') > 0) shares['uterine_brother'] = perPerson * c('uterine_brother');
      if (c('uterine_sister') > 0) shares['uterine_sister'] = perPerson * c('uterine_sister');
      // Full brother gets his share here instead of Asaba
      shares['full_brother'] = perPerson * c('full_brother');
      
      totalFixed = Object.values(shares).reduce((a, b) => a + b, 0);
      remainder = 1 - totalFixed;
      addStep(t.mushtaraka, ['full_brother', 'uterine_brother', 'uterine_sister', 'mother', 'husband']);
    }

    const asabaGroups: { ids: string[]; weights: Record<string, number> }[] = [
      { ids: (country === 'BD' || country === 'PK') ? ['son', 'daughter', 'dead_son', 'dead_daughter'] : ['son', 'daughter'], weights: { son: 2, daughter: 1, dead_son: 2, dead_daughter: 1 } },
      { ids: ['father'], weights: { father: 1 } },
    ];

    // Grandfather Section for Asaba/Muqasama (Refined with Al-Ma'adda)
    if (isMuqasamaActive) {
      const currentTotalFixed = Object.values(shares).reduce((a, b) => a + b, 0);
      const remainderValue = 1 - currentTotalFixed;
      
      const fsCount = c('full_sister');
      const fbCount = c('full_brother');
      const csCount = c('consanguine_sister');
      const cbCount = c('consanguine_brother');
      
      // Al-Ma'adda: Consanguine siblings are counted to reduce Grandfather's share
      const totalSibWeight = (fbCount * 2) + fsCount + (cbCount * 2) + csCount;
      const muqasamaShare = (remainderValue * 2) / (2 + totalSibWeight); 

      // Grandfather's share is the best of: 1/6 of total, 1/3 of Remainder, or Muqasama
      const gfBestShare = Math.max(1/6, remainderValue * (1/3), muqasamaShare);
      shares['grandfather'] = gfBestShare;
      
      const muqasamaHeirs = ['grandfather'];
      if (fbCount > 0) muqasamaHeirs.push('full_brother');
      if (fsCount > 0) muqasamaHeirs.push('full_sister');
      if (cbCount > 0) muqasamaHeirs.push('consanguine_brother');
      if (csCount > 0) muqasamaHeirs.push('consanguine_sister');

      let sibRemainder = remainderValue - gfBestShare;
      if (sibRemainder > 0) {
        const fullSibWeight = (fbCount * 2) + fsCount;
        if (fullSibWeight > 0) {
          // Full siblings take their share, capped at what they would get normally if no GF
          // But actually in Muqasama they take the rest of the siblings' share (Al-Ma'adda)
          const shareForFull = sibRemainder; 
          
          if (fbCount > 0) {
             shares['full_brother'] = (shareForFull * 2) / fullSibWeight;
             shares['full_sister'] = shareForFull / fullSibWeight;
             // Consanguines are excluded by Full Brother in Ma'adda
             if (cbCount > 0) excluded.set('consanguine_brother', lang === 'bn' ? 'সহোদর ভাই দ্বারা বঞ্চিত (আল-মাআদ্দা)' : 'Excluded by full brother (Al-Ma\'adda)');
             if (csCount > 0) excluded.set('consanguine_sister', lang === 'bn' ? 'সহোদর ভাই দ্বারা বঞ্চিত (আল-মাআদ্দা)' : 'Excluded by full brother (Al-Ma\'adda)');
          } else {
             // Only Full Sisters
             const fsCap = fsCount === 1 ? 1/2 : 2/3;
             const actualFullShare = Math.min(shareForFull, fsCap);
             shares['full_sister'] = actualFullShare / fsCount;
             sibRemainder -= actualFullShare;
             
             // Remainder after Full Sisters goes to Consanguines (if any)
             if (sibRemainder > 0 && (cbCount * 2 + csCount) > 0) {
                const perW = sibRemainder / (cbCount * 2 + csCount);
                shares['consanguine_brother'] = perW * 2 * c('consanguine_brother');
                shares['consanguine_sister'] = perW * c('consanguine_sister');
             }
          }
        } else if ((cbCount * 2 + csCount) > 0) {
          const perW = sibRemainder / (cbCount * 2 + csCount);
          shares['consanguine_brother'] = perW * 2 * c('consanguine_brother');
          shares['consanguine_sister'] = perW * c('consanguine_sister');
        }
      }
      
      const maaddaNote = (fbCount > 0 || fsCount > 0) && (cbCount > 0 || csCount > 0) 
        ? (lang === 'bn' ? ' (আল-মাআদ্দা নীতি প্রয়োগ করা হয়েছে)' : ' (Al-Ma\'adda principle applied)')
        : '';
      addStep((lang === 'bn' ? 'দাদা ও ভাই-বোনদের মধ্যে মুকাসামা (Sharing) পদ্ধতিতে সম্পদ বণ্টন করা হয়েছে' : 'Grandfather and siblings shared the estate via Muqasama') + maaddaNote, muqasamaHeirs);
    } else {
      asabaGroups.push({ ids: ['grandfather'], weights: { grandfather: 1 } });
    }

    asabaGroups.push(...[
      { ids: ['full_brother', 'full_sister'], weights: { full_brother: 2, full_sister: 1 } },
      { ids: ['consanguine_brother', 'consanguine_sister'], weights: { consanguine_brother: 2, consanguine_sister: 1 } },
      { ids: ['full_nephew'], weights: { full_nephew: 1 } },
      { ids: ['consanguine_nephew'], weights: { consanguine_nephew: 1 } },
      { ids: ['full_uncle'], weights: { full_uncle: 1 } },
      { ids: ['consanguine_uncle'], weights: { consanguine_uncle: 1 } },
      { ids: ['full_cousin'], weights: { full_cousin: 1 } },
      { ids: ['consanguine_cousin'], weights: { consanguine_cousin: 1 } },
      { ids: ['maternal_uncle', 'maternal_uncle_son', 'maternal_aunt', 'maternal_aunt_daughter'], weights: { maternal_uncle: 2, maternal_uncle_son: 2, maternal_aunt: 1, maternal_aunt_daughter: 1 } }
    ]);

    for (const group of asabaGroups) {
      const active = group.ids.filter(id => c(id) > 0 && !excluded.has(id));
      if (active.length > 0) {
        if (group.ids.includes('maternal_uncle')) addStep(t.distant_kindred, active);
        const totalWeight = active.reduce((sum, id) => sum + (c(id) * (group.weights[id as keyof typeof group.weights] || 1)), 0);
        active.forEach(id => {
          const w = group.weights[id as keyof typeof group.weights] || 1;
          shares[id] = (shares[id] || 0) + (remainder * w * c(id)) / totalWeight;
        });
        remainder = 0;
        addStep(t.asaba, active);
        break;
      }
    }

    if (remainder > 0) {
      const rHeirs = Object.keys(shares).filter(id => id !== 'husband' && id !== 'wife');
      const nonSpouseFixed = rHeirs.reduce((sum, id) => sum + shares[id], 0);
      if (nonSpouseFixed > 0) {
        addStep(t.radd, rHeirs);
        const factor = (1 - (shares['husband'] || 0) - (shares['wife'] || 0)) / nonSpouseFixed;
        Object.keys(shares).forEach(id => { if (id !== 'husband' && id !== 'wife') shares[id] *= factor; });
      } else {
        const spouseId = c('husband') > 0 ? 'husband' : 'wife';
        if (shares[spouseId]) { shares[spouseId] = 1; addStep(lang === 'bn' ? 'কোনো ওয়ারিশ না থাকায় স্বামী/স্ত্রী অবশিষ্ট সব সম্পদ পাবেন।' : 'Spouse gets the remainder as there are no other heirs.', [spouseId]); }
        else addStep(t.bayt_al_mal);
      }
    }
  } else if (totalFixed > 1) {
    addStep(t.aul, Object.keys(shares));
    Object.keys(shares).forEach(id => shares[id] /= totalFixed);
  }

  // Final mapping
  HEIRS.forEach(h => {
    const count = c(h.id);
    if (count > 0) {
      const names = individualNames?.[h.id] || [];
      if (excluded.has(h.id)) {
        for(let i=0; i<count; i++) {
          const hName = lang === 'bn' ? h.nameBn : lang === 'ar' ? h.nameAr : h.nameEn;
          rows.push({
            heirId: h.id,
            name: hName,
            individualName: names[i] || '',
            fraction: '0', decimal: 0, land: 0, money: 0, gold: 0, silver: 0,
            note: t.excluded(hName, excluded.get(h.id))
          });
        }
      } else if (shares[h.id]) {
        const perPerson = shares[h.id] / count;
        const hName = lang === 'bn' ? h.nameBn : lang === 'ar' ? h.nameAr : h.nameEn;
        
        let heirSpecificNote = '';
        if (h.id === 'husband' || h.id === 'wife') heirSpecificNote = hasOffspring ? (h.id === 'husband' ? t.husband_half : t.wife_half) : (h.id === 'husband' ? t.husband_full : t.wife_full);
        else if (h.id === 'mother') {
            const isUmarayn = !hasOffspring && sibCount < 2 && c('father') > 0 && (c('husband') > 0 || c('wife') > 0);
            heirSpecificNote = isUmarayn ? t.umarayn : ((hasOffspring || hasSiblings) ? t.mother_1_6 : t.mother_1_3);
        }
        else if (h.id === 'daughter') heirSpecificNote = (c('son') > 0) ? t.son_daughter_residuary : (c('daughter') === 1 ? t.daughter_half : t.daughters_2_3);
        else heirSpecificNote = steps.find(s => s && s.text && (s.text.includes(hName) || s.text.includes('Asaba') || s.text.includes('আসাবা')))?.text || (steps.length > 0 ? steps[steps.length - 1].text : '');

        for(let i=0; i<count; i++) {
          rows.push({
            heirId: h.id,
            name: hName,
            individualName: names[i] || '',
            fraction: perPerson < 0.0001 ? '0' : (perPerson).toFixed(4),
            decimal: perPerson,
            land: perPerson * assets.land,
            money: perPerson * assets.money,
            gold: perPerson * assets.gold,
            silver: perPerson * assets.silver,
            note: heirSpecificNote
          });
        }
      }
    }
  });

  return {
    rows,
    totalFraction: rows.reduce((sum, r) => sum + r.decimal, 0),
    steps,
    deceasedName
  };
}
