import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cart");

        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add to cart
    const addToCart = (product) => {
        setCartItems((prev) => {
            const index = prev.findIndex((item) => item.id === product.id);

            if (index !== -1) {
                // Update existing item safely
                toast.info("Increased quantity");
                const updatedCart = [...prev];
                updatedCart[index] = {
                    ...updatedCart[index],
                    quantity: updatedCart[index].quantity + 1,
                };
                return updatedCart;
            }

            // Add new product
            toast.success("Added to cart", {
                theme: "colored",
            });
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, amount) => {
        setCartItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === productId) {
                        const newQty = item.quantity + amount;

                        if (newQty <= 0) {
                            toast.error("Removed from cart");
                            return null;
                        }

                        return { ...item, quantity: newQty };
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const removeFromCart = (productId) => {
        toast.error("Removed from cart");
        setCartItems((prev) =>
            prev.filter((item) => item.id !== productId)
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook (clean usage)
export const useCart = () => useContext(CartContext);