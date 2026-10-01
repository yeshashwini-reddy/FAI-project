import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertCircle, HelpCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCase } from '../../context/CaseContext';
import { Button } from '../common/Button';

export const SubmitInvestigationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { 
    activeCase, 
    inspectedEvidenceIds, 
    inspectedEventIds, 
    inspectedPeopleIds, 
    hypotheses,
    investigationMetrics,
    runSimulatedInvestigation,
    investigationStatus
  } = useCase();

  if (!isOpen) return null;

  const checklist = [
    { label: "Evidence reviewed", count: `${inspectedEvidenceIds.size} files`, isDone: inspectedEvidenceIds.size >= 3 },
    { label: "Timeline examined", count: `${inspectedEventIds.size} events`, isDone: inspectedEventIds.size >= 2 },
    { label: "Relationships mapped", count: `${inspectedPeopleIds.size} deponents`, isDone: inspectedPeopleIds.size >= 1 },
    { label: "Hypothesis created", count: `${hypotheses.length} active theories`, isDone: hypotheses.length >= 1 }
  ];

  const handleSubmit = () => {
    runSimulatedInvestigation();
    onClose();
    navigate('/reports');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-dark-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-dark-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-crimson-950 border border-crimson-800/60 flex items-center justify-center text-crimson-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 font-mono tracking-wide">
                  SUBMIT INVESTIGATION
                </h3>
                <p className="text-xs text-slate-400">
                  {activeCase?.title} • {activeCase?.year}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Checklist Content */}
          <div className="p-6 space-y-5">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider">
              Pre-Submission Readiness Checklist
            </div>

            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    item.isDone
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200'
                      : 'bg-dark-950/70 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${item.isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className="text-xs font-bold font-sans">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Unresolved Questions Callout */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-mono font-bold text-amber-300">
                  Unresolved Investigative Questions: 3
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  In accordance with archival rigor, unverified questions and conflicting testimonies will be objectively documented in the forensic audit report.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 border-t border-slate-800 bg-dark-950/80 flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Review Case Files
            </Button>

            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={handleSubmit}
              className="shadow-[0_0_20px_rgba(225,29,72,0.3)] font-mono text-xs font-bold tracking-wider"
            >
              SUBMIT & GENERATE REPORT (+500 XP)
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
