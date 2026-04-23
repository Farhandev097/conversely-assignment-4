import React from "react";
import { Candidate } from "../types/Candidate";
import { useCandidate } from "../context/CandidateContext";

interface Props {
  candidate: Candidate;
}

const CandidateRow = React.memo(({ candidate }: Props) => {
  const { dispatch } = useCandidate();

  const tdStyle = {
    padding: "10px",
  };

  const getPriorityStyle = (level: string) => {
    switch (level) {
      case "P0":
        return { color: "green", fontWeight: "bold" };
      case "P1":
        return { color: "blue", fontWeight: "bold" };
      case "P2":
        return { color: "orange", fontWeight: "bold" };
      default:
        return { color: "red", fontWeight: "bold" };
    }
  };

  return (
    <tr style={{ borderBottom: "1px solid #ddd" }}>
      <td style={tdStyle}>{candidate.name}</td>
      <td style={tdStyle}>{candidate.college}</td>

      <td style={tdStyle}>{candidate.assignment}</td>

      <td style={tdStyle}>
        <input
          type="range"
          min="0"
          max="100"
          value={candidate.assignment}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_SCORE",
              payload: {
                id: candidate.id,
                field: "assignment",
                value: Number(e.target.value),
              },
            })
          }
        />
      </td>

      <td style={tdStyle}>
        <span style={getPriorityStyle(candidate.priorityLevel!)}>
          {candidate.priorityLevel}
        </span>
      </td>
    </tr>
  );
});

export default CandidateRow;