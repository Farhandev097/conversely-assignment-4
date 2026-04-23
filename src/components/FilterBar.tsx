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
      className="bg-surface2 text-white border border-border rounded-lg px-3 py-2 text-sm font-syne w-32 outline-none focus:border-accent2 transition-colors"
    />
  );
};

export default FilterBar;