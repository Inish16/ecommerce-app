import { motion } from "framer-motion";

function Pagination({ page, setPage, total }) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        className="page-arrow"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
        id="pagination-prev"
      >
        ‹
      </button>

      {pages.map((p) => (
        <motion.button
          key={p}
          className={`page-btn${p === page ? " active" : ""}`}
          onClick={() => setPage(p)}
          whileHover={p !== page ? { scale: 1.1 } : {}}
          whileTap={{ scale: 0.95 }}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          id={`page-btn-${p}`}
        >
          {p}
        </motion.button>
      ))}

      <button
        className="page-arrow"
        disabled={page === total}
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
        id="pagination-next"
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;