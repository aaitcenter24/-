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
  Mail
} from 'lucide-react';
import { auth, getUserProfile, updateUserProfile, logout } from '../lib/firebase';
import { TRANSLATIONS } from '../lib/translations';
import { User as FirebaseUser } from 'firebase/auth';

interface UserSettingsProps {
  lang: 'bn' | 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: (lang: 'bn' | 'en' | 'ar') => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ lang, isOpen, onClose, onLanguageChange }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('notSpecified');
  const [notificationLanguage, setNotificationLanguage] = useState(lang);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);

  const t = TRANSLATIONS[lang] as any;

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        setCurrentUser(auth.currentUser);
        try {
          setLoading(true);
          const data = await getUserProfile(auth.currentUser.uid);
          if (data) {
            setProfile(data);
            setDisplayName(data.displayName || auth.currentUser.displayName || '');
            setMaritalStatus(data.maritalStatus || 'notSpecified');
            setNotificationLanguage(data.notificationLanguage || lang);
            setEmailNotificationsEnabled(data.emailNotificationsEnabled !== false);
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

  const handleSave = async () => {
    if (!auth.currentUser) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      await updateUserProfile(auth.currentUser.uid, {
        displayName,
        maritalStatus,
        notificationLanguage,
        emailNotificationsEnabled,
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
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]"
      >
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white shrink-0 relative overflow-hidden">
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
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <ShieldCheck size={12} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{(t as any).userSettings}</h2>
                <p className="text-slate-400 text-xs font-bold mt-1 tracking-wider uppercase opacity-80">
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
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={40} className="text-emerald-500 animate-spin mb-4" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">{(t as any).loading || 'Loading...'}</p>
            </div>
          ) : (
            <>
              {/* Profile Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-slate-100 rounded-xl">
                    <User size={18} className="text-slate-600" />
                  </div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{(t as any).profile}</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                      {lang === 'bn' ? 'পুরো নাম' : lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input 
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-5 py-3.5 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 focus:border-emerald-500 outline-none transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">
                      {(t as any).maritalStatus}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['single', 'married', 'divorced', 'widowed', 'notSpecified'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setMaritalStatus(status)}
                          className={`px-4 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-tight transition-all flex items-center justify-between group ${
                            maritalStatus === status 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                              : 'border-white bg-white hover:border-slate-200 text-slate-500'
                          }`}
                        >
                          {(t as any)[status]}
                          {maritalStatus === status && <Check size={14} className="text-emerald-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Preferences Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="p-2 bg-slate-100 rounded-xl">
                    <Globe size={18} className="text-slate-600" />
                  </div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{lang === 'bn' ? 'পছন্দসমূহ' : 'Preferences'}</h3>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <Bell size={14} className="text-slate-400" />
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {(t as any).preferredLang}
                      </label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['bn', 'en', 'ar'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setNotificationLanguage(l)}
                          className={`px-3 py-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-tight transition-all ${
                            notificationLanguage === l 
                              ? 'border-blue-500 bg-blue-50 text-blue-800' 
                              : 'border-white bg-white hover:border-slate-200 text-slate-500'
                          }`}
                        >
                          {l === 'bn' ? 'বাংলা' : l === 'en' ? 'English' : 'العربية'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-slate-400" />
                          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                            {t.emailNotifications}
                          </h4>
                        </div>
                        <p className="text-[10px] font-semibold text-slate-400 leading-tight">
                          {t.emailNotificationsDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => setEmailNotificationsEnabled(!emailNotificationsEnabled)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          emailNotificationsEnabled ? 'bg-emerald-500' : 'bg-slate-300'
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

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                    <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
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
                    className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600"
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
                    className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600"
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
        <div className="p-8 bg-slate-50 border-t border-slate-100 shrink-0 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-rose-50 hover:border-rose-100 hover:text-rose-600 active:scale-95 transition-all"
          >
            <LogOut size={16} />
            {(t as any).logout || 'Logout'}
          </button>
          <button 
            onClick={handleSave}
            disabled={saving || loading}
            className="flex-[2] flex items-center justify-center gap-3 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-100 disabled:opacity-50 active:scale-95 transition-all group"
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
