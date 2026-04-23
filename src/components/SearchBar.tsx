interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar = ({ search, setSearch }: Props) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none">⌕</span>
      <input
        type="text"
        placeholder="Search candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-surface2 text-white border border-border rounded-lg pl-8 pr-3 py-2 text-sm font-syne w-52 outline-none focus:border-accent transition-colors"
      />
    </div>
  );
};

export default SearchBar;