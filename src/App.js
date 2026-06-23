import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import FloatingOrbs from "./components/FloatingOrbs";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Ambient animated background */}
      <FloatingOrbs />

      {/* App shell */}
      <div className="app-shell">
        <Header />

        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default App;