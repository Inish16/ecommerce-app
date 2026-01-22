function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      placeholder="Search products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;