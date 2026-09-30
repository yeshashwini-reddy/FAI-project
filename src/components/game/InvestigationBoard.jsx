import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pin, 
  Sparkles, 
  Layers, 
  Filter, 
  Plus, 
  Search, 
  AlertCircle, 
  FileText, 
  Clock, 
  Users, 
  Lightbulb,
  CheckCircle,
  Network
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { ClueCard } from './ClueCard';
import { Button } from '../common/Button';

export const InvestigationBoard = ({ onOpenCreateHypothesis, onOpenNotes }) => {
  const { 
    activeCase, 
    activeEvidence, 
    activeEvents, 
    activePeople, 
    pinnedClueIds,
    clueStatuses,
    connectionDiscoveryAlert,
    investigate
  } = useCase();

  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL' | 'PINNED' | 'CONTRADICTIONS' | 'EVIDENCE' | 'TIMELINE' | 'PEOPLE'
  const [boardSearch, setBoardSearch] = useState('');

  // Collect all clue items
  const allClues = useMemo(() => {
    const evClues = activeEvidence.map(e => ({ ...e, clueType: 'evidence' }));
    const eventClues = activeEvents.map(ev => ({ ...ev, clueType: 'event' }));
    const peopleClues = activePeople.map(p => ({ ...p, clueType: 'person' }));
    return [...evClues, ...eventClues, ...peopleClues];
  }, [activeEvidence, activeEvents, activePeople]);

  // Filtered clues for the board
  const filteredClues = useMemo(() => {
    return allClues.filter(clue => {
      // Search
      const searchTarget = `${clue.title || clue.name || ''} ${clue.summary || clue.description || ''} ${clue.code || clue.id || ''}`.toLowerCase();
      if (boardSearch && !searchTarget.includes(boardSearch.toLowerCase())) {
        return false;
      }

      // Filter category
      if (activeFilter === 'PINNED') {
        return pinnedClueIds.has(clue.id);
      }
      if (activeFilter === 'CONTRADICTIONS') {
        return clueStatuses[clue.id] === 'contradiction' || (clue.contradictions && clue.contradictions.length > 0) || clue.hasContradiction;
      }
      if (activeFilter === 'EVIDENCE') {
        return clue.clueType === 'evidence';
      }
      if (activeFilter === 'TIMELINE') {
        return clue.clueType === 'event';
      }
      if (activeFilter === 'PEOPLE') {
        return clue.clueType === 'person';
      }
      return true;
    });
  }, [allClues, activeFilter, boardSearch, pinnedClueIds, clueStatuses]);

  const pinnedCount = pinnedClueIds.size;
  const contradictionCount = Object.values(clueStatuses).filter(s => s === 'contradiction').length;

  return (
    <div className="flex flex-col h-full bg-dark-950/60 rounded-2xl border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden relative">
      {/* Top Board Toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-dark-900/80 backdrop-blur-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <h2 className="text-base font-bold text-slate-100 tracking-tight font-sans flex items-center gap-2">
              INVESTIGATION BOARD
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-950 border border-slate-800 text-slate-400">
              {filteredClues.length} CLUES LOADED
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive evidentiary workspace. Pin clues, mark contradictions, and construct your working theory.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Lightbulb}
            onClick={onOpenCreateHypothesis}
            className="text-xs border-amber-500/30 hover:border-amber-500/60 text-amber-300"
          >
            + Form Hypothesis
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={onOpenNotes}
            className="text-xs border-slate-700"
          >
            Add Note
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-dark-950/40 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'ALL', label: 'All Clues', count: allClues.length },
            { id: 'PINNED', label: 'Pinned on Board', count: pinnedCount, isPinned: true },
            { id: 'CONTRADICTIONS', label: 'Contradictions', count: contradictionCount, isDanger: true },
            { id: 'EVIDENCE', label: 'Evidence Files', count: activeEvidence.length },
            { id: 'TIMELINE', label: 'Timeline Events', count: activeEvents.length },
            { id: 'PEOPLE', label: 'People / Deponents', count: activePeople.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-dark-900/60'
              }`}
            >
              {tab.isPinned && <Pin className="w-3 h-3 text-amber-400 fill-amber-400" />}
              {tab.isDanger && <AlertCircle className="w-3 h-3 text-purple-400" />}
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-dark-950/80 border border-slate-800 text-slate-400">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Clue Search Input */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Filter clues..."
            value={boardSearch}
            onChange={(e) => setBoardSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-dark-900/90 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Discovery Alert Toast if triggered */}
      <AnimatePresence>
        {connectionDiscoveryAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-4 mt-3 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/90 via-dark-900 to-crimson-950/90 border border-cyan-500/50 shadow-lg flex items-center justify-between gap-3 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
                  NEW CONNECTION DISCOVERED
                </h4>
                <p className="text-xs text-slate-300">
                  {connectionDiscoveryAlert.text || "Correlated timeline milestone with deposition testimony."}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-dark-950 text-cyan-400 border border-cyan-500/30">
              +50 XP
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Board Clues Grid */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {filteredClues.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-xl border border-dashed border-slate-800 bg-dark-900/30">
            <Layers className="w-10 h-10 text-slate-400 mb-3" />
            <h4 className="text-sm font-bold text-slate-300 font-mono">
              {activeFilter === 'PINNED' ? 'NO EVIDENCE PINNED' : 'NO MATCHING CLUES FOUND'}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              {activeFilter === 'PINNED' 
                ? 'Start exploring the case files, review documents and eyewitness depositions, and pin important clues here.'
                : 'Try adjusting your search terms or selecting a different filter category.'}
            </p>
            {activeFilter === 'PINNED' && (
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => setActiveFilter('ALL')}
              >
                Explore All Case Clues
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5">
            {filteredClues.map((clue) => (
              <ClueCard
                key={clue.id}
                item={clue}
                type={clue.clueType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
