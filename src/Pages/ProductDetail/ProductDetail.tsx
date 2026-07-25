import { useNavigate, useParams } from "react-router";
import type { Product } from "../../types/product";
import { useEffect, useState } from "react";
import products from "../../products";

export default function ProductDetail() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [fullscreenImage, setFullscreenImage] = useState<number | null>(null);
    const product = products.find((p) => p.id === Number(id));

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

    return (
        <div className="pt-13 bg-cream">
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
                <div className="bg-gray-50 h-96">{/* info panel goes here later */}</div>
            </div>
            {fullscreenImage !== null && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setFullscreenImage(null)}
                >
                    <button
                        onClick={(e) => { e.stopPropagation(); previousImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
                    >
                        ←
                    </button>
                    <img
                        src={product.images[fullscreenImage]}
                        alt="Fullscreen"
                        className="max-w-full max-h-full"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
                    >
                        →
                    </button>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-black text-sm">
                        {fullscreenImage! + 1} / {product.images.length}
                    </div>
                </div>
            )}
        </div>
    )
}