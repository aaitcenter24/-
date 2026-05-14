/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Compass, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  AlertCircle,
  RefreshCw,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CloudSun,
  Search,
  X as CloseIcon
} from 'lucide-react';

interface PrayerTimesData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface SpiritualToolsProps {
  lang: 'bn' | 'en' | 'ar';
  country?: string;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

const KAABA_COORDS = { lat: 21.4225, lng: 39.8262 };

const SpiritualTools: React.FC<SpiritualToolsProps> = ({ lang, country, isOpen, onClose, isDarkMode }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [addressInput, setAddressInput] = useState<string>('');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'prayer' | 'qibla'>('prayer');

  const t = {
    title: lang === 'bn' ? 'আধ্যাত্মিক সরঞ্জাম' : lang === 'ar' ? 'الأدوات الروحية' : 'Spiritual Tools',
    prayerTimes: lang === 'bn' ? 'নামাজের সময়' : lang === 'ar' ? 'أوقات الصلاة' : 'Prayer Times',
    qibla: lang === 'bn' ? 'কিবলা' : lang === 'ar' ? 'القبلة' : 'Qibla',
    fajr: lang === 'bn' ? 'ফজর' : lang === 'ar' ? 'الفجر' : 'Fajr',
    dhuhr: lang === 'bn' ? 'যোহর' : lang === 'ar' ? 'الظهر' : 'Dhuhr',
    asr: lang === 'bn' ? 'আসর' : lang === 'ar' ? 'العصر' : 'Asr',
    maghrib: lang === 'bn' ? 'মাগরিব' : lang === 'ar' ? 'المغرب' : 'Maghrib',
    isha: lang === 'bn' ? 'এশা' : lang === 'ar' ? 'العشاء' : 'Isha',
    currentLocation: lang === 'bn' ? 'বর্তমান অবস্থান' : lang === 'ar' ? 'الموقع الحالي' : 'Current Location',
    detectLocation: lang === 'bn' ? 'অবস্থান শনাক্ত করুন' : lang === 'ar' ? 'تحديد الموقع' : 'Detect Location',
    searchPlaceholder: lang === 'bn' ? 'শহর বা ঠিকানা খুঁজুন...' : lang === 'ar' ? 'ابحث عن مدينة أو عنوان...' : 'Search city or address...',
    qiblaDegree: lang === 'bn' ? 'উত্তর থেকে কিবলা:' : lang === 'ar' ? 'القبلة من الشمال:' : 'Qibla from North:',
    loading: lang === 'bn' ? 'লোড হচ্ছে...' : lang === 'ar' ? 'جاري التحميل...' : 'Loading...',
    errorLocation: lang === 'bn' ? 'অবস্থান পাওয়া যায়নি' : lang === 'ar' ? 'فشل تحديد الموقع' : 'Location failed',
    errorAPI: lang === 'bn' ? 'তথ্য আনতে সমস্যা হয়েছে' : lang === 'ar' ? 'خطأ في جلب البيانات' : 'API error',
    searchButton: lang === 'bn' ? 'খুঁজুন' : lang === 'ar' ? 'بحث' : 'Search',
    locating: lang === 'bn' ? 'অবস্থান খুঁজছি...' : lang === 'ar' ? 'جاري تحديد الموقع...' : 'Locating...',
  };

  const calculateQibla = (lat: number, lng: number) => {
    const lat1 = lat * (Math.PI / 180);
    const lng1 = lng * (Math.PI / 180);
    const lat2 = KAABA_COORDS.lat * (Math.PI / 180);
    const lng2 = KAABA_COORDS.lng * (Math.PI / 180);

    const dLng = lng2 - lng1;
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * (180 / Math.PI);
    bearing = (bearing + 360) % 360;
    return bearing;
  };

  const fetchByAddress = async (address: string) => {
    if (!address.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(address)}&method=2`);
      const data = await response.json();
      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        const { latitude, longitude } = data.data.meta;
        setLocation({ lat: latitude, lng: longitude });
        setQiblaDirection(calculateQibla(latitude, longitude));
        setCityName(address);
      } else {
        setError(t.errorAPI);
      }
    } catch (err) {
      setError(t.errorAPI);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrayerTimes = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`);
      const data = await response.json();
      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setCityName(data.data.meta.timezone);
      } else {
        setError(t.errorAPI);
      }
    } catch (err) {
      setError(t.errorAPI);
    } finally {
      setLoading(false);
    }
  };

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setQiblaDirection(calculateQibla(latitude, longitude));
          fetchPrayerTimes(latitude, longitude);
        },
        (err) => {
          console.error(err);
          setError(t.errorLocation);
          setLoading(false);
        }
      );
    } else {
      setError(t.errorLocation);
    }
  };

  useEffect(() => {
    if (isOpen && !location) {
      detectLocation();
    }
  }, [isOpen]);

  const prayerIcons = {
    Fajr: Sunrise,
    Dhuhr: Sun,
    Asr: CloudSun,
    Maghrib: Sunset,
    Isha: Moon
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
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
        className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] transition-colors"
      >
        <div className="bg-emerald-600 p-5 text-white shrink-0 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Clock size={80} className="rotate-12" />
          </div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">{t.title}</h2>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-100 uppercase tracking-widest mt-1">
                <MapPin size={10} />
                {cityName || t.locating}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
          <button 
            onClick={() => setView('prayer')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${view === 'prayer' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-b-2 border-emerald-600 dark:border-emerald-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
          >
            <Clock size={16} />
            {t.prayerTimes}
          </button>
          <button 
            onClick={() => setView('qibla')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${view === 'qibla' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-b-2 border-emerald-600 dark:border-emerald-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
          >
            <Compass size={16} />
            {t.qibla}
          </button>
        </div>

        <div className="px-6 pt-6 shrink-0 transition-colors">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-emerald-500 transition-colors">
              <Search size={16} />
            </div>
            <input 
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchByAddress(addressInput)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-24 py-3.5 bg-slate-100 dark:bg-slate-800 border-2 border-transparent rounded-[1.25rem] text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:bg-white dark:focus:bg-slate-700 focus:border-emerald-500 transition-all shadow-inner"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {addressInput && (
                <button 
                  onClick={() => setAddressInput('')}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <CloseIcon size={14} />
                </button>
              )}
              <button 
                onClick={() => fetchByAddress(addressInput)}
                disabled={loading || !addressInput.trim()}
                className="h-10 px-4 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/40 disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:shadow-none transition-all"
              >
                {t.searchButton}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 transition-colors">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full py-12"
              >
                <Loader2 size={32} className="text-emerald-600 dark:text-emerald-400 animate-spin mb-4" />
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{t.loading}</p>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} />
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">{error}</p>
                <button 
                  onClick={detectLocation}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all"
                >
                  <RefreshCw size={14} />
                  {t.detectLocation}
                </button>
              </motion.div>
            ) : view === 'prayer' && prayerTimes ? (
              <motion.div 
                key="prayer-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-3"
              >
                {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as (keyof PrayerTimesData)[]).map(key => {
                  const Icon = prayerIcons[key];
                  return (
                    <div 
                      key={key} 
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl group hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">
                            {t[key.toLowerCase() as keyof typeof t]}
                          </p>
                          <p className="text-lg font-black text-slate-800 dark:text-slate-100 leading-none">
                            {formatTime(prayerTimes[key])}
                          </p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-200 dark:text-slate-700 group-hover:text-emerald-300" />
                    </div>
                  );
                })}
              </motion.div>
            ) : view === 'qibla' && qiblaDirection !== null ? (
              <motion.div 
                key="qibla-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center justify-center py-6"
              >
                <div className="relative w-48 h-48 mb-8">
                  <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/10 rounded-full flex items-center justify-center">
                    <Compass size={120} className="text-emerald-100 dark:text-emerald-900/30" />
                  </div>
                  <motion.div 
                    animate={{ rotate: qiblaDirection }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-1 h-32 bg-emerald-600 dark:bg-emerald-400 rounded-full">
                      <div className="absolute -top-1 -left-1.5 w-4 h-4 bg-emerald-600 dark:bg-emerald-400 rotate-45 rounded-sm" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-emerald-600 dark:border-emerald-400 rounded-full" />
                    </div>
                  </motion.div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[10px] font-black text-red-500 uppercase">N</div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{t.qiblaDegree}</p>
                  <p className="text-3xl font-black text-emerald-900 dark:text-emerald-200 tracking-tight">
                    {Math.round(qiblaDirection)}°
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
          <button 
            onClick={detectLocation}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            {t.detectLocation}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SpiritualTools;
