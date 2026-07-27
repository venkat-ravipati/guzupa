import { createContext, ReactNode, useContext, useState } from "react";

export type CartItem = {
    productId: number;
    color: string;
    size: string;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (productId: number, color: string, size: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    function addToCart(productId: number, color: string, size: string) {
        setCartItems((prev) => {
            const existingItem = prev.find(
                (item) => item.productId === productId && item.color === color && item.size === size
            );

            if (existingItem) {
                return prev.map((item) =>
                    item.productId === productId && item.color === color && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prev, { productId, color, size, quantity: 1 }];
            }
        });
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}