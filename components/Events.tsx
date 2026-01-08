
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, Globe, Zap } from 'lucide-react';
import { AppView } from '../App';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF7F';
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />;
};

const EventCard = ({ title, date, description, icon: Icon, span = "", matrix = false, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group overflow-hidden bg-[#111]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-[#00FFFF]/40 cursor-pointer ${span}`}
    >
      {matrix && isHovered && <MatrixRain />}
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${matrix ? 'bg-[#00FF7F]/10 text-[#00FF7F]' : 'bg-[#00FFFF]/10 text-[#00FFFF]'}`}>
            <Icon size={20} />
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-[#00FFFF] transition-colors">{title}</h3>
          <p className="text-white/50 text-sm mb-4 leading-relaxed">{description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{date}</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00FFFF] group-hover:text-[#0a0a0a] transition-all">
            <Zap size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface EventsProps {
  onNavigate: (view: AppView) => void;
}

export const Events: React.FC<EventsProps> = ({ onNavigate }) => {
  return (
    <section id="events" className="relative py-32 px-6 md:px-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] border border-[#00FFFF]/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] border border-[#00FF7F]/20 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="grid grid-cols-12 h-full gap-4 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-[#00FFFF]/10 h-full" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#00FFFF] font-mono text-sm tracking-widest uppercase mb-2"
          >
            Upcoming
          </motion.h4>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Circuit Board</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EventCard 
            title="HackTheTerminus" 
            date="OCT 24-26, 2025"
            description="Our flagship 48-hour hackathon. Push your limits and build something that changes the game."
            icon={Terminal}
            span="md:col-span-2 md:row-span-2"
            matrix={true}
          />
          <EventCard 
            title="AI Workshop" 
            date="SEP 12, 2025"
            description="Exploring neural networks and generative AI models with hands-on labs."
            icon={Cpu}
          />
          <EventCard 
            title="Algo-Nights" 
            date="WEEKLY"
            description="Competitive programming sessions to sharpen your logic and speed."
            icon={Code2}
            onClick={() => onNavigate('algo-night')}
          />
          <EventCard 
            title="Open Source Fest" 
            date="NOV 10, 2025"
            description="Contribute to global projects and learn the art of collaboration."
            icon={Globe}
            onClick={() => onNavigate('contribution-portal')}
          />
        </div>
      </div>
    </section>
  );
};