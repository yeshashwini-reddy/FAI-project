import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  FolderOpen, 
  FileSearch, 
  Clock, 
  Users, 
  Network, 
  HelpCircle, 
  ShieldCheck, 
  Sparkles,
  Lightbulb,
  Plus,
  Pin,
  StickyNote,
  ChevronRight,
  Bot
} from 'lucide-react';
import { useCase } from '../context/CaseContext';
import { InvestigationBoard } from '../components/game/InvestigationBoard';
import { AIPartner } from '../components/ai/AIPartner';
import { ObjectivePanel } from '../components/game/ObjectivePanel';
import { InvestigationProgress } from '../components/game/InvestigationProgress';
import { InvestigatorNotes } from '../components/game/InvestigatorNotes';
import { HypothesisCard } from '../components/game/HypothesisCard';
import { CreateHypothesisModal } from '../components/game/CreateHypothesisModal';
import { Button } from '../components/common/Button';

export const Investigation = () => {
  const { 
    activeCase, 
    activeEvidence, 
    activeEvents, 
    activePeople, 
    hypotheses,
    setIsBriefingOpen,
    setIsSubmitModalOpen,
    setIsAIPartnerOpen,
    inspectEvidence
  } = useCase();

  const [isHypothesisModalOpen, setIsHypothesisModalOpen] = useState(false);
  const [leftTab, setLeftTab] = useState('OBJECTIVES'); // 'OBJECTIVES' | 'PROGRESS' | 'THEORIES' | 'NOTES'

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-4">
      {/* Top Banner with Case Info & Briefing Re-opener */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-dark-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-600/30 to-dark-950 border border-crimson-500/50 flex items-center justify-center text-crimson-400 font-mono font-bold text-sm">
            {activeCase?.id || 'CASE-001'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-100 font-sans tracking-tight">
                {activeCase?.title}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-950 border border-slate-800 text-slate-400">
                {activeCase?.year}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans line-clamp-1">
              {activeCase?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={HelpCircle}
            onClick={() => setIsBriefingOpen(true)}
            className="text-xs font-mono"
          >
            Case Briefing
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={ShieldCheck}
            onClick={() => setIsSubmitModalOpen(true)}
            className="text-xs font-mono font-bold tracking-wider"
          >
            Submit Case
          </Button>
        </div>
      </div>

      {/* 3-Column Detective Investigation Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Left Column: Case Files & Objectives (3 Cols on large screens) */}
        <div className="lg:col-span-3 xl:col-span-3 flex flex-col space-y-3 min-h-0 overflow-hidden">
          {/* Left Column Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-dark-900/90 rounded-xl border border-slate-800 text-[11px] font-mono">
            {[
              { id: 'OBJECTIVES', label: 'Objectives' },
              { id: 'PROGRESS', label: 'Coverage' },
              { id: 'THEORIES', label: 'Theories' },
              { id: 'NOTES', label: 'Notes' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setLeftTab(t.id)}
                className={`flex-1 py-1.5 rounded-lg transition-colors text-center ${
                  leftTab === t.id 
                    ? 'bg-slate-800 text-white font-bold shadow-inner' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Left Tab Content */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {leftTab === 'OBJECTIVES' && <ObjectivePanel />}
            {leftTab === 'PROGRESS' && <InvestigationProgress />}
            {leftTab === 'NOTES' && <InvestigatorNotes />}
            {leftTab === 'THEORIES' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                    Formulated Hypotheses ({hypotheses.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsHypothesisModalOpen(true)}
                    className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> New
                  </button>
                </div>

                {hypotheses.map(hyp => (
                  <HypothesisCard
                    key={hyp.id}
                    hypothesis={hyp}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Column: Investigation Board (6 Cols on desktop, 9 on screens without right panel) */}
        <div className="lg:col-span-9 xl:col-span-6 flex flex-col min-h-0">
          <InvestigationBoard
            onOpenCreateHypothesis={() => setIsHypothesisModalOpen(true)}
            onOpenNotes={() => setLeftTab('NOTES')}
          />
        </div>

        {/* Right Column: AI Investigation Partner (3 Cols on XL screens, slide drawer on smaller) */}
        <div className="hidden xl:flex xl:col-span-3 flex-col min-h-0">
          <AIPartner />
        </div>
      </div>

      {/* Create Hypothesis Modal */}
      <CreateHypothesisModal
        isOpen={isHypothesisModalOpen}
        onClose={() => setIsHypothesisModalOpen(false)}
      />
    </div>
  );
};
