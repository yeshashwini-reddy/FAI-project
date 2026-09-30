import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  Terminal, 
  Database, 
  FileText, 
  Clock, 
  GitBranch, 
  Cpu 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AgentActivityFeed = ({ 
  steps = [], 
  activeStepIndex = -1, 
  logs = [], 
  status = 'idle' 
}) => {
  const getStepIcon = (iconName, isCurrent, isDone) => {
    if (isCurrent) return <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />;
    if (isDone) return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;

    switch (iconName) {
      case 'database': return <Database className="w-4 h-4 text-slate-500" />;
      case 'file-text': return <FileText className="w-4 h-4 text-slate-500" />;
      case 'clock': return <Clock className="w-4 h-4 text-slate-500" />;
      case 'alert-triangle': return <AlertTriangle className="w-4 h-4 text-slate-500" />;
      case 'git-branch': return <GitBranch className="w-4 h-4 text-slate-500" />;
      case 'cpu': return <Cpu className="w-4 h-4 text-slate-500" />;
      default: return <Cpu className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Steps Pipeline Visualizer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
          <span>Investigation Pipeline Stages</span>
          <span className="text-cyan-400 font-semibold">
            {status === 'running' 
              ? `Stage ${Math.min(activeStepIndex + 1, steps.length)} of ${steps.length}`
              : status === 'completed' 
                ? 'All Stages Executed' 
                : 'Ready'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {steps.map((step, idx) => {
            const isDone = activeStepIndex > idx || status === 'completed';
            const isCurrent = activeStepIndex === idx && status === 'running';
            const isPending = activeStepIndex < idx && status !== 'completed';

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: isPending ? 0.4 : 1,
                  scale: isCurrent ? 1.01 : 1
                }}
                className={`p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                    : isDone
                      ? 'bg-dark-900/90 border-slate-800'
                      : 'bg-dark-950/40 border-slate-800/40'
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-dark-950 border border-slate-800 flex-shrink-0">
                  {getStepIcon(step.icon, isCurrent, isDone)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className={`text-xs font-bold font-sans ${isCurrent ? 'text-cyan-300' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                      {step.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Terminal Output Window */}
      <div className="rounded-xl bg-dark-950 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-dark-900 border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Investigation Core Stream (Simulated Output)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Console Log Lines */}
        <div className="p-4 font-mono text-xs space-y-2 max-h-64 overflow-y-auto bg-dark-950/90">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic py-4 text-center">
              Agent idle. Click "Start Investigation" to initiate multi-source automated audit.
            </div>
          ) : (
            logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex items-start gap-2.5 leading-relaxed ${
                  log.type === 'warning' 
                    ? 'text-amber-300 bg-amber-950/20 p-1.5 rounded border border-amber-900/30' 
                    : 'text-slate-300'
                }`}
              >
                <span className="text-slate-400 text-[10px] select-none flex-shrink-0 pt-0.5">
                  [{log.timestamp}]
                </span>
                <span className="flex-1">{log.text}</span>
              </motion.div>
            ))
          )}

          {status === 'running' && (
            <div className="flex items-center gap-2 text-cyan-400 pt-2 animate-pulse">
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-bounce" />
              <span>Analyzing cross-layer evidentiary structures...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
