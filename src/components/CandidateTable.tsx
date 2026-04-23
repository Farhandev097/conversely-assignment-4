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
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface2">
            {["", "NAME", "COLLEGE", "SCORE", "ADJUST", "PRIORITY"].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-mono tracking-widest text-muted border-b border-border font-medium"
              >
                {h}
              </th>
            ))}
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