import React from 'react';
import { motion } from 'framer-motion';
import { 
  Pin, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  User, 
  Clock, 
  ExternalLink, 
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export const ClueCard = ({ 
  item, 
  type = 'evidence', 
  onInspect, 
  isCompact = false 
}) => {
  const { 
    pinnedClueIds, 
    togglePinClue, 
    clueStatuses, 
    setClueStatus,
    inspectEvidence,
    inspectEvent,
    inspectPerson
  } = useCase();

  const isPinned = pinnedClueIds.has(item.id);
  const status = clueStatuses[item.id]; // 'important' | 'interesting' | 'unverified' | 'contradiction'

  const handleCardClick = () => {
    if (onInspect) {
      onInspect(item);
    } else if (type === 'evidence') {
      inspectEvidence(item);
    } else if (type === 'event') {
      inspectEvent(item);
    } else if (type === 'person') {
      inspectPerson(item);
    }
  };

  const statusConfig = {
    important: {
      label: 'IMPORTANT',
      bg: 'bg-crimson-950/80',
      border: 'border-crimson-700/80',
      text: 'text-crimson-400',
      glow: 'shadow-[0_0_15px_rgba(225,29,72,0.3)]'
    },
    interesting: {
      label: 'INTERESTING',
      bg: 'bg-amber-950/80',
      border: 'border-amber-700/80',
      text: 'text-amber-400',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]'
    },
    unverified: {
      label: 'UNVERIFIED',
      bg: 'bg-slate-900/90',
      border: 'border-slate-700',
      text: 'text-slate-400',
      glow: ''
    },
    contradiction: {
      label: 'CONTRADICTION',
      bg: 'bg-purple-950/80',
      border: 'border-purple-600/80',
      text: 'text-purple-300',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]'
    }
  };

  const currentStatusConfig = status ? statusConfig[status] : null;

  const renderIcon = () => {
    if (type === 'person') return <User className="w-3.5 h-3.5 text-purple-400" />;
    if (type === 'event') return <Clock className="w-3.5 h-3.5 text-amber-400" />;
    if (item.type === 'Image') return <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />;
    if (item.contradictions && item.contradictions.length > 0) return <AlertCircle className="w-3.5 h-3.5 text-crimson-400" />;
    return <FileText className="w-3.5 h-3.5 text-slate-300" />;
  };

  const getCode = () => {
    return item.code || item.id || `CLUE-${item.id}`;
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`group relative rounded-xl border bg-dark-900/90 p-4 backdrop-blur-md cursor-pointer transition-all ${
        isPinned ? 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.12)]' : 'border-slate-800 hover:border-slate-700 hover:shadow-lg'
      } ${currentStatusConfig ? currentStatusConfig.glow : ''}`}
      onClick={handleCardClick}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-dark-950 border border-slate-800 flex items-center justify-center">
            {renderIcon()}
          </div>
          <span className="font-mono text-[11px] font-bold text-slate-400 tracking-wider">
            {getCode()}
          </span>
        </div>

        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Status Badge if tagged */}
          {currentStatusConfig && (
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider border ${currentStatusConfig.bg} ${currentStatusConfig.border} ${currentStatusConfig.text}`}>
              {currentStatusConfig.label}
            </span>
          )}

          {/* Pin Button */}
          <button
            type="button"
            onClick={() => togglePinClue(item.id)}
            title={isPinned ? "Unpin clue from board" : "Pin clue to case board"}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              isPinned 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                : 'bg-dark-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Clue Title */}
      <h4 className="text-xs sm:text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-white transition-colors mb-1.5">
        {item.title || item.name}
      </h4>

      {/* Clue Excerpt / Summary */}
      {!isCompact && (
        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {item.summary || item.description || item.knownInformation}
        </p>
      )}

      {/* Footer Meta & Tagging Actions */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="truncate max-w-[120px]">
          {item.date || item.time || item.role || item.source || 'Archival'}
        </span>

        {/* Quick Tagging Selector */}
        <div 
          className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setClueStatus(item.id, 'important')}
            title="Mark Important"
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              status === 'important' ? 'bg-crimson-500 border-crimson-400 scale-110' : 'bg-transparent border-slate-700 hover:border-crimson-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setClueStatus(item.id, 'interesting')}
            title="Mark Interesting"
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              status === 'interesting' ? 'bg-amber-500 border-amber-400 scale-110' : 'bg-transparent border-slate-700 hover:border-amber-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setClueStatus(item.id, 'contradiction')}
            title="Flag Contradiction"
            className={`w-3.5 h-3.5 rounded-full border transition-all ${
              status === 'contradiction' ? 'bg-purple-500 border-purple-400 scale-110' : 'bg-transparent border-slate-700 hover:border-purple-500'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};
