
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { NavigationHub } from './components/NavigationHub';
import { AmbientBackground } from './components/AmbientBackground';
import { Projects } from './components/Projects';
import { Mentorship } from './components/Mentorship';
import { Security } from './components/Security';
import { JoinUs } from './components/JoinUs';
import { AlgoNight } from './components/AlgoNight';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AppView = 'home' | 'projects' | 'mentorship' | 'security' | 'join' | 'algo-night';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('home');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on view change
    window.scrollTo(0, 0);
  }, [currentView]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    setIsHubOpen(false);
  };

  return (
    <div className={`relative min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00FFFF] selection:text-[#0a0a0a] ${isHubOpen ? 'overflow-hidden h-screen' : ''}`}>
      <AmbientBackground />
      
      <div className="relative z-10">
        <Navbar 
          onInitialize={() => setIsHubOpen(true)} 
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />
        
        <main>
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Hero onOpenHub={() => setIsHubOpen(true)} />
                <About />
                <Events />
              </motion.div>
            )}

            {currentView === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Projects />
              </motion.div>
            )}

            {currentView === 'mentorship' && (
              <motion.div
                key="mentorship"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Mentorship />
              </motion.div>
            )}

            {currentView === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <Security />
              </motion.div>
            )}

            {currentView === 'algo-night' && (
              <motion.div
                key="algo-night"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlgoNight />
              </motion.div>
            )}

            {currentView === 'join' && (
              <motion.div
                key="join"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
              >
                <JoinUs />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {isHubOpen && (
          <NavigationHub 
            onClose={() => setIsHubOpen(false)} 
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && !isHubOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-8 p-3 bg-[#0a0a0a] border border-[#00FFFF]/30 text-[#00FFFF] rounded-full hover:bg-[#00FFFF]/10 transition-colors z-40 neon-glow-cyan"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
