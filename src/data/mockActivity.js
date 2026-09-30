export const mockActivities = [
  {
    id: "ACT-001",
    timestamp: "10:42 AM",
    timeAgo: "12 minutes ago",
    title: "Evidence document added",
    details: "Metropolitan Police Official Inquest Transcript (E-001) linked to Case #001",
    type: "evidence",
    caseId: "CASE-001",
    caseTitle: "The Whitechapel Investigation",
    user: "Investigator Matrix"
  },
  {
    id: "ACT-002",
    timestamp: "09:31 AM",
    timeAgo: "1 hour ago",
    title: "Timeline updated",
    details: "New timestamp conflict flagged between Dr. Phillips Exam (06:20 AM) and Mrs. Long Sighting (05:30 AM)",
    type: "timeline",
    caseId: "CASE-001",
    caseTitle: "The Whitechapel Investigation",
    user: "AI Timeline Engine"
  },
  {
    id: "ACT-003",
    timestamp: "Yesterday, 4:15 PM",
    timeAgo: "Yesterday",
    title: "New person profile indexed",
    details: "Louis Diemschutz (Club Steward) connected to Dutfield's Yard Event (EV-007)",
    type: "person",
    caseId: "CASE-001",
    caseTitle: "The Whitechapel Investigation",
    user: "Archivist Unit"
  },
  {
    id: "ACT-004",
    timestamp: "Yesterday, 2:00 PM",
    timeAgo: "Yesterday",
    title: "Investigation report generated",
    details: "IR-1888-09-V3 compiled with 43 evidence items and 27 reconstructed events",
    type: "report",
    caseId: "CASE-001",
    caseTitle: "The Whitechapel Investigation",
    user: "Agent Core"
  },
  {
    id: "ACT-005",
    timestamp: "Sep 28, 2026",
    timeAgo: "2 days ago",
    title: "Relationship graph recalculated",
    details: "Spatial proximity edge established between Mitre Square (LOC-02) and Wentworth Dwellings (LOC-03)",
    type: "graph",
    caseId: "CASE-001",
    caseTitle: "The Whitechapel Investigation",
    user: "GIS Engine"
  }
];

export const simulatedAgentSteps = [
  {
    id: "step-1",
    title: "Loading Case Repository & Indexing Core Entities",
    detail: "Ingesting 43 evidence files, 27 chronological events, and 12 registered deponents...",
    duration: 1200,
    status: "done",
    icon: "database",
    log: "✓ Case CASE-001 initialized. 43 evidence items verified in local cryptographic hash store."
  },
  {
    id: "step-2",
    title: "Parsing Archival Transcripts & Corroboration Matrix",
    detail: "Cross-referencing witness testimony against coroner depositions and patrol logs...",
    duration: 1600,
    status: "done",
    icon: "file-text",
    log: "✓ 18 official documents parsed. 24 cross-references established with high confidence."
  },
  {
    id: "step-3",
    title: "Reconstructing Temporal Constraints & Beat Timings",
    detail: "Calculating geographic transit feasibility between Berner Street, Mitre Square, and Goulston Street...",
    duration: 1800,
    status: "done",
    icon: "clock",
    log: "✓ 27 events aligned on UTC timeline. 14-minute Mitre Square execution constraint validated."
  },
  {
    id: "step-4",
    title: "Executing Contradiction & Anomaly Detection Algorithm",
    detail: "Evaluating pathology cooling curves against lay witness clock chimes...",
    duration: 2000,
    status: "warning",
    icon: "alert-triangle",
    log: "⚠ Potential inconsistency detected: Dr. Phillips time-of-death (pre-04:30 AM) conflicts with Elizabeth Long testimony (05:30 AM)."
  },
  {
    id: "step-5",
    title: "Synthesizing Entity Relationship Graph & Cluster Weights",
    detail: "Mapping 20 bidirectional relationship edges across 14 spatial and human nodes...",
    duration: 1400,
    status: "done",
    icon: "git-branch",
    log: "✓ 12 people connected across 4 distinct spatial clusters."
  },
  {
    id: "step-6",
    title: "Generating Multi-Source Forensic Investigation Synthesis",
    detail: "Compiling executive summary, timeline findings, and neutral evidentiary balance...",
    duration: 1500,
    status: "done",
    icon: "cpu",
    log: "🧠 Investigation Report IR-1888-09-V3 generated successfully."
  }
];
