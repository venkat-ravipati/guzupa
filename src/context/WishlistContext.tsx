import { createContext, useState, ReactNode, useContext } from "react";

type WishlistContextType = {
    wishlistItems: number[];
    addToWishlist: (productId: number) => void;
    removeFromWishlist: (productId: number) => void;
    isInWishlist: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<number[]>([]);

    function addToWishlist(productId: number) {
      setWishlistItems((prev) => prev.includes(productId) ? prev : [...prev, productId]);  
    };

    function removeFromWishlist(productId: number) {
      setWishlistItems((prev) => prev.filter((id) => id !== productId));
    };

    function isInWishlist(productId: number) {
      return wishlistItems.includes(productId);
    }

    return (
      <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
        {children}
      </WishlistContext.Provider>
    );
};

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}