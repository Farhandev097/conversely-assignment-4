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

const CandidateTable = ({ candidates, onSelect, onCompareToggle, compareList, onDragStart, onDragEnd }: Props) => {
  const thStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "11px",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "1px",
    color: "var(--muted)",
    borderBottom: "1px solid var(--border)",
    fontWeight: 500,
  };

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--surface2)" }}>
            <th style={{ ...thStyle, width: "48px" }}></th>
            <th style={thStyle}>NAME</th>
            <th style={thStyle}>COLLEGE</th>
            <th style={thStyle}>SCORE</th>
            <th style={thStyle}>ADJUST</th>
            <th style={thStyle}>PRIORITY</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => (
            <CandidateRow
              key={c.id}
              candidate={c}
              onClick={() => onSelect(c)}
              onCompareToggle={onCompareToggle}
              isSelected={compareList.some((item) => item.id === c.id)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isEven={i % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;