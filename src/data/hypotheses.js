export const mockInitialHypotheses = [
  {
    id: "HYP-001",
    caseId: "CASE-001",
    title: "Double Event Transit & Interruption Theory",
    theory: "The perpetrator was interrupted in Dutfield's Yard (Berner St) by Louis Diemschutz's cart at 01:00 AM, retreated westward through narrow passages to Mitre Square, and performed the second act between 01:30 and 01:44 AM before depositing the apron in Goulston Street.",
    supportingEvidenceIds: ["E-003", "E-004", "E-005", "E-007"],
    contradictingEvidenceIds: ["E-002"],
    unresolvedQuestions: [
      "Exact route taken through Spitalfields between 01:45 and 02:20 AM",
      "Was the Goulston Street chalk inscription contemporary or preexisting?"
    ],
    coverageScore: 78,
    createdAt: "2026-09-28T14:30:00Z",
    status: "Active Theory"
  },
  {
    id: "HYP-002",
    caseId: "CASE-001",
    title: "Anatomical Training / Skilled Trade Theory",
    theory: "Surgical precision and rapid organ excision recorded in Hanbury Street by Dr. Bagster Phillips suggests the perpetrator possessed practical anatomical familiarity or specialized carving trade experience.",
    supportingEvidenceIds: ["E-001", "E-006"],
    contradictingEvidenceIds: ["E-008"],
    unresolvedQuestions: [
      "Discrepancy between Elizabeth Long's 05:30 AM witness sighting and Dr. Phillips' 04:30 AM time of death assessment"
    ],
    coverageScore: 65,
    createdAt: "2026-09-29T09:15:00Z",
    status: "Under Review"
  }
];
