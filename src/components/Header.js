import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { cart } = useCart();
  const { dark, setDark } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const count = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      {/* Logo */}
      <Link className="logo" to="/" id="logo-link">
        <span className="logo-icon">⚡</span>
        NEXUS
      </Link>

      {/* Nav */}
      <div className="header-right">
        <Link
          className="nav-link"
          to="/"
          style={{ color: location.pathname === "/" ? "var(--text)" : undefined }}
          id="nav-home"
        >
          Shop
        </Link>

        {/* Cart button */}
        <Link to="/cart" id="nav-cart">
          <motion.button
            className="cart-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none"/>
              <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            <AnimatePresence mode="wait">
              {count > 0 && (
                <motion.span
                  key={count}
                  className="cart-badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </Link>

        {/* Theme toggle */}
        <button
          className="theme-btn"
          onClick={() => setDark(!dark)}
          title="Toggle theme"
          id="theme-toggle"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;