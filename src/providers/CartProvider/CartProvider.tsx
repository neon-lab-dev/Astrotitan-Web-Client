/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, type ReactNode, useCallback } from "react";

export type TCartItem = {
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  discountedPrice?: number | null;
  category: string;
  discount?: number;
  quantity: number;
};

type TCartContext = {
  cartItems: TCartItem[];
  addToCart: (item: TCartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: string) => boolean;
  refreshCart: () => void;
};

const CartContext = createContext<TCartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);

  // Load cart from localStorage
  const loadCart = useCallback(() => {
    try {
      const storedCart = localStorage.getItem("productCart");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCartItems([]);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback((item: TCartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.productId === item.productId);
      
      let updatedItems: TCartItem[];
      if (existingItem) {
        updatedItems = prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        const newItem = {
          ...item,
          quantity: item.quantity || 1,
        };
        updatedItems = [...prevItems, newItem];
      }
      
      // Save to localStorage
      localStorage.setItem("productCart", JSON.stringify(updatedItems));
      
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedItems }));
      
      return updatedItems;
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.productId !== productId);
      localStorage.setItem("productCart", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedItems }));
      return updatedItems;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("productCart", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: updatedItems }));
      return updatedItems;
    });
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.setItem("productCart", JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
  }, []);

  // Get cart total
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice || item.basePrice;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  // Get total item count
  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // Check if item is in cart
  const isInCart = useCallback((productId: string) => {
    return cartItems.some((item) => item.productId === productId);
  }, [cartItems]);

  // Refresh cart
  const refreshCart = useCallback(() => {
    loadCart();
  }, [loadCart]);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Listen to storage changes (for other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "productCart") {
        loadCart();
      }
    };

    // Listen to custom event for same-tab updates
    const handleCartUpdate = (e: CustomEvent) => {
      setCartItems(e.detail);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener('cartUpdated' as any, handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener('cartUpdated' as any, handleCartUpdate);
    };
  }, [loadCart]);

  const contextValue: TCartContext = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};