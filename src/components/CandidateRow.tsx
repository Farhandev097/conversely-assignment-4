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

const priorityMeta: Record<string, { color: string; bg: string }> = {
  P0: { color: "var(--p0)", bg: "rgba(110,231,183,0.1)" },
  P1: { color: "var(--p1)", bg: "rgba(129,140,248,0.1)" },
  P2: { color: "var(--p2)", bg: "rgba(251,191,36,0.1)" },
  P3: { color: "var(--p3)", bg: "rgba(248,113,113,0.1)" },
};

const sliderStyle = `
  .score-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 2px; background: var(--border); outline: none; cursor: pointer; }
  .score-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); cursor: grab; transition: transform 0.15s, box-shadow 0.15s; }
  .score-slider::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.3); box-shadow: 0 0 0 4px rgba(110,231,183,0.2); }
  .score-slider::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: var(--accent); cursor: grab; border: none; }
`;

const CandidateRow = React.memo(
  ({ candidate, onClick, onCompareToggle, isSelected, onDragStart, onDragEnd, isEven }: Props) => {
    const { state, dispatch } = useCandidate();
    const liveCandidate = state.candidates.find((c) => c.id === candidate.id) ?? candidate;
    const meta = priorityMeta[liveCandidate.priorityLevel!] ?? priorityMeta["P3"];

    const tdStyle: React.CSSProperties = {
      padding: "14px 16px",
      borderBottom: "1px solid var(--border)",
    };

    return (
      <>
        <style>{sliderStyle}</style>
        <tr
          onClick={onClick}
          style={{
            background: isSelected ? "rgba(110,231,183,0.04)" : isEven ? "var(--surface)" : "var(--surface2)",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = isSelected ? "rgba(110,231,183,0.04)" : isEven ? "var(--surface)" : "var(--surface2)")}
        >
          <td style={{ ...tdStyle, width: "48px" }}>
            <input
              type="checkbox"
              checked={isSelected}
              onClick={(e) => e.stopPropagation()}
              onChange={() => onCompareToggle(candidate)}
              style={{
                accentColor: "var(--accent)",
                width: "15px",
                height: "15px",
                cursor: "pointer",
              }}
            />
          </td>
          <td style={tdStyle}>
            <span style={{ fontWeight: 600, fontSize: "14px" }}>{liveCandidate.name}</span>
          </td>
          <td style={tdStyle}>
            <span style={{ color: "var(--muted)", fontSize: "13px" }}>{liveCandidate.college}</span>
          </td>
          <td style={tdStyle}>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "15px",
              fontWeight: 500,
              color: meta.color,
            }}>
              {liveCandidate.assignment}
            </span>
          </td>
          <td style={{ ...tdStyle, width: "160px" }}>
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
          <td style={tdStyle}>
            <span style={{
              display: "inline-block",
              padding: "3px 10px",
              borderRadius: "20px",
              background: meta.bg,
              color: meta.color,
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.5px",
              border: `1px solid ${meta.color}33`,
            }}>
              {liveCandidate.priorityLevel}
            </span>
          </td>
        </tr>
      </>
    );
  }
);

export default CandidateRow;