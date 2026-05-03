/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Coins, 
  Table as TableIcon, 
  PieChart as ChartIcon, 
  Download, 
  RotateCcw, 
  Calculator,
  ChevronRight,
  Info,
  ScrollText,
  HelpCircle,
  Gem,
  AlertCircle,
  BookMarked,
  Languages,
  Share2
} from 'lucide-react';
import { HEIRS, Assets, CalculationResult } from './types';
import { calculateInheritance } from './lib/inheritance';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip
} from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { TRANSLATIONS, INHERITANCE_RULES, FAQ_DATA } from './lib/translations';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [assets, setAssets] = useState<Assets>({ land: 0, money: 0, gold: 0, silver: 0 });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'result' | 'rules' | 'faq'>('input');
  const [error, setError] = useState<string | null>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const t = TRANSLATIONS[lang];

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'bn' ? 'en' : 'bn';
      if (result) {
        setResult(calculateInheritance(counts, assets, next));
      }
      return next;
    });
  };

  const updateCount = (id: string, delta: number) => {
    setCounts(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next < 0) {
        setError(t.errorHeirCount);
        setTimeout(() => setError(null), 3000);
        return prev;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleAssetChange = (key: keyof Assets, value: string) => {
    const num = parseFloat(value) || 0;
    if (num < 0) {
      setError(t.errorAssetNegative);
      setTimeout(() => setError(null), 3000);
      return;
    }
    setAssets(prev => ({ ...prev, [key]: num }));
  };

  const handleCalculate = () => {
    const res = calculateInheritance(counts, assets, lang);
    setResult(res);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCounts({});
    setAssets({ land: 0, money: 0, gold: 0, silver: 0 });
    setResult(null);
    setActiveTab('input');
  };

  const downloadPDF = async () => {
    const element = document.getElementById('result-content');
    if (!element || isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      // Temporary style to ensure all content is captured correctly
      const originalStyle = element.style.cssText;
      element.style.width = '800px'; // Consistent width for PDF
      element.style.padding = '40px';
      
      const canvas = await html2canvas(element, { 
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        onclone: (clonedDoc) => {
          // Add basic resets
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              transition: none !important;
              animation: none !important;
            }
          `;
          clonedDoc.head.appendChild(style);

          // Force colors to RGB/Hex by overriding modern CSS functions
          const allElements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i] as HTMLElement;
            // Get computed style
            const style = window.getComputedStyle(el);
            
            // Check for oklab/oklch in common properties
            const props = ['color', 'backgroundColor', 'borderColor', 'outlineColor'];
            props.forEach(prop => {
              const val = (style as any)[prop];
              if (val && (val.includes('oklch') || val.includes('oklab'))) {
                // If it's a modern color, try to force it to a safe color
                // We'll use emerald-600 hex as a fallback for emerald, or just transparent/black/white
                if (val.includes('emerald')) el.style.setProperty(prop, '#059669', 'important');
                else if (val.includes('slate')) el.style.setProperty(prop, '#475569', 'important');
                else el.style.setProperty(prop, 'inherit', 'important');
              }
            });
            
            // Fix shadows
            if (style.boxShadow.includes('oklch') || style.boxShadow.includes('oklab')) {
              el.style.boxShadow = 'none';
            }
          }

          const clonedElement = clonedDoc.getElementById('result-content');
          if (clonedElement) {
            clonedElement.style.height = 'auto';
            clonedElement.style.padding = '40px';
          }
        }
      });
      
      // Restore original style
      element.style.cssText = originalStyle;
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgProps = pdf.getImageProperties(imgData);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 10;
      const pdfWidth = pageWidth - (margin * 2);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Header Banner
      pdf.setFillColor(16, 185, 129); // emerald-600
      pdf.rect(0, 0, pageWidth, 15, 'F');
      
      // Add content
      let heightLeft = pdfHeight;
      let position = 20; // Start after header
      
      pdf.addImage(imgData, 'PNG', margin, position, pdfWidth, pdfHeight);
      heightLeft -= (pageHeight - 20);

      // Handle multi-page if necessary
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      
      // Footer on last page
      const lastPageIdx = pdf.internal.pages.length - 1;
      pdf.setPage(lastPageIdx);
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      const dateStr = new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB');
      pdf.text(`${t.appName} - ${dateStr}`, margin, pageHeight - 10);
      
      pdf.save(`${t.reportTitle.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setError(lang === 'bn' ? 'পিডিএফ তৈরি করতে সমস্যা হয়েছে।' : 'Failed to generate PDF.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareResult = async () => {
    if (!result) return;
    
    // Construct sharing text
    const shareText = `🏛️ ${t.appName} - ${t.reportTitle}\n` + 
      `📅 ${new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB')}\n\n` +
      `${result.rows.map(r => `• ${r.name}: ${r.decimal.toFixed(4)}`).join('\n')}\n\n` +
      `${t.shareText}\n` +
      `${window.location.origin}`;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: t.appName,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share error:', err);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        setError(t.copied);
        setTimeout(() => setError(null), 3000);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    }
  };

  const chartData = useMemo(() => {
    if (!result) return [];
    return result.rows.map((r, i) => ({
      name: r.name,
      value: r.decimal,
      color: COLORS[i % COLORS.length]
    }));
  }, [result]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] bg-rose-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 h-10">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-black text-emerald-900">
            <Calculator size={16} />
            <h1 className="text-sm hidden sm:block uppercase tracking-tighter">{t.appName}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full mr-2 min-w-0">
              <button 
                onClick={() => setActiveTab('input')}
                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-black transition-all shrink-0 ${activeTab === 'input' ? 'bg-white text-emerald-600 shadow-xl scale-105' : 'text-slate-500 hover:text-emerald-700'}`}
              >
                {t.calculate}
              </button>
              <button 
                onClick={() => setActiveTab('rules')}
                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-black transition-all shrink-0 ${activeTab === 'rules' ? 'bg-white text-emerald-600 shadow-xl scale-105' : 'text-slate-500 hover:text-emerald-700'}`}
              >
                {t.rules}
              </button>
              <button 
                onClick={() => setActiveTab('faq')}
                className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-black transition-all shrink-0 ${activeTab === 'faq' ? 'bg-white text-emerald-600 shadow-xl scale-105' : 'text-slate-500 hover:text-emerald-700'}`}
              >
                {t.faq}
              </button>
            </div>
            
            <button 
              onClick={toggleLang}
              className="px-4 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-all shrink-0 gap-2 shadow-sm active:scale-95"
              title="Change Language"
            >
              <Languages size={14} />
              <span className="text-[11px] font-black uppercase tracking-wider">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'input' && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-1 h-4 bg-emerald-600 rounded-full" />
                  <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">{t.selectHeirs}</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { id: 'immediate', name: t.groups.immediate, icon: Users },
                    { id: 'ancestors', name: t.groups.ancestors, icon: BookMarked },
                    { id: 'siblings', name: t.groups.siblings, icon: Users },
                    { id: 'extended', name: t.groups.extended, icon: Gem }
                  ].map(group => (
                    <div key={group.id} className="space-y-2">
                      <div className="flex items-center gap-1.5 px-2">
                        <group.icon className="text-emerald-500/50" size={12} />
                        <h4 className="font-bold text-[9px] uppercase tracking-widest text-slate-400">{group.name}</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {HEIRS.filter(h => h.group === group.id).map(heir => (
                          <div 
                            key={heir.id}
                            className={`flex items-center justify-between p-1.5 px-3 rounded-xl border bg-white transition-all duration-200 ${
                              (counts[heir.id] || 0) > 0 
                                ? 'border-emerald-500 shadow-sm ring-1 ring-emerald-100/50' 
                                : 'border-slate-100 hover:border-slate-200'
                            }`}
                          >
                            <div className="flex flex-col min-w-0 pr-2">
                              <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                                {lang === 'bn' ? heir.nameBn : heir.nameEn}
                              </span>
                            </div>
                            
                            <div className="flex items-center bg-slate-50 p-0.5 rounded-lg gap-1.5 shrink-0">
                              <button 
                                onClick={() => updateCount(heir.id, -1)}
                                className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-200 transition-all active:scale-90 shadow-sm"
                              >
                                <span className="font-bold text-xs">-</span>
                              </button>
                              
                              <div className="w-4 text-center">
                                <span className="text-xs font-black text-emerald-600">
                                  {counts[heir.id] || 0}
                                </span>
                              </div>
                              
                              <button 
                                onClick={() => updateCount(heir.id, 1)}
                                className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white shadow-sm hover:bg-emerald-700 transition-all active:scale-90"
                              >
                                <span className="font-bold text-xs">+</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* STICKY ASSET BAR - FIXED TO BOTTOM - COMPACT BUT LEGIBLE FOOTER */}
              <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-emerald-600 shadow-[0_-5px_30px_rgba(0,0,0,0.08)]">
                <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
                  <section className="flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-emerald-50 pb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-emerald-50 rounded-md">
                          <Coins className="text-emerald-600" size={16} />
                        </div>
                        <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-tight">
                          {lang === 'bn' ? 'সম্পত্তির বিবরণী' : 'Asset Details'}
                        </h3>
                      </div>
                      <span className="hidden sm:block text-[9px] font-black text-slate-200 uppercase tracking-[0.2em]">Calculator Matrix</span>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { key: 'land', label: t.land, unit: t.unitLand },
                        { key: 'money', label: t.money, unit: t.unitMoney },
                        { key: 'gold', label: t.gold, unit: t.unitGold },
                        { key: 'silver', label: t.silver, unit: t.unitSilver }
                      ].map(asset => (
                        <div key={asset.key} className="relative group">
                          <label className="absolute -top-2 left-2 px-1.5 bg-emerald-600 text-[9px] font-black text-white uppercase tracking-widest z-10 rounded-sm shadow-sm">
                            {asset.label}
                          </label>
                          <div className="relative">
                            <input 
                              type="number"
                              min="0"
                              value={assets[asset.key as keyof Assets] || ''}
                              onChange={(e) => handleAssetChange(asset.key as keyof Assets, e.target.value)}
                              className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm sm:text-base font-black text-emerald-800 outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                              placeholder="0.00"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase">
                              {asset.unit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 items-center pt-0.5">
                       <button 
                         onClick={handleReset}
                         className="w-12 h-10 bg-slate-100 text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center border border-slate-200 rounded-lg active:scale-95 shrink-0 shadow-sm"
                         title={t.reset}
                       >
                         <RotateCcw size={18} />
                       </button>
                       <button 
                         onClick={handleCalculate}
                         disabled={Object.values(counts).every(c => c === 0)}
                         className="flex-1 h-10 bg-emerald-600 text-white font-black text-sm shadow-md hover:bg-emerald-500 transition-all disabled:opacity-20 flex items-center justify-center gap-2 uppercase tracking-[0.1em] active:scale-[0.98] rounded-lg"
                       >
                         <Calculator size={18} />
                         <span>{t.calculateButton}</span>
                       </button>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'result' && result && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <button 
                  onClick={() => setActiveTab('input')}
                  className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center gap-1 hover:bg-slate-300 transition-colors"
                >
                  <ChevronRight size={14} className="rotate-180" />
                  {t.back}
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={shareResult}
                    disabled={isSharing}
                    className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center gap-1 hover:bg-slate-300 transition-colors disabled:opacity-50"
                  >
                    <Share2 size={12} />
                    {t.share}
                  </button>
                  <button 
                    onClick={downloadPDF}
                    disabled={isDownloading}
                    className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-1 hover:bg-emerald-700 shadow-md shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download size={14} />
                    )}
                    {isDownloading ? (lang === 'bn' ? 'তৈরি হচ্ছে...' : 'Generating...') : t.download}
                  </button>
                </div>
              </div>

              <div id="result-content" className="space-y-4 bg-white p-3 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
                <header className="border-b-2 border-emerald-500 pb-4 mb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">{t.reportTitle}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {lang === 'bn' ? 'ইসলামী বিধি মোতাবেক সঠিক বণ্টন' : 'Accurate distribution by Islamic Law'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 text-center">
                      <div className="text-[8px] text-emerald-600 font-black uppercase tracking-tighter">{t.heirsCount}</div>
                      <div className="text-lg font-black text-emerald-800 leading-none">{result.rows.length}</div>
                    </div>
                  </div>
                </header>

                <div className="flex flex-col gap-6">
                  {/* Table Section */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-t-xl">
                      <TableIcon size={16} />
                      <h4 className="font-bold text-xs uppercase tracking-widest">{t.detailsTitle}</h4>
                    </div>
                    <div className="overflow-x-auto rounded-b-xl border border-slate-100 shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-500 text-[9px] uppercase tracking-wider font-black border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-3">{t.heirHeader}</th>
                            <th className="px-2 py-3 text-center">{t.shareHeader}</th>
                            <th className="px-2 py-3 text-right">{t.landHeader} ({t.unitLand})</th>
                            <th className="px-2 py-3 text-right">{t.goldHeader} ({t.unitGold})</th>
                            <th className="px-2 py-3 text-right">{t.silverHeader} ({t.unitSilver})</th>
                            <th className="px-3 py-3 text-right">{t.moneyHeader} ({t.unitMoney})</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-[10px] sm:text-xs">
                          {result.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                              <td className="px-4 py-3 font-bold text-slate-800">{row.name}</td>
                              <td className="px-2 py-3 font-mono text-emerald-600 text-center font-bold">{row.decimal.toFixed(4)}</td>
                              <td className="px-2 py-3 text-right font-mono text-slate-500 font-medium">{row.land.toFixed(2)}</td>
                              <td className="px-2 py-3 text-right font-mono text-slate-500 font-medium">{row.gold.toFixed(2)}</td>
                              <td className="px-2 py-3 text-right font-mono text-slate-500 font-medium">{row.silver.toFixed(2)}</td>
                              <td className="px-3 py-3 text-right font-mono font-black text-slate-900 bg-slate-50/50">{row.money.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-emerald-50/30 font-black border-t-2 border-emerald-100">
                          <tr>
                            <td className="px-4 py-3 text-emerald-800 uppercase text-[9px]">{t.total}</td>
                            <td className="px-2 py-3 text-emerald-600 text-center">{result.totalFraction.toFixed(0)}/1</td>
                            <td className="px-2 py-3 text-right text-slate-400">{assets.land.toFixed(2)}</td>
                            <td className="px-2 py-3 text-right text-slate-400">{assets.gold.toFixed(2)}</td>
                            <td className="px-2 py-3 text-right text-slate-400">{assets.silver.toFixed(2)}</td>
                            <td className="px-3 py-3 text-right text-emerald-800">{assets.money.toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </section>

                  {/* Chart and Steps Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                          <ChartIcon size={14} />
                          {t.summaryTitle}
                        </div>
                        <div className="h-[240px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#fff" />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold' }} 
                                formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, t.shareHeader]}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                           {chartData.map((item, id) => (
                             <div key={id} className="flex items-center gap-2 text-[9px] font-bold text-slate-500">
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                               <span className="truncate">{item.name}</span>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <div className="bg-[#8E44AD] text-white px-4 py-3 flex items-center gap-2">
                           <ScrollText size={16} />
                           <h5 className="font-black text-xs uppercase tracking-[0.1em]">{t.stepsTitle}</h5>
                        </div>
                        <div className="p-4 sm:p-6 bg-slate-50/30">
                          <ul className="space-y-4">
                            {result.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-4 group">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#8E44AD] text-[#8E44AD] flex items-center justify-center text-[10px] font-black group-hover:bg-[#8E44AD] group-hover:text-white transition-all">
                                  {idx + 1}
                                </div>
                                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-semibold pt-0.5">
                                  {step}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Branding Footer Section */}
                      <footer className="pt-6 border-t border-slate-100 mt-6 bg-slate-50/50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 opacity-80">
                        <div className="text-center sm:text-left">
                           <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">পরিকল্পনা ও বাস্তবায়নে</h6>
                           <div className="flex items-center gap-6 saturate-[0.8]">
                              <div className="flex flex-col items-center">
                                 <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-[8px] border-4 border-white shadow-sm">a2i</div>
                                 <span className="text-[6px] font-black mt-1 text-slate-500">Aspire to Innovate</span>
                              </div>
                              <div className="flex flex-col items-center">
                                 <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-sm overflow-hidden p-1">
                                    <div className="w-full h-full bg-emerald-700 rounded-full flex items-center justify-center border-2 border-red-600">
                                       <div className="w-2 h-2 bg-red-600 rounded-full" />
                                    </div>
                                 </div>
                                 <span className="text-[6px] font-black mt-1 text-slate-500">ICT DIVISION</span>
                              </div>
                           </div>
                        </div>
                        <div className="text-center sm:text-right hidden sm:block">
                           <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{t.appName} Solution</div>
                           <div className="text-[7px] text-slate-400 font-bold mt-1">Verified by Islamic Heritage Matrix v1.2</div>
                        </div>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rules' && (
            <motion.div 
              key="rules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 px-1"
            >
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <ScrollText className="text-amber-500" size={18} />
                  <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">{t.rulesHeader}</h3>
                </div>
                
                <div className="space-y-6">
                  {INHERITANCE_RULES[lang].map((rule, idx) => (
                    <div key={idx} className="space-y-3">
                       <h4 className="flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-700 uppercase tracking-wide">
                         <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                         {rule.title}
                       </h4>
                       <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-semibold bg-slate-50 p-3 rounded-xl border border-slate-200">
                         {rule.content}
                       </p>
                       <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         {rule.points.map((point, pIdx) => (
                           <li key={pIdx} className="group flex gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all">
                              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full flex items-center justify-center">
                                {pIdx + 1}
                              </span>
                              <span className="text-[11px] sm:text-xs text-slate-700 leading-snug font-bold">
                                {point}
                              </span>
                           </li>
                         ))}
                       </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div 
              key="faq"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3 px-1"
            >
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                  <HelpCircle className="text-blue-500" size={18} />
                  <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">{t.faqHeader}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {FAQ_DATA[lang].map((item, idx) => (
                    <div key={idx} className="group p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/5 transition-all h-full flex flex-col">
                      <div className="flex gap-3 items-start mb-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-600 text-[12px] font-black rounded-full flex items-center justify-center shadow-sm">Q</span>
                        <h4 className="font-extrabold text-slate-800 text-[11px] sm:text-xs leading-snug mt-1">
                          {item.q}
                        </h4>
                      </div>
                      <div className="ml-10 p-3 bg-slate-50 rounded-xl border border-slate-200/50 mt-auto">
                        <div className="flex gap-3 items-start">
                          <span className="text-slate-400 font-black text-[9px] mt-1 uppercase tracking-tighter shrink-0">{lang === 'bn' ? 'উত্তর:' : 'Ans:'}</span>
                          <p className="text-slate-700 text-[11px] sm:text-xs leading-relaxed font-mono italic font-bold">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-4 mt-2 px-2 text-center">
        <div className="max-w-4xl mx-auto opacity-30 flex flex-col items-center gap-1">
           <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-900">{t.footerTitle}</span>
           <span className="text-[7px] font-bold text-slate-400">{t.footerCopy}</span>
        </div>
      </footer>
    </div>
  );
}
