import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const PER_PAGE = 8;

/* Skeleton card */
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton skeleton-line" style={{ width: "45%", marginTop: 14 }} />
      <div className="skeleton skeleton-line" />
      <div className="skeleton skeleton-line short" />
      <div className="skeleton-footer">
        <div className="skeleton skeleton-price" />
        <div className="skeleton skeleton-btn" />
      </div>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  /* reset page on filter change */
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleCategory = (cat) => { setCategory(cat); setPage(1); };

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const total = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="page-transition">
      {/* Hero */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="hero-eyebrow">New Collection 2026</div>
        <h1 className="hero-title">
          Shop the{" "}
          <span className="gradient-text">Future</span>
          <br />of Commerce
        </h1>
        <p className="hero-subtitle">
          Discover premium products curated for the modern era. Quality, style, and innovation — all in one place.
        </p>
      </motion.section>

      {/* Search + Filters */}
      <SearchBar
        value={search}
        onChange={handleSearch}
        category={category}
        onCategory={handleCategory}
      />

      {/* Product Grid */}
      <section className="grid-section">
        <div className="grid-header">
          <p className="grid-title">
            {loading
              ? "Loading products…"
              : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        <div className="grid">
          {loading
            ? Array(8).fill(null).map((_, i) => <SkeletonCard key={i} />)
            : visible.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
        </div>
      </section>

      <Pagination page={page} setPage={setPage} total={total} />
    </div>
  );
}

export default Home;