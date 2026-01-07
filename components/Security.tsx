
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Lock, Eye, Terminal, ChevronRight } from 'lucide-react';

const WargameItem = ({ title, level, category }: any) => (
  <div className="group flex items-center justify-between p-4 border border-red-900/20 bg-red-950/5 hover:bg-red-950/20 transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-1 h-8 bg-red-600/30 group-hover:bg-red-600 transition-colors" />
      <div>
        <h4 className="font-mono text-sm text-red-500 font-bold tracking-tighter uppercase">{title}</h4>
        <p className="text-[10px] text-red-900 uppercase font-mono tracking-widest">{category}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono text-red-600/50 uppercase">Difficulty: {level}</span>
      <ChevronRight size={14} className="text-red-900 group-hover:text-red-500 transition-colors" />
    </div>
  </div>
);

export const Security: React.FC = () => {
  const [accessDenied, setAccessDenied] = useState(false);

  const triggerGlitch = () => {
    setAccessDenied(true);
    setTimeout(() => setAccessDenied(false), 2000);
  };

  return (
    <div className="relative pt-24 pb-32 px-6 md:px-24 bg-[#0a0a0a]">
      {/* Background Warning Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f00 0, #f00 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <Shield size={20} className="animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.5em]">White_Hat Protocol Active</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">Red_Force</h1>
          </div>
          
          <div className="flex gap-4">
            <button onClick={triggerGlitch} className="px-6 py-2 border border-red-600 text-red-600 font-mono text-xs uppercase hover:bg-red-600 hover:text-white transition-all">
              Initialize Breach
            </button>
            <button className="px-6 py-2 bg-red-600 text-white font-mono text-xs uppercase hover:bg-red-700 transition-all">
              Secure Node
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-12">
            <div className="p-8 border border-red-900/30 bg-[#0c0c0c] relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-red-900">
                REF: 0xFF2A-SECURITY
              </div>
              <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2 uppercase">
                <Eye size={20} /> Active_Wargames
              </h2>
              <div className="space-y-2">
                <WargameItem title="Binary_Exploit_01" level="Advanced" category="Reverse Engineering" />
                <WargameItem title="Spectral_Shadow" level="Elite" category="Side-Channel Attacks" />
                <WargameItem title="SQL_Injection_V3" level="Beginner" category="Web Security" />
                <WargameItem title="Wi-Fi_Cracker_Beta" level="Intermediate" category="Network Defense" />
                <WargameItem title="Buffer_Overflow_Lab" level="Advanced" category="Memory Safety" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-white/5 bg-[#0f0f0f]">
                <h3 className="text-sm font-mono text-white/40 uppercase mb-4 tracking-widest">Global Status</h3>
                <div className="space-y-4">
                  {[
                    { label: "Uptime", val: "99.98%" },
                    { label: "Threats Blocked", val: "1,429" },
                    { label: "Nodes Online", val: "84" }
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] text-white/20 uppercase">{item.label}</span>
                      <span className="font-mono text-sm text-red-500">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border border-white/5 bg-[#0f0f0f] relative group cursor-help">
                <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-sm font-mono text-white/40 uppercase mb-4 tracking-widest">Admin Authorization</h3>
                <div className="flex flex-col items-center justify-center py-4">
                  <Lock size={32} className="text-red-900 group-hover:text-red-600 transition-colors mb-2" />
                  <span className="text-[10px] text-white/20 uppercase text-center">Biometric Scan Required</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Alerts */}
          <div className="space-y-8">
            <div className="p-6 border-l-4 border-red-600 bg-red-600/5">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <AlertTriangle size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">Alerts</span>
              </div>
              <div className="space-y-4 font-mono text-[11px] leading-tight">
                <div className="text-white/60">
                  [12:04:12] Unauthorized access attempt detected at Node_Alpha. IP trace: 192.168.1.104
                </div>
                <div className="text-red-500/80">
                  [12:08:45] CRITICAL: Database integrity check failed. Initializing recovery.
                </div>
                <div className="text-white/60">
                  [12:15:30] System heartbeat stable. All subsystems operational.
                </div>
              </div>
            </div>

            <div className="p-6 border border-white/5 bg-[#0f0f0f]">
              <h3 className="text-xs font-mono text-white/40 uppercase mb-6 tracking-widest">Top Operatives</h3>
              <div className="space-y-4">
                {['Neo88', 'Cipher_X', 'Ghost_In_Shell', 'Zero_Day'].map((name, i) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-[10px] text-white/20 font-mono">0{i+1}</span>
                    <div className="flex-1 text-xs font-mono text-white/70">{name}</div>
                    <div className="text-[10px] font-mono text-red-600">8.4k PT</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {accessDenied && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-red-600 flex flex-col items-center justify-center text-white p-12 overflow-hidden"
          >
            <motion.h1 
              animate={{ x: [-10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="text-8xl font-black uppercase tracking-tighter italic"
            >
              Access_Denied
            </motion.h1>
            <p className="font-mono text-sm uppercase tracking-[0.5em] mt-8">Breach Protocol Terminated by Root</p>
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="h-px bg-white w-full my-4" style={{ marginTop: `${Math.random() * 100}%` }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
