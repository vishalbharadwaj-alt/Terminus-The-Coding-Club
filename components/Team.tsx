import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, User, Code, Shield, Database, Cpu, Globe } from 'lucide-react';
import { AppView } from '../App';
// Import types for members from members.json for better type safety
import { ADMIN, CORE_MEMBER, CORE_COORDINATOR, LEAD_MEMBER } from '../members.json';

const TeamMember = ({ name, role, bio, github, linkedin, avatar, index }: any) => {
  const SpecialtyIcon = User; // Simplified for now

  // Determine if role is an array or string
  const rolesToDisplay = Array.isArray(role) ? role : [role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group bg-[#111]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00FFFF]/10 to-[#00FF7F]/10 border border-white/10 flex items-center justify-center group-hover:border-[#00FFFF]/30 transition-colors">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <User size={32} className="text-white/20 group-hover:text-[#00FFFF]/40 transition-colors" />
            )}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-[#00FFFF] transition-colors">{name}</h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {rolesToDisplay.map((r: string, i: number) => (
              <p key={i} className={`text-[10px] font-mono uppercase tracking-widest ${r === 'Club President' || r === 'Club Vice President' || r === 'Secretary' ? 'text-red-500 group-hover:text-red-400' : 'text-white/50 group-hover:text-[#00FF7F]'}`}>{r}</p>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow italic">
        \"{bio}\"
      </p>

      <div className="flex flex-col gap-4 mt-auto">
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
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={14} className="text-white/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TeamProps {
  onNavigate: (view: AppView) => void;
}

export const Team: React.FC<TeamProps> = ({ onNavigate }) => {
  const [members, setMembers] = useState<{ ADMIN: any[], CORE_MEMBER: any[], CORE_COORDINATOR: any[], LEAD_MEMBER: any[] }>({ ADMIN: [], CORE_MEMBER: [], CORE_COORDINATOR: [], LEAD_MEMBER: [] });
  const [allMembers, setAllMembers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAndMergeData = async () => {
      try {
        const response = await fetch('/members.json');
        const baseMembers = await response.json();

        const mergedMembers: { ADMIN: any[], CORE_MEMBER: any[], CORE_COORDINATOR: any[], LEAD_MEMBER: any[] } = { ADMIN: [], CORE_MEMBER: [], CORE_COORDINATOR: [], LEAD_MEMBER: [] };
        let combined: any[] = [];
        const seenMemberNames = new Set<string>(); // To track unique members by name

        for (const role in baseMembers) {
          if (role === 'ADMIN' || role === 'CORE_MEMBER' || role === 'CORE_COORDINATOR' || role === 'LEAD_MEMBER') {
            const roleMembers = baseMembers[role].map((member: any) => {
              const storedData = localStorage.getItem(`member_${member.name}`);
              if (storedData) {
                return JSON.parse(storedData);
              }
              return member;
            });
            mergedMembers[role as 'ADMIN' | 'CORE_MEMBER' | 'CORE_COORDINATOR' | 'LEAD_MEMBER'] = roleMembers;
            
            roleMembers.forEach((member: any) => {
              // Create a unique key for each member, considering they might have multiple roles
              const memberIdentifier = `${member.name}-${JSON.stringify(member.role)}`;
              if (member.name && !seenMemberNames.has(memberIdentifier)) { // Use a more robust check for uniqueness
                combined.push(member);
                seenMemberNames.add(memberIdentifier);
              }
            });
          }
        }

        setMembers(mergedMembers);
        setAllMembers(combined);
      } catch (error) {
        console.error("Failed to load team data:", error);
      }
    };

    fetchAndMergeData();
  }, []);

  if (allMembers.length === 0) {
    return <div className="min-h-screen flex items-center justify-center"><p className='text-white/40 font-mono'>Loading team data...</p></div>;
  }

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

        {allMembers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white mb-8">Our Operatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allMembers.map((member: any, i: number) => (
                <TeamMember key={member.id || member.name || i} {...member} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-24 p-12 border border-[#00FF7F]/20 bg-[#00FF7F]/5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
            <Cpu size={200} />
          </div>
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white">Want to join the club?</h2>
            <p className="text-white/60 max-w-xl mx-auto font-mono text-sm leading-relaxed">
              We are always looking for talented engineers to lead our next phase of projects. Prove your proof-of-work and scale with us.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => onNavigate('join')}
                className="px-10 py-4 bg-[#00FF7F] text-[#0a0a0a] font-mono font-bold uppercase text-sm rounded-lg hover:neon-glow-green transition-all transform hover:scale-105"
              >
                Apply for Club
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => onNavigate('edit-profile')}
            className="px-6 py-2 border border-white/20 text-white/60 hover:bg-white/5 uppercase font-mono text-xs rounded-lg"
          >
            Edit Your Profile
          </button>
        </div>
      </div>
    </div>
  );
};