import { useEffect, useState, useMemo } from "react";
import { candidates } from "./data/candidates";
import { useCandidate } from "./context/CandidateContext";
import CandidateTable from "./components/CandidateTable";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SummaryPanel from "./components/SummaryPanel";
import CandidateModal from "./components/CandidateModal";
import { Candidate } from "./types/Candidate";
import ComparePanel from "./components/ComparePanel";

function App() {
  const { state, dispatch } = useCandidate();
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<"assignment" | "priority">("priority");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [compareList, setCompareList] = useState<Candidate[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [lockedOrder, setLockedOrder] = useState<Candidate[]>([]);

  useEffect(() => {
    dispatch({ type: "SET_CANDIDATES", payload: candidates });
  }, [dispatch]);

  const filteredCandidates = useMemo(() => {
    if (isSorting) return lockedOrder;
    let data = state.candidates.filter((c) => {
      return (
        c.name.toLowerCase().includes(search.toLowerCase()) &&
        (minScore === "" || c.assignment >= minScore)
      );
    });
    return [...data].sort((a: any, b: any) => {
      if (sortBy === "assignment") {
        return order === "asc" ? a.assignment - b.assignment : b.assignment - a.assignment;
      }
      if (sortBy === "priority") {
        const priorityMap: any = { P0: 0, P1: 1, P2: 2, P3: 3 };
        const diff = priorityMap[a.priorityLevel] - priorityMap[b.priorityLevel];
        return order === "asc" ? diff : -diff;
      }
      return a.initialIndex - b.initialIndex;
    });
  }, [state.candidates, search, minScore, sortBy, order, isSorting, lockedOrder]);

  return (
    <div className="min-h-screen bg-bg px-10 py-9">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-8 bg-accent rounded-sm" />
            <h1 className="text-3xl font-syne font-extrabold tracking-tight text-white">
              Candidate Dashboard
            </h1>
          </div>
          <p className="font-mono text-xs text-muted ml-5">
            {filteredCandidates.length} candidates · sorted by {sortBy} {order}
          </p>
        </div>

        <SummaryPanel candidates={filteredCandidates} />

        <div className="flex items-center gap-3 flex-wrap bg-surface border border-border rounded-xl px-5 py-4 mb-5">
          <SearchBar search={search} setSearch={setSearch} />
          <FilterBar minScore={minScore} setMinScore={setMinScore} />
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-xs text-muted">SORT</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "assignment" | "priority")}
              className="bg-surface2 text-white border border-border rounded-lg px-3 py-2 text-sm font-syne cursor-pointer outline-none"
            >
              <option value="priority">Priority</option>
              <option value="assignment">Assignment</option>
            </select>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              className="bg-surface2 text-white border border-border rounded-lg px-3 py-2 text-sm font-syne cursor-pointer outline-none"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        <ComparePanel candidates={compareList} />

        <CandidateTable
          candidates={filteredCandidates}
          onSelect={setSelectedCandidate}
          onCompareToggle={(c) => {
            setCompareList((prev) => {
              const exists = prev.find((item) => item.id === c.id);
              if (exists) return prev.filter((item) => item.id !== c.id);
              if (prev.length >= 3) return prev;
              return [...prev, c];
            });
          }}
          compareList={compareList}
          onDragStart={() => { setIsSorting(true); setLockedOrder(filteredCandidates); }}
          onDragEnd={() => setIsSorting(false)}
        />
      </div>

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
}

export default App;