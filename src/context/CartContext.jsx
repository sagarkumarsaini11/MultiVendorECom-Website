import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToCart as addToCartApi,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user || user.role !== "user") {
      setCart({ items: [] });
      return;
    }
    try {
      setLoading(true);
      const { data } = await getCart();
      setCart(data.data);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const { data } = await addToCartApi({ productId, quantity });
    setCart(data.data);
    toast.success("Added to cart");
  };

  const updateQuantity = async (itemId, quantity) => {
    const { data } = await updateCartItem(itemId, { quantity });
    setCart(data.data);
  };

  const removeItem = async (itemId) => {
    const { data } = await removeFromCart(itemId);
    setCart(data.data);
    toast.success("Removed from cart");
  };

  const cartCount = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
