interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search candidate..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "8px",
        width: "250px",
      }}
    />
  );
};

export default SearchBar;