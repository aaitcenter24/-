/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, Lock, Eye, UserCheck, Calendar, Clock, Share2, Baby, Fingerprint, Mail, Share } from 'lucide-react';
import { TRANSLATIONS } from '../lib/translations';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en' | 'ar';
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose, lang }) => {
  const t = (TRANSLATIONS[lang] as any).privacyPolicy;

  if (!isOpen) return null;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: t.title,
          text: t.shareBody,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`${t.shareBody} ${window.location.href}`);
        alert(lang === 'bn' ? 'লিঙ্ক কপি করা হয়েছে!' : lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const sections = [
    { key: 'dataCollection', icon: Eye },
    { key: 'firebase', icon: ShieldCheck },
    { key: 'usage', icon: UserCheck },
    { key: 'dataRetention', icon: Clock },
    { key: 'thirdParty', icon: Share2 },
    { key: 'childPrivacy', icon: Baby },
    { key: 'userRights', icon: Fingerprint },
    { key: 'contact', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]"
      >
        {/* Header */}
        <div className="bg-emerald-600 p-8 text-white shrink-0 relative overflow-hidden">
          <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} p-12 opacity-10`}>
            <ShieldCheck size={120} />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md">
                <Lock size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">{t.title}</h3>
                <div className="flex items-center gap-2 mt-1 opacity-80 text-left">
                  <Calendar size={12} className={lang === 'ar' ? 'ml-2' : ''} />
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-none">
                    {t.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleShare}
                className="p-3 hover:bg-white/20 rounded-2xl transition-colors"
                title={t.share}
              >
                <Share size={24} />
              </button>
              <button 
                onClick={onClose} 
                className="p-3 hover:bg-white/20 rounded-2xl transition-colors"
              >
                <X size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <p className={`text-sm font-semibold text-slate-600 leading-relaxed italic ${lang === 'ar' ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-emerald-500 bg-emerald-50/50 py-4 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-1 duration-500`}>
            {t.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map(({ key, icon: Icon }, index) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-3 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  {t[key].title}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
                  {t[key].desc}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-[2rem] border-2 border-amber-100 border-dashed">
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest text-center leading-relaxed">
              {t.commitment}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleShare}
            className="flex-1 py-4 rounded-2xl bg-white border-2 border-emerald-100 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <Share2 size={16} />
            {t.share}
          </button>
          <button 
            onClick={onClose}
            className="flex-[2] py-4 rounded-2xl bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
          >
            {t.close}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
