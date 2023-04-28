import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const itemToUpdate = cartItems.find((item) => item.id === productToAdd.id);

  if (itemToUpdate) {
    return cartItems.map((cartItem) => {
      return cartItem.id === itemToUpdate.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeItem: () => {},
  totalItems: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    let grandTotal = 0;
    const numItems = cartItems.reduce((total, nextItem) => {
      total += nextItem.quantity;
      grandTotal += nextItem.price * nextItem.quantity;
      return total;
    }, 0);
    setTotalItems(numItems);
    setCartTotal(grandTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const removeItem = (itemToRemove) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === itemToRemove.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity >= 1)
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    removeItem,
    totalItems,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
