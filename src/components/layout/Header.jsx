import React from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  Cpu,
  FolderOpen,
  Command,
  Activity
} from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCase } from '../../context/CaseContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ onOpenMobileMenu }) => {
  const { 
    activeCase, 
    setIsSearchOpen, 
    setIsNotificationsOpen, 
    activities,
    investigationStatus
  } = useCase();

  const navigate = useNavigate();

  return (
    <header className="h-16 bg-dark-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Mobile menu & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <Breadcrumbs />
        </div>
      </div>

      {/* Middle/Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-900/90 hover:bg-dark-850 text-slate-400 hover:text-slate-200 border border-slate-800/80 text-xs font-mono transition-all duration-200 group shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          <span className="hidden md:inline">Search cases, evidence, people...</span>
          <span className="md:hidden">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-dark-950 text-slate-400 rounded border border-slate-800">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* AI Agent Quick Run Button */}
        <Button
          variant={investigationStatus === 'running' ? 'cyan' : 'primary'}
          size="sm"
          icon={Cpu}
          onClick={() => navigate('/investigation')}
          className="hidden sm:inline-flex"
        >
          {investigationStatus === 'running' ? 'AI Active...' : 'AI Agent'}
        </Button>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 transition-colors"
          title="Recent Activity & Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
        </button>

        {/* Case Badge Status */}
        <div className="hidden lg:flex items-center pl-2 border-l border-slate-800">
          <Badge variant="primary" size="sm" dot>
            {activeCase?.status || 'Active'}
          </Badge>
        </div>
      </div>
    </header>
  );
};
