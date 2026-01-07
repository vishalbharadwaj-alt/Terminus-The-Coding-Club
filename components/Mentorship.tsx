
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, User, BookOpen, Star, Zap, Coffee } from 'lucide-react';

const MentorCard = ({ name, role, skills, bio, image }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 bg-[#111]/40 border border-white/5 rounded-2xl backdrop-blur-md relative group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent" />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFFF]/20 to-[#00FF7F]/20 flex items-center justify-center border border-white/10">
          <User size={32} className="text-white/20" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-xs text-[#00FFFF] font-mono uppercase tracking-widest">{role}</p>
        </div>
      </div>

      <p className="text-sm text-white/50 mb-6 line-clamp-3">
        {bio}
      </p>

      <div className="space-y-3 mb-8">
        {skills.map((skill: any) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono uppercase text-white/30">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                className="h-full bg-gradient-to-r from-[#00FFFF] to-[#00FF7F]" 
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase rounded-lg hover:bg-[#00FFFF]/10 transition-all flex items-center justify-center gap-2">
        Request Uplink <Zap size={14} />
      </button>
    </motion.div>
  );
};

export const Mentorship: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const mentors = [
    { 
      name: "Sarah Chen", 
      role: "Lead Architect", 
      skills: [{name: "React", level: 95}, {name: "Typescript", level: 90}], 
      bio: "Full-stack enthusiast with a focus on scalable cloud architectures and accessible UI/UX design.",
      category: "Frontend"
    },
    { 
      name: "Marcus Thorne", 
      role: "Security Analyst", 
      skills: [{name: "Python", level: 92}, {name: "Network Sec", level: 98}], 
      bio: "Ethical hacker specializing in zero-day exploit discovery and infrastructure hardening.",
      category: "Security"
    },
    { 
      name: "Elena Rodriguez", 
      role: "AI Research", 
      skills: [{name: "PyTorch", level: 96}, {name: "C++", level: 85}], 
      bio: "Passionate about generative models and high-performance computing in the browser.",
      category: "AI"
    },
    { 
      name: "Devon Wu", 
      role: "Systems Engineer", 
      skills: [{name: "Rust", level: 94}, {name: "Linux Kernel", level: 88}], 
      bio: "Low-level systems enthusiast working on embedded devices and distributed databases.",
      category: "Backend"
    }
  ];

  return (
    <div className="pt-24 pb-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#00FFFF] mb-2">
              <Globe size={18} />
              <span className="text-xs font-mono uppercase tracking-[0.5em]">Global Uplink Protocol</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Mentorship_Network</h1>
          </div>
          
          <div className="flex gap-2 p-1 bg-white/5 border border-white/5 rounded-lg">
            {['All', 'Frontend', 'Backend', 'AI', 'Security'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded transition-all ${filter === cat ? 'bg-[#00FFFF] text-[#0a0a0a]' : 'text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.filter(m => filter === 'All' || m.category === filter).map((m, i) => (
            <MentorCard key={m.name} {...m} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-32">
          <h2 className="text-2xl font-bold mb-12 flex items-center gap-3">
            <BookOpen size={24} className="text-[#00FF7F]" />
            Decoded_Transmissions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-8 border border-white/5 bg-[#111]/20 relative">
                <div className="absolute top-0 right-0 p-4 opacity-5"><Coffee size={40} /></div>
                <div className="flex gap-1 mb-4 text-[#00FF7F]">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                </div>
                <p className="text-sm text-white/50 italic leading-relaxed">
                  "The mentorship here changed my entire approach to engineering. I went from coding simple apps to building distributed systems in 6 months."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">User_ID: Node_0{i}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
