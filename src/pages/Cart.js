import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="page-transition">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.<br />Explore our collection!</p>
          <Link to="/">
            <button className="shop-btn" id="go-shopping-btn">
              ✦ Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition cart-page">
      <h1 className="cart-page-title">
        Your Cart
        <span>{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
      </h1>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items-list">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="cart-item"
                id={`cart-item-${item.id}`}
              >
                <img
                  className="cart-item-img"
                  src={item.image}
                  alt={item.title}
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.title}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                {/* Qty stepper */}
                <div className="qty-stepper">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    aria-label="Decrease quantity"
                    id={`qty-dec-${item.id}`}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    aria-label="Increase quantity"
                    id={`qty-inc-${item.id}`}
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.title}`}
                  id={`remove-${item.id}`}
                >
                  🗑
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-header">Order Summary</div>
          <div className="summary-body">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="summary-val">${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="summary-val">${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%)</span>
              <span className="summary-val">${(subtotal * 0.1).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="summary-val">
                ${(total + subtotal * 0.1).toFixed(2)}
              </span>
            </div>
          </div>

          <Link to="/checkout" id="checkout-link">
            <button className="checkout-btn" id="checkout-btn">
              <span>Proceed to Checkout →</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;