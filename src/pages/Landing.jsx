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
  Terminal
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const Landing = () => {
  const navigate = useNavigate();

  const pipelineSteps = [
    { label: 'Evidence', icon: FileSearch, color: 'text-cyan-400' },
    { label: 'Timeline', icon: Clock, color: 'text-amber-400' },
    { label: 'People', icon: Users, color: 'text-purple-400' },
    { label: 'Connections', icon: Network, color: 'text-pink-400' },
    { label: 'Investigation', icon: Cpu, color: 'text-crimson-400' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Select a Case',
      desc: 'Browse verified historical archives and modern investigative case repositories with indexed evidence files.'
    },
    {
      step: '02',
      title: 'Explore Evidence',
      desc: 'Inspect digitized inquest depositions, forensic autopsies, geospatial maps, and chain-of-custody ledgers.'
    },
    {
      step: '03',
      title: 'Connect Events & People',
      desc: 'Reconstruct minute-by-minute timelines and trace multidirectional entity relationship networks.'
    },
    {
      step: '04',
      title: 'Consult AI Assistant',
      desc: 'Ask your AI Assistant for guided evidence explanations, timeline analysis, and progressive hints when stuck.'
    },
    {
      step: '05',
      title: 'Submit Final Solution',
      desc: 'Form your own theory, select your suspect, and submit your solution to verify your findings against official facts.'
    }
  ];

  const features = [
    {
      icon: FileSearch,
      title: 'Evidence Management',
      desc: 'Catalog, verify, and cross-reference documents, forensic photographs, ballistic reports, and physical artifacts in a unified digital room.'
    },
    {
      icon: Clock,
      title: 'Timeline Reconstruction',
      desc: 'Isolate narrow execution windows and analyze patrol sweep intervals with high-precision timestamp mapping.'
    },
    {
      icon: Users,
      title: 'People & Relationships',
      desc: 'Track deponents, investigators, witnesses, and persons of interest with verifiable deposition linkages.'
    },
    {
      icon: AlertTriangle,
      title: 'Contradiction Detection',
      desc: 'Automatically flag temporal paradoxes between post-mortem medical estimates and sworn eyewitness accounts.'
    },
    {
      icon: Cpu,
      title: 'AI Investigation Assistant',
      desc: 'Smart detective assistant powered by tool functions (searchEvidence, getTimeline, generateHint) to guide the human detective.'
    },
    {
      icon: FileText,
      title: 'Investigation Reports',
      desc: 'Produce objective, archival-grade forensic reports with neutral language, contradiction matrices, and export tools.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-crimson-600 selection:text-white relative overflow-hidden">
      {/* Background Subtle Gradients & Grid */}
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-cyan-glow opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-30 h-20 max-w-7xl mx-auto w-full px-6 flex items-center justify-between border-b border-slate-800/60 bg-dark-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson-600 to-crimson-900 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.4)] border border-crimson-500/50">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-slate-100 font-mono">MYSTERY</span>
              <span className="font-extrabold text-base tracking-wider text-crimson-500 font-mono">SOLVER</span>
            </div>
            <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">AI Investigation OS</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#how-it-works" className="hover:text-slate-200 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
          <a href="#pipeline" className="hover:text-slate-200 transition-colors">Evidence Pipeline</a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/cases')}
          >
            Explore Cases
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
          >
            Open Dashboard
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
            <span>AI-Powered Digital Evidence & Investigation Workspace</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 font-sans leading-tight">
            MYSTERY <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-500 via-rose-400 to-cyan-400">SOLVER</span>
          </h1>

          <div className="text-lg sm:text-2xl font-light text-slate-300 font-sans space-y-1">
            <p>Investigate the evidence. <span className="text-cyan-400 font-medium">Connect the clues.</span></p>
            <p className="text-slate-400">Understand the case.</p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed pt-2">
            An advanced investigation workspace for analyzing complex cases, digitized historical evidence, synchronized timelines, entity relationships, and automated contradiction detection.
          </p>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
            className="shadow-[0_0_30px_rgba(225,29,72,0.4)]"
          >
            Open Dashboard
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={Search}
            onClick={() => navigate('/cases')}
          >
            Explore Case Files
          </Button>
        </motion.div>

        {/* Visual Pipeline Flow Representation */}
        <motion.div
          id="pipeline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-14"
        >
          <div className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Connected Investigation Flow
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {pipelineSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={step.label}>
                    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 transition-colors shadow-inner">
                      <Icon className={`w-4 h-4 ${step.color}`} />
                      <span className="text-xs font-mono font-bold text-slate-200">{step.label}</span>
                    </div>

                    {idx < pipelineSteps.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-20 py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-14">
          <Badge variant="cyan" size="sm">System Methodology</Badge>
          <h2 className="text-3xl font-bold text-slate-100 font-sans tracking-tight">
            How Mystery Solver Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            From raw archival transcript indexing to automated anomaly detection and multi-source synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {howItWorks.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-xl bg-dark-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-mono font-bold text-crimson-500/80 block mb-2">
                  {item.step}
                </span>
                <h3 className="text-sm font-bold text-slate-200 font-sans">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-20 py-20 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-3 mb-14">
          <Badge variant="primary" size="sm">Core Capabilities</Badge>
          <h2 className="text-3xl font-bold text-slate-100 font-sans tracking-tight">
            Investigation Command Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            A digital evidence room and graph intelligence engine engineered for rigor and forensic clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-dark-900/70 border border-slate-800/80 hover:border-slate-700 hover:shadow-xl transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:text-crimson-400 group-hover:border-crimson-900/50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="relative z-20 py-10 px-6 border-t border-slate-800 bg-dark-950/90 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-crimson-500" />
            <span className="font-bold text-slate-300">MYSTERY SOLVER</span>
            <span className="text-slate-400">• Digital Evidence & Investigation OS</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="hover:text-slate-200 transition-colors">Dashboard</Link>
            <Link to="/cases" className="hover:text-slate-200 transition-colors">Cases</Link>
            <Link to="/investigation" className="hover:text-slate-200 transition-colors">AI Agent</Link>
            <Link to="/reports" className="hover:text-slate-200 transition-colors">Reports</Link>
          </div>

          <div className="text-slate-400">
            Phase 1 Frontend Architecture • Mock Data Store
          </div>
        </div>
      </footer>
    </div>
  );
};
