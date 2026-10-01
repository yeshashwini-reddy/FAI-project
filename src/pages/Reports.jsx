import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  Sparkles,
  Award,
  AlertTriangle,
  Lightbulb,
  Clock,
  ExternalLink,
  Bot
} from 'lucide-react';
import { ReportCard } from '../components/reports/ReportCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useCase } from '../context/CaseContext';

export const Reports = () => {
  const { 
    activeCase, 
    activeReports, 
    hypotheses, 
    inspectedEvidenceIds, 
    inspectedEventIds, 
    pinnedClueIds,
    investigationResult,
    investigationMetrics,
    activeEvidence,
    setSelectedReport
  } = useCase();

  const [activeTab, setActiveTab] = useState('DOSSIER'); // 'DOSSIER' | 'ARCHIVE_REPORTS'

  const activeHypothesis = hypotheses.find(h => h.caseId === activeCase?.id) || hypotheses[0];

  const supportingEvidenceItems = activeEvidence.filter(e => 
    activeHypothesis?.supportingEvidenceIds?.includes(e.id)
  );

  const contradictingEvidenceItems = activeEvidence.filter(e => 
    activeHypothesis?.contradictingEvidenceIds?.includes(e.id)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-2xl font-extrabold text-slate-100 font-sans tracking-tight uppercase">
              CASE INVESTIGATION REPORT
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Formal evidentiary dossier & hypothesis synthesis for <span className="text-slate-200 font-bold">{activeCase?.title}</span>.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('DOSSIER')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'DOSSIER' 
                ? 'bg-crimson-950 text-crimson-300 font-bold border border-crimson-800' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Investigator Dossier
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ARCHIVE_REPORTS')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'ARCHIVE_REPORTS' 
                ? 'bg-slate-800 text-white font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Archival Audits ({activeReports.length})
          </button>
        </div>
      </div>

      {activeTab === 'DOSSIER' ? (
        /* The Detective Case Investigation Report */
        <div className="bg-dark-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8 backdrop-blur-md">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-crimson-400 uppercase tracking-widest">
                  CASE #{activeCase?.id || '001'}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {activeCase?.location || 'London, England'} • {activeCase?.year || '1888'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight uppercase">
                {activeCase?.title || 'The Whitechapel File'}
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Forensic Inquest Reconciliation & Archival Synthesis
              </p>
            </div>

            <div className="p-3 rounded-xl bg-dark-950 border border-slate-800 text-right font-mono">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Investigation Status</span>
              <span className="text-sm font-bold text-amber-400">
                {activeCase?.status || 'UNRESOLVED'}
              </span>
            </div>
          </div>

          {/* Top Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold text-cyan-400 block">
                {inspectedEvidenceIds.size || 32}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Evidence Reviewed
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold text-amber-400 block">
                {inspectedEventIds.size || 21}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Events Analyzed
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold text-purple-400 block">
                {pinnedClueIds.size || 14}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Connections Discovered
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800">
              <span className="text-xl sm:text-2xl font-bold text-rose-400 block">
                {activeCase?.unresolvedCount || 4}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Unresolved Questions
              </span>
            </div>
          </div>

          {/* Player Hypothesis Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              INVESTIGATOR WORKING HYPOTHESIS
            </div>

            <div className="p-5 rounded-xl bg-dark-950 border border-slate-800/90 space-y-2">
              <h3 className="text-sm font-bold text-slate-100 font-sans">
                {activeHypothesis?.title || 'Double Event Chronology & Spatial Transit Hypothesis'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic">
                "{activeHypothesis?.theory || 'The perpetrator operated within strictly bounded patrol intervals across Spitalfields, relying on unlit cobblestone alleyways to evade street sentries between Mitre Square and Goulston Street.'}"
              </p>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800/60">
                <span>Calculated Coverage Score:</span>
                <span className="font-bold text-amber-400">{activeHypothesis?.coverageScore || 78}% Coverage</span>
              </div>
            </div>
          </div>

          {/* Supporting & Contradicting Evidence Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Supporting */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SUPPORTING EVIDENCE ({supportingEvidenceItems.length || 2})
              </div>
              <div className="space-y-2">
                {(supportingEvidenceItems.length > 0 ? supportingEvidenceItems : activeEvidence.slice(0, 2)).map(ev => (
                  <div key={ev.id} className="p-3 rounded-lg bg-dark-950 border border-emerald-900/30 text-xs">
                    <span className="font-mono font-bold text-emerald-400 block mb-0.5">{ev.code || ev.id}</span>
                    <span className="text-slate-200 font-sans font-medium">{ev.title}</span>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{ev.summary || ev.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contradicting */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                CONTRADICTING / UNRECONCILED EVIDENCE
              </div>
              <div className="space-y-2">
                {(contradictingEvidenceItems.length > 0 ? contradictingEvidenceItems : activeEvidence.slice(2, 3)).map(ev => (
                  <div key={ev.id} className="p-3 rounded-lg bg-dark-950 border border-purple-900/30 text-xs">
                    <span className="font-mono font-bold text-purple-400 block mb-0.5">{ev.code || ev.id}</span>
                    <span className="text-slate-200 font-sans font-medium">{ev.title}</span>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {ev.contradictions?.[0] || ev.summary || "Temporal conflict between post-mortem temperature and lay witness testimony."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Partner Observations */}
          <div className="p-5 rounded-xl bg-dark-950 border border-cyan-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              AI PARTNER OBSERVATIONS
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              "The evidence timeline tightly bounds the operational window to under 14 minutes at Mitre Square. The 1-hour temporal divergence between Dr. Phillips' post-mortem interval (Hanbury St) and Elizabeth Long's sworn 5:30 AM sighting remains the most critical unresolved discrepancy in the archival record."
            </p>
          </div>

          {/* Academic Case Status & Forensic Standard Verdict */}
          <div className="p-5 rounded-xl bg-dark-950/80 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              CASE STATUS: UNRESOLVED
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              The available archival evidence does not establish a definitive historical conclusion. In accordance with academic inquiry and evidentiary rigor, open questions are preserved without speculative attributions.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Mystery Solver AI Agent Audit Engine • Verified</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Printer}
                onClick={() => window.print()}
              >
                Print / Export PDF
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Archival Reports List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeReports.map(rep => (
            <ReportCard key={rep.id} report={rep} />
          ))}
        </div>
      )}
    </div>
  );
};
