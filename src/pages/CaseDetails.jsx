import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, 
  FileSearch, 
  Clock, 
  Users, 
  Network, 
  Cpu, 
  FileText, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Layers, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { PersonCard } from '../components/people/PersonCard';
import { InteractiveGraph } from '../components/graph/InteractiveGraph';
import { InvestigationPanel } from '../components/investigation/InvestigationPanel';
import { ReportCard } from '../components/reports/ReportCard';
import { useCase } from '../context/CaseContext';

export const CaseDetails = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    activeCase, 
    activeEvidence, 
    activePeople, 
    activeEvents, 
    activeReports,
    activeGraph,
    setSelectedEvent
  } = useCase();

  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (caseId && caseId !== activeCaseId) {
      setActiveCaseId(caseId);
    }
  }, [caseId, activeCaseId, setActiveCaseId]);

  const targetCase = cases.find(c => c.id === caseId) || activeCase;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layers },
    { id: 'evidence', label: 'Evidence', icon: FileSearch, count: targetCase.evidenceCount },
    { id: 'timeline', label: 'Timeline', icon: Clock, count: targetCase.eventsCount },
    { id: 'people', label: 'People', icon: Users, count: targetCase.peopleCount },
    { id: 'connections', label: 'Connections', icon: Network },
    { id: 'investigation', label: 'Investigation', icon: Cpu, isSpecial: true },
    { id: 'reports', label: 'Reports', icon: FileText, count: activeReports.length }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Case Header Workspace Banner */}
      <div className="relative p-6 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-crimson-400 bg-crimson-950/80 px-2.5 py-1 rounded border border-crimson-800">
                {targetCase.id}
              </span>
              <Badge variant="cyan" size="sm">
                {targetCase.type}
              </Badge>
              <Badge variant="primary" size="sm" dot>
                {targetCase.status || 'INVESTIGATION ACTIVE'}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
              {targetCase.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Year: {targetCase.year}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-crimson-400" />
                Location: {targetCase.location}
              </span>
              <span>Lead: {targetCase.leadInvestigator}</span>
            </div>
          </div>

          {/* Quick launch action */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={Cpu}
              onClick={() => setActiveTab('investigation')}
            >
              Run AI Analysis
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-1 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-150 flex-shrink-0 ${
                  isActive
                    ? tab.isSpecial
                      ? 'bg-crimson-950 text-crimson-300 border border-crimson-600 font-bold shadow-[0_0_15px_rgba(225,29,72,0.25)]'
                      : 'bg-slate-800 text-white border border-slate-700 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (tab.isSpecial ? 'text-crimson-400' : 'text-cyan-400') : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${isActive ? 'bg-dark-950 text-slate-200' : 'bg-dark-950 text-slate-500'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Panes */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-dark-900/90 border border-slate-800 rounded-xl">
                <span className="text-xs font-mono uppercase text-slate-400">Documents</span>
                <p className="text-2xl font-mono font-bold text-slate-100 mt-1">
                  {targetCase.documentCount}
                </p>
              </div>
              <div className="p-4 bg-dark-900/90 border border-slate-800 rounded-xl">
                <span className="text-xs font-mono uppercase text-slate-400">Evidence Items</span>
                <p className="text-2xl font-mono font-bold text-cyan-400 mt-1">
                  {targetCase.evidenceCount}
                </p>
              </div>
              <div className="p-4 bg-dark-900/90 border border-slate-800 rounded-xl">
                <span className="text-xs font-mono uppercase text-slate-400">People</span>
                <p className="text-2xl font-mono font-bold text-purple-400 mt-1">
                  {targetCase.peopleCount}
                </p>
              </div>
              <div className="p-4 bg-dark-900/90 border border-slate-800 rounded-xl">
                <span className="text-xs font-mono uppercase text-slate-400">Events Mapped</span>
                <p className="text-2xl font-mono font-bold text-amber-400 mt-1">
                  {targetCase.eventsCount}
                </p>
              </div>
            </div>

            {/* Case Summary & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Historical Summary Box (2 Cols) */}
              <div className="lg:col-span-2 p-5 bg-dark-900/90 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    Case Summary (Historical Archival Record)
                  </h3>
                  <Badge variant="outline" size="sm">Verified Archives</Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {targetCase.summary || targetCase.description}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                  {targetCase.description}
                </p>
              </div>

              {/* Progress & Quick Metrics (1 Col) */}
              <div className="p-5 bg-dark-900/90 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase text-slate-400 block">Investigation Progress</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-mono font-bold text-slate-100">{targetCase.progress}%</span>
                    <span className="text-xs font-mono text-emerald-400">Active Audit</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-crimson-600 to-cyan-500 h-full rounded-full"
                      style={{ width: `${targetCase.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Inconsistencies:</span>
                    <span className="text-rose-400 font-bold">{targetCase.inconsistenciesCount} flagged</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unresolved questions:</span>
                    <span className="text-amber-400 font-bold">{targetCase.unresolvedCount} open</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Evidence Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSearch className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200">
                    Key Evidence Records ({Math.min(4, activeEvidence.length)})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('evidence')}
                  className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                >
                  View all evidence ({targetCase.evidenceCount}) <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeEvidence.slice(0, 4).map((item) => (
                  <EvidenceCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Evidence Tab */}
        {activeTab === 'evidence' && (
          <motion.div
            key="evidence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between pb-2">
              <p className="text-xs font-mono text-slate-400">
                Showing all {activeEvidence.length} indexed evidence records for {targetCase.title}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeEvidence.map((item) => (
                <EvidenceCard key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-dark-900 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-300">
                  Case Events Chronology ({activeEvents.length})
                </h4>
              </div>

              <div className="space-y-3">
                {activeEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="p-3.5 bg-dark-950/80 border border-slate-800 hover:border-slate-700 rounded-xl flex items-start justify-between gap-4 cursor-pointer transition-colors group"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-amber-400 font-bold">{ev.date} {ev.time ? `• ${ev.time}` : ''}</span>
                        <Badge variant="default" size="sm">{ev.category}</Badge>
                        {ev.hasContradiction && (
                          <Badge variant="warning" size="sm">Conflict</Badge>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-200 group-hover:text-white">{ev.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{ev.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* People Tab */}
        {activeTab === 'people' && (
          <motion.div
            key="people"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activePeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </motion.div>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <motion.div
            key="connections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InteractiveGraph graphData={activeGraph} />
          </motion.div>
        )}

        {/* Investigation Tab */}
        {activeTab === 'investigation' && (
          <motion.div
            key="investigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InvestigationPanel />
          </motion.div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <motion.div
            key="reports"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {activeReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
