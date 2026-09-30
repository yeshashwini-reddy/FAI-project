import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { ReportCard } from '../components/reports/ReportCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { useCase } from '../context/CaseContext';

export const Reports = () => {
  const { allReports, activeReports, activeCase } = useCase();
  const [searchTerm, setSearchTerm] = useState('');
  const [scope, setScope] = useState('active'); // 'active' | 'all'

  const displayedReports = scope === 'active' ? activeReports : allReports;

  const filteredReports = useMemo(() => {
    return displayedReports.filter((r) => {
      return (
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [displayedReports, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              Investigation Reports
            </h1>
            <Badge variant="emerald" size="sm">
              {filteredReports.length} Audit Dossiers
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Archival-grade forensic audit summaries, timeline matrices, and contradiction reports.
          </p>
        </div>

        {/* Scope Selector */}
        <div className="flex items-center gap-2 bg-dark-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setScope('active')}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
              scope === 'active'
                ? 'bg-crimson-950 text-crimson-400 border border-crimson-800 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Case
          </button>
          <button
            onClick={() => setScope('all')}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors ${
              scope === 'all'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Case Reports
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-3 bg-dark-900/90 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search report titles, reference numbers, summaries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Objective Evidentiary Balance Standard</span>
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <EmptyState
          title="No investigation reports found"
          description="Try clearing your search query or generate a new report via the AI Investigation Agent."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};
