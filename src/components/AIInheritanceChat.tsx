/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, Scale as ScaleIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { CalculationStep, HEIRS } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIInheritanceChatProps {
  lang: 'bn' | 'en' | 'ar';
  isOpen: boolean;
  onClose: () => void;
  deceasedName?: string;
  country?: string;
  madhhab?: string;
  assets?: {
    land: number;
    money: number;
    gold: number;
    silver: number;
  };
  heirs?: Record<string, number>;
  heirNames?: Record<string, string[]>;
  calculationSteps?: CalculationStep[];
  isDarkMode?: boolean;
}

const AIInheritanceChat: React.FC<AIInheritanceChatProps> = ({ 
  lang, 
  isOpen, 
  onClose,
  deceasedName,
  country,
  madhhab,
  assets,
  heirs,
  heirNames,
  calculationSteps = [],
  isDarkMode
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const t = {
    title: lang === 'bn' ? 'এআই উত্তরাধিকার সহকারী' : lang === 'ar' ? 'مساعد الميراث الذكي' : 'Inheritance AI Assistant',
    subtitle: lang === 'bn' ? 'উত্তরাধিকার বিষয়ক যে কোনো প্রশ্ন করুন' : lang === 'ar' ? 'اسأل أي سؤال عن الميراث' : 'Ask anything about inheritance',
    placeholder: lang === 'bn' ? 'আপনার প্রশ্ন লিখুন...' : lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question...',
    welcome: lang === 'bn' ? 'আসসালামু আলাইকুম! আমি উত্তরাধিকার বিষয়ক সহকারী। আমি আপনাকে ইসলামী উত্তরাধিকার আইন সম্পর্কে তথ্য দিতে পারি। আপনি কী জানতে চান?' : 
              lang === 'ar' ? 'السلام عليكم! أنا مساعد الميراث. يمكنني تزويدك بمعلومات حول قوانين الميراث الإسلامية. ماذا تريد أن تعرف؟' : 
              "As-salamu alaykum! I'm your Inheritance Assistant. I can provide information about Islamic inheritance laws. What would you like to know?",
    refusal: lang === 'bn' ? 'দুঃখিত, আমি শুধুমাত্র ইসলামী উত্তরাধিকার বিষয়ক প্রশ্নের উত্তর দিতে পারি।' : 
              lang === 'ar' ? 'عذراً، يمكنني الإجابة فقط على الأسئلة المتعلقة بالميراث الإسلامي.' : 
              "I apologize, but I can only answer questions related to Islamic inheritance law.",
  };

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([{ role: 'assistant', content: t.welcome }]);
    }
  }, [isOpen, messages.length, t.welcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      // Filter calculation steps relevant to the user query
      const relevantSteps = calculationSteps.filter(step => {
        const queryLower = userMessage.toLowerCase();
        // Check if heir names related to the step are mentioned in the query
        const matchesHeirId = step.heirIds.some(id => {
          const heir = HEIRS.find(h => h.id === id);
          if (!heir) return false;
          return queryLower.includes(heir.nameEn.toLowerCase()) || 
                 queryLower.includes(heir.nameBn.toLowerCase()) || 
                 queryLower.includes(heir.nameAr.toLowerCase()) ||
                 queryLower.includes(id.toLowerCase());
        });
        
        // Also check if text itself contains keywords
        const keywords = ['share', 'calculate', 'portion', 'division', 'অংশ', 'হিসাব', 'বণ্টন', 'نصيب', 'حساب', 'توزيع'];
        const matchesKeyword = keywords.some(k => queryLower.includes(k) && step.text.toLowerCase().includes(k));
        
        return matchesHeirId || matchesKeyword;
      });

      const context = {
        deceasedInfo: {
          name: deceasedName || null,
          country: country || null,
          madhhab: madhhab || null,
        },
        assets: assets ? {
          land: assets.land,
          money: assets.money,
          gold: assets.gold,
          silver: assets.silver,
        } : null,
        heirs: heirs ? Object.entries(heirs)
          .filter(([_, count]) => count > 0)
          .map(([id, count]) => ({
            type: id,
            count: count,
            individualNames: heirNames?.[id]?.filter(Boolean) || []
          })) : [],
        relevantCalculationSteps: relevantSteps.length > 0 ? relevantSteps.map(s => s.text) : calculationSteps.map(s => s.text)
      };

      const contextStr = (deceasedName || country || madhhab || heirs || assets) 
        ? `\n\nCURRENT CALCULATION STATE (JSON):\n${JSON.stringify(context, null, 2)}\n\nUse this data to provide contextually accurate advice and explain the calculation steps if the user asks. If relevantSteps are provided, prioritize explaining those.` 
        : "";

      const systemInstruction = `You are a specialized AI assistant for Islamic Inheritance (Ilm al-Fara'id). Your name is 'Heritage Matrix Assistant'. 
You only answer questions related to Islamic inheritance laws, distribution of assets, rights of heirs, and related jurisprudence.
If a user asks about anything else (e.g., general cooking, politics, sports, general religion outside of inheritance), politely refuse and explain that you can only help with Islamic inheritance matters.
Provide answers in the same language as the user's query (Bengali, English, or Arabic).
Base your calculations and rules on standard Islamic jurisprudence (Hanafi, Hanbali, Shafi'i, Maliki) where applicable, and mention differences if the user asks.
Keep your answers accurate and grounded in Islamic law.
Respond concisely but thoroughly where needed. Use the provided CURRENT CALCULATION STATE JSON to tailor your response if the user asks about their specific case.${contextStr}`;

      const chat = ai.chats.create({
        model: model,
        config: {
          systemInstruction: systemInstruction,
        },
        history: messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] pointer-events-none md:p-6 lg:p-8 flex items-end justify-end">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="w-full h-[100dvh] md:h-[600px] md:w-[400px] bg-white dark:bg-slate-900 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800 pointer-events-auto transition-colors"
            >
              {/* Header */}
              <div className="bg-emerald-600 p-4 text-white shrink-0 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400 rounded-full -ml-8 -mb-8 blur-2xl" />
                </div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center ring-2 ring-white/30">
                      <ScaleIcon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-tight leading-tight">{t.title}</h3>
                      <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest opacity-80">{t.subtitle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50 transition-colors"
              >
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                        message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                        message.role === 'user' 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none font-medium'
                      }`}>
                        <div className="markdown-body dark:prose-invert prose-sm max-w-none">
                          <Markdown>{message.content}</Markdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[85%] flex-row">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Bot size={16} />
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        <span className="text-xs font-bold uppercase tracking-widest">{lang === 'bn' ? 'চিন্তা করছি...' : lang === 'ar' ? 'يفكر...' : 'Thinking...'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
                <div className="relative group">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.placeholder}
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-100 dark:bg-slate-800 border-2 border-transparent rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:bg-white dark:focus:bg-slate-700 focus:border-emerald-500 transition-all shadow-inner"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 top-1.5 h-10 w-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale shadow-sm"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Sparkles size={10} className="text-emerald-500" />
                  <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                    AI Powered Inheritance Consultation
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIInheritanceChat;
