import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Cpu, 
  FolderOpen, 
  FileSearch, 
  Clock, 
  Bot, 
  Network,
  FileText
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import clsx from 'clsx';

export const MobileNavigation = () => {
  const { isAIPartnerOpen, setIsAIPartnerOpen } = useCase();

  const mobileTabs = [
    { path: '/investigation', label: 'Room', icon: Cpu },
    { path: '/cases', label: 'Archive', icon: FolderOpen },
    { path: '/evidence', label: 'Evidence', icon: FileSearch },
    { path: '/timeline', label: 'Timeline', icon: Clock },
    { path: '/connections', label: 'Graph', icon: Network }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-dark-950/95 border-t border-slate-800 backdrop-blur-lg flex items-center justify-around px-2">
      {mobileTabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors',
                isActive ? 'text-crimson-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              )
            }
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-mono">{tab.label}</span>
          </NavLink>
        );
      })}

      {/* AI Partner Drawer Trigger */}
      <button
        type="button"
        onClick={() => setIsAIPartnerOpen(!isAIPartnerOpen)}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors ${
          isAIPartnerOpen ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Bot className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] font-mono">AI Partner</span>
      </button>
    </nav>
  );
};
