import { Candidate } from "../types/Candidate";

interface Props {
  candidates: Candidate[];
}

const ComparePanel = ({ candidates }: Props) => {
  if (candidates.length < 2) return null;

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Comparison</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        {candidates.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <h4>{c.name}</h4>
            <p>Assignment: {c.assignment}</p>
            <p>Video: {c.video}</p>
            <p>ATS: {c.ats}</p>
            <p>Priority: {c.priorityLevel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePanel;