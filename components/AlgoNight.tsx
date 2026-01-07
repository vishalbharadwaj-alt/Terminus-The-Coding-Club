
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Trophy, Zap, Terminal, Code2, ArrowRight } from 'lucide-react';

const SortingVisualizer = () => {
  return (
    <div className="flex items-end gap-1 h-32 w-full max-w-xs mx-auto mb-8 border-b border-orange-500/20 px-2 pb-2">
      {[40, 70, 20, 90, 50, 80, 30, 60, 100, 45].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            repeatType: 'reverse', 
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className="flex-1 bg-orange-500/40 rounded-t-sm"
        />
      ))}
    </div>
  );
};

export const AlgoNight: React.FC = () => {
  const leaderboard = [
    { rank: '01', name: 'BinaryBard', score: '24,800', solved: '124' },
    { rank: '02', name: 'SortMaster', score: '22,150', solved: '110' },
    { rank: '03', name: 'Lambda_99', score: '19,400', solved: '98' },
    { rank: '04', name: 'NullPointer', score: '18,200', solved: '91' },
    { rank: '05', name: 'EdgeCase', score: '15,600', solved: '78' },
  ];

  return (
    <div className="pt-24 pb-32 px-6 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <Zap size={20} className="fill-orange-500" />
              <span className="text-xs font-mono uppercase tracking-[0.5em]">The_Arena Protocol Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Algo_Night</h1>
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Sharpen your logic, optimize your performance, and dominate the interview circuit. Weekly sessions dedicated to the art of competitive programming.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-orange-600 text-white font-mono font-bold rounded-lg hover:bg-orange-700 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                Join Arena <ArrowRight size={18} />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-mono font-bold rounded-lg hover:bg-white/10 transition-all">
                Practice_Labs
              </button>
            </div>
          </div>

          <div className="p-8 bg-[#111] border border-orange-500/20 rounded-2xl relative">
            <div className="absolute top-4 left-4 text-orange-500/20"><Code2 size={40} /></div>
            <SortingVisualizer />
            <h3 className="text-center font-mono text-sm uppercase text-white/40 mb-6">Current_Challenge: O(log n) Search</h3>
            <div className="bg-[#0a0a0a] rounded-lg p-6 font-mono text-xs leading-relaxed border border-white/5">
              <p className="text-orange-500 mb-2">// Problem of the Week</p>
              <p className="text-white/60">Given a sorted array of integers, find the first occurrence of a target element...</p>
              <div className="mt-4 flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-[10px] text-white/20 uppercase">Time Limit: 1.0s</span>
                <span className="text-orange-500 font-bold">START ></span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Leaderboard */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Trophy size={24} className="text-orange-500" />
              Global_Leaderboard
            </h2>
            <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-left font-mono">
                <thead className="bg-[#1a1a1a] text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Score</th>
                    <th className="px-6 py-4">Solved</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {leaderboard.map((user, i) => (
                    <tr key={user.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white/30">{user.rank}</td>
                      <td className="px-6 py-4 font-bold text-white">{user.name}</td>
                      <td className="px-6 py-4 text-orange-500">{user.score}</td>
                      <td className="px-6 py-4 text-white/60">{user.solved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats/Resources */}
          <div className="space-y-8">
            <div className="p-6 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5">
              <h3 className="text-sm font-bold uppercase mb-6 flex items-center gap-2">
                <Terminal size={18} className="text-orange-500" />
                Quick_Links
              </h3>
              <div className="space-y-3">
                {['LeetCode_List', 'Interview_Prep_Git', 'Complexity_Cheatsheet', 'C++_Tips'].map(link => (
                  <a key={link} href="#" className="flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition-all group">
                    <span className="text-[10px] font-mono text-white/50 group-hover:text-white uppercase">{link}</span>
                    <ArrowRight size={14} className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 bg-orange-600/10 border border-orange-600/20 rounded-xl">
              <h4 className="text-orange-500 font-bold uppercase text-xs mb-2">Next_Session</h4>
              <div className="text-xl font-bold mb-1">Every Tuesday @ 7PM</div>
              <p className="text-xs text-white/40 font-mono">Computer Lab 404 / Discord Stage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
