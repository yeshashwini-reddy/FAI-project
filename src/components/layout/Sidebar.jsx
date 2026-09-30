import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  FolderOpen,
  FileSearch,
  Clock,
  Users,
  Network,
  Cpu,
  FileText,
  Settings,
  Sparkles,
  ChevronDown,
  Bot,
  HelpCircle,
  FileSpreadsheet,
  Layers,
  Award
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import clsx from 'clsx';

export const navItems = [
  { path: '/investigation', label: 'Investigation Room', icon: Cpu, isPrimary: true, indicator: '◉' },
  { path: '/cases', label: 'Case Archive', icon: FolderOpen, indicator: '◇' },
  { path: '/evidence', label: 'Evidence Vault', icon: FileSearch, badge: '43', indicator: '◇' },
  { path: '/timeline', label: 'Chronology Timeline', icon: Clock, indicator: '◇' },
  { path: '/people', label: 'People & Suspects', icon: Users, badge: '12', indicator: '◇' },
  { path: '/connections', label: 'Connection Graph', icon: Network, indicator: '◇' }
];

export const secondaryNavItems = [
  { path: '/reports', label: 'Case Reports & Dossier', icon: FileText, indicator: '◇' }
];

export const Sidebar = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { 
    activeCase, 
    cases, 
    setActiveCaseId, 
    xp, 
    investigatorRank, 
    setIsBriefingOpen,
    setIsAIPartnerOpen 
  } = useCase();

  return (
    <aside className="w-64 h-full bg-dark-950/95 border-r border-slate-800/80 flex flex-col select-none relative z-20">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-dark-950">
        <Link 
          to="/" 
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-crimson-600 to-crimson-950 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.35)] border border-crimson-500/40 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-slate-100 font-mono">MYSTERY</span>
              <span className="font-extrabold text-sm tracking-wider text-crimson-500 font-mono">SOLVER</span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">Detective OS</p>
          </div>
        </Link>
      </div>

      {/* Active Case Selector */}
      <div className="p-3 border-b border-slate-800/60 bg-dark-900/40">
        <div className="text-[10px] font-mono uppercase text-slate-400 px-2 mb-1.5 flex items-center justify-between">
          <span>Active Case File</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="relative group">
          <select
            value={activeCase?.id || 'CASE-001'}
            onChange={(e) => setActiveCaseId(e.target.value)}
            className="w-full bg-dark-900 hover:bg-dark-850 border border-slate-700/70 hover:border-slate-600 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-crimson-500 cursor-pointer appearance-none pr-8 transition-colors truncate font-sans"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id} className="bg-dark-950 text-slate-200">
                {c.id}: {c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-200 transition-colors" />
        </div>
      </div>

      {/* Primary Navigation Rail */}
      <div className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        <div className="px-2 pb-1.5 text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">
          Investigation Flow
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                clsx(
                  'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group relative font-sans',
                  isActive
                    ? item.isPrimary
                      ? 'bg-crimson-950/80 text-white border border-crimson-600/70 shadow-[0_0_15px_rgba(225,29,72,0.25)] font-bold'
                      : 'bg-slate-800/90 text-white border border-slate-700/80 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-2.5">
                    <span className={clsx(
                      "font-mono text-xs",
                      isActive ? (item.isPrimary ? "text-crimson-400" : "text-cyan-400") : "text-slate-400"
                    )}>
                      {item.indicator}
                    </span>
                    <Icon
                      className={clsx(
                        'w-4 h-4 transition-colors',
                        isActive
                          ? item.isPrimary
                            ? 'text-crimson-400'
                            : 'text-cyan-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[10px] font-mono bg-dark-950 text-slate-400 border border-slate-800 rounded">
                        {item.badge}
                      </span>
                    )}
                    {item.isPrimary && (
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-crimson-500"></span>
                      </span>
                    )}
                  </div>
                </>
              )}
            </NavLink>
          );
        })}

        {/* Divider */}
        <div className="pt-3 pb-1.5 px-2">
          <div className="h-px bg-slate-800/80 w-full" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold block mt-2">
            Intelligence
          </span>
        </div>

        {/* Secondary items */}
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                clsx(
                  'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group relative font-sans',
                  isActive
                    ? 'bg-slate-800/90 text-white border border-slate-700/80 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                )
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-slate-400">{item.indicator}</span>
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
                <span>{item.label}</span>
              </div>
            </NavLink>
          );
        })}

        {/* Case Briefing Action */}
        <button
          type="button"
          onClick={() => {
            setIsBriefingOpen(true);
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 transition-all font-sans"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-slate-400">◇</span>
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Case Briefing</span>
          </div>
        </button>
      </div>

      {/* Footer / Investigator Rank & XP Section */}
      <div className="p-3 border-t border-slate-800/80 bg-dark-950/90 space-y-2">
        <div className="p-2.5 rounded-xl bg-dark-900/90 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-crimson-600 to-amber-600 flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-200 truncate">{investigatorRank.title}</p>
              <p className="text-[10px] font-mono text-amber-400">{xp} XP • Level {investigatorRank.level}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
