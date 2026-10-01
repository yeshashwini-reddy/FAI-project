import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  X, 
  Sparkles,
  ArrowRight,
  UserCheck,
  BrainCircuit,
  RotateCcw
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const SolveCaseModal = ({
  isOpen,
  onClose,
  activeCase,
  activePeople,
  activeEvidence,
  onSubmitSolution,
  existingSubmission
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState('');
  const [theoryText, setTheoryText] = useState('');
  const [evidenceReasoning, setEvidenceReasoning] = useState('');
  const [submittedResult, setSubmittedResult] = useState(existingSubmission || null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSuspectId) return;

    const selectedSuspect = activePeople.find(p => p.id === selectedSuspectId);
    const result = onSubmitSolution({
      caseId: activeCase.id,
      suspectId: selectedSuspectId,
      suspectName: selectedSuspect?.name || 'Unknown Suspect',
      theoryText,
      evidenceReasoning
    });

    setSubmittedResult(result);
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setSelectedSuspectId('');
    setTheoryText('');
    setEvidenceReasoning('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl rounded-2xl bg-dark-900 border border-slate-800 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-dark-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-crimson-950 border border-crimson-800 text-crimson-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100 font-sans tracking-tight">
                  {submittedResult ? 'OFFICIAL CASE RESOLUTION REPORT' : 'SUBMIT YOUR FINAL CASE THEORY'}
                </h2>
                <p className="text-xs text-slate-400">
                  Case: <span className="text-slate-200 font-semibold">{activeCase?.title}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {!submittedResult ? (
              /* SUBMISSION FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 rounded-xl bg-crimson-950/30 border border-crimson-800/40 text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-crimson-400 font-mono uppercase">
                    <BrainCircuit className="w-4 h-4" />
                    HUMAN DETECTIVE DECISION TIME
                  </div>
                  <p className="text-slate-400">
                    You have investigated the case evidence, timeline, and suspect statements. Now submit your official conclusion.
                  </p>
                </div>

                {/* Question 1: Who do you think is responsible? */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-200">
                    1. Who do you think is responsible? *
                  </label>
                  <select
                    value={selectedSuspectId}
                    onChange={(e) => setSelectedSuspectId(e.target.value)}
                    required
                    className="w-full bg-dark-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-crimson-500 font-sans"
                  >
                    <option value="">-- Select Suspect / Person of Interest --</option>
                    {activePeople.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Question 2: How do you think it happened? */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-200">
                    2. How do you think it happened? (Your Theory)
                  </label>
                  <textarea
                    rows={3}
                    value={theoryText}
                    onChange={(e) => setTheoryText(e.target.value)}
                    placeholder="Describe your theory of the crime, access method, or sequence of events..."
                    className="w-full bg-dark-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans"
                  />
                </div>

                {/* Question 3: Why do you think this person is responsible? */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono font-bold uppercase text-slate-200">
                    3. Why is this person responsible? (Supporting Evidence / Contradictions)
                  </label>
                  <textarea
                    rows={3}
                    value={evidenceReasoning}
                    onChange={(e) => setEvidenceReasoning(e.target.value)}
                    placeholder="Cite specific evidence codes (e.g. E-002), timeline gaps, or statement contradictions..."
                    className="w-full bg-dark-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <Button variant="secondary" size="md" onClick={onClose} type="button">
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    icon={ShieldCheck}
                    type="submit"
                    disabled={!selectedSuspectId}
                    className="shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                  >
                    SUBMIT FINAL SOLUTION
                  </Button>
                </div>
              </form>
            ) : (
              /* RESULTS AFTER SUBMISSION */
              <div className="space-y-6">
                {/* Result Banner */}
                <div
                  className={`p-5 rounded-xl border flex items-start gap-4 ${
                    submittedResult.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-800 text-amber-300'
                  }`}
                >
                  {submittedResult.isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">
                        {submittedResult.isCorrect ? 'CASE SOLVED! CORRECT CONCLUSION' : 'UNMATCHED THEORY • CASE EVALUATION'}
                      </span>
                      <Badge variant={submittedResult.isCorrect ? 'emerald' : 'warning'} size="sm">
                        {submittedResult.isCorrect ? 'Match' : 'Unmatched'}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold font-sans">
                      {submittedResult.isCorrect
                        ? 'Great work, Detective! Your theory matches the official case findings.'
                        : 'Your answer does not match the official solution.'}
                    </h3>
                  </div>
                </div>

                {/* Comparison Grid: Your Answer vs Official Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Your Answer Card */}
                  <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                      <UserCheck className="w-4 h-4" />
                      YOUR INVESTIGATION ANSWER
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block font-mono">Selected Suspect:</span>
                        <span className="text-slate-100 font-bold">{submittedResult.userSuspect}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Your Theory:</span>
                        <p className="text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed mt-1">
                          {submittedResult.theoryText || 'No detailed theory provided.'}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Evidence Referenced:</span>
                        <p className="text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed mt-1">
                          {submittedResult.evidenceReasoning || 'No specific evidence cited.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Official Solution Card */}
                  <div className="p-4 rounded-xl bg-dark-950 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-crimson-400 uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      OFFICIAL CASE SOLUTION
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block font-mono">Official Perpetrator:</span>
                        <span className="text-crimson-400 font-bold">{submittedResult.officialCulprit}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Key Contradiction & Evidence:</span>
                        <p className="text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed mt-1">
                          {submittedResult.officialSolution?.keyContradiction}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-mono">Full Case Explanation:</span>
                        <p className="text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed mt-1">
                          {submittedResult.officialSolution?.fullExplanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Button variant="secondary" size="sm" icon={RotateCcw} onClick={handleReset}>
                    Try Another Theory
                  </Button>
                  <Button variant="primary" size="md" onClick={onClose}>
                    Close & Return to Workspace
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
