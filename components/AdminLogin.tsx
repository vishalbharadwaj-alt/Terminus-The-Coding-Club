
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, AlertCircle } from 'lucide-react';
import { AppView, UserRole } from '../App';

interface AdminLoginProps {
  onNavigate: (view: AppView) => void;
  onLogin: (role: UserRole, name: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onLogin }) => {
  const [adminId, setAdminId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('/members.json');
      const members = await response.json();
      const adminMember = members.ADMIN.find((m: any) => m.id === adminId);

      if (adminMember) {
        setError(null);
        onLogin('ADMIN', adminMember.name);
        onNavigate('edit-profile');
      } else {
        setError('Invalid Admin ID.');
      }
    } catch (err) {
      setError('Could not load member data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-[#111]/60 border border-white/10 rounded-2xl backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-white uppercase">Admin Access</h2>
        <p className='text-center text-xs text-white/40 font-mono'>Enter your Admin ID to continue.</p>
        
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
            <AlertCircle size={20} />
            <p className="text-xs">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-white/40 uppercase">Admin ID</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder='Enter your unique Admin ID'
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full py-3 bg-red-500/80 text-white font-bold uppercase rounded-lg hover:bg-red-500 transition-all"
        >
          Authorize
        </button>
      </motion.div>
    </div>
  );
};
