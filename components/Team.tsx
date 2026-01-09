
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink, User, Code, Shield, Database, Cpu, Globe } from 'lucide-react';

const TeamMember = ({ name, role, bio, github, linkedin, twitter, specialty, index }: any) => {
  const IconMap: any = {
    Frontend: Code,
    Backend: Cpu,
    Security: Shield,
    Database: Database,
    Algorithms: Globe,
    Leadership: User
  };

  const SpecialtyIcon = IconMap[specialty] || User;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group bg-[#111]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md overflow-hidden h-full flex flex-col"
    >
      {/* Accent Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00FFFF]/10 to-[#00FF7F]/10 border border-white/10 flex items-center justify-center group-hover:border-[#00FFFF]/30 transition-colors">
            <User size={32} className="text-white/20 group-hover:text-[#00FFFF]/40 transition-colors" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[#00FFFF]">
            <SpecialtyIcon size={12} />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-[#00FFFF] transition-colors">{name}</h3>
          <p className="text-[10px] text-[#00FF7F] font-mono uppercase tracking-widest">{role}</p>
        </div>
      </div>

      <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow italic">
        "{bio}"
      </p>

      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded font-mono text-[9px] text-white/40 uppercase">
            {specialty}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-all">
              <Github size={14} />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-all">
              <Linkedin size={14} />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-all">
              <Twitter size={14} />
            </a>
          )}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={14} className="text-white/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Team: React.FC = () => {
  const team = [
    {
      name: "Vishal Bharadwaj",
      role: "Club President",
      bio: "Visionary architect leading the next generation of engineers. Expert in building scalable digital ecosystems.",
      specialty: "Leadership",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Utkrista Kumar Das",
      role: "Vice President",
      bio: "Systems deep-diver specializing in memory-safe architectures and performance-critical infrastructures.",
      specialty: "Backend",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Dhritiman Bayan",
      role: "Frontend Lead",
      bio: "Crafting immersive, performance-driven user interfaces. Master of animations and modern design systems.",
      specialty: "Frontend",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Tushar Kranti Sutradhar",
      role: "Database Lead",
      bio: "Data integrity and scalability specialist. Architecting complex relational and non-relational storage solutions.",
      specialty: "Database",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Prayash Bhagawati",
      role: "Cloud Architect",
      bio: "Cloud-native enthusiast focusing on container orchestration, microservices, and high-availability systems.",
      specialty: "Backend",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Deepsikha Das",
      role: "Algorithm Expert",
      bio: "Algorithmic complexity specialist. Solving the world's toughest problems one optimization at a time.",
      specialty: "Algorithms",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    }
  ];

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2 text-[#00FFFF] mb-2 font-mono text-[10px] uppercase tracking-[0.5em]">
            <Globe size={14} /> Personnel_Manifest
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic mb-6">The_Operatives</h1>
          <p className="text-lg text-white/50 leading-relaxed max-w-2xl">
            Meet the core team behind Terminus. A decentralized collective of engineers dedicated to pushing the boundaries of university tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <TeamMember key={member.name} {...member} index={i} />
          ))}
        </div>

        <div className="mt-24 p-12 border border-[#00FF7F]/20 bg-[#00FF7F]/5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cpu size={200} />
          </div>
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Want to join the core?</h2>
            <p className="text-white/60 max-w-xl mx-auto font-mono text-sm leading-relaxed">
              We are always looking for talented engineers to lead our next phase of projects. Prove your proof-of-work and scale with us.
            </p>
            <div className="flex justify-center">
              <button className="px-10 py-4 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold uppercase text-sm rounded-lg hover:neon-glow-green transition-all transform hover:scale-105">
                Apply for Leadership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
