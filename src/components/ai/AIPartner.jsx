import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Lightbulb, 
  Compass, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Terminal,
  X
} from 'lucide-react';
import { useCase } from '../../context/CaseContext';
import { Button } from '../common/Button';

export const AIPartner = ({ isMobileDrawer = false, onCloseMobile }) => {
  const { 
    aiMessages, 
    isAITyping, 
    askPartner, 
    requestHint, 
    handlePartnerAction,
    activeCase
  } = useCase();

  const [inputQuery, setInputQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages, isAITyping]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim() || isAITyping) return;
    askPartner(inputQuery);
    setInputQuery('');
  };

  const quickPrompts = [
    "Why is the 14-minute window significant?",
    "What is the contradiction in Hanbury Street?",
    "Tell me about the Goulston Street apron"
  ];

  return (
    <div className="flex flex-col h-full bg-dark-900/90 rounded-2xl border border-slate-800/90 shadow-2xl backdrop-blur-md overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-dark-950/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-600/30 to-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(14,165,233,0.25)]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-100 font-mono tracking-wide">
                AI INVESTIGATION PARTNER
              </h3>
              <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-1.5 py-0.2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans">
              Forensic analysis & clue correlation assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Dedicated Hint Button */}
          <button
            type="button"
            onClick={requestHint}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
            title="Request a non-spoiling investigative direction"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GET HINT</span>
          </button>

          {isMobileDrawer && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
        {aiMessages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                {isAI ? (
                  <span className="text-[10px] font-mono font-bold text-cyan-400 flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    PARTNER AGENT
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    INVESTIGATOR
                  </span>
                )}
                <span className="text-[9px] font-mono text-slate-400">
                  {msg.timestamp}
                </span>
              </div>

              {/* Message Bubble */}
              <div
                className={`p-3.5 rounded-2xl max-w-[90%] sm:max-w-[85%] leading-relaxed ${
                  isAI
                    ? msg.isHint
                      ? 'bg-amber-950/40 border border-amber-600/40 text-amber-100 rounded-tl-sm'
                      : 'bg-dark-950/90 border border-slate-800 text-slate-200 rounded-tl-sm shadow-md'
                    : 'bg-gradient-to-r from-crimson-900/60 to-dark-850 border border-crimson-700/50 text-white rounded-tr-sm'
                }`}
              >
                <div className="whitespace-pre-line text-xs leading-relaxed">
                  {msg.text}
                </div>

                {/* Interactive Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {msg.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handlePartnerAction(act)}
                        className="px-2.5 py-1 rounded-lg bg-dark-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-[10px] font-mono font-medium flex items-center gap-1 hover:bg-cyan-950/40 transition-all"
                      >
                        <span>{act.label}</span>
                        <ChevronRight className="w-3 h-3 text-cyan-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Typing indicator */}
        {isAITyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2 bg-dark-950/60 rounded-xl border border-slate-800/60 max-w-[200px]"
          >
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
            <span className="text-[10px] text-cyan-400">Reviewing archives...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="px-3 py-2 border-t border-slate-800/60 bg-dark-950/60 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[9px] font-mono text-slate-400 whitespace-nowrap uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
          Suggested:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => askPartner(prompt)}
            className="px-2 py-1 rounded-md bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-[10px] font-mono whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-dark-950/90 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask your investigation partner..."
          className="flex-1 bg-dark-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isAITyping}
          className="w-9 h-9 rounded-xl bg-cyan-600/30 border border-cyan-500/50 hover:bg-cyan-600/50 disabled:opacity-40 disabled:pointer-events-none text-cyan-300 flex items-center justify-center transition-all shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
