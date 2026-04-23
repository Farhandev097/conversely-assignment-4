interface Props {
  minScore: number | "";
  setMinScore: (value: number | "") => void;
}

const FilterBar = ({ minScore, setMinScore }: Props) => {
  return (
    <input
      type="number"
      placeholder="Min Assignment"
      value={minScore}
      onChange={(e) =>
        setMinScore(e.target.value === "" ? "" : Number(e.target.value))
      }
      style={{
        marginLeft: "10px",
        padding: "8px",
        width: "150px",
      }}
    />
  );
};

export default FilterBar;