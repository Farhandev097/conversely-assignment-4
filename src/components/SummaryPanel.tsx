import { Candidate } from "../types/Candidate";

interface Props {
  candidates: Candidate[];
}

const SummaryPanel = ({ candidates }: Props) => {
  const total = candidates.length;

  const shortlisted = candidates.filter(
    (c) => c.priorityLevel === "P0" || c.priorityLevel === "P1"
  ).length;

  const rejected = candidates.filter(
    (c) => c.priorityLevel === "P3"
  ).length;

  const pending = total - shortlisted - rejected;

  const boxStyle = {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "180px",
    textAlign: "center" as const,
    background: "#f9f9f9",
  };

  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      <div style={boxStyle}>
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div style={boxStyle}>
        <h3>Shortlisted</h3>
        <p>{shortlisted}</p>
      </div>

      <div style={boxStyle}>
        <h3>Pending</h3>
        <p>{pending}</p>
      </div>

      <div style={boxStyle}>
        <h3>Rejected</h3>
        <p>{rejected}</p>
      </div>
    </div>
  );
};

export default SummaryPanel;