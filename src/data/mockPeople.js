export const mockPeople = [
  // CASE-001 People
  {
    id: "P-001",
    caseId: "CASE-001",
    name: "Inspector Frederick George Abberline",
    category: "Investigator",
    role: "Lead Metropolitan Police CID Detective",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    status: "Primary Investigator (Historical)",
    summary: "Veteran detective inspector of Scotland Yard dispatched to Whitechapel in 1888 due to extensive local knowledge of the East End division. Led door-to-door inquiries across thousands of boarding houses and butcher establishments.",
    knownInformation: "Promoted to Detective Inspector in 1878. Maintained meticulous notes questioning the reliability of press correspondence letters and favored focused geographic surveillance over wide-net roundups.",
    evidenceLinked: 8,
    eventsLinked: 11,
    relationships: [
      { personId: "P-002", relation: "Subordinate to / Direct Reports from", type: "Colleague" },
      { personId: "P-006", relation: "Consulting Medical Examiner", type: "Professional" },
      { personId: "P-003", relation: "Interrogated regarding press leaks", type: "Investigative" }
    ],
    relatedEvidenceIds: ["E-001", "E-003", "E-004", "E-005"],
    relatedEventIds: ["EV-001", "EV-005", "EV-009", "EV-012"]
  },
  {
    id: "P-002",
    caseId: "CASE-001",
    name: "Sir Charles Warren",
    category: "Official",
    role: "Commissioner of the Metropolitan Police",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    status: "Command Staff (Historical)",
    summary: "Commissioner of Police of the Metropolis during 1888. Military background with previous archeological survey experience in Jerusalem. Controversially ordered the immediate erasure of the Goulston Street chalk inscription before daylight.",
    knownInformation: "Faced severe friction with the Home Office (Secretary Henry Matthews) and resigned on November 8, 1888, following public criticism of policing policies in the East End.",
    evidenceLinked: 5,
    eventsLinked: 6,
    relationships: [
      { personId: "P-001", relation: "Commanding Officer over CID", type: "Hierarchy" },
      { personId: "P-011", relation: "Recipient of citizen petitions from", type: "Institutional" }
    ],
    relatedEvidenceIds: ["E-002", "E-005"],
    relatedEventIds: ["EV-011", "EV-013"]
  },
  {
    id: "P-003",
    caseId: "CASE-001",
    name: "Thomas J. Bulling (Journalist)",
    category: "Person of Interest",
    role: "Central News Agency Staff Reporter",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    status: "Historical Press Figure (Suspected Letter Author)",
    summary: "Reporter employed at the Central News Agency who transmitted the 'Dear Boss' letter to Scotland Yard on 29 September 1888. Chief Inspector Littlechild later named Bulling in confidential memos as suspected author of hoax letters.",
    knownInformation: "Contemporary CID memorandums authored by Special Branch Chief John Littlechild in 1913 stated that Bulling had concocted early letters to stimulate newspaper circulation.",
    evidenceLinked: 6,
    eventsLinked: 4,
    relationships: [
      { personId: "P-001", relation: "Subject of journalistic inquiry by", type: "Investigative" }
    ],
    relatedEvidenceIds: ["E-002", "E-008"],
    relatedEventIds: ["EV-006", "EV-008"]
  },
  {
    id: "P-004",
    caseId: "CASE-001",
    name: "Wynne Edwin Baxter",
    category: "Official",
    role: "HM Coroner for North East Middlesex",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    status: "Judicial / Inquest Presider",
    summary: "Conducted the coroner's inquests for Annie Chapman, Polly Nichols, and later victims in Middlesex. Famous for thorough cross-examination of medical witnesses and exploring anatomical skill theories.",
    knownInformation: "Solicitor and legal scholar who demanded detailed deposition records and challenged discrepancies between lay witness clocks and surgical post-mortem cooling rates.",
    evidenceLinked: 7,
    eventsLinked: 5,
    relationships: [
      { personId: "P-006", relation: "Presided over medical testimony of", type: "Judicial" },
      { personId: "P-001", relation: "Reviewed police reports from", type: "Judicial" }
    ],
    relatedEvidenceIds: ["E-001", "E-006"],
    relatedEventIds: ["EV-002", "EV-005"]
  },
  {
    id: "P-005",
    caseId: "CASE-001",
    name: "Elizabeth Long (Witness)",
    category: "Witness",
    role: "Resident & Eyewitness Deponent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    status: "Eyewitness (Historical Deposition)",
    summary: "Resident of Church Street, Spitalfields. Testified under oath at Coroner Baxter's inquest that she walked down Hanbury Street at 5:30 AM on 8 September and observed a man and woman conversing outside 29 Hanbury Street.",
    knownInformation: "Stated the Spitalfields Church clock chimed half-past five as she turned the corner. Her timing created the famous 1-hour contradiction with Dr. Phillips' physical temperature examination.",
    evidenceLinked: 4,
    eventsLinked: 3,
    relationships: [
      { personId: "P-004", relation: "Sworn deponent before", type: "Legal" },
      { personId: "P-006", relation: "Contradicted by medical timeline of", type: "Timeline Conflict" }
    ],
    relatedEvidenceIds: ["E-001", "E-006"],
    relatedEventIds: ["EV-003", "EV-004"]
  },
  {
    id: "P-006",
    caseId: "CASE-001",
    name: "Dr. George Bagster Phillips",
    category: "Expert",
    role: "Police Divisional Surgeon (H Division)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    status: "Forensic Medical Examiner",
    summary: "Surgeon to the H Division of Police for over 23 years. Conducted autopsies and physical scene examinations at Hanbury Street and Miller's Court.",
    knownInformation: "Noted precise surgical removal of specific organs in Hanbury Street and determined that the perpetrator possessed practical anatomical knowledge, challenging arbitrary amateur mutilation claims.",
    evidenceLinked: 9,
    eventsLinked: 7,
    relationships: [
      { personId: "P-001", relation: "Chief forensic consultant to", type: "Professional" },
      { personId: "P-005", relation: "Conflicted in timeline with", type: "Timeline Conflict" }
    ],
    relatedEvidenceIds: ["E-001", "E-006"],
    relatedEventIds: ["EV-004", "EV-005"]
  },
  {
    id: "P-007",
    caseId: "CASE-001",
    name: "PC Edward Watkins (PC 881)",
    category: "Investigator",
    role: "City of London Police Constable",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    status: "First Responding Officer (Mitre Square)",
    summary: "Patrol officer in the City of London Police who conducted the timed sweep through Mitre Square at 1:30 AM (clear) and 1:44 AM (discovery).",
    knownInformation: "Established the critical 14-minute timing constraint in City jurisdiction, leading to swift mobilization of City CID under Detective Inspector James McWilliam.",
    evidenceLinked: 6,
    eventsLinked: 4,
    relationships: [
      { personId: "P-008", relation: "Summoned to scene by", type: "Colleague" }
    ],
    relatedEvidenceIds: ["E-004", "E-005"],
    relatedEventIds: ["EV-008", "EV-009"]
  },
  {
    id: "P-008",
    caseId: "CASE-001",
    name: "PC Alfred Long (PC 254A)",
    category: "Investigator",
    role: "Metropolitan Police Constable (A Division)",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    status: "Discovering Officer (Goulston St Cloth)",
    summary: "Constable deployed to Whitechapel on special night patrol. Discovered the stained apron piece in the Wentworth Model Dwellings archway at 02:55 AM on 30 September 1888.",
    knownInformation: "Confirmed he had patrolled the same stairwell at 02:20 AM and the apron piece was not present, narrowing deposit time between 02:20 AM and 02:55 AM.",
    evidenceLinked: 5,
    eventsLinked: 3,
    relationships: [
      { personId: "P-002", relation: "Reported discovery through chain to", type: "Hierarchy" }
    ],
    relatedEvidenceIds: ["E-005"],
    relatedEventIds: ["EV-010", "EV-011"]
  },
  {
    id: "P-009",
    caseId: "CASE-001",
    name: "Louis Diemschutz",
    category: "Witness",
    role: "Club Steward & Costermonger",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    status: "First Discoverer (Berner St / Dutfield's Yard)",
    summary: "Steward of the International Working Men's Educational Club at 40 Berner Street. Discovered victim in Dutfield's Yard when his horse shied at 01:00 AM.",
    knownInformation: "Testified that the yard was pitch black and his cart wheel barely missed the victim. Believed perpetrator may have fled into the street or yard shadows upon hearing his cart approach.",
    evidenceLinked: 4,
    eventsLinked: 3,
    relationships: [
      { personId: "P-001", relation: "Deposed before detectives of", type: "Investigative" }
    ],
    relatedEvidenceIds: ["E-007"],
    relatedEventIds: ["EV-007", "EV-008"]
  },
  {
    id: "P-011",
    caseId: "CASE-001",
    name: "George Lusk",
    category: "Official",
    role: "Chairman of Whitechapel Vigilance Committee",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    status: "Civic Leader / Vigilance Committee",
    summary: "Local builder and vestryman elected head of the Whitechapel Vigilance Committee in September 1888 by local tradesmen dissatisfied with police progress.",
    knownInformation: "Received the 'From Hell' package on 16 October 1888. Hired private detectives Le Grand and Batchelor to conduct independent nightly patrols in Spitalfields.",
    evidenceLinked: 6,
    eventsLinked: 4,
    relationships: [
      { personId: "P-002", relation: "Challenged police leadership of", type: "Adversarial / Civic" }
    ],
    relatedEvidenceIds: ["E-008"],
    relatedEventIds: ["EV-014"]
  },

  // CASE-002 People
  {
    id: "P-201",
    caseId: "CASE-002",
    name: "Dr. Karen Chen",
    category: "Person of Interest",
    role: "Lead Optical Hardware Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    status: "Employee / Credential Compromised",
    summary: "Senior photonics researcher with top-level security clearance. Primary holder of cryptographic token used during 03:14 AM breach.",
    knownInformation: "Cellular data confirms phone was active 14km away at residence during badge swipe. Digital twin cloned token suspected.",
    evidenceLinked: 4,
    eventsLinked: 3,
    relationships: [],
    relatedEvidenceIds: ["E-101", "E-102"],
    relatedEventIds: ["EV-201", "EV-202"]
  },

  // CASE-003 People
  {
    id: "P-301",
    caseId: "CASE-003",
    name: "Vincenzo Peruggia",
    category: "Person of Interest",
    role: "Louvre Glazing Contractor & Decorator",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    status: "Historical Suspect (1911)",
    summary: "Italian craftsman employed to fit protective glass on masterworks. Possessed knowledge of staff uniforms, closing schedules, and exit stairwells.",
    knownInformation: "Concealed himself inside a broom closet on Sunday night, August 20, 1911, and exited through the Quai des Tuileries portal at 7:30 AM Monday.",
    evidenceLinked: 3,
    eventsLinked: 2,
    relationships: [],
    relatedEvidenceIds: ["E-201"],
    relatedEventIds: ["EV-301"]
  }
];
