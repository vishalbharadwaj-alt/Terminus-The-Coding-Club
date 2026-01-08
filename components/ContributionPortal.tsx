
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Send, ArrowLeft, Box, Check, MessageSquare } from 'lucide-react';

interface ContributionPortalProps {
  onNavigate: () => void;
}

const projects = [
  "Terminus_OS",
  "NetScan_Pro",
  "Neural_Link",
  "BlockChain_DNS",
  "Quantum_Vault",
  "Hyper_React",
  "Rust_Bridge",
  "Ghost_Chat"
];

export const ContributionPortal: React.FC<ContributionPortalProps> = ({ onNavigate }) => {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleProject = (project: string) => {
    setSelectedProjects(prev => 
      prev.includes(project) 
        ? prev.filter(p => p !== project) 
        : [...prev, project]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProjects.length === 0 || !description.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-[#00FF7F]/10 border border-[#00FF7F]/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={40} className="text-[#00FF7F]" />
          </div>
          <h2 className="text-3xl font-bold font-mono text-[#00FFFF] mb-4">REQUEST_TRANSMITTED</h2>
          <p className="text-white/40 font-mono text-sm leading-relaxed mb-10">
            Your contribution proposal has been synced to the main repository. Maintainers will review your downlink shortly.
          </p>
          <button 
            onClick={onNavigate}
            className="px-8 py-3 bg-[#111] border border-[#00FFFF]/30 text-[#00FFFF] font-mono text-xs uppercase hover:bg-[#00FFFF]/10 transition-all rounded"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 bg-[#0a0a0a] min-h-screen relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00FFFF]/20 rounded-full" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00FFFF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={onNavigate}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-xs uppercase mb-12"
        >
          <ArrowLeft size={16} /> [Back_to_Source]
        </button>

        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-[#00FF7F] mb-4 font-mono text-[10px] uppercase tracking-[0.4em]">
              <Globe size={16} /> Contribution_Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-6">Open_Source_Fest</h1>
            <p className="text-lg text-white/50 leading-relaxed mb-12">
              The digital frontier is built on collaboration. Select the projects you wish to enhance and define your implementation plan.
            </p>

            <div className="p-6 bg-[#111]/40 border border-white/5 rounded-xl backdrop-blur-sm">
              <h3 className="text-sm font-mono font-bold text-white/80 uppercase mb-6 flex items-center gap-2">
                <Box size={16} className="text-[#00FFFF]" /> Select_Target_Projects
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {projects.map(project => (
                  <button
                    key={project}
                    onClick={() => toggleProject(project)}
                    className={`p-3 text-left font-mono text-[11px] border rounded transition-all flex justify-between items-center ${
                      selectedProjects.includes(project) 
                        ? 'bg-[#00FFFF]/10 border-[#00FFFF] text-[#00FFFF]' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                    }`}
                  >
                    {project}
                    {selectedProjects.includes(project) && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-xs font-mono text-white/30 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} className="text-[#00FF7F]" /> Proposed_Implementations
                </label>
                <div className="relative group">
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={12}
                    placeholder="Describe your planned features or optimizations here..."
                    className="w-full bg-[#111] border border-white/10 rounded-xl p-6 text-sm font-mono focus:outline-none focus:border-[#00FFFF]/50 transition-all placeholder:text-white/10 resize-none shadow-2xl"
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/20 uppercase">
                    UTF-8 Buffer Ready
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || selectedProjects.length === 0}
                className={`w-full py-4 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold text-sm rounded-xl flex items-center justify-center gap-3 group transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,255,127,0.2)] ${
                  (isSubmitting || selectedProjects.length === 0) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:neon-glow-green'
                }`}
              >
                {isSubmitting ? (
                  <span className="animate-spin h-5 w-5 border-2 border-[#0a0a0a] border-t-transparent rounded-full" />
                ) : (
                  <>EXECUTE_DOWLINK <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>
              
              <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  Encryption Layer: ACTIVE | Protocol: SECURE_POST
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
