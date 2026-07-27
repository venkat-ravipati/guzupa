export type Product = {
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
    images: string[];
    description: string;
    newArrivals: boolean;
    bestseller: boolean;
};