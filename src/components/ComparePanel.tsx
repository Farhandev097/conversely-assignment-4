import { Candidate } from "../types/Candidate";

interface Props {
  candidates: Candidate[];
}

const priorityColors: Record<string, string> = {
  P0: "var(--p0)", P1: "var(--p1)", P2: "var(--p2)", P3: "var(--p3)",
};

const ComparePanel = ({ candidates }: Props) => {
  if (candidates.length < 2) return null;

  const fields: { label: string; key: keyof Candidate }[] = [
    { label: "Assignment", key: "assignment" },
    { label: "Video", key: "video" },
    { label: "ATS", key: "ats" },
    { label: "GitHub", key: "github" },
    { label: "Communication", key: "communication" },
  ];

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
    }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: "11px",
        letterSpacing: "1px",
        color: "var(--muted)",
        marginBottom: "16px",
      }}>
        COMPARING {candidates.length} CANDIDATES
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        {candidates.map((c) => (
          <div key={c.id} style={{
            flex: 1,
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "16px",
          }}>
            <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{c.name}</div>
            <div style={{
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: "20px",
              background: `${priorityColors[c.priorityLevel!]}22`,
              color: priorityColors[c.priorityLevel!],
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              marginBottom: "12px",
              border: `1px solid ${priorityColors[c.priorityLevel!]}44`,
            }}>
              {c.priorityLevel}
            </div>
            {fields.map((f) => (
              <div key={f.key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: "13px",
              }}>
                <span style={{ color: "var(--muted)" }}>{f.label}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
                  {c[f.key] as number}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePanel;