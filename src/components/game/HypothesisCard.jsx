import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle, AlertCircle, HelpCircle, FileText, Sparkles } from 'lucide-react';

export const HypothesisCard = ({ hypothesis, onInspectEvidence }) => {
  const {
    id,
    title,
    theory,
    supportingEvidenceIds = [],
    contradictingEvidenceIds = [],
    unresolvedQuestions = [],
    coverageScore = 70,
    status = "Active Theory"
  } = hypothesis;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-dark-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg backdrop-blur-md space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-amber-400">
            {id}
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-950 border border-slate-800 text-slate-300">
          {status}
        </span>
      </div>

      <h4 className="text-sm font-bold text-slate-100 font-sans leading-tight">
        {title}
      </h4>

      <p className="text-xs text-slate-300 leading-relaxed bg-dark-950/60 p-3 rounded-lg border border-slate-800/80 font-sans italic">
        "{theory}"
      </p>

      {/* Stats Breakdown */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
        <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/30">
          <div className="text-xs font-bold text-emerald-400">
            {supportingEvidenceIds.length}
          </div>
          <div className="text-[9px] text-slate-400">Supporting</div>
        </div>

        <div className="p-2 rounded-lg bg-purple-950/20 border border-purple-800/30">
          <div className="text-xs font-bold text-purple-400">
            {contradictingEvidenceIds.length}
          </div>
          <div className="text-[9px] text-slate-400">Contradicting</div>
        </div>

        <div className="p-2 rounded-lg bg-dark-950/80 border border-slate-800">
          <div className="text-xs font-bold text-slate-300">
            {unresolvedQuestions.length}
          </div>
          <div className="text-[9px] text-slate-400">Unresolved</div>
        </div>
      </div>

      {/* Evidence Coverage Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-slate-400">Evidence Coverage</span>
          <span className="font-bold text-amber-400">{coverageScore}%</span>
        </div>
        <div className="h-2 bg-dark-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${coverageScore}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
