
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleNetwork } from './ParticleNetwork';

interface HeroProps {
  onOpenHub: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHub }) => {
  const [isWarping, setIsWarping] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleInitialize = () => {
    setIsWarping(true);
    
    // Trigger the sequence
    setTimeout(() => {
      setShowFlash(true);
      setTimeout(() => {
        onOpenHub();
        // Reset states for when they come back
        setTimeout(() => {
          setIsWarping(false);
          setShowFlash(false);
        }, 500);
      }, 150);
    }, 1200);
  };

  const glitchAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <ParticleNetwork isWarping={isWarping} />
      
      <AnimatePresence>
        {!isWarping && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              variants={glitchAnimation}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-8xl font-mono font-bold tracking-tighter neon-text-cyan relative">
                <span className="relative">
                  TERMINUS_
                  <span className="absolute top-0 left-0 -ml-1 text-[#00FFFF]/30 animate-pulse">TERMINUS_</span>
                </span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-lg font-mono tracking-[0.3em] text-[#00FF7F]/80 uppercase"
              >
                Initializing Terminus System...
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <button 
                  onClick={handleInitialize}
                  className="group relative px-8 py-4 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold text-lg rounded-md hover:neon-glow-green transition-all duration-300"
                >
                  <span className="relative z-10">Initialize ></span>
                  <div className="absolute inset-0 bg-[#00FF7F] rounded-md blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <div className="w-1 h-12 bg-gradient-to-b from-[#00FFFF] to-transparent rounded-full" />
      </div>
    </section>
  );
};
