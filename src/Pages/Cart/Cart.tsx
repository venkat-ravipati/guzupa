import { useCart } from "../../context/CartContext";
import emptyCartImg from "../../assets/images/CategorySection/emptyCartImg.webp";
import { ArrowRight, Heart, IndianRupee, LockKeyholeIcon, Minus, Plus, RotateCcw, Trash2, Truck } from "lucide-react";
import { useNavigate } from "react-router";
import products from "../../products";
import { useState } from "react";
import ProductsCard from "../../Components/Product/ProductsCard";

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

    const shippingCost = subtotal > 4999 ? 0 : 59;

    const keyPoints = [{
        icon: Truck,
        title: "Free Shipping",
        text: "On orders above ₹4,999"
    },
    {
        icon: RotateCcw,
        title: "Easy Returns",
        text: "7 days return policy"
    }, {
        icon: LockKeyholeIcon,
        title: "Secure Payment",
        text: "100% secure checkout"
    }]

    const cartProductIds = cartItems.map((item) => item.productId);
    const recommendedProducts = products
        .filter((p) => !cartProductIds.includes(p.id))
        .slice(0, 4);

    return (
        <div className="pt-13 bg-cream md:min-h-screen">
            <p className="text-xs md:text-sm text-gray-600 px-6 lg:px-19 pt-10 lg:pt-14">
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
                        <button className="bg-cream text-xs w-50 tracking-wider ml-7  h-full border rounded-md font-semibold text-black md:text-sm py-3 mt-6 md:ml-4 hover:bg-hover cursor-pointer transition"
                            onClick={() => navigate("/collections")}
                        >
                            EXPLORE COLLECTIONS
                        </button>
                    </div>
                </div>
            ) : (
                <div className="ml-6 lg:ml-19 mr-5 md:mr-0 lg:mr-12">
                    <div className="text-3xl md:text-5xl font-serif pt-5">
                        Your Cart <span className="ml-2">({totalItems})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-4 md:pr-3 lg:pr-0 lg:gap-4">
                        <div className="xl:col-span-3 md:col-span-4 lg:col-span-5">
                            <div className="text-xs md:text-sm font-sans pb-4 border-gray-400 border-b md:mx-7 text-zinc-500 font-semibold flex items-center justify-end">
                                <button className="hover:text-black transition-all duration-300 cursor-pointer flex items-center"
                                    onClick={clearCart}
                                >
                                    Remove all<Trash2 size={16} className="inline ml-2" /></button>
                            </div>
                            {cartItems.map((item, index) => {
                                const product = products.find((p) => p.id === item.productId);

                                if (!product) return null;

                                return (
                                    <div key={`${item.productId}-${item.color}-${item.size}`} className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-hidden justify-start border-b border-gray-300 py-4">
                                        <div className=" h-full w-full col-span-1 overflow-hidden">
                                            <img src={product?.image} alt={product?.name} className="h-full object-cover object-top w-full rounded-md" />
                                        </div>
                                        <div className="lg:flex lg:justify-around xl:justify-normal col-span-1 lg:col-span-2 xl:col-span-3 md:ml-5 my-3 px-2 gap-5">
                                            <div className="flex flex-col gap-2">
                                                <p className="font-semibold text-xs md:text-base">{product?.name}</p>
                                                <div className="lg:py-1">
                                                    <p className="md:text-sm text-xs text-gray-500">{item.color} <span className="px-1">/</span> {item.size}</p>
                                                </div>
                                                <div className="text-sm md:text-base flex items-center lg:py-2">
                                                    <IndianRupee size={15} />
                                                    <p className="font-semibold"> {(product?.price).toLocaleString("en-IN")}</p>
                                                </div>
                                                <button className="text-sm hidden  text-gray-600 my-1 hover:text-black transition-all duration-300 cursor-pointer lg:flex items-center xl:gap-2" onClick={() => toggleWishlistItem(`${item.productId}-${item.color}-${item.size}`)}>
                                                    <span className={`inline p-1 transition-all duration-300 ${wishlistedItems.includes(`${item.productId}-${item.color}-${item.size}`) ? 'bg-black rounded-full text-white' : ''}`}><Heart size={16} /></span> Move to Wishlist
                                                </button>
                                            </div>
                                            <div className="flexflex-col lg:ml-5 xl:ml-40 lg:gap-2">
                                                <p className="text-xs hidden lg:block text-gray-600">Quantity</p>
                                                <div className="border text-sm h-7 md:h-8 text-gray-500 gap-2 md:gap-5 my-2 md:my-3 border-gray-300 rounded-md flex items-center justify-center">
                                                    <button className={`hover:text-black hover:bg-cream transition-all border-gray-300 px-2 duration-300 cursor-pointer ${item.quantity === 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:text-black hover:bg-cream"}`}
                                                        disabled={item.quantity === 1}
                                                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}><Minus size={16} /></button>
                                                    <p>{item.quantity}</p>
                                                    <button className="hover:text-black hover:bg-cream hover: transition-all duration-300 cursor-pointer border-gray-300 px-2" onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}><Plus size={16} /></button>
                                                </div>
                                                <button className="text-xs md:text-sm text-gray-600 mt-3 hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-2" onClick={() => removeFromCart(item.productId, item.color, item.size)}>
                                                    <Trash2 size={16} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col my-2 col-span-1  items-center justify-between py-3 lg:py-0">
                                            <button
                                                className={`lg:hidden flex items-center justify-center transition-all duration-300 p-1 rounded-full ${wishlistedItems.includes(`${item.productId}-${item.color}-${item.size}`) ? 'bg-black text-white' : ''}`}
                                                onClick={() => toggleWishlistItem(`${item.productId}-${item.color}-${item.size}`)}
                                            >
                                                <Heart size={16} />
                                            </button>
                                            <div className="text-sm md:text-base flex items-center py-10 lg:py-0 gap-1">
                                                <IndianRupee size={15} className="inline" />
                                                <p className="font-semibold text-sm md:text-base"> {(product?.price * item.quantity).toLocaleString("en-IN")}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="border mt-5 bg-cream border-gray-300 rounded-md md:col-span-2 p-5 xl:col-span-1">
                            <div className="md:text-sm text-xs font-sans md:pb-4 text-zinc-800 font-semibold flex items-center justify-between">
                                <div>Subtotal</div>
                                <div className="flex items-center gap-1"><IndianRupee size={15} /> {subtotal.toLocaleString("en-IN")}</div>
                            </div>
                            <div className="md:text-sm text-xs font-sans py-2 text-zinc-800 font-semibold flex items-center justify-between">
                                <div>Shipping</div>
                                <div className="flex items-center gap-1">{shippingCost === 0 ? "Free" : <span className="flex items-center gap-1"><IndianRupee size={15} className="inline" /> {shippingCost} </span>}</div>
                            </div>
                            <div className="font-serif md:font-sans mt-2 pt-2 border-gray-300 border-t md:pt-4  md:mt-3 text-zinc-800 font-medium text-xl md:font-semibold flex items-center justify-between">
                                <div>Total</div>
                                <div className="flex items-center gap-1"><IndianRupee size={15} /> {(subtotal + shippingCost).toLocaleString("en-IN")}
                                </div>
                            </div>
                            <p className="text-[0.625rem] mt-2 text-gray-700 md:mt-4">
                                Tax included and shipping calculated at checkout
                            </p>

                            <button className="bg-black text-white text-sm md:text-xs lg:text-sm w-full transition-all hover:scale-102 active:scale-99 duration-300 rounded-md cursor-pointer px-6 py-3 mt-4 md:mt-6 hover:bg-zinc-800 flex items-center justify-center"
                                onClick={() => navigate("/checkout")}
                            >
                                <span>CHECKOUT</span> <ArrowRight size={16} className="inline ml-2" />
                            </button>
                            <button className="bg-cream w-full tracking-wider border rounded-md hover:scale-102 font-semibold text-black text-xs xl:text-sm py-3 mt-4 hover:bg-hover cursor-pointer transition-all duration-300 flex items-center justify-center"
                                onClick={() => navigate("/products")}
                            >
                                CONTINUE SHOPPING
                            </button>
                            <div className="text-sm text-gray-600 grid grid-cols-3 md:grid-cols-1">
                                {keyPoints.map((point) => (
                                    <div key={point.title} className="md:flex pt-1 items-center gap-4 mt-4">
                                        <point.icon size={20} className="flex md:inline md:w-auto justify-center w-full items-center" />
                                        <div className="flex flex-col gap-1 md:text-left text-center">
                                            <p className="text-xs font-medium">{point.title}</p>
                                            <p className="text-xs text-gray-600">{point.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mt-10">
                            <p className="font-serif text-2xl md:text-3xl lg:text-4xl">You May Also Like</p>
                            <button
                                onClick={() => navigate("/products")}
                                className="text-sm text-gray-600 hover:text-black transition-all hover:gap-3 px-2 duration-300 cursor-pointer flex items-center gap-2">
                                <span>View all</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-5">
                            {recommendedProducts.map((product) => (
                                <div key={product.id}>
                                    <ProductsCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 