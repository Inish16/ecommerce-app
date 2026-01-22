import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="container">
      <h2>Cart</h2>

      {cart.map((i) => (
        <div key={i.id} className="cart-item">
          <p>{i.title}</p>
          <input
            type="number"
            value={i.qty}
            onChange={(e) => updateQty(i.id, +e.target.value)}
          />
          <p>₹{i.price * i.qty}</p>
          <button onClick={() => removeFromCart(i.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}

export default Cart;