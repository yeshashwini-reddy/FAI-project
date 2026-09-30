import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { mockCases } from '../data/mockCases';
import { mockEvidence } from '../data/mockEvidence';
import { mockPeople } from '../data/mockPeople';
import { mockEvents } from '../data/mockEvents';
import { mockReports } from '../data/mockReports';
import { mockActivities, simulatedAgentSteps } from '../data/mockActivity';
import { mockGraphData } from '../data/mockRelationships';
import { mockInitialHypotheses } from '../data/hypotheses';
import { mockCaseObjectives } from '../data/objectives';
import { aiPartnerHints, aiPartnerInitialMessages, aiDialogueResponses } from '../data/aiPartnerPrompts';

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [cases] = useState(mockCases);
  const [activeCaseId, setActiveCaseId] = useState('CASE-001');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAIPartnerOpen, setIsAIPartnerOpen] = useState(false); // For mobile/drawer toggle

  // Selected item modals
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  // Investigation Game State
  const [xp, setXp] = useState(350);
  const [inspectedEvidenceIds, setInspectedEvidenceIds] = useState(new Set(['E-001', 'E-004']));
  const [inspectedEventIds, setInspectedEventIds] = useState(new Set(['EV-001', 'EV-008']));
  const [inspectedPeopleIds, setInspectedPeopleIds] = useState(new Set(['P-001']));
  const [pinnedClueIds, setPinnedClueIds] = useState(new Set(['E-004', 'E-006', 'EV-009', 'P-001']));
  const [clueStatuses, setClueStatuses] = useState({
    'E-004': 'important',
    'E-006': 'contradiction',
    'E-005': 'interesting',
    'E-002': 'unverified'
  });

  // Player Notes
  const [notes, setNotes] = useState([
    {
      id: 'NOTE-1',
      caseId: 'CASE-001',
      text: 'PC Watkins 14-minute sweep between 01:30 and 01:44 AM is our tightest chronological anchor for Mitre Square.',
      createdAt: '28 Sep, 15:20',
      relatedClueId: 'E-004'
    },
    {
      id: 'NOTE-2',
      caseId: 'CASE-001',
      text: 'Need to cross-reference Dr. Phillips body temperature decay curve with ambient weather readings.',
      createdAt: '29 Sep, 11:05',
      relatedClueId: 'E-006'
    }
  ]);

  // Hypotheses
  const [hypotheses, setHypotheses] = useState(mockInitialHypotheses);

  // AI Partner Interaction
  const [aiMessages, setAiMessages] = useState(aiPartnerInitialMessages);
  const [isAITyping, setIsAITyping] = useState(false);
  const [usedHintIndex, setUsedHintIndex] = useState(0);
  const [connectionDiscoveryAlert, setConnectionDiscoveryAlert] = useState(null);

  // Simulated Investigation Agent State
  const [investigationStatus, setInvestigationStatus] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [agentLogs, setAgentLogs] = useState([]);
  const [investigationResult, setInvestigationResult] = useState(null);

  // Active Case Data
  const activeCase = useMemo(() => {
    return cases.find(c => c.id === activeCaseId) || cases[0];
  }, [cases, activeCaseId]);

  const activeEvidence = useMemo(() => {
    return mockEvidence.filter(e => e.caseId === activeCaseId);
  }, [activeCaseId]);

  const activePeople = useMemo(() => {
    return mockPeople.filter(p => p.caseId === activeCaseId);
  }, [activeCaseId]);

  const activeEvents = useMemo(() => {
    return mockEvents.filter(ev => ev.caseId === activeCaseId);
  }, [activeCaseId]);

  const activeReports = useMemo(() => {
    return mockReports.filter(r => r.caseId === activeCaseId);
  }, [activeCaseId]);

  const activeGraph = useMemo(() => {
    return mockGraphData[activeCaseId] || mockGraphData['CASE-001'];
  }, [activeCaseId]);

  // Current Objectives and Dynamic Status Calculation
  const activeObjectives = useMemo(() => {
    const caseObjs = mockCaseObjectives[activeCaseId] || mockCaseObjectives['CASE-001'] || [];
    return caseObjs.map(obj => {
      let current = 0;
      let completed = false;

      if (obj.type === 'evidence_inspected') {
        current = inspectedEvidenceIds.size;
        completed = current >= obj.targetCount;
      } else if (obj.type === 'events_reviewed') {
        current = inspectedEventIds.size;
        completed = current >= obj.targetCount;
      } else if (obj.type === 'contradiction_found') {
        const hasContradictionMarked = Object.values(clueStatuses).includes('contradiction');
        current = hasContradictionMarked ? 1 : 0;
        completed = current >= obj.targetCount;
      } else if (obj.type === 'people_connected') {
        current = inspectedPeopleIds.size;
        completed = current >= obj.targetCount;
      } else if (obj.type === 'hypothesis_formed') {
        current = hypotheses.filter(h => h.caseId === activeCaseId).length;
        completed = current >= obj.targetCount;
      } else if (obj.type === 'case_submitted') {
        completed = investigationStatus === 'completed' || !!investigationResult;
        current = completed ? 1 : 0;
      }

      return {
        ...obj,
        currentProgress: current,
        isCompleted: completed
      };
    });
  }, [activeCaseId, inspectedEvidenceIds, inspectedEventIds, inspectedPeopleIds, clueStatuses, hypotheses, investigationStatus, investigationResult]);

  // Investigation Progress Metrics
  const investigationMetrics = useMemo(() => {
    const totalEvidence = activeEvidence.length || 1;
    const totalEvents = activeEvents.length || 1;
    const totalObjectives = activeObjectives.length || 1;
    const completedObjectives = activeObjectives.filter(o => o.isCompleted).length;

    const evidenceExplored = Math.min(100, Math.round((inspectedEvidenceIds.size / Math.max(1, totalEvidence)) * 100));
    const timelineReconstructed = Math.min(100, Math.round((inspectedEventIds.size / Math.max(1, totalEvents)) * 100));
    const connectionsDiscovered = Math.min(100, Math.round((pinnedClueIds.size / 8) * 100));
    const openQuestions = Math.max(15, 100 - Math.round((completedObjectives / totalObjectives) * 100));

    // Overall Coverage Score
    const overallProgress = Math.round((evidenceExplored * 0.35) + (timelineReconstructed * 0.25) + (connectionsDiscovered * 0.25) + ((100 - openQuestions) * 0.15));

    return {
      evidenceExplored,
      timelineReconstructed,
      connectionsDiscovered,
      openQuestions,
      overallProgress: Math.min(100, Math.max(10, overallProgress)),
      completedObjectivesCount: completedObjectives,
      totalObjectivesCount: totalObjectives
    };
  }, [activeEvidence, activeEvents, inspectedEvidenceIds, inspectedEventIds, pinnedClueIds, activeObjectives]);

  // Investigator Rank based on XP
  const investigatorRank = useMemo(() => {
    if (xp >= 1500) return { title: "Chief Forensic Inquisitor", level: 5, badge: "Master Tier" };
    if (xp >= 1000) return { title: "Senior Forensic Analyst", level: 4, badge: "Tier 4" };
    if (xp >= 600) return { title: "Lead Case Detective", level: 3, badge: "Tier 3" };
    if (xp >= 300) return { title: "Field Investigator", level: 2, badge: "Tier 2" };
    return { title: "Junior Archivist", level: 1, badge: "Probationary" };
  }, [xp]);

  // Actions
  const addXP = (amount) => {
    setXp(prev => prev + amount);
  };

  const inspectEvidence = (item) => {
    setSelectedEvidence(item);
    if (!inspectedEvidenceIds.has(item.id)) {
      setInspectedEvidenceIds(prev => new Set([...prev, item.id]));
      addXP(30);
    }
  };

  const inspectEvent = (event) => {
    setSelectedEvent(event);
    if (!inspectedEventIds.has(event.id)) {
      setInspectedEventIds(prev => new Set([...prev, event.id]));
      addXP(25);
    }
  };

  const inspectPerson = (person) => {
    setSelectedPerson(person);
    if (!inspectedPeopleIds.has(person.id)) {
      setInspectedPeopleIds(prev => new Set([...prev, person.id]));
      addXP(25);
    }
  };

  const togglePinClue = (clueId) => {
    setPinnedClueIds(prev => {
      const next = new Set(prev);
      if (next.has(clueId)) {
        next.delete(clueId);
      } else {
        next.add(clueId);
        addXP(20);
      }
      return next;
    });
  };

  const setClueStatus = (clueId, status) => {
    // status: 'important' | 'interesting' | 'unverified' | 'contradiction' | null
    setClueStatuses(prev => {
      const next = { ...prev };
      if (status === null || next[clueId] === status) {
        delete next[clueId];
      } else {
        next[clueId] = status;
        addXP(15);
      }
      return next;
    });
  };

  const addNote = (text, relatedClueId = null) => {
    if (!text || !text.trim()) return;
    const newNote = {
      id: `NOTE-${Date.now()}`,
      caseId: activeCaseId,
      text: text.trim(),
      createdAt: 'Just now',
      relatedClueId
    };
    setNotes(prev => [newNote, ...prev]);
    addXP(40);
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const createHypothesis = ({ title, theory, supportingEvidenceIds, contradictingEvidenceIds }) => {
    // Calculate evidence coverage based on total active evidence
    const totalEv = activeEvidence.length || 10;
    const supCount = supportingEvidenceIds?.length || 0;
    const contraCount = contradictingEvidenceIds?.length || 0;
    const coverage = Math.min(95, Math.round(((supCount + contraCount) / totalEv) * 100) + 35);

    const newHyp = {
      id: `HYP-${Date.now()}`,
      caseId: activeCaseId,
      title: title || "Working Hypothesis",
      theory: theory || "Investigator hypothesis regarding chronology and evidence links.",
      supportingEvidenceIds: supportingEvidenceIds || [],
      contradictingEvidenceIds: contradictingEvidenceIds || [],
      unresolvedQuestions: [
        "Awaiting corroboration with surviving physical chain of custody.",
        "Timeline consistency requires further spatial transit validation."
      ],
      coverageScore: coverage,
      createdAt: new Date().toISOString(),
      status: "Active Theory"
    };

    setHypotheses(prev => [newHyp, ...prev]);
    addXP(150);

    // AI Partner reactive acknowledgement
    sendAIMessage({
      sender: 'ai',
      text: `I've logged your hypothesis: "${newHyp.title}".\n\nSupporting clues: ${supCount} | Contradicting markers: ${contraCount}. Coverage calculated at ${coverage}%. Would you like me to test for potential counter-evidence?`,
      actions: [
        { label: "Check Timeline Conflicts", type: "check_conflicts" },
        { label: "Understood", type: "dismiss" }
      ]
    });
  };

  const sendAIMessage = (msg) => {
    const fullMsg = {
      id: `MSG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...msg
    };
    setAiMessages(prev => [...prev, fullMsg]);
  };

  const askPartner = (questionText) => {
    if (!questionText || !questionText.trim()) return;

    // Add user message
    const userMsg = {
      id: `MSG-U-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: questionText
    };
    setAiMessages(prev => [...prev, userMsg]);
    setIsAITyping(true);

    setTimeout(() => {
      setIsAITyping(false);
      const answerMatch = aiDialogueResponses[questionText] || aiDialogueResponses['default'];
      sendAIMessage({
        sender: 'ai',
        text: answerMatch.text,
        suggestedClue: answerMatch.suggestedClue,
        actions: answerMatch.suggestedClue ? [
          { label: "Inspect Clue", type: "inspect_clue", target: answerMatch.suggestedClue },
          { label: "Understood", type: "dismiss" }
        ] : undefined
      });
      addXP(15);
    }, 900);
  };

  const requestHint = () => {
    const hints = aiPartnerHints[activeCaseId] || aiPartnerHints['CASE-001'] || [];
    const hint = hints[usedHintIndex % hints.length];
    setUsedHintIndex(prev => prev + 1);

    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      sendAIMessage({
        sender: 'ai',
        isHint: true,
        text: `AI PARTNER HINT\n\nI won't reveal the answer. Here's a direction:\n\n${hint.shortHint}\n\n${hint.detailed}`,
        actions: [
          { label: "Examine Focus Clues", type: "examine_focus", clues: hint.evidenceFocus },
          { label: "Understood", type: "dismiss" }
        ]
      });
      addXP(25);
    }, 700);
  };

  const handlePartnerAction = (action) => {
    if (action.type === 'examine_connection' || action.type === 'inspect_clue') {
      const targetClue = activeEvidence.find(e => e.id === action.target) || activeEvidence[0];
      if (targetClue) {
        inspectEvidence(targetClue);
      }
    } else if (action.type === 'ask_why') {
      askPartner(action.query || "Why is this significant?");
    } else if (action.type === 'examine_focus' && action.clues) {
      const firstTarget = activeEvidence.find(e => action.clues.includes(e.id));
      if (firstTarget) inspectEvidence(firstTarget);
    } else if (action.type === 'check_conflicts') {
      const contraClue = activeEvidence.find(e => e.id === 'E-006');
      if (contraClue) inspectEvidence(contraClue);
    }
  };

  const triggerConnectionAlert = (connectionData) => {
    setConnectionDiscoveryAlert(connectionData);
    addXP(50);
    setTimeout(() => {
      setConnectionDiscoveryAlert(null);
    }, 6000);
  };

  // Simulated AI Investigation Run
  const runSimulatedInvestigation = () => {
    setInvestigationStatus('running');
    setActiveStepIndex(0);
    setAgentLogs([]);
    setInvestigationResult(null);

    let currentStep = 0;
    const accumulatedLogs = [];

    const executeNextStep = () => {
      if (currentStep < simulatedAgentSteps.length) {
        const step = simulatedAgentSteps[currentStep];
        setActiveStepIndex(currentStep);
        accumulatedLogs.push({
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          text: step.log,
          type: step.status === 'warning' ? 'warning' : 'success'
        });
        setAgentLogs([...accumulatedLogs]);

        currentStep++;
        setTimeout(executeNextStep, step.duration);
      } else {
        setInvestigationStatus('completed');
        setActiveStepIndex(simulatedAgentSteps.length);
        setInvestigationResult({
          evidenceAnalyzed: activeEvidence.length || 43,
          eventsAnalyzed: activeEvents.length || 27,
          peopleAnalyzed: activePeople.length || 12,
          inconsistenciesFound: 3,
          unresolvedQuestions: 4,
          confidenceScore: 84,
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedReportId: activeReports[0]?.id || 'REP-001'
        });
        addXP(500);
      }
    };

    setTimeout(executeNextStep, 400);
  };

  const resetInvestigation = () => {
    setInvestigationStatus('idle');
    setActiveStepIndex(-1);
    setAgentLogs([]);
    setInvestigationResult(null);
  };

  // API Endpoints abstraction for future backend integration
  const api = {
    investigate: async (params) => {
      console.log('Future API endpoint: POST /api/agent/investigate', params);
      return { success: true, mode: 'mock' };
    },
    hint: async (params) => {
      console.log('Future API endpoint: POST /api/agent/hint', params);
      return { success: true, mode: 'mock' };
    },
    analyzeEvidence: async (evidenceId) => {
      console.log('Future API endpoint: POST /api/agent/analyze-evidence', evidenceId);
      return { success: true, mode: 'mock' };
    },
    findConnections: async (params) => {
      console.log('Future API endpoint: POST /api/agent/find-connections', params);
      return { success: true, mode: 'mock' };
    },
    analyzeTimeline: async (params) => {
      console.log('Future API endpoint: POST /api/agent/analyze-timeline', params);
      return { success: true, mode: 'mock' };
    },
    testHypothesis: async (hypothesisData) => {
      console.log('Future API endpoint: POST /api/agent/test-hypothesis', hypothesisData);
      return { success: true, mode: 'mock' };
    },
    generateReport: async (caseId) => {
      console.log('Future API endpoint: POST /api/agent/generate-report', caseId);
      return activeReports[0] || mockReports[0];
    }
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        activeCaseId,
        setActiveCaseId,
        activeCase,
        activeEvidence,
        activePeople,
        activeEvents,
        activeReports,
        activeGraph,
        allEvidence: mockEvidence,
        allPeople: mockPeople,
        allEvents: mockEvents,
        allReports: mockReports,
        activities: mockActivities,
        // Game state
        xp,
        investigatorRank,
        addXP,
        inspectedEvidenceIds,
        inspectedEventIds,
        inspectedPeopleIds,
        pinnedClueIds,
        clueStatuses,
        inspectEvidence,
        inspectEvent,
        inspectPerson,
        togglePinClue,
        setClueStatus,
        // Notes
        notes,
        addNote,
        deleteNote,
        // Hypotheses
        hypotheses,
        createHypothesis,
        // Objectives & Progress
        activeObjectives,
        investigationMetrics,
        // AI Partner
        aiMessages,
        isAITyping,
        askPartner,
        requestHint,
        handlePartnerAction,
        isAIPartnerOpen,
        setIsAIPartnerOpen,
        // Modals & Navigation
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isBriefingOpen,
        setIsBriefingOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        selectedEvidence,
        setSelectedEvidence,
        selectedPerson,
        setSelectedPerson,
        selectedEvent,
        setSelectedEvent,
        selectedReport,
        setSelectedReport,
        // Connection Alerts
        connectionDiscoveryAlert,
        triggerConnectionAlert,
        // Agent Runner
        investigationStatus,
        activeStepIndex,
        agentLogs,
        investigationResult,
        runSimulatedInvestigation,
        resetInvestigation,
        simulatedAgentSteps,
        api
      }}
    >
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};
