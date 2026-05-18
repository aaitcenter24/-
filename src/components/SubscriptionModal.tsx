/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Star, Zap, Crown, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../lib/translations';

import { getCountryConfig } from '../lib/countryConfig';

interface SubscriptionModalProps {
  lang: 'bn' | 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: 'free' | 'pro';
  onUpgrade?: (plan: 'pro') => void;
  isDarkMode?: boolean;
  countryCode: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ 
  lang, 
  isOpen, 
  onClose, 
  currentPlan = 'free',
  onUpgrade,
  countryCode
}) => {
  const t = TRANSLATIONS[lang].subscriptions;
  const isRtl = lang === 'ar';
  const country = getCountryConfig(countryCode);
  const proPrice = country.subscriptionPrice?.pro || t.pro.price;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        dir={isRtl ? 'rtl' : 'ltr'}
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90dvh] transition-colors"
      >
        {/* Visual Sidebar (Desktop Only) */}
        <div className="hidden md:flex w-1/3 bg-emerald-600 dark:bg-emerald-800 p-12 text-white flex-col justify-between relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
            <Crown size={200} />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Star className="text-amber-300" fill="currentColor" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">
                Heritage<br />Matrix
              </h2>
              <p className="mt-4 text-emerald-50 text-sm font-medium leading-relaxed">
                Join the premium community of precision inheritance management.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold">
              <ShieldCheck size={18} className="text-emerald-300" />
              Secure & Halal
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <Zap size={18} className="text-emerald-300" />
              Instant Logic
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col transition-colors">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                {t.title}
              </h3>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500">
                {t.choosePlan}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 rounded-2xl transition-all active:scale-95"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mb-8">
            {/* Free Plan */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2.5rem] border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                currentPlan === 'free' 
                ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' 
                : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <Zap size={24} />
                  </div>
                  {currentPlan === 'free' && (
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {t.free.current}
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{t.free.name}</h4>
                  <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 mt-1">{t.free.price}</p>
                </div>
                <ul className="space-y-3">
                  {t.free.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <Check size={10} className="text-slate-500 dark:text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                disabled={currentPlan === 'free'}
                className={`mt-8 w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  currentPlan === 'free'
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                {currentPlan === 'free' ? t.free.current : t.free.get}
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2.5rem] border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                currentPlan === 'pro' 
                ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10' 
                : 'border-emerald-600 bg-emerald-600 dark:bg-emerald-800 text-white shadow-xl shadow-emerald-200 dark:shadow-none'
              }`}
            >
              {/* Premium Decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute top-4 right-4 animate-pulse">
                <Sparkles className="text-amber-300" size={24} />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center relative z-10">
                  <div className={`w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center ${
                    currentPlan === 'pro' ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'bg-emerald-500 dark:bg-emerald-600 text-white'
                  }`}>
                    <Crown size={24} />
                  </div>
                  {currentPlan === 'pro' && (
                    <span className="px-3 py-1 bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {t.pro.current}
                    </span>
                  )}
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-black uppercase tracking-tight">{t.pro.name}</h4>
                  <p className={`text-2xl font-bold mt-1 ${currentPlan === 'pro' ? 'text-emerald-700 dark:text-emerald-400' : 'text-emerald-50'}`}>
                    {proPrice}
                  </p>
                </div>
                <ul className="space-y-3 relative z-10">
                  {t.pro.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        currentPlan === 'pro' ? 'bg-emerald-200 dark:bg-emerald-900/40' : 'bg-white/20'
                      }`}>
                        <Check size={10} className={currentPlan === 'pro' ? 'text-emerald-600 dark:text-emerald-400' : 'text-white'} />
                      </div>
                      <span className={`text-xs font-bold leading-tight ${currentPlan === 'pro' ? 'text-slate-600 dark:text-slate-400' : 'text-emerald-50'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => onUpgrade?.('pro')}
                disabled={currentPlan === 'pro'}
                className={`relative z-10 mt-8 w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  currentPlan === 'pro'
                  ? 'bg-emerald-700/50 dark:bg-emerald-900/20 text-emerald-200 dark:text-emerald-500 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-slate-700'
                }`}
              >
                {currentPlan === 'pro' ? t.pro.current : t.pro.get}
                {currentPlan !== 'pro' && <ArrowRight size={14} />}
              </button>
            </motion.div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">
              {lang === 'bn' ? 'সমর্থিত পেমেন্ট মেথড' : lang === 'ar' ? 'وسائل الدفع المدعومة' : 'Supported Payment Methods'}
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {country.paymentMethods.map(method => (
                <span key={method} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase rounded-lg border border-slate-200 dark:border-slate-700">
                  {method}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={onClose}
              className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t.backToApp}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionModal;
