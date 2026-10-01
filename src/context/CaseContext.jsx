import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockCases } from '../data/mockCases';
import { mockEvidence } from '../data/mockEvidence';
import { mockPeople } from '../data/mockPeople';
import { mockEvents } from '../data/mockEvents';
import { mockReports } from '../data/mockReports';
import { mockActivities, simulatedAgentSteps } from '../data/mockActivity';
import { mockGraphData } from '../data/mockRelationships';

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [cases] = useState(mockCases);
  const [activeCaseId, setActiveCaseId] = useState('CASE-001');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isSolveModalOpen, setIsSolveModalOpen] = useState(false);

  // Progressive Hint System State
  const [hintsUsedMap, setHintsUsedMap] = useState({});

  const incrementHint = (caseId) => {
    setHintsUsedMap(prev => ({
      ...prev,
      [caseId]: Math.min((prev[caseId] || 0) + 1, 3)
    }));
  };

  // Case Submissions & User Solution Verification
  const [userSubmissions, setUserSubmissions] = useState({});
  const [reportsList, setReportsList] = useState(mockReports);

  const submitCaseSolution = ({ caseId, suspectId, suspectName, theoryText, evidenceReasoning }) => {
    const targetCase = cases.find(c => c.id === caseId) || activeCase;
    const officialCulpritId = targetCase.officialCulpritId;
    const officialCulpritName = targetCase.officialCulpritName;
    const officialSolution = targetCase.officialSolution;

    const isCorrect = 
      (officialCulpritId && suspectId === officialCulpritId) ||
      (officialCulpritName && suspectName.toLowerCase().includes(officialCulpritName.toLowerCase())) ||
      (officialCulpritName && officialCulpritName.toLowerCase().includes(suspectName.toLowerCase()));

    const result = {
      caseId,
      userSuspect: suspectName,
      officialCulprit: officialCulpritName || 'Official Case Finding',
      isCorrect,
      theoryText,
      evidenceReasoning,
      officialSolution,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setUserSubmissions(prev => ({
      ...prev,
      [caseId]: result
    }));

    // Generate a detective report into reports list
    const newReport = {
      id: `REP-DET-${Date.now()}`,
      caseId: targetCase.id,
      caseTitle: targetCase.title,
      reportNumber: `DET-SOLVE-${targetCase.id}`,
      title: `Detective Solution Report: ${targetCase.title}`,
      generatedDate: new Date().toISOString().split('T')[0],
      status: isCorrect ? 'Case Solved' : 'Unmatched Theory',
      classification: 'Human Detective Submission',
      evidenceAnalyzed: activeEvidence.length,
      eventsAnalyzed: activeEvents.length,
      peopleAnalyzed: activePeople.length,
      inconsistenciesFound: targetCase.inconsistenciesCount || 3,
      unresolvedQuestions: targetCase.unresolvedCount || 2,
      confidenceScore: isCorrect ? 100 : 45,
      summary: `Detective Submission for ${targetCase.title}. User identified suspect "${suspectName}". Outcome: ${isCorrect ? 'Correct Case Solution' : 'Unmatched Theory'}.`,
      sections: {
        caseOverview: {
          title: "1. Human Detective Theory",
          content: `Suspect Chosen: ${suspectName}\n\nTheory: ${theoryText || 'N/A'}\n\nEvidence Cited: ${evidenceReasoning || 'N/A'}`
        },
        evidenceAnalysis: {
          title: "2. Official Solution Breakdown",
          items: [
            { code: "SOLUTION", name: officialCulpritName, assessment: officialSolution?.summary || 'Official finding' }
          ]
        },
        conclusion: {
          title: "3. Verdict & Explanation",
          content: officialSolution?.fullExplanation || 'Case review complete.'
        }
      }
    };

    setReportsList(prev => [newReport, ...prev]);

    return result;
  };

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
    return reportsList.filter(r => r.caseId === activeCaseId);
  }, [reportsList, activeCaseId]);

  const activeGraph = useMemo(() => {
    return mockGraphData[activeCaseId] || mockGraphData['CASE-001'];
  }, [activeCaseId]);

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
          unresolvedQuestions: 5,
          confidenceScore: 84,
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedReportId: activeReports[0]?.id || 'REP-001'
        });
      }
    };

    setTimeout(executeNextStep, 500);
  };

  const resetInvestigation = () => {
    setInvestigationStatus('idle');
    setActiveStepIndex(-1);
    setAgentLogs([]);
    setInvestigationResult(null);
  };

  // Future API Placeholder Endpoints (ready for backend integration)
  const api = {
    investigate: async (params) => {
      console.log('Future API endpoint: POST /api/investigate', params);
      return { success: true, mode: 'mock' };
    },
    searchEvidence: async (query) => {
      console.log('Future API endpoint: POST /api/evidence/search', query);
      return mockEvidence.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));
    },
    analyzeTimeline: async (params) => {
      console.log('Future API endpoint: POST /api/timeline/analyze', params);
      return { success: true, mode: 'mock' };
    },
    testHypothesis: async (params) => {
      console.log('Future API endpoint: POST /api/hypothesis/test', params);
      return { success: true, mode: 'mock' };
    },
    generateReport: async (params) => {
      console.log('Future API endpoint: POST /api/report/generate', params);
      return mockReports[0];
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
        allReports: reportsList,
        activities: mockActivities,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        selectedEvidence,
        setSelectedEvidence,
        selectedPerson,
        setSelectedPerson,
        selectedEvent,
        setSelectedEvent,
        selectedReport,
        setSelectedReport,
        // Solution & Hint System
        isSolveModalOpen,
        setIsSolveModalOpen,
        hintsUsedMap,
        incrementHint,
        userSubmissions,
        submitCaseSolution,
        // Investigation State
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
