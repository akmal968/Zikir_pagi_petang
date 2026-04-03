import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, BookOpen, ChevronUp } from 'lucide-react';
import { DzikirItem } from './types';
import dzikirData from './data/dzikir.json';
import DzikirCard from './components/DzikirCard';

type TabType = 'pagi' | 'petang' | 'sholat' | 'sholat2';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('pagi');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveData = (): DzikirItem[] => {
    switch (activeTab) {
      case 'pagi': return dzikirData.dzikir_pagi as DzikirItem[];
      case 'petang': return dzikirData.dzikir_petang as DzikirItem[];
      case 'sholat': return dzikirData.dzikir_setelah_sholat as DzikirItem[];
      case 'sholat2': return dzikirData.dzikir_sholat_sunnah as DzikirItem[];
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-xl text-white">
                <BookOpen size={24} />
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-800 notranslate" translate="no">Dzikir Daily</h1>
                <p className="text-xs text-slate-500 font-medium">Panduan Zikir Sesuai Sunnah</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pagi')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'pagi' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sun size={18} />
              Pagi
            </button>
            <button
              onClick={() => setActiveTab('petang')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'petang' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Moon size={18} />
              Petang
            </button>
            <button
              onClick={() => setActiveTab('sholat')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'sholat' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen size={18} />
              Sholat
            </button>
            <button
              onClick={() => setActiveTab('sholat2')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'sholat2' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen size={18} />
              Sholat II
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 capitalize">
                {activeTab === 'sholat' ? 'Dzikir Setelah Sholat' : 
                 activeTab === 'sholat2' ? 'Dzikir Sholat (Sunnah)' : 
                 `Dzikir ${activeTab}`}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'pagi' && "Dibaca setelah shubuh hingga terbit matahari."}
                {activeTab === 'petang' && "Dibaca setelah ashar hingga terbenam matahari."}
                {activeTab === 'sholat' && "Panduan lengkap integrasi berbagai tradisi di Indonesia."}
                {activeTab === 'sholat2' && "Panduan zikir setelah shalat fardhu sesuai sunnah Rasulullah ﷺ."}
              </p>
            </div>

            <div className="space-y-6">
              {getActiveData().map((item, index) => (
                <DzikirCard key={item.id} item={item} index={index} />
              ))}
            </div>

            {activeTab === 'sholat' && dzikirData.tambahan_tradisi && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-100"
              >
                <h3 className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Catatan Tradisi di Indonesia
                </h3>
                <div className="space-y-4 text-sm text-emerald-900/80 leading-relaxed">
                  <div>
                    <span className="font-bold text-emerald-700">Nahdlatul Ulama (NU):</span> {dzikirData.tambahan_tradisi.Nahdlatul_Ulama}
                  </div>
                  <div>
                    <span className="font-bold text-emerald-700">Muhammadiyah:</span> {dzikirData.tambahan_tradisi.Muhammadiyah}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="max-w-2xl mx-auto px-4 py-8 text-center border-t border-slate-200 mt-12">
        <p className="text-slate-400 text-xs">
          &copy; 2026 Dzikir Daily. Dikutip dari berbagai sumber shahih.
        </p>
      </footer>

      {/* Scroll Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors z-50"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
