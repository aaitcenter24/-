/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { 
  Users, 
  Coins, 
  Table as TableIcon, 
  PieChart as ChartIcon, 
  Download, 
  RotateCcw, 
  Calculator,
  Clock,
  ChevronRight,
  Info,
  ScrollText,
  HelpCircle,
  Gem,
  AlertCircle,
  BookMarked,
  Languages,
  Share2,
  Printer,
  Settings,
  X,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  MoreVertical,
  CreditCard,
  Package,
  Globe,
  History,
  Bookmark,
  Save,
  Trash2,
  Calendar,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Send,
  QrCode,
  Image as ImageIcon,
  Scale,
  RefreshCw
} from 'lucide-react';
import UnitConverter from './components/UnitConverter';
import AIInheritanceChat from './components/AIInheritanceChat';
import SpiritualTools from './components/SpiritualTools';
import UserSettings from './components/UserSettings';
import { HEIRS, Assets, CalculationResult, Madhhab, CalculationStep } from './types';
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
import { QRCodeSVG } from 'qrcode.react';
import { TRANSLATIONS, INHERITANCE_RULES, FAQ_DATA, HELP_CONTENT } from './lib/translations';
import { 
  auth, 
  loginWithGoogle, 
  logout, 
  syncUserProfile, 
  getUserProfile,
  saveCalculation,
  getCalculations,
  deleteCalculation,
  submitFeedback
} from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];

export default function App() {
  const [lang, setLang] = useState<'bn' | 'en' | 'ar'>('ar');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [deceasedName, setDeceasedName] = useState('');
  const [heirNames, setHeirNames] = useState<Record<string, string[]>>({});
  const [assets, setAssets] = useState<Assets>({ land: 0, money: 0, gold: 0, silver: 0 });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'input' | 'result' | 'rules' | 'faq' | 'history' | 'help'>('input');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'discrepancy' | 'suggestion' | 'other'>('suggestion');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'name'>('default');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [country, setCountry] = useState<'BD' | 'PK' | 'SA' | 'ZA'>('SA');
  const [madhhab, setMadhhab] = useState<Madhhab>('Hanbali');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState<FirebaseUser | null>(null);
  
  const [highlightedHeirIds, setHighlightedHeirIds] = useState<string[]>([]);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [showRulesInPdf, setShowRulesInPdf] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSpiritualToolsOpen, setIsSpiritualToolsOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [converterType, setConverterType] = useState<'land' | 'precious'>('land');
  const [converterTargetField, setConverterTargetField] = useState<'land' | 'gold' | 'silver'>('land');
  
  const t = TRANSLATIONS[lang];

  // Initialize and run tour
  const startTour = () => {
    const tTour = TRANSLATIONS[lang].tour;
    const driverObj = driver({
      showProgress: true,
      animate: true,
      nextBtnText: tTour.next,
      prevBtnText: tTour.prev,
      doneBtnText: tTour.done,
      steps: [
        {
          element: 'body',
          popover: {
            title: tTour.welcomeTitle,
            description: tTour.welcomeDesc,
          },
        },
        {
          element: '#deceased-name-container',
          popover: {
            title: tTour.deceasedTitle,
            description: tTour.deceasedDesc,
          },
        },
        {
          element: '#heirs-section',
          popover: {
            title: tTour.heirsTitle,
            description: tTour.heirsDesc,
          },
        },
        {
          element: '#assets-bar',
          popover: {
            title: tTour.assetsTitle,
            description: tTour.assetsDesc,
          },
        },
        {
          element: '#ai-assistant-toggle',
          popover: {
            title: tTour.aiTitle,
            description: tTour.aiDesc,
          },
        },
        {
          element: '#lang-toggle',
          popover: {
            title: tTour.langTitle,
            description: tTour.langDesc,
          },
        },
        {
          element: '#more-menu-toggle',
          popover: {
            title: tTour.moreTitle,
            description: tTour.moreDesc,
          },
        },
      ]
    });

    driverObj.drive();
    localStorage.setItem('heritage_matrix_tour_seen', 'true');
  };

  // Auto-start tour for new users
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('heritage_matrix_tour_seen');
    if (!hasSeenTour) {
      setTimeout(startTour, 1500);
    }
  }, []);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const profile = await getUserProfile(currentUser.uid);
        if (profile?.country) {
          setCountry(profile.country as 'BD' | 'PK' | 'SA' | 'ZA');
        }
      }
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sync country to Firestore if user is logged in
  const handleCountryChange = async (newCountry: 'BD' | 'PK' | 'SA' | 'ZA') => {
    setCountry(newCountry);
    
    // Set default Madhhab based on country
    if (newCountry === 'BD' || newCountry === 'PK') setMadhhab('Hanafi');
    else if (newCountry === 'SA') setMadhhab('Hanbali');
    else if (newCountry === 'ZA') setMadhhab('Shafi\'i');

    if (user) {
      await syncUserProfile(user, newCountry);
    }
  };

  // Auto-switch language and currency when country changes
  React.useEffect(() => {
    if (country === 'BD') {
      if (lang === 'ar') setLang('bn');
    } else if (country === 'SA') {
      if (lang === 'bn') setLang('ar');
    } else if (country === 'ZA' || country === 'PK') {
      setLang('en');
    }
  }, [country]);

  // Handle shared calculation link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('s');
    if (sharedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(sharedData)));
        
        setDeceasedName(decoded.n || '');
        setCounts(decoded.h || {});
        setHeirNames(decoded.hn || {});
        setAssets(decoded.a || { land: 0, money: 0, gold: 0, silver: 0 });
        
        if (decoded.c) setCountry(decoded.c as any);
        if (decoded.l) setLang(decoded.l as any);
        if (decoded.m) setMadhhab(decoded.m as any);
        
        // Auto-calculate
        const res = calculateInheritance(
          decoded.h || {}, 
          decoded.a || { land: 0, money: 0, gold: 0, silver: 0 }, 
          decoded.l || 'en', 
          decoded.n || '', 
          decoded.hn || {}, 
          decoded.c || 'BD', 
          decoded.m || 'Hanafi'
        );
        setResult(res);
        setActiveTab('result');
        
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      } catch (e) {
        console.error("Failed to parse shared data:", e);
      }
    }
  }, []);

  const handleLoginFlow = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      const profile = await getUserProfile(loggedUser.uid);
      
      if (!profile) {
        // New user - show country modal
        setPendingUser(loggedUser);
        setIsCountryModalOpen(true);
      } else {
        // Existing user - auto-set country
        if (profile.country) {
          setCountry(profile.country as 'BD' | 'PK' | 'SA' | 'ZA');
        }
      }
    } catch (err) {
      setError(lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে' : 'Login failed');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleCountrySelect = async (selected: 'BD' | 'PK' | 'SA' | 'ZA') => {
    if (pendingUser) {
      await syncUserProfile(pendingUser, selected);
      setCountry(selected);
      setPendingUser(null);
      setIsCountryModalOpen(false);
    }
  };

  const toggleLang = () => {
    setLang(prev => {
      let next: 'bn' | 'en' | 'ar' = prev;
      if (country === 'BD') {
        next = prev === 'bn' ? 'en' : 'bn';
      } else if (country === 'SA') {
        next = prev === 'ar' ? 'en' : 'ar';
      } else if (country === 'ZA') {
        // South Africa defaults to English, maybe add Afrikaans later if needed
        next = 'en';
      } else {
        // Fallback for PK or others
        next = prev === 'en' ? 'bn' : 'en';
      }
      
      if (result) {
        setResult(calculateInheritance(counts, assets, next, deceasedName, heirNames, country, madhhab));
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

  const updateHeirName = (heirId: string, index: number, name: string) => {
    setHeirNames(prev => {
      const list = [...(prev[heirId] || [])];
      list[index] = name;
      return { ...prev, [heirId]: list };
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
    const res = calculateInheritance(counts, assets, lang, deceasedName, heirNames, country, madhhab);
    setResult(res);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCounts({});
    setDeceasedName('');
    setHeirNames({});
    setAssets({ land: 0, money: 0, gold: 0, silver: 0 });
    setResult(null);
    setActiveTab('input');
  };

  const handleSaveCalculation = async () => {
    if (!user) {
      setError(lang === 'bn' ? 'সংরক্ষণ করতে অনুগ্রহ করে লগইন করুন' : 'Please login to save');
      setTimeout(() => setError(null), 3000);
      handleLoginFlow();
      return;
    }

    if (Object.keys(counts).length === 0) return;

    try {
      setIsSaving(true);
      await saveCalculation(user.uid, {
        deceasedName,
        heirs: counts,
        assets,
        country,
        madhhab
      });
      setError(lang === 'bn' ? 'সফলভাবে সংরক্ষিত হয়েছে' : 'Saved successfully');
      setTimeout(() => setError(null), 3000);
      fetchHistory(); // Refresh history
    } catch (err) {
      setError(lang === 'bn' ? 'সংরক্ষণ ব্যর্থ হয়েছে' : 'Save failed');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchHistory = async () => {
    if (!user) return;
    try {
      setIsLoadingHistory(true);
      const data = await getCalculations(user.uid);
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const loadHistoryItem = (item: any) => {
    setDeceasedName(item.deceasedName || '');
    setCounts(item.heirs || {});
    setAssets(item.assets || { land: 0, money: 0, gold: 0, silver: 0 });
    setCountry(item.country as any);
    if (item.madhhab) setMadhhab(item.madhhab);
    
    // Recalculate
    const res = calculateInheritance(item.heirs, item.assets, lang, item.deceasedName, {}, item.country, item.madhhab || 'Hanafi');
    setResult(res);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    try {
      await deleteCalculation(user.uid, id);
      setHistory(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      setError(lang === 'bn' ? 'মুছে ফেলতে ব্যর্থ হয়েছে' : 'Delete failed');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError(lang === 'bn' ? 'মতামত দিতে অনুগ্রহ করে লগইন করুন' : 'Please login to submit feedback');
      setTimeout(() => setError(null), 3000);
      handleLoginFlow();
      return;
    }

    if (!feedbackMessage.trim()) return;

    try {
      setIsSubmittingFeedback(true);
      await submitFeedback({
        uid: user.uid,
        email: user.email || undefined,
        type: feedbackType,
        message: feedbackMessage
      });
      setError(t.feedbackSuccess);
      setTimeout(() => setError(null), 5000);
      setIsFeedbackOpen(false);
      setFeedbackMessage('');
    } catch (err) {
      setError(t.feedbackError);
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history' && user) {
      fetchHistory();
    }
  }, [activeTab, user]);

  const downloadFile = async (format: 'pdf' | 'png' | 'jpg') => {
    const element = document.getElementById('result-content');
    if (!element || isDownloading) return;
    
    setIsDownloadMenuOpen(false); // Close menu
    
    try {
      setIsDownloading(true);
      
      // Temporary: ensure the element's style is solid for capturing
      const originalBoxShadow = element.style.boxShadow;
      element.style.boxShadow = 'none';

      const canvas = await html2canvas(element, { 
        scale: 1.5, // Reduced from 2 for better memory management on mobile
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY, // Fix for offset issues
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              transition: none !important;
              animation: none !important;
            }
            .text-emerald-600 { color: #059669 !important; }
            .bg-emerald-600 { background-color: #059669 !important; }
            .bg-emerald-50 { background-color: #ecfdf5 !important; }
            .text-slate-800 { color: #1e293b !important; }
            .border-emerald-500 { border-color: #10b981 !important; }
            #result-content { padding: 30px !important; width: 750px !important; height: auto !important; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });
      
      element.style.boxShadow = originalBoxShadow;
      const fileName = `${t.reportTitle.replace(/\s+/g, '_')}_${Date.now()}`;

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Lower quality for mobile stability
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const pdfWidth = pageWidth - (margin * 2);
        
        // --- COVER PAGE ---
        // Header Banner
        pdf.setFillColor(5, 150, 105);
        pdf.rect(0, 0, pageWidth, 50, 'F');
        
        // App Identity
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(32);
        pdf.setFont("helvetica", "bold");
        pdf.text("HERITAGE MATRIX", pageWidth / 2, 25, { align: "center" });
        pdf.setFontSize(10);
        pdf.text("PRECISION ISLAMIC INHERITANCE SYSTEM", pageWidth / 2, 35, { align: "center" });
        
        // Report Title
        pdf.setTextColor(30, 41, 59); // slate-800
        pdf.setFontSize(26);
        pdf.text(t.reportTitle.toUpperCase(), pageWidth / 2, 80, { align: "center" });
        
        // Custom Logo
        if (customLogo) {
          try {
            pdf.addImage(customLogo, 'PNG', pageWidth / 2 - 20, 45, 40, 40, undefined, 'FAST');
          } catch (e) {
            console.error("Failed to add custom logo to PDF", e);
          }
        }

        // Date
        pdf.setFontSize(12);
        pdf.setTextColor(148, 163, 184); // slate-400
        pdf.text(new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB'), pageWidth / 2, 90, { align: "center" });
        
        // User Info Section
        if (user) {
          pdf.setFillColor(248, 250, 252);
          pdf.roundedRect(margin * 2, 110, pageWidth - (margin * 4), 30, 3, 3, 'F');
          pdf.setTextColor(5, 150, 105);
          pdf.setFontSize(10);
          pdf.text(lang === 'bn' ? 'ব্যবহারকারী' : 'PREPARED FOR', margin * 3, 118);
          pdf.setTextColor(30, 41, 59);
          pdf.setFontSize(14);
          const userName = user.displayName || user.email || 'Guest User';
          pdf.text(userName, margin * 3, 128);
        }
        
        // Summary Table
        pdf.setFillColor(241, 245, 249);
        pdf.roundedRect(margin * 2, 150, pageWidth - (margin * 4), 80, 3, 3, 'F');
        
        pdf.setTextColor(2, 6, 23);
        pdf.setFontSize(14);
        pdf.text(lang === 'bn' ? 'হিসাব সারসংক্ষেপ' : 'CALCULATION SUMMARY', pageWidth / 2, 165, { align: "center" });
        
        pdf.setFontSize(11);
        let yPos = 180;
        const moneyUnit = country === 'PK' ? 'PKR' : (country === 'SA' ? 'SAR' : (country === 'ZA' ? 'R' : 'BDT'));
        const landUnit = country === 'PK' ? 'Kanal' : (country === 'SA' ? 'm²' : (country === 'ZA' ? 'ha' : 'Dec'));

        const drawRow = (label: string, value: string) => {
           pdf.setTextColor(100, 116, 139);
           pdf.text(label, margin * 3, yPos);
           pdf.setTextColor(30, 41, 59);
           pdf.text(value, pageWidth - (margin * 3), yPos, { align: 'right' });
           yPos += 10;
        };
        
        drawRow(lang === 'bn' ? 'মৃত ব্যক্তি' : 'Deceased Name', deceasedName || (lang === 'bn' ? 'অজ্ঞাত' : 'Not Specified'));
        drawRow(t.money, `${assets.money.toLocaleString()} ${moneyUnit}`);
        drawRow(t.land, `${assets.land} ${landUnit}`);
        drawRow(lang === 'bn' ? 'দেশ' : 'Country', country);
        drawRow(t.madhhab, madhhab);
        
        if (showRulesInPdf) {
          pdf.setFontSize(9);
          pdf.setTextColor(100, 116, 139);
          const rulesSummary = country === 'SA' ? 'Calculated according to Saudi Sharia standards.' : `Calculated according to ${country} law and ${madhhab} madhhab.`;
          pdf.text(rulesSummary, pageWidth / 2, yPos + 10, { align: "center" });
        }

        // Branding Footer
        pdf.setTextColor(148, 163, 184);
        pdf.setFontSize(9);
        pdf.text("This report was generated by Heritage Matrix. Values are calculated based on Islamic Sharia law.", pageWidth / 2, 280, { align: "center" });
        pdf.text("www.heritagematrix.com", pageWidth / 2, 285, { align: "center" });

        // --- MAIN CONTENT ---
        pdf.addPage();
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        let heightLeft = pdfHeight;
        let position = 15;

        // Top Banner
        pdf.setFillColor(5, 150, 105);
        pdf.rect(0, 0, pageWidth, 10, 'F');
        
        pdf.addImage(imgData, 'JPEG', margin, position, pdfWidth, pdfHeight, undefined, 'FAST');
        heightLeft -= (pageHeight - 20);

        while (heightLeft > 0) {
          pdf.addPage();
          position = heightLeft - pdfHeight + 15;
          pdf.setFillColor(5, 150, 105);
          pdf.rect(0, 0, pageWidth, 10, 'F');
          pdf.addImage(imgData, 'JPEG', margin, position, pdfWidth, pdfHeight, undefined, 'FAST');
          heightLeft -= (pageHeight - 20);
        }
        
        // Final save with user interaction check
        pdf.save(`${fileName}.pdf`);
      } else {
        const imgType = format === 'png' ? 'image/png' : 'image/jpeg';
        const imgData = canvas.toDataURL(imgType, format === 'png' ? 1.0 : 0.8);
        
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = imgData;
        link.download = `${fileName}.${format}`;
        link.target = '_blank'; // Helpful for some mobile browsers
        document.body.appendChild(link);
        link.click();
        
        // Small delay before cleanup
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 500);
      }
    } catch (err) {
      console.error('Download Error:', err);
      // More descriptive error for user
      setError(lang === 'bn' ? 'ডাউনলোড ব্যর্থ হয়েছে। আপনি ব্রাউজারের "Print" অপশনটি ব্যবহার করে PDF হিসেবে সেভ করতে পারেন।' : 'Download failed. Please try using the Browser "Print" option to save as PDF.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsDownloading(false);
    }
  };

  const printReport = () => {
     window.print();
  };

  const shareResult = async () => {
    if (!result) return;
    
    // Generate unique shareable link
    const data = {
      n: deceasedName,
      h: counts,
      hn: heirNames,
      a: assets,
      c: country,
      l: lang,
      m: madhhab
    };
    
    let shareUrl = window.location.origin + window.location.pathname;
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
      shareUrl += `?s=${encoded}`;
    } catch (e) {
      console.error("Failed to encode share data", e);
    }
    
    // Construct sharing text
    const shareText = `🏛️ ${t.appName} - ${t.reportTitle}\n` + 
      `📅 ${new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB')}\n\n` +
      `${result.rows.map(r => `• ${r.name}: ${r.decimal.toFixed(4)}`).join('\n')}\n\n` +
      `${t.shareText}\n` +
      `${shareUrl}`;

    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: t.appName,
          text: shareText,
          url: shareUrl,
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

  const sortedRows = useMemo(() => {
    if (!result) return [];
    if (sortBy === 'name') {
      return [...result.rows].sort((a, b) => {
        const nameA = (a.individualName || a.name).toLowerCase();
        const nameB = (b.individualName || b.name).toLowerCase();
        return nameA.localeCompare(nameB, lang === 'bn' ? 'bn' : 'en');
      });
    }
    return result.rows;
  }, [result, sortBy, lang]);

  const shareUrl = useMemo(() => {
    if (!result) return '';
    const data = {
      n: deceasedName,
      h: counts,
      hn: heirNames,
      a: assets,
      c: country,
      l: lang,
      m: madhhab
    };
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
      return window.location.origin + window.location.pathname + `?s=${encoded}`;
    } catch (e) {
      return '';
    }
  }, [result, deceasedName, counts, heirNames, assets, country, lang, madhhab]);

  const chartData = useMemo(() => {
    if (!result) return [];
    return result.rows.filter(r => r.decimal > 0).map((r, i) => ({
      name: r.name,
      value: r.decimal,
      color: COLORS[i % COLORS.length]
    }));
  }, [result]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      {/* Country Selection Modal for New Users */}
      <AnimatePresence>
        {isCountryModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-6 text-center"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">
                {lang === 'bn' ? 'আপনার দেশ নির্বাচন করুন' : 'Select Your Country'}
              </h3>
              <p className="text-xs text-slate-500 font-bold mb-6">
                {lang === 'bn' ? 'আপনার দেশের আইন অনুযায়ী হিসাব করা হবে' : 'Calculator will be set according to your country'}
              </p>
              
              <div className="space-y-3">
                {[
                  { id: 'BD', name: t.countryBD },
                  { id: 'PK', name: t.countryPK },
                  { id: 'SA', name: t.countrySA },
                  { id: 'ZA', name: t.countryZA }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCountrySelect(c.id as any)}
                    className="w-full p-4 rounded-2xl border-2 border-slate-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all flex items-center justify-between group"
                  >
                    <span className="font-black text-slate-700 uppercase tracking-tight group-hover:text-emerald-700">{c.name}</span>
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-emerald-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-slate-600" />
                  <h3 className="font-black text-slate-800 uppercase tracking-tight">{t.settings}</h3>
                </div>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X size={18} className="text-slate-500" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                    {t.selectCountry}
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'BD', name: t.countryBD },
                      { id: 'PK', name: t.countryPK },
                      { id: 'SA', name: t.countrySA },
                      { id: 'ZA', name: t.countryZA }
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          handleCountryChange(c.id as any);
                          setIsSettingsOpen(false);
                        }}
                        className={`w-full px-4 py-3 rounded-xl border-2 flex items-center justify-between transition-all ${
                          country === c.id 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                            : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="font-bold text-sm">{c.name}</span>
                        {country === c.id && (
                          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">
                    {t.madhhab}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali'] as Madhhab[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMadhhab(m)}
                        className={`px-3 py-2.5 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                          madhhab === m 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900' 
                            : 'border-slate-100 hover:border-emerald-100 hover:bg-slate-50 text-slate-500'
                        }`}
                      >
                        <span className="font-bold text-xs">{t[m.toLowerCase().replace("'", "") as keyof typeof t] as string}</span>
                        <span className="text-[8px] uppercase opacity-60 tracking-wider font-black">{m}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 text-center">
                <p className="text-[10px] text-slate-400 font-medium">Islamic Inheritance Calculator v2.1</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[100] h-14 sm:h-16 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-full flex items-center justify-between gap-1 sm:gap-4">
          
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* হিসাব বাটন (Calculator) - Updated style */}
            <button 
              onClick={() => { setActiveTab('input'); setIsMoreMenuOpen(false); }}
              className={`h-11 px-4 sm:h-12 sm:px-6 rounded-full flex items-center justify-center gap-2 sm:gap-3 transition-all active:scale-95 border-2 ${activeTab === 'input' ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/20' : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'}`}
            >
              <Calculator size={18} className="sm:w-5 sm:h-5" />
              <span className="text-[12px] sm:text-[15px] font-black uppercase tracking-tight">
                {t.appName}
              </span>
            </button>

            {/* Desktop Only: Rule & FAQ direct links */}
            <div className="hidden md:flex items-center gap-1">
              <button 
                onClick={() => setActiveTab('rules')}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'rules' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {t.rules}
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {t.history}
              </button>
              <button 
                onClick={() => setActiveTab('help')}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'help' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {t.help}
              </button>
              <button 
                onClick={() => setActiveTab('faq')}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'faq' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {t.faq}
              </button>
            </div>

            {/* ভাষা পরিবর্তন বাটন (Always visible) */}
            <button 
              id="lang-toggle"
              onClick={toggleLang}
              className="h-10 px-2 sm:h-11 sm:px-3 bg-slate-100/80 text-slate-600 rounded-full flex items-center justify-center gap-1 sm:gap-2 hover:bg-slate-200 transition-all active:scale-95 border border-transparent shadow-sm"
            >
              <Languages size={15} className="sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider hidden xs:inline">
                {lang === 'bn' ? 'English' : 'বাংলা'}
              </span>
            </button>
          </div>

          {/* মেনু আইকন বাটন (একদম ডানে - Fixed to Right) */}
          <div className="relative ml-auto">
            <button 
              id="more-menu-toggle"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full flex items-center justify-center transition-all active:scale-95 border-2 ${isMoreMenuOpen ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'}`}
            >
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-white/50" referrerPolicy="no-referrer" />
              ) : (
                <MoreVertical size={18} className="sm:w-5 sm:h-5" />
              )}
            </button>

              {isMoreMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[105]" onClick={() => setIsMoreMenuOpen(false)} />
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 py-3 z-[110] overflow-hidden">
                    {user && (
                      <div className="px-5 py-3 border-b border-slate-50 bg-emerald-50/30 mb-1">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                          {lang === 'bn' ? 'ব্যবহারকারী' : 'Logged in as'}
                        </p>
                        <p className="text-xs font-black text-emerald-900 truncate">{user.displayName || user.email}</p>
                      </div>
                    )}

                    {/* Mobile Only items in Menu: Rule, FAQ */}
                    <div className="md:hidden py-1">
                      <button 
                        onClick={() => { setActiveTab('rules'); setIsMoreMenuOpen(false); }}
                        className={`w-full px-5 py-2.5 text-left text-xs font-bold flex items-center gap-3 transition-colors ${activeTab === 'rules' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <ScrollText size={16} className={activeTab === 'rules' ? 'text-emerald-500' : 'text-slate-400'} />
                        {t.rules}
                      </button>
                      <button 
                        onClick={() => { setActiveTab('history'); setIsMoreMenuOpen(false); }}
                        className={`w-full px-5 py-2.5 text-left text-xs font-bold flex items-center gap-3 transition-colors ${activeTab === 'history' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <History size={16} className={activeTab === 'history' ? 'text-emerald-500' : 'text-slate-400'} />
                        {t.history}
                      </button>
                      <button 
                        onClick={() => { setActiveTab('help'); setIsMoreMenuOpen(false); }}
                        className={`w-full px-5 py-2.5 text-left text-xs font-bold flex items-center gap-3 transition-colors ${activeTab === 'help' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <HelpCircle size={16} className={activeTab === 'help' ? 'text-emerald-500' : 'text-slate-400'} />
                        {t.help}
                      </button>
                      <button 
                        onClick={() => { setActiveTab('faq'); setIsMoreMenuOpen(false); }}
                        className={`w-full px-5 py-2.5 text-left text-xs font-bold flex items-center gap-3 transition-colors ${activeTab === 'faq' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <HelpCircle size={16} className={activeTab === 'faq' ? 'text-emerald-500' : 'text-slate-400'} />
                        {t.faq}
                      </button>
                      <button 
                        onClick={() => { setIsFeedbackOpen(true); setIsMoreMenuOpen(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold flex items-center gap-3 transition-colors text-slate-700 hover:bg-slate-50"
                      >
                        <MessageSquare size={16} className="text-slate-400" />
                        {t.feedback}
                      </button>
                      <div className="h-px bg-slate-50 my-1" />
                    </div>

                    <div className="py-1">
                      <button 
                        id="spiritual-tools-toggle"
                        onClick={() => { setIsSpiritualToolsOpen(true); setIsMoreMenuOpen(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-3 transition-colors"
                      >
                        <Clock size={16} className="text-emerald-500" />
                        {t.prayerTimes} & {t.qibla}
                      </button>
                      <button 
                        id="settings-toggle"
                        onClick={() => { setIsSettingsOpen(true); setIsMoreMenuOpen(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                      >
                        <Globe size={16} className="text-slate-400" />
                        {lang === 'bn' ? '৩. কান্ট্রি পরিবর্তীণ' : '3. Country Change'}
                      </button>
                      {user && (
                        <button 
                          id="user-profile-toggle"
                          onClick={() => { setIsUserSettingsOpen(true); setIsMoreMenuOpen(false); }}
                          className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                        >
                          <User size={16} className="text-blue-500" />
                          {(t as any).userSettings}
                        </button>
                      )}
                      <button 
                        onClick={() => { startTour(); setIsMoreMenuOpen(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors border-b border-slate-50"
                      >
                        <HelpCircle size={16} className="text-emerald-500" />
                        {lang === 'bn' ? 'ট্যুর শুরু করুন' : lang === 'ar' ? 'ابدأ جولة تعريفية' : 'Start App Tour'}
                      </button>
                      <button 
                        onClick={() => { setError(lang === 'bn' ? 'শীঘ্রই আসছে' : 'Coming Soon'); setIsMoreMenuOpen(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                      >
                        <Package size={16} className="text-slate-400" />
                        {lang === 'bn' ? '৪. পেকেজ' : '4. Packages'}
                      </button>
                      <button 
                        onClick={() => { setError(lang === 'bn' ? 'শীঘ্রই আসছে' : 'Coming Soon'); setIsMoreMenuOpen(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
                      >
                        <CreditCard size={16} className="text-slate-400" />
                        {lang === 'bn' ? '৫. পেমেন্ট সেকশন' : '5. Payment Section'}
                      </button>
                    </div>

                    <div className="h-px bg-slate-50 my-1" />

                    <div className="py-1">
                      {user ? (
                        <button 
                          onClick={async () => {
                            try {
                              await logout();
                              setIsMoreMenuOpen(false);
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="w-full px-5 py-3 text-left text-xs font-black text-rose-600 hover:bg-rose-50 flex items-center gap-3 transition-colors"
                        >
                          <LogOut size={16} />
                          {lang === 'bn' ? '৬. লগ আউট (Logout)' : '6. Logout'}
                        </button>
                      ) : (
                        <button 
                          onClick={async () => {
                            try {
                              await handleLoginFlow();
                              setIsMoreMenuOpen(false);
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="w-full px-5 py-3 text-left text-xs font-black text-emerald-600 hover:bg-emerald-50 flex items-center gap-3 transition-colors"
                        >
                          <LogIn size={16} />
                          {lang === 'bn' ? '৬. লগইন (Login)' : '6. Login'}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
      </nav>

      <main className={`max-w-5xl mx-auto px-4 sm:px-8 pt-6 ${activeTab === 'input' ? 'pb-40 sm:pb-32' : 'pb-12 sm:pb-32'}`}>
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
                {/* Deceased Name Input */}
                <div id="deceased-name-container" className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-2">
                    <ScrollText size={16} className="text-emerald-500" />
                    <label className="text-sm font-black text-slate-800 uppercase tracking-tight">{t.deceasedNameLabel}</label>
                  </div>
                  <input 
                    type="text"
                    value={deceasedName}
                    onChange={(e) => setDeceasedName(e.target.value)}
                    placeholder={t.deceasedNamePlaceholder}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className="w-1 h-4 bg-emerald-600 rounded-full" />
                  <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">{t.selectHeirs}</h3>
                </div>
                
                <div id="heirs-section" className="space-y-6 pb-2">
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
                        {HEIRS.filter(h => {
                          if (country === 'SA') {
                            return h.id !== 'dead_son' && h.id !== 'dead_daughter';
                          }
                          return h.group === group.id;
                        }).filter(h => h.group === group.id).map(heir => (
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
                                {lang === 'bn' ? heir.nameBn : lang === 'ar' ? heir.nameAr : heir.nameEn}
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

                {/* Heir Names Input Section */}
                {(Object.values(counts) as number[]).some(c => c > 0) && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <div className="w-1 h-4 bg-purple-600 rounded-full" />
                      <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">{t.heirNamesTitle}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {HEIRS.filter(h => counts[h.id] > 0).map(heir => (
                        <div key={heir.id} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                          <h4 className="font-black text-[10px] text-purple-600 uppercase tracking-widest flex items-center gap-2">
                            <Users size={12} />
                            {lang === 'bn' ? heir.nameBn : lang === 'ar' ? heir.nameAr : heir.nameEn} ({counts[heir.id]})
                          </h4>
                          <div className="space-y-2">
                            {Array.from({ length: counts[heir.id] }).map((_, idx) => (
                              <div key={idx} className="flex gap-2">
                                <div className="flex-shrink-0 w-8 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-400">
                                  {idx + 1}
                                </div>
                                <input 
                                  type="text"
                                  value={heirNames[heir.id]?.[idx] || ''}
                                  onChange={(e) => updateHeirName(heir.id, idx, e.target.value)}
                                  placeholder={`${t.heirNamePlaceholder} ${idx + 1}`}
                                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-purple-400 transition-all placeholder:text-slate-300"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* STICKY ASSET BAR - FIXED TO BOTTOM - COMPACT BUT LEGIBLE FOOTER */}
              <div id="assets-bar" className="fixed bottom-0 left-0 right-0 z-[60] pointer-events-none">
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                  <div className="bg-white border-t border-x border-emerald-600 shadow-[0_-15px_40px_rgba(16,185,129,0.12)] rounded-t-2xl px-4 py-2 sm:px-6 sm:py-3 pointer-events-auto">
                    <section className="flex flex-col gap-2">
                      <div className="flex items-center justify-between border-b border-emerald-50 pb-1 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <button 
                            id="ai-assistant-toggle"
                            onClick={() => setIsChatOpen(true)}
                            className="px-3 py-2 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95 border-2 border-white sm:border-4"
                            title="AI Assistant"
                          >
                            <MessageSquare size={16} />
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight">
                              {lang === 'bn' ? 'উত্তরাধিকার AI' : 'Inheritance AI'}
                            </span>
                          </button>
                          <div className="flex items-center gap-1.5">
                            <div className="p-1 bg-emerald-50 rounded-md">
                              <Coins className="text-emerald-600" size={14} />
                            </div>
                            <h3 className="text-[17px] font-black text-slate-800 uppercase tracking-tight text-center">
                              {lang === 'bn' ? 'সম্পত্তির বিবরণী' : 'Asset Details'}
                            </h3>
                          </div>
                        </div>
                        <span className="hidden sm:block text-[9px] font-black text-slate-200 uppercase tracking-[0.2em]">{lang === 'bn' ? 'স্মার্ট উত্তরাধিকার গণনা' : 'SMART INHERITANCE'}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        {[
                          { 
                            key: 'land', 
                            label: t.land, 
                            unit: country === 'SA' ? (lang === 'ar' ? 'م²' : 'm²') : (country === 'ZA' ? 'ha' : (country === 'PK' ? 'Kanal' : t.unitLand)),
                            canConvert: true,
                            converterType: 'land'
                          },
                          { 
                            key: 'money', 
                            label: t.money, 
                            unit: country === 'SA' ? (lang === 'ar' ? 'ر.স' : 'SAR') : (country === 'ZA' ? 'R' : (country === 'PK' ? 'PKR' : t.unitMoney)),
                            canConvert: false
                          },
                          { 
                            key: 'gold', 
                            label: t.gold, 
                            unit: t.unitGold,
                            canConvert: true,
                            converterType: 'precious'
                          },
                          { 
                            key: 'silver', 
                            label: t.silver, 
                            unit: t.unitSilver,
                            canConvert: true,
                            converterType: 'precious'
                          }
                        ].map(asset => (
                          <div key={asset.key} className="relative group">
                            <label className="absolute -top-1.5 left-2 px-1 bg-emerald-600 text-[8px] font-black text-white uppercase tracking-widest z-10 rounded-sm shadow-sm flex items-center gap-1">
                              {asset.label}
                              {asset.canConvert && (
                                <button
                                  onClick={() => {
                                    setConverterType(asset.converterType as 'land' | 'precious');
                                    setConverterTargetField(asset.key as 'land' | 'gold' | 'silver');
                                    setIsConverterOpen(true);
                                  }}
                                  className="hover:scale-125 transition-transform ml-0.5"
                                  title="Converter"
                                >
                                  <Scale size={8} className="text-emerald-100" />
                                </button>
                              )}
                            </label>
                            <div className="relative">
                              <input 
                                type="number"
                                min="0"
                                value={assets[asset.key as keyof Assets] || ''}
                                onChange={(e) => handleAssetChange(asset.key as keyof Assets, e.target.value)}
                                className="w-full pl-2.5 pr-8 py-2 sm:py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs sm:text-base font-black text-emerald-800 outline-none focus:bg-white focus:border-emerald-500 transition-all shadow-inner"
                                placeholder="0.00"
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] sm:text-xs font-bold text-slate-400 uppercase">
                                {asset.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 items-center pt-0.5">
                         <button 
                           onClick={handleReset}
                           className="w-10 sm:w-12 h-9 sm:h-10 bg-slate-100 text-slate-500 hover:text-rose-500 hover:bg-rose-50 transition-all flex items-center justify-center border border-slate-200 rounded-lg active:scale-95 shrink-0 shadow-sm"
                           title={t.reset}
                         >
                           <RotateCcw size={16} />
                         </button>
                         <button 
                           onClick={handleCalculate}
                           disabled={Object.values(counts).every(c => c === 0)}
                           className="flex-1 h-12 sm:h-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-[14px] sm:text-xl shadow-[0_12px_24px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_30px_rgba(16,185,129,0.5)] hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-20 flex items-center justify-center gap-2 uppercase tracking-[0.1em] active:scale-[0.98] rounded-xl group"
                         >
                           <Calculator size={22} className="group-hover:rotate-12 transition-transform" />
                           <span className="translate-y-0.5">{t.calculateButton}</span>
                         </button>
                      </div>
                    </section>
                  </div>
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
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button 
                    onClick={() => setSortBy(prev => prev === 'default' ? 'name' : 'default')}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-colors ${sortBy === 'name' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                  >
                    <TableIcon size={12} />
                    {t.sortByName}
                  </button>
                  <button 
                    onClick={() => setShowQrModal(true)}
                    className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1.5 hover:bg-slate-300 transition-colors"
                  >
                    <QrCode size={12} />
                    QR
                  </button>
                  <button 
                    onClick={shareResult}
                    disabled={isSharing}
                    className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1.5 hover:bg-slate-300 transition-colors disabled:opacity-50"
                  >
                    <Share2 size={12} />
                    {t.share}
                  </button>
                  
                  <button 
                    onClick={handleSaveCalculation}
                    disabled={isSaving}
                    className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition-colors shadow-sm cursor-pointer border border-emerald-100 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-3 h-3 border-2 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin" />
                    ) : (
                      <Save size={12} />
                    )}
                    {lang === 'bn' ? 'সেভ' : 'Save'}
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                      disabled={isDownloading}
                      className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1.5 hover:bg-emerald-700 shadow-md shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isDownloading ? (
                        <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                      {isDownloading ? (lang === 'bn' ? 'ডাউনলোড...' : 'Exporting...') : t.download}
                    </button>
                    
                    {isDownloadMenuOpen && !isDownloading && (
                      <>
                        <div 
                          className="fixed inset-0 z-[40]" 
                          onClick={() => setIsDownloadMenuOpen(false)} 
                        />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[50] overflow-hidden">
                          <div className="px-4 py-2 border-b border-slate-50">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">PDF CUSTOMIZATION</p>
                             <label className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                               <ImageIcon size={12} className="text-emerald-500" />
                               <span className="text-[10px] font-bold text-slate-600">{customLogo ? (lang === 'bn' ? 'লোগো পরিবর্তন' : 'Change Logo') : (lang === 'bn' ? 'নিজস্ব লোগো' : 'Add Logo')}</span>
                               <input 
                                 type="file" 
                                 accept="image/*" 
                                 className="hidden" 
                                 onChange={(e) => {
                                   const file = e.target.files?.[0];
                                   if (file) {
                                     const reader = new FileReader();
                                     reader.onloadend = () => setCustomLogo(reader.result as string);
                                     reader.readAsDataURL(file);
                                   }
                                 }}
                               />
                             </label>
                             <label className="flex items-center gap-2 mt-2 cursor-pointer">
                               <input 
                                 type="checkbox" 
                                 checked={showRulesInPdf} 
                                 onChange={(e) => setShowRulesInPdf(e.target.checked)}
                                 className="w-3 h-3 rounded text-emerald-600 focus:ring-emerald-500"
                               />
                               <span className="text-[10px] font-bold text-slate-600">{lang === 'bn' ? 'আইনী ব্যাখ্যা যুক্ত করুন' : 'Include Rules Summary'}</span>
                             </label>
                          </div>
                          <button onClick={() => downloadFile('pdf')} className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 border-b border-slate-50">
                            <BookMarked size={12} className="text-emerald-500" />
                            {t.downloadPDF}
                          </button>
                          <button onClick={() => downloadFile('png')} className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 border-b border-slate-50">
                            <Gem size={12} className="text-emerald-500" />
                            {t.downloadPNG}
                          </button>
                          <button onClick={() => downloadFile('jpg')} className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2 border-b border-slate-50">
                            <Gem size={12} className="text-emerald-500" />
                            {t.downloadJPG}
                          </button>
                          <button onClick={printReport} className="w-full px-4 py-2.5 text-left text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2">
                            <Printer size={12} className="text-emerald-500" />
                            {t.printReport}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div id="result-content" className="space-y-4 bg-white p-3 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
                <header className="border-b-2 border-emerald-500 pb-4 mb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">{t.reportTitle}</h3>
                    {result.deceasedName && (
                      <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 w-fit mx-auto sm:mx-0">
                         <Users size={14} />
                         <span className="text-xs font-black uppercase tracking-wider">{lang === 'bn' ? 'মৃত ব্যক্তি:' : 'Deceased:'} {result.deceasedName}</span>
                      </div>
                    )}
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
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
                    <div className="overflow-x-auto w-full rounded-b-xl border border-slate-100 shadow-sm no-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-500 text-[9px] uppercase tracking-wider font-black border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-3">{t.heirHeader}</th>
                            <th className="px-2 py-3 text-center">{t.relationshipHeader}</th>
                            <th className="px-2 py-3 text-center">{t.shareHeader}</th>
                            <th className="px-2 py-3 text-right">
                              {t.landHeader} ({country === 'SA' ? (lang === 'ar' ? 'م²' : 'm²') : (country === 'ZA' ? 'ha' : (country === 'PK' ? 'Kanal' : t.unitLand))})
                            </th>
                            <th className="px-2 py-3 text-right">{t.goldHeader} ({t.unitGold})</th>
                            <th className="px-2 py-3 text-right">{t.silverHeader} ({t.unitSilver})</th>
                            <th className="px-3 py-3 text-right">
                              {t.moneyHeader} ({country === 'SA' ? (lang === 'ar' ? 'ر.স' : 'SAR') : (country === 'ZA' ? 'R' : (country === 'PK' ? 'PKR' : t.unitMoney))})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-[10px] sm:text-xs">
                          {sortedRows.map((row, idx) => {
                            const isHighlighted = highlightedHeirIds.includes(row.heirId);
                            return (
                              <tr 
                                key={idx} 
                                className={`hover:bg-emerald-50/30 transition-all duration-300 ${row.decimal === 0 ? 'bg-slate-50/80 grayscale' : ''} ${isHighlighted ? 'bg-emerald-100/50 ring-2 ring-emerald-500 rounded-lg transform scale-[1.01] shadow-md z-10 relative' : ''}`}
                              >
                                <td className="px-4 py-3">
                                  <div className="flex flex-col">
                                    <span className={`font-bold text-slate-800 transition-transform ${isHighlighted ? 'text-emerald-700 scale-110 origin-left' : ''}`}>
                                      {row.individualName || row.name}
                                    </span>
                                    {row.decimal === 0 && row.note && (
                                      <span className="text-[9px] text-rose-500 font-bold mt-1 bg-rose-50 px-2 py-0.5 rounded-md w-fit">
                                        <Info size={10} className="inline mr-1" />
                                        {row.note}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-2 py-3 text-center font-bold text-slate-500 grayscale">
                                  {typeof t.relOfDeceased === 'function' ? t.relOfDeceased(row.name) : row.name}
                                </td>
                                <td className="px-2 py-3 font-mono text-emerald-600 text-center font-bold">
                                  {row.decimal === 0 ? '০/০' : row.decimal.toFixed(4)}
                                </td>
                                <td className="px-2 py-3 text-right font-mono text-slate-500 font-medium">{row.land.toFixed(2)}</td>
                                <td className="px-2 py-3 text-right font-mono text-slate-500 font-medium">{row.gold.toFixed(2)}</td>
                                <td className="px-2 py-3 text-right font-mono text-slate-500 font-medium">{row.silver.toFixed(2)}</td>
                                <td className="px-3 py-3 text-right font-mono font-black text-slate-900 bg-slate-50/50">{row.money.toLocaleString()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="bg-emerald-50/30 font-black border-t-2 border-emerald-100">
                          <tr>
                            <td className="px-4 py-3 text-emerald-800 uppercase text-[9px]">{t.total}</td>
                            <td className="px-2 py-3"></td>
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
                              <li 
                                key={idx} 
                                className="flex gap-4 group cursor-pointer"
                                onClick={() => {
                                  if (highlightedHeirIds.length > 0 && step.heirIds && highlightedHeirIds.every(id => step.heirIds?.includes(id)) && highlightedHeirIds.length === step.heirIds.length) {
                                    setHighlightedHeirIds([]);
                                  } else {
                                    setHighlightedHeirIds(step.heirIds || []);
                                    // Scroll to table if on mobile
                                    if (window.innerWidth < 1024) {
                                      const table = document.querySelector('table');
                                      table?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }
                                }}
                              >
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 text-[10px] font-black flex items-center justify-center transition-all ${highlightedHeirIds.length > 0 && step.heirIds?.some(id => highlightedHeirIds.includes(id)) ? 'bg-[#8E44AD] text-white border-[#8E44AD]' : 'bg-white border-[#8E44AD] text-[#8E44AD] group-hover:bg-[#8E44AD]/10'}`}>
                                  {idx + 1}
                                </div>
                                <p className={`text-[11px] sm:text-xs leading-relaxed font-semibold pt-0.5 transition-all ${highlightedHeirIds.length > 0 && step.heirIds?.some(id => highlightedHeirIds.includes(id)) ? 'text-[#8E44AD] scale-[1.02]' : 'text-slate-600'}`}>
                                  {step.text}
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

          {activeTab === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 px-1"
            >
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <History className="text-emerald-500" size={18} />
                    <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-tight">
                      {lang === 'bn' ? 'সংরক্ষিত হিসাবসমূহ' : 'Saved Calculations'}
                    </h3>
                  </div>
                  {!user && (
                    <button 
                      onClick={handleLoginFlow}
                      className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-sm transition-all"
                    >
                      <LogIn size={12} />
                      {lang === 'bn' ? 'লগইন করুন' : 'Login to View'}
                    </button>
                  )}
                </div>

                {!user ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <Bookmark size={32} className="text-slate-300" />
                    </div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'bn' ? 'আপনার হিসাব সংরক্ষণ করতে এবং এখানে দেখতে লগইন করুন' : 'Login to save your calculations and view them here'}
                    </h4>
                  </div>
                ) : isLoadingHistory ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}</p>
                  </div>
                ) : history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <History size={32} className="text-slate-300" />
                    </div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                      {lang === 'bn' ? 'কোন সংরক্ষিত হিসাব খুঁজে পাওয়া যায়নি' : 'No saved calculations found'}
                    </h4>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map((item) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => loadHistoryItem(item)}
                        className="group bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-white hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 transform -translate-x-full group-hover:translate-x-0 transition-transform" />
                        
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                               <Users size={16} />
                             </div>
                             <div>
                               <h4 className="text-xs font-black text-slate-800 truncate max-w-[120px]">
                                 {item.deceasedName || (lang === 'bn' ? 'অজ্ঞাত মৃত ব্যক্তি' : 'Unknown')}
                               </h4>
                               <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                                 <Calendar size={10} />
                                 {item.timestamp?.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB')}
                               </div>
                             </div>
                          </div>
                          <button 
                            onClick={(e) => handleDeleteHistory(item.id, e)}
                            className="p-2 rounded-full hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="bg-white/60 p-2 rounded-xl text-center border border-slate-100">
                            <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.heirHeader}</div>
                            <div className="text-xs font-black text-slate-700">
                              {Number(Object.values(item.heirs || {}).reduce((a: any, b: any) => a + b, 0))}
                            </div>
                          </div>
                          <div className="bg-white/60 p-2 rounded-xl text-center border border-slate-100">
                            <div className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{t.moneyHeader}</div>
                            <div className="text-xs font-black text-emerald-600 truncate">
                              {item.assets?.money?.toLocaleString() || 0}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                           <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-200 rounded text-[8px] font-black text-slate-500 uppercase tracking-widest">
                             <Globe size={10} />
                             {item.country}
                           </div>
                           <div className="text-[10px] font-black text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                             {lang === 'bn' ? 'লোড করুন' : 'Load Details'}
                             <ChevronRight size={14} />
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          {activeTab === 'help' && (
            <motion.div 
              key="help"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
                    <HelpCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{t.help}</h2>
                  <p className="text-slate-500 text-sm font-medium mt-2 max-w-md">
                    {lang === 'bn' ? 'কীভাবে ক্যালকুলেটর ব্যবহার করবেন এবং ইসলামি উত্তরাধিকার আইন বুঝবেন তার একটি গাইড।' : 'A comprehensive guide on how to use the calculator and understand Islamic inheritance laws.'}
                  </p>
                </div>

                {/* Step by Step Guide */}
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">1</div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                       <BookOpen size={18} className="text-emerald-500" />
                       {t.stepByStep}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(HELP_CONTENT[lang as keyof typeof HELP_CONTENT]?.steps || []).map((step: any, idx: number) => (
                      <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
                        <h4 className="text-sm font-black text-emerald-600 mb-2 uppercase tracking-wide">{step.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Input Fields Explanation */}
                <section className="mb-12">
                   <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                       <Info size={18} className="text-emerald-500" />
                       {t.inputExplanation}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {(HELP_CONTENT[lang as keyof typeof HELP_CONTENT]?.fields || []).map((field: any, idx: number) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400">
                           <Lightbulb size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-800 mb-1">{field.name}</h4>
                          <p className="text-xs text-slate-500 leading-normal">{field.desc || (field as any).text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Sharia Concepts */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2">
                       <Globe size={18} className="text-emerald-500" />
                       {t.shariaConcepts}
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {(HELP_CONTENT[lang as keyof typeof HELP_CONTENT]?.theory || []).map((item: any, idx: number) => (
                      <div key={idx} className="py-5 first:pt-0 last:pb-0">
                        <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed pl-3.5 border-l-2 border-slate-50">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="mt-12 p-6 bg-emerald-900 rounded-2xl text-center">
                   <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{lang === 'bn' ? 'প্রস্তুত?' : 'READY?'}</h4>
                   <p className="text-white text-sm font-medium mb-6">{lang === 'bn' ? 'এখনই আপনার মিরাস হিসাব শুরু করুন।' : 'Start calculating your inheritance now.'}</p>
                   <button 
                     onClick={() => setActiveTab('input')}
                     className="px-8 py-3 rounded-full bg-white text-emerald-900 text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                   >
                     {t.calculateButton}
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QR Code Modal */}
        <AnimatePresence>
          {showQrModal && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowQrModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
              >
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">SCAN QR CODE</h3>
                   <button onClick={() => setShowQrModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                     <X size={20} className="text-slate-400" />
                   </button>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border-4 border-emerald-50 mb-6 flex justify-center shadow-inner">
                  <QRCodeSVG 
                    value={shareUrl} 
                    size={200} 
                    level="H"
                    includeMargin={true}
                    {...(customLogo ? {
                      imageSettings: {
                        src: customLogo,
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }
                    } : {})}
                  />
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  <p className="text-xs text-slate-500 font-bold">
                    {lang === 'bn' ? 'এই কিউআর কোডটি স্ক্যান করে অন্য ডিভাইসে হিসাবটি ওপেন করুন' : 'Scan this QR code to open the calculation on another device'}
                  </p>
                  <button 
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(shareUrl);
                        setError(t.copied);
                        setTimeout(() => setError(null), 3000);
                      } catch (e) {}
                    }}
                    className="text-[10px] text-emerald-600 font-black flex items-center justify-center gap-1 hover:underline"
                  >
                    <Share2 size={12} />
                    {lang === 'bn' ? 'লিঙ্ক কপি করুন' : 'Copy Link'}
                  </button>
                </div>

                <button 
                  onClick={() => {
                    const canvas = document.querySelector('svg');
                    if (canvas) {
                      const svgData = new XMLSerializer().serializeToString(canvas);
                      const canvasElement = document.createElement('canvas');
                      const ctx = canvasElement.getContext('2d');
                      const img = new Image();
                      img.onload = () => {
                        canvasElement.width = img.width;
                        canvasElement.height = img.height;
                        if (ctx) {
                          ctx.fillStyle = 'white';
                          ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                          ctx.drawImage(img, 0, 0);
                          const pngUrl = canvasElement.toDataURL('image/png');
                          const downloadLink = document.createElement('a');
                          downloadLink.href = pngUrl;
                          downloadLink.download = `calculation_qr_${Date.now()}.png`;
                          document.body.appendChild(downloadLink);
                          downloadLink.click();
                          document.body.removeChild(downloadLink);
                        }
                      };
                      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                    }
                  }}
                  className="w-full py-4 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
                >
                  {lang === 'bn' ? 'QR কোড ডাউনলোড' : 'Download QR Code'}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Feedback Modal */}
        <AnimatePresence>
          {isFeedbackOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative"
              >
                <div className="bg-emerald-600 p-6 text-white relative">
                  <button 
                    onClick={() => setIsFeedbackOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight leading-tight">
                    {t.feedbackTitle}
                  </h3>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="p-6 space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      {t.feedbackType}
                    </label>
                    <div className="flex gap-2">
                       <button
                         type="button"
                         onClick={() => setFeedbackType('suggestion')}
                         className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${feedbackType === 'suggestion' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                       >
                         {t.suggestion}
                       </button>
                       <button
                         type="button"
                         onClick={() => setFeedbackType('discrepancy')}
                         className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase transition-all border-2 ${feedbackType === 'discrepancy' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                       >
                         {t.discrepancy}
                       </button>
                    </div>
                  </div>

                  <div>
                     <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      {t.message}
                    </label>
                    <textarea 
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      required
                      placeholder={lang === 'bn' ? 'আপনার মতামত এখানে লিখুন...' : 'Write your feedback here...'}
                      className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm font-medium resize-none bg-slate-50"
                    />
                  </div>

                  {!user && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                      <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600">
                        <Info size={14} />
                      </div>
                      <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                        {lang === 'bn' ? 'মতামত দিতে আপনাকে অবশ্যই লগইন করতে হবে।' : 'You must be logged in to submit feedback.'}
                      </p>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmittingFeedback || !user}
                    className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${isSubmittingFeedback || !user ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-lg active:shadow-none'}`}
                  >
                    {isSubmittingFeedback ? (
                       <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {t.submit}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Unit Converter Modal */}
      <AnimatePresence>
        {isConverterOpen && (
          <UnitConverter 
            isOpen={isConverterOpen}
            onClose={() => setIsConverterOpen(false)}
            type={converterType}
            lang={lang}
            targetUnit={
              converterTargetField === 'land' 
                ? (country === 'SA' ? (lang === 'ar' ? 'م²' : 'm²') : (country === 'ZA' ? 'ha' : (country === 'PK' ? 'Kanal' : t.unitLand)))
                : (converterTargetField === 'gold' ? t.unitGold : t.unitSilver)
            }
            onConvert={(val) => {
              handleAssetChange(converterTargetField, val.toString());
            }}
          />
        )}
      </AnimatePresence>

      <AIInheritanceChat lang={lang} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <SpiritualTools lang={lang} isOpen={isSpiritualToolsOpen} onClose={() => setIsSpiritualToolsOpen(false)} />
      <UserSettings 
        lang={lang} 
        isOpen={isUserSettingsOpen} 
        onClose={() => setIsUserSettingsOpen(false)} 
        onLanguageChange={(newLang) => setLang(newLang)}
      />

      <footer className="py-4 mt-2 px-2 text-center">
        <div className="max-w-4xl mx-auto opacity-30 flex flex-col items-center gap-1">
           <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-900">{t.footerTitle}</span>
           <span className="text-[7px] font-bold text-slate-400">{t.footerCopy}</span>
        </div>
      </footer>
    </div>
  );
}
