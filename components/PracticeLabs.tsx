
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Search, Filter, Clock, BookOpen, Layers, Globe } from 'lucide-react';
import { AppView } from '../App';

interface PracticeLabsProps {
  onNavigate: (view: AppView) => void;
}

interface VideoEntry {
  id: string;
  title: string;
  topic: string;
  language: string;
  duration: string;
  level: string;
  thumbnailColor: string;
}

const videoData: VideoEntry[] = [
  { id: 'V1', title: 'Binary Search Mastery', topic: 'Searching', language: 'C++', duration: '15:20', level: 'Beginner', thumbnailColor: 'bg-blue-900/40' },
  { id: 'V2', title: 'Dynamic Programming Patterns', topic: 'DP', language: 'Python', duration: '42:10', level: 'Advanced', thumbnailColor: 'bg-purple-900/40' },
  { id: 'V3', title: 'Graph Traversal Depth-First', topic: 'Graphs', language: 'Java', duration: '28:45', level: 'Intermediate', thumbnailColor: 'bg-green-900/40' },
  { id: 'V4', title: 'Memory Safety in Rust', topic: 'Systems', language: 'Rust', duration: '35:15', level: 'Advanced', thumbnailColor: 'bg-orange-900/40' },
  { id: 'V5', title: 'SQL Query Optimization', topic: 'Databases', language: 'SQL', duration: '22:00', level: 'Intermediate', thumbnailColor: 'bg-red-900/40' },
  { id: 'V6', title: 'React Performance Hooks', topic: 'Frontend', language: 'TS', duration: '19:50', level: 'Intermediate', thumbnailColor: 'bg-cyan-900/40' },
];

export const PracticeLabs: React.FC<PracticeLabsProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeTopic, setActiveTopic] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<VideoEntry | null>(null);

  const filteredVideos = videoData.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || 
                          v.language.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = activeTopic === 'All' || v.topic === activeTopic;
    return matchesSearch && matchesTopic;
  });

  const topics = ['All', ...new Set(videoData.map(v => v.topic))];

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => onNavigate('algo-night')}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-xs uppercase mb-12"
        >
          <ArrowLeft size={16} /> [Return_to_Hub]
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-2 font-mono text-[10px] uppercase tracking-[0.4em]">
              <Layers size={14} /> Training_Archive_v1.0
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Practice_Labs</h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Query archive (Topic/Lang)..."
              className="w-full bg-[#111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/10 shadow-2xl"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              className={`px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded transition-all border ${
                activeTopic === topic 
                  ? 'bg-orange-600 text-white border-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.3)]' 
                  : 'text-white/40 hover:text-white border-white/10 bg-white/5'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, i) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail Placeholder */}
                <div className={`aspect-video ${video.thumbnailColor} relative flex items-center justify-center overflow-hidden`}>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-1" />
                   <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-white fill-white ml-1" size={24} />
                   </div>
                   <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 rounded text-[8px] font-mono text-orange-500 border border-orange-500/30">
                     {video.level}
                   </div>
                   <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-mono text-white/60">
                     <Clock size={12} /> {video.duration}
                   </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg group-hover:text-orange-500 transition-colors leading-tight">{video.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      <Globe size={12} /> {video.language}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      <BookOpen size={12} /> {video.topic}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-24 text-center">
             <div className="text-white/5 flex justify-center mb-6"><Layers size={80} /></div>
             <p className="font-mono text-white/20 uppercase tracking-[0.5em]">No_Archives_Match_Query</p>
             <button onClick={() => {setSearch(''); setActiveTopic('All');}} className="mt-4 text-[10px] font-mono text-orange-500 uppercase underline underline-offset-4">Reset_Search</button>
          </div>
        )}
      </div>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="max-w-5xl w-full flex flex-col gap-6">
               <div className="flex justify-between items-center border-b border-white/5 pb-4">
                 <div className="flex items-center gap-4">
                    <div className="px-2 py-1 bg-orange-600 text-[10px] font-mono font-bold uppercase rounded">Playing: {selectedVideo.id}</div>
                    <h2 className="text-xl font-bold font-mono text-white">{selectedVideo.title}</h2>
                 </div>
                 <button onClick={() => setSelectedVideo(null)} className="p-2 text-white/40 hover:text-white transition-colors">
                   <ArrowLeft className="inline rotate-90" size={24} /> Close_Player
                 </button>
               </div>
               
               <div className="aspect-video bg-black border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                     <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  </div>
                  <div className="text-center space-y-4 relative z-10">
                     <div className="w-20 h-20 rounded-full border-2 border-orange-500/50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Play size={40} className="text-orange-500 fill-orange-500 ml-2" />
                     </div>
                     <p className="font-mono text-sm text-white/20 uppercase tracking-[0.3em]">Initialize_Uplink_Stream_Buffer...</p>
                  </div>
                  {/* Decorative Scanlines */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
               </div>

               <div className="grid md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 p-6 bg-white/5 border border-white/5 rounded-xl">
                    <h3 className="text-sm font-mono text-orange-500 uppercase mb-4">Transmission_Metadata</h3>
                    <p className="text-sm text-white/60 leading-relaxed font-mono">
                      This module covers the core principles of {selectedVideo.topic} using {selectedVideo.language}. 
                      The session breakdown includes time-complexity analysis, edge-case handling, and optimized implementation strategies for {selectedVideo.level} engineers.
                    </p>
                 </div>
                 <div className="p-6 bg-white/5 border border-white/5 rounded-xl space-y-4">
                    <h3 className="text-sm font-mono text-white/40 uppercase">Resources</h3>
                    {['Implementation_Source.git', 'Problem_Statement.pdf', 'Complexity_Analysis.md'].map(res => (
                      <div key={res} className="flex items-center justify-between text-[10px] font-mono text-white/60 hover:text-orange-500 transition-colors cursor-pointer border-b border-white/5 pb-2">
                        <span>{res}</span>
                        <Play size={10} className="rotate-90" />
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
