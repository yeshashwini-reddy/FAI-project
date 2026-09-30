import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  FileSearch, 
  Users, 
  FileText, 
  ArrowUpRight, 
  Clock, 
  MapPin,
  ShieldAlert
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';

export const CaseCard = ({ caseItem }) => {
  const navigate = useNavigate();
  const { setActiveCaseId } = useCase();

  const handleOpenCase = () => {
    setActiveCaseId(caseItem.id);
    navigate(`/cases/${caseItem.id}`);
  };

  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical': return 'danger';
      case 'high': return 'primary';
      case 'medium': return 'warning';
      default: return 'default';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-dark-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-crimson-500/40 hover:shadow-[0_8px_30px_rgba(225,29,72,0.12)] transition-all duration-300 flex flex-col backdrop-blur-md"
    >
      {/* Top Banner with Image preview & gradient */}
      <div className="relative h-36 w-full overflow-hidden bg-dark-950">
        <img
          src={caseItem.coverImage}
          alt={caseItem.title}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="default" size="sm">
            {caseItem.id}
          </Badge>
          <div className="flex items-center gap-1.5">
            <Badge variant={getPriorityVariant(caseItem.priority)} size="sm">
              {caseItem.priority} Priority
            </Badge>
            <Badge variant="primary" size="sm" dot>
              {caseItem.status}
            </Badge>
          </div>
        </div>

        {/* Year / Location Pill */}
        <div className="absolute bottom-2 left-3 flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="flex items-center gap-1 bg-dark-950/80 px-2 py-0.5 rounded border border-slate-800">
            <Clock className="w-3 h-3 text-cyan-400" />
            {caseItem.year}
          </span>
          <span className="flex items-center gap-1 bg-dark-950/80 px-2 py-0.5 rounded border border-slate-800">
            <MapPin className="w-3 h-3 text-crimson-400" />
            {caseItem.location}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="text-[11px] font-mono text-crimson-400 uppercase tracking-wider font-semibold">
            {caseItem.type}
          </div>
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors mt-1 font-sans">
            {caseItem.title}
          </h3>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {caseItem.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-dark-950/70 border border-slate-800/80 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono uppercase">
              <FileSearch className="w-3 h-3 text-cyan-400" />
              <span>Evidence</span>
            </div>
            <p className="text-base font-mono font-bold text-slate-200 mt-0.5">
              {caseItem.evidenceCount}
            </p>
          </div>

          <div className="text-center border-x border-slate-800">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono uppercase">
              <Users className="w-3 h-3 text-purple-400" />
              <span>People</span>
            </div>
            <p className="text-base font-mono font-bold text-slate-200 mt-0.5">
              {caseItem.peopleCount}
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-mono uppercase">
              <FileText className="w-3 h-3 text-emerald-400" />
              <span>Docs</span>
            </div>
            <p className="text-base font-mono font-bold text-slate-200 mt-0.5">
              {caseItem.documentCount}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Investigation Progress</span>
            <span className="text-slate-200 font-semibold">{caseItem.progress}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-crimson-600 to-cyan-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${caseItem.progress}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
          <span className="text-[10px] font-mono text-slate-400">
            Updated {caseItem.lastUpdated}
          </span>
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowUpRight}
            iconPosition="right"
            onClick={handleOpenCase}
            className="group-hover:border-slate-600 group-hover:bg-slate-800"
          >
            Open Case
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
