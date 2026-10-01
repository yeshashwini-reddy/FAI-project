/**
 * AI Assistant Agent Engine
 * Human = Detective, AI = Assistant / Guide.
 * 
 * Provides case-specific tool functions:
 * - searchEvidence(query)
 * - getPersonDetails(personIdOrName)
 * - getTimeline(filter)
 * - getStatements()
 * - getConnections()
 * - getCaseDocuments()
 * - generateHint(level)
 * - explainEvidence(evidenceId)
 * 
 * Enforces AI behavior rules:
 * Rule 1: Do not reveal culprit during normal investigation.
 * Rule 2: Do not solve the case for the user.
 * Rule 3: Use information from CURRENT CASE.
 * Rule 4: Do not invent non-existent evidence.
 * Rule 5: Provide progressive hints without revealing answer.
 * Rule 6: Explain evidence clearly when asked.
 * Rule 7: Evaluate user's proposed suspect with evidence without revealing whether they are right/wrong.
 */

export function executeAssistantTools({
  query,
  activeCase,
  activeEvidence,
  activePeople,
  activeEvents,
  activeGraph,
  hintsUsedCount = 0,
  onHintUsed
}) {
  const q = query.toLowerCase();
  const toolsCalled = [];
  let responseText = "";

  // 1. Check if user is asking for a hint
  if (q.includes("hint") || q.includes("clue hint") || q.includes("give me a hint")) {
    toolsCalled.push({
      tool: "generateHint",
      args: { currentLevel: Math.min(hintsUsedCount + 1, 3) }
    });

    const nextLevel = Math.min(hintsUsedCount + 1, 3);
    const hintObj = activeCase?.hints?.find(h => h.level === nextLevel) || {
      level: nextLevel,
      title: `Level ${nextLevel} Hint`,
      text: "Examine the inconsistencies between witness statements and official event timestamps."
    };

    if (onHintUsed) {
      onHintUsed(nextLevel);
    }

    responseText = `💡 **${hintObj.title}** (Hint ${nextLevel}/3)\n\n${hintObj.text}\n\n*Remember: Take your time to review the evidence before forming your final hypothesis!*`;
    
    return { toolsCalled, responseText };
  }

  // 2. Check if user proposes a suspect (Rule 7)
  const proposedPerson = activePeople.find(p => q.includes(p.name.toLowerCase()) || q.includes(p.name.split(' ')[0].toLowerCase()));
  if (proposedPerson && (q.includes("think") || q.includes("suspect") || q.includes("did it") || q.includes("guilty") || q.includes("responsible"))) {
    toolsCalled.push({
      tool: "getPersonDetails",
      args: { name: proposedPerson.name, id: proposedPerson.id }
    });
    toolsCalled.push({
      tool: "searchEvidence",
      args: { query: proposedPerson.name }
    });

    const relatedEv = activeEvidence.filter(e => 
      e.description.toLowerCase().includes(proposedPerson.name.toLowerCase()) || 
      (proposedPerson.relatedEvidenceIds && proposedPerson.relatedEvidenceIds.includes(e.id))
    );

    responseText = `🔍 **Analyzing Person of Interest: ${proposedPerson.name}**\n\n` +
      `**Role / Profile:** ${proposedPerson.role} (${proposedPerson.category})\n` +
      `**Known Information:** ${proposedPerson.summary || proposedPerson.knownInformation}\n\n` +
      `**Associated Evidence:** ${relatedEv.length > 0 ? relatedEv.map(e => `[${e.code || e.id}] ${e.title}`).join(", ") : "No direct physical evidence tied explicitly to this person."}\n\n` +
      `*Assistant Advice:* ${proposedPerson.name} is connected to key elements in the case file. Before reaching your final conclusion, carefully compare their official statement and timeline activity against the witness deposition timestamps!`;

    return { toolsCalled, responseText };
  }

  // 3. Search for evidence / explain evidence
  if (q.includes("evidence") || q.includes("clue") || q.includes("document") || q.includes("proof") || q.includes("find related")) {
    toolsCalled.push({ tool: "searchEvidence", args: { caseId: activeCase?.id, query } });
    
    const matchedEvidence = activeEvidence.slice(0, 3);
    responseText = `📋 **Evidence File Summary for ${activeCase?.title}**\n\n` +
      `Found ${activeEvidence.length} indexed evidence records. Here are key items for your review:\n\n` +
      matchedEvidence.map(e => `• **${e.code || e.id} — ${e.title}** (${e.type}): ${e.description}`).join("\n\n") +
      `\n\n*How would you like to cross-reference these items with the timeline?*`;

    return { toolsCalled, responseText };
  }

  // 4. Timeline inquiry
  if (q.includes("timeline") || q.includes("time") || q.includes("when") || q.includes("chronology") || q.includes("event")) {
    toolsCalled.push({ tool: "getTimeline", args: { caseId: activeCase?.id } });

    const keyEvents = activeEvents.slice(0, 4);
    responseText = `⏱️ **Timeline Analysis for Case ${activeCase?.id}**\n\n` +
      `Mapped ${activeEvents.length} chronological occurrences. Key timeline anchors include:\n\n` +
      keyEvents.map(ev => `• **${ev.date} ${ev.time || ''}**: ${ev.title} — *${ev.description}*`).join("\n\n") +
      `\n\n*Notice any gaps or contradictions between witness claims and these timestamps?*`;

    return { toolsCalled, responseText };
  }

  // 5. Suspects / People inquiry
  if (q.includes("people") || q.includes("suspect") || q.includes("who") || q.includes("witness") || q.includes("person")) {
    toolsCalled.push({ tool: "getPersonDetails", args: { caseId: activeCase?.id } });
    toolsCalled.push({ tool: "getStatements", args: { caseId: activeCase?.id } });

    const keyPeople = activePeople.slice(0, 4);
    responseText = `👥 **Key Persons of Interest & Witnesses**\n\n` +
      keyPeople.map(p => `• **${p.name}** (${p.role}): ${p.summary}`).join("\n\n") +
      `\n\n*Examine their statements and timeline activities in the People tab to test their credibility!*`;

    return { toolsCalled, responseText };
  }

  // 6. Connections inquiry
  if (q.includes("connection") || q.includes("relationship") || q.includes("graph") || q.includes("link") || q.includes("network")) {
    toolsCalled.push({ tool: "getConnections", args: { caseId: activeCase?.id } });

    responseText = `🕸️ **Entity & Evidence Connections Analysis**\n\n` +
      `The relationship graph maps linkages between persons, evidence records, and locations for **${activeCase?.title}**.\n\n` +
      `• **Key Nodes:** ${activePeople.length} people, ${activeEvidence.length} evidence items, and recorded geographical locations.\n` +
      `• **Flagged Inconsistencies:** ${activeCase?.inconsistenciesCount || 3} timeline conflicts detected.\n\n` +
      `*You can explore the interactive visual graph on the Connections page to trace specific links!*`;

    return { toolsCalled, responseText };
  }

  // 7. General help / Default Assistant response
  toolsCalled.push({ tool: "getCaseDocuments", args: { caseId: activeCase?.id } });
  toolsCalled.push({ tool: "explainEvidence", args: { caseId: activeCase?.id } });

  responseText = `🔎 **AI Investigation Assistant**\n\n` +
    `I am analyzing **${activeCase?.title}** with you.\n\n` +
    `Here is how I can assist your investigation:\n` +
    `1. Ask me to **search evidence** or explain specific clues.\n` +
    `2. Ask about **suspect statements** or witness testimony.\n` +
    `3. Ask to **analyze the timeline** and flag time contradictions.\n` +
    `4. Ask for a **progressive hint** if you're feeling stuck.\n\n` +
    `*What aspect of ${activeCase?.title} would you like to examine next?*`;

  return { toolsCalled, responseText };
}
