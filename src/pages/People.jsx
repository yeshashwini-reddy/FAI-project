import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Shield, 
  FileSearch, 
  Clock, 
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PersonCard } from '../components/people/PersonCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { useCase } from '../context/CaseContext';

export const People = () => {
  const { activePeople, activeCase, allPeople } = useCase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scope, setScope] = useState('active'); // 'active' | 'all'

  const categories = ['All', 'Investigator', 'Official', 'Witness', 'Person of Interest', 'Expert'];

  const displayedPeople = scope === 'active' ? activePeople : allPeople;

  const filteredPeople = useMemo(() => {
    return displayedPeople.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.knownInformation && p.knownInformation.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [displayedPeople, searchTerm, selectedCategory]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
              People & Entities
            </h1>
            <Badge variant="purple" size="sm">
              {filteredPeople.length} Profiles
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Individuals, witnesses, officials, and entities referenced across <span className="text-slate-200 font-semibold">{activeCase?.title}</span>.
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
                ? 'bg-purple-950 text-purple-400 border border-purple-800 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Registered Entities
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
            placeholder="Search by name, role, department..."
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
                  ? 'bg-purple-950 text-purple-400 border border-purple-800 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* People Grid */}
      {filteredPeople.length === 0 ? (
        <EmptyState
          title="No person profiles match your search"
          description="Try modifying your search keywords or switching category filters."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPeople.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}

      {/* Archival Note */}
      <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-purple-400" />
          Profiles reference sworn historical inquest rolls and neutral forensic registries.
        </span>
        <span className="hidden sm:inline">Verified Identity Ledger</span>
      </div>
    </div>
  );
};
