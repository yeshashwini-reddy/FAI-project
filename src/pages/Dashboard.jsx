import React from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  FileSearch, 
  Users, 
  ShieldAlert, 
  Cpu, 
  Clock, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Play,
  TrendingUp,
  Activity,
  Layers
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useCase } from '../context/CaseContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { 
    cases, 
    activities, 
    setActiveCaseId, 
    allEvidence, 
    allPeople, 
    allReports,
    runSimulatedInvestigation
  } = useCase();

  const navigate = useNavigate();

  const handleContinueCase = (caseId) => {
    setActiveCaseId(caseId);
    navigate(`/cases/${caseId}`);
  };

  const handleStartInvestigation = (caseId = 'CASE-001') => {
    setActiveCaseId(caseId);
    navigate('/investigation');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              Good morning, Investigator
            </h1>
            <Badge variant="primary" size="sm" dot>
              Command Center Active
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Continue analyzing your active cases, evidence logs, and timeline contradictions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={FolderOpen}
            onClick={() => navigate('/cases')}
          >
            All Case Files
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Cpu}
            onClick={() => handleStartInvestigation('CASE-001')}
          >
            Launch AI Agent
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Cases"
          value="03"
          icon={FolderOpen}
          color="crimson"
          trend="+1 this month"
          trendLabel="Caseload index"
          onClick={() => navigate('/cases')}
        />
        <StatCard
          label="Evidence Items"
          value="127"
          icon={FileSearch}
          color="cyan"
          trend="+18 verified"
          trendLabel="Ingest pipeline"
          onClick={() => navigate('/evidence')}
        />
        <StatCard
          label="People Identified"
          value="24"
          icon={Users}
          color="emerald"
          trend="12 in Whitechapel"
          trendLabel="Entity registry"
          onClick={() => navigate('/people')}
        />
        <StatCard
          label="Open Investigations"
          value="05"
          icon={ShieldAlert}
          color="amber"
          trend="84% confidence"
          trendLabel="Multi-jurisdiction"
          onClick={() => navigate('/investigation')}
        />
      </div>

      {/* Prominent AI Investigation Agent Banner Card */}
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-crimson-800/40 p-6 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-full bg-radial-glow opacity-30 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-crimson-950 border border-crimson-800 text-crimson-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold tracking-wider text-crimson-400 uppercase">
                AI INVESTIGATION AGENT
              </span>
              <Badge variant="cyan" size="sm">Phase 1 Online</Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-100 font-sans">
              Ready to analyze your active case repository.
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Analyze multi-source evidence, trace entity relationships, detect timeline inconsistencies, and build exportable forensic audit summaries in seconds.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              icon={Play}
              onClick={() => handleStartInvestigation('CASE-001')}
              className="shadow-[0_0_25px_rgba(225,29,72,0.35)]"
            >
              Start Investigation
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Active Investigations & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Investigations (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-slate-100 font-sans">
                Active Investigations
              </h2>
            </div>
            <button
              onClick={() => navigate('/cases')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              View all cases <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3.5">
            {cases.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-dark-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-crimson-400">
                      {item.id}
                    </span>
                    <Badge variant="default" size="sm">
                      {item.type}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors truncate">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-0.5">
                    <span>Evidence: <strong className="text-slate-200">{item.evidenceCount}</strong></span>
                    <span>People: <strong className="text-slate-200">{item.peopleCount}</strong></span>
                    <span>Progress: <strong className="text-cyan-400">{item.progress}%</strong></span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-md bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-gradient-to-r from-crimson-600 to-cyan-500 h-full rounded-full"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => handleContinueCase(item.id)}
                  className="flex-shrink-0"
                >
                  Continue Investigation
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100 font-sans">
                Recent Activity
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Telemetry Feed</span>
          </div>

          <div className="p-4 rounded-xl bg-dark-900/80 border border-slate-800 space-y-4">
            {activities.slice(0, 4).map((act, index) => (
              <div key={act.id} className="relative flex items-start gap-3 text-xs">
                {/* Timeline connector dot and line */}
                <div className="relative flex flex-col items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-dark-900 z-10" />
                  {index < 3 && <span className="w-0.5 h-12 bg-slate-800 -mb-2" />}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cyan-400 font-semibold">{act.timestamp}</span>
                    <span className="text-slate-400">{act.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {act.details}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => navigate('/timeline')}
                className="w-full py-2 text-center text-xs font-mono text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded transition-colors"
              >
                Inspect Master Timeline →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
