import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  Layers, 
  FileText, 
  CheckCircle2, 
  Terminal, 
  Database,
  ShieldCheck
} from 'lucide-react';
import { AIInvestigationAssistant } from '../components/investigation/AIInvestigationAssistant';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useCase } from '../context/CaseContext';

export const Investigation = () => {
  const navigate = useNavigate();
  const { activeCase } = useCase();
  const currentCaseId = activeCase?.id || 'CASE-001';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              AI Investigation Assistant
            </h1>
            <Badge variant="cyan" size="sm" dot>
              Human Detective Mode
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            YOU ARE THE DETECTIVE. Ask your AI Assistant to analyze clues, explain timeline inconsistencies, and provide hints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={ShieldCheck}
            onClick={() => navigate(`/cases/${currentCaseId}/solve`)}
            className="shadow-[0_0_20px_rgba(225,29,72,0.35)]"
          >
            🔐 SOLVE CASE
          </Button>
        </div>
      </div>

      {/* Main Interactive AI Assistant Component */}
      <AIInvestigationAssistant />
    </div>
  );
};

