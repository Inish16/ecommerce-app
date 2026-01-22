import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    alert("Order placed successfully!");
  };

  return (
    <div className="container">
      <h2>Checkout</h2>

      <input placeholder="Name" />
      <input placeholder="Address" />
      <input placeholder="Phone" />

      <h3>Total: ₹{total.toFixed(2)}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;