
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, HardDrive, Cpu, Terminal } from 'lucide-react';

const ServerBlade = ({ title, description, tags, status, delay }: any) => {
  const statusColors: any = {
    online: 'bg-[#00FF7F]',
    dev: 'bg-yellow-400',
    offline: 'bg-red-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ x: 10 }}
      className="relative flex h-48 bg-[#111] border border-white/10 rounded-lg overflow-hidden group"
    >
      {/* Front Panel (Left side) */}
      <div className="w-16 bg-[#1a1a1a] flex flex-col items-center py-4 border-r border-white/5 gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[status]} shadow-[0_0_8px_currentColor] animate-pulse`} />
          <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">Status</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
        <div className="mt-auto">
          <HardDrive size={20} className="text-white/10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-mono text-lg font-bold text-[#00FFFF]">{title}</h3>
            <div className="flex gap-2">
              <a href="#" className="text-white/30 hover:text-white transition-colors"><Github size={16} /></a>
              <a href="#" className="text-white/30 hover:text-[#00FFFF] transition-colors"><ExternalLink size={16} /></a>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-[#00FF7F] uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Handle */}
      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-white/5 via-white/10 to-white/5" />
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const projects = [
    { title: "Terminus_OS", description: "A high-performance shell environment built in Rust for efficient workflow management.", tags: ["Rust", "WASM", "Shell"], status: "online" },
    { title: "NetScan_Pro", description: "Distributed vulnerability scanner with real-time packet analysis and reporting.", tags: ["Python", "Go", "Redis"], status: "online" },
    { title: "Neural_Link", description: "Experimenting with lightweight transformer models running entirely in the browser.", tags: ["Tensorflow", "TS", "AI"], status: "dev" },
    { title: "BlockChain_DNS", description: "Decentralized naming system for secure peering and identity verification.", tags: ["Solidity", "Web3"], status: "online" },
    { title: "Quantum_Vault", description: "Post-quantum cryptographic storage solutions for sensitive data assets.", tags: ["Encryption", "C++"], status: "offline" },
    { title: "React_Core_v5", description: "Internal UI library for consistent high-performance terminal styling.", tags: ["React", "CSS"], status: "online" },
  ];

  return (
    <div className="pt-24 pb-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 rounded-lg bg-[#00FFFF]/10 flex items-center justify-center text-[#00FFFF]">
            <Layers size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight uppercase font-mono">Source_Repository</h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.4em]">Authorized Access Level: 4</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ServerBlade key={p.title} {...p} delay={i * 0.1} />
          ))}
        </div>

        {/* Contributing Section */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Cpu size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Terminal size={24} className="text-[#00FF7F]" />
              Commit to the Core
            </h2>
            <p className="text-white/60 max-w-2xl mb-8">
              Every great innovation starts with a single pull request. Join our top contributors and help build the future of our digital infrastructure.
            </p>
            <button className="px-6 py-3 bg-[#00FFFF] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#00FFFF]/80 transition-all flex items-center gap-2">
              Browse Repo <Github size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
