import { useCart } from "../../context/CartContext";
import emptyCartImg from "../../assets/images/CategorySection/emptyCartImg.webp";
import { ArrowRight, Heart, IndianRupee, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import products from "../../products";
import { useState } from "react";

export default function Cart() {
    const { cartItems, clearCart, updateQuantity, removeFromCart } = useCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const navigate = useNavigate();
    const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);

    function toggleWishlistItem(key: string) {
        setWishlistedItems((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    }

    const subtotal = cartItems.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return sum;
        return sum + product.price * item.quantity;
    }, 0);

    return (
        <div className="pt-13 bg-cream md:min-h-screen">
            <p className="text-sm text-gray-600 px-10 md:px-19 pt-14">
                <span className="mr-1">Shop</span> / <span className="px-1">Cart</span>
            </p>

            {cartItems.length === 0 ? (
                <div className="relative p-6 md:p-10 justify-center md:min-h-screen overflow-hidden">
                    <img src={emptyCartImg} alt="empty cart" className="absolute object-cover object-top h-full w-full" />
                    <div className="absolute inset-0 bg-linear-to-r from-cream via-cream/70 to-transparent" />
                    <div className="relative">
                        <div className="text-5xl font-serif px-7 md:px-19 pt-5">Your cart is empty</div>
                        <p className="text-gray-800 text-xs md:text-base font-medium px-7 md:px-19 pt-5">
                            Looks like you haven't added anything to your cart yet.<br />
                            Explore our collections and find something timeless.
                        </p>
                        <button className="bg-black w-50 text-white rounded-md cursor-pointer px-6 py-3 mt-14 ml-7 md:ml-19 hover:bg-zinc-800 transition"
                            onClick={() => navigate("/products")}
                        >
                            <div className="flex items-center justify-around tracking-wider hover:pl-3 transition-all duration-300 font-medium">
                                SHOP ALL <ArrowRight size={20} className="inline" />
                            </div>
                        </button>
                        <button className="bg-cream w-50 tracking-wider ml-7  h-full border rounded-md font-semibold text-black text-sm py-3 mt-6 md:ml-4 hover:bg-hover cursor-pointer transition"
                            onClick={() => navigate("/collections")}
                        >
                            EXPLORE COLLECTIONS
                        </button>
                    </div>
                </div>
            ) : (
                <div className="ml-19 mr-12">
                    <div className="text-5xl font-serif pt-5">
                        Your Cart <span className="ml-2">({totalItems})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="pb-30 col-span-3">
                            <div className="text-sm font-sans pb-4 border-gray-400 border-b mx-7 text-zinc-500 font-semibold flex items-center justify-end">
                                <button className="hover:text-black transition-all duration-300 cursor-pointer flex items-center"
                                    onClick={clearCart}
                                >
                                    Remove all<Trash2 size={16} className="inline ml-2" /></button>
                            </div>
                            {cartItems.map((item, index) => {
                                const product = products.find((p) => p.id === item.productId);

                                if (!product) return null;

                                return (
                                    <div key={`${item.productId}-${item.color}-${item.size}`} className="grid grid-cols-5 overflow-hidden justify-start border-b border-gray-300 py-4">
                                        <div className=" h-full w-full col-span-1 overflow-hidden">
                                            <img src={product?.image} alt={product?.name} className="h-full object-cover object-top w-full rounded-md" />
                                        </div>
                                        <div className="flex  col-span-3 ml-5 my-3 px-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold ">{product?.name}</p>
                                                <div className="py-1">
                                                    <p className="text-sm text-gray-500">{item.color} <span className="px-1">/</span> {item.size}</p>
                                                </div>
                                                <div className="flex items-center py-2">
                                                    <IndianRupee size={15} />
                                                    <p className="font-semibold"> {(product?.price).toLocaleString("en-IN")}</p>
                                                </div>
                                                <button className="text-sm text-gray-600 my-1 hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-2" onClick={() => toggleWishlistItem(`${item.productId}-${item.color}-${item.size}`)}>
                                                    <span className={`inline p-1 ${wishlistedItems.includes(`${item.productId}-${item.color}-${item.size}`) ? 'bg-black rounded-full text-white' : ''}`}><Heart size={16} /></span> Move to Wishlist
                                                </button>
                                            </div>
                                            <div className="flex flex-col ml-40 gap-2">
                                                <p className="text-xs text-gray-600">Quantity</p>
                                                <div className="border text-sm  text-gray-500 gap-5 overflow-hidden my-3 border-gray-300 rounded-md flex items-center justify-center">
                                                    <button className={`hover:text-black hover:bg-cream transition-all  h-8 border-gray-300 px-2 duration-300 cursor-pointer ${item.quantity === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:text-black hover:bg-cream"}`}
                                                        disabled={item.quantity === 1}
                                                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}><Minus size={16} /></button>
                                                    <p>{item.quantity}</p>
                                                    <button className="hover:text-black hover:bg-cream hover: transition-all duration-300 cursor-pointer h-8 border-gray-300 px-2" onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}><Plus size={16} /></button>
                                                </div>
                                                <button className="text-sm text-gray-600 my-1 hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-2" onClick={() => removeFromCart(item.productId, item.color, item.size)}>
                                                    <Trash2 size={16} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex my-2 col-span-1 h-10 items-center justify-center">
                                            <IndianRupee size={15} className="inline" />
                                            <p className="font-semibold"> {(product?.price * item.quantity).toLocaleString("en-IN")}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="border border-gray-300 rounded-md p-5 col-span-1">
                            <div className="text-sm font-sans pb-4 text-zinc-800 font-semibold flex items-center justify-between">
                                <div>Subtotal</div>
                                <div className="flex items-center gap-1"><IndianRupee size={15} /> {subtotal.toLocaleString("en-IN")}</div>
                            </div>
                            <div className="text-sm font-sans py-2 text-zinc-800 font-semibold flex items-center justify-between">
                                <div>Shipping</div>
                                <div className="flex items-center gap-1">{subtotal > 2999 ? "Free" : <span className="flex items-center gap-1"><IndianRupee size={15} className="inline" /> 59 </span>}</div>
                            </div>
                            <div className="font-sans mt-7 text-zinc-800 font-semibold flex items-center justify-between">
                                <div>Total</div>
                                <div className="flex items-center gap-1"><IndianRupee size={15} /> {(subtotal + (subtotal > 2999 ? 0 : 59)).toLocaleString("en-IN")}
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mt-4">
                                Tax included and shipping calculated at checkout
                            </p>

                            <button className="bg-black text-white text-sm w-full transition-all hover:scale-102 active:scale-99 duration-300 rounded-md cursor-pointer px-6 py-3 mt-6 hover:bg-zinc-800 flex items-center justify-center"
                                onClick={() => navigate("/checkout")}
                            >
                                <span>CHECKOUT</span> <ArrowRight size={16} className="inline ml-2" />
                            </button>

                            <button className="bg-cream w-full tracking-wider border rounded-md hover:scale-102 font-semibold text-black text-sm py-3 mt-4 hover:bg-hover cursor-pointer transition-all duration-300 flex items-center justify-center"
                                onClick={() => navigate("/products")}
                            >
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 