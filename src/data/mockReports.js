export const mockReports = [
  {
    id: "REP-001",
    caseId: "CASE-001",
    caseTitle: "The Whitechapel Investigation",
    reportNumber: "IR-1888-09-V3",
    title: "Comprehensive Multi-Source Archival & Timeline Reconciliation",
    generatedDate: "2026-09-29",
    status: "Completed",
    classification: "Forensic Archival Audit",
    evidenceAnalyzed: 43,
    eventsAnalyzed: 27,
    peopleAnalyzed: 12,
    inconsistenciesFound: 3,
    unresolvedQuestions: 5,
    confidenceScore: 84,
    summary: "Synthesis of 43 historical evidence records, 27 chronological occurrences, and 12 sworn deponent profiles. Highlights specific temporal paradoxes between post-mortem medical estimates and lay witness clock chimes without asserting uncorroborated conclusions.",
    
    sections: {
      caseOverview: {
        title: "1. Case Overview & Scope of Audit",
        content: "This report evaluates archival deposition records and forensic transcripts collected across the Whitechapel and City of London jurisdictions during the autumn of 1888. The objective of this automated investigation audit is to verify timestamp alignment, assess chain-of-custody documentation, and isolate demonstrable contradictions in sworn testimonies without generating speculative historical accusations."
      },
      evidenceAnalysis: {
        title: "2. Evidence Authenticity & Provenance",
        items: [
          {
            code: "E-001",
            name: "Coroner Baxter Inquest Depositions",
            assessment: "High evidential integrity. Cross-checked with Middlesex Sessions records. Provides primary chronological anchor."
          },
          {
            code: "E-002",
            name: "Central News Agency Correspondence ('Dear Boss')",
            assessment: "Low evidential reliability regarding author identity. Multispectral analysis confirms 1888 ink formulation, but Special Branch memorandums indicate strong probability of journalistic contrivance."
          },
          {
            code: "E-005",
            name: "Goulston Street Calico Apron Fragment",
            assessment: "Critical spatial marker. Physical fiber matching links fragment to Mitre Square scene with high certainty. Deposit interval established between 02:20 AM and 02:55 AM."
          },
          {
            code: "E-008",
            name: "'From Hell' Package (George Lusk)",
            assessment: "Unresolved provenance. Incomplete biological chain of custody prevents definitive evidentiary attribution under modern forensic standards."
          }
        ]
      },
      timelineAnalysis: {
        title: "3. Timeline Reconstruction & Temporal Constraints",
        findings: [
          "Rigid 14-Minute Window (Mitre Square): City PC Edward Watkins' clear sweep at 01:30 AM and subsequent return at 01:44 AM establishes that the Mitre Square incident occurred entirely within a strictly bounded 14-minute interval.",
          "Spatial Transit Feasibility: The walking distance between Berner Street (01:00 AM) and Mitre Square (01:44 AM) is 0.82 miles, which requires an unobstructed walking time of 12 to 15 minutes via Commercial Road and Aldgate.",
          "Post-Mitre Square Latency: The apron deposit at Wentworth Dwellings occurred at least 36 minutes after Mitre Square, indicating that the individual did not immediately exit the metropolitan perimeter."
        ]
      },
      contradictions: {
        title: "4. Identified Contradictions & Irregularities",
        items: [
          {
            id: "C-01",
            title: "Hanbury Street Post-Mortem vs. Eyewitness Timing Discrepancy",
            description: "Surgeon Dr. George Bagster Phillips concluded from body temperature and rigor mortis that death occurred prior to 04:30 AM. Conversely, resident Elizabeth Long testified she observed the victim alive conversing outside 29 Hanbury Street at 05:30 AM as church bells chimed.",
            status: "Unreconciled Temporal Conflict",
            impact: "High"
          },
          {
            id: "C-02",
            title: "Goulston Street Chalk Inscription Chronology",
            description: "PC Long reported the archway clear at 02:20 AM and discovered both the cloth and inscription at 02:55 AM. Detective Halse stated the chalk was fresh; however, local residents reported chalk graffiti was frequently present on that housing estate entrance.",
            status: "Evidence Context Ambiguity",
            impact: "Medium"
          },
          {
            id: "C-03",
            title: "Discrepancy in Dr. Openshaw's Pathological Statements",
            description: "Newspaper interviews attributed definitive anatomical claims to Dr. Openshaw regarding the biological specimen, which were subsequently denied in his official statement to City Police detectives.",
            status: "Press vs. Official Record Discrepancy",
            impact: "Low"
          }
        ]
      },
      unresolvedQuestions: {
        title: "5. Unresolved Investigative Questions",
        questions: [
          "Did the individual responsible for the Mitre Square incident possess specialized geographic familiarity with interior City boundary passageways?",
          "Was the chalk inscription on Wentworth Dwellings directly affiliated with the deposited cloth or coincidental preexisting graffiti?",
          "What specific route was utilized between 01:45 AM (Mitre Square) and 02:20 AM prior to the cloth deposit at Goulston Street?",
          "Could cold morning ambient temperatures (approx 44°F) have accelerated the post-mortem cooling rate observed by Dr. Phillips?",
          "Can surviving archival envelope fibers undergo modern non-destructive mass spectrometry?"
        ]
      },
      conclusion: {
        title: "6. Summary & Investigative Recommendation",
        content: "The available historical records and digitized depositions establish tight geographic clusters and precise patrol constraints. However, because contemporary records lack uniform forensic preservation protocols and contain unreconciled witness-versus-pathology time divergences, the available evidence does not establish the singular identity of the individual responsible. Future research should prioritize non-destructive chemical spectroscopy on surviving sealed archival records and rigorous spatial analysis of 1888 railway freight night shifts."
      }
    }
  },
  {
    id: "REP-002",
    caseId: "CASE-002",
    caseTitle: "The Missing Prototype",
    reportNumber: "IR-2025-11-SOC",
    title: "Quantum Hardware Exfiltration Incident Response Audit",
    generatedDate: "2026-09-18",
    status: "Completed",
    classification: "Confidential Corporate Forensic",
    evidenceAnalyzed: 31,
    eventsAnalyzed: 19,
    peopleAnalyzed: 8,
    inconsistenciesFound: 4,
    unresolvedQuestions: 3,
    confidenceScore: 91,
    summary: "Investigation into Chamber B-04 cryptographic access logs and 1550nm optical bench spectrum drops. Pinpoints 03:14 AM badge credential replay and unauthorized physical decoupling.",
    sections: {
      caseOverview: {
        title: "1. Incident Summary",
        content: "Forensic reconstruction of hardware exfiltration at the Zurich photonics facility. Combines biometric audit logs, cellular triangulation, and RF spectrum analyzer captures."
      },
      evidenceAnalysis: {
        title: "2. Key Telemetry",
        items: [
          { code: "E-101", name: "RFID & Biometric Log", assessment: "Cryptographic replay confirmed." },
          { code: "E-102", name: "Spectrum Analyzer Calibration", assessment: "Live uncooled disconnect logged at 03:18:04 CET." }
        ]
      },
      conclusion: {
        title: "3. Remediation Finding",
        content: "Evidence indicates badge cloning via intermediate NFC proxy. Digital forensics rules out direct physical presence of Dr. Chen."
      }
    }
  }
];
