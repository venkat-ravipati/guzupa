import { Heart } from "lucide-react";
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
    product : Product;
}

export default function ProductsCard({product}: ProductCardProps) {
    const discountedPrice  = getDiscountedPrice(product.price , product.discount)

    return (
        <div className="w-40 lg:w-50 py-3">
            <div className="relative lg:h-70 h-60 w-40 lg:w-50">
                <img src={product.image} className="w-full object-cover h-full" alt={product.name}/>
                <span className="absolute top-2 right-2 rounded-full p-2 bg-stone-200"><Heart size={18}/></span>
            </div>
            <div className="py-2 border border-gray-300 px-3">
                <p className="font-sans font-medium text-sm">{product.name}</p>
                {product.discount > 0 ? <div><span>{discountedPrice}</span><span className="line-through pl-3">{product.price}</span></div> : <div>{product.price}</div>}
            </div>
        </div>
    )
}