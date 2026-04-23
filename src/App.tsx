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

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0d0f14;
    --surface: #14171f;
    --surface2: #1c2030;
    --border: #252a38;
    --text: #e8eaf0;
    --muted: #6b7280;
    --accent: #6ee7b7;
    --accent2: #818cf8;
    --p0: #6ee7b7;
    --p1: #818cf8;
    --p2: #fbbf24;
    --p3: #f87171;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Syne', sans-serif; }
  select, input { font-family: 'Syne', sans-serif; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
`;

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
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "36px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
              <div style={{ width: "8px", height: "32px", background: "var(--accent)", borderRadius: "2px" }} />
              <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)" }}>
                Candidate Dashboard
              </h1>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "13px", fontFamily: "'DM Mono', monospace", marginLeft: "20px" }}>
              {filteredCandidates.length} candidates · sorted by {sortBy} {order}
            </p>
          </div>

          <SummaryPanel candidates={filteredCandidates} />

          <div style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "16px 20px",
          }}>
            <SearchBar search={search} setSearch={setSearch} />
            <FilterBar minScore={minScore} setMinScore={setMinScore} />
            <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
              <label style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>SORT</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "assignment" | "priority")}
                style={{
                  background: "var(--surface2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="priority">Priority</option>
                <option value="assignment">Assignment</option>
              </select>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
                style={{
                  background: "var(--surface2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: "pointer",
                  outline: "none",
                }}
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
      </div>

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </>
  );
}

export default App;