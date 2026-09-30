import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  FolderOpen, 
  FileSearch, 
  Users, 
  Clock, 
  FileText,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { useNavigate } from 'react-router-dom';

export const GlobalSearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    cases, 
    allEvidence, 
    allPeople, 
    allEvents, 
    allReports,
    setSelectedEvidence,
    setSelectedPerson,
    setSelectedEvent,
    setSelectedReport,
    setActiveCaseId
  } = useCase();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const caseMatches = cases
      .filter(c => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
      .map(c => ({ ...c, resultType: 'case' }));

    const evidenceMatches = allEvidence
      .filter(e => e.title.toLowerCase().includes(q) || e.code.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
      .map(e => ({ ...e, resultType: 'evidence' }));

    const peopleMatches = allPeople
      .filter(p => p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .map(p => ({ ...p, resultType: 'person' }));

    const eventMatches = allEvents
      .filter(ev => ev.title.toLowerCase().includes(q) || ev.location.toLowerCase().includes(q) || ev.description.toLowerCase().includes(q))
      .map(ev => ({ ...ev, resultType: 'event' }));

    const reportMatches = allReports
      .filter(r => r.title.toLowerCase().includes(q) || r.reportNumber.toLowerCase().includes(q))
      .map(r => ({ ...r, resultType: 'report' }));

    let combined = [];
    if (activeCategory === 'all' || activeCategory === 'cases') combined.push(...caseMatches);
    if (activeCategory === 'all' || activeCategory === 'evidence') combined.push(...evidenceMatches);
    if (activeCategory === 'all' || activeCategory === 'people') combined.push(...peopleMatches);
    if (activeCategory === 'all' || activeCategory === 'events') combined.push(...eventMatches);
    if (activeCategory === 'all' || activeCategory === 'reports') combined.push(...reportMatches);

    return combined.slice(0, 15);
  }, [query, activeCategory, cases, allEvidence, allPeople, allEvents, allReports]);

  const handleSelectResult = (item) => {
    setIsSearchOpen(false);
    setQuery('');

    if (item.resultType === 'case') {
      setActiveCaseId(item.id);
      navigate(`/cases/${item.id}`);
    } else if (item.resultType === 'evidence') {
      setActiveCaseId(item.caseId);
      setSelectedEvidence(item);
    } else if (item.resultType === 'person') {
      setActiveCaseId(item.caseId);
      setSelectedPerson(item);
    } else if (item.resultType === 'event') {
      setActiveCaseId(item.caseId);
      setSelectedEvent(item);
    } else if (item.resultType === 'report') {
      setActiveCaseId(item.caseId);
      setSelectedReport(item);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'case': return FolderOpen;
      case 'evidence': return FileSearch;
      case 'person': return Users;
      case 'event': return Clock;
      case 'report': return FileText;
      default: return Search;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'case': return 'text-crimson-400 bg-crimson-950/60 border-crimson-800';
      case 'evidence': return 'text-cyan-400 bg-cyan-950/60 border-cyan-800';
      case 'person': return 'text-purple-400 bg-purple-950/60 border-purple-800';
      case 'event': return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'report': return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Search Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl bg-dark-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-dark-850/60">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              placeholder="Search across all cases, evidence, people, timeline..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-800/80 bg-dark-950/60 text-xs font-mono overflow-x-auto">
            {['all', 'cases', 'evidence', 'people', 'events', 'reports'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-md uppercase tracking-wider transition-colors ${
                  activeCategory === cat
                    ? 'bg-crimson-950/80 text-crimson-400 border border-crimson-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2">
            {!query.trim() ? (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                <p>Type to search across intelligence database...</p>
                <div className="mt-3 flex justify-center gap-4 text-[11px] text-slate-400">
                  <span>💡 Try "Whitechapel"</span>
                  <span>💡 Try "Inquest"</span>
                  <span>💡 Try "Abberline"</span>
                  <span>💡 Try "01:30 AM"</span>
                </div>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">
                No matching records found for "{query}".
              </div>
            ) : (
              <div className="space-y-1">
                {filteredResults.map((item, index) => {
                  const Icon = getIcon(item.resultType);
                  const title = item.title || item.name || item.code;
                  const subtitle = item.type || item.role || item.location || item.category;

                  return (
                    <button
                      key={`${item.resultType}-${item.id}-${index}`}
                      onClick={() => handleSelectResult(item)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-dark-800 border border-transparent hover:border-slate-700/80 text-left transition-all duration-150 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-slate-400 group-hover:text-white">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-100 group-hover:text-white">
                              {title}
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase ${getTypeBadgeColor(item.resultType)}`}>
                              {item.resultType}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {subtitle} {item.code ? `• ${item.code}` : ''}
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-dark-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Navigation: <kbd className="px-1 py-0.5 bg-slate-800 text-slate-300 rounded">ESC</kbd> to close</span>
            <span>AI Evidence Matrix Online</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
