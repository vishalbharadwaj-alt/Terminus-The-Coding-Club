
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Box, Star, Calendar, Download, Eye, ExternalLink, Github, ArrowLeft } from 'lucide-react';

const LibraryCard = ({ project }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, borderColor: "rgba(0, 255, 255, 0.4)" }}
      className="bg-[#111]/60 border border-white/5 rounded-xl p-5 flex flex-col gap-4 group transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded bg-[#00FFFF]/10 border border-[#00FFFF]/20 flex items-center justify-center text-[#00FFFF]">
          <Box size={20} />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-[10px] font-mono text-white/30">
            <Star size={10} className="text-yellow-500" />
            {project.stars}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono text-white/30">
            <Download size={10} className="text-[#00FF7F]" />
            {project.downloads}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white group-hover:text-[#00FFFF] transition-colors">{project.name}</h3>
        <p className="text-xs text-white/40 font-mono mt-1 mb-3">{project.author}</p>
        <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-[9px] font-mono uppercase px-2 py-0.5 bg-white/5 text-white/40 rounded border border-white/10">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button className="flex-1 py-2 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded text-[10px] font-mono text-[#00FFFF] uppercase tracking-wider hover:bg-[#00FFFF]/20 transition-all flex items-center justify-center gap-1.5">
          Source <Github size={12} />
        </button>
        <button className="px-3 py-2 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-all">
          <ExternalLink size={12} className="text-white/40" />
        </button>
      </div>
    </motion.div>
  );
};

export const ProjectLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const libraryData = [
    { name: "Hyper_React", author: "neo_01", stars: 452, downloads: "12k", tags: ["Frontend", "Lib", "TS"], description: "A high-frequency React renderer optimized for terminal-like dashboards.", date: "2025-05" },
    { name: "Rust_Bridge", author: "kernel_panik", stars: 890, downloads: "5k", tags: ["Backend", "Rust", "Bridge"], description: "Safe bindings for inter-process communication between Node.js and Rust systems.", date: "2025-04" },
    { name: "Ghost_Chat", author: "cipher_X", stars: 120, downloads: "2k", tags: ["Security", "Web", "Crypto"], description: "E2EE chat application utilizing post-quantum cryptographic primitives.", date: "2025-05" },
    { name: "Auto_Bench", author: "perf_guy", stars: 65, downloads: "1k", tags: ["Tools", "Node", "Perf"], description: "Automated benchmarking suite for microservices with flamegraph generation.", date: "2025-01" },
    { name: "Pixel_Flow", author: "design_node", stars: 310, downloads: "8k", tags: ["Frontend", "GL", "Visuals"], description: "Hardware-accelerated particle system for modern web graphics.", date: "2025-02" },
    { name: "Log_Streamer", author: "sys_admin", stars: 88, downloads: "3k", tags: ["Backend", "Logs", "Data"], description: "High-throughput log aggregation and analysis platform with SQL-like query engine.", date: "2025-01" },
    { name: "Secure_Auth", author: "shield_up", stars: 145, downloads: "4k", tags: ["Security", "Lib", "Auth"], description: "Biometric authentication middleware for web applications.", date: "2025-03" },
    { name: "Theme_Engine", author: "stylist", stars: 45, downloads: "2k", tags: ["Frontend", "CSS", "UI"], description: "Dynamic CSS variable injection engine for runtime themes.", date: "2025-01" },
  ];

  const filteredProjects = libraryData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || p.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#00FF7F] mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
              <Eye size={12} /> Live_Database_Access
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase">Project_Archive</h1>
          </div>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#00FFFF] transition-colors" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repository..."
                className="bg-[#111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm w-full md:w-64 focus:outline-none focus:border-[#00FFFF]/50 transition-all font-mono"
              />
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                <Filter size={18} className="text-white/40" />
              </button>
              <button className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                <Calendar size={18} className="text-white/40" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {['All', 'Frontend', 'Backend', 'Security', 'Lib', 'Tools'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-full transition-all border ${
                activeFilter === filter 
                  ? 'bg-[#00FFFF] text-[#0a0a0a] border-[#00FFFF]' 
                  : 'text-white/40 hover:text-white border-white/10 bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <LibraryCard key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-32 text-center">
            <div className="text-[#00FFFF]/20 mb-4 flex justify-center"><Search size={64} /></div>
            <h3 className="text-xl font-mono text-white/40">NO_MATCHING_RECORDS_FOUND</h3>
            <p className="text-sm text-white/20 mt-2">Check your query or filter parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
};