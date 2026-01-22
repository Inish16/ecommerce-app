import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { cart } = useCart();
  const { dark, setDark } = useTheme();

  return (
    // <header className="header">
    //   <Link to="/">React Store</Link>
    //   <Link to="/cart">Cart ({cart.length})</Link>
    //   <button onClick={() => setDark(!dark)}>
    //     {dark ? "Light" : "Dark"}
    //   </button>
    // </header>
    <header className="header">
      <div className="header-left">
        <Link className="logo" to="/">React Store</Link>
      </div>

      <div className="header-right">
        <Link to="/cart" className="cart-link">
          Cart <span className="badge">{cart.length}</span>
        </Link>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;