import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  FolderOpen,
  FileSearch,
  Clock,
  Users,
  Network,
  Cpu,
  FileText,
  Settings,
  Shield,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import clsx from 'clsx';

export const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/cases', label: 'Cases', icon: FolderOpen },
  { path: '/evidence', label: 'Evidence', icon: FileSearch, badge: '43' },
  { path: '/timeline', label: 'Timeline', icon: Clock },
  { path: '/people', label: 'People', icon: Users, badge: '12' },
  { path: '/connections', label: 'Connections', icon: Network },
  { path: '/investigation', label: 'AI Investigation', icon: Cpu, isSpecial: true },
  { path: '/reports', label: 'Reports', icon: FileText }
];

export const Sidebar = ({ onCloseMobile }) => {
  const { activeCase, cases, setActiveCaseId } = useCase();

  return (
    <aside className="w-64 h-full bg-dark-950/95 border-r border-slate-800/80 flex flex-col select-none relative z-20">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-dark-950">
        <Link 
          to="/" 
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-crimson-600 to-crimson-900 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)] border border-crimson-500/40 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-slate-100 font-mono">MYSTERY</span>
              <span className="font-extrabold text-sm tracking-wider text-crimson-500 font-mono">SOLVER</span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 tracking-widest uppercase">Investigation OS</p>
          </div>
        </Link>
      </div>

      {/* Active Case Quick Switcher Widget */}
      <div className="p-3 border-b border-slate-800/60 bg-dark-900/40">
        <div className="text-[10px] font-mono uppercase text-slate-400 px-2 mb-1.5 flex items-center justify-between">
          <span>Active Case File</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="relative group">
          <select
            value={activeCase?.id || 'CASE-001'}
            onChange={(e) => setActiveCaseId(e.target.value)}
            className="w-full bg-dark-850 hover:bg-dark-800 border border-slate-700/70 hover:border-slate-600 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-crimson-500 cursor-pointer appearance-none pr-8 transition-colors truncate"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id} className="bg-dark-900 text-slate-200">
                {c.id}: {c.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-slate-200 transition-colors" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold">
          Navigation
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
                  'flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group relative',
                  isActive
                    ? item.isSpecial
                      ? 'bg-crimson-950/80 text-white border border-crimson-600/60 shadow-[0_0_15px_rgba(225,29,72,0.25)] font-semibold'
                      : 'bg-slate-800/90 text-white border border-slate-700/80 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/60 border border-transparent'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={clsx(
                        'w-4 h-4 transition-colors',
                        isActive
                          ? item.isSpecial
                            ? 'text-crimson-400'
                            : 'text-cyan-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono bg-dark-950/80 text-slate-400 border border-slate-800 rounded">
                        {item.badge}
                      </span>
                    )}
                    {item.isSpecial && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
                      </span>
                    )}
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Footer / Profile Section */}
      <div className="p-3 border-t border-slate-800/80 bg-dark-950/90 space-y-2">
        <Link
          to="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-dark-850/60 transition-colors"
        >
          <Compass className="w-4 h-4 text-slate-400" />
          <span>Landing Portal</span>
        </Link>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-dark-900 border border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-crimson-600 flex items-center justify-center text-white text-xs font-bold font-mono">
              INV
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">Investigator Matrix</p>
              <p className="text-[10px] font-mono text-emerald-400">Online • Level 4</p>
            </div>
          </div>
          <button 
            title="Settings"
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
