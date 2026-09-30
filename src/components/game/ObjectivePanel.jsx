import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target, Award, Sparkles } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export const ObjectivePanel = () => {
  const { activeObjectives, xp, investigatorRank } = useCase();

  return (
    <div className="bg-dark-900/80 rounded-2xl border border-slate-800/80 p-4 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-crimson-400" />
          <h3 className="text-xs font-mono font-bold text-slate-100 tracking-wider">
            CASE OBJECTIVES
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-crimson-950/60 border border-crimson-800/50 text-[10px] font-mono text-crimson-300">
          <Award className="w-3 h-3" />
          <span>{xp} XP</span>
        </div>
      </div>

      {/* Objectives List */}
      <div className="space-y-2.5">
        {activeObjectives.map((obj) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-2.5 rounded-xl border transition-all ${
              obj.isCompleted 
                ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300' 
                : 'bg-dark-950/60 border-slate-800/70 text-slate-400'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex-shrink-0">
                {obj.isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </motion.div>
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className={`text-xs font-bold leading-snug font-sans ${obj.isCompleted ? 'text-slate-200 line-through opacity-80' : 'text-slate-200'}`}>
                    {obj.title}
                  </h4>
                  <span className="text-[9px] font-mono font-bold text-slate-400">
                    +{obj.xp} XP
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                  {obj.description}
                </p>

                {/* Progress bar if multi-item */}
                {obj.targetCount > 1 && !obj.isCompleted && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-dark-950 rounded-full overflow-hidden border border-slate-800">
                      <div 
                        className="h-full bg-gradient-to-r from-crimson-600 to-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (obj.currentProgress / obj.targetCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">
                      {obj.currentProgress}/{obj.targetCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
