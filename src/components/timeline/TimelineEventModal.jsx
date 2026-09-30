import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  FileSearch, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export const TimelineEventModal = ({ event, isOpen, onClose }) => {
  const { allEvidence, allPeople, setSelectedEvidence, setSelectedPerson } = useCase();

  if (!event) return null;

  const linkedEvidence = allEvidence.filter(e => event.relatedEvidenceIds?.includes(e.id));
  const linkedPeople = allPeople.filter(p => event.relatedPeopleIds?.includes(p.id));

  const handleEvidenceClick = (ev) => {
    onClose();
    setSelectedEvidence(ev);
  };

  const handlePersonClick = (p) => {
    onClose();
    setSelectedPerson(p);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={event.title}
      subtitle={`Timestamp: ${event.date} • ${event.time || 'Time unspecified'}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-dark-950/80 border border-slate-800 rounded-xl">
          <div className="flex items-center gap-2">
            <Badge variant="warning" size="sm">
              {event.category || 'Incident'}
            </Badge>
            <Badge variant="cyan" size="sm">
              Confidence: {event.confidence || 'Verified'}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-crimson-400" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="p-4 bg-dark-850/60 border border-slate-800 rounded-xl">
          <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Event Description & Reconstructed Details
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            {event.description}
          </p>
          {event.summary && (
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed pt-2.5 border-t border-slate-800">
              {event.summary}
            </p>
          )}
        </div>

        {/* Contradiction Alert if present */}
        {event.hasContradiction && (
          <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Timeline Discrepancy Flagged
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {event.contradictionNote || 'This event has a verified temporal discrepancy with contemporary statements.'}
            </p>
          </div>
        )}

        {/* Linked Entities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Linked Evidence */}
          <div className="p-3.5 bg-dark-850/40 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              Associated Evidence ({linkedEvidence.length})
            </h4>
            <div className="space-y-1.5">
              {linkedEvidence.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No direct evidence items attached.</p>
              ) : (
                linkedEvidence.map(e => (
                  <button
                    key={e.id}
                    onClick={() => handleEvidenceClick(e)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-dark-900 hover:bg-dark-800 border border-slate-800 text-left transition-colors group text-xs"
                  >
                    <span className="text-slate-200 group-hover:text-cyan-400 truncate mr-2">{e.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Linked People */}
          <div className="p-3.5 bg-dark-850/40 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              Deponents & Responders ({linkedPeople.length})
            </h4>
            <div className="space-y-1.5">
              {linkedPeople.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No individuals attached.</p>
              ) : (
                linkedPeople.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handlePersonClick(p)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-dark-900 hover:bg-dark-800 border border-slate-800 text-left transition-colors group text-xs"
                  >
                    <span className="text-slate-200 group-hover:text-purple-400 truncate mr-2">{p.name}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-purple-400 flex-shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
