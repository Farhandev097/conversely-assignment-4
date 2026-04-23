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

  const cardStyle = {
    flex: 1,
    padding: "15px",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center" as const,
  };

  const numberStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "5px",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      <div style={cardStyle}>
        <p>Total Candidates</p>
        <div style={numberStyle}>{total}</div>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "green" }}>P0 – Interview Immediately</p>
        <div style={{ ...numberStyle, color: "green" }}>{p0}</div>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "blue" }}>P1 – Strong Shortlist</p>
        <div style={{ ...numberStyle, color: "blue" }}>{p1}</div>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "orange" }}>P2 – Review Later</p>
        <div style={{ ...numberStyle, color: "orange" }}>{p2}</div>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "red" }}>P3 – Reject</p>
        <div style={{ ...numberStyle, color: "red" }}>{p3}</div>
      </div>
    </div>
  );
};

export default SummaryPanel;