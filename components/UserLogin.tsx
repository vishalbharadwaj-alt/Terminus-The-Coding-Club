
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, AlertCircle } from 'lucide-react';
import { AppView, UserRole } from '../App';

interface UserLoginProps {
  onNavigate: (view: AppView) => void;
  onLogin: (role: UserRole, name: string) => void;
}

export const UserLogin: React.FC<UserLoginProps> = ({ onNavigate, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    // This is a placeholder for a real authentication system.
    // In a real-world application, you would make an API call to a backend to verify credentials.
    try {
      const response = await fetch('/members.json');
      const members = await response.json();
      const allMembers = Object.keys(members)
        .filter(role => role !== 'ADMIN')
        .flatMap(role => members[role]);

      const member: any = allMembers.find((m: any) => m.name === username);

      if (member) {
        // For this demo, we're not checking passwords. Any non-admin user can log in.
        setError(null);
        onLogin(member.role, member.name);
        onNavigate('home');
      } else {
        setError('Invalid username. Please try again.');
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
        <h2 className="text-3xl font-bold text-center text-white uppercase">User Login</h2>
        <p className='text-center text-xs text-white/40 font-mono'>Enter your credentials to access the network.</p>
        
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
            <AlertCircle size={20} />
            <p className="text-xs">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-white/40 uppercase">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Your full name'
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-white/40 uppercase">Password</label>
            <div className="relative">
              <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="w-full py-3 bg-[#00FFFF] text-[#0a0a0a] font-bold uppercase rounded-lg hover:neon-glow-cyan transition-all"
        >
          Login
        </button>
        <p className="text-xs text-center text-white/40">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('join')} className="text-[#00FFFF] hover:underline">Create one</button>
        </p>
      </motion.div>
    </div>
  );
};
