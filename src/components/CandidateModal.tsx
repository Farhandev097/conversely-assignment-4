import { Candidate } from "../types/Candidate";

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

const priorityColors: Record<string, string> = {
  P0: "var(--p0)", P1: "var(--p1)", P2: "var(--p2)", P3: "var(--p3)",
};

const CandidateModal = ({ candidate, onClose }: Props) => {
  const color = priorityColors[candidate.priorityLevel!] ?? "var(--text)";

  const rows = [
    { label: "Assignment", value: candidate.assignment },
    { label: "Video", value: candidate.video },
    { label: "ATS", value: candidate.ats },
    { label: "GitHub", value: candidate.github },
    { label: "Communication", value: candidate.communication },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          width: "420px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{
          padding: "24px 24px 20px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface2)",
          position: "relative",
        }}>
          <div style={{ width: "100%", height: "3px", background: color, borderRadius: "2px", marginBottom: "16px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>{candidate.name}</h2>
              <p style={{ color: "var(--muted)", fontSize: "13px" }}>{candidate.college}</p>
            </div>
            <span style={{
              padding: "4px 12px",
              borderRadius: "20px",
              background: `${color}22`,
              color,
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              border: `1px solid ${color}44`,
            }}>
              {candidate.priorityLevel}
            </span>
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {rows.map((row) => (
            <div key={row.label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid var(--border)",
            }}>
              <span style={{ color: "var(--muted)", fontSize: "13px" }}>{row.label}</span>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--text)",
              }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 24px 24px" }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "12px",
              background: "var(--surface2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "var(--border)";
              (e.target as HTMLButtonElement).style.borderColor = "var(--muted)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "var(--surface2)";
              (e.target as HTMLButtonElement).style.borderColor = "var(--border)";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;