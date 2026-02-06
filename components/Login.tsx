
import React from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../App';
import { Shield, User, UserPlus } from 'lucide-react';

interface LoginProps {
  onNavigate: (view: AppView) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-[#111]/60 border border-white/10 rounded-2xl backdrop-blur-md text-center"
      >
        <h2 className="text-3xl font-bold text-center text-white uppercase">Access Portal</h2>
        <p className='text-center text-xs text-white/40 font-mono'>Select your access method.</p>
        
        <div className="space-y-4 pt-4">
          <button 
            onClick={() => onNavigate('admin-login')}
            className="w-full flex items-center justify-center gap-3 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-bold uppercase rounded-lg hover:bg-red-500/20 transition-all"
          >
            <Shield size={16} />
            Admin Login
          </button>
          <button 
            onClick={() => onNavigate('user-login')}
            className="w-full flex items-center justify-center gap-3 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold uppercase rounded-lg hover:bg-cyan-500/20 transition-all"
          >
            <User size={16} />
            User Login
          </button>
          <button 
            onClick={() => onNavigate('join')}
            className="w-full flex items-center justify-center gap-3 py-3 bg-green-500/10 border border-green-500/30 text-green-400 font-bold uppercase rounded-lg hover:bg-green-500/20 transition-all"
          >
            <UserPlus size={16} />
            Create Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};
