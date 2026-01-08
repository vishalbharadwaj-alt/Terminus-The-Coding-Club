
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Lock, Terminal, Activity, ArrowRight, Fingerprint, Zap, Mail, UserPlus } from 'lucide-react';
import { UserRole } from '../App';

interface LoginProps {
  onLogin: (role: UserRole, name: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [protocol, setProtocol] = useState<'USER' | 'ADMIN'>('USER');
  const [isRegistering, setIsRegistering] = useState(false);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError(null);

    // Simulated Authentication / Registration Delay
    setTimeout(() => {
      if (protocol === 'ADMIN') {
        if (id === 'admin' && key === 'terminus_root') {
          onLogin('ADMIN', 'Terminus_Root');
        } else {
          setError('ERROR: INVALID_ROOT_CREDENTIALS');
          setIsAuthenticating(false);
        }
      } else {
        if (isRegistering) {
          if (id && email && key) {
            // Simulate account creation
            onLogin('USER', id);
          } else {
            setError('ERROR: REGISTRATION_SYNC_FAILURE');
            setIsAuthenticating(false);
          }
        } else {
          if (id && key) {
            onLogin('USER', id);
          } else {
            setError('ERROR: FIELD_SYNC_FAILURE');
            setIsAuthenticating(false);
          }
        }
      }
    }, 1800);
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-32 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00FFFF]/20 rounded-full animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl"
      >
        {/* Glow accent based on protocol */}
        <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${protocol === 'ADMIN' ? 'bg-red-600' : 'bg-[#00FFFF]'}`} />
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Activity className={protocol === 'ADMIN' ? 'text-red-600' : 'text-[#00FFFF]'} size={20} />
            <h2 className="text-xl font-mono font-bold uppercase tracking-widest">
              {isRegistering ? 'Nexus_Register' : 'Nexus_Auth'}
            </h2>
          </div>
          <div className="text-[10px] font-mono text-white/20 uppercase">V2.5.0 Stable</div>
        </div>

        <div className="flex gap-2 mb-10 p-1 bg-white/5 border border-white/5 rounded-lg">
          <button 
            onClick={() => { setProtocol('USER'); setError(null); }}
            className={`flex-1 py-2 text-[10px] font-mono uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 ${protocol === 'USER' ? 'bg-[#00FFFF] text-[#0a0a0a]' : 'text-white/40 hover:text-white'}`}
          >
            <User size={12} /> User_Protocol
          </button>
          <button 
            onClick={() => { setProtocol('ADMIN'); setError(null); setIsRegistering(false); }}
            className={`flex-1 py-2 text-[10px] font-mono uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 ${protocol === 'ADMIN' ? 'bg-red-600 text-white' : 'text-white/40 hover:text-white'}`}
          >
            <Shield size={12} /> Admin_Override
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegistering ? 'register' : 'login'}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Signature_ID</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    required
                    type="text" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder={protocol === 'ADMIN' ? 'ROOT_ID' : 'Username'}
                    className={`w-full bg-black/50 border rounded-md py-3 pl-10 pr-4 text-sm font-mono focus:outline-none transition-all placeholder:text-white/10 ${protocol === 'ADMIN' ? 'border-red-900/30 focus:border-red-600' : 'border-white/10 focus:border-[#00FFFF]/50'}`}
                  />
                </div>
              </div>

              {isRegistering && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Network_Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@nexus.io"
                      className="w-full bg-black/50 border border-white/10 rounded-md py-3 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10"
                    />
                  </div>
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Access_Key</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  <input 
                    required
                    type="password" 
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="********"
                    className={`w-full bg-black/50 border rounded-md py-3 pl-10 pr-4 text-sm font-mono focus:outline-none transition-all placeholder:text-white/10 ${protocol === 'ADMIN' ? 'border-red-900/30 focus:border-red-600' : 'border-white/10 focus:border-[#00FFFF]/50'}`}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 bg-red-900/20 border border-red-900/50 rounded flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-mono text-red-500 uppercase">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isAuthenticating}
            className={`w-full py-4 font-mono font-bold text-sm rounded-md transition-all flex items-center justify-center gap-2 group relative overflow-hidden ${
              protocol === 'ADMIN' 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-[#00FF7F] text-[#0a0a0a] hover:bg-[#00FF7F]/90'
            } ${isAuthenticating ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isAuthenticating ? (
              <div className="flex items-center gap-3">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                <span className="text-[10px] tracking-widest uppercase">Syncing...</span>
              </div>
            ) : (
              <>{isRegistering ? 'CREATE_ACCOUNT' : 'INITIALIZE_UPLINK'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
            )}
            
            {/* Holographic line scan effect while loading */}
            {isAuthenticating && (
              <motion.div 
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white/10 pointer-events-none"
              />
            )}
          </button>
        </form>

        {protocol === 'USER' && (
          <div className="mt-6 text-center">
            <button 
              onClick={toggleMode}
              className="text-[10px] font-mono text-white/40 hover:text-[#00FFFF] transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
            >
              {isRegistering ? (
                <>Already have an account? Login</>
              ) : (
                <><UserPlus size={12} /> Don't have an account? Register</>
              )}
            </button>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[8px] font-mono text-white/20 uppercase tracking-widest">
            <Fingerprint size={10} /> Biometrics Ready
          </div>
          <div className="flex items-center gap-2 text-[8px] font-mono text-white/20 uppercase tracking-widest">
            <Zap size={10} /> Port: 0xAF32
          </div>
        </div>

        {protocol === 'ADMIN' && (
          <div className="mt-4 p-3 bg-red-600/5 border border-red-600/10 rounded-lg">
            <p className="text-[8px] font-mono text-red-600/60 uppercase leading-relaxed text-center">
              NOTICE: All admin overrides are logged to the global event stream. Ensure proper authorization before proceeding.
            </p>
          </div>
        )}
      </motion.div>

      {/* Side Decorative Terminal HUD (Mobile Hidden) */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 space-y-8 opacity-30 pointer-events-none">
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-[0.5em]">Network_Grid</div>
          <div className="grid grid-cols-4 gap-1">
            {[...Array(16)].map((_, i) => (
              <div key={i} className={`w-3 h-3 border border-white/10 ${i % 3 === 0 ? 'bg-[#00FFFF]/20' : ''}`} />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-white/40 uppercase">Auth_Kernel: Stable</div>
          <div className="text-[10px] font-mono text-white/40 uppercase">Handshake: Encr_RSA</div>
          <div className="text-[10px] font-mono text-white/40 uppercase">Session: {isRegistering ? 'Registration' : 'Pending'}</div>
        </div>
      </div>
    </div>
  );
};
