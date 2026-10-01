import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  FileSearch, 
  Clock, 
  Network, 
  Users, 
  Lightbulb, 
  RotateCcw,
  ShieldCheck,
  BrainCircuit,
  Wrench
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useCase } from '../../context/CaseContext';
import { executeAssistantTools } from '../../utils/aiAssistantAgent';

import { useNavigate } from 'react-router-dom';

export const AIInvestigationAssistant = () => {
  const navigate = useNavigate();
  const { 
    activeCase, 
    activeEvidence, 
    activePeople, 
    activeEvents, 
    activeGraph,
    hintsUsedMap,
    incrementHint
  } = useCase();

  const caseId = activeCase?.id || 'CASE-001';
  const hintsUsedCount = hintsUsedMap[caseId] || 0;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: `Hello Detective! I am your **AI Investigation Assistant** for **${activeCase?.title}**.\n\nI can help you analyze evidence, explain timeline inconsistencies, examine witness statements, and provide progressive hints without spoiling the case solution.\n\nHow can I help you investigate right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tools: []
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = (customText = null) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputQuery('');
    setIsProcessing(true);

    setTimeout(() => {
      const result = executeAssistantTools({
        query: textToSend,
        activeCase,
        activeEvidence,
        activePeople,
        activeEvents,
        activeGraph,
        hintsUsedCount,
        onHintUsed: () => incrementHint(caseId)
      });

      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: result.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tools: result.toolsCalled
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 400);
  };

  const handleQuickAction = (actionType) => {
    switch (actionType) {
      case 'evidence':
        handleSendMessage("Show me key evidence and search documents for this case.");
        break;
      case 'timeline':
        handleSendMessage("Explain the timeline and highlight any time contradictions.");
        break;
      case 'hint':
        handleSendMessage("Give me a hint about what I should examine next.");
        break;
      case 'clues':
        handleSendMessage("Find related clues and entity connections.");
        break;
      case 'analyze':
        handleSendMessage("Help me analyze the suspects and their statements.");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-crimson-950 border border-crimson-800 text-crimson-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider">
                AI INVESTIGATION ASSISTANT
              </span>
              <Badge variant="cyan" size="sm">
                Hints Used: {hintsUsedCount}/3
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Human = Detective / Case Solver • AI = Assistant / Guide
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={ShieldCheck}
            onClick={() => navigate(`/cases/${caseId}/solve`)}
            className="shadow-[0_0_15px_rgba(225,29,72,0.3)]"
          >
            🔐 SOLVE CASE
          </Button>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="rounded-2xl bg-dark-900/90 border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[620px]">
        {/* Header */}
        <div className="p-4 bg-dark-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-crimson-950 border border-crimson-800 flex items-center justify-center text-crimson-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-sans">
                AI Investigation Assistant
              </h3>
              <p className="text-[11px] text-slate-400">
                Need help? Ask me about the case clues, timeline, or suspects.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Assistant Ready
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-crimson-950/80 text-slate-100 border border-crimson-800 rounded-tr-none'
                    : 'bg-dark-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                {/* Tools called indicator */}
                {msg.tools && msg.tools.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-800/80 text-[10px] font-mono text-cyan-400">
                    <Wrench className="w-3 h-3 text-cyan-400" />
                    <span>Agent Tools Executed:</span>
                    {msg.tools.map((t, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-dark-900 border border-slate-800 text-slate-300">
                        {t.tool}()
                      </span>
                    ))}
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                <div className="text-[10px] font-mono text-slate-500 text-right pt-1">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-start gap-2 text-xs font-mono text-cyan-400 animate-pulse">
              <Bot className="w-4 h-4" />
              <span>AI Assistant inspecting case data...</span>
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="p-3 bg-dark-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-mono uppercase text-slate-400 whitespace-nowrap pl-1">
            Quick Actions:
          </span>
          <button
            onClick={() => handleQuickAction('evidence')}
            className="px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
            [ Ask About Evidence ]
          </button>
          <button
            onClick={() => handleQuickAction('timeline')}
            className="px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            [ Explain Timeline ]
          </button>
          <button
            onClick={() => handleQuickAction('hint')}
            className="px-3 py-1.5 rounded-lg bg-crimson-950/60 hover:bg-crimson-900/60 border border-crimson-800/80 text-crimson-300 text-xs font-mono font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-crimson-400" />
            [ Give Me a Hint ]
          </button>
          <button
            onClick={() => handleQuickAction('clues')}
            className="px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Network className="w-3.5 h-3.5 text-purple-400" />
            [ Find Related Clues ]
          </button>
          <button
            onClick={() => handleQuickAction('analyze')}
            className="px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono whitespace-nowrap flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            [ Help Me Analyze ]
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-dark-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask your AI assistant about evidence, suspects, timeline, or clues..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-dark-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans"
          />
          <Button
            variant="primary"
            size="md"
            icon={Send}
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
