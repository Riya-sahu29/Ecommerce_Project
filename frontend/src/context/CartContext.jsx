import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken, clearTokens } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000";
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/cart/`);
            
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error('Error fetching cart:', err);
            // If unauthorized, clear tokens
            if (err.message.includes('401') || err.status === 401) {
                clearTokens();
                setCartItems([]);
                setTotal(0);
            }
        }
    };

    useEffect(() => {
        if (getAccessToken()) {
            fetchCart();
        }
    }, []);

    // Add product to cart
    const addToCart = async (product) => {
        try {
            await authFetch(`${BASEURL}/api/cart/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: product.id }),
            });
            await fetchCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
            if (error.message.includes('401') || error.status === 401) {
                clearTokens();
                throw new Error('Please log in to add items to cart');
            }
            throw error;
        }
    };

    // Remove Product from Cart
    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: itemId }),
            });
            await fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
            if (error.message.includes('401') || error.status === 401) {
                clearTokens();
                throw new Error('Please log in to modify cart');
            }
            throw error;
        }
    };

    // Update quantity of a cart item
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }
        try {
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: itemId, quantity }),
            });
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart:', error);
            if (error.message.includes('401') || error.status === 401) {
                clearTokens();
                throw new Error('Please log in to modify cart');
            }
            throw error;
        }
    };

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    }   


    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);