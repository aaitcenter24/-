/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Assets, CalculationResult, HEIRS, ResultRow } from '../types';

export function calculateInheritance(
  counts: Record<string, number>, 
  assets: Assets,
  lang: 'bn' | 'en' = 'bn'
): CalculationResult {
  const rows: ResultRow[] = [];
  const steps: string[] = [];
  
  const t = {
    start: lang === 'bn' ? 'ইসলামী শরীয়াহ অনুযায়ী সম্পত্তির বণ্টন হিসাব করা হচ্ছে।' : 'Calculating estate distribution according to Islamic Law.',
    excluded: (h: string) => lang === 'bn' ? `${h} অন্য কোনো নিকটবর্তী উত্তরাধিকারীর উপস্থিতির কারণে অংশীদার থেকে বঞ্চিত হয়েছেন।` : `${h} is excluded from inheritance due to closer relatives.`,
    aul: lang === 'bn' ? 'আউল (Aul): মোট অংশ ১-এর বেশি হওয়ায় সকল অংশীদারের প্রাপ্য অংশ আনুপাতিক হারে কমানো হয়েছে (পবিত্র কুরআনের মূলনীতির আলোকে)।' : 'Aul Rule: Total shares exceeded 1, all portions reduced proportionally according to legal principles.',
    radd: lang === 'bn' ? 'রাদ্দ (Radd): আসাবা না থাকায় অংশীদারদের (স্বামী/স্ত্রী বাদে) অংশ আনুপাতিক হারে বাড়ানো হয়েছে (সুন্নাহর আলোকে)।' : 'Radd Rule: No residuaries, portions (excluding spouse) increased proportionally.',
    asaba: lang === 'bn' ? 'অবশিষ্টাংশ আসাবা হায়ারার্কি অনুযায়ী বণ্টন করা হয়েছে (হাদিসের বর্ণনা অনুযায়ী)।' : 'Remainder distributed according to Asaba hierarchy (Sunnah reference).',
    umarayn: lang === 'bn' ? 'উমারায়ান মাসআলা (Gharrawayn): মাতা অবশিষ্ট সম্পত্তির ১/৩ অংশ পেয়েছেন (হযরত উমর রা. এর ফয়সালা)।' : 'Umariyya Case: Mother received 1/3 of the remainder (Caliph Umar RA decision).',
    husband_full: lang === 'bn' ? 'স্বামী মোট সম্পত্তির ১/২ অংশ পাবেন কারণ মৃত ব্যক্তির কোনো সন্তান নেই (সূরা নিসা, আয়াত-১২)।' : 'Husband gets 1/2 as there are no children (Surah An-Nisa, 12).',
    husband_half: lang === 'bn' ? 'স্বামী মোট সম্পত্তির ১/৪ অংশ পাবেন কারণ মৃত ব্যক্তির সন্তান রয়েছে (সূরা নিসা, আয়াত-১২)।' : 'Husband gets 1/4 as there are children (An-Nisa, 12).',
    wife_full: lang === 'bn' ? 'স্ত্রী মোট সম্পত্তির ১/৪ অংশ পাবেন কারণ মৃত ব্যক্তির কোনো সন্তান নেই (সূরা নিসা, আয়াত-১২)।' : 'Wife gets 1/4 as there are no children (An-Nisa, 12).',
    wife_half: lang === 'bn' ? 'স্ত্রী মোট সম্পত্তির ১/৮ অংশ পাবেন কারণ মৃত ব্যক্তির সন্তান রয়েছে (সূরা নিসা, আয়াত-১২)।' : 'Wife gets 1/8 as there are children (An-Nisa, 12).',
    mother_1_6: lang === 'bn' ? 'মাতা মোট সম্পত্তির ১/৬ অংশ পাবেন কারণ মৃত ব্যক্তির সন্তান অথবা একাধিক ভাই-বোন বিদ্যমান (সূরা নিসা, আয়াত-১১)।' : 'Mother gets 1/6 due to presence of children or multiple siblings (An-Nisa, 11).',
    mother_1_3: lang === 'bn' ? 'মাতা মোট সম্পত্তির ১/৩ অংশ পাবেন কারণ মৃত ব্যক্তির কোনো সন্তান নেই এবং ভাই-বোন বড়জোড় একজন (সূরা নিসা, আয়াত-১১)।' : 'Mother gets 1/3 as there are no children and max one sibling (An-Nisa, 11).',
    daughter_half: lang === 'bn' ? 'একমাত্র কন্যা হওয়ায় তিনি মোট সম্পত্তির ১/২ অংশ পাবেন (সূরা নিসা, আয়াত-১১)।' : 'Single daughter gets 1/2 of the estate (An-Nisa, 11).',
    daughters_2_3: lang === 'bn' ? 'একাধিক কন্যা হওয়ায় তারা সম্মিলিতভাবে ২/৩ অংশ পাবেন (সূরা নিসা, আয়াত-১১)।' : 'Multiple daughters share 2/3 of the estate (An-Nisa, 11).',
    son_daughter_residuary: lang === 'bn' ? 'পুত্র ও কন্যা আসাবা হিসেবে অবশিষ্ট সম্পত্তির অংশীদার হবেন, যেখানে পুত্র কন্যার দ্বিগুণ পাবেন (সূরা নিসা, আয়াত-১১)।' : 'Son and daughter inherit the remainder, with son getting twice as much as daughter (An-Nisa, 11).',
  };

  // Utility to get count
  const c = (id: string) => counts[id] || 0;

  // 1. Identify existence indicators
  const hasMaleDescendant = c('son') > 0 || c('dead_son') > 0;
  const hasFemaleDescendant = c('daughter') > 0 || c('dead_daughter') > 0;
  const hasOffspring = hasMaleDescendant || hasFemaleDescendant;
  
  const sibCount = c('full_brother') + c('full_sister') + 
                 c('consanguine_brother') + c('consanguine_sister') + 
                 c('uterine_brother') + c('uterine_sister');
  const hasSiblings = sibCount >= 2;

  // 2. Exclusion Logic
  const excluded = new Set<string>();
  if (c('father') > 0) {
    excluded.add('grandfather');
    excluded.add('grandmother_paternal');
    excluded.add('full_brother'); excluded.add('full_sister');
    excluded.add('consanguine_brother'); excluded.add('consanguine_sister');
    excluded.add('uterine_brother'); excluded.add('uterine_sister');
  }
  if (c('mother') > 0) {
    excluded.add('grandmother_paternal');
    excluded.add('grandmother_maternal');
  }
  if (c('son') > 0 || c('dead_son') > 0) {
    excluded.add('full_brother'); excluded.add('full_sister');
    excluded.add('consanguine_brother'); excluded.add('consanguine_sister');
    excluded.add('uterine_brother'); excluded.add('uterine_sister');
    excluded.add('grandfather');
  }
  if (hasMaleDescendant) {
    excluded.add('uterine_brother');
    excluded.add('uterine_sister');
  }
  if (c('grandfather') > 0) {
     excluded.add('grandmother_paternal');
  }
  if (c('full_brother') > 0) {
    excluded.add('consanguine_brother'); excluded.add('consanguine_sister');
  }

  steps.push(t.start);

  // 3. Define Sharers and Residuaries
  const shares: Record<string, number> = {};
  
  // FIXED SHARERS
  // Husband / Wife
  if (c('husband') > 0) {
    shares['husband'] = hasOffspring ? 1/4 : 1/2;
    steps.push(hasOffspring ? t.husband_half : t.husband_full);
  }
  if (c('wife') > 0) {
    shares['wife'] = hasOffspring ? 1/8 : 1/4;
    steps.push(hasOffspring ? t.wife_half : t.wife_full);
  }

  // Mother
  if (c('mother') > 0) {
    const isUmarayn = !hasOffspring && sibCount < 2 && c('father') > 0 && (c('husband') > 0 || c('wife') > 0);
    if (isUmarayn) {
      const spouseShare = shares['husband'] || shares['wife'] || 0;
      shares['mother'] = (1 - spouseShare) * (1/3);
      steps.push(t.umarayn);
    } else {
      shares['mother'] = (hasOffspring || hasSiblings) ? 1/6 : 1/3;
      steps.push((hasOffspring || hasSiblings) ? t.mother_1_6 : t.mother_1_3);
    }
  }

  // Daughters (if no sons)
  const totalDaughtersInclDead = c('daughter') + c('dead_daughter');
  if (totalDaughtersInclDead > 0 && c('son') === 0 && c('dead_son') === 0) {
    const totalDaughterShare = totalDaughtersInclDead === 1 ? 1/2 : 2/3;
    if (c('daughter') > 0) shares['daughter'] = (totalDaughterShare / totalDaughtersInclDead) * c('daughter');
    if (c('dead_daughter') > 0) shares['dead_daughter'] = (totalDaughterShare / totalDaughtersInclDead) * c('dead_daughter');
    steps.push(totalDaughtersInclDead === 1 ? t.daughter_half : t.daughters_2_3);
  }

  // Uterines
  if (!excluded.has('uterine_brother') || !excluded.has('uterine_sister')) {
    const uCount = c('uterine_brother') + c('uterine_sister');
    if (uCount === 1) {
      if (c('uterine_brother') > 0) shares['uterine_brother'] = 1/6;
      else shares['uterine_sister'] = 1/6;
    } else if (uCount > 1) {
      const totalU = 1/3;
      if (c('uterine_brother') > 0) shares['uterine_brother'] = (totalU / uCount) * c('uterine_brother');
      if (c('uterine_sister') > 0) shares['uterine_sister'] = (totalU / uCount) * c('uterine_sister');
    }
  }

  // representation logic for dead children (Bangladeshi 1961 ordinance)
  if (c('dead_son') > 0 || c('dead_daughter') > 0) {
    // Grandchildren of deceased children inherit what their parent would have (Residuary or Sharer)
    // This is a complex override. 
  }

  // 4. Handle ASABA (Residuaries)
  let totalFixed = Object.values(shares).reduce((a, b) => a + b, 0);
  
  if (totalFixed < 1) {
    let remainder = 1 - totalFixed;
    
    // Asaba hierarchy
    const asabaGroups = [
      // 1. Descendants (Including representation for deceased children as per 1961 Ordinance)
      { ids: ['son', 'daughter', 'dead_son', 'dead_daughter'], weights: { son: 2, daughter: 1, dead_son: 2, dead_daughter: 1 } },
      // 2. Ascendants
      { ids: ['father'], weights: { father: 1 } },
      { ids: ['grandfather'], weights: { grandfather: 1 } },
      // 3. Siblings
      { ids: ['full_brother', 'full_sister'], weights: { full_brother: 2, full_sister: 1 } },
      { ids: ['consanguine_brother', 'consanguine_sister'], weights: { consanguine_brother: 2, consanguine_sister: 1 } },
      { ids: ['full_nephew'], weights: { full_nephew: 1 } },
      { ids: ['consanguine_nephew'], weights: { consanguine_nephew: 1 } },
      { ids: ['full_nephew_son'], weights: { full_nephew_son: 1 } },
      { ids: ['consanguine_nephew_son'], weights: { consanguine_nephew_son: 1 } },
      { ids: ['full_uncle'], weights: { full_uncle: 1 } },
      { ids: ['consanguine_uncle'], weights: { consanguine_uncle: 1 } },
      { ids: ['full_cousin'], weights: { full_cousin: 1 } },
      { ids: ['consanguine_cousin'], weights: { consanguine_cousin: 1 } }
    ];

    for (const group of asabaGroups) {
      const active = group.ids.filter(id => c(id) > 0 && !excluded.has(id));
      if (active.length > 0) {
        const totalWeight = active.reduce((sum, id) => sum + (c(id) * (group.weights[id as keyof typeof group.weights] || 1)), 0);
        active.forEach(id => {
          const w = group.weights[id as keyof typeof group.weights] || 1;
          const share = (remainder * w * c(id)) / totalWeight;
          shares[id] = (shares[id] || 0) + share;
        });
        remainder = 0;
        steps.push(t.asaba);
        break;
      }
    }

    // 5. Radd (Return) - If still remainder and no asaba
    if (remainder > 0 && remainder < 1) {
      const spouseShare = (shares['husband'] || 0) + (shares['wife'] || 0);
      const denominatorForRadd = totalFixed - spouseShare;
      if (denominatorForRadd > 0) {
        steps.push(t.radd);
        const factor = (1 - spouseShare) / denominatorForRadd;
        for (const id in shares) {
          if (id !== 'husband' && id !== 'wife') {
            shares[id] *= factor;
          }
        }
      } else if (spouseShare > 0) {
        // Only spouse exists, they take everything (Bayt al-mal logic vs return to spouse)
        // Modern practice often returns to spouse if no other heirs
        const onlyId = c('husband') > 0 ? 'husband' : 'wife';
        shares[onlyId] = 1;
      }
    }
  } else if (totalFixed > 1) {
    // 6. Aul (Increase)
    steps.push(t.aul);
    for (const id in shares) {
      shares[id] = shares[id] / totalFixed;
    }
  }

  // Final mapping
  HEIRS.forEach(h => {
    const count = c(h.id);
    if (count > 0) {
      if (excluded.has(h.id)) {
        for(let i=0; i<count; i++) {
          rows.push({
            heirId: h.id,
            name: `${lang === 'bn' ? h.nameBn : h.nameEn} ${count > 1 ? (i + 1) : ''}`,
            fraction: '0', decimal: 0, land: 0, money: 0, gold: 0, silver: 0,
            note: t.excluded(lang === 'bn' ? h.nameBn : h.nameEn)
          });
        }
      } else if (shares[h.id]) {
        const perPerson = shares[h.id] / count;
        for(let i=0; i<count; i++) {
          rows.push({
            heirId: h.id,
            name: `${lang === 'bn' ? h.nameBn : h.nameEn} ${count > 1 ? (i + 1) : ''}`,
            fraction: perPerson.toFixed(4),
            decimal: perPerson,
            land: perPerson * assets.land,
            money: perPerson * assets.money,
            gold: perPerson * assets.gold,
            silver: perPerson * assets.silver,
            note: steps.join(' ')
          });
        }
      }
    }
  });

  return {
    rows,
    totalFraction: rows.reduce((sum, r) => sum + r.decimal, 0),
    steps
  };
}

