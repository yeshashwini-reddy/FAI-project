export const mockGraphData = {
  "CASE-001": {
    nodes: [
      // People Nodes
      { id: "P-001", label: "Insp. Abberline", category: "Person", subcategory: "Investigator", role: "CID Lead", x: 250, y: 150 },
      { id: "P-002", label: "Sir Charles Warren", category: "Person", subcategory: "Official", role: "Police Commissioner", x: 100, y: 120 },
      { id: "P-004", label: "Coroner Baxter", category: "Person", subcategory: "Official", role: "Coroner", x: 260, y: 350 },
      { id: "P-005", label: "Elizabeth Long", category: "Person", subcategory: "Witness", role: "Hanbury St Witness", x: 480, y: 480 },
      { id: "P-006", label: "Dr. Bagster Phillips", category: "Person", subcategory: "Expert", role: "Divisional Surgeon", x: 420, y: 280 },
      { id: "P-007", label: "PC Watkins", category: "Person", subcategory: "Investigator", role: "City Constable", x: 740, y: 160 },
      { id: "P-008", label: "PC Alfred Long", category: "Person", subcategory: "Investigator", role: "Met Constable", x: 680, y: 340 },
      { id: "P-009", label: "Louis Diemschutz", category: "Person", subcategory: "Witness", role: "Club Steward", x: 800, y: 460 },
      { id: "P-011", label: "George Lusk", category: "Person", subcategory: "Official", role: "Vigilance Chair", x: 120, y: 300 },

      // Evidence Nodes
      { id: "E-001", label: "Inquest Transcript", category: "Evidence", subcategory: "Document", code: "E-001", x: 220, y: 260 },
      { id: "E-002", label: "Dear Boss Letter", category: "Evidence", subcategory: "Document", code: "E-002", x: 120, y: 20 },
      { id: "E-003", label: "1888 Survey Map", category: "Evidence", subcategory: "Image", code: "E-003", x: 500, y: 100 },
      { id: "E-004", label: "PC Watkins Deposition", category: "Evidence", subcategory: "Statement", code: "E-004", x: 650, y: 100 },
      { id: "E-005", label: "Goulston St Apron", category: "Evidence", subcategory: "Record", code: "E-005", x: 550, y: 320 },
      { id: "E-006", label: "Autopsy Report (Phillips)", category: "Evidence", subcategory: "Forensic", code: "E-006", x: 380, y: 400 },
      { id: "E-007", label: "Socialist Club Entry Log", category: "Evidence", subcategory: "Record", code: "E-007", x: 780, y: 360 },
      { id: "E-008", label: "From Hell Letter", category: "Evidence", subcategory: "Document", code: "E-008", x: 80, y: 420 },

      // Event Nodes
      { id: "EV-003", label: "05:30 AM Sighting", category: "Event", subcategory: "Witness Event", time: "05:30 AM", x: 420, y: 560 },
      { id: "EV-005", label: "Surgeon Scene Exam", category: "Event", subcategory: "Forensic Exam", time: "06:20 AM", x: 310, y: 480 },
      { id: "EV-008", label: "01:30 AM Clear Sweep", category: "Event", subcategory: "Patrol Sweep", time: "01:30 AM", x: 780, y: 80 },
      { id: "EV-009", label: "01:44 AM Discovery", category: "Event", subcategory: "Discovery", time: "01:44 AM", x: 700, y: 220 },
      { id: "EV-011", label: "02:55 AM Apron Discovery", category: "Event", subcategory: "Discovery", time: "02:55 AM", x: 620, y: 440 },

      // Location Nodes
      { id: "LOC-01", label: "29 Hanbury Street", category: "Location", subcategory: "Spitalfields", x: 350, y: 640 },
      { id: "LOC-02", label: "Mitre Square", category: "Location", subcategory: "City of London", x: 760, y: 200 },
      { id: "LOC-03", label: "Wentworth Dwellings", category: "Location", subcategory: "Goulston St", x: 600, y: 520 },
      { id: "LOC-04", label: "Dutfield's Yard", category: "Location", subcategory: "Berner Street", x: 860, y: 520 }
    ],
    edges: [
      { id: "ED-1", source: "P-001", target: "E-001", label: "Supervised Deposition", type: "Investigative" },
      { id: "ED-2", source: "P-001", target: "E-003", label: "Mapped Patrol Sectors", type: "Analysis" },
      { id: "ED-3", source: "P-002", target: "P-001", label: "Command Authority", type: "Hierarchy" },
      { id: "ED-4", source: "P-002", target: "E-005", label: "Ordered Chalk Erased", type: "Direct Action" },
      { id: "ED-5", source: "P-004", target: "E-001", label: "Presided Over Inquest", type: "Legal" },
      { id: "ED-6", source: "P-006", target: "E-006", label: "Authored Autopsy Report", type: "Forensic" },
      { id: "ED-7", source: "P-005", target: "EV-003", label: "Sworn Eyewitness", type: "Testimony" },
      { id: "ED-8", source: "P-006", target: "EV-005", label: "Conducted Exam", type: "Forensic" },
      { id: "ED-9", source: "EV-003", target: "EV-005", label: "Timeline Conflict (1 hr discrepancy)", type: "Contradiction", isConflict: true },
      { id: "ED-10", source: "P-007", target: "EV-008", label: "Completed Beat (01:30 AM)", type: "Patrol" },
      { id: "ED-11", source: "P-007", target: "EV-009", label: "Discovered Scene (01:44 AM)", type: "Discovery" },
      { id: "ED-12", source: "EV-009", target: "LOC-02", label: "Occurred At", type: "Spatial" },
      { id: "ED-13", source: "P-008", target: "EV-011", label: "Discovered Cloth", type: "Discovery" },
      { id: "ED-14", source: "EV-011", target: "LOC-03", label: "Deposited Inside Arch", type: "Spatial" },
      { id: "ED-15", source: "E-005", target: "EV-011", label: "Physical Evidence", type: "Evidence Link" },
      { id: "ED-16", source: "P-009", target: "E-007", label: "Gave Entry Statement", type: "Testimony" },
      { id: "ED-17", source: "P-009", target: "LOC-04", label: "Steward At", type: "Employment" },
      { id: "ED-18", source: "P-011", target: "E-008", label: "Recipient Of Package", type: "Custody" },
      { id: "ED-19", source: "EV-003", target: "LOC-01", label: "Observed Outside Doorway", type: "Spatial" },
      { id: "ED-20", source: "EV-005", target: "LOC-01", label: "Examined In Backyard", type: "Spatial" }
    ]
  }
};
