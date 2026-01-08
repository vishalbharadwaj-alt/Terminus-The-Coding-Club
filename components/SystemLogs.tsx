
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Calendar, Info, AlertTriangle, ChevronRight, Filter, Search, Clock, Zap } from 'lucide-react';
import { AppView } from '../App';

interface LogEntry {
  id: string;
  timestamp: string;
  category: 'EVENT' | 'NOTICE' | 'SECURITY' | 'DEPLOY';
  message: string;
  details: string;
  author: string;
}

const logData: LogEntry[] = [
  {
    id: 'L-001',
    timestamp: '2025-05-24T14:32:00',
    category: 'EVENT',
    message: 'HackTheTerminus Flagship Event Announced',
    details: 'Registration opens next week for our 48-hour competitive hacking session. Prize pool includes specialized equipment and internship opportunities.',
    author: 'Vishal_Bharadwaj'
  },
  {
    id: 'L-002',
    timestamp: '2025-05-22T09:15:45',
    category: 'DEPLOY',
    message: 'Nexus Portal v2.5 Stable Release',
    details: 'Frontend core updated to Framer Motion 12. Improved latency on navigation and interactive background elements.',
    author: 'Dhritiman_Bayan'
  },
  {
    id: 'L-003',
    timestamp: '2025-05-20T18:00:00',
    category: 'NOTICE',
    message: 'Weekly Algo-Night: Dynamic Programming',
    details: 'Join us at Lab 404 this Tuesday for an intensive session on DP optimizations and state management in complex problems.',
    author: 'Deepsikha_Das'
  },
  {
    id: 'L-004',
    timestamp: '2025-05-18T22:45:10',
    category: 'SECURITY',
    message: 'System Integrity Check: 100% Clean',
    details: 'Periodic security audit completed. Zero vulnerabilities detected in current public repos. Red Force team monitoring active.',
    author: 'Utkrista_Kumar'
  },
  {
    id: 'L-005',
    timestamp: '2025-05-15T11:20:00',
    category: 'NOTICE',
    message: 'Mentorship Uplink Protocol Updated',
    details: 'New survey fields added to better match students with technical experts in Rust and Go.',
    author: 'Tushar_Kranti'
  },
  {
    id: 'L-006',
    timestamp: '2025-05-12T16:40:00',
    category: 'EVENT',
    message: 'Collaboration with AI Research Lab',
    details: 'Joint workshop series on Transformer architectures starting next month. Prerequisites: Basic Python and Linear Algebra.',
    author: 'Prayash_Bhagawati'
  }
];

const CategoryTag = ({ cat }: { cat: LogEntry['category'] }) => {
  const styles = {
    EVENT: 'bg-[#00FF7F]/10 text-[#00FF7F] border-[#00FF7F]/20',
    NOTICE: 'bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/20',
    SECURITY: 'bg-red-500/10 text-red-500 border-red-500/20',
    DEPLOY: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border uppercase tracking-widest ${styles[cat]}`}>
      {cat}
    </span>
  );
};

export const SystemLogs: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLogs = logData.filter(log => {
    const matchesFilter = filter === 'ALL' || log.category === filter;
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) || 
                          log.details.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#00FFFF] mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
              <Terminal size={14} /> System_Event_Log
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Notices & News</h1>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Query_logs..."
                  className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10"
                />
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {['ALL', 'EVENT', 'NOTICE', 'SECURITY', 'DEPLOY'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-md transition-all border ${
                filter === cat 
                  ? 'bg-[#00FFFF] text-[#0a0a0a] border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
                  : 'text-white/40 hover:text-white border-white/10 bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Feed Simulator */}
        <div className="mb-6 p-3 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><Clock size={12} /> Live_Feed: Active</span>
            <span className="flex items-center gap-2"><Zap size={12} className="text-[#00FF7F]" /> Bandwidth: 1.2 Gbps</span>
          </div>
          <div className="hidden md:block">
            Buffer: 0x4A2B9C | Encryption: Enabled
          </div>
        </div>

        {/* Logs Feed */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredLogs.map((log, i) => (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className={`group border border-white/5 bg-[#111]/40 rounded-xl overflow-hidden backdrop-blur-md transition-all ${expandedId === log.id ? 'border-[#00FFFF]/30' : 'hover:border-white/20'}`}
              >
                <div 
                  onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                  className="p-5 flex items-start gap-6 cursor-pointer"
                >
                  <div className="hidden md:block text-white/10 font-mono text-[10px] pt-1">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <CategoryTag cat={log.category} />
                      <h3 className="font-bold text-white/90 group-hover:text-white transition-colors">{log.message}</h3>
                    </div>
                    <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest flex items-center gap-4">
                      <span>Ref: {log.id}</span>
                      <span>Auth: {log.author}</span>
                    </div>
                  </div>

                  <div className={`transition-transform duration-300 ${expandedId === log.id ? 'rotate-90 text-[#00FFFF]' : 'text-white/20'}`}>
                    <ChevronRight size={20} />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === log.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-black/40 overflow-hidden"
                    >
                      <div className="p-6 font-mono text-sm text-white/60 leading-relaxed border-l-2 border-[#00FFFF] ml-5 mb-5 mt-2">
                        <div className="mb-4 text-[11px] text-[#00FFFF]/40 uppercase tracking-widest">
                          // Expanded_Transmission_Start
                        </div>
                        {log.details}
                        <div className="mt-6 flex items-center gap-4">
                           <button className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase text-white/40 hover:text-white hover:border-white/30 transition-all rounded">
                             Share_Link
                           </button>
                           <button className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] uppercase text-white/40 hover:text-white hover:border-white/30 transition-all rounded">
                             Download_Packet
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredLogs.length === 0 && (
            <div className="py-24 text-center space-y-4">
              <div className="text-white/5 flex justify-center"><Terminal size={80} /></div>
              <p className="font-mono text-white/20 uppercase tracking-[0.5em]">No_Matching_Entries_In_Buffer</p>
              <button onClick={() => {setFilter('ALL'); setSearch('');}} className="text-[10px] font-mono text-[#00FFFF] uppercase underline underline-offset-4">
                Clear_All_Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
