import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { GlobalSearchModal } from './GlobalSearchModal';
import { Drawer } from '../common/Drawer';
import { EvidenceModal } from '../evidence/EvidenceModal';
import { PersonModal } from '../people/PersonModal';
import { TimelineEventModal } from '../timeline/TimelineEventModal';
import { ReportDetailModal } from '../reports/ReportDetailModal';
import { CaseBriefingModal } from '../game/CaseBriefingModal';
import { SubmitInvestigationModal } from '../game/SubmitInvestigationModal';
import { AIPartner } from '../ai/AIPartner';
import { useCase } from '../../context/CaseContext';
import { 
  Bell, 
  FileText, 
  Clock, 
  Users, 
  FileSearch, 
  ShieldCheck, 
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../common/Button';
import { useNavigate } from 'react-router-dom';

export const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    isBriefingOpen,
    setIsBriefingOpen,
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    isAIPartnerOpen,
    setIsAIPartnerOpen,
    activities, 
    activeCase,
    selectedEvidence,
    setSelectedEvidence,
    selectedPerson,
    setSelectedPerson,
    selectedEvent,
    setSelectedEvent,
    selectedReport,
    setSelectedReport
  } = useCase();

  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-dark-950 text-slate-100 selection:bg-crimson-600 selection:text-white">
        <Outlet />
      </div>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'evidence': return FileSearch;
      case 'timeline': return Clock;
      case 'person': return Users;
      case 'report': return FileText;
      default: return Bell;
    }
  };

  return (
    <div className="flex h-screen bg-dark-950 text-slate-100 overflow-hidden font-sans">
      {/* Desktop Persistent Sidebar Rail */}
      <div className="hidden md:block h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer for Navigation Rail */}
      <Drawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        position="left"
        width="max-w-xs"
        title="Mystery Solver"
        subtitle="Investigation Menu"
      >
        <Sidebar onCloseMobile={() => setMobileOpen(false)} />
      </Drawer>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-dark-950 pb-16 md:pb-0">
        <Header onOpenMobileMenu={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6 space-y-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Rail */}
      <MobileNavigation />

      {/* Global Search Modal */}
      <GlobalSearchModal />

      {/* AI Partner Mobile/Tablet Slide-over Drawer */}
      <Drawer
        isOpen={isAIPartnerOpen}
        onClose={() => setIsAIPartnerOpen(false)}
        position="right"
        width="max-w-md"
        title="AI Investigation Partner"
        subtitle="Forensic analysis & assistance"
      >
        <div className="h-[80vh]">
          <AIPartner isMobileDrawer onCloseMobile={() => setIsAIPartnerOpen(false)} />
        </div>
      </Drawer>

      {/* Case Briefing Modal */}
      <CaseBriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
        onBegin={() => {
          setIsBriefingOpen(false);
          navigate('/investigation');
        }}
      />

      {/* Submit Investigation Modal */}
      <SubmitInvestigationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Notifications / Activity Drawer */}
      <Drawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Investigation Activity Stream"
        subtitle="Live telemetry and audit logs"
        width="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-3 bg-dark-900 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-300">Live Telemetry Active</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{activeCase?.id}</span>
          </div>

          <div className="space-y-3">
            {activities.map((act) => {
              const Icon = getActivityIcon(act.type);
              return (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-dark-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-slate-200 truncate">{act.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{act.details}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>{act.user}</span>
                        <span className="text-crimson-400">{act.caseId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                setIsNotificationsOpen(false);
                navigate('/investigation');
              }}
            >
              Open Investigation Room
            </Button>
          </div>
        </div>
      </Drawer>

      {/* Global Modals */}
      <EvidenceModal
        evidence={selectedEvidence}
        isOpen={!!selectedEvidence}
        onClose={() => setSelectedEvidence(null)}
      />

      <PersonModal
        person={selectedPerson}
        isOpen={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />

      <TimelineEventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <ReportDetailModal
        report={selectedReport}
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};
