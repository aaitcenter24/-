/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  Globe, 
  Bell, 
  Heart, 
  X, 
  Check, 
  Loader2, 
  AlertCircle,
  Save,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Mail,
  Image,
  Upload,
  Trash2
} from 'lucide-react';
import { auth, getUserProfile, updateUserProfile, logout } from '../lib/firebase';
import { TRANSLATIONS } from '../lib/translations';
import { User as FirebaseUser } from 'firebase/auth';

interface UserSettingsProps {
  lang: 'bn' | 'en' | 'ar' | 'ur' | 'ms';
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: (lang: 'bn' | 'en' | 'ar' | 'ur' | 'ms') => void;
  currentPlan: 'free' | 'pro';
  onUpgradeClick: () => void;
  isDarkMode?: boolean;
}

const UserSettings: React.FC<UserSettingsProps> = ({ 
  lang, 
  isOpen, 
  onClose, 
  onLanguageChange,
  currentPlan,
  onUpgradeClick
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const designationOptions = ['Lawyer', 'Surveyor', 'Amin', 'Notary Public', 'Consultant', 'Manager'];
  const [maritalStatus, setMaritalStatus] = useState('notSpecified');
  const [notificationLanguage, setNotificationLanguage] = useState(lang);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  const t = ((TRANSLATIONS as any)[lang] || TRANSLATIONS['en']) as any;

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        setCurrentUser(auth.currentUser);
        try {
          setLoading(true);
          const data = await getUserProfile(auth.currentUser.uid);
          if (data) {
            setProfile(data);
            setDisplayName(data.displayName || data.name || auth.currentUser.displayName || '');
            setAddress(data.address || '');
            setMobile(data.mobile || '');
            setDesignation(data.designation || '');
            setMaritalStatus(data.maritalStatus || 'notSpecified');
            setNotificationLanguage(data.notificationLanguage || lang);
            setEmailNotificationsEnabled(data.emailNotificationsEnabled !== false);
            setCustomLogo(data.customLogo || null);
          }
        } catch (err) {
          console.error(err);
          setError(lang === 'bn' ? 'তথ্য লোড করতে সমস্যা হয়েছে' : 'Failed to load profile');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen, lang]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500 * 1024) {
      setError(lang === 'bn' ? 'ফাইল সাইজ ৫০০কিব এর কম হতে হবে' : 'File must be under 500KB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      await updateUserProfile(auth.currentUser.uid, {
        displayName,
        address,
        mobile,
        designation,
        maritalStatus,
        notificationLanguage,
        emailNotificationsEnabled,
        customLogo,
      });

      setSuccess(t.profileUpdated);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError(lang === 'bn' ? 'সংরক্ষণ ব্যর্থ হয়েছে' : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] transition-colors"
      >
        {/* Header */}
        <div className="bg-slate-900 dark:bg-black p-8 text-white shrink-0 relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Settings size={120} className="rotate-12" />
          </div>
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-2xl border-2 border-white/20 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center border-2 border-white/20">
                    <User size={32} />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 dark:border-black flex items-center justify-center">
                  <ShieldCheck size={12} className="text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black uppercase tracking-tight">{(t as any).userSettings}</h2>
                  <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                    currentPlan === 'pro' 
                    ? 'bg-amber-400 text-amber-900 shadow-sm shadow-amber-400/20' 
                    : 'bg-slate-700 text-slate-300'
                  }`}>
                    {currentPlan === 'pro' ? t.subscriptions.pro.name : t.subscriptions.free.name}
                  </span>
                </div>
                <p className="text-slate-400 text-xs font-bold tracking-wider uppercase opacity-80">
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar transition-colors">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={40} className="text-emerald-500 animate-spin mb-4" />
              <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{(t as any).loading || 'Loading...'}</p>
            </div>
          ) : (
            <>
              {/* Subscription Status Section */}
              <section className="space-y-4">
                <div className="flex items-center justify-between bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 p-6 rounded-3xl border border-white/10 shadow-xl overflow-hidden relative group transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ShieldCheck size={100} />
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">
                      {t.subscriptions.title}
                    </h3>
                    <p className="text-xl font-black text-white uppercase tracking-tight leading-none">
                      {currentPlan === 'pro' 
                        ? (lang === 'bn' ? 'প্রো মেম্বার' : lang === 'ar' ? 'عضو برو' : 'Pro Member') 
                        : (lang === 'bn' ? 'ফ্রি প্ল্যান' : lang === 'ar' ? 'الخطة المجانية' : 'Free Plan')}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 leading-tight">
                      {currentPlan === 'pro' 
                        ? (lang === 'bn' ? 'সকল প্রিমিয়াম ফিচার আনলক করা আছে' : lang === 'ar' ? 'جميع الميزات الممتازة مفعلة' : 'All premium features are unlocked')
                        : (lang === 'bn' ? 'মাসে ৩টি সেভ লিমিট, পিডিএফ ডিজেবল' : lang === 'ar' ? 'حد 3 حسابات، تحميل PDF معطل' : '3 saves limit, PDF downloads disabled')}
                    </p>
                  </div>
                  {currentPlan === 'free' && (
                    <button
                      onClick={() => {
                        onClose();
                        onUpgradeClick();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-amber-950 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all relative z-10"
                    >
                      {t.subscriptions.pro.get}
                    </button>
                  )}
                </div>
              </section>

              {/* General Information Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl transition-colors">
                    <User size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{lang === 'bn' ? 'ব্যক্তিগত তথ্য' : lang === 'ar' ? 'معلومات الشخصية' : 'Personal Details'}</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 bg-white dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                      <User size={10} className="text-emerald-500" />
                      {lang === 'bn' ? 'পুরো নাম' : lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input 
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                      <Mail size={10} className="text-blue-500" />
                      {lang === 'bn' ? 'যোগাযোগের ইমেইল' : lang === 'ar' ? 'البريد الإلكتروني' : 'Contact Email'}
                    </label>
                    <input 
                      type="email"
                      value={currentUser?.email || ''}
                      disabled
                      className="w-full px-5 py-3.5 bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-400 dark:text-slate-600 cursor-not-allowed outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Heart size={10} className="text-rose-500" />
                        {(t as any).maritalStatus}
                      </label>
                      <select 
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all appearance-none"
                      >
                        {['single', 'married', 'divorced', 'widowed', 'notSpecified'].map((status) => (
                          <option key={status} value={status}>{(t as any)[status]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <ShieldCheck size={10} className="text-amber-500" />
                        {lang === 'bn' ? 'পদবী' : 'Designation'}
                      </label>
                      <div className="relative group">
                        <input 
                          type="text"
                          value={designation}
                          onChange={(e) => {
                            setDesignation(e.target.value);
                            setShowDesignationDropdown(true);
                          }}
                          onFocus={() => setShowDesignationDropdown(true)}
                          onBlur={() => setTimeout(() => setShowDesignationDropdown(false), 200)}
                          placeholder="e.g. Surveyor or Custom Role"
                          className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all"
                        />
                        <AnimatePresence>
                          {showDesignationDropdown && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-[50]"
                            >
                              <div className="p-1">
                                {designationOptions
                                  .filter(opt => opt.toLowerCase().includes(designation.toLowerCase()))
                                  .map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        setDesignation(opt);
                                        setShowDesignationDropdown(false);
                                      }}
                                      className="w-full text-left px-4 py-2 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors uppercase tracking-widest"
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                {designation && !designationOptions.some(opt => opt.toLowerCase() === designation.toLowerCase()) && (
                                  <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 dark:border-slate-750 mt-1">
                                    Press Enter for custom role
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                      <ChevronRight size={10} className="text-indigo-500" />
                      {lang === 'bn' ? 'ঠিকানা ও যোগাযোগ' : lang === 'ar' ? 'العنوان والاتصال' : 'Address & Contact'}
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Mailing Address"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Heart size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Mobile Number"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-emerald-500 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Logo Section */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Image size={10} className="text-emerald-500" />
                        {lang === 'bn' ? 'কাস্টম লোগো (রিপোর্টের জন্য)' : lang === 'ar' ? 'شعار مخصص (للتقارير)' : 'Custom Logo (For Reports)'}
                      </label>
                      {currentPlan === 'free' && (
                        <span className="text-[8px] font-black bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-widest">
                          {lang === 'bn' ? 'প্রো ফিচার' : 'Pro Feature'}
                        </span>
                      )}
                    </div>
                    
                    <div className={`relative ${currentPlan === 'free' ? 'opacity-50 pointer-events-none' : ''}`}>
                      {customLogo ? (
                        <div className="relative group w-40 h-20 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center p-2">
                          <img 
                            src={customLogo} 
                            alt="Custom Logo" 
                            className="max-w-full max-h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <label className="p-2 bg-white/20 hover:bg-white/30 rounded-lg cursor-pointer transition-colors">
                              <Upload size={16} className="text-white" />
                              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                            </label>
                            <button 
                              onClick={() => setCustomLogo(null)}
                              className="p-2 bg-rose-500/20 hover:bg-rose-500/40 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} className="text-rose-500" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-2 group-hover:scale-110 transition-transform">
                              <Upload size={20} className="text-emerald-500" />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                              {lang === 'bn' ? 'লোগো আপলোড করুন' : 'Upload Report Logo'}
                            </p>
                            <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                              PNG, JPG (MAX 500KB)
                            </p>
                          </div>
                          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </section>


              {/* Preferences Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors">
                    <Globe size={18} className="text-slate-600 dark:text-slate-300" />
                  </div>
                  <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{lang === 'bn' ? 'পছন্দসমূহ' : 'Preferences'}</h3>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-inner space-y-6 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <Bell size={14} className="text-slate-400 dark:text-slate-500" />
                      <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                        {(t as any).preferredLang}
                      </label>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {(['bn', 'en', 'ar', 'ur', 'ms'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => {
                            setNotificationLanguage(l);
                            onLanguageChange(l);
                          }}
                          className={`px-3 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-tight transition-all ${
                            notificationLanguage === l 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' 
                              : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {l === 'bn' ? 'বাংলা' : l === 'en' ? 'English' : l === 'ar' ? 'العربية' : l === 'ur' ? 'اردو' : 'Melayu'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-slate-400 dark:text-slate-500" />
                          <h4 className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
                            {t.emailNotifications}
                          </h4>
                        </div>
                        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 leading-tight">
                          {t.emailNotificationsDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          emailNotificationsEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            emailNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex gap-3 transition-colors">
                    <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-200 leading-relaxed uppercase tracking-tight">
                      {lang === 'bn' 
                        ? 'আপনার পছন্দের ভাষা অনুযায়ী আমরা আপনাকে ইমেইল নোটিফিকেশন বা আপডেট পাঠাব।' 
                        : lang === 'ar'
                        ? 'سنرسل لك إشعارات البريد الإلكتروني أو التحديثات وفقاً للغتك المفضلة.'
                        : 'We will send you email notifications or updates according to your preferred language.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Status Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 transition-colors"
                  >
                    <AlertCircle size={18} />
                    <p className="text-xs font-black uppercase tracking-tight">{error}</p>
                  </motion.div>
                )}
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 transition-colors"
                  >
                    <Check size={18} />
                    <p className="text-xs font-black uppercase tracking-tight">{success}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0 flex flex-col sm:flex-row gap-3 transition-colors">
          <button 
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:border-rose-100 dark:hover:border-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 active:scale-95 transition-all"
          >
            <LogOut size={16} />
            {(t as any).logout || 'Logout'}
          </button>
          <button 
            onClick={handleSave}
            disabled={saving || loading}
            className="flex-[2] flex items-center justify-center gap-3 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 dark:shadow-none disabled:opacity-50 active:scale-95 transition-all group"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} className="group-hover:scale-110 transition-transform" />
            )}
            {(t as any).saveChanges}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSettings;
