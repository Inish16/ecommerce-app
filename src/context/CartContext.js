import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }

    toast.success("Added to cart");
  };

  const removeFromCart = (id) =>
    setCart(cart.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    setCart(
      cart.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, qty) } : i
      )
    );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);