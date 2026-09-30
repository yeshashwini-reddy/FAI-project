import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, X, Sparkles, CheckCircle2, AlertTriangle, FileSearch } from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { Button } from '../common/Button';

export const CaseBriefingModal = ({ isOpen, onClose, onBegin }) => {
  const { activeCase } = useCase();

  if (!isOpen) return null;

  const objectives = [
    { num: '01', title: 'Examine the Evidence', desc: 'Inspect digitized transcripts, autopsy notes, and maps' },
    { num: '02', title: 'Reconstruct the Timeline', desc: 'Map precise hour-by-hour patrol sweeps and witness sightings' },
    { num: '03', title: 'Identify Relationships', desc: 'Trace deponent networks, surgeon consultations, and command chains' },
    { num: '04', title: 'Find Inconsistencies', desc: 'Isolate irreconcilable temporal contradictions and record anomalies' },
    { num: '05', title: 'Develop Hypotheses', desc: 'Synthesize working deductive theories with linked evidence support' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-2xl bg-dark-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Subtle decorative scanline/glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-rose-500 to-cyan-500" />

          {/* Top Bar */}
          <div className="p-6 border-b border-slate-800/80 bg-dark-900/60 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-crimson-950/80 border border-crimson-800/60 text-crimson-400 font-mono text-[10px] font-bold tracking-widest uppercase">
                  {activeCase?.id || 'CASE-001'}
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/40 text-amber-300 font-mono text-[10px] font-bold tracking-widest uppercase">
                  STATUS: {activeCase?.status || 'UNRESOLVED'}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100 font-sans tracking-tight uppercase">
                {activeCase?.title || 'The Whitechapel File'}
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                {activeCase?.location || 'London, England'} • {activeCase?.year || '1888'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Briefing Text Body */}
          <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            {/* Mission Statement */}
            <div className="p-4 rounded-xl bg-dark-900/90 border border-slate-800/90 space-y-2 font-sans">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                The investigation contains historical documents, witness accounts, police records and other archival material.
              </p>
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-1">
                <span className="text-crimson-400 font-bold">Your task is not to guess.</span>
                <span className="text-cyan-400 font-bold">Your task is to examine the evidence.</span>
              </div>
            </div>

            {/* Case Objectives List */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
                PRIMARY INVESTIGATION OBJECTIVES
              </div>

              <div className="space-y-2">
                {objectives.map((obj) => (
                  <div
                    key={obj.num}
                    className="p-3 rounded-xl bg-dark-900/60 border border-slate-800/80 flex items-center gap-3.5"
                  >
                    <span className="text-base font-mono font-extrabold text-crimson-500/90">
                      {obj.num}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 font-sans">
                        {obj.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {obj.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-5 border-t border-slate-800/90 bg-dark-900/80 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
            >
              Skip Briefing
            </button>

            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                if (onBegin) onBegin();
                onClose();
              }}
              className="shadow-[0_0_20px_rgba(225,29,72,0.3)] font-mono text-xs font-bold tracking-wider"
            >
              BEGIN INVESTIGATION
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
