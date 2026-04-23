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
    <div style={{ padding: "20px" }}>
      <h1>Candidate Dashboard</h1>
      <SummaryPanel candidates={filteredCandidates} />
      <div style={{ marginBottom: "15px" }}>
        <SearchBar search={search} setSearch={setSearch} />
        <FilterBar minScore={minScore} setMinScore={setMinScore} />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Sort By: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "assignment" | "priority")}
          style={{ marginRight: "10px", padding: "5px" }}
        >
          <option value="priority">Priority</option>
          <option value="assignment" disabled>
            Assignment (locked while editing)
          </option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          style={{ padding: "5px" }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
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