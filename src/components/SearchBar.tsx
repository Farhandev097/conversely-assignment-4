interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div style={{ position: "relative" }}>
      <span style={{
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--muted)",
        fontSize: "14px",
        pointerEvents: "none",
      }}>⌕</span>
      <input
        type="text"
        placeholder="Search candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          background: "var(--surface2)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "8px 12px 8px 32px",
          fontSize: "13px",
          width: "220px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />
    </div>
  );
};

export default SearchBar;