import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Layers, Clock, Network, HelpCircle, CheckCircle } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export const InvestigationProgress = () => {
  const { investigationMetrics, xp, investigatorRank } = useCase();

  const metrics = [
    {
      label: "Evidence Explored",
      value: investigationMetrics.evidenceExplored,
      color: "from-crimson-500 to-rose-400",
      icon: Layers
    },
    {
      label: "Timeline Reconstructed",
      value: investigationMetrics.timelineReconstructed,
      color: "from-amber-500 to-yellow-400",
      icon: Clock
    },
    {
      label: "Connections Discovered",
      value: investigationMetrics.connectionsDiscovered,
      color: "from-cyan-500 to-blue-400",
      icon: Network
    },
    {
      label: "Unresolved Inquiries",
      value: investigationMetrics.openQuestions,
      color: "from-purple-500 to-indigo-400",
      icon: HelpCircle
    }
  ];

  return (
    <div className="bg-dark-900/80 rounded-2xl border border-slate-800/80 p-4 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-xs font-mono font-bold text-slate-100 tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            INVESTIGATION PROGRESS
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Archival coverage & evidentiary synthesis
          </p>
        </div>

        <div className="text-right">
          <div className="text-sm font-mono font-extrabold text-cyan-400">
            {investigationMetrics.overallProgress}%
          </div>
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
            Case Coverage
          </div>
        </div>
      </div>

      {/* Rank & Tier */}
      <div className="p-2.5 rounded-xl bg-dark-950/70 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-crimson-600/30 to-dark-900 border border-crimson-500/40 flex items-center justify-center text-crimson-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">
              {investigatorRank.title}
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              {investigatorRank.badge} • Level {investigatorRank.level}
            </div>
          </div>
        </div>
        <div className="text-[11px] font-mono font-bold text-amber-400">
          {xp} XP
        </div>
      </div>

      {/* Metrics Progress Bars */}
      <div className="space-y-3 pt-1">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Icon className="w-3 h-3 text-slate-400" />
                  {m.label}
                </span>
                <span className="font-bold text-slate-200">
                  {m.value}%
                </span>
              </div>
              <div className="h-1.5 bg-dark-950 rounded-full overflow-hidden border border-slate-800/80">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${m.color} rounded-full`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
