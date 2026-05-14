/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, ArrowRightLeft, Check, Scale } from 'lucide-react';

interface UnitConverterProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'land' | 'precious';
  onConvert: (value: number) => void;
  lang: 'bn' | 'en' | 'ar';
  targetUnit?: string;
}

interface Unit {
  id: string;
  labelEn: string;
  labelBn: string;
  labelAr: string;
  ratio: number; // ratio to base unit (Decimal for land, Gram for precious)
  aliases?: string[];
}

const CONVERSIONS: Record<'land' | 'precious', Unit[]> = {
  land: [
    { id: 'decimal', labelEn: 'Decimal', labelBn: 'শতক', labelAr: 'عشري', ratio: 1, aliases: ['Dec', 'Satak', 'শতক', 'ডেসিমেল'] },
    { id: 'katha', labelEn: 'Katha', labelBn: 'কাঠা', labelAr: 'كاثا', ratio: 1.65, aliases: ['কাঠা', 'Katha'] },
    { id: 'bigha', labelEn: 'Bigha', labelBn: 'বিঘা', labelAr: 'بيغا', ratio: 33, aliases: ['বিঘা', 'Bigha'] },
    { id: 'acre', labelEn: 'Acre', labelBn: 'একর', labelAr: 'فدان', ratio: 100, aliases: ['একর', 'Acre'] },
    { id: 'ha', labelEn: 'Hectare', labelBn: 'হেক্টর', labelAr: 'هكتار', ratio: 247.105, aliases: ['ha', 'হেক্টর', 'Hectare'] },
    { id: 'kanal', labelEn: 'Kanal', labelBn: 'কানাল', labelAr: 'كانال', ratio: 12.5, aliases: ['Kanal', 'কানাল'] },
    { id: 'sqft', labelEn: 'Square Feet', labelBn: 'বর্গফুট', labelAr: 'قدم مربع', ratio: 1 / 435.6, aliases: ['sqft', 'sq ft', 'বর্গফুট'] },
    { id: 'sqm', labelEn: 'Square Meter', labelBn: 'বর্গমিটার', labelAr: 'متر مربع', ratio: 1 / 40.47, aliases: ['m²', 'م²', 'sqm', 'বর্গমিটার'] },
  ],
  precious: [
    { id: 'gram', labelEn: 'Gram', labelBn: 'গ্রাম', labelAr: 'جرام', ratio: 1, aliases: ['Gram', 'جرام', 'গ্রাম'] },
    { id: 'vori', labelEn: 'Vori / Tola', labelBn: 'ভরি', labelAr: 'فوري', ratio: 11.664, aliases: ['Vori', 'ভরি', 'Tola', 'তোলা'] },
    { id: 'masher', labelEn: 'Masha', labelBn: 'মাশা', labelAr: 'ماشا', ratio: 0.972, aliases: ['Masha', 'মাশা'] },
    { id: 'ounce', labelEn: 'Ounce (Troy)', labelBn: 'আউন্স', labelAr: 'أوقية', ratio: 31.1035, aliases: ['Ounce', 'Oz', 'আউন্স'] },
  ]
};

const UnitConverter: React.FC<UnitConverterProps> = ({ isOpen, onClose, type, onConvert, lang, targetUnit }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUnitId, setSelectedUnitId] = useState<string>(CONVERSIONS[type][0].id);

  const units = CONVERSIONS[type];

  // Try to find the matching unit in the app
  const appUnit = useMemo(() => {
    if (!targetUnit) return units[0];
    const target = targetUnit.toLowerCase().trim();
    return units.find(u => 
      u.id.toLowerCase() === target || 
      u.labelEn.toLowerCase() === target || 
      u.labelBn.toLowerCase() === target || 
      u.aliases?.some(a => a.toLowerCase() === target)
    ) || units[0];
  }, [units, targetUnit]);

  const selectedUnit = useMemo(() => units.find(u => u.id === selectedUnitId) || units[0], [units, selectedUnitId]);

  const baseValue = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return 0;
    return val * selectedUnit.ratio;
  }, [inputValue, selectedUnit.ratio]);

  const applyValue = useMemo(() => baseValue / appUnit.ratio, [baseValue, appUnit.ratio]);

  const t = {
    title: lang === 'bn' ? 'ইউনিট কনভার্টার' : lang === 'ar' ? 'محول الوحدات' : 'Unit Converter',
    inputLabel: lang === 'bn' ? 'পরিমাণ লিখুন' : lang === 'ar' ? 'أدخل الكمية' : 'Enter Amount',
    selectLabel: lang === 'bn' ? 'আপনার ইনপুট ইউনিট' : lang === 'ar' ? 'وحدة الإدخال' : 'Your Input Unit',
    conversionsLabel: lang === 'bn' ? 'অন্যান্য ইউনিটে রূপান্তর' : lang === 'ar' ? 'التحويلات الأخرى' : 'Other Conversions',
    apply: lang === 'bn' ? 'হিসাবে যুক্ত করুন' : lang === 'ar' ? 'تطبيق' : 'Apply to Calculation',
    placeholder: '0.00',
    targetPrefix: lang === 'bn' ? 'প্রয়োগ করা হবে:' : lang === 'ar' ? 'سيتم التطبيق:' : 'Will Apply:',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] border border-slate-100 dark:border-slate-800 transition-colors"
      >
        <div className="bg-emerald-600 dark:bg-emerald-800 p-6 text-white shrink-0 relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Scale size={80} />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
                <RefreshCw size={24} className="animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight">{t.title}</h3>
                <p className="text-[10px] font-bold text-emerald-100 dark:text-emerald-300 uppercase tracking-widest opacity-80">
                  {type === 'land' 
                    ? (lang === 'bn' ? 'জমি পরিমাপ' : lang === 'ar' ? 'أدوات الأرض' : 'LAND SCALING') 
                    : (lang === 'bn' ? 'স্বর্ণ ও রৌপ্য' : lang === 'ar' ? 'المعادন الثমينة' : 'PRECIOUS METALS')}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white/20 rounded-2xl transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.inputLabel}</label>
            <div className="relative">
               <input 
                 type="number"
                 autoFocus
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder={t.placeholder}
                 className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl text-2xl font-black text-emerald-800 dark:text-emerald-400 outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all shadow-inner"
               />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                 <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase">
                   {lang === 'bn' ? selectedUnit.labelBn : lang === 'ar' ? selectedUnit.labelAr : selectedUnit.labelEn}
                 </div>
               </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.selectLabel}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {units.map(unit => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`px-4 py-3 rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-tight transition-all border-2 flex items-center justify-center text-center ${
                    selectedUnitId === unit.id 
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shadow-sm' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700 transition-colors'
                  }`}
                >
                  {lang === 'bn' ? unit.labelBn : lang === 'ar' ? unit.labelAr : unit.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.conversionsLabel}</label>
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] p-4 border-2 border-slate-100 dark:border-slate-700 border-dashed space-y-4 transition-colors">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {units.map(unit => {
                  const val = baseValue / unit.ratio;
                  const isAppMatch = unit.id === appUnit.id;
                  return (
                    <div key={unit.id} className={`p-3 rounded-2xl transition-all ${isAppMatch ? 'bg-emerald-100/50 dark:bg-emerald-900/30 ring-2 ring-emerald-500/20' : ''}`}>
                      <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                        {lang === 'bn' ? unit.labelBn : lang === 'ar' ? unit.labelAr : unit.labelEn}
                      </span>
                      <span className={`text-sm font-black truncate block ${unit.id === selectedUnitId ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-200'}`}>
                        {val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.targetPrefix}</span>
                <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                  {applyValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  <span className="text-xs ml-1 opacity-50 uppercase">{targetUnit || appUnit.labelEn}</span>
                </span>
              </div>
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center transition-colors">
                <Check size={20} />
              </div>
            </div>

            <button 
              onClick={() => {
                onConvert(applyValue);
                onClose();
              }}
              disabled={applyValue <= 0}
              className="w-full py-5 rounded-2xl bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:pointer-events-none flex items-center justify-center gap-3"
            >
              <RefreshCw size={18} />
              {t.apply}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnitConverter;
