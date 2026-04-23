import { Candidate } from "../types/Candidate";

interface Props {
  candidates: Candidate[];
}

const cards = [
  { label: "TOTAL", sub: "candidates", key: "total", color: "text-white", bar: "bg-white" },
  { label: "P0", sub: "Interview Now", key: "p0", color: "text-p0", bar: "bg-p0" },
  { label: "P1", sub: "Strong Shortlist", key: "p1", color: "text-p1", bar: "bg-p1" },
  { label: "P2", sub: "Review Later", key: "p2", color: "text-p2", bar: "bg-p2" },
  { label: "P3", sub: "Reject", key: "p3", color: "text-p3", bar: "bg-p3" },
];

const SummaryPanel = ({ candidates }: Props) => {
  const counts: Record<string, number> = {
    total: candidates.length,
    p0: candidates.filter((c) => c.priorityLevel === "P0").length,
    p1: candidates.filter((c) => c.priorityLevel === "P1").length,
    p2: candidates.filter((c) => c.priorityLevel === "P2").length,
    p3: candidates.filter((c) => c.priorityLevel === "P3").length,
  };

  return (
    <div className="flex gap-3 mb-6">
      {cards.map((card) => (
        <div key={card.key} className="flex-1 bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-0.5 ${card.bar} opacity-80`} />
          <div className={`font-mono text-xs tracking-widest mb-2 ${card.color}`}>{card.label}</div>
          <div className={`text-4xl font-extrabold font-syne leading-none ${card.color}`}>{counts[card.key]}</div>
          <div className="text-xs text-muted mt-1">{card.sub}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryPanel;