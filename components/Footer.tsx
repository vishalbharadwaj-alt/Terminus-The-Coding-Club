
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-12 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <motion.span 
            animate={{ 
              textShadow: [
                "0 0 4px rgba(0, 255, 255, 0.3)",
                "0 0 8px rgba(0, 255, 255, 0.6)",
                "0 0 4px rgba(0, 255, 255, 0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-xl font-bold tracking-tighter text-[#00FFFF]"
          >
            TERMINUS_
          </motion.span>
          <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
            Building the next generation of engineers at our University.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors"><Github size={20} /></a>
            <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:hello@terminus.edu" className="text-white/40 hover:text-[#00FFFF] transition-colors"><Mail size={20} /></a>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF7F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF7F]"></span>
            </span>
            <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">System Online</span>
          </div>
        </div>

        <div className="text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">
          © 2025 TERMINUS CLUB. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
