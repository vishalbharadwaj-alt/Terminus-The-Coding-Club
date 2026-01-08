
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, Zap, Brain, Code, Target } from 'lucide-react';
import { AppView } from '../App';

interface ArenaSurveyProps {
  onNavigate: (view: AppView) => void;
}

export const ArenaSurvey: React.FC<ArenaSurveyProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-8 max-w-md"
        >
          <div className="flex justify-center">
            <CheckCircle2 size={80} className="text-orange-500 animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold font-mono text-orange-500 tracking-tighter uppercase">REGISTRATION_COMPLETE</h2>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest leading-relaxed">
            Your combat parameters have been uploaded to the Arena servers. Your rank will be calculated in the next session.
          </p>
          <button 
            onClick={() => onNavigate('algo-night')}
            className="px-8 py-4 bg-[#111] border border-orange-500/30 text-orange-500 font-mono text-xs uppercase hover:bg-orange-500/10 transition-all rounded-lg"
          >
            Back to Arena Hub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => onNavigate('algo-night')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-xs uppercase mb-12"
        >
          <ArrowLeft size={16} /> [Back_to_Arena]
        </button>

        <div className="mb-16">
          <div className="flex items-center gap-2 text-orange-500 mb-4 font-mono text-[10px] uppercase tracking-[0.4em]">
            <Zap size={14} fill="currentColor" /> Combatant_Profile_Setup
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-6">Enter_The_Arena</h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            Register your profile for the upcoming Algo-Night. We use this data to balance the ranks and provide optimized problem sets.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <Code size={12} className="text-orange-500" /> Preferred_Weapon (Language)
              </label>
              <select className="w-full bg-[#111] border border-white/10 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-mono text-white/60 appearance-none">
                <option value="cpp">C++ (Standard Combat)</option>
                <option value="python">Python (Rapid Prototype)</option>
                <option value="java">Java (Legacy Tank)</option>
                <option value="rust">Rust (Memory Secure)</option>
                <option value="other">Other Protocol</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <Brain size={12} className="text-orange-500" /> Algorithmic_Aptitude
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'beg', label: 'Rookie (Searching/Sorting)' },
                  { id: 'int', label: 'Mercenary (Graph/Trees)' },
                  { id: 'adv', label: 'Veteran (DP/Backtracking)' },
                  { id: 'elite', label: 'Warlord (Segment Trees/Advanced DP)' }
                ].map(lvl => (
                  <label key={lvl.id} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-orange-500/5 hover:border-orange-500/30 transition-all">
                    <input type="radio" name="level" className="w-4 h-4 rounded-full border-white/10 bg-[#111] text-orange-500 focus:ring-0" />
                    <span className="text-[10px] font-mono text-white/50 uppercase">{lvl.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <Target size={12} className="text-orange-500" /> Target_Competitive_Rating
              </label>
              <input 
                type="text" 
                placeholder="Codeforces/LeetCode Rating (If any)" 
                className="w-full bg-[#111] border border-white/10 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all font-mono placeholder:text-white/10"
              />
            </div>

            <div className="p-6 bg-orange-500/5 border border-orange-500/10 rounded-xl">
              <h4 className="text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-4">Engagement_Terms</h4>
              <p className="text-[11px] text-white/40 leading-relaxed mb-4">
                By entering the Arena, you agree to uphold the ethics of competitive programming. Plagiarism from AI or other sources during live matches will result in permanent blacklisting.
              </p>
              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-orange-600 text-white font-mono font-bold text-sm rounded-lg flex items-center justify-center gap-3 transition-all hover:bg-orange-700 ${loading ? 'opacity-50 grayscale' : ''}`}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>COMMIT_TO_ARENA <Send size={16} /></>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 border border-white/5 bg-white/5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                System: PRE-MATCH_INIT | Latency: 12ms
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
