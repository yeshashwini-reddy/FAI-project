import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  FileText, 
  Users, 
  Layers, 
  HelpCircle, 
  Clock, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { Button } from '../common/Button';

export const CaseCard = ({ caseItem, onSelect }) => {
  const navigate = useNavigate();
  const { setActiveCaseId, setIsBriefingOpen } = useCase();

  const handleEnter = (e) => {
    e.stopPropagation();
    setActiveCaseId(caseItem.id);
    if (onSelect) {
      onSelect(caseItem);
    } else {
      setIsBriefingOpen(true);
      navigate('/investigation');
    }
  };

  // Difficulty indicator based on evidence & inconsistencies
  const getDifficulty = () => {
    if (caseItem.priority === 'Critical' || caseItem.inconsistenciesCount >= 3) {
      return { label: 'CRITICAL DIFFICULTY', filled: 8, total: 10, color: 'text-crimson-400' };
    }
    if (caseItem.priority === 'High') {
      return { label: 'HIGH DIFFICULTY', filled: 6, total: 10, color: 'text-amber-400' };
    }
    return { label: 'MODERATE', filled: 4, total: 10, color: 'text-cyan-400' };
  };

  const diff = getDifficulty();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={handleEnter}
      className="group relative rounded-2xl border border-slate-800 bg-dark-900/90 p-6 backdrop-blur-md cursor-pointer hover:border-slate-700 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden transition-all duration-300"
    >
      {/* Background Cover Blur Accent */}
      {caseItem.coverImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none"
          style={{ backgroundImage: `url(${caseItem.coverImage})` }}
        />
      )}

      {/* Top Meta */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg bg-dark-950 border border-slate-800 text-slate-400 font-mono text-xs font-bold tracking-widest uppercase">
            {caseItem.id}
          </span>
          <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {caseItem.year}
          </span>
        </div>

        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-1">
            {caseItem.type || 'Historical Investigation'}
          </div>
          <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-white transition-colors font-sans tracking-tight">
            {caseItem.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {caseItem.location || 'London, England'}
          </p>
        </div>

        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans pt-1">
          {caseItem.description}
        </p>
      </div>

      {/* Stats & Progress */}
      <div className="relative z-10 pt-5 space-y-4">
        {/* Difficulty Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">Difficulty Rating</span>
            <span className={`font-bold ${diff.color}`}>{diff.label}</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: diff.total }).map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-sm ${
                  idx < diff.filled ? 'bg-crimson-500' : 'bg-dark-950 border border-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Counts Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center font-mono">
          <div className="p-1.5 rounded-lg bg-dark-950/70 border border-slate-800">
            <div className="text-sm font-bold text-cyan-400">
              {caseItem.evidenceCount || 43}
            </div>
            <div className="text-[9px] text-slate-400 uppercase">Evidence</div>
          </div>

          <div className="p-1.5 rounded-lg bg-dark-950/70 border border-slate-800">
            <div className="text-sm font-bold text-purple-400">
              {caseItem.peopleCount || 12}
            </div>
            <div className="text-[9px] text-slate-400 uppercase">People</div>
          </div>

          <div className="p-1.5 rounded-lg bg-dark-950/70 border border-slate-800">
            <div className="text-sm font-bold text-amber-400">
              {caseItem.unresolvedCount || 5}
            </div>
            <div className="text-[9px] text-slate-400 uppercase">Unresolved</div>
          </div>
        </div>

        {/* Enter Case Button */}
        <Button
          variant="primary"
          size="md"
          icon={ArrowRight}
          iconPosition="right"
          onClick={handleEnter}
          className="w-full justify-center font-mono text-xs font-bold tracking-wider group-hover:shadow-[0_0_25px_rgba(225,29,72,0.4)]"
        >
          ENTER CASE
        </Button>
      </div>
    </motion.div>
  );
};
