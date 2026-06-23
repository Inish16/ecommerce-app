const CATEGORIES = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

function SearchBar({ value, onChange, category, onCategory }) {
  return (
    <div className="search-section">
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </span>
        <input
          id="product-search"
          className="search"
          placeholder="Search products, categories…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search products"
          autoComplete="off"
        />
      </div>

      <div className="filter-chips" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`chip${category === cat ? " active" : ""}`}
            onClick={() => onCategory(cat)}
            id={`filter-${cat.replace(/\s+/g, "-")}`}
          >
            {cat === "all" ? "All Products" : cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;