
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, User, Target, BarChart, MessageSquare } from 'lucide-react';
import { AppView } from '../App';

interface MentorshipSurveyProps {
  onNavigate: (view: AppView) => void;
}

export const MentorshipSurvey: React.FC<MentorshipSurveyProps> = ({ onNavigate }) => {
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
            <CheckCircle2 size={80} className="text-[#00FF7F] animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold font-mono text-[#00FFFF] tracking-tighter">UPLINK_SUCCESSFUL</h2>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest leading-relaxed">
            Your technical profile has been broadcasted to our mentors. A synchronization session will be scheduled shortly.
          </p>
          <button 
            onClick={() => onNavigate('mentorship')}
            className="px-8 py-4 bg-[#111] border border-[#00FFFF]/30 text-[#00FFFF] font-mono text-xs uppercase hover:bg-[#00FFFF]/10 transition-all rounded-lg"
          >
            Return to Mentorship Network
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => onNavigate('mentorship')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-xs uppercase mb-12"
        >
          <ArrowLeft size={16} /> [Abort_Protocol]
        </button>

        <div className="mb-16">
          <div className="flex items-center gap-2 text-[#00FFFF] mb-4 font-mono text-[10px] uppercase tracking-[0.4em]">
            <Target size={14} /> Profile_Synchronization
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">Uplink_Survey</h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            Help us understand your technical vector. Our mentors use this data to tailor their guidance to your specific trajectory.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <User size={12} className="text-[#00FFFF]" /> Identity_Signature
              </label>
              <input 
                required
                type="text" 
                placeholder="Your Full Name" 
                className="w-full bg-[#111] border border-white/10 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-[#00FFFF]/50 transition-all font-mono placeholder:text-white/10"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <BarChart size={12} className="text-[#00FF7F]" /> Current_Expertise_Level
              </label>
              <select className="w-full bg-[#111] border border-white/10 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-[#00FFFF]/50 transition-all font-mono text-white/60 appearance-none">
                <option value="init">Level 0: Initialize (Absolute Beginner)</option>
                <option value="script">Level 1: Scripter (Basic Knowledge)</option>
                <option value="dev">Level 2: Developer (Building Projects)</option>
                <option value="eng">Level 3: Engineer (Deep Technical Understanding)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                Target_Subsystems (Interests)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Frontend Architecture', 'Cloud Infrastructure', 'Cyber Security', 'System Programming', 'AI/ML Systems', 'Database Design'].map(interest => (
                  <label key={interest} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-[#111] text-[#00FFFF] focus:ring-0" />
                    <span className="text-[10px] font-mono text-white/50">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <MessageSquare size={12} className="text-[#00FFFF]" /> Objective_Manifesto
              </label>
              <textarea 
                required
                rows={6}
                placeholder="What are your primary goals for this mentorship? Be specific about what you want to build or learn." 
                className="w-full bg-[#111] border border-white/10 rounded-xl p-6 text-sm font-mono focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10 resize-none"
              />
            </div>

            <div className="p-6 bg-[#00FFFF]/5 border border-[#00FFFF]/10 rounded-xl">
              <h4 className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest mb-4">Uplink_Protocol</h4>
              <p className="text-[11px] text-white/40 leading-relaxed mb-4">
                By initializing this uplink, your profile will be shared with the Terminus Core Mentors. They will review your objectives and reach out via the provided network address.
              </p>
              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold text-sm rounded-lg flex items-center justify-center gap-3 transition-all hover:neon-glow-green ${loading ? 'opacity-50 grayscale' : ''}`}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full" />
                ) : (
                  <>INITIALIZE_UPLINK <Send size={16} /></>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 border border-white/5 bg-white/5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[#00FF7F] animate-pulse" />
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                Data Stream: ENCRYPTED | Latency: 42ms
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
