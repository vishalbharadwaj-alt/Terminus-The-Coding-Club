
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Search, Upload, Save, AlertCircle } from 'lucide-react';
import { AppView } from '../App';

interface EditProfileProps {
  onNavigate: (view: AppView) => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ onNavigate }) => {
  const [memberName, setMemberName] = useState('');
  const [isMemberLoaded, setIsMemberLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<any>(null);

  const handleLoadMember = async () => {
    try {
      const response = await fetch('/members.json');
      const members = await response.json();
      const allMembers = Object.values(members).flat();
      const member: any = allMembers.find((m: any) => m.name.toLowerCase() === memberName.toLowerCase());

      if (member) {
        setIsMemberLoaded(true);
        const storedData = localStorage.getItem(`member_${member.name}`);
        if (storedData) {
          setMemberData(JSON.parse(storedData));
        } else {
          setMemberData(member);
        }
        setError(null);
      } else {
        setError('Member not found. Please enter the full name as it appears on the Team page.');
      }
    } catch (err) {
      setError('Could not load member data. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!memberData) return;
    try {
      localStorage.setItem(`member_${memberData.name}`, JSON.stringify(memberData));
      alert('Profile updated successfully! The changes are saved locally on this device.');
      onNavigate('team');
    } catch (err) {
      setError('An unexpected error occurred while saving. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberData({ ...memberData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isMemberLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 space-y-6 bg-[#111]/60 border border-white/10 rounded-2xl backdrop-blur-md"
        >
          <h2 className="text-3xl font-bold text-center text-white uppercase">Member Profile Editor</h2>
          <p className='text-center text-xs text-white/40 font-mono'>Enter the full name of the member to edit their profile.</p>
          
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <AlertCircle size={20} />
              <p className="text-xs">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-white/40 uppercase">Member's Full Name</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder='e.g., Jane Doe'
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleLoadMember}
            className="w-full py-3 bg-[#00FFFF] text-[#0a0a0a] font-bold uppercase rounded-lg hover:neon-glow-cyan transition-all"
          >
            Load Profile
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 md:px-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto p-8 bg-[#111]/60 border border-white/10 rounded-2xl backdrop-blur-md"
      >
        <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-8">Editing Profile: {memberData.name}</h1>
        
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <img 
                src={memberData.avatar || 'https://example.com/default-avatar.png'}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-[#00FFFF]/30"
              />
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-[#00FFFF] text-[#0a0a0a] rounded-full cursor-pointer hover:scale-110 transition-transform">
                <Upload size={16} />
                <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{memberData.name}</h3>
              <p className="text-sm text-[#00FF7F] font-mono uppercase">{memberData.role}</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-white/40 uppercase">Bio</label>
            <textarea
              value={memberData.bio}
              onChange={(e) => setMemberData({ ...memberData, bio: e.target.value })}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg h-32 resize-none focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-mono text-white/40 uppercase">GitHub URL</label>
              <input 
                type="text"
                value={memberData.github}
                onChange={(e) => setMemberData({ ...memberData, github: e.target.value })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-white/40 uppercase">LinkedIn URL</label>
              <input 
                type="text"
                value={memberData.linkedin}
                onChange={(e) => setMemberData({ ...memberData, linkedin: e.target.value })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
              />
            </div>
             <div>
              <label className="text-xs font-mono text-white/40 uppercase">Twitter URL</label>
              <input 
                type="text"
                value={memberData.twitter}
                onChange={(e) => setMemberData({ ...memberData, twitter: e.target.value })}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#00FFFF] focus:border-[#00FFFF] outline-none transition-all"
              />
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <AlertCircle size={20} />
              <p className="text-xs">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
            <button 
              onClick={() => setIsMemberLoaded(false)} // Go back to the search view
              className="px-6 py-2 border border-white/20 text-white/60 hover:bg-white/5 uppercase font-mono text-xs rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="px-8 py-2 bg-[#00FF7F] text-[#0a0a0a] font-bold uppercase text-sm rounded-lg hover:neon-glow-green transition-all flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
