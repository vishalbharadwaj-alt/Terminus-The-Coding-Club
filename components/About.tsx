
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const About: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const codeString = `{
  name: 'Terminus',
  origin: 'University Coding Club',
  mission: 'Empowering the next generation of engineers through code.',
  stack: ['React', 'TS', 'Rust', 'AI', 'Cybersecurity'],
  status: 'Ready to build the future'
}`;

  return (
    <section id="about" className="relative py-32 px-6 md:px-24 bg-[#0a0a0a] overflow-hidden">
      {/* Section Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-40 h-40 border-t border-l border-[#00FFFF]/20" />
        <div className="absolute bottom-10 right-10 w-40 h-40 border-b border-r border-[#00FFFF]/20" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00FFFF]/5 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Terminal Window */}
        <div 
          className="perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="w-full bg-[#111] rounded-xl border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Window Header */}
            <div className="flex items-center px-4 py-3 bg-[#1a1a1a] border-b border-white/5 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs font-mono text-white/30">mission_statement.js — 80x24</span>
            </div>

            {/* Window Content */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
              <pre className="text-[#00FFFF]">
                <span className="text-purple-400">const</span> <span className="text-[#00FF7F]">Terminus</span> = {codeString}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#00FF7F] font-mono text-sm tracking-widest uppercase"
            >
              About
            </motion.h4>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">More than just Lines of Code</h2>
          </div>
          
          <div className="space-y-6 text-white/60 text-lg leading-relaxed">
            <p>
              Terminus is a community of builders, thinkers, and innovators. Born in the heart of university labs, we bring together students who want to push the boundaries of technology.
            </p>
            <p>
              From deep-dives into systems programming to exploring the ethical frontiers of AI, we provide the platform for you to turn your ideas into functional realities.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex-1 relative group">
              <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[#00FFFF] font-mono text-2xl font-bold relative">500+</div>
              <div className="text-xs text-white/40 uppercase tracking-tighter relative">Active Members</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex-1 relative group">
              <div className="absolute inset-0 bg-[#00FF7F]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-[#00FF7F] font-mono text-2xl font-bold relative">20+</div>
              <div className="text-xs text-white/40 uppercase tracking-tighter relative">Annual Events</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
