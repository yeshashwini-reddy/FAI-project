export const aiPartnerHints = {
  "CASE-001": [
    {
      id: "HINT-1",
      topic: "Timeline Gap",
      shortHint: "Look more closely at the timeline between 1:00 AM and 1:45 AM on September 30, 1888.",
      detailed: "Notice the transit time between Berner Street (01:00 AM) and Mitre Square (01:44 AM). A walking distance of 0.82 miles typically requires 12 to 15 minutes. Check PC Watkins' 01:30 AM clear sweep.",
      evidenceFocus: ["E-003", "E-004", "E-007"]
    },
    {
      id: "HINT-2",
      topic: "Pathology vs Witness Conflict",
      shortHint: "Compare Surgeon Dr. Bagster Phillips' temperature evaluation with Mrs. Long's testimony.",
      detailed: "Dr. Phillips estimated time of death at least 2 hours prior to 6:20 AM (before 4:20 AM). However, Elizabeth Long testified she heard the church clock strike 5:30 AM while seeing the pair. This is an unreconciled temporal contradiction.",
      evidenceFocus: ["E-001", "E-006"]
    },
    {
      id: "HINT-3",
      topic: "Document Authenticity",
      shortHint: "Examine the origin and postmark of the 'Dear Boss' letter against police memoranda.",
      detailed: "Notice that Special Branch memoranda later named journalist Thomas Bulling as suspected author. Modern graphology and ink spectroscopy confirm period ink, but indicate journalistic fabrication.",
      evidenceFocus: ["E-002"]
    }
  ]
};

export const aiPartnerInitialMessages = [
  {
    id: "MSG-1",
    sender: "ai",
    timestamp: "Just now",
    text: "I've reviewed the archival files and indexed the primary evidence items. I noticed something you may want to examine:\n\nEvidence #E-004 (PC Watkins' timed sweep) and Event #EV-009 (Mitre Square discovery) constrain the window to exactly 14 minutes.",
    actions: [
      { label: "Examine Connection", type: "examine_connection", target: "E-004" },
      { label: "Ask Why", type: "ask_why", query: "Why is the 14-minute window significant?" },
      { label: "Ignore", type: "dismiss" }
    ]
  }
];

export const aiDialogueResponses = {
  "Why is the 14-minute window significant?": {
    text: "At 1:30 AM, PC Watkins patrolled Mitre Square with a lighted lantern and found it completely empty. At 1:44 AM, he returned and found the scene. This proves the entire event occurred in under 14 minutes in a quiet square without alerting nearby night watchmen.",
    suggestedClue: "E-004"
  },
  "What is the contradiction in Hanbury Street?": {
    text: "Surgeon Dr. Bagster Phillips placed the time of death before 4:30 AM based on body temperature and early rigor mortis. However, witness Elizabeth Long testified under oath that she saw the victim standing outside at 5:30 AM as the Spitalfields church clock chimed.",
    suggestedClue: "E-006"
  },
  "Tell me about the Goulston Street apron": {
    text: "PC Alfred Long patrolled the Wentworth Dwellings archway at 2:20 AM and it was clear. At 2:55 AM he found the blood-stained apron piece below chalk writing. This indicates the cloth was deposited between 2:20 and 2:55 AM, over 35 minutes after Mitre Square.",
    suggestedClue: "E-005"
  },
  "default": {
    text: "I've cross-referenced your query across the archival database. Reviewing your pinned evidence and timeline markers will help isolate additional leads.",
    suggestedClue: null
  }
};
