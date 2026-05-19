/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Madhhab = 'Hanafi' | 'Maliki' | "Shafi'i" | 'Hanbali';

export type CountryCode = string;

export interface LegalFramework {
  title: string;
  statutorySource: string; // The primary act/ordinance code/law
  description: string; // Exhaustive legal overview of how inheritance works in this country
  keyPoints: string[]; // Highly detailed bullet points regarding legal execution
  specificRules: string; // Detailed exceptions, e.g., orphaned grandchildren rights
}

export interface CountryConfig {
  countryCode: string; // ISO 2-letter uppercase code
  name: { bn: string; en: string; ar: string; ur?: string; tr?: string; id?: string; ms?: string };
  currency: { 
    code: string; 
    name: string; 
    symbol: string; 
    format: 'lakh' | 'million';
  };
  landUnits: { label: string; ratio: number }[];
  goldUnits: { label: string; ratio: number }[];
  silverUnits: { label: string; ratio: number }[];
  languages: {
    primary: string;
    secondary: string;
  };
  defaultMadhhab: Madhhab;
  paymentMethods: string[];
  legalStatus: 'stage1' | 'stage2' | 'stage3';
  legalFramework: LegalFramework;
  hijriPrimary: boolean;
  subscriptionPrice?: {
    pro: string;
  };
}

export interface HeirDefinition {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  nameUr?: string;
  nameMs?: string;
  category: 'sharer' | 'residuary' | 'both';
  gender: 'male' | 'female';
  group: 'immediate' | 'ancestors' | 'siblings' | 'extended';
  icon?: string;
}

export interface Assets {
  land: number;
  money: number;
  gold: number;
  silver: number;
}

export interface ResultRow {
  heirId: string;
  name: string;
  individualName?: string;
  fraction: string;
  decimal: number;
  land: number;
  money: number;
  gold: number;
  silver: number;
  note: string;
}

export interface CalculationStep {
  text: string;
  heirIds: string[];
}

export interface CalculationResult {
  rows: ResultRow[];
  totalFraction: number;
  steps: CalculationStep[];
  deceasedName?: string;
}

export const HEIRS: HeirDefinition[] = [
  { id: 'husband', nameBn: 'স্বামী', nameEn: 'Husband', nameAr: 'زوج', nameUr: 'شوہر', nameMs: 'Suami', category: 'sharer', gender: 'male', group: 'immediate' },
  { id: 'wife', nameBn: 'স্ত্রী', nameEn: 'Wife', nameAr: 'زوجة', nameUr: 'بیوی', nameMs: 'Isteri', category: 'sharer', gender: 'female', group: 'immediate' },
  { id: 'son', nameBn: 'পুত্র', nameEn: 'Son', nameAr: 'ابن', nameUr: 'بیٹا', nameMs: 'Anak Lelaki', category: 'residuary', gender: 'male', group: 'immediate' },
  { id: 'daughter', nameBn: 'কন্যা', nameEn: 'Daughter', nameAr: 'بنت', nameUr: 'بیٹی', nameMs: 'Anak Perempuan', category: 'both', gender: 'female', group: 'immediate' },
  { id: 'dead_son', nameBn: 'মৃত পুত্র', nameEn: 'Deceased Son', nameAr: 'ابن متوفى', category: 'residuary', gender: 'male', group: 'immediate' },
  { id: 'dead_daughter', nameBn: 'মৃত কন্যা', nameEn: 'Deceased Daughter', nameAr: 'بنت متوفاة', category: 'both', gender: 'female', group: 'immediate' },
  { id: 'father', nameBn: 'পিতা', nameEn: 'Father', nameAr: 'أب', nameUr: 'والد', nameMs: 'Bapa', category: 'both', gender: 'male', group: 'ancestors' },
  { id: 'mother', nameBn: 'মাতা', nameEn: 'Mother', nameAr: 'أم', nameUr: 'والدہ', nameMs: 'Ibu', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'grandfather', nameBn: 'দাদা (পিতার পিতা)', nameEn: "Grandfather (Father's Father)", nameAr: 'الجد (أبو الأب)', category: 'both', gender: 'male', group: 'ancestors' },
  { id: 'grandmother_paternal', nameBn: 'দাদি (পিতার মাতা)', nameEn: "Paternal Grandmother (Father's Mother)", nameAr: 'الجدة لأب (أم الأب)', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'grandmother_maternal', nameBn: 'নানি (মাতার মাতা)', nameEn: "Maternal Grandmother (Mother's Mother)", nameAr: 'الجدة لأم (أم الأم)', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'full_brother', nameBn: 'সহোদর ভাই', nameEn: 'Full Brother', nameAr: 'أخ شقيق', category: 'residuary', gender: 'male', group: 'siblings' },
  { id: 'full_sister', nameBn: 'সহোদর বোন', nameEn: 'Full Sister', nameAr: 'أخت شقيقة', category: 'both', gender: 'female', group: 'siblings' },
  { id: 'consanguine_brother', nameBn: 'বৈমাত্রেয় ভাই', nameEn: 'Consanguine Brother', nameAr: 'أخ لأب', category: 'residuary', gender: 'male', group: 'siblings' },
  { id: 'consanguine_sister', nameBn: 'বৈমাত্রেয় বোন', nameEn: 'Consanguine Sister', nameAr: 'أخت لأب', category: 'both', gender: 'female', group: 'siblings' },
  { id: 'uterine_brother', nameBn: 'বৈপিত্রীয় ভাই', nameEn: 'Uterine Brother', nameAr: 'أخ لأم', category: 'sharer', gender: 'male', group: 'siblings' },
  { id: 'uterine_sister', nameBn: 'বৈপিত্রীয় বোন', nameEn: 'Uterine Sister', nameAr: 'أخت لأم', category: 'sharer', gender: 'female', group: 'siblings' },
  { id: 'full_nephew', nameBn: 'সহোদর ভাইয়ের পুত্র', nameEn: 'Full Nephew', nameAr: 'ابن أخ شقيق', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_nephew', nameBn: 'বৈমাত্রেয় ভাইয়ের পুত্র', nameEn: 'Consanguine Nephew', nameAr: 'ابن أخ لأب', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_nephew_son', nameBn: 'সহোদর ভাইয়ের পুত্রের পুত্র', nameEn: "Full Nephew's Son", nameAr: 'ابن ابن أخ شقيق', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_nephew_son', nameBn: 'বৈমাত্রেয় ভাইয়ের পুত্রের পুত্র', nameEn: "Consanguine Nephew's Son", nameAr: 'ابن ابن أخ لأب', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_uncle', nameBn: 'চাচা (সহোদর)', nameEn: 'Full Paternal Uncle', nameAr: 'عم شقيق', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_uncle', nameBn: 'চাচা (বৈমাত্রেয়)', nameEn: 'Consanguine Paternal Uncle', nameAr: 'عم لأب', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin', nameBn: 'চাচাতো ভাই (সহোদর)', nameEn: 'Full Paternal Cousin', nameAr: 'ابن عم شقيق', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_cousin', nameBn: 'চাচাতো ভাই (বৈমাত্রেয়)', nameEn: 'Consanguine Paternal Cousin', nameAr: 'ابن عم لأب', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin_son', nameBn: 'চাচাতো ভাইয়ের পুত্র', nameEn: "Full Paternal Cousin's Son", nameAr: 'ابن ابن عم شقيق', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_cousin_son', nameBn: 'চাচাতো ভাই (বৈমাত্রেয়) এর পুত্র', nameEn: "Consanguine Paternal Cousin's Son", nameAr: 'ابن ابن عم لأب', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin_son_son', nameBn: 'চাচাতো ভাইয়ের পুত্রের পুত্র', nameEn: "Full Paternal Cousin's Son's Son", nameAr: 'ابن ابن ابن عم شقيق', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_cousin_son_son', nameBn: 'চাচাতো ভাই (বৈমাত্রেয়) এর পুত্রের পুত্র', nameEn: "Consanguine Paternal Cousin's Son's Son", nameAr: 'ابن ابن ابن عم لأب', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'great_grandfather', nameBn: 'বড় দাদা (পিতার পিতার পিতা)', nameEn: "Father's Father's Father", nameAr: 'أبو الجد', category: 'both', gender: 'male', group: 'ancestors' },
  { id: 'great_grandmother', nameBn: 'বড় নানি (মাতার মাতার মাতা)', nameEn: "Mother's Mother's Mother", nameAr: 'أم الجدة', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'full_cousin_once_removed', nameBn: 'চাচাতো ভাই (এক ধাপ নিচে)', nameEn: "Full Paternal Uncle's Son (Cousin once removed)", nameAr: 'ابن عم شقيق (جيد)', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin_daughter_once_removed', nameBn: 'চাচাতো বোন (এক ধাপ নিচে)', nameEn: "Full Paternal Uncle's Daughter (Cousin once removed)", nameAr: 'بنت عم شقيق', category: 'residuary', gender: 'female', group: 'extended' },
  { id: 'maternal_uncle', nameBn: 'মামাতো ভাই নহে (মা এর ভাই)', nameEn: "Maternal Uncle (Mother's Brother)", nameAr: 'خال', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'maternal_uncle_son', nameBn: 'মামাতো ভাই', nameEn: "Maternal Uncle's Son", nameAr: 'ابن خال', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'maternal_aunt', nameBn: 'খালা', nameEn: "Maternal Aunt (Mother's Sister)", nameAr: 'خالة', category: 'residuary', gender: 'female', group: 'extended' },
  { id: 'maternal_aunt_daughter', nameBn: 'খালাতো বোন', nameEn: "Maternal Aunt's Daughter", nameAr: 'بنت خالة', category: 'residuary', gender: 'female', group: 'extended' },
  { id: 'khuntha_heir', nameBn: 'উভয়লিঙ্গ উত্তরাধিকারী (খুনসা)', nameEn: 'Hermaphrodite Heir (Al-Khuntha)', nameAr: 'الخنثى المشكل', category: 'sharer', gender: 'male', group: 'extended' },
  { id: 'mafqud_heir', nameBn: 'নিখোঁজ উত্তরাধিকারী (মাফকুদ)', nameEn: 'Missing Heir (Al-Mafqud)', nameAr: 'المفقود', category: 'sharer', gender: 'male', group: 'extended' },
];
