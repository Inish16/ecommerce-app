import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>

      <h3>{product.title}</h3>

      <div className="card-footer">
        <span className="price">₹{product.price}</span>
        <button onClick={() => addToCart(product)}>Add</button>
      </div>
    </motion.div>
  );
}

export default ProductCard;