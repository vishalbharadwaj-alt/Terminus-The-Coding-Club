
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { NavigationHub } from './components/NavigationHub';
import { AmbientBackground } from './components/AmbientBackground';
import { Projects } from './components/Projects';
import { ProjectLibrary } from './components/ProjectLibrary';
import { Mentorship } from './components/Mentorship';
import { MentorshipSurvey } from './components/MentorshipSurvey';
import { Security } from './components/Security';
import { JoinUs } from './components/JoinUs';
import { AlgoNight } from './components/AlgoNight';
import { ArenaSurvey } from './components/ArenaSurvey';
import { PracticeLabs } from './components/PracticeLabs';
import { ContributionPortal } from './components/ContributionPortal';
import { SystemLogs } from './components/SystemLogs';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type AppView = 'home' | 'projects' | 'mentorship' | 'security' | 'join' | 'algo-night' | 'project-library' | 'contribution-portal' | 'mentorship-survey' | 'system-logs' | 'algo-arena-survey' | 'practice-labs';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    setIsHubOpen(false);
  };

  const triggerNetworkTransition = (targetView: AppView) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(targetView);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }, 1500);
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
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Hero onOpenHub={() => setIsHubOpen(true)} />
                <About />
                <Events onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <Projects onBrowse={() => triggerNetworkTransition('project-library')} />
              </motion.div>
            )}

            {currentView === 'project-library' && (
              <motion.div key="project-library" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProjectLibrary />
              </motion.div>
            )}

            {currentView === 'mentorship' && (
              <motion.div key="mentorship" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Mentorship onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'mentorship-survey' && (
              <motion.div key="mentorship-survey" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                <MentorshipSurvey onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'security' && (
              <motion.div key="security" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
                <Security />
              </motion.div>
            )}

            {currentView === 'system-logs' && (
              <motion.div key="system-logs" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <SystemLogs onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'algo-night' && (
              <motion.div key="algo-night" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AlgoNight onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'algo-arena-survey' && (
              <motion.div key="algo-arena-survey" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                <ArenaSurvey onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'practice-labs' && (
              <motion.div key="practice-labs" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
                <PracticeLabs onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentView === 'join' && (
              <motion.div key="join" initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }}>
                <JoinUs onNavigate={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentView === 'contribution-portal' && (
              <motion.div key="contribution-portal" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <ContributionPortal onNavigate={() => handleNavigate('home')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: i * 0.05, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent w-full"
                  style={{ top: `${(i / 20) * 100}%`, opacity: 0.3 }}
                />
              ))}
            </div>
            
            <div className="relative z-10 text-center">
              <motion.h2 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-2xl font-mono font-bold text-[#00FFFF] tracking-[0.5em] uppercase mb-4"
              >
                Uplinking_Data...
              </motion.h2>
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-[#00FF7F]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHubOpen && (
          <NavigationHub 
            onClose={() => setIsHubOpen(false)} 
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && !isHubOpen && !isTransitioning && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
