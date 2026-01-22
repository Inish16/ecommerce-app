import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Skeleton from "react-loading-skeleton";

const PER_PAGE = 6;

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const total = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid">
        {loading
          ? Array(6).fill().map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton height={200} />
                <Skeleton count={2} />
              </div>
            ))
          : visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      <Pagination page={page} setPage={setPage} total={total} />
    </>
  );
}

export default Home;