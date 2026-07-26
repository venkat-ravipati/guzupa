import { useNavigate, useParams } from "react-router";
import type { Product } from "../../types/product";
import { useEffect, useState } from "react";
import products from "../../products";
import { ArrowLeft, ArrowRight, Heart, IndianRupee } from "lucide-react";
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";
import { allSizes } from "../../data/sizes";
import ProductsCard from "../../Components/Product/ProductsCard";
import { motion } from "motion/react";

export default function ProductDetail() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);
    const product = products.find((p) => p.id === Number(id));
    const [colorName, setColorName] = useState(product?.colors[0] ?? "");
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? "");
    const [selectedWishlist, setSelectedWishlist] = useState(false)
    const [showShipping, setShowShipping] = useState(false);

    useEffect(() => {
        if (!product) {
            navigate("/products")
        }
    }, [product, navigate])

    if (!product) {
        return null;
    }

    const nextImage = () => {
        if (fullscreenImage === null) return;
        setFullscreenImage((fullscreenImage + 1) % product.images.length);
    };

    const previousImage = () => {
        if (fullscreenImage === null) return;
        setFullscreenImage((fullscreenImage - 1 + product.images.length) % product.images.length);
    };

    const relatedProducts = products
        .filter((p) => p.subCategory === product.subCategory && p.id !== product.id)
        .slice(0, 4);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="pt-13 bg-cream">
            <div className="px-8 md:px-12 lg:px-20 pt-6 text-xs font-sans text-zinc-600 flex gap-2">
                <span>Shop</span>
                <span>/</span>
                <span>{product.subCategory}</span>
                <span>/</span>
                <span className="text-black">{product.name}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-8 md:px-12 lg:px-20 py-8">
                <div className="col-span-2">
                    <div className="h-auto">
                        <img src={product.images[0]} onClick={() => setFullscreenImage(0)} className="w-full h-full" alt="product image 1" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 my-2 w-full">
                        <img src={product.images[1]} onClick={() => setFullscreenImage(1)} className="h-full" alt="product image 2" />
                        <img src={product.images[2]} onClick={() => setFullscreenImage(2)} className="h-full" alt="product image 3" />
                    </div>
                    <div className="md:h-60 h-60 lg:h-90 xl:h-140 2xl:h-150 overflow-hidden w-full">
                        <img src={product.images[3]} onClick={() => setFullscreenImage(3)} className="w-full object-cover object-center" alt="product image 4" />
                    </div>
                </div>
                <div className="col-span-1 px-2">
                    <div className="md:sticky top-13">
                        <p className="text-xs tracking-widest py-4 text-zinc-500 uppercase">
                            {product.subCategory}
                        </p>
                        <h1 className="font-serif text-4xl md:text-5xl mt-2">
                            {product.name}
                        </h1>
                        <div className="mt-4 text-xl font-medium flex items-baseline">
                            {product.discount > 0 ? <div className="flex items-center"><IndianRupee className="mr-1" size={15} /><span>{getDiscountedPrice(product.price, product.discount)}</span><span className="line-through pl-2">{product.price}</span></div> : <div className="flex items-center"><IndianRupee className="mr-1" size={15} /><span>{product.price}</span></div>}
                            <div className="text-sm text-zinc-600 px-3">MRP incl. of all taxes</div>
                        </div>
                        <p className="mt-5 text-sm font-medium tracking-wide text-zinc-700">
                            {product.description}
                        </p>
                        <div>
                            <div className="flex justify-between text-sm items-center mt-6">
                                <p className="text-zinc-600 tracking-widest">COLOUR</p>
                                <p>{colorName}</p>
                            </div>
                            <div className="flex">
                                {product.colors.map((color) => {
                                    return (
                                        <button key={color} onClick={() => setColorName(color)} className={`p-4 mr-2 cursor-pointer rounded-full border border-gray-300 my-3 ${(color == colorName) && "ring-1 ring-offset-2 ring-black"} `} aria-label={color} style={{ background: color }} />
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mt-4 text-sm items-center">
                                <p className="text-zinc-600 tracking-widest">SIZE</p>
                                <p className="tracking-widest">{selectedSize}</p>
                            </div>
                            <div className="flex">
                                {allSizes.map((size) => {
                                    const isAvailable = product.sizes.includes(size);
                                    return (
                                        <button
                                            key={size}
                                            disabled={!isAvailable}
                                            onClick={() => isAvailable && setSelectedSize(size)}
                                            className={`px-4 py-2 mr-2 rounded-sm border my-3 ${!isAvailable
                                                ? "text-zinc-300 border-gray-300 line-through cursor-not-allowed"
                                                : size === selectedSize
                                                    ? "text-white bg-black cursor-pointer"
                                                    : "cursor-pointer"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <p className="text-sm text-zinc-600 mt-2">
                            {product.stock > 0 ? "In stock · Ships in 7-10 days" : "Out of stock"}
                        </p>
                        <div className="flex gap-3 mt-6">
                            <button
                                disabled={product.stock === 0}
                                className={`flex-1 py-4 text-sm tracking-widest uppercase transition ${product.stock === 0
                                    ? "bg-hover border border-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-black text-white cursor-pointer hover:bg-zinc-800"
                                    }`} onClick={() => alert("Cart coming soon")}
                            >
                                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                            <button onClick={() => setSelectedWishlist(prev => !prev)} className={`w-14 border border-gray-300 flex items-center justify-center cursor-pointer  ${selectedWishlist ? "bg-black text-white" : "hover:bg-hover"}`}>
                                <Heart size={20} />
                            </button>
                        </div>
                        <div className="border-t border-gray-300 mt-6 pt-4">
                            <button
                                onClick={() => setShowShipping((prev) => !prev)}
                                className="flex justify-between w-full cursor-pointer items-center text-sm font-medium"
                            >
                                <span>Shipping & Returns</span>
                                <span>{showShipping ? "-" : "+"}</span>
                            </button>
                            {showShipping && (
                                <div className="mt-3 text-sm text-zinc-600 space-y-2">
                                    <p>Shipped from our Bengaluru Guzupa. Complimentary express delivery across India, 7-10 working days. Returns and exchanges are free within 7 days of receipt.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <section className="px-8 md:px-12 lg:px-20 py-10 border-t border-gray-300">
                <div className="flex justify-between items-center">
                    <h2 className="font-serif text-2xl md:text-3xl mb-6">You May Also Like</h2>
                    <button className="font-serif hover:text-gray-500 text-xl cursor-pointer underline" onClick={() => navigate(`/products/?category=${product.subCategory}`)}>view All</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.map((p) => (
                        <ProductsCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            {fullscreenImage !== null && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setFullscreenImage(null)}
                >
                    <button
                        onClick={(e) => { e.stopPropagation(); previousImage(); }}
                        className="absolute left-4 top-1/2 bg-cream p-2 text-black cursor-pointer -translate-y-1/2 rounded-full text-3xl"
                    >
                        <ArrowLeft className="hover:pr-1 transition-all duration-300" size={25} />
                    </button>
                    <img
                        src={product.images[fullscreenImage]}
                        alt="Fullscreen"
                        className="max-w-full max-h-full"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black bg-cream p-2 cursor-pointer rounded-full text-3xl"
                    >
                        <ArrowRight className="hover:pl-1 transition-all duration-300" size={25} />
                    </button>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm">
                        {fullscreenImage + 1} / {product.images.length}
                    </div>
                </div>
            )}
        </motion.div>
    )
}