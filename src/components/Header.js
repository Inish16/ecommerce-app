import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

function Header() {
  const { cart } = useCart();
  const { dark, setDark } = useTheme();

  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="header">
      <Link className="logo" to="/">React Store</Link>

      <div className="header-right">
        <Link to="/cart">
          Cart <span className="badge">{count}</span>
        </Link>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}

export default Header;