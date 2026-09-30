import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Filter, 
  AlertTriangle, 
  Layers, 
  FileSearch, 
  Users, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { useCase } from '../context/CaseContext';

export const TimelinePage = () => {
  const { activeEvents, activeCase, setSelectedEvent } = useCase();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Incident', 'Witness', 'Evidence', 'Location', 'Investigation'];

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'All') return activeEvents;
    return activeEvents.filter(ev => ev.category?.toLowerCase() === selectedFilter.toLowerCase());
  }, [activeEvents, selectedFilter]);

  const uniqueLocationsCount = useMemo(() => {
    const locs = new Set(activeEvents.map(e => e.location));
    return locs.size || 8;
  }, [activeEvents]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              Case Timeline
            </h1>
            <Badge variant="warning" size="sm">
              {filteredEvents.length} Key Milestones
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Reconstruct chronological events and examine temporal relationships for <span className="text-slate-200 font-semibold">{activeCase?.title}</span>.
          </p>
        </div>

        {/* Timeline Analysis Quick Metrics Panel */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-dark-900/90 border border-slate-800 font-mono text-xs">
          <div className="px-2.5 text-center">
            <span className="text-[10px] text-slate-400 uppercase block">Events</span>
            <span className="font-bold text-amber-400">{activeCase?.eventsCount || 27} Events</span>
          </div>
          <div className="px-2.5 text-center border-x border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Locations</span>
            <span className="font-bold text-emerald-400">{uniqueLocationsCount} Locations</span>
          </div>
          <div className="px-2.5 text-center">
            <span className="text-[10px] text-slate-400 uppercase block">Deponents</span>
            <span className="font-bold text-purple-400">{activeCase?.peopleCount || 12} People</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-2 bg-dark-900/80 border border-slate-800 rounded-xl">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex-shrink-0 ${
              selectedFilter === f
                ? 'bg-amber-950 text-amber-300 border border-amber-800 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            {f === 'All' ? 'All Events' : f}
          </button>
        ))}
      </div>

      {/* Vertical Interactive Timeline */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          title="No events match this filter"
          description="Try switching back to 'All Events'."
          actionLabel="Show All Events"
          onAction={() => setSelectedFilter('All')}
        />
      ) : (
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {filteredEvents.map((ev, index) => {
            const hasConflict = ev.hasContradiction;
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className="relative group"
              >
                {/* Timeline node marker dot */}
                <div 
                  className={`absolute -left-6 sm:-left-8 top-4 w-4 h-4 rounded-full border-2 bg-dark-950 flex items-center justify-center transition-transform group-hover:scale-125 duration-200 z-10 ${
                    hasConflict
                      ? 'border-rose-500 bg-rose-950 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                      : 'border-amber-500 group-hover:border-cyan-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  }`}
                />

                {/* Event Card */}
                <div
                  onClick={() => setSelectedEvent(ev)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer backdrop-blur-md ${
                    hasConflict
                      ? 'bg-gradient-to-r from-dark-900 to-rose-950/20 border-rose-900/50 hover:border-rose-600/70'
                      : 'bg-dark-900/90 border-slate-800 hover:border-slate-700 hover:shadow-lg'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/80">
                          {ev.date} {ev.time ? `• ${ev.time}` : ''}
                        </span>
                        <Badge variant="default" size="sm">
                          {ev.category}
                        </Badge>
                        {hasConflict && (
                          <Badge variant="warning" size="sm" dot>
                            Contradiction Flagged
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors mt-2 font-sans">
                        {ev.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-dark-950/80 px-2.5 py-1 rounded-lg border border-slate-800 flex-shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-crimson-400" />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {ev.description}
                  </p>

                  {/* Conflict alert snippet if present */}
                  {hasConflict && (
                    <div className="mt-3 p-3 rounded-lg bg-rose-950/30 border border-rose-900/40 text-xs text-rose-200 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="text-rose-300">Temporal Inconsistency:</strong> {ev.contradictionNote}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Confidence: {ev.confidence || 'Verified'}</span>
                    <span className="text-cyan-400 flex items-center gap-1 group-hover:underline">
                      Inspect Event Details <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
