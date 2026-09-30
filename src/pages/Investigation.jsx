import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Terminal, 
  Database,
  ShieldCheck
} from 'lucide-react';
import { InvestigationPanel } from '../components/investigation/InvestigationPanel';
import { Badge } from '../components/common/Badge';
import { useCase } from '../context/CaseContext';

export const Investigation = () => {
  const { activeCase } = useCase();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              AI Investigation
            </h1>
            <Badge variant="primary" size="sm" dot>
              Autonomous Pipeline Ready
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Execute deterministic automated synthesis across all indexed evidence, timelines, and entity linkages.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span>Active Context:</span>
          <span className="text-crimson-400 font-bold">{activeCase?.id}: {activeCase?.title}</span>
        </div>
      </div>

      {/* Main Investigation Panel */}
      <InvestigationPanel />
    </div>
  );
};
