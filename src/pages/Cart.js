import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="container">
      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <p>{item.title}</p>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              updateQty(item.id, Number(e.target.value))
            }
          />

          <p>₹{item.price * item.qty}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{total.toFixed(2)}</h3>

      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;