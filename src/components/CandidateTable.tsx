import { Candidate } from "../types/Candidate";
import CandidateRow from "./CandidateRow";

interface Props {
  candidates: Candidate[];
  onSelect: (c: Candidate) => void;
  onCompareToggle: (c: Candidate) => void;
  compareList: Candidate[];
  onDragStart: () => void;
  onDragEnd: () => void;
}

const CandidateTable = ({
  candidates,
  onSelect,
  onCompareToggle,
  compareList,
  onDragStart,
  onDragEnd,
}: Props) => {
  const thStyle = {
    padding: "10px",
    borderBottom: "2px solid #ccc",
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={thStyle}>Select</th>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>College</th>
          <th style={thStyle}>Assignment</th>
          <th style={thStyle}>Adjust</th>
          <th style={thStyle}>Priority</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((c) => (
          <CandidateRow
            key={c.id}
            candidate={c}
            onClick={() => onSelect(c)}
            onCompareToggle={onCompareToggle}
            isSelected={compareList.some((item) => item.id === c.id)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CandidateTable;