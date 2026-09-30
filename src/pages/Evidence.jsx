import React, { useState, useMemo } from 'react';
import { 
  FileSearch, 
  Search, 
  Filter, 
  Plus, 
  Layers, 
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Database,
  Microscope,
  Cpu
} from 'lucide-react';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { useCase } from '../context/CaseContext';

export const Evidence = () => {
  const { activeEvidence, activeCase, allEvidence } = useCase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scope, setScope] = useState('active'); // 'active' | 'all'

  const categories = ['All', 'Documents', 'Images', 'Statements', 'Records', 'Reports'];

  const displayedList = scope === 'active' ? activeEvidence : allEvidence;

  const filteredEvidence = useMemo(() => {
    return displayedList.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.type?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [displayedList, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              Evidence Room
            </h1>
            <Badge variant="cyan" size="sm">
              {filteredEvidence.length} Pieces
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {activeCase?.evidenceCount || 43} pieces of indexed evidence associated with <span className="text-slate-200 font-semibold">{activeCase?.title}</span>.
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
                ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Global Archives
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-dark-900/90 border border-slate-800 rounded-2xl">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search evidence codes, transcripts, sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Cards Grid */}
      {filteredEvidence.length === 0 ? (
        <EmptyState
          title="No evidence items found"
          description="Try broadening your search query or selecting 'All' categories."
          actionLabel="Reset Search"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvidence.map((item) => (
            <EvidenceCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
