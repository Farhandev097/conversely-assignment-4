import { Candidate } from "../types/Candidate";

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

const CandidateModal = ({ candidate, onClose }: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
        }}
      >
        <h2>{candidate.name}</h2>
        <p>{candidate.college}</p>

        <hr />

        <p>Assignment: {candidate.assignment}</p>
        <p>Video: {candidate.video}</p>
        <p>ATS: {candidate.ats}</p>
        <p>GitHub: {candidate.github}</p>
        <p>Communication: {candidate.communication}</p>

        <button onClick={onClose} style={{ marginTop: "15px" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CandidateModal;