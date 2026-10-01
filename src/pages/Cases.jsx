import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Search, Filter, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { CaseCard } from '../components/game/CaseCard';

export const Cases = () => {
  const { cases } = useCase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredCases = cases.filter(c => {
    const matchesSearch = `${c.title} ${c.description} ${c.id} ${c.location}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory || c.type.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <h1 className="text-2xl font-extrabold text-slate-100 font-sans tracking-tight uppercase">
              CASE ARCHIVE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Choose an investigation from the verified historical and digital forensics repository.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search case archives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 sm:w-64 pl-8 pr-3 py-1.5 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 bg-dark-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {['ALL', 'Historical', 'Cybercrime', 'Missing Person'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-slate-800 text-white font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseItem) => (
          <CaseCard
            key={caseItem.id}
            caseItem={caseItem}
          />
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="py-16 text-center rounded-2xl bg-dark-900/40 border border-dashed border-slate-800 space-y-2">
          <FolderOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300 font-mono">No Cases Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try modifying your search criteria or resetting the category filter.
          </p>
        </div>
      )}
    </div>
  );
};
