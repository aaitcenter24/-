/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, ArrowRightLeft, Check, Scale } from 'lucide-react';
import { getCountryConfig } from '../lib/countryConfig';

interface UnitConverterProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'land' | 'precious';
  onConvert?: (value: number) => void;
  lang: 'bn' | 'en' | 'ar' | 'ur' | 'ms';
  country: string;
  targetUnit?: string;
  initialValue?: string;
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
    { id: 'decimal', labelEn: 'Decimal', labelBn: 'শতক', labelAr: 'عشري', ratio: 1, aliases: ['Dec', 'Satak', 'শতক', 'ডেসিমেল', 'শতাংশ', 'Shatangsho'] },
    { id: 'katha', labelEn: 'Katha', labelBn: 'কাঠা', labelAr: 'كاথা', ratio: 1.65, aliases: ['কাঠা', 'Katha'] },
    { id: 'bigha', labelEn: 'Bigha', labelBn: 'বিঘা', labelAr: 'বিঘা', ratio: 33, aliases: ['বিঘা', 'Bigha'] },
    { id: 'acre', labelEn: 'Acre', labelBn: 'একর', labelAr: 'একর', ratio: 100, aliases: ['একর', 'Acre'] },
    { id: 'ha', labelEn: 'Hectare', labelBn: 'হেক্টর', labelAr: 'هكتار', ratio: 247.105, aliases: ['ha', 'হেক্টর', 'Hectare'] },
    { id: 'dunam', labelEn: 'Dunam / Decare', labelBn: 'দুনাম', labelAr: 'دونم', ratio: 24.71, aliases: ['Dunam', 'Decare', 'Dönüm'] },
    { id: 'feddan', labelEn: 'Feddan', labelBn: 'ফেদান', labelAr: 'فدان', ratio: 103.8, aliases: ['Feddan', 'فدان'] },
    { id: 'qirat', labelEn: 'Qirat', labelBn: 'কিরাত', labelAr: 'قيراط', ratio: 4.325, aliases: ['Qirat', 'قيراط'] },
    { id: 'sahm', labelEn: 'Sahm', labelBn: 'সাহম', labelAr: 'سهم', ratio: 0.18, aliases: ['Sahm', 'سهم'] },
    { id: 'kanal', labelEn: 'Kanal', labelBn: 'কানাল', labelAr: 'কানাল', ratio: 12.5, aliases: ['Kanal', 'কানাল'] },
    { id: 'marla', labelEn: 'Marla', labelBn: 'মারলা', labelAr: 'মারলা', ratio: 12.5 / 20, aliases: ['Marla', 'মারলা'] },
    { id: 'sqft', labelEn: 'Square Feet', labelBn: 'বর্গফুট', labelAr: 'قدم مربع', ratio: 1 / 435.6, aliases: ['sqft', 'sq ft', 'বর্গফুট'] },
    { id: 'sqm', labelEn: 'Square Meter', labelBn: 'বর্গমিটার', labelAr: 'متر مربع', ratio: 1 / 40.47, aliases: ['m²', 'م²', 'sqm', 'বর্গমিটার'] },
  ],
  precious: [
    { id: 'gram', labelEn: 'Gram', labelBn: 'গ্রাম', labelAr: 'جرام', ratio: 1, aliases: ['Gram', 'جرام', 'গ্রাম'] },
    { id: 'vori', labelEn: 'Vori / Tola', labelBn: 'ভরি', labelAr: 'ভরি', ratio: 11.664, aliases: ['Vori', 'ভরি', 'Tola', 'তোলা'] },
    { id: 'ana', labelEn: 'Ana', labelBn: 'আনা', labelAr: 'আনা', ratio: 0.729, aliases: ['Ana', 'আনা'] },
    { id: 'ratti', labelEn: 'Ratti', labelBn: 'রতি', labelAr: 'রতি', ratio: 0.1215, aliases: ['Ratti', 'রতি'] },
    { id: 'masha', labelEn: 'Masha', labelBn: 'মাশা', labelAr: 'মাশা', ratio: 0.972, aliases: ['Masha', 'মাশা'] },
    { id: 'mithqal', labelEn: 'Mithqal', labelBn: 'মিদকাল', labelAr: 'مثقال', ratio: 4.25, aliases: ['Mithqal', 'مثقال'] },
    { id: 'ounce', labelEn: 'Ounce (Troy)', labelBn: 'আউন্স', labelAr: 'أوقية', ratio: 31.1035, aliases: ['Ounce', 'Oz', 'আউন্স'] },
  ]
};

const UnitConverter: React.FC<UnitConverterProps> = ({ isOpen, onClose, type, onConvert, lang, country, targetUnit, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'convert' | 'info'>('convert');

  // Filter units based on country configuration
  const units = useMemo(() => {
    const config = getCountryConfig(country);
    const sourceUnits = type === 'land' ? config.landUnits : (type === 'precious' ? config.goldUnits : config.silverUnits);
    
    return sourceUnits.map(u => {
      // Find matching entry in CONVERSIONS to get localized labels
      const match = CONVERSIONS[type === 'land' ? 'land' : 'precious'].find(c => 
        c.labelEn?.toLowerCase() === u.label.toLowerCase() || 
        c.aliases?.some(a => a.toLowerCase() === u.label.toLowerCase())
      );
      
      return {
        id: u.label.toLowerCase().replace(/\s+/g, '_'),
        labelEn: u.label,
        labelBn: match?.labelBn || u.label,
        labelAr: match?.labelAr || u.label,
        ratio: u.ratio,
        aliases: match?.aliases || []
      };
    });
  }, [type, country]);

  // Reset selected unit when units change
  useEffect(() => {
    if (units.length > 0) {
      setSelectedUnitId(units[0].id);
    }
  }, [units]);

  // Reset input when type changes or initially
  useEffect(() => {
    if (isOpen) {
      setInputValue(initialValue || '');
      if (units.length > 0) {
        setSelectedUnitId(units[0].id);
      }
    }
  }, [isOpen, type, initialValue, units]);

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
    title: lang === 'bn' ? 'ইউনিট কনভার্টার' : (lang === 'ar' ? 'محول الوحدات' : (lang === 'ur' ? 'یونٹ کنورٹر' : 'Unit Converter')),
    inputLabel: lang === 'bn' ? 'পরিমাণ লিখুন' : (lang === 'ar' ? 'أدخل الكمية' : (lang === 'ur' ? 'مقدار درج کریں' : 'Enter Amount')),
    selectLabel: lang === 'bn' ? 'আপনার ইনপুট ইউনিট' : (lang === 'ar' ? 'وحدة الإدخال' : (lang === 'ur' ? 'آپ کا یونٹ' : 'Your Input Unit')),
    conversionsLabel: lang === 'bn' ? 'অন্যান্য ইউনিটে রূপান্তর' : (lang === 'ar' ? 'التحويلات الأخرى' : (lang === 'ur' ? 'دیگر تبادلے' : 'Other Conversions')),
    apply: lang === 'bn' ? 'হিসাবে যুক্ত করুন' : (lang === 'ar' ? 'تطبيق' : (lang === 'ur' ? 'حساب میں شامل کریں' : 'Apply to Calculation')),
    placeholder: '0.00',
    targetPrefix: lang === 'bn' ? 'প্রয়োগ করা হবে:' : (lang === 'ar' ? 'سيتم التطبيق:' : (lang === 'ur' ? 'لاگو ہوگا:' : 'Will Apply:')),
    info: lang === 'bn' ? 'তথ্য' : (lang === 'ar' ? 'معلومات' : (lang === 'ur' ? 'معلومات' : 'Converter Info')),
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] border border-slate-100 dark:border-slate-800 transition-colors"
      >
        {/* Header */}
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
                    : (lang === 'bn' ? 'স্বর্ণ ও রৌপ্য' : lang === 'ar' ? 'المعادن الثمينة' : 'PRECIOUS METALS')}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 hover:bg-white/20 rounded-2xl transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Subtabs */}
          <div className="flex gap-4 mt-6 ml-1">
            <button 
              onClick={() => setActiveTab('convert')}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all ${activeTab === 'convert' ? 'border-b-2 border-white' : 'opacity-50 hover:opacity-100'}`}
            >
              {lang === 'bn' ? 'রূপান্তর' : lang === 'ar' ? 'تحويل' : 'Converter'}
            </button>
            <button 
              onClick={() => setActiveTab('info')}
              className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all ${activeTab === 'info' ? 'border-b-2 border-white' : 'opacity-50 hover:opacity-100'}`}
            >
              {t.info}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'convert' ? (
              <motion.div 
                key="convert"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                {/* Input Area */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.inputLabel}</label>
                  <div className="relative group">
                    <input 
                      type="number"
                      autoFocus
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={t.placeholder}
                      className="w-full px-6 py-6 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 rounded-[2rem] text-3xl font-black text-emerald-800 dark:text-emerald-400 outline-none transition-all shadow-inner"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <div className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase shadow-lg">
                        {lang === 'bn' ? selectedUnit.labelBn : lang === 'ar' ? selectedUnit.labelAr : selectedUnit.labelEn}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unit Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.selectLabel}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {units.map(unit => (
                      <button
                        key={unit.id}
                        onClick={() => setSelectedUnitId(unit.id)}
                        className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all border-2 flex items-center justify-center text-center ${
                          selectedUnitId === unit.id 
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shadow-sm scale-[0.98]' 
                            : 'border-slate-50 dark:border-slate-800/40 bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                        }`}
                      >
                        {lang === 'bn' ? unit.labelBn : lang === 'ar' ? unit.labelAr : unit.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Grid */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.conversionsLabel}</label>
                  <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[2.5rem] p-6 border-2 border-slate-100 dark:border-slate-700 border-dashed transition-colors">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {units.map(unit => {
                        const val = baseValue / unit.ratio;
                        const isAppMatch = unit.id === appUnit.id;
                        return (
                          <div 
                            key={unit.id} 
                            className={`p-4 rounded-2xl transition-all ${isAppMatch ? 'bg-emerald-100/50 dark:bg-emerald-900/50 ring-2 ring-emerald-500/20' : 'bg-white dark:bg-slate-900/50 shadow-sm'}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                {lang === 'bn' ? unit.labelBn : lang === 'ar' ? unit.labelAr : unit.labelEn}
                              </span>
                              {isAppMatch && <Check size={10} className="text-emerald-500" />}
                            </div>
                            <span className={`text-base font-black truncate block ${unit.id === selectedUnitId ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                              {val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (val < 0.01 ? 6 : 4) })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="info"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800/40">
                  <h4 className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-4">Conversion Metrics</h4>
                  <div className="space-y-4">
                    {type === 'land' ? (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Acre</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">100 Decimals</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Bigha</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">33 Decimals</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Dunam / Decare</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">24.71 Decimals</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Feddan</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">103.8 Decimals</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Qirat</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">4.325 Decimals</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Vori / Tola</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">11.664 Grams</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Mithqal</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">4.25 Grams</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Masha</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">0.972 Grams</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">1 Ounce (Troy)</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">31.103 Grams</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
                  * All calculations are based on standard South Asian and International metrics. Land measurements like Bigha and Katha can vary by region; we use the official standardized ratios for each country where applicable.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer / Apply */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 py-4 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.targetPrefix}</span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {applyValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                  <span className="text-xs ml-2 opacity-50 uppercase font-bold">{targetUnit || appUnit.labelEn}</span>
                </span>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center transition-colors shadow-inner">
                <ArrowRightLeft size={20} />
              </div>
            </div>

            {onConvert && (
              <button 
                onClick={() => {
                  onConvert(applyValue);
                  onClose();
                }}
                disabled={applyValue <= 0}
                className="w-full py-5 rounded-[1.5rem] bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:pointer-events-none flex items-center justify-center gap-3"
              >
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Check size={14} />
                </div>
                {t.apply}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnitConverter;
