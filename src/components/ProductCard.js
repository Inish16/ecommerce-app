import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="img-wrap">
        <img src={product.image} alt={product.title} />
      </div>

      <h3>{product.title}</h3>

      <div className="card-footer">
        <span className="price">₹{product.price}</span>
        <button onClick={() => addToCart(product)}>Add</button>
      </div>
    </div>
  );
}

export default ProductCard;