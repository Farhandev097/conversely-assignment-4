import { Candidate } from "../types/Candidate";

interface Props {
  candidate: Candidate;
  onClose: () => void;
}

const priorityText: Record<string, string> = {
  P0: "text-p0", P1: "text-p1", P2: "text-p2", P3: "text-p3",
};
const priorityBadge: Record<string, string> = {
  P0: "bg-p0/10 border-p0/30 text-p0",
  P1: "bg-p1/10 border-p1/30 text-p1",
  P2: "bg-p2/10 border-p2/30 text-p2",
  P3: "bg-p3/10 border-p3/30 text-p3",
};
const priorityBar: Record<string, string> = {
  P0: "bg-p0", P1: "bg-p1", P2: "bg-p2", P3: "bg-p3",
};

const CandidateModal = ({ candidate, onClose }: Props) => {
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-border rounded-2xl w-96 overflow-hidden shadow-2xl"
      >
        <div className="bg-surface2 px-6 pt-6 pb-5 border-b border-border">
          <div className={`w-full h-0.5 ${priorityBar[candidate.priorityLevel!] ?? "bg-white"} rounded mb-4`} />
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-extrabold font-syne text-white mb-1">{candidate.name}</h2>
              <p className="text-muted text-xs">{candidate.college}</p>
            </div>
            <span className={`px-3 py-1 rounded-full font-mono text-xs border ${priorityBadge[candidate.priorityLevel!]}`}>
              {candidate.priorityLevel}
            </span>
          </div>
        </div>

        <div className="px-6 py-4">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between items-center py-3 border-b border-border last:border-0">
              <span className="text-muted text-sm">{row.label}</span>
              <span className={`font-mono text-lg font-semibold ${priorityText[candidate.priorityLevel!] ?? "text-white"}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-surface2 text-white border border-border rounded-lg text-sm font-syne font-semibold cursor-pointer hover:bg-border transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;