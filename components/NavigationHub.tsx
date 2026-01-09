
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Terminal, Book, Code, Users, Cpu, Activity, Globe, UserCheck, Lock } from 'lucide-react';
import { AppView, UserRole } from '../App';

interface NavigationHubProps {
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  userRole: UserRole;
}

const HubNode = ({ icon: Icon, label, description, delay, onClick, restricted, userRole }: any) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.4, type: "spring" }}
    whileHover={{ scale: 1.05, borderColor: restricted && userRole !== 'ADMIN' ? "rgba(239, 68, 68, 0.4)" : "rgba(0, 255, 255, 0.6)" }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`relative group flex flex-col items-center justify-center p-6 bg-[#111]/60 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300 w-full ${restricted && userRole !== 'ADMIN' ? 'hover:bg-red-500/5' : 'hover:bg-[#00FFFF]/5'}`}
  >
    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-${restricted && userRole !== 'ADMIN' ? 'red-500' : '[#00FFFF]'}`} />
    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-${restricted && userRole !== 'ADMIN' ? 'red-500' : '[#00FFFF]'}`} />
    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-${restricted && userRole !== 'ADMIN' ? 'red-500' : '[#00FFFF]'}`} />
    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-${restricted && userRole !== 'ADMIN' ? 'red-500' : '[#00FFFF]'}`} />
    
    <div className={`mb-4 ${restricted && userRole !== 'ADMIN' ? 'text-red-500/40' : 'text-[#00FFFF] group-hover:neon-text-cyan'} transition-all`}>
      {restricted && userRole !== 'ADMIN' ? <Lock size={32} /> : <Icon size={32} />}
    </div>
    
    <span className="font-mono text-sm font-bold text-white group-hover:text-white transition-colors">{label}</span>
    <span className={`text-[10px] uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${restricted && userRole !== 'ADMIN' ? 'text-red-500' : 'text-white/30'}`}>
      {restricted && userRole !== 'ADMIN' ? 'Access Restricted' : description}
    </span>
  </motion.button>
);

export const NavigationHub: React.FC<NavigationHubProps> = ({ onClose, onNavigate, userRole }) => {
  const nodes = [
    { icon: Book, label: "About Protocol", description: "Home View", view: 'home', delay: 0.05, restricted: false },
    { icon: Terminal, label: "System Logs", description: "Event Stream", view: 'system-logs', delay: 0.1, restricted: true },
    { icon: Code, label: "Source Code", description: "Repositories", view: 'projects', delay: 0.15, restricted: false },
    { icon: Globe, label: "Uplink", description: "Mentorship", view: 'mentorship', delay: 0.2, restricted: false },
    { icon: Cpu, label: "Arena", description: "Algo Night", view: 'algo-night', delay: 0.25, restricted: false },
    { icon: Shield, label: "Security", description: "White Hat", view: 'security', delay: 0.3, restricted: true },
    { icon: UserCheck, label: "The Team", description: "Operatives", view: 'team', delay: 0.35, restricted: false },
    { icon: Users, label: "Access", description: "Join Us", view: 'join', delay: 0.4, restricted: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-2xl flex items-center justify-center p-6 overflow-y-auto"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00FFFF]/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00FFFF]/10 rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent animate-scanline" />
      </div>

      <div className="relative max-w-6xl w-full">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Activity className="text-[#00FF7F]" size={24} />
            <div>
              <h2 className="text-2xl font-mono font-bold text-white tracking-tighter">NAVIGATION_HUB</h2>
              <p className="text-[10px] font-mono text-[#00FFFF]/60 uppercase tracking-[0.4em]">Authorization Confirmed</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-[#00FFFF]/40 transition-all text-white/60 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {nodes.map((node, i) => (
            <div key={node.label}>
               <HubNode {...node} userRole={userRole} onClick={() => onNavigate(node.view as AppView)} />
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${userRole === 'ADMIN' ? 'bg-red-500' : 'bg-[#00FF7F]'}`} />
              <span>Auth Status: {userRole}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
              <span>Latency: 8ms</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="font-mono text-[10px] text-[#00FFFF]/40 mb-1">TERMINUS_OS V2.5.0</p>
            <p className="text-[9px] text-white/20 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};
