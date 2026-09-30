import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  Search, 
  FileSearch, 
  Clock, 
  Users, 
  Network, 
  Cpu, 
  FileText, 
  AlertTriangle, 
  Sparkles,
  Layers,
  ChevronRight,
  Database,
  Terminal,
  Lightbulb,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useCase } from '../context/CaseContext';

export const Landing = () => {
  const navigate = useNavigate();
  const { setActiveCaseId, setIsBriefingOpen } = useCase();

  const handleStart = () => {
    setActiveCaseId('CASE-001');
    setIsBriefingOpen(true);
    navigate('/investigation');
  };

  const featuredCase = {
    id: "CASE-001",
    title: "THE WHITECHAPEL FILE",
    type: "Historical Investigation",
    year: 1888,
    difficulty: "██████░░░░",
    evidence: 43,
    people: 12,
    unresolved: 5,
    status: "UNRESOLVED"
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-crimson-600 selection:text-white relative overflow-hidden">
      {/* Background Subtle Forensic Grid & Gradients */}
      <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-cyan-glow opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-30 h-20 max-w-7xl mx-auto w-full px-6 flex items-center justify-between border-b border-slate-800/60 bg-dark-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson-600 to-crimson-950 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.35)] border border-crimson-500/50">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-slate-100 font-mono">MYSTERY</span>
              <span className="font-extrabold text-base tracking-wider text-crimson-500 font-mono">SOLVER</span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Detective Investigation OS</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <Link to="/cases" className="hover:text-slate-200 transition-colors">Case Archive</Link>
          <Link to="/evidence" className="hover:text-slate-200 transition-colors">Evidence Vault</Link>
          <Link to="/timeline" className="hover:text-slate-200 transition-colors">Timeline</Link>
          <Link to="/reports" className="hover:text-slate-200 transition-colors">Forensic Reports</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/cases')}
          >
            Case Archive
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleStart}
          >
            Enter Case
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-20 pt-16 pb-20 px-6 max-w-5xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crimson-950/60 border border-crimson-800/60 text-crimson-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Detective Investigation Room</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 font-sans leading-tight">
            MYSTERY <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-rose-400 to-cyan-400">SOLVER</span>
          </h1>

          <div className="text-xl sm:text-3xl font-light text-slate-200 font-sans space-y-1">
            <p className="font-semibold text-white tracking-wide">Every clue matters.</p>
            <div className="text-base sm:text-xl text-slate-400 font-normal space-y-1 pt-1">
              <p>Investigate real cases. <span className="text-cyan-400 font-medium">Connect the evidence.</span></p>
              <p>Uncover what the records reveal.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed pt-2">
            An intelligent digital evidence room for rigorous historical inquiries. Examine coroner depositions, cross-reference patrol intervals, identify testimony contradictions, and form hypotheses alongside an AI investigation partner.
          </p>
        </motion.div>

        {/* Primary Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={handleStart}
            className="shadow-[0_0_30px_rgba(225,29,72,0.4)] font-mono text-xs sm:text-sm font-bold tracking-wider"
          >
            START INVESTIGATION
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={Search}
            onClick={() => navigate('/cases')}
            className="font-mono text-xs sm:text-sm"
          >
            EXPLORE CASE ARCHIVE
          </Button>
        </motion.div>

        {/* Interactive Case Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-10 max-w-xl mx-auto text-left"
        >
          <div className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-crimson-400 font-bold uppercase tracking-wider">
                ACTIVE CASE FILE
              </span>
              <span className="text-slate-400">
                {featuredCase.year}
              </span>
            </div>

            <div className="py-4 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                {featuredCase.type}
              </span>
              <h3 className="text-2xl font-extrabold text-white font-sans tracking-tight">
                {featuredCase.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Examine digitized 1888 Scotland Yard inquest files, sworn deponent transcripts, and surgeon autopsy notes across Whitechapel.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center font-mono text-xs">
              <div className="p-2 rounded-lg bg-dark-950 border border-slate-800/80">
                <div className="font-bold text-cyan-400">{featuredCase.evidence}</div>
                <div className="text-[9px] text-slate-400 uppercase">Evidence</div>
              </div>
              <div className="p-2 rounded-lg bg-dark-950 border border-slate-800/80">
                <div className="font-bold text-purple-400">{featuredCase.people}</div>
                <div className="text-[9px] text-slate-400 uppercase">People</div>
              </div>
              <div className="p-2 rounded-lg bg-dark-950 border border-slate-800/80">
                <div className="font-bold text-amber-400">{featuredCase.unresolved}</div>
                <div className="text-[9px] text-slate-400 uppercase">Unresolved</div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-400">
                Status: <span className="text-amber-400 font-bold">{featuredCase.status}</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleStart}
                className="font-mono text-xs font-bold"
              >
                ENTER CASE
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Case Investigation Principles */}
      <section className="relative z-20 py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-12">
          <Badge variant="cyan" size="sm">Investigation Room Architecture</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-sans tracking-tight">
            The Digital Investigation Room
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            You are the investigator. The AI Agent is your partner. Connect the evidence and formulate your deductions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-dark-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center text-cyan-400">
              <FileSearch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-200">1. Case Files & Clue Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore verbatim coroner deposition transcripts, cadastral maps, and physical evidence fragments. Tag items as Important, Interesting, Unverified, or Contradictory.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-200">2. Interactive Chronology & Board</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reconstruct minute-by-minute execution windows. Pin critical leads to the case board and map multi-layered relationships between events, locations, and deponents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-dark-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center text-crimson-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-200">3. AI Partner & Hypothesis System</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consult your AI partner for non-spoiling hints and contradiction checks. Draft working theories, calculate evidence coverage, and synthesize objective forensic reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-8 px-6 border-t border-slate-800 bg-dark-950/90 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-crimson-500" />
            <span className="font-bold text-slate-300">MYSTERY SOLVER</span>
            <span className="text-slate-400">• Academic AI Investigation Workspace</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/investigation" className="hover:text-slate-200 transition-colors">Investigation Room</Link>
            <Link to="/cases" className="hover:text-slate-200 transition-colors">Archive</Link>
            <Link to="/evidence" className="hover:text-slate-200 transition-colors">Evidence</Link>
            <Link to="/timeline" className="hover:text-slate-200 transition-colors">Timeline</Link>
            <Link to="/reports" className="hover:text-slate-200 transition-colors">Reports</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
