import { Candidate } from "../types/Candidate";

interface Props {
  candidates: Candidate[];
}

const SummaryPanel = ({ candidates }: Props) => {
  const total = candidates.length;
  const p0 = candidates.filter((c) => c.priorityLevel === "P0").length;
  const p1 = candidates.filter((c) => c.priorityLevel === "P1").length;
  const p2 = candidates.filter((c) => c.priorityLevel === "P2").length;
  const p3 = candidates.filter((c) => c.priorityLevel === "P3").length;

  const cards = [
    { label: "Total", value: total, color: "var(--text)", sub: "candidates" },
    { label: "P0", value: p0, color: "var(--p0)", sub: "Interview Now" },
    { label: "P1", value: p1, color: "var(--p1)", sub: "Strong Shortlist" },
    { label: "P2", value: p2, color: "var(--p2)", sub: "Review Later" },
    { label: "P3", value: p3, color: "var(--p3)", sub: "Reject" },
  ];

  return (
    <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            flex: 1,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "18px 20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "3px",
            background: card.color,
            opacity: 0.8,
          }} />
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            color: card.color,
            letterSpacing: "1px",
            marginBottom: "8px",
          }}>
            {card.label}
          </div>
          <div style={{ fontSize: "32px", fontWeight: 800, color: card.color, lineHeight: 1 }}>
            {card.value}
          </div>
          <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryPanel;