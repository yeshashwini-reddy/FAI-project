import React, { useState, useMemo } from 'react';
import { 
  FolderOpen, 
  Search, 
  Filter, 
  Plus, 
  Layers, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CaseCard } from '../components/case/CaseCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { useCase } from '../context/CaseContext';

export const Cases = () => {
  const { cases } = useCase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Historical', 'Missing Person', 'Fraud', 'Cybercrime'];

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || c.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [cases, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              Case Files
            </h1>
            <Badge variant="cyan" size="sm">
              {filteredCases.length} Loaded
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Explore and manage active historical records and forensic investigation dossiers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="default" size="md">
            Archive Tier: Verified Repository
          </Badge>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 bg-dark-900/90 border border-slate-800 rounded-2xl">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cases by title, year, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 transition-colors font-sans"
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
                  ? 'bg-crimson-950 text-crimson-400 border border-crimson-800 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      {filteredCases.length === 0 ? (
        <EmptyState
          title="No case files match your search"
          description="Try clearing your search query or switching to another category."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((item) => (
            <CaseCard key={item.id} caseItem={item} />
          ))}
        </div>
      )}

      {/* Archival metadata note */}
      <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Cases incorporate verifiable archival data and structured mock intelligence metadata.
        </span>
        <span className="hidden sm:inline">Updated Daily</span>
      </div>
    </div>
  );
};
