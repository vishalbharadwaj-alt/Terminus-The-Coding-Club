
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ParticleNetwork } from './ParticleNetwork';
import { Terminal, Cpu, Shield, Globe, Zap, Activity, Code } from 'lucide-react';

interface HeroProps {
  onOpenHub: () => void;
}

const GlitchText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      {/* Main Text with Advanced Neon Pulse */}
      <motion.h1 
        animate={{ 
          textShadow: [
            "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)",
            "0 0 20px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)",
            "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)"
          ],
          opacity: [0.9, 1, 0.9]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl md:text-9xl font-mono font-black tracking-tighter text-[#00FFFF] relative z-10 select-none"
      >
        {text}
      </motion.h1>

      {/* Glitch Layer 1 - Red Shift */}
      <motion.h1
        className="absolute top-0 left-0 text-7xl md:text-9xl font-mono font-black tracking-tighter text-red-500/30 z-0 pointer-events-none select-none"
        animate={{
          x: [-2, 2, -1, 3, 0],
          y: [1, -1, 2, 0],
          opacity: [0, 0.2, 0, 0.4, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.h1>

      {/* Glitch Layer 2 - Blue Shift */}
      <motion.h1
        className="absolute top-0 left-0 text-7xl md:text-9xl font-mono font-black tracking-tighter text-blue-500/30 z-0 pointer-events-none select-none"
        animate={{
          x: [2, -2, 1, -3, 0],
          y: [-1, 1, -2, 0],
          opacity: [0, 0.2, 0, 0.4, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 4.5,
        }}
      >
        {text}
      </motion.h1>

      {/* Static Noise Overlay inside text */}
      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    "LOG: Initializing Terminus Kernel v2.5.0...",
    "SYS: Checking neural link stability... OK",
    "NET: Establishing encrypted handshake... 0xAF32",
    "SEC: Bypassing legacy firewall protocols...",
    "MEM: Allocating buffer for visual stream...",
    "IO: Mounting project repository partitions...",
    "UPLINK: Syncing with global arena nodes...",
    "AUTH: Identity confirmed. Access level: ELITE",
    "OS: Ready for execution."
  ];

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < bootMessages.length) {
        setLogs(prev => [...prev, bootMessages[currentLog]]);
        currentLog++;
      }
    }, 180);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 md:p-12 font-mono overflow-hidden"
    >
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-2xl w-full space-y-8">
        <div className="flex justify-between items-center text-[#00FFFF] text-[10px] tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Activity size={14} className="animate-pulse" />
            <span>Core_Sync_Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF7F]" />
            <span>Latency: 4ms</span>
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-xl p-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
            <motion.div 
              style={{ width: `${progress}%` }}
              className="h-full bg-[#00FFFF] shadow-[0_0_10px_#00FFFF]"
            />
          </div>

          <div className="space-y-1 h-48 overflow-y-auto scrollbar-hide">
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs ${log.includes('OK') || log.includes('Ready') ? 'text-[#00FF7F]' : 'text-white/40'}`}
              >
                {log}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [0, 1] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-[#00FFFF]/50 inline-block align-middle ml-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Terminal, label: "Kernel" },
            { icon: Cpu, label: "Neural" },
            { icon: Shield, label: "Vault" },
            { icon: Globe, label: "Uplink" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`p-3 rounded-lg border transition-colors ${progress > (i + 1) * 20 ? 'border-[#00FFFF]/30 text-[#00FFFF] bg-[#00FFFF]/5' : 'border-white/5 text-white/10'}`}>
                <item.icon size={20} />
              </div>
              <span className="text-[8px] uppercase tracking-tighter text-white/20">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-10 left-10 text-white/10 text-[8px] uppercase tracking-[0.5em] hidden lg:block">
        Sector_7G // Nodes_Offline
      </div>
      <div className="absolute bottom-10 right-10 text-white/10 text-[8px] uppercase tracking-[0.5em] hidden lg:block">
        Terminus_Core // Stable_State
      </div>
    </motion.div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenHub }) => {
  const [isWarping, setIsWarping] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleInitialize = () => {
    setIsWarping(true);
    
    // First Stage: Warp the particles
    setTimeout(() => {
      setShowBootSequence(true);
    }, 1000);
  };

  const handleBootComplete = () => {
    setShowFlash(true);
    setTimeout(() => {
      onOpenHub();
      // Reset for next visit
      setTimeout(() => {
        setIsWarping(false);
        setShowBootSequence(false);
        setShowFlash(false);
      }, 500);
    }, 200);
  };

  const glitchAnimation: Variants = {
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
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background with Grid and Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <ParticleNetwork isWarping={isWarping} />
      
      <AnimatePresence>
        {!isWarping && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              variants={glitchAnimation}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <GlitchText text="TERMINUS_" />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4 text-sm md:text-lg font-mono tracking-[0.4em] text-[#00FF7F] uppercase"
              >
                <div className="w-12 h-px bg-current opacity-20" />
                <span>Initialize Future</span>
                <div className="w-12 h-px bg-current opacity-20" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12"
              >
                <button 
                  onClick={handleInitialize}
                  className="group relative px-10 py-5 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold text-xl rounded-lg hover:neon-glow-green transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap size={20} className="fill-current" /> Initialize_Protocol
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBootSequence && (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[150]"
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[10px] font-mono uppercase tracking-[0.5em] animate-pulse">Scroll_To_Observe</span>
        <div className="w-px h-16 bg-gradient-to-b from-[#00FFFF] to-transparent rounded-full" />
      </div>
    </section>
  );
};
