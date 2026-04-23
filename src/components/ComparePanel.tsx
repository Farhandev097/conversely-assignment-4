import { Candidate } from "../types/Candidate";

interface Props {
  candidates: Candidate[];
}

const priorityText: Record<string, string> = {
  P0: "text-p0", P1: "text-p1", P2: "text-p2", P3: "text-p3",
};
const priorityBg: Record<string, string> = {
  P0: "bg-p0/10 border-p0/30", P1: "bg-p1/10 border-p1/30", P2: "bg-p2/10 border-p2/30", P3: "bg-p3/10 border-p3/30",
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
    <div className="bg-surface border border-border rounded-xl p-5 mb-5">
      <div className="font-mono text-xs tracking-widest text-muted mb-4">
        COMPARING {candidates.length} CANDIDATES
      </div>
      <div className="flex gap-3">
        {candidates.map((c) => (
          <div key={c.id} className="flex-1 bg-surface2 border border-border rounded-xl p-4">
            <div className="font-bold text-sm text-white mb-1">{c.name}</div>
            <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-xs border mb-3 ${priorityText[c.priorityLevel!]} ${priorityBg[c.priorityLevel!]}`}>
              {c.priorityLevel}
            </span>
            {fields.map((f) => (
              <div key={f.key} className="flex justify-between items-center py-1.5 border-b border-border text-sm last:border-0">
                <span className="text-muted">{f.label}</span>
                <span className="font-mono font-medium text-white">{c[f.key] as number}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePanel;