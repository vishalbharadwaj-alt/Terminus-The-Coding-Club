
import React from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../App';

interface NavbarProps {
  onInitialize: () => void;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onInitialize, currentView, onNavigate }) => {
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
        <span className="font-mono text-xl font-bold tracking-tighter neon-text-cyan group-hover:text-[#00FFFF] transition-colors">
          TERMINUS_
        </span>
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

      <button 
        onClick={onInitialize}
        className="px-5 py-2 text-sm font-mono font-bold text-[#0a0a0a] bg-[#00FF7F] rounded-md hover:bg-[#00FF7F]/90 transition-all transform hover:scale-105 neon-glow-green"
      >
        Terminal_
      </button>
    </motion.nav>
  );
};
