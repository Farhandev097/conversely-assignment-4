import { Candidate, PriorityLevel } from "../types/Candidate";

export const calculatePriority = (
  candidate: Candidate
): { score: number; level: PriorityLevel } => {
  const score =
    candidate.assignment * 0.3 +
    candidate.video * 0.25 +
    candidate.ats * 0.2 +
    candidate.github * 0.15 +
    candidate.communication * 0.1;

  let level: PriorityLevel = "P3";

  if (score >= 85) level = "P0";
  else if (score >= 70) level = "P1";
  else if (score >= 50) level = "P2";

  return { score, level };
};