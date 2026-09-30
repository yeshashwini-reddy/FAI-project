export const mockEvidence = [
  // CASE-001 Evidence Items
  {
    id: "E-001",
    caseId: "CASE-001",
    code: "EVD-1888-001",
    title: "Metropolitan Police Official Inquest Transcript",
    type: "Document",
    category: "Documents",
    source: "London Metropolitan Police Historical Archive (MEPO 3/140)",
    date: "1888-09-02",
    dateAdded: "12 Aug 2026",
    status: "Verified Authentic",
    confidentiality: "Public Archival",
    description: "Official verbatim transcript of the coroner's inquest conducted by Wynne Baxter at the Working Lads' Institute, Whitechapel Road. Contains initial sworn statements of constables and medical examiner Dr. Rees Llewellyn regarding time of discovery and environmental conditions.",
    summary: "Records ambient temperature (approx 44°F) and notes absence of bloodstains on adjacent wooden fence palings, establishing precise baseline for forensic timeline reconstruction.",
    relatedPeople: ["P-001", "P-004", "P-006"],
    relatedEvents: ["EV-001", "EV-002"],
    chainOfCustody: [
      { date: "1888-09-02", action: "Transcribed by Clerk of Arraigns", agent: "Coroner's Office" },
      { date: "1972-04-15", action: "Transferred to National Archives Kew", agent: "UK Home Office" },
      { date: "2026-08-12", action: "High-resolution multispectral scan indexed", agent: "Mystery Solver Digitize Unit" }
    ],
    metadata: {
      pages: 14,
      classification: "Inquest Deposition",
      condition: "Slight foxing, fully legible",
      physicalLocation: "Kew Archives Box 49B"
    },
    keyFindings: [
      "No sound of struggle reported by occupants of 29 Hanbury Street",
      "Medical estimation of time of death conflicts by 30 minutes with witness testimony of John Davis",
      "Street lighting was partially obstructed by ongoing gas main repairs"
    ],
    contradictions: ["Discrepancy with Mrs. Long's testimony regarding church clock chime at 5:30 AM"]
  },
  {
    id: "E-002",
    caseId: "CASE-001",
    code: "EVD-1888-002",
    title: "Handwritten 'Dear Boss' Letter & Envelope",
    type: "Document",
    category: "Documents",
    source: "Central News Agency / Scotland Yard File",
    date: "1888-09-27",
    dateAdded: "14 Aug 2026",
    status: "Debated Authenticity / Potential Hoax",
    confidentiality: "Public Archival",
    description: "Red-ink handwritten correspondence received by the Central News Agency on September 27, 1888. Postmarked 'London E.C.', forwarded to Scotland Yard on September 29. Origin of the moniker widely popularized by contemporary press.",
    summary: "Forensic graphology analysis and ink spectrum analysis indicate composition consistent with Victorian commercial iron gall red ink, though contemporary police memos suspect journalist fabrication.",
    relatedPeople: ["P-003", "P-005"],
    relatedEvents: ["EV-006", "EV-008"],
    chainOfCustody: [
      { date: "1888-09-29", action: "Forwarded to Commissioner Sir Charles Warren", agent: "Central News Agency" },
      { date: "1987-10-01", action: "Returned to Metropolitan Police Heritage Centre", agent: "Met Police Museum" },
      { date: "2026-08-14", action: "Multispectral ink spectroscopy ingested", agent: "Mystery Solver AI Lab" }
    ],
    metadata: {
      pages: 2,
      classification: "Anonymous Correspondence",
      inkType: "Iron Gall Red / Gum Arabic binder",
      postmark: "LONDON E.C. - 27 SP 88"
    },
    keyFindings: [
      "Mentions specific terminology later duplicated in 'Saucy Jacky' postcard",
      "Distinctive forward-slanting cursive with non-standard ligature pairings",
      "Inspector Littlechild suspected journalistic fabrication by local newsroom staff"
    ],
    contradictions: ["Postmark timestamp precedes public release of certain crime details by only 4 hours"]
  },
  {
    id: "E-003",
    caseId: "CASE-001",
    code: "EVD-1888-003",
    title: "High-Resolution Survey Map of Whitechapel & Spitalfields (1888)",
    type: "Image",
    category: "Images",
    source: "Ordnance Survey 1:2500 Detailed London Map Series",
    date: "1888-07-15",
    dateAdded: "15 Aug 2026",
    status: "Verified Authentic",
    confidentiality: "Public Domain",
    description: "Comprehensive cadastral street and alleyway survey map illustrating narrow passageways, gas lamp placements, night-watch beats, and pedestrian thoroughfares between Commercial Street, Hanbury Street, and Mitre Square.",
    summary: "Geospatial coordinate mapping demonstrates that walking transit time between Buck's Row and Dutfield's Yard was under 11 minutes via narrow cobblestone passages avoiding major thoroughfares.",
    relatedPeople: ["P-001", "P-002", "P-007"],
    relatedEvents: ["EV-001", "EV-007", "EV-010"],
    chainOfCustody: [
      { date: "1888-07-15", action: "Published by Ordnance Survey Southampton", agent: "Ordnance Survey" },
      { date: "2026-08-15", action: "Georectified and layered into investigation engine", agent: "Mystery Solver GIS" }
    ],
    metadata: {
      resolution: "12400 x 8600 px (600 DPI)",
      scale: "1:2500",
      coverage: "Stepney, Spitalfields, Aldgate, Minories"
    },
    keyFindings: [
      "Multiple unlit covered alleys existed behind commercial butcher stalls",
      "Police patrol beats operated on strict 15-minute fixed intervals",
      "Night rail freight yards provided potential egress routes unnoticed by street sentries"
    ],
    contradictions: []
  },
  {
    id: "E-004",
    caseId: "CASE-001",
    code: "EVD-1888-004",
    title: "Sworn Eyewitness Deposition of Constable Edward Watkins (PC 881)",
    type: "Statement",
    category: "Statements",
    source: "City of London Police Archival Inquest Records",
    date: "1888-09-30",
    dateAdded: "16 Aug 2026",
    status: "Verified Authentic",
    confidentiality: "Public Archival",
    description: "Sworn testimony of PC 881 Edward Watkins detailing his patrol pass through Mitre Square at exactly 1:30 AM (clear) and subsequent return at 1:44 AM (discovery of Catherine Eddowes), establishing a narrow 14-minute execution window.",
    summary: "Confirms that the square was entirely deserted and silent at 1:30 AM with lantern illumination functioning properly at the southwestern corner.",
    relatedPeople: ["P-001", "P-007", "P-008"],
    relatedEvents: ["EV-008", "EV-009"],
    chainOfCustody: [
      { date: "1888-10-04", action: "Submitted at Coroner Langham's Inquest", agent: "City of London Coroner" },
      { date: "2026-08-16", action: "Digitized from Guildhall Library holdings", agent: "Mystery Solver Ingest" }
    ],
    metadata: {
      badgeNumber: "PC 881 City",
      interviewLocation: "Bishopsgate Police Station",
      corroboratingOfficer: "PC James Harvey (PC 964)"
    },
    keyFindings: [
      "Rigid 14-minute window between 01:30 and 01:44 on 30 September 1888",
      "No footsteps or fleeing persons seen along Mitre Street or Church Passage",
      "PC Harvey passed Church Passage around 01:40 without entering the square"
    ],
    contradictions: ["Witness Joseph Lawende saw man and woman talking at Church Passage entrance at 01:35 AM"]
  },
  {
    id: "E-005",
    caseId: "CASE-001",
    code: "EVD-1888-005",
    title: "Goulston Street Apron Fragment & Wall Inscription Transcript",
    type: "Record",
    category: "Records",
    source: "Metropolitan Police Criminal Investigation Department Record",
    date: "1888-09-30",
    dateAdded: "18 Aug 2026",
    status: "Verified Authentic",
    confidentiality: "Archival Record",
    description: "Documentation of the blood-stained portion of calico apron discovered by PC Alfred Long at 02:55 AM in the archway of Wentworth Model Dwellings, Goulston Street, below a chalk inscription on the black brick wall.",
    summary: "Physical matching confirmed apron section was torn from victim's clothing found in Mitre Square 40 minutes earlier. Sir Charles Warren ordered chalk inscription erased at 05:30 AM before photography.",
    relatedPeople: ["P-001", "P-002", "P-008"],
    relatedEvents: ["EV-009", "EV-011"],
    chainOfCustody: [
      { date: "1888-09-30", action: "Recovered by PC Long, delivered to Leman St Station", agent: "Metropolitan Police" },
      { date: "2026-08-18", action: "Cross-referenced with CID ledger notes", agent: "Mystery Solver Team" }
    ],
    metadata: {
      material: "Checked calico cotton apron",
      chalkText: "The Juwes are the men that will not be blamed for nothing",
      erasureTime: "05:30 AM (Sunrise)"
    },
    keyFindings: [
      "PC Long states he patrolled the Goulston Street doorway at 02:20 AM and the cloth was NOT there",
      "Indicates deposit occurred between 02:20 AM and 02:55 AM, over an hour after Mitre Square incident",
      "Erection of chalk inscription remains contested as to whether it was preexisting or contemporary"
    ],
    contradictions: ["Detective Daniel Halse argued chalk text was fresh; local residents claimed writing was common on that entryway"]
  },
  {
    id: "E-006",
    caseId: "CASE-001",
    code: "EVD-1888-006",
    title: "Dr. George Bagster Phillips Autopsy Report (Hanbury St)",
    type: "Forensic Report",
    category: "Reports",
    source: "London Hospital / Coroner Court Record",
    date: "1888-09-13",
    dateAdded: "20 Aug 2026",
    status: "Verified Forensic Record",
    confidentiality: "Public Inquest",
    description: "Detailed surgical and post-mortem anatomical examination conducted by Police Surgeon Dr. Phillips regarding the anatomical skill, instrument dimensions, and post-mortem interval.",
    summary: "Surgeon noted precision incisions made with an instrument estimated between 6 to 8 inches in length, possessing a rigid blade. Phillips estimated death at least 2 hours prior to his 06:20 AM examination.",
    relatedPeople: ["P-004", "P-006"],
    relatedEvents: ["EV-004", "EV-005"],
    chainOfCustody: [
      { date: "1888-09-13", action: "Sworn into evidence before Coroner Baxter", agent: "London Hospital" },
      { date: "2026-08-20", action: "Digital forensic OCR transcription", agent: "Mystery Solver Archives" }
    ],
    metadata: {
      instrumentProfile: "Thin-bladed surgical knife or post-mortem knife",
      anatomicalKnowledge: "Assessed as possessing considerable anatomical skill",
      rigidityScore: "Early rigor mortis observed"
    },
    keyFindings: [
      "Dr. Phillips concluded perpetrator possessed anatomical knowledge or skilled trade experience",
      "Contradicted witness testimony placing victim alive at 05:30 AM in street doorway",
      "No evidence of struggle or defensive marks on hands"
    ],
    contradictions: ["Dr. Phillips' estimated time of death (before 04:30 AM) conflicts with Elizabeth Long's 05:30 AM witness sighting"]
  },
  {
    id: "E-007",
    caseId: "CASE-001",
    code: "EVD-1888-007",
    title: "Dutfield's Yard Socialist Club Entry Log & Statements",
    type: "Record",
    category: "Records",
    source: "International Working Men's Educational Club Archives",
    date: "1888-09-30",
    dateAdded: "22 Aug 2026",
    status: "Verified Historical Document",
    confidentiality: "Public Domain",
    description: "Club member attendance roster and gate statements from Louis Diemschutz, club steward, who drove his pony and cart into the darkened Berner Street yard at 01:00 AM on 30 September 1888.",
    summary: "Diemschutz's pony balked upon entering the dark gateway. Club members were singing in the upstairs hall with windows open, yet heard no disturbance outside.",
    relatedPeople: ["P-009", "P-010"],
    relatedEvents: ["EV-007", "EV-008"],
    chainOfCustody: [
      { date: "1888-09-30", action: "Recorded at Commercial Street Station", agent: "Metropolitan Police" },
      { date: "2026-08-22", action: "Digitized transcript ingested", agent: "Mystery Solver Records" }
    ],
    metadata: {
      location: "40 Berner Street, Commercial Road",
      timeOfDiscovery: "01:00 AM",
      atmosphere: "Meeting of ~30 members concluding inside hall"
    },
    keyFindings: [
      "Interruption hypothesis: Perpetrator may have been disturbed by pony cart at 01:00 AM",
      "Direct transit route between Berner Street and Mitre Square is 0.8 miles (approx 12-15 min brisk walk)"
    ],
    contradictions: []
  },
  {
    id: "E-008",
    caseId: "CASE-001",
    code: "EVD-1888-008",
    title: "From Hell Letter & Preserved Specimen Container Note",
    type: "Document",
    category: "Documents",
    source: "Whitechapel Vigilance Committee Papers (George Lusk File)",
    date: "1888-10-16",
    dateAdded: "25 Aug 2026",
    status: "Historical Document / Debated Provenance",
    confidentiality: "Public Inquest",
    description: "Package received by George Lusk, Chairman of the Whitechapel Vigilance Committee, accompanied by a handwritten note postmarked from London and a biological specimen examined by Dr. Thomas Openshaw at London Hospital.",
    summary: "Forensic medical examination by Openshaw and Dr. Johnson confirmed biological tissue consistency with renal structure, though modern archival reviews indicate potential medical student prank origin.",
    relatedPeople: ["P-011", "P-012"],
    relatedEvents: ["EV-014", "EV-015"],
    chainOfCustody: [
      { date: "1888-10-16", action: "Delivered to George Lusk, 1 Alderney Road, Mile End", agent: "General Post Office" },
      { date: "1888-10-18", action: "Transferred to City Police Detective Inspector McWilliam", agent: "City of London Police" },
      { date: "2026-08-25", action: "Archival paper analysis ingested", agent: "Mystery Solver Lab" }
    ],
    metadata: {
      postmark: "LONDON E. 15 OC 88",
      addressedTo: "Mr Lusk / Head Vigilence Committee",
      language: "Phonetic vernacular spelling with ink splatter"
    },
    keyFindings: [
      "Unlike 'Dear Boss' letters, this letter makes no mention of the 'Jack the Ripper' moniker",
      "Sent directly to citizen vigilance committee head rather than police or press agencies",
      "Modern forensic historians consider provenance unproven without definitive DNA chain"
    ],
    contradictions: ["Dr. Openshaw's public remarks in Daily Telegraph differed from his official statement to police"]
  },

  // CASE-002 Evidence Items (Corporate Espionage)
  {
    id: "E-101",
    caseId: "CASE-002",
    code: "EVD-2025-101",
    title: "Cleanroom Air-Lock RFID & Biometric Access Log",
    type: "Digital",
    category: "Records",
    source: "Zurich Lab Security Operations Center (SOC)",
    date: "2025-11-14",
    dateAdded: "02 Sep 2026",
    status: "Verified Digital Signature",
    confidentiality: "Confidential Forensic",
    description: "Encrypted Syslog export of badge badge swipes and retinal scanner verifications for Vault Chamber B-04. Shows dual-custody override triggered at 03:14:22 CET.",
    summary: "Badge credentials for Lead Optical Architect Dr. K. Chen were presented at 03:14 AM while her personal mobile device simultaneously connected to a cellular tower 14 km away.",
    relatedPeople: ["P-201", "P-202"],
    relatedEvents: ["EV-201", "EV-202"],
    chainOfCustody: [
      { date: "2025-11-14", action: "Cryptographic hash SHA-256 sealed", agent: "Incident Response Team" },
      { date: "2026-09-02", action: "Imported into Mystery Solver SOC Module", agent: "Mystery Solver Lead" }
    ],
    metadata: {
      terminalId: "TERMINAL-VAULT-04",
      hash: "a4f89d02c51e...399b",
      anomalies: "Credential replay detected"
    },
    keyFindings: [
      "Simultaneous location paradox: Physical badge used while phone active across town",
      "Thermal infrared sensor disabled 18 seconds before badge swipe",
      "Air-lock depressurization cycle logged at 3 minutes above normal duration"
    ],
    contradictions: ["Dr. Chen maintains she was asleep at home with her phone on nightstand"]
  },
  {
    id: "E-102",
    caseId: "CASE-002",
    code: "EVD-2025-102",
    title: "Optical Bench Spectrum Analyzer Calibration File",
    type: "Document",
    category: "Reports",
    source: "Rigol DSA875 Spectrum Analyzer Local Flash Dump",
    date: "2025-11-14",
    dateAdded: "03 Sep 2026",
    status: "Verified Digital Image",
    confidentiality: "Proprietary",
    description: "Raw diagnostic output from photonics test rig 3 recorded during the exfiltration window. Measures 1550nm laser beam perturbation indicative of physical component disengagement.",
    summary: "Pinpoints physical disconnection of Prototype Q-1 to exactly 03:18:04 CET.",
    relatedPeople: ["P-201"],
    relatedEvents: ["EV-202"],
    chainOfCustody: [
      { date: "2025-11-14", action: "Extracted via JTAG debug port", agent: "Hardware Forensics Unit" }
    ],
    metadata: {
      sampleRate: "100 MS/s",
      targetChip: "Q-Wave-Photon-V3",
      anomalyDuration: "420 milliseconds"
    },
    keyFindings: ["Proves unit was removed live without standard 5-minute helium cooling cycle"],
    contradictions: []
  },

  // CASE-003 Evidence Items (Museum Theft)
  {
    id: "E-201",
    caseId: "CASE-003",
    code: "EVD-1911-201",
    title: "Louvre Carpentry Workshop Shift Ledger & Apron Cloth",
    type: "Record",
    category: "Records",
    source: "Archives Nationales de France / Louvre Registry",
    date: "1911-08-21",
    dateAdded: "20 Jul 2026",
    status: "Verified Historical Document",
    confidentiality: "Public Domain",
    description: "Work order and attendance log for Italian glazing contractors installing protective glass casings across the Salon Carré during summer 1911.",
    summary: "Documents specific access permissions granted to glazier Vincenzo Peruggia for custom framing woodwork during off-hours on Monday morning.",
    relatedPeople: ["P-301", "P-302"],
    relatedEvents: ["EV-301"],
    chainOfCustody: [
      { date: "1911-08-22", action: "Seized by Sûreté investigator Louis Lepine", agent: "Prefecture de Police" }
    ],
    metadata: {
      workshopCode: "ATELIER-VITRERIE-04",
      entryPassNumber: "PASS-1911-884"
    },
    keyFindings: ["Contractor knew the service stairway door lock was defective and could be turned with a pocket key"],
    contradictions: []
  }
];
