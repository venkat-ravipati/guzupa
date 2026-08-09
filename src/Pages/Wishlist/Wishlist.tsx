import { useWishlist } from "../../context/WishlistContext"
import { useNavigate } from "react-router";
import products from "../../products";
import { ArrowRight, Heart, IndianRupee, Trash2 } from "lucide-react";
import wishlistEmptyImg from "../../assets/images/CategorySection/wishlistEmptyImg.webp";
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";
import { AnimatePresence, motion } from "motion/react";

export default function Wishlist() {
    const { wishlistItems, removeFromWishlist, isInWishlist } = useWishlist();
    const navigate = useNavigate();

    const wishlistProducts = wishlistItems.map((id) => products.find((p) => p.id === id)).filter((p) => p !== undefined);

    const recommendedProducts = products.filter((p) => !wishlistItems.includes(p.id)).slice(0, 4);
    return (
        <div className="pt-13 bg-cream">
            <p className="text-xs md:text-sm text-gray-800 font-medium px-6 md:ml-6 lg:px-14 pt-6 lg:pt-7">
                <span className="mr-1">Shop</span> / <span className="px-1">Wishlist</span>
            </p>
            <div className="text-3xl md:text-5xl font-serif px-6 md:px-13 lg:px-19 pt-3 md:pt-5">
                Your wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
            </div>

            {wishlistItems.length === 0 ? (
                <div className="px-6 md:px-13 lg:px-19 pt-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm md:text-base">
                            <span className="font-bold">Looks like your wishlist is empty.</span><br />
                            <span className="font-medium text-zinc-500">Start adding the pieces you love.</span>
                        </p>
                        <button onClick={() => navigate("/products")} className="py-3 px-5 cursor-pointer hover:bg-zinc-800 hidden md:flex items-center justify-center gap-2 rounded-md bg-black text-white text-sm tracking-wide uppercase">Continue Shopping <ArrowRight size={16} className="inline" /></button>
                    </div>
                    <div className="relative h-110 md:h-110 lg:h-130 xl:h-140 my-5 rounded-md w-full overflow-hidden">
                        <img src={wishlistEmptyImg} className="absolute object-bottom object-cover w-full h-full" alt="wishlist Empty Image" />
                        <div className="absolute top-0 flex flex-col items-center w-full justify-center">
                            <div className="pt-7 text-zinc-600"><Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-12 lg:h-12" /></div>
                            <div className="flex flex-col font-serif text-4xl py-3 items-center justify-center"><p>Save the pieces</p><p>you love</p></div>
                            <p className="font-sans mb-2 text-center text-sm tracking-wide font-medium text-zinc-600">Add items to your wishlist and they'll <br />be waiting for you here.</p>
                            <button onClick={() => navigate("/collections")} className="py-3 px-5 cursor-pointer hover:bg-zinc-800 flex items-center justify-center gap-2 mt-4 rounded-md bg-black text-white text-sm tracking-wide uppercase">EXPLORE COLLECTIONS</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-6 md:px-19 pt-3">
                    <div className="text-base font-medium text-zinc-700">Pieces you love, saved for later.</div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 py-5">
                        <AnimatePresence>
                            {wishlistProducts.map((product) => (
                            <motion.div 
                            layout
                            key={product.id} 
                            initial={{opacity:0 ,y:30}}
                            animate={{opacity:1 ,y:0}}
                            exit={{opacity:0 ,scale:0.5}}
                            transition={{type:"tween", duration:0.3, ease:"easeOut"}}
                            onClick={() => navigate(`/product/${product.id}`)} 
                            className="cursor-pointer">
                                <div className="relative h-50 md:h-60 lg:h-70 xl:h-90 w-full overflow-hidden rounded-t-xl">
                                    <img src={product.image} alt={product.name} className="absolute h-full w-full object-top object-cover" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFromWishlist(product.id) }}
                                        className={`absolute top-2 lg:top-5 right-2 lg:right-5 p-2 border rounded-full cursor-pointer transition-all duration-300 ${isInWishlist(product.id) ? "bg-black text-white" : "bg-white text-black"} `}
                                    ><Heart className="h-3 w-3 md:h-4 md:w-4" /></button>
                                    <button className="absolute bottom-2 right-2 lg:bottom-5 lg:right-5 bg-white p-2 rounded-full text-zinc-600 hover:text-black cursor-pointer" onClick={(e) => { e.stopPropagation(); removeFromWishlist(product.id) }}><Trash2 size={16} /></button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="px-1">
                                        <p className="text-sm md:text-base font-medium tracking-wide py-1">{product.name}</p>
                                        <div className="flex items-center text-sm md:text-base"><IndianRupee size={15} /> <p className="md:ml-1 font-medium">{product.price.toLocaleString("en-IN")}</p></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                    <div className="mt-10">
                        <div className="flex items-center justify-between">
                            <p className="font-serif text-2xl md:text-3xl">You May Also Like</p>
                            <button
                                onClick={() => navigate("/products")}
                                className="text-sm text-gray-600 hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-2"
                            >
                                View all <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
                            {recommendedProducts.map((product) => (
                                <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="w-full cursor-pointer">
                                    <div className="relative aspect-4/5 overflow-hidden">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
                                        {product.newArrivals ? (
                                            <span className="absolute top-2 left-2 bg-cream text-black text-[10px] font-bold border border-gray-300 px-2 py-1 rounded uppercase tracking-wide">
                                                New
                                            </span>
                                        ) : product.bestseller ? (
                                            <span className="absolute top-2 left-2 bg-cream text-black text-[10px] font-bold border border-gray-300 px-2 py-1 rounded uppercase tracking-wide">
                                                Bestseller
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className="pt-2 px-1 mb-5">
                                        <p className="font-sans font-medium text-xs md:font-bold md:text-sm">{product.name}</p>
                                        {product.discount > 0 ? <div className="flex pt-1 items-center text-xs md:text-sm font-medium"><IndianRupee className="mr-1" size={15} /><span>{getDiscountedPrice(product.price, product.discount).toLocaleString("en-IN")}</span><span className="line-through pl-2">{product.price.toLocaleString("en-IN")}</span></div> : <div className="flex items-center"><IndianRupee className="mr-1" size={15} /><span>{product.price.toLocaleString("en-IN")}</span></div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}