import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const [added, setAdded] = useState(false);

  /* ── 3D tilt on mouse move ── */
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    /* shine */
    if (shineRef.current) {
      const mx = ((x / rect.width) * 100).toFixed(1);
      const my = ((y / rect.height) * 100).toFixed(1);
      shineRef.current.style.setProperty("--mx", `${mx}%`);
      shineRef.current.style.setProperty("--my", `${my}%`);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      cardRef.current.style.transition = "transform 0.5s ease";
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.1s ease";
    }
  }, []);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const price =
    typeof product.price === "number"
      ? `$${product.price.toFixed(2)}`
      : product.price;

  return (
    <motion.div
      className="product-card-wrap"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="product-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ transition: "transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}
      >
        {/* Shine overlay */}
        <div className="card-shine" ref={shineRef} />

        {/* Image */}
        <div className="img-wrap">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
          />
        </div>

        {/* Body */}
        <div className="card-body">
          {product.category && (
            <span className="card-category">{product.category}</span>
          )}

          <h3 className="card-title">{product.title}</h3>

          {product.rating && (
            <StarRating
              rate={product.rating.rate}
              count={product.rating.count}
            />
          )}

          <div className="card-footer">
            <span className="price">{price}</span>
            <button
              className={`add-btn${added ? " added" : ""}`}
              onClick={handleAdd}
              id={`add-to-cart-${product.id}`}
            >
              <span>{added ? "✓ Added" : "+ Add"}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;