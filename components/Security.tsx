
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Lock, Eye, Terminal as TerminalIcon, ChevronRight, X, Fingerprint, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

const TerminalOverlay = ({ onClose }: { onClose: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hackPhrases = [
    "> INITIATING PACKET INJECTION...",
    "> BYPASSING FIREWALL LAYER 4...",
    "> HANDSHAKE INTERCEPTED: 0xAF32...",
    "> BRUTEFORCING SSH PORT 22...",
    "> ACCESSING KERNEL MEMORY SPACE...",
    "> SPOOFING MAC ADDRESS: 00:1A:2B:3C:4D:5E...",
    "> SQL INJECTION SUCCESSFUL...",
    "> ESCALATING PRIVILEGES...",
    "> ROOT ACCESS ACQUIRED.",
    "> ENCRYPTING DATA STREAMS...",
    "> CLEANING SYSTEM LOGS...",
    "> CONNECTION TERMINATED."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < hackPhrases.length) {
        setLogs(prev => [...prev, hackPhrases[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col p-6 font-mono"
    >
      <div className="flex justify-between items-center mb-6 border-b border-red-900/50 pb-4">
        <div className="flex items-center gap-3 text-red-500">
          <TerminalIcon size={20} className="animate-pulse" />
          <span className="text-sm font-bold tracking-widest uppercase">Breach_Terminal_v4.2</span>
        </div>
        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 text-sm md:text-base scrollbar-hide">
        {logs.map((log, i) => (
          <motion.div 
            initial={{ x: -10, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            key={i} 
            className={`${log?.includes('SUCCESSFUL') || log?.includes('ACQUIRED') ? 'text-[#00FF7F]' : 'text-red-500/80'}`}
          >
            {log}
          </motion.div>
        ))}
        {logs.length === hackPhrases.length && (
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-white mt-8 cursor-pointer underline underline-offset-4"
            onClick={onClose}
          >
            [Close_Session]
          </motion.div>
        )}
      </div>
      <div className="mt-4 h-1 bg-red-900/20 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: hackPhrases.length * 0.4, ease: "linear" }}
          className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
        />
      </div>
    </motion.div>
  );
};

const WargameModal = ({ title, onClose }: { title: string, onClose: () => void }) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'success'>('idle');

  const symbols = ['0', '1', 'A', 'F', 'X', '#'];

  const startChallenge = () => {
    const newSeq = Array.from({ length: 4 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
    setSequence(newSeq);
    setGameState('showing');
    setUserInput([]);
    
    // Show sequence for 1.5 seconds then hide
    setTimeout(() => {
      setGameState('playing');
    }, 1500);
  };

  const handleInput = (sym: string) => {
    if (gameState !== 'playing') return;
    const newInput = [...userInput, sym];
    setUserInput(newInput);
    
    if (newInput.length === sequence.length) {
      if (newInput.join('') === sequence.join('')) {
        setGameState('success');
      } else {
        // Reset if wrong
        setUserInput([]);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[#0c0c0c] border border-red-900/50 p-8 rounded-2xl max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/20 hover:text-white">
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-red-600 mb-2 uppercase font-mono">{title}</h3>
        <p className="text-[10px] text-white/40 mb-8 font-mono tracking-widest">
          {gameState === 'showing' ? 'MEMORIZE_SEQUENCE...' : 'DECRYPT_PROTOCOL_ACTIVE'}
        </p>

        {gameState === 'idle' && (
          <button 
            onClick={startChallenge}
            className="w-full py-4 bg-red-600 text-white font-mono font-bold rounded-lg hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          >
            Start_Decryption
          </button>
        )}

        {(gameState === 'playing' || gameState === 'showing') && (
          <div className="space-y-8">
            <div className="flex justify-center gap-4">
              {sequence.map((s, i) => (
                <div key={i} className="w-12 h-16 border-2 border-red-900 flex items-center justify-center text-xl font-mono text-red-500 bg-red-950/20 shadow-inner">
                  {gameState === 'showing' ? s : (userInput[i] || '?')}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {symbols.map(s => (
                <button 
                  key={s}
                  disabled={gameState === 'showing'}
                  onClick={() => handleInput(s)}
                  className={`py-3 bg-white/5 border border-white/10 rounded font-mono transition-all text-white/70 ${gameState === 'showing' ? 'opacity-20' : 'hover:bg-red-600/20 hover:border-red-600 hover:text-red-500'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <ShieldCheck size={48} className="text-[#00FF7F] mx-auto animate-bounce" />
            <p className="text-[#00FF7F] font-mono text-sm uppercase font-bold tracking-widest">DECRYPTION_SUCCESSFUL</p>
            <p className="text-[9px] text-white/30 font-mono">ACCESS_TOKENS_GENERATED</p>
            <button 
              onClick={onClose}
              className="px-8 py-2 bg-white/5 border border-[#00FF7F]/30 text-[#00FF7F] font-mono text-xs rounded hover:bg-[#00FF7F]/10 transition-all"
            >
              Close_Uplink
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const WargameItem = ({ title, level, category, onClick }: any) => (
  <motion.div 
    whileHover={{ x: 5 }}
    onClick={onClick}
    className="group flex items-center justify-between p-4 border border-red-900/20 bg-red-950/5 hover:bg-red-950/20 transition-all cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="w-1 h-8 bg-red-600/30 group-hover:bg-red-600 transition-colors" />
      <div>
        <h4 className="font-mono text-sm text-red-500 font-bold tracking-tighter uppercase">{title}</h4>
        <p className="text-[10px] text-red-900 uppercase font-mono tracking-widest">{category}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono text-red-600/50 uppercase">LVL: {level}</span>
      <ChevronRight size={14} className="text-red-900 group-hover:text-red-500 transition-all" />
    </div>
  </motion.div>
);

export const Security: React.FC = () => {
  const [accessDenied, setAccessDenied] = useState(false);
  const [isBreaching, setIsBreaching] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [selectedWargame, setSelectedWargame] = useState<string | null>(null);
  const [threatCount, setThreatCount] = useState(1429);
  const [isCleaning, setIsCleaning] = useState(false);
  const [alerts, setAlerts] = useState([
    "[12:04:12] Unauthorized access attempt detected at Node_Alpha. IP trace: 192.168.1.104",
    "[12:08:45] CRITICAL: Database integrity check failed. Initializing recovery.",
    "[12:15:30] System heartbeat stable. All subsystems operational."
  ]);

  const handleSecureNode = () => {
    setIsCleaning(true);
    setTimeout(() => {
      setIsCleaning(false);
      setThreatCount(0);
      setAlerts(prev => ["[00:00:00] SYSTEM_PURGE_COMPLETE: All threats neutralized.", ...prev.slice(0, 2)]);
    }, 2000);
  };

  const handleBioScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setAccessGranted(true);
      setAlerts(prev => ["[ACCESS_GRANTED] Zero-Day vulnerability disclosed in Core Subsystem.", ...prev]);
    }, 2500);
  };

  return (
    <div className="relative pt-24 pb-32 px-6 md:px-24 bg-[#0a0a0a] min-h-screen">
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f00 0, #f00 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <Shield size={20} className={`${threatCount > 0 ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-mono uppercase tracking-[0.5em]">White_Hat Protocol Active</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">Red_Force</h1>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsBreaching(true)} 
              className="px-6 py-2 border border-red-600 text-red-600 font-mono text-xs uppercase hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
            >
              <TerminalIcon size={14} /> Initialize Breach
            </button>
            <button 
              onClick={handleSecureNode}
              disabled={isCleaning}
              className={`px-6 py-2 bg-red-600 text-white font-mono text-xs uppercase hover:bg-red-700 transition-all flex items-center gap-2 ${isCleaning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw size={14} className={isCleaning ? 'animate-spin' : ''} /> Secure Node
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="p-8 border border-red-900/30 bg-[#0c0c0c] relative overflow-hidden rounded-xl">
              <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2 uppercase z-10 relative">
                <Eye size={20} /> Active_Wargames
              </h2>
              <div className="space-y-2 z-10 relative">
                <WargameItem title="Binary_Exploit_01" level="Adv" category="Reverse Engineering" onClick={() => setSelectedWargame('Binary_Exploit_01')} />
                <WargameItem title="Spectral_Shadow" level="Elite" category="Side-Channel" onClick={() => setSelectedWargame('Spectral_Shadow')} />
                <WargameItem title="SQL_Injection_V3" level="Beg" category="Web Security" onClick={() => setSelectedWargame('SQL_Injection_V3')} />
                <WargameItem title="Wi-Fi_Cracker_Beta" level="Int" category="Network Defense" onClick={() => setSelectedWargame('Wi-Fi_Cracker_Beta')} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-white/5 bg-[#0f0f0f] rounded-xl">
                <h3 className="text-[10px] font-mono text-white/40 uppercase mb-4 tracking-widest">Global Status</h3>
                <div className="space-y-4">
                  {[
                    { label: "Uptime", val: "99.98%" },
                    { label: "Threats Blocked", val: threatCount.toLocaleString() },
                    { label: "Nodes Online", val: "84" }
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[9px] text-white/20 uppercase font-mono">{item.label}</span>
                      <span className="font-mono text-sm text-red-500">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div 
                onClick={!accessGranted ? handleBioScan : undefined}
                className={`p-6 border transition-all rounded-xl relative group overflow-hidden ${accessGranted ? 'border-[#00FF7F]/40 bg-[#00FF7F]/5' : 'border-white/5 bg-[#0f0f0f] cursor-pointer'}`}
              >
                {isScanning && (
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: "-100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[#00FFFF]/20 z-0"
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center py-4">
                  {accessGranted ? (
                    <>
                      <ShieldCheck size={32} className="text-[#00FF7F] mb-2" />
                      <span className="text-[10px] text-[#00FF7F] uppercase text-center font-mono font-bold tracking-widest">AUTH_CONFIRMED: ADMIN_L5</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint size={32} className={`text-red-900 group-hover:text-red-600 transition-colors mb-2 ${isScanning ? 'animate-pulse' : ''}`} />
                      <span className="text-[10px] text-white/20 uppercase text-center font-mono">
                        {isScanning ? 'SCANNING_BIOMETRICS...' : 'INIT_BIOMETRIC_SCAN'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 border-l-4 border-red-600 bg-red-600/5 relative overflow-hidden rounded-r-xl">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <AlertTriangle size={18} className="animate-bounce" />
                <span className="text-sm font-bold uppercase tracking-widest">Live_Feed</span>
              </div>
              <div className="space-y-4 font-mono text-[10px] leading-tight relative z-10">
                <AnimatePresence mode="popLayout">
                  {alerts.map((alert, i) => (
                    <motion.div 
                      key={alert}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`${alert?.includes('CRITICAL') || alert?.includes('UNAUTHORIZED') ? 'text-red-500' : 'text-white/60'}`}
                    >
                      {alert}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-6 border border-white/5 bg-[#0f0f0f] rounded-xl">
              <h3 className="text-[10px] font-mono text-white/40 uppercase mb-6 tracking-widest">Top Operatives</h3>
              <div className="space-y-4">
                {[
                  { name: 'Neo88', points: '12.4k' },
                  { name: 'Cipher_X', points: '10.1k' },
                  { name: 'Zero_Day', points: '8.4k' }
                ].map((op, i) => (
                  <div key={op.name} className="flex items-center gap-3">
                    <span className="text-[9px] text-white/20 font-mono">0{i+1}</span>
                    <div className="flex-1 text-xs font-mono text-white/70">{op.name}</div>
                    <div className="text-[9px] font-mono text-red-600">{op.points} PT</div>
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
            className="fixed inset-0 z-[150] bg-red-600 flex flex-col items-center justify-center text-white p-12 overflow-hidden"
          >
            <motion.h1 
              animate={{ x: [-10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
              className="text-8xl font-black uppercase tracking-tighter italic"
            >
              Access_Denied
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isBreaching && <TerminalOverlay onClose={() => setIsBreaching(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWargame && (
          <WargameModal title={selectedWargame} onClose={() => setSelectedWargame(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
