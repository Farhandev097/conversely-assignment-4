interface Props {
  minScore: number | "";
  setMinScore: (value: number | "") => void;
}

const FilterBar = ({ minScore, setMinScore }: Props) => {
  return (
    <input
      type="number"
      placeholder="Min score..."
      value={minScore}
      onChange={(e) => setMinScore(e.target.value === "" ? "" : Number(e.target.value))}
      style={{
        background: "var(--surface2)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "8px 12px",
        fontSize: "13px",
        width: "130px",
        outline: "none",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => (e.target.style.borderColor = "var(--accent2)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
    />
  );
};

export default FilterBar;