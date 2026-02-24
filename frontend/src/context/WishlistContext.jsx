import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const localWishlist = localStorage.getItem('wishlist');
            return localWishlist ? JSON.parse(localWishlist) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = async (product, userId = null) => {
        setWishlist((prev) => {
            if (prev.find((item) => item.id === product.id)) {
                toast.error("Ce produit est déjà dans vos favoris");
                return prev;
            }

            // Notify Backend (Fire and Forget)
            try {
                fetch('http://localhost:8080/api/catalog/interactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'LIKE',
                        productId: product.id,
                        userId: userId
                    })
                }).catch(err => console.error("Failed to log like", err));
            } catch (e) {
                // Ignore error
            }

            toast.success("Ajouté aux favoris ❤️");
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
        toast.success("Retiré des favoris");
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    const toggleWishlist = (product, userId = null) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product, userId);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
