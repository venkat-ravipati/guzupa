import { Heart, IndianRupee } from "lucide-react";
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";

type Product = {
    id: number;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    discount: number;
    brand: string;
    rating: number;
    stock: number;
    sizes: string[];
    colors: string[];
    image: string;
    description: string;
    newArrivals: boolean;
};

type ProductCardProps = {
    product: Product;
}

export default function ProductsCard({ product }: ProductCardProps) {
    const discountedPrice = getDiscountedPrice(product.price, product.discount)

    return (
        <div className="md:w-45 w-40 lg:w-60 m-auto py-3">
            <div className="relative w-40 lg:h-80 h-60 md:w-45 lg:w-60">
                <img src={product.image} loading="lazy" className="w-full object-cover rounded-md h-full" alt={product.name} />
                <span className="absolute top-2 right-2 rounded-full p-2 bg-cream cursor-pointer hover:bg-black hover:text-white"><Heart size={18} /></span>
            </div>
            <div className="py-2 px-3">
                <p className="font-sans font-bold text-sm">{product.name}</p>
                <div className="text-zinc-500 font-medium text-sm py-1">
                    {product.discount > 0 ? <div className="flex items-center"><IndianRupee className="mr-0.5" size={12} /><span>{discountedPrice}</span><span className="line-through pl-2">{product.price}</span></div> : <div className="flex items-center"><IndianRupee className="mr-0.5" size={12} /><span>{product.price}</span></div>}
                </div>
                <div className="flex py-1">
                    {product.colors.map((color , index) => (
                        <div key={index} className="p-1.5 border border-zinc-800 mr-2 rounded-full" style={{ background: color }} />
                    ))}
                </div>
            </div>
        </div>
    )
}