/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeirDefinition {
  id: string;
  nameBn: string;
  nameEn: string;
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
  fraction: string;
  decimal: number;
  land: number;
  money: number;
  gold: number;
  silver: number;
  note: string;
}

export interface CalculationResult {
  rows: ResultRow[];
  totalFraction: number;
  steps: string[];
}

export const HEIRS: HeirDefinition[] = [
  { id: 'husband', nameBn: 'স্বামী', nameEn: 'Husband', category: 'sharer', gender: 'male', group: 'immediate' },
  { id: 'wife', nameBn: 'স্ত্রী', nameEn: 'Wife', category: 'sharer', gender: 'female', group: 'immediate' },
  { id: 'son', nameBn: 'পুত্র', nameEn: 'Son', category: 'residuary', gender: 'male', group: 'immediate' },
  { id: 'daughter', nameBn: 'কন্যা', nameEn: 'Daughter', category: 'both', gender: 'female', group: 'immediate' },
  { id: 'dead_son', nameBn: 'মৃত পুত্র', nameEn: 'Deceased Son', category: 'residuary', gender: 'male', group: 'immediate' },
  { id: 'dead_daughter', nameBn: 'মৃত কন্যা', nameEn: 'Deceased Daughter', category: 'both', gender: 'female', group: 'immediate' },
  { id: 'father', nameBn: 'পিতা', nameEn: 'Father', category: 'both', gender: 'male', group: 'ancestors' },
  { id: 'mother', nameBn: 'মাতা', nameEn: 'Mother', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'grandfather', nameBn: 'দাদা', nameEn: 'Grandfather', category: 'both', gender: 'male', group: 'ancestors' },
  { id: 'grandmother_paternal', nameBn: 'দাদি', nameEn: 'Paternal Grandmother', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'grandmother_maternal', nameBn: 'নানি', nameEn: 'Maternal Grandmother', category: 'sharer', gender: 'female', group: 'ancestors' },
  { id: 'full_brother', nameBn: 'সহোদর ভাই', nameEn: 'Full Brother', category: 'residuary', gender: 'male', group: 'siblings' },
  { id: 'full_sister', nameBn: 'সহোদর বোন', nameEn: 'Full Sister', category: 'both', gender: 'female', group: 'siblings' },
  { id: 'consanguine_brother', nameBn: 'বৈমাত্রেয় ভাই', nameEn: 'Consanguine Brother', category: 'residuary', gender: 'male', group: 'siblings' },
  { id: 'consanguine_sister', nameBn: 'বৈমাত্রেয় বোন', nameEn: 'Consanguine Sister', category: 'both', gender: 'female', group: 'siblings' },
  { id: 'uterine_brother', nameBn: 'বৈপিত্রীয় ভাই', nameEn: 'Uterine Brother', category: 'sharer', gender: 'male', group: 'siblings' },
  { id: 'uterine_sister', nameBn: 'বৈপিত্রীয় বোন', nameEn: 'Uterine Sister', category: 'sharer', gender: 'female', group: 'siblings' },
  { id: 'full_nephew', nameBn: 'সহোদর ভাইয়ের পুত্র', nameEn: 'Full Nephew', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_nephew', nameBn: 'বৈমাত্রেয় ভাইয়ের পুত্র', nameEn: 'Consanguine Nephew', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_nephew_son', nameBn: 'সহোদর ভাইয়ের পুত্রের পুত্র', nameEn: "Full Nephew's Son", category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_nephew_son', nameBn: 'বৈমাত্রেয় ভাইয়ের পুত্রের পুত্র', nameEn: "Consanguine Nephew's Son", category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_uncle', nameBn: 'চাচা (সহোদর)', nameEn: 'Full Paternal Uncle', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_uncle', nameBn: 'চাচা (বৈমাত্রেয়)', nameEn: 'Consanguine Paternal Uncle', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin', nameBn: 'চাচাতো ভাই (সহোদর)', nameEn: 'Full Paternal Cousin', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_cousin', nameBn: 'চাচাতো ভাই (বৈমাত্রেয়)', nameEn: 'Consanguine Paternal Cousin', category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin_son', nameBn: 'চাচাতো ভাইয়ের পুত্র', nameEn: "Full Paternal Cousin's Son", category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_cousin_son', nameBn: 'চাচাতো ভাই (বৈমাত্রেয়) এর পুত্র', nameEn: "Consanguine Paternal Cousin's Son", category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'full_cousin_son_son', nameBn: 'চাচাতো ভাইয়ের পুত্রের পুত্র', nameEn: "Full Paternal Cousin's Son's Son", category: 'residuary', gender: 'male', group: 'extended' },
  { id: 'consanguine_cousin_son_son', nameBn: 'চাচাতো ভাই (বৈমাত্রেয়) এর পুত্রের পুত্র', nameEn: "Consanguine Paternal Cousin's Son's Son", category: 'residuary', gender: 'male', group: 'extended' },
];
