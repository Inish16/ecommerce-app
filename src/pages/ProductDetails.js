import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details">
      <img src={product.image} alt={product.title} height="250" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;