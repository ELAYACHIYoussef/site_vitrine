import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('azy_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage", error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('azy_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item =>
            item.id === product.id &&
            item.selectedSize === product.selectedSize &&
            item.selectedColor === product.selectedColor
        );

        if (existingItem) {
            toast.success(`Quantité mise à jour : ${product.name}`);
            setCart(prevCart =>
                prevCart.map(item =>
                    (item.id === product.id &&
                        item.selectedSize === product.selectedSize &&
                        item.selectedColor === product.selectedColor)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            toast.success(`Ajouté au panier : ${product.name}`);
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const removeFromCart = (productId, selectedSize, selectedColor) => {
        setCart(prevCart => prevCart.filter(item =>
            !(item.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor)
        ));
        toast.success("Produit retiré du panier");
    };

    const updateQuantity = (productId, selectedSize, selectedColor, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                (item.id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('azy_cart');
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
