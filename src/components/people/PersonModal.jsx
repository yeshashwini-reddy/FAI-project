import React from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { 
  Users, 
  FileSearch, 
  Clock, 
  Shield, 
  Info, 
  Network, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { useNavigate } from 'react-router-dom';

export const PersonModal = ({ person, isOpen, onClose }) => {
  const { allEvidence, allEvents, allPeople, setSelectedEvidence, setSelectedEvent, setSelectedPerson } = useCase();
  const navigate = useNavigate();

  if (!person) return null;

  const linkedEvidence = allEvidence.filter(e => person.relatedEvidenceIds?.includes(e.id) || e.relatedPeople?.includes(person.id));
  const linkedEvents = allEvents.filter(ev => person.relatedEventIds?.includes(ev.id) || ev.relatedPeopleIds?.includes(person.id));

  const getCategoryVariant = (category) => {
    switch (category?.toLowerCase()) {
      case 'investigator': return 'primary';
      case 'official': return 'cyan';
      case 'witness': return 'warning';
      case 'person of interest': return 'danger';
      case 'expert': return 'purple';
      default: return 'default';
    }
  };

  const handleEvidenceClick = (ev) => {
    onClose();
    setSelectedEvidence(ev);
  };

  const handleEventClick = (eventItem) => {
    onClose();
    setSelectedEvent(eventItem);
  };

  const handlePersonClick = (pId) => {
    const targetPerson = allPeople.find(p => p.id === pId);
    if (targetPerson) {
      setSelectedPerson(targetPerson);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Person Profile"
      subtitle={`${person.name} • ${person.role}`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-dark-950/80 border border-slate-800 rounded-xl">
          <img
            src={person.avatar}
            alt={person.name}
            className="w-20 h-20 rounded-xl object-cover border-2 border-slate-700"
          />
          <div className="flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-100">{person.name}</h3>
              <Badge variant={getCategoryVariant(person.category)} size="sm">
                {person.category}
              </Badge>
              <Badge variant="outline" size="sm">
                {person.status}
              </Badge>
            </div>
            <p className="text-xs font-mono text-cyan-400">{person.role}</p>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {person.summary}
            </p>
          </div>
        </div>

        {/* Known Information */}
        <div className="p-4 bg-dark-850/60 border border-slate-800/80 rounded-xl">
          <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Documented Historical & Deposition Information
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {person.knownInformation}
          </p>
        </div>

        {/* Relationships Map List */}
        {person.relationships && person.relationships.length > 0 && (
          <div className="p-4 bg-dark-850/40 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-purple-400" />
              Recorded Connections & Relationships ({person.relationships.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {person.relationships.map((rel, idx) => {
                const target = allPeople.find(p => p.id === rel.personId);
                return (
                  <div
                    key={idx}
                    onClick={() => handlePersonClick(rel.personId)}
                    className="p-3 bg-dark-900/90 border border-slate-800 rounded-lg flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400">
                        {target ? target.name : rel.personId}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400">{rel.relation}</p>
                    </div>
                    <Badge variant={rel.type === 'Timeline Conflict' ? 'warning' : 'default'} size="sm">
                      {rel.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Linked Evidence & Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Linked Evidence */}
          <div className="p-4 bg-dark-850/40 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              Related Evidence Records ({linkedEvidence.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {linkedEvidence.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No direct evidence matches.</p>
              ) : (
                linkedEvidence.map(e => (
                  <button
                    key={e.id}
                    onClick={() => handleEvidenceClick(e)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-dark-900 hover:bg-dark-800 border border-slate-800 text-left transition-colors group"
                  >
                    <div className="truncate mr-2">
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{e.title}</p>
                      <p className="text-[10px] font-mono text-cyan-400">{e.code || e.id} • {e.type}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Linked Events */}
          <div className="p-4 bg-dark-850/40 border border-slate-800 rounded-xl">
            <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Related Timeline Events ({linkedEvents.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {linkedEvents.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No timeline entries mapped.</p>
              ) : (
                linkedEvents.map(ev => (
                  <button
                    key={ev.id}
                    onClick={() => handleEventClick(ev)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-dark-900 hover:bg-dark-800 border border-slate-800 text-left transition-colors group"
                  >
                    <div className="truncate mr-2">
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{ev.title}</p>
                      <p className="text-[10px] font-mono text-amber-400">{ev.date} {ev.time ? `• ${ev.time}` : ''}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 flex-shrink-0" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Archival Neutrality Disclaimer */}
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Archival Notice:</strong> Historical information is compiled strictly from verified inquest depositions and police registries. Mystery Solver maintains neutral evidentiary standards and does not assert unsubstantiated allegations.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onClose();
              navigate('/connections');
            }}
            icon={Network}
          >
            Inspect in Relationship Graph
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
};
