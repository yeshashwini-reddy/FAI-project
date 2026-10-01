import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowLeft, 
  UserCheck, 
  BrainCircuit, 
  RotateCcw,
  FileSearch,
  Users,
  FolderOpen,
  FileText,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useCase } from '../context/CaseContext';

export const SolveCasePage = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { 
    cases, 
    allPeople, 
    allEvidence, 
    submitCaseSolution,
    userSubmissions 
  } = useCase();

  // Find target case matching URL parameter case-insensitively
  const targetCase = useMemo(() => {
    if (!caseId) return null;
    return cases.find(c => c.id.toUpperCase() === caseId.toUpperCase());
  }, [cases, caseId]);

  // Suspects and Evidence for current case
  const suspects = useMemo(() => {
    if (!targetCase) return [];
    return allPeople.filter(p => p.caseId === targetCase.id);
  }, [allPeople, targetCase]);

  const evidenceItems = useMemo(() => {
    if (!targetCase) return [];
    return allEvidence.filter(e => e.caseId === targetCase.id);
  }, [allEvidence, targetCase]);

  // State for submission form
  const [selectedSuspectId, setSelectedSuspectId] = useState('');
  const [theoryText, setTheoryText] = useState('');
  const [reasoningText, setReasoningText] = useState('');
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState([]);
  const [submittedResult, setSubmittedResult] = useState(
    targetCase ? userSubmissions[targetCase.id] || null : null
  );

  // If case does not exist
  if (!targetCase) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-crimson-950/80 border border-crimson-800 text-crimson-400 mx-auto flex items-center justify-center shadow-xl">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-sans text-slate-100 uppercase tracking-tight">
            CASE NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            The requested case file <span className="font-mono text-crimson-400">"{caseId}"</span> could not be found in the active investigation repository.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={FolderOpen}
          onClick={() => navigate('/cases')}
          className="shadow-[0_0_20px_rgba(225,29,72,0.35)]"
        >
          ← Back to Cases
        </Button>
      </div>
    );
  }

  const toggleEvidenceSelection = (evId) => {
    setSelectedEvidenceIds(prev => 
      prev.includes(evId) ? prev.filter(id => id !== evId) : [...prev, evId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSuspectId) return;

    const selectedSuspect = suspects.find(p => p.id === selectedSuspectId);
    const selectedEvTitles = evidenceItems
      .filter(e => selectedEvidenceIds.includes(e.id))
      .map(e => `${e.code || e.id}: ${e.title}`)
      .join(', ');

    const result = submitCaseSolution({
      caseId: targetCase.id,
      suspectId: selectedSuspectId,
      suspectName: selectedSuspect?.name || 'Unknown Suspect',
      theoryText,
      evidenceReasoning: `${reasoningText} ${selectedEvTitles ? `(Supporting Evidence: ${selectedEvTitles})` : ''}`
    });

    setSubmittedResult(result);
  };

  const handleReset = () => {
    setSubmittedResult(null);
    setSelectedSuspectId('');
    setTheoryText('');
    setReasoningText('');
    setSelectedEvidenceIds([]);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-crimson-400 bg-crimson-950 px-2.5 py-1 rounded border border-crimson-800 uppercase">
              {targetCase.id}
            </span>
            <span className="text-xs font-mono text-cyan-400">
              {targetCase.title}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
            SOLVE THE MYSTERY
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            You've investigated the case. Now submit your theory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate(`/cases/${targetCase.id}`)}
          >
            ← Back to Case File
          </Button>
        </div>
      </div>

      {/* Main Solution Form or Results Screen */}
      <AnimatePresence mode="wait">
        {!submittedResult ? (
          /* SECTION FORM */
          <motion.form
            key="solve-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Instruction Banner */}
            <div className="p-4 rounded-xl bg-crimson-950/30 border border-crimson-800/40 flex items-center gap-3 text-xs text-slate-300">
              <BrainCircuit className="w-5 h-5 text-crimson-400 flex-shrink-0" />
              <div>
                <span className="font-mono font-bold text-crimson-400 uppercase">
                  DETECTIVE DECISION TIME
                </span>
                <p className="text-slate-400 mt-0.5">
                  Review the suspects, enter your theory, select supporting evidence clues, and submit your final conclusion.
                </p>
              </div>
            </div>

            {/* SECTION 1: WHO DO YOU THINK IS RESPONSIBLE? */}
            <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <h2 className="text-sm font-mono font-bold uppercase text-slate-100 tracking-wider">
                    SECTION 1: WHO DO YOU THINK IS RESPONSIBLE? *
                  </h2>
                </div>
                <Badge variant="cyan" size="sm">{suspects.length} Suspects Available</Badge>
              </div>

              {suspects.length === 0 ? (
                <p className="text-xs font-mono text-slate-400">No suspects listed for this case.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suspects.map((suspect) => {
                    const isSelected = selectedSuspectId === suspect.id;
                    return (
                      <div
                        key={suspect.id}
                        onClick={() => setSelectedSuspectId(suspect.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                          isSelected
                            ? 'bg-crimson-950/80 border-crimson-600 shadow-[0_0_20px_rgba(225,29,72,0.25)] ring-1 ring-crimson-500'
                            : 'bg-dark-950 border-slate-800 hover:border-slate-700 hover:bg-dark-850/60'
                        }`}
                      >
                        <input
                          type="radio"
                          name="suspect"
                          checked={isSelected}
                          onChange={() => setSelectedSuspectId(suspect.id)}
                          className="mt-1 accent-crimson-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-slate-100 font-sans truncate">
                              {suspect.name}
                            </h3>
                            <Badge variant="default" size="sm">
                              {suspect.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-crimson-400 font-mono mt-0.5">
                            {suspect.role}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {suspect.summary || suspect.knownInformation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 2: WHAT DO YOU THINK HAPPENED? */}
            <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <BrainCircuit className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-mono font-bold uppercase text-slate-100 tracking-wider">
                  SECTION 2: WHAT DO YOU THINK HAPPENED?
                </h2>
              </div>
              <textarea
                rows={4}
                value={theoryText}
                onChange={(e) => setTheoryText(e.target.value)}
                placeholder="Explain your theory of how the mystery happened, entry/exit method, timing, or execution sequence..."
                className="w-full bg-dark-950 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans leading-relaxed"
              />
            </div>

            {/* SECTION 3: WHY DO YOU THINK THIS? */}
            <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileText className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-mono font-bold uppercase text-slate-100 tracking-wider">
                  SECTION 3: WHY DO YOU THINK THIS?
                </h2>
              </div>
              <textarea
                rows={4}
                value={reasoningText}
                onChange={(e) => setReasoningText(e.target.value)}
                placeholder="Explain your reasoning based on the clues, witness statements, and timeline contradictions..."
                className="w-full bg-dark-950 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans leading-relaxed"
              />
            </div>

            {/* SECTION 4: WHICH CLUES SUPPORT YOUR THEORY? */}
            <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileSearch className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-mono font-bold uppercase text-slate-100 tracking-wider">
                    SECTION 4: WHICH CLUES SUPPORT YOUR THEORY?
                  </h2>
                </div>
                <Badge variant="emerald" size="sm">
                  {selectedEvidenceIds.length} Selected
                </Badge>
              </div>

              {evidenceItems.length === 0 ? (
                <p className="text-xs font-mono text-slate-400">No evidence items cataloged for this case.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evidenceItems.map((item) => {
                    const isChecked = selectedEvidenceIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleEvidenceSelection(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 flex items-start gap-3 ${
                          isChecked
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500'
                            : 'bg-dark-950 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEvidenceSelection(item.id)}
                          className="mt-0.5 accent-cyan-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-cyan-400">
                              {item.code || item.id}
                            </span>
                            <Badge variant="default" size="sm">
                              {item.type}
                            </Badge>
                          </div>
                          <h4 className="font-bold text-slate-100 mt-1 truncate">
                            {item.title}
                          </h4>
                          <p className="text-slate-400 mt-0.5 line-clamp-1 text-[11px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 flex items-center justify-end gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(`/cases/${targetCase.id}`)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                icon={ShieldCheck}
                type="submit"
                disabled={!selectedSuspectId}
                className="shadow-[0_0_25px_rgba(225,29,72,0.4)]"
              >
                🔐 SUBMIT SOLUTION
              </Button>
            </div>
          </motion.form>
        ) : (
          /* RESULT AFTER SUBMISSION */
          <motion.div
            key="solve-result"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Result Header Banner */}
            <div
              className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl ${
                submittedResult.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-800 text-amber-300'
              }`}
            >
              <div className="flex items-start gap-4">
                {submittedResult.isCorrect ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 flex-shrink-0 mt-1" />
                ) : (
                  <AlertTriangle className="w-10 h-10 text-amber-400 flex-shrink-0 mt-1" />
                )}

                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest block">
                    {submittedResult.isCorrect ? '🎉 CASE SOLVED!' : '🔎 CASE NOT SOLVED'}
                  </span>
                  <h2 className="text-xl font-bold font-sans">
                    {submittedResult.isCorrect
                      ? 'Excellent investigation! Your answer matches the official solution.'
                      : 'Your answer does not match the official solution.'}
                  </h2>
                </div>
              </div>

              <Badge variant={submittedResult.isCorrect ? 'emerald' : 'warning'} size="md">
                {submittedResult.isCorrect ? 'Correct Solution' : 'Unmatched Theory'}
              </Badge>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* YOUR ANSWER */}
              <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase border-b border-slate-800 pb-3">
                  <UserCheck className="w-4 h-4" />
                  YOUR SUBMITTED ANSWER
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono block">Selected Suspect:</span>
                    <span className="text-slate-100 font-bold text-sm">{submittedResult.userSuspect}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block">Your Theory:</span>
                    <p className="text-slate-300 bg-dark-950 p-3 rounded-xl border border-slate-800 mt-1 leading-relaxed">
                      {submittedResult.theoryText || 'No detailed theory provided.'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block">Your Reasoning & Evidence Cited:</span>
                    <p className="text-slate-300 bg-dark-950 p-3 rounded-xl border border-slate-800 mt-1 leading-relaxed">
                      {submittedResult.evidenceReasoning || 'No specific evidence cited.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* OFFICIAL SOLUTION */}
              <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-crimson-400 uppercase border-b border-slate-800 pb-3">
                  <ShieldCheck className="w-4 h-4" />
                  OFFICIAL CASE SOLUTION & EXPLANATION
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono block">Official Culprit / Perpetrator:</span>
                    <span className="text-crimson-400 font-bold text-sm">{submittedResult.officialCulprit}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block">Key Evidence & Contradiction:</span>
                    <p className="text-slate-300 bg-dark-950 p-3 rounded-xl border border-slate-800 mt-1 leading-relaxed">
                      {submittedResult.officialSolution?.keyContradiction || targetCase.officialSolution?.keyContradiction}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block">Full Case Explanation:</span>
                    <p className="text-slate-300 bg-dark-950 p-3 rounded-xl border border-slate-800 mt-1 leading-relaxed">
                      {submittedResult.officialSolution?.fullExplanation || targetCase.officialSolution?.fullExplanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action Bar */}
            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <Button variant="secondary" size="sm" icon={RotateCcw} onClick={handleReset}>
                Try Another Theory
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={FileText}
                  onClick={() => navigate('/reports')}
                >
                  Inspect Investigation Reports
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowLeft}
                  onClick={() => navigate(`/cases/${targetCase.id}`)}
                >
                  ← Back to Case File
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
