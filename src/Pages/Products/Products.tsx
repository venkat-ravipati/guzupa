import { useMemo, useState } from "react";
import ProductsCard from "../../Components/Product/ProductsCard";
import products from "../../products"

export default function Products() {
    const [sortBy, setSortBy] = useState("Featured");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const categories = ["All", "Shirts", "T-Shirts", "Knitwear", "Outerwear", "Trousers", "Shorts"];

    const sortedProducts = useMemo(() => {
        if (sortBy == "Price: Low to High") {
            return [...products].sort((a, b) => a.price - b.price);
        } else if (sortBy == "Price: High to Low") {
            return [...products].sort((a, b) => b.price - a.price);
        } else {
            return [...products]
        }
    }, [sortBy, products])

    function toggleCategory(category: string) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(prev => prev.filter((c) => c !== category))
        } else {
            setSelectedCategories(prev => [...prev, category])
        }
    }

    return (
        <div className="mb-100 pt-13 grid grid-cols-5">
            <div className="col-span-1">
                <div>
                    {categories.map((category, index) =>
                    (
                        <div key={index}>
                            <p>{category}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-4">
                <div className="p-7">
                    <div className="font-serif text-4xl py-4">Shop All</div>
                    <p className="font-sans text-sm text-zinc-800">Timeless garments designed with precision</p>
                    <div className="flex justify-between py-5 items-center">
                        <div className="text-sm font-medium text-zinc-800">{products.length} Iteams</div>
                        <div>
                            <span className="font-light tracking-wider px-2 text-xs">SORT BY</span>
                            <select value={sortBy} className="w-auto border-gray-300 border text-xs p-2 focus:outline-none focus:ring-0" onChange={(e) => setSortBy(e.target.value)}>
                                <option value="Featured" >Featured</option>
                                <option value="Price: Low to High">Price: Low to High</option>
                                <option value="Price: High to Low">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4">
                        {sortedProducts.map((product) => {
                            return (
                                <div key={product.id}>
                                    <ProductsCard product={product} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}