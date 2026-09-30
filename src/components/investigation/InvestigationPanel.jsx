import React from 'react';
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileSearch, 
  Users, 
  Clock, 
  Network,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AgentActivityFeed } from './AgentActivityFeed';
import { useCase } from '../../context/CaseContext';
import { useNavigate } from 'react-router-dom';

export const InvestigationPanel = () => {
  const { 
    activeCase, 
    investigationStatus, 
    activeStepIndex, 
    agentLogs, 
    investigationResult, 
    runSimulatedInvestigation, 
    resetInvestigation,
    simulatedAgentSteps,
    setSelectedReport,
    activeReports
  } = useCase();

  const navigate = useNavigate();

  const handleViewReport = () => {
    if (activeReports.length > 0) {
      setSelectedReport(activeReports[0]);
    } else {
      navigate('/reports');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-cyan-300">
              AI INVESTIGATION AGENT • PHASE 1 SIMULATION
            </span>
            <p className="text-xs text-slate-400">
              Simulated deterministic inference pipeline ready to connect to backend microservices.
            </p>
          </div>
        </div>

        <Badge variant="cyan" size="sm">
          Case: {activeCase?.id || 'CASE-001'}
        </Badge>
      </div>

      {/* Main Investigation Panel Container */}
      <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl space-y-6">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-100 font-sans tracking-tight">
                {investigationStatus === 'idle' && 'AI INVESTIGATION AGENT'}
                {investigationStatus === 'running' && 'INVESTIGATION RUNNING'}
                {investigationStatus === 'completed' && 'INVESTIGATION COMPLETE'}
              </h2>
              <Badge 
                variant={investigationStatus === 'running' ? 'cyan' : investigationStatus === 'completed' ? 'success' : 'default'}
                size="sm"
                dot
              >
                {investigationStatus}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Target case: <span className="text-slate-200 font-semibold">{activeCase?.title}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {investigationStatus === 'idle' && (
              <Button
                variant="primary"
                size="md"
                icon={Play}
                onClick={runSimulatedInvestigation}
              >
                Start Investigation
              </Button>
            )}

            {investigationStatus === 'running' && (
              <Button
                variant="cyan"
                size="md"
                loading
                disabled
              >
                Analyzing Data...
              </Button>
            )}

            {investigationStatus === 'completed' && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={RotateCcw}
                  onClick={resetInvestigation}
                >
                  Reset & Rerun
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={FileText}
                  iconPosition="right"
                  onClick={handleViewReport}
                >
                  View Investigation Report
                </Button>
              </>
            )}
          </div>
        </div>

        {/* State 1: IDLE Initial State */}
        {investigationStatus === 'idle' && (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-dark-950/80 border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-crimson-950/60 border border-crimson-800/80 mx-auto flex items-center justify-center text-crimson-400 shadow-[0_0_25px_rgba(225,29,72,0.25)]">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Ready to analyze case: {activeCase?.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-lg mx-auto">
                  The Investigation Agent will evaluate digitized depositions, timeline integrity, geographical transit limits, and flag discrepancies across all registered entities.
                </p>
              </div>

              {/* What Agent Analyzes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-3 text-left">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Evidence ({activeCase?.evidenceCount || 43} items)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Timeline ({activeCase?.eventsCount || 27} events)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>People ({activeCase?.peopleCount || 12} profiles)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Relationships (20 edges)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Statements & Inquests</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-dark-900 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Case Documents ({activeCase?.documentCount || 18})</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Play}
                  onClick={runSimulatedInvestigation}
                >
                  Start Investigation
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* State 2 & 3: RUNNING or COMPLETED */}
        {(investigationStatus === 'running' || investigationStatus === 'completed') && (
          <div className="space-y-6">
            {/* Completion Summary Cards (when completed) */}
            {investigationStatus === 'completed' && (
              <div className="p-5 rounded-xl bg-dark-950/80 border border-emerald-900/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Investigation Synthesis Finalized at {investigationResult?.completedAt}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Confidence: <strong className="text-emerald-400 font-bold">{investigationResult?.confidenceScore}%</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 bg-dark-900 rounded-lg border border-slate-800 text-center font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">Evidence Analyzed</span>
                    <span className="text-lg font-bold text-cyan-400">{investigationResult?.evidenceAnalyzed}</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-lg border border-slate-800 text-center font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">Events Analyzed</span>
                    <span className="text-lg font-bold text-amber-400">{investigationResult?.eventsAnalyzed}</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-lg border border-slate-800 text-center font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">People Analyzed</span>
                    <span className="text-lg font-bold text-purple-400">{investigationResult?.peopleAnalyzed}</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-lg border border-rose-900/50 text-center font-mono bg-rose-950/10">
                    <span className="text-[10px] text-rose-300 uppercase block">Inconsistencies</span>
                    <span className="text-lg font-bold text-rose-400">{investigationResult?.inconsistenciesFound}</span>
                  </div>
                  <div className="p-3 bg-dark-900 rounded-lg border border-slate-800 text-center font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">Open Questions</span>
                    <span className="text-lg font-bold text-slate-200">{investigationResult?.unresolvedQuestions}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-400">
                    Audit complete. Detailed contradictions and questions compiled in investigation report.
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={handleViewReport}
                  >
                    Open Investigation Report
                  </Button>
                </div>
              </div>
            )}

            {/* Live Activity & Step Visualizer */}
            <AgentActivityFeed
              steps={simulatedAgentSteps}
              activeStepIndex={activeStepIndex}
              logs={agentLogs}
              status={investigationStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};
