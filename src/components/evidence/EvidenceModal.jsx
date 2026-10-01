import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  FileSearch, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Clock, 
  AlertTriangle,
  FileText,
  Link2,
  Lock,
  ArrowRight,
  Pin,
  Sparkles,
  Tag,
  AlertCircle
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { useNavigate } from 'react-router-dom';

export const EvidenceModal = ({ evidence, isOpen, onClose }) => {
  const { 
    allPeople, 
    allEvents, 
    setSelectedPerson, 
    setSelectedEvent, 
    pinnedClueIds,
    togglePinClue,
    clueStatuses,
    setClueStatus,
    addNote
  } = useCase();
  const navigate = useNavigate();

  if (!evidence) return null;

  const isPinned = pinnedClueIds.has(evidence.id);
  const currentStatus = clueStatuses[evidence.id];

  const relatedPeopleObjects = allPeople.filter(p => evidence.relatedPeople?.includes(p.id));
  const relatedEventObjects = allEvents.filter(ev => evidence.relatedEvents?.includes(ev.id));

  const handlePersonClick = (person) => {
    onClose();
    setSelectedPerson(person);
  };

  const handleEventClick = (event) => {
    onClose();
    setSelectedEvent(event);
  };

  const handleQuickNote = () => {
    const defaultNote = `Observation regarding ${evidence.code || evidence.id} (${evidence.title}): `;
    addNote(defaultNote, evidence.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={evidence.title}
      subtitle={`Evidence Code: ${evidence.code || evidence.id} • ${evidence.source}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Top Badges & Meta info */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-dark-950/90 border border-slate-800 rounded-xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="cyan" size="sm">
              {evidence.type || 'Document'}
            </Badge>
            <Badge variant="default" size="sm">
              {evidence.category}
            </Badge>
            <Badge variant="success" size="sm" dot>
              {evidence.status || 'Verified Authentic'}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Date: {evidence.date}
            </span>
          </div>
        </div>

        {/* Extracted Information Quick Bar (Detective Clue Discovery) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-center">
            <div className="text-base font-mono font-bold text-purple-400">
              {relatedPeopleObjects.length || (evidence.relatedPeople ? evidence.relatedPeople.length : 2)}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
              People Mentioned
            </div>
          </div>

          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-center">
            <div className="text-base font-mono font-bold text-amber-400">
              {relatedEventObjects.length || (evidence.relatedEvents ? evidence.relatedEvents.length : 2)}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
              Timeline Links
            </div>
          </div>

          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-center">
            <div className="text-base font-mono font-bold text-cyan-400">
              {evidence.metadata?.pages || 4}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
              Archival Pages
            </div>
          </div>

          <div className="p-3 rounded-xl bg-dark-900/80 border border-slate-800 text-center">
            <div className="text-base font-mono font-bold text-emerald-400">
              {evidence.chainOfCustody?.length || 3}
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
              Custody Transfers
            </div>
          </div>
        </div>

        {/* Investigator Tagging Controls */}
        <div className="p-4 rounded-xl bg-dark-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Mark Clue Status:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'important', label: 'Important', color: 'border-crimson-700 bg-crimson-950/60 text-crimson-300' },
              { id: 'interesting', label: 'Interesting', color: 'border-amber-700 bg-amber-950/60 text-amber-300' },
              { id: 'unverified', label: 'Unverified', color: 'border-slate-700 bg-slate-900 text-slate-300' },
              { id: 'contradiction', label: 'Contradiction', color: 'border-purple-600 bg-purple-950/60 text-purple-300' }
            ].map(tag => {
              const isSelected = currentStatus === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setClueStatus(evidence.id, tag.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                    isSelected
                      ? `${tag.color} shadow-sm scale-105 ring-1 ring-white/20`
                      : 'bg-dark-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {isSelected ? `✓ ${tag.label}` : tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Description & Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-dark-900/70 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Official Archival Transcript
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {evidence.description}
            </p>
          </div>

          <div className="p-4 bg-dark-900/70 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Forensic Synthesis
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {evidence.summary || evidence.description}
            </p>
          </div>
        </div>

        {/* Key Findings */}
        {evidence.keyFindings && evidence.keyFindings.length > 0 && (
          <div className="p-4 bg-dark-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Key Evidentiary Findings
            </h4>
            <ul className="space-y-2">
              {evidence.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contradictions & Irregularities (if flagged) */}
        {evidence.contradictions && evidence.contradictions.length > 0 && (
          <div className="p-4 bg-purple-950/30 border border-purple-800/40 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-purple-400" />
              Identified Temporal or Evidentiary Discrepancies
            </h4>
            <ul className="space-y-1.5">
              {evidence.contradictions.map((contra, idx) => (
                <li key={idx} className="text-xs text-purple-200/90 leading-relaxed font-sans">
                  • {contra}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chain of Custody */}
        {evidence.chainOfCustody && evidence.chainOfCustody.length > 0 && (
          <div className="p-4 bg-dark-950/60 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Chain of Custody Log
            </h4>
            <div className="space-y-2">
              {evidence.chainOfCustody.map((custody, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono p-2 bg-dark-900 rounded border border-slate-800/80">
                  <span className="text-slate-400">{custody.date}</span>
                  <span className="text-slate-200 font-sans">{custody.action}</span>
                  <span className="text-cyan-400">{custody.agent}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related People & Events Cross-links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          {/* Related People */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              Associated People ({relatedPeopleObjects.length})
            </h4>
            <div className="space-y-2">
              {relatedPeopleObjects.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No direct personal links recorded.</p>
              ) : (
                relatedPeopleObjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handlePersonClick(p)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-dark-900 hover:bg-dark-850 border border-slate-800 text-left transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white">{p.name}</p>
                      <p className="text-[10px] font-mono text-slate-400">{p.role}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Related Events */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Linked Timeline Events ({relatedEventObjects.length})
            </h4>
            <div className="space-y-2">
              {relatedEventObjects.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No timeline occurrences mapped.</p>
              ) : (
                relatedEventObjects.map(ev => (
                  <button
                    key={ev.id}
                    onClick={() => handleEventClick(ev)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg bg-dark-900 hover:bg-dark-850 border border-slate-800 text-left transition-colors group"
                  >
                    <div className="truncate mr-2">
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{ev.title}</p>
                      <p className="text-[10px] font-mono text-amber-400">{ev.date} {ev.time ? `• ${ev.time}` : ''}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <Button
              variant={isPinned ? "secondary" : "primary"}
              size="sm"
              icon={Pin}
              onClick={() => togglePinClue(evidence.id)}
            >
              {isPinned ? "Unpin from Board" : "Add to Investigation Board"}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleQuickNote}
            >
              + Note
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onClose();
                navigate(`/connections`);
              }}
              icon={Link2}
            >
              Graph View
            </Button>

            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
