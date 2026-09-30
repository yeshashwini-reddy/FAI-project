import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Calendar, 
  FileSearch, 
  Clock, 
  Download, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCase } from '../../context/CaseContext';

export const ReportCard = ({ report }) => {
  const { setSelectedReport } = useCase();

  const handleExport = (e) => {
    e.stopPropagation();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${report.reportNumber || 'Investigation_Report'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="group bg-dark-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 hover:shadow-lg flex flex-col justify-between transition-all duration-200"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-crimson-400">
                {report.caseId}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                • {report.reportNumber}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors mt-1 font-sans">
              {report.title}
            </h3>
          </div>

          <Badge variant="success" size="sm" dot>
            {report.status || 'Completed'}
          </Badge>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {report.summary}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-dark-950/70 border border-slate-800/80 rounded-lg text-center font-mono">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Evidence</span>
            <span className="text-sm font-bold text-cyan-400">{report.evidenceAnalyzed}</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Events</span>
            <span className="text-sm font-bold text-amber-400">{report.eventsAnalyzed}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Conflicts</span>
            <span className="text-sm font-bold text-rose-400">{report.inconsistenciesFound || 0}</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Generated: {report.generatedDate}
          </span>
          <span className="text-slate-400">{report.classification}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Download}
          onClick={handleExport}
          className="text-slate-400 hover:text-white"
        >
          Export
        </Button>

        <Button
          variant="secondary"
          size="sm"
          icon={ExternalLink}
          iconPosition="right"
          onClick={() => setSelectedReport(report)}
        >
          View Report
        </Button>
      </div>
    </motion.div>
  );
};
