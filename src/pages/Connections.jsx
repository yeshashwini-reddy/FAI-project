import React from 'react';
import { 
  Network, 
  Layers, 
  Info, 
  Share2, 
  Download, 
  Sparkles,
  Users,
  FileSearch,
  Clock,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { InteractiveGraph } from '../components/graph/InteractiveGraph';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useCase } from '../context/CaseContext';

export const Connections = () => {
  const { activeGraph, activeCase } = useCase();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              Relationship Graph
            </h1>
            <Badge variant="pink" size="sm">
              Multidirectional Matrix
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visual topology connecting People, Evidence, Events, and Locations for <span className="text-slate-200 font-semibold">{activeCase?.title}</span>.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-300">
            <Users className="w-3.5 h-3.5" />
            <span>People</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
            <FileSearch className="w-3.5 h-3.5" />
            <span>Evidence</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Events</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
            <MapPin className="w-3.5 h-3.5" />
            <span>Locations</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Graph View */}
      <div className="space-y-3">
        <InteractiveGraph graphData={activeGraph} />
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
          <span>💡 Tip: Click and drag canvas to pan • Use mouse scroll or top-right buttons to zoom • Click any node to inspect</span>
          <span className="text-rose-400 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> Red dashed line indicates verified temporal conflict
          </span>
        </div>
      </div>
    </div>
  );
};
