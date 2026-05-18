import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  MapPin, 
  Globe, 
  Briefcase, 
  ArrowRight, 
  MapPin as MapPinIcon,
  Mail,
  Lock,
  Phone,
  Building,
  CheckCircle2,
  ChevronRight,
  LogOut,
  User,
  ShieldCheck,
  X
} from 'lucide-react';
import { loginWithGoogle, auth, updateUserProfile } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface OnboardingProps {
  onComplete: () => void;
  isDarkMode?: boolean;
}

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", 
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", 
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", 
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", 
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const STAGES = [
  'SIGNUP',
  'LOCATION',
  'COUNTRY',
  'PROFESSION',
  'PROFILE_FORM'
] as const;

type Stage = typeof STAGES[number];

export default function Onboarding({ onComplete, isDarkMode }: OnboardingProps) {
  const [currentStage, setCurrentStage] = useState<Stage>('SIGNUP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isProfessional, setIsProfessional] = useState<boolean | null>(null);
  
  // Profile form
  const [profileData, setProfileData] = useState({
    name: '',
    address: '',
    email: '',
    mobile: '',
    designation: ''
  });

  const nextStep = () => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex < STAGES.length - 1) {
      // Logic for conditional skipping or branching
      if (currentStage === 'PROFESSION') {
        if (isProfessional) {
          setCurrentStage('PROFILE_FORM');
        } else {
          handleFinish();
        }
      } else {
        setCurrentStage(STAGES[currentIndex + 1]);
      }
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    if (auth.currentUser) {
      await updateUserProfile(auth.currentUser.uid, {
        onboardingCompleted: true
      });
    }
    onComplete();
  };

  const skipAll = () => {
    handleFinish();
  };

  React.useEffect(() => {
    if (auth.currentUser && currentStage === 'SIGNUP') {
      setCurrentStage('LOCATION');
    }
  }, [auth.currentUser, currentStage]);

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      nextStep();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      nextStep();
    } catch (err: any) {
      setError(err.message || 'Auth failed');
    } finally {
      setLoading(false);
    }
  };

  const requestLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted", position);
          setLoading(false);
          nextStep();
        },
        (err) => {
          console.error("Location access denied", err);
          setLoading(false);
          nextStep(); // Continue even if denied
        }
      );
    } else {
      setLoading(false);
      nextStep();
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (auth.currentUser) {
        await updateUserProfile(auth.currentUser.uid, {
          displayName: profileData.name,
          ...profileData, // Use existing helper or extend it
        } as any);
      }
      onComplete();
    } catch (err: any) {
      setError(err.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 relative overflow-hidden"
      >
        {/* Skip All Link */}
        <button 
          onClick={skipAll}
          className="absolute top-6 right-8 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 uppercase tracking-widest transition-colors flex items-center gap-1 group"
        >
          Skip All
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        <AnimatePresence mode="wait">
          {currentStage === 'SIGNUP' && (
            <motion.div 
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                  <UserPlus size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Create Account</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Join Heritage Matrix to manage your land and property records efficiently.</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all active:scale-[0.98] shadow-sm"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Or email</span>
                  <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="password"
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : isLoginMode ? 'Sign In' : 'Sign Up'}
                  </button>
                </form>

                <button 
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="w-full text-center text-xs font-bold text-slate-400 hover:text-emerald-500 transition-colors py-2"
                >
                  {isLoginMode ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </button>
              </div>

              <div className="pt-4 flex justify-center">
                <button onClick={nextStep} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  Continue without saving
                </button>
              </div>
            </motion.div>
          )}

          {currentStage === 'LOCATION' && (
            <motion.div 
              key="location"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Access Location</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                  We use your location to provide accurate property data and map insights.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button 
                  onClick={requestLocation}
                  disabled={loading}
                  className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-200 dark:shadow-blue-900/20"
                >
                  {loading ? 'Requesting...' : 'Grant Permission'}
                </button>
                <button 
                  onClick={nextStep}
                  className="w-full h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Skip for now
                </button>
              </div>
            </motion.div>
          )}

          {currentStage === 'COUNTRY' && (
            <motion.div 
              key="country"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-4">
                  <Globe size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Select Country</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Choose your country to personalize your property legal framework.</p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-emerald-500 rounded-xl text-sm font-bold appearance-none transition-all outline-none"
                  >
                    <option value="" disabled>Select your country</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none rotate-90" />
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={nextStep}
                    disabled={!selectedCountry}
                    className="w-full h-12 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 disabled:opacity-50 disabled:grayscale"
                  >
                    Continue
                  </button>
                  <button 
                    onClick={nextStep}
                    className="w-full h-12 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-bold hover:text-slate-700 dark:hover:text-slate-200 transition-all"
                  >
                    Skip
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStage === 'PROFESSION' && (
            <motion.div 
              key="profession"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Briefcase size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Professional Role</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                  Are you a Lawyer, Surveyor, or Amin? This helps us tailor your tools.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => { setIsProfessional(true); setCurrentStage('PROFILE_FORM'); }}
                  className="group p-6 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-100 dark:border-emerald-800/50 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl transition-all"
                >
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="font-black text-emerald-900 dark:text-emerald-100 text-sm">Yes, I am</div>
                </button>

                <button 
                  onClick={() => onComplete()}
                  className="group p-6 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500 rounded-2xl transition-all"
                >
                  <div className="w-10 h-10 bg-slate-400 text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <X size={20} />
                  </div>
                  <div className="font-black text-slate-900 dark:text-slate-100 text-sm">No, I'm not</div>
                </button>
              </div>

              <div className="pt-4 flex justify-center">
                <button onClick={onComplete} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  Skip this step
                </button>
              </div>
            </motion.div>
          )}

          {currentStage === 'PROFILE_FORM' && (
            <motion.div 
              key="profile-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Professional Profile</h2>
                  <p className="mt-1 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">Complete your details</p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Name / Organisation</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      required
                      placeholder="e.g. John Doe & Associates"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full h-11 pl-11 bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Address</label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      required
                      placeholder="Building, Street, City"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="w-full h-11 pl-11 bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="email"
                        required
                        placeholder="email@example.com"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full h-11 pl-11 bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        required
                        placeholder="+1 234 567 890"
                        value={profileData.mobile}
                        onChange={(e) => setProfileData({...profileData, mobile: e.target.value})}
                        className="w-full h-11 pl-11 bg-slate-50 dark:bg-slate-950 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Designation</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Lawyer', 'Surveyor', 'Amin'].map(role => (
                      <button 
                        key={role}
                        type="button"
                        onClick={() => setProfileData({...profileData, designation: role})}
                        className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                          profileData.designation === role 
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30' 
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    type="submit"
                    disabled={loading || !profileData.designation || !profileData.name}
                    className="w-full h-12 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit & Start'}
                  </button>
                  <button 
                    type="button"
                    onClick={onComplete}
                    className="w-full h-11 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-750 transition-all"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Dots */}
        <div className="mt-8 flex justify-center gap-1.5">
          {STAGES.map((s, i) => (
            <div 
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${
                STAGES.indexOf(currentStage) === i 
                  ? 'w-6 bg-emerald-500' 
                  : STAGES.indexOf(currentStage) > i 
                    ? 'w-2 bg-emerald-200 dark:bg-emerald-800' 
                    : 'w-1 bg-slate-100 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
