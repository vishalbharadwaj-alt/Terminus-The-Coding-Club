
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, User, BookOpen, Star, Zap, Coffee, Code, Database, Shield, Cpu, Brain, Rocket } from 'lucide-react';
import { AppView } from '../App';

// Define the missing MentorshipProps interface
interface MentorshipProps {
  onNavigate: (view: AppView) => void;
}

const MentorCard = ({ name, role, skills, bio, onUplink }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 bg-[#111]/40 border border-white/5 rounded-2xl backdrop-blur-md relative group overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent" />
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00FFFF]/20 to-[#00FF7F]/20 flex items-center justify-center border border-white/10">
          <User size={32} className="text-white/20" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-[10px] text-[#00FFFF] font-mono uppercase tracking-widest">{role}</p>
        </div>
      </div>

      <p className="text-sm text-white/50 mb-6 line-clamp-3">
        {bio}
      </p>

      <div className="space-y-3 mb-8 flex-1">
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

      <button 
        onClick={onUplink}
        className="w-full py-3 border border-[#00FFFF]/30 text-[#00FFFF] text-xs font-mono uppercase rounded-lg hover:bg-[#00FFFF]/10 transition-all flex items-center justify-center gap-2"
      >
        Request Uplink <Zap size={14} />
      </button>
    </motion.div>
  );
};

export const Mentorship: React.FC<MentorshipProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState('All');

  const testimonials = [
    {
      id: '01',
      icon: Brain,
      text: "The AI workshops hosted by Prayash and Deepsikha were incredibly deep. I went from knowing nothing about Transformers to fine-tuning my own LLMs on local hardware. Truly transformative experience.",
      user: "Neural_Path_X",
      stars: 5
    },
    {
      id: '02',
      icon: Cpu,
      text: "Focusing on Rust with Utkrista helped me understand memory management at a fundamental level. I'm now contributing to core systems that handle millions of requests. The mentorship here is world-class.",
      user: "Systems_Root_42",
      stars: 5
    },
    {
      id: '03',
      icon: Rocket,
      text: "Terminus isn't just about code; it's about the mission. Vishal's career guidance helped me navigate multiple FAANG offers and choose the path that aligned with my architectural interests. Five stars.",
      user: "Elite_Dev_2025",
      stars: 5
    }
  ];

  const mentors = [
    { 
      name: "Vishal Bharadwaj", 
      role: "Lead Architect", 
      skills: [{name: "React", level: 98}, {name: "Typescript", level: 95}], 
      bio: "Full-stack architect with a focus on high-performance distributed systems and reactive UI patterns.",
      category: "Frontend"
    },
    { 
      name: "Utkrista Kumar Das", 
      role: "Database Expert", 
      skills: [{name: "Rust", level: 96}, {name: "PostgreSQL", level: 92}], 
      bio: "Database architecture specialist focusing on data integrity, high-concurrency storage, and performance optimization.",
      category: "Backend"
    },
    { 
      name: "Dhritiman Bayan", 
      role: "Frontend Expert", 
      skills: [{name: "Next.js", level: 94}, {name: "Framer Motion", level: 90}], 
      bio: "Specializing in crafting immersive, performance-driven user interfaces with modern CSS and animation frameworks.",
      category: "Frontend"
    },
    { 
      name: "Tushar Kranti Sutradhar", 
      role: "Database Engineer", 
      skills: [{name: "PostgreSQL", level: 95}, {name: "NoSQL", level: 88}], 
      bio: "Database architect focused on scalability, data integrity, and high-concurrency storage solutions.",
      category: "Backend"
    },
    { 
      name: "Prayash Bhagawati", 
      role: "Backend Engineer", 
      skills: [{name: "Go", level: 92}, {name: "Docker/K8s", level: 89}], 
      bio: "Cloud-native enthusiast specializing in microservices architecture, container orchestration, and API design.",
      category: "Backend"
    },
    { 
      name: "Deepsikha Das", 
      role: "Code Expert", 
      skills: [{name: "Algorithms", level: 96}, {name: "Clean Code", level: 94}], 
      bio: "Deep understanding of algorithmic complexity, clean code principles, and advanced software design patterns.",
      category: "Backend"
    }
  ];

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen">
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
            {['All', 'Frontend', 'Backend'].map(cat => (
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

        {/* Testimonials Block */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <BookOpen size={24} className="text-[#00FF7F]" />
            Decoded_Transmissions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.id} className="p-8 border border-white/5 bg-[#111]/20 relative rounded-xl backdrop-blur-sm group hover:border-[#00FFFF]/20 transition-all">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon size={40} />
                  </div>
                  <div className="flex gap-1 mb-4 text-[#00FF7F]">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-white/50 italic leading-relaxed min-h-[4.5rem]">
                    "{t.text}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <User size={14} className="text-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">User_ID: {t.user}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mentors.filter(m => filter === 'All' || m.category === filter).map((m, i) => (
            <MentorCard key={m.name} {...m} onUplink={() => onNavigate('mentorship-survey')} />
          ))}
        </div>
      </div>
    </div>
  );
};
