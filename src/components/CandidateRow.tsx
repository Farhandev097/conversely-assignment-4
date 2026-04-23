import React from "react";
import { Candidate } from "../types/Candidate";
import { useCandidate } from "../context/CandidateContext";

interface Props {
  candidate: Candidate;
  onClick: () => void;
  onCompareToggle: (c: Candidate) => void;
  isSelected: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  isEven: boolean;
}

const priorityMeta: Record<string, { text: string; bg: string; border: string }> = {
  P0: { text: "text-p0", bg: "bg-p0/10", border: "border-p0/30" },
  P1: { text: "text-p1", bg: "bg-p1/10", border: "border-p1/30" },
  P2: { text: "text-p2", bg: "bg-p2/10", border: "border-p2/30" },
  P3: { text: "text-p3", bg: "bg-p3/10", border: "border-p3/30" },
};

const scoreColor: Record<string, string> = {
  P0: "text-p0", P1: "text-p1", P2: "text-p2", P3: "text-p3",
};

const CandidateRow = React.memo(
  ({ candidate, onClick, onCompareToggle, isSelected, onDragStart, onDragEnd, isEven }: Props) => {
    const { state, dispatch } = useCandidate();
    const liveCandidate = state.candidates.find((c) => c.id === candidate.id) ?? candidate;
    const meta = priorityMeta[liveCandidate.priorityLevel!] ?? priorityMeta["P3"];

    return (
      <tr
        onClick={onClick}
        className={`border-b border-border cursor-pointer transition-colors hover:bg-white/5
          ${isSelected ? "bg-accent/5" : isEven ? "bg-surface" : "bg-surface2"}`}
      >
        <td className="px-4 py-3 w-12">
          <input
            type="checkbox"
            checked={isSelected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onCompareToggle(candidate)}
            className="accent-accent w-4 h-4 cursor-pointer"
          />
        </td>
        <td className="px-4 py-3">
          <span className="font-semibold text-sm text-white">{liveCandidate.name}</span>
        </td>
        <td className="px-4 py-3">
          <span className="text-muted text-sm">{liveCandidate.college}</span>
        </td>
        <td className="px-4 py-3">
          <span className={`font-mono text-base font-medium ${scoreColor[liveCandidate.priorityLevel!] ?? "text-white"}`}>
            {liveCandidate.assignment}
          </span>
        </td>
        <td className="px-4 py-3 w-40">
          <input
            type="range"
            className="score-slider"
            min="0"
            max="100"
            value={liveCandidate.assignment}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => { e.stopPropagation(); onDragStart(); }}
            onMouseUp={() => onDragEnd()}
            onTouchStart={() => onDragStart()}
            onTouchEnd={() => onDragEnd()}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_SCORE",
                payload: { id: candidate.id, field: "assignment", value: Number(e.target.value) },
              })
            }
          />
        </td>
        <td className="px-4 py-3">
          <span className={`inline-block px-3 py-1 rounded-full font-mono text-xs border ${meta.text} ${meta.bg} ${meta.border}`}>
            {liveCandidate.priorityLevel}
          </span>
        </td>
      </tr>
    );
  }
);

export default CandidateRow;