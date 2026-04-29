import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();
const CART_STORAGE_KEY = "shop-cart";

const loadStoredCart = () => {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        const parsedCart = storedCart ? JSON.parse(storedCart) : [];

        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(loadStoredCart);

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch {
            toast.error("Unable to save cart");
        }
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

    const getSubtotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const getItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getShipping = () => {
        const subtotal = getSubtotal();

        if (subtotal === 0 || subtotal >= 100) {
            return 0;
        }

        return 9.99;
    };

    const getTax = () => {
        return getSubtotal() * 0.08;
    };

    const getTotalPrice = () => {
        return getSubtotal() + getShipping() + getTax();
    };

    const removeFromCart = (productId) => {
        toast.error("Removed from cart");
        setCartItems((prev) =>
            prev.filter((item) => item.id !== productId)
        );
    };

    const clearCart = () => {
        toast.info("Cart cleared", {});
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotalPrice,
                getSubtotal,
                getShipping,
                getTax,
                getItemCount,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook (clean usage)
export const useCart = () => useContext(CartContext);
