"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} Added to the cart`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    toast.success("Item removed from cart");
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter(
      (item) => foundProduct._id !== item._id
    );

    if (value === "inc") {
      setCartItems([
        {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        },
        ...newCartItems,
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      setCartItems([
        {
          ...foundProduct,
          quantity: foundProduct.quantity <= 1 ? 1 : foundProduct.quantity - 1,
        },
        ...newCartItems,
      ]);
      setTotalPrice((prevTotalPrice) => {
        if (foundProduct.quantity <= 1) {
          return prevTotalPrice;
        } else {
          return prevTotalPrice - foundProduct.price;
        }
      });
      setTotalQuantities((prevTotalQuantities) => {
        if (foundProduct.quantity <= 1) {
          return prevTotalQuantities;
        } else {
          return prevTotalQuantities - 1;
        }
      });
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty < 2) {
        return 1;
      } else {
        return prevQty - 1;
      }
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        imgIndex,
        setImgIndex,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
