export type PriorityLevel = "P0" | "P1" | "P2" | "P3";

export interface Candidate {
  id: number;
  name: string;
  college: string;

  assignment: number;
  video: number;
  ats: number;
  github: number;
  communication: number;

  priorityScore?: number;
  priorityLevel?: PriorityLevel;
}