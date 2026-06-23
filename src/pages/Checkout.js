import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", zip: "",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + tax + shipping;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter 16-digit card number";
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.expiry.length < 5) e.expiry = "MM/YY required";
    if (form.cvv.length < 3) e.cvv = "3-digit CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setTimeout(() => navigate("/"), 4000);
  };

  /* card display helpers */
  const displayCard = form.cardNumber || "•••• •••• •••• ••••";
  const displayName = form.cardName || "FULL NAME";
  const displayExpiry = form.expiry || "MM/YY";

  return (
    <div className="page-transition checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">📦</div>
          <h2>Nothing to checkout</h2>
          <p>Add some items to your cart first.</p>
          <Link to="/"><button className="shop-btn" id="shop-now-btn">Shop Now</button></Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="checkout-layout">
            {/* Left: Form */}
            <div className="checkout-form-section">
              {/* Shipping */}
              <div className="form-card">
                <div className="form-card-header">
                  <span className="form-card-num">1</span>
                  Shipping Information
                </div>
                <div className="form-card-body">
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="firstName">First Name</label>
                      <input id="firstName" value={form.firstName} onChange={set("firstName")}
                        placeholder="John" className={errors.firstName ? "error" : ""} />
                      {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="lastName">Last Name</label>
                      <input id="lastName" value={form.lastName} onChange={set("lastName")}
                        placeholder="Doe" className={errors.lastName ? "error" : ""} />
                      {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                    </div>
                  </div>
                  <div className="field full">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" type="email" value={form.email} onChange={set("email")}
                      placeholder="john@example.com" className={errors.email ? "error" : ""} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="field full">
                    <label htmlFor="address">Street Address</label>
                    <input id="address" value={form.address} onChange={set("address")}
                      placeholder="123 Main Street" className={errors.address ? "error" : ""} />
                    {errors.address && <span className="field-error">{errors.address}</span>}
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="city">City</label>
                      <input id="city" value={form.city} onChange={set("city")}
                        placeholder="New York" className={errors.city ? "error" : ""} />
                      {errors.city && <span className="field-error">{errors.city}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="zip">ZIP / Postal Code</label>
                      <input id="zip" value={form.zip} onChange={set("zip")}
                        placeholder="10001" className={errors.zip ? "error" : ""} />
                      {errors.zip && <span className="field-error">{errors.zip}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="form-card">
                <div className="form-card-header">
                  <span className="form-card-num">2</span>
                  Payment Details
                </div>
                <div className="form-card-body">
                  {/* Credit Card Visual */}
                  <div className="card-visual">
                    <div className="card-chip" />
                    <div className="card-number-display">{displayCard}</div>
                    <div className="card-bottom">
                      <div>
                        <div className="card-holder-label">Card Holder</div>
                        <div className="card-holder-name">{displayName}</div>
                      </div>
                      <div>
                        <div className="card-expiry-label">Expires</div>
                        <div className="card-expiry-val">{displayExpiry}</div>
                      </div>
                      <div className="card-brand">
                        <div className="card-brand-circle circle-red" />
                        <div className="card-brand-circle circle-yellow" />
                      </div>
                    </div>
                  </div>

                  <div className="field full">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      id="cardNumber"
                      value={form.cardNumber}
                      onChange={(e) => setForm((f) => ({ ...f, cardNumber: formatCard(e.target.value) }))}
                      placeholder="0000 0000 0000 0000"
                      className={errors.cardNumber ? "error" : ""}
                      maxLength={19}
                    />
                    {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                  </div>
                  <div className="field full">
                    <label htmlFor="cardName">Name on Card</label>
                    <input id="cardName" value={form.cardName} onChange={set("cardName")}
                      placeholder="John Doe" className={errors.cardName ? "error" : ""} />
                    {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label htmlFor="expiry">Expiry Date</label>
                      <input
                        id="expiry"
                        value={form.expiry}
                        onChange={(e) => setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiry ? "error" : ""}
                      />
                      {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        id="cvv"
                        value={form.cvv}
                        onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                        placeholder="•••"
                        maxLength={4}
                        className={errors.cvv ? "error" : ""}
                        type="password"
                      />
                      {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="checkout-summary">
              <div className="summary-header">Order Review</div>
              <div className="summary-body">
                {cart.map((item) => (
                  <div key={item.id} className="checkout-item-row">
                    <img className="checkout-item-img" src={item.image} alt={item.title} />
                    <span className="checkout-item-name">
                      {item.title} × {item.qty}
                    </span>
                    <span className="checkout-item-price">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="summary-row" style={{ paddingTop: 14 }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="summary-val">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="place-order-btn"
                id="place-order-btn"
                style={{ margin: "0 28px 28px", width: "calc(100% - 56px)" }}
              >
                <span>🔒 Place Order — ${total.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-card"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="success-icon">🎉</div>
              <h2 className="success-title">Order Placed!</h2>
              <p className="success-sub">
                Thank you for your purchase. Your order has been received and is being processed. You'll receive a confirmation shortly.
              </p>
              <p style={{ color: "var(--text-3)", fontSize: 13 }}>Redirecting to home…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Checkout;