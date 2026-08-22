import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("sweet-bliss-cart") || "[]"));

    useEffect(() => localStorage.setItem("sweet-bliss-cart", JSON.stringify(cart)), [cart]);

    const addToCart = (item) => {
        setCart((current) => {
            const existing = current.find((cartItem) => cartItem._id === item._id || cartItem.title === item.title);
            return existing
                ? current.map((cartItem) => cartItem === existing ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem)
                : [...current, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (index) => {
        setCart((current) => current.filter((_, i) => i !== index));
    };

    const totalPrice = cart.reduce((total, item) => {
        return total + Number(item.price) * (item.quantity || 1);
    }, 0);

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};