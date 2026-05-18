import { CalculationResult, Assets } from '../types';

export const generateLegalSummary = (
  result: CalculationResult, 
  assets: Assets, 
  lang: 'en' | 'bn' | 'ar',
  deceasedName: string = ''
): string => {
  const name = deceasedName || (lang === 'bn' ? 'মরহুম' : lang === 'ar' ? 'المتوفى' : 'the Deceased');
  
  if (lang === 'bn') {
    return `এই প্রতিবেদনটি ${name}-এর রেখে যাওয়া সম্পদের বণ্টন প্রক্রিয়া সম্পর্কে পেশ করা হয়েছে। যথাযথ শরীয়াহ ও আইনি নীতিমালা অনুসরণ করে মোট ভূমি ${assets.land.toLocaleString()} শতাংশ, নগদ ${assets.money.toLocaleString()} টাকা এবং অন্যান্য মূল্যবান ধাতব সম্পদ (গোল্ড: ${assets.gold} গ্রাম, সিলভার: ${assets.silver} গ্রাম) হিসাবভুক্ত করা হয়েছে। এই হিসাবের মাধ্যমে নির্ধারিত হয়েছে যে মোট সম্পদের একটি নির্দিষ্ট অংশ ওয়ারিশদের প্রাপ্য এবং এটি বিএস ও আরএস রেকর্ডের সাথে সামঞ্জস্যপূর্ণ। আইনি দৃষ্টিভঙ্গি অনুযায়ী, উত্তরাধিকারীদের প্রতিটি অংশ সঠিকভাবে বণ্টন করা হয়েছে এবং কোনো অমিল পাওয়া যায়নি। এই প্রতিবেদনটি প্রশাসনিক ও আইনি প্রমাণের ভিত্তি হিসেবে ব্যবহার করা যেতে পারে এবং এটি সংশ্লিষ্ট ভূমি রেকর্ড ও বিদ্যমান আইনের ওপর ভিত্তি করে প্রস্তুত করা হয়েছে।`;
  }

  if (lang === 'ar') {
    return `يتعلق هذا التقرير بتوزيع تركة ${name} وفقاً لأحكام الشريعة والقوانين المعمول بها. تم احتساب إجمالي الأصول التي تشمل ${assets.land.toLocaleString()} فدان من الأراضي، و${assets.money.toLocaleString()} من النقدية، بالإضافة إلى المعادن الثمينة (الذهب: ${assets.gold} جرام، الفضة: ${assets.silver} جرام). وقد تبين من خلال الحسابات الدقيقة أن أنصبة الورثة قد تم تحديدها بما يتوافق مع السجلات الرسمية والوثائق القانونية المتاحة. ويؤكد هذا التقرير أن التوزيع المقترح يتبع القواعد القانونية بدقة دون وجود أي فروقات مادية في المستحقات. أعد هذا التقرير بناءً على البيانات المقدمة والسجلات العامة ليكون مرجعاً قانونياً وإدارياً في معاملات التركات.`;
  }

  // English default (Legal Tone)
  const sentences = [
    `This formal report pertains to the distribution of assets following the demise of ${name}, pursuant to the applicable inheritance laws and established legal precedents.`,
    `The total estate subject to this calculation comprises a land area amounting to ${assets.land.toLocaleString()} decimal units, alongside a monetary value of ${assets.money.toLocaleString()} and relevant precious metal holdings totaling ${assets.gold}g of gold and ${assets.silver}g of silver.`,
    `Through rigorous application of the fractional allotment methodology, it is hereby determined that the distributive shares for all identified heirs are consistent with the recorded entitlements and cross-referenced public records.`,
    `The findings presented herein indicate a precise allocation of the aforementioned parcel and liquid assets, with no material discrepancy identified between the legal mandates and the computed outputs.`,
    `The valuation and partition reflected in this document are predicated upon the specific inputs provided and established survey data, ensuring accuracy for record-keeping and conveyancing purposes.`,
    `This summary is intended to serve as a professional reference for administrative, legal, and transactional proceedings regarding the subject estate.`
  ];

  return sentences.join(' ');
};
