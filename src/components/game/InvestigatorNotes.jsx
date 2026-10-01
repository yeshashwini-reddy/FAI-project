import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StickyNote, Plus, Trash2, Clock, Pin, FileText } from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { Button } from '../common/Button';

export const InvestigatorNotes = ({ isOpen, onClose }) => {
  const { notes, addNote, deleteNote, activeEvidence } = useCase();
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedClueId, setSelectedClueId] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addNote(newNoteText, selectedClueId || null);
    setNewNoteText('');
    setSelectedClueId('');
  };

  return (
    <div className="bg-dark-900/80 rounded-2xl border border-slate-800/80 p-4 shadow-xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-mono font-bold text-slate-100 tracking-wider">
            INVESTIGATOR NOTES
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          {notes.length} Notes Saved
        </span>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleAdd} className="space-y-2.5">
        <textarea
          rows={3}
          placeholder="Record an investigative observation, correlation, or inquiry..."
          value={newNoteText}
          onChange={(e) => setNewNoteText(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-amber-500/60 transition-colors leading-relaxed"
        />

        <div className="flex items-center justify-between gap-2">
          <select
            value={selectedClueId}
            onChange={(e) => setSelectedClueId(e.target.value)}
            className="text-[11px] font-mono px-2 py-1.5 rounded-lg bg-dark-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-amber-500/60"
          >
            <option value="">Link Clue (Optional)</option>
            {activeEvidence.map(ev => (
              <option key={ev.id} value={ev.id}>
                {ev.code || ev.id} - {ev.title.substring(0, 24)}...
              </option>
            ))}
          </select>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!newNoteText.trim()}
            className="text-xs py-1"
          >
            Save Note (+40 XP)
          </Button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <div className="p-4 text-center rounded-xl bg-dark-950/60 border border-slate-800 text-xs text-slate-400 font-mono">
            No notes written yet. Jot down key observations here.
          </div>
        ) : (
          notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-dark-950/90 border border-slate-800 hover:border-slate-700 transition-colors group relative space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {note.createdAt}
                </span>

                <div className="flex items-center gap-1.5">
                  {note.relatedClueId && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-950/50 border border-amber-800/40 text-[9px] text-amber-300 font-mono">
                      {note.relatedClueId}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-crimson-400 transition-opacity p-1"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {note.text}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
