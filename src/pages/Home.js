import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 6;

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const visible = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="home">
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default Home;