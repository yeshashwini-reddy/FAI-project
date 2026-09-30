import React from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  Cpu,
  FolderOpen,
  Command,
  Activity,
  Bot,
  ShieldCheck,
  Award
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
    setIsSubmitModalOpen,
    setIsAIPartnerOpen,
    isAIPartnerOpen,
    xp,
    investigatorRank,
    investigationMetrics
  } = useCase();

  const navigate = useNavigate();

  return (
    <header className="h-16 bg-dark-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Mobile menu & Breadcrumbs / Active Case */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <Breadcrumbs />
        </div>

        <div className="sm:hidden text-xs font-mono font-bold text-slate-200 truncate max-w-[150px]">
          {activeCase?.title}
        </div>
      </div>

      {/* Middle/Right Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dark-900/90 hover:bg-dark-850 text-slate-400 hover:text-slate-200 border border-slate-800/80 text-xs font-mono transition-all duration-200 group shadow-inner"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          <span className="hidden md:inline">Search archives, evidence, deponents...</span>
          <span className="md:hidden">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-dark-950 text-slate-400 rounded border border-slate-800">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Investigator XP Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-dark-900 border border-slate-800 text-xs font-mono text-amber-300">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>{xp} XP</span>
        </div>

        {/* Submit Investigation Button */}
        <Button
          variant="primary"
          size="sm"
          icon={ShieldCheck}
          onClick={() => setIsSubmitModalOpen(true)}
          className="hidden sm:inline-flex text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(225,29,72,0.25)]"
        >
          SUBMIT INVESTIGATION
        </Button>

        {/* Mobile AI Partner Quick Drawer Toggle */}
        <button
          type="button"
          onClick={() => setIsAIPartnerOpen(!isAIPartnerOpen)}
          className={`xl:hidden p-2 rounded-xl border transition-colors ${
            isAIPartnerOpen
              ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300'
              : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle AI Partner Drawer"
        >
          <Bot className="w-4 h-4" />
        </button>

        {/* Notifications Button */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 transition-colors"
          title="Case Notifications & Activity"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
        </button>
      </div>
    </header>
  );
};
