
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView, UserRole } from '../App';
import { User, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onInitialize: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  userRole: UserRole;
  username: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onInitialize, 
  currentView, 
  onNavigate, 
  userRole, 
  username, 
  onLogout 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5"
    >
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <motion.span 
          animate={{ 
            textShadow: [
              "0 0 5px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.4)",
              "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.6)",
              "0 0 5px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="font-eb-garamond text-xl font-bold tracking-tight text-white group-hover:text-[#00FFFF] transition-colors"
        >
          TERMINUS
        </motion.span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {[
          { id: 'home', label: 'Home' },
          { id: 'projects', label: 'Source' },
          { id: 'mentorship', label: 'Uplink' },
          { id: 'security', label: 'Security' }
        ].map((item) => (
          <button 
            key={item.id} 
            onClick={() => onNavigate(item.id as AppView)}
            className={`text-sm font-mono tracking-wider transition-colors relative ${
              currentView === item.id ? 'text-[#00FFFF]' : 'text-white/50 hover:text-white'
            }`}
          >
            {item.label}
            {currentView === item.id && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-[#00FFFF]" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {userRole === 'GUEST' ? (
          <button 
            onClick={() => onNavigate('login')}
            className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white transition-colors mr-2"
          >
            <User size={14} /> Login
          </button>
        ) : (
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:border-[#00FFFF]/40 transition-all group"
            >
              <div className={`w-2 h-2 rounded-full ${userRole === 'ADMIN' ? 'bg-red-500' : 'bg-[#00FF7F]'} animate-pulse`} />
              <span className="text-[10px] font-mono text-white/70 group-hover:text-white">{username || 'User'}</span>
              <ChevronDown size={12} className={`text-white/30 group-hover:text-white transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-lg shadow-2xl py-2 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-white/5 mb-2">
                    <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Access Role</p>
                    <p className={`text-[10px] font-mono font-bold ${userRole === 'ADMIN' ? 'text-red-500' : 'text-[#00FF7F]'}`}>{userRole}</p>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-mono text-white/60 hover:text-red-500 hover:bg-white/5 flex items-center gap-2 transition-all"
                  >
                    <LogOut size={14} /> Disconnect_Uplink
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <button 
          onClick={onInitialize}
          className="px-5 py-2 text-sm font-mono font-bold text-[#0a0a0a] bg-[#00FF7F] rounded-md hover:bg-[#00FF7F]/90 transition-all transform hover:scale-105 neon-glow-green"
        >
          Terminal_
        </button>
      </div>
    </motion.nav>
  );
};
