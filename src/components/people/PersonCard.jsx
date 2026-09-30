import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileSearch, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCase } from '../../context/CaseContext';

export const PersonCard = ({ person }) => {
  const { setSelectedPerson } = useCase();

  const getCategoryVariant = (category) => {
    switch (category?.toLowerCase()) {
      case 'investigator': return 'primary';
      case 'official': return 'cyan';
      case 'witness': return 'warning';
      case 'person of interest': return 'danger';
      case 'expert': return 'purple';
      default: return 'default';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="group bg-dark-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 hover:shadow-lg flex flex-col justify-between transition-all duration-200"
    >
      <div className="space-y-4">
        {/* Header with Avatar and Category */}
        <div className="flex items-start gap-3.5">
          <div className="relative">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700 group-hover:border-slate-500 transition-colors"
            />
            <div className="absolute -bottom-1 -right-1 p-0.5 rounded-md bg-dark-950 border border-slate-800">
              <Shield className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <Badge variant={getCategoryVariant(person.category)} size="sm">
              {person.category}
            </Badge>
            <h4 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors mt-1 truncate">
              {person.name}
            </h4>
            <p className="text-xs text-slate-400 font-mono line-clamp-1">
              {person.role}
            </p>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {person.summary}
        </p>

        {/* Linked counts badge row */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-950/70 border border-slate-800/70">
            <FileSearch className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <div className="truncate">
              <span className="text-[10px] font-mono text-slate-400 block">Evidence</span>
              <span className="text-xs font-mono font-bold text-slate-200">{person.evidenceLinked || 0} linked</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-950/70 border border-slate-800/70">
            <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <div className="truncate">
              <span className="text-[10px] font-mono text-slate-400 block">Events</span>
              <span className="text-xs font-mono font-bold text-slate-200">{person.eventsLinked || 0} linked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
          {person.status || 'Registered Entity'}
        </span>

        <Button
          variant="secondary"
          size="sm"
          icon={ArrowUpRight}
          iconPosition="right"
          onClick={() => setSelectedPerson(person)}
        >
          View Profile
        </Button>
      </div>
    </motion.div>
  );
};
