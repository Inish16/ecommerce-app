function SearchBar({ value, onChange }) {
  return (
    // <input
    //   placeholder="Search products..."
    //   value={value}
    //   onChange={(e) => onChange(e.target.value)}
    // />
    <input
        className="search"
        placeholder="Search products"
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />

  );
}

export default SearchBar;