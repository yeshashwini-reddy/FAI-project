import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Database, 
  Cpu, 
  Microscope,
  Calendar, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCase } from '../../context/CaseContext';

export const EvidenceCard = ({ item }) => {
  const { setSelectedEvidence } = useCase();

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'documents':
      case 'document':
        return FileText;
      case 'images':
      case 'image':
        return ImageIcon;
      case 'statements':
      case 'statement':
        return MessageSquare;
      case 'records':
      case 'record':
        return Database;
      case 'reports':
      case 'forensic report':
        return Microscope;
      case 'digital':
        return Cpu;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'documents':
      case 'document':
        return 'cyan';
      case 'images':
      case 'image':
        return 'purple';
      case 'statements':
      case 'statement':
        return 'warning';
      case 'records':
      case 'record':
        return 'emerald';
      case 'reports':
      case 'forensic report':
        return 'primary';
      default:
        return 'default';
    }
  };

  const Icon = getCategoryIcon(item.type || item.category);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="group bg-dark-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 hover:shadow-lg flex flex-col justify-between transition-all duration-200"
    >
      <div className="space-y-3">
        {/* Header with Code & Type */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-slate-300 group-hover:text-cyan-400 transition-colors">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-400 block font-semibold">
                {item.code || item.id}
              </span>
              <Badge variant={getCategoryColor(item.type || item.category)} size="sm">
                {item.type || item.category}
              </Badge>
            </div>
          </div>

          {item.contradictions && item.contradictions.length > 0 && (
            <span 
              title="Contains flagged inconsistency"
              className="p-1 rounded bg-amber-950/60 border border-amber-800/80 text-amber-400 flex items-center gap-1 text-[10px] font-mono"
            >
              <AlertCircle className="w-3 h-3 text-amber-400" />
              Conflict
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Source & Date Info */}
        <div className="pt-3 border-t border-slate-800/70 space-y-1.5 text-xs font-mono text-slate-400">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Added:</span>
            <span className="text-slate-300">{item.dateAdded || item.date}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Source:</span>
            <span className="text-slate-300 truncate max-w-[180px]" title={item.source}>
              {item.source}
            </span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          {item.status || 'Verified'}
        </span>

        <Button
          variant="secondary"
          size="sm"
          icon={ExternalLink}
          iconPosition="right"
          onClick={() => setSelectedEvidence(item)}
        >
          View Evidence
        </Button>
      </div>
    </motion.div>
  );
};
