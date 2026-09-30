import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const ReportDetailModal = ({ report, isOpen, onClose }) => {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${report.reportNumber || 'Investigation_Report'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const sections = report.sections || {};

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={report.title}
      subtitle={`Report Ref: ${report.reportNumber} • Case ${report.caseId} • Generated: ${report.generatedDate}`}
      maxWidth="max-w-5xl"
    >
      <div className="space-y-6 text-slate-200 printable-report">
        {/* Executive Header Banner */}
        <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm">
              {report.caseId}
            </Badge>
            <Badge variant="success" size="sm" dot>
              {report.status}
            </Badge>
            <Badge variant="outline" size="sm">
              {report.classification}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Confidence Index: <strong className="text-emerald-400 font-bold">{report.confidenceScore || 84}%</strong></span>
            <span>Audit Date: {report.generatedDate}</span>
          </div>
        </div>

        {/* 1. Case Overview */}
        {sections.caseOverview && (
          <div className="p-5 bg-dark-850/60 border border-slate-800 rounded-xl space-y-2">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              {sections.caseOverview.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {sections.caseOverview.content}
            </p>
          </div>
        )}

        {/* 2. Evidence Analysis */}
        {sections.evidenceAnalysis && (
          <div className="p-5 bg-dark-850/60 border border-slate-800 rounded-xl space-y-3">
            <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              {sections.evidenceAnalysis.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sections.evidenceAnalysis.items?.map((item, idx) => (
                <div key={idx} className="p-3 bg-dark-900/90 border border-slate-800/90 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{item.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{item.code}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.assessment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Timeline Analysis */}
        {sections.timelineAnalysis && (
          <div className="p-5 bg-dark-850/60 border border-slate-800 rounded-xl space-y-3">
            <h3 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              {sections.timelineAnalysis.title}
            </h3>
            <ul className="space-y-2">
              {sections.timelineAnalysis.findings?.map((finding, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 bg-dark-900/50 p-3 rounded-lg border border-slate-800/60">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. Potential Contradictions */}
        {sections.contradictions && (
          <div className="p-5 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-3">
            <h3 className="text-sm font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              {sections.contradictions.title}
            </h3>
            <div className="space-y-2.5">
              {sections.contradictions.items?.map((contra) => (
                <div key={contra.id} className="p-3.5 bg-dark-950/80 border border-rose-900/30 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-rose-200">{contra.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                      {contra.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {contra.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Unresolved Questions */}
        {sections.unresolvedQuestions && (
          <div className="p-5 bg-dark-850/60 border border-slate-800 rounded-xl space-y-3">
            <h3 className="text-sm font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              {sections.unresolvedQuestions.title}
            </h3>
            <div className="space-y-2">
              {sections.unresolvedQuestions.questions?.map((q, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 bg-dark-900/80 rounded-lg border border-slate-800">
                  <span className="text-purple-400 font-mono font-bold">{idx + 1}.</span>
                  <span className="leading-relaxed">{q}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Investigation Summary & Conclusion */}
        {sections.conclusion && (
          <div className="p-5 bg-dark-950/90 border border-emerald-900/40 rounded-xl space-y-2.5">
            <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {sections.conclusion.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {sections.conclusion.content}
            </p>
          </div>
        )}

        {/* Modal Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={Printer} onClick={handlePrint}>
              Print Report
            </Button>
            <Button variant="secondary" size="sm" icon={Download} onClick={handleExportJSON}>
              Download JSON
            </Button>
          </div>

          <Button variant="primary" size="sm" onClick={onClose}>
            Done Reviewing
          </Button>
        </div>
      </div>
    </Modal>
  );
};
