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
}

const CandidateRow = React.memo(
  ({ candidate, onClick, onCompareToggle, isSelected, onDragStart, onDragEnd }: Props) => {
    const { state, dispatch } = useCandidate();
    const liveCandidate = state.candidates.find((c) => c.id === candidate.id) ?? candidate;

    const tdStyle = { padding: "10px" };

    const getPriorityStyle = (level: string) => {
      switch (level) {
        case "P0": return { color: "green", fontWeight: "bold" };
        case "P1": return { color: "blue", fontWeight: "bold" };
        case "P2": return { color: "orange", fontWeight: "bold" };
        default:   return { color: "red", fontWeight: "bold" };
      }
    };

    return (
      <tr onClick={onClick} style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}>
        <td style={tdStyle}>
          <input
            type="checkbox"
            checked={isSelected}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onCompareToggle(candidate)}
          />
        </td>
        <td style={tdStyle}>{liveCandidate.name}</td>
        <td style={tdStyle}>{liveCandidate.college}</td>
        <td style={tdStyle}>{liveCandidate.assignment}</td>
        <td style={tdStyle}>
          <input
            type="range"
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
        <td style={tdStyle}>
          <span style={getPriorityStyle(liveCandidate.priorityLevel!)}>
            {liveCandidate.priorityLevel}
          </span>
        </td>
      </tr>
    );
  }
);

export default CandidateRow;