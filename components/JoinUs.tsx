
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Github, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const JoinUs: React.FC = () => {
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
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <CheckCircle2 size={80} className="text-[#00FF7F] animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold font-mono text-[#00FFFF]">SEQUENCE_COMPLETE</h2>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Your access request has been broadcasted to the network.</p>
          <div className="pt-8">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#111] border border-[#00FFFF]/30 text-[#00FFFF] font-mono text-xs uppercase hover:bg-[#00FFFF]/10 transition-all"
            >
              Return to Nexus
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen flex flex-col md:flex-row">
      {/* Left side: Manifesto */}
      <div className="md:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="inline-block px-3 py-1 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded-full">
            <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest">Recruitment_Phase_4</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
            Join the <br /> <span className="text-[#00FF7F] italic">Elite.</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-md">
            We don't just write code. We build architectures that endure. Become a part of the most technically ambitious community on campus.
          </p>
          
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase">
              <div className="w-8 h-px bg-white/20" />
              <span>Zero-knowledge onboarding</span>
            </div>
            <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase">
              <div className="w-8 h-px bg-white/20" />
              <span>Decentralized governance</span>
            </div>
            <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase">
              <div className="w-8 h-px bg-white/20" />
              <span>Full-stack mentorship</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="md:w-1/2 p-8 md:p-24 flex flex-col justify-center bg-[#0d0d0d] border-l border-white/5">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto w-full">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">User_Identity</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                required
                type="text" 
                placeholder="Name" 
                className="w-full bg-[#111] border border-white/10 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Network_Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                required
                type="email" 
                placeholder="Email" 
                className="w-full bg-[#111] border border-white/10 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Source_Reference</label>
            <div className="relative">
              <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Github Username (Optional)" 
                className="w-full bg-[#111] border border-white/10 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Proof_of_Work</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-white/20" size={18} />
              <textarea 
                required
                rows={4}
                placeholder="What is the coolest thing you've built?" 
                className="w-full bg-[#111] border border-white/10 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10 resize-none"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold text-sm rounded-md hover:bg-[#00FF7F]/90 transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full" />
            ) : (
              <>INITIALIZE_SEQUENCE <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
            )}
          </button>
          
          <p className="text-[9px] text-white/20 font-mono text-center uppercase tracking-widest mt-4">
            By clicking submit, you agree to our Code of Conduct and Protocol.
          </p>
        </form>
      </div>
    </div>
  );
};
