import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Check, ShieldAlert, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { Button } from '../common/Button';

export const CreateHypothesisModal = ({ isOpen, onClose }) => {
  const { activeEvidence, activeEvents, createHypothesis } = useCase();

  const [title, setTitle] = useState('');
  const [theory, setTheory] = useState('');
  const [supportingIds, setSupportingIds] = useState([]);
  const [contradictingIds, setContradictingIds] = useState([]);

  if (!isOpen) return null;

  const toggleSupport = (id) => {
    setSupportingIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    // Remove from contradicting if present
    setContradictingIds(prev => prev.filter(item => item !== id));
  };

  const toggleContradict = (id) => {
    setContradictingIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    // Remove from supporting if present
    setSupportingIds(prev => prev.filter(item => item !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theory.trim()) return;

    createHypothesis({
      title: title.trim() || 'Working Case Hypothesis',
      theory: theory.trim(),
      supportingEvidenceIds: supportingIds,
      contradictingEvidenceIds: contradictingIds
    });

    // Reset & Close
    setTitle('');
    setTheory('');
    setSupportingIds([]);
    setContradictingIds([]);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-dark-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-5 border-b border-slate-800 bg-dark-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 font-mono tracking-wide">
                  CREATE HYPOTHESIS
                </h3>
                <p className="text-xs text-slate-400">
                  Construct your investigative theory and link supporting or contradictory records.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Hypothesis Title / Premise
              </label>
              <input
                type="text"
                placeholder="e.g. Transit Interruption & Dual Scene Sequence"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/60 transition-colors"
              />
            </div>

            {/* Theory Text */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                What do you think happened? <span className="text-crimson-400">*</span>
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your working deductions based on the examined timeline, deponent testimonies, and physical evidence records..."
                value={theory}
                onChange={(e) => setTheory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/60 transition-colors leading-relaxed"
              />
            </div>

            {/* Evidence Selector */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                Link Clues & Documents
              </label>
              <p className="text-[11px] text-slate-400 mb-3">
                Tag items that either support your deductive theory or present potential contradictions.
              </p>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                {activeEvidence.map((ev) => {
                  const isSup = supportingIds.includes(ev.id);
                  const isContra = contradictingIds.includes(ev.id);

                  return (
                    <div
                      key={ev.id}
                      className="p-2.5 rounded-xl bg-dark-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {ev.code || ev.id}
                        </span>
                        <span className="text-slate-200 font-medium truncate">
                          {ev.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleSupport(ev.id)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors ${
                            isSup 
                              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300' 
                              : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {isSup ? '✓ Supporting' : '+ Support'}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleContradict(ev.id)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors ${
                            isContra 
                              ? 'bg-purple-500/20 border-purple-500/60 text-purple-300' 
                              : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {isContra ? '⚠ Contradicts' : '+ Contradicts'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Coverage Disclaimer Note */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
              Note: The AI Partner will evaluate <span className="text-slate-200">Evidence Coverage</span> across existing archival records rather than claiming factual certainty.
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Plus}
                disabled={!theory.trim()}
              >
                Log Hypothesis (+150 XP)
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
