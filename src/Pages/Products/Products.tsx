import { useMemo, useState } from "react";
import ProductsCard from "../../Components/Product/ProductsCard";
import products from "../../products"
import { Minus, Plus, SlidersHorizontal } from "lucide-react"
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";
import * as Slider from "@radix-ui/react-slider";
import { useSearchParams } from "react-router";

export default function Products() {
    // const [sortBy, setSortBy] = useState("Featured");
    // const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [openFilters, setOpenFilters] = useState(true);
    const [openfilter, setOpenFilter] = useState({ subCategory: true, color: true, size: true, range: true, brand: true })
    // const [selectedColors, setSelectedColors] = useState<string[]>([])
    // const [selectedSize, setSelectedSize] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    // const [selectedBrand, setSelectedBrand] = useState<string[]>([])
    type FilterSection = keyof typeof openfilter;

    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sort") || "Featured";
    const selectedCategories = searchParams.get("category") ? [searchParams.get("category")] : [];
    const selectedColors = searchParams.getAll("color");
    const selectedSize = searchParams.getAll("size");
    const selectedBrand = searchParams.getAll("brand");

    const toggleSection = (section: FilterSection) => {
        setOpenFilter((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    const categories = ["All", "Shirts", "T-Shirts", "Jackets", "Knitwear", "Outerwear", "Trousers", "Baggys"];
    const colors = ["Black", "White", "Navy", "Grey", "Blue", "Light Blue", "Green", "Olive"]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    const brands = ["Urban Wear", "Modern Fit", "Polo Club", "Winter Co", "Street Wear", "Denim Co", "Urban Denim"]

    const sortedProducts = useMemo(() => {
        if (sortBy == "Price: Low to High") {
            return [...products].sort((a, b) => a.price - b.price);
        } else if (sortBy == "Price: High to Low") {
            return [...products].sort((a, b) => b.price - a.price);
        } else {
            return [...products]
        }
    }, [searchParams, products])

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter((product) => {
            const matchesCategory = selectedCategories.length == 0 || selectedCategories.includes(product.subCategory)
            const matchesColor = selectedColors.length == 0 || product.colors.some((color) => selectedColors.includes(color))
            const matchesSize = selectedSize.length == 0 || product.sizes.some((size) => selectedSize.includes(size))
            const discountPrice = getDiscountedPrice(product.price, product.discount)
            const matchesPrice = discountPrice >= priceRange.min && discountPrice <= priceRange.max;
            const matchesBrand = selectedBrand.length == 0 || selectedBrand.includes(product.brand);
            return matchesCategory && matchesColor && matchesSize && matchesPrice && matchesBrand
        });
    }, [sortedProducts, searchParams, priceRange]);

    function toggleCategory(category: string) {
        const newParams = new URLSearchParams(searchParams);
        if (category === "All") {
            newParams.delete("category");
        } else if (selectedCategories.includes(category)) {
            newParams.delete("category");
        } else {
            newParams.set("category", category);
        }
        setSearchParams(newParams)
    }
    function toggleColor(color: string) {
        const newParams = new URLSearchParams(searchParams);
        const newColor = selectedColors.includes(color) ? selectedColors.filter((c) => c !== color) : [...selectedColors, color];
        newParams.delete("color");
        newColor.forEach((c) => newParams.append("color", c))
        setSearchParams(newParams)
    }
    function toggleSize(size: string) {
        const newParams = new URLSearchParams(searchParams)
        const clothSizes = selectedSize.includes(size) ? selectedSize.filter((s) => s !== size) : [...selectedSize, size]
        newParams.delete("size");
        clothSizes.forEach((size) => newParams.append("size", size))
        setSearchParams(newParams);
    }
    function toggleBrand(brand: string) {
        const newParams = new URLSearchParams(searchParams);
        const brands = selectedBrand.includes(brand) ? selectedBrand.filter((b) => b !== brand) : [...selectedBrand, brand]

        newParams.delete("brand");
        brands.forEach((b) => newParams.append("brand", b))
        setSearchParams(newParams)
    }
    function clearFilter() {
        setSearchParams({});
        setPriceRange({ min: 0, max: 5000 })
    }

    return (
        <div className="mb-100 pt-13 bg-cream grid grid-cols-1 md:grid-cols-5">
            <div className="col-span-1 p-4 md:block hidden">
                <div className="mt-13 md:flex items-center cursor-pointer justify-between border px-3 py-2 border-gray-300 hover:bg-stone-300 transition-all duration-300" onClick={() => setOpenFilters(prev => !prev)}>
                    <p className="text-gray-800 text-sm font-bold tracking-wider">FILTERS</p>
                    <SlidersHorizontal className="text-gray-600" size={15} />
                </div>
                {openFilters && <div>
                    <button className="text-xs lg:text-sm text-zinc-800 hover:bg-stone-300 transition-all duration-300 rounded-md m-1 hover:font-bold cursor-pointer px-3 py-2 font-medium tracking-wider" onClick={() => clearFilter()}>CLEAR ALL</button>
                    <div className="border border-zinc-300 p-2 mt-1">
                        <div className="text-xs text-zinc-800 font-bold flex  items-center tracking-widest cursor-pointer pb-1 transition-all duration-300 justify-between" onClick={() => toggleSection("subCategory")}><p>CATEGORY</p>{openfilter.subCategory ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                        {openfilter.subCategory && categories.map((category) =>
                        (
                            <p key={category} onClick={() => toggleCategory(category)} className={`text-sm hover:bg-stone-300 rounded-md cursor-pointer mt-1 hover:text-black py-1 px-2 w-full ${(category === "All" ? selectedCategories.length == 0 : selectedCategories.includes(category)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                {category}
                            </p>
                        ))}
                    </div>
                    <div className="border-r border-l border-zinc-300 p-2">
                        <div className="text-xs tracking-widest text-zinc-800 font-bold flex  items-center cursor-pointer pb-1 transition-all duration-300 justify-between" onClick={() => toggleSection("color")}><p>COLOR</p>{openfilter.color ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                        {openfilter.color && colors.map((color) => (
                            <p key={color} onClick={() => toggleColor(color)} className={`text-sm hover:bg-stone-300 rounded-md cursor-pointer mt-1  hover:text-black py-1 px-2 items-center flex w-full ${(selectedColors.includes(color)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}><span className="border w-3 h-3 block overflow-hidden mr-2 rounded-full" style={{ backgroundColor: color }} />{color}</p>
                        ))}
                    </div>
                    <div className="border border-zinc-300 p-2">
                        <div className="text-xs text-zinc-800 font-bold flex  items-center tracking-widest cursor-pointer pb-1 transition-all duration-300 justify-between" onClick={() => toggleSection("size")}><p>SIZE</p>{openfilter.size ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                        <div className="">
                            {openfilter.size && sizes.map((size) =>
                            (
                                <p key={size} onClick={() => toggleSize(size)} className={`text-sm hover:bg-stone-300 rounded-md cursor-pointer mt-1 hover:text-black py-1 px-2 w-full ${(selectedSize.includes(size)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                    {size}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="border-r border-l border-zinc-300 p-2">
                        <div className="text-xs text-zinc-800 font-bold flex  items-center tracking-widest cursor-pointer pb-1 transition-all duration-300 justify-between" onClick={() => toggleSection("range")}><p>RANGE</p>{openfilter.range ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                        {openfilter.range && (<div className="py-1">
                            <div className="flex justify-between text-sm">
                                <p>{priceRange.min}</p>
                                <p>{priceRange.max}</p>
                            </div>
                            <div className="pt-1">
                                <Slider.Root
                                    className="relative flex items-center w-full h-6"
                                    min={0}
                                    max={5000}
                                    step={10}
                                    value={[priceRange.min, priceRange.max]}
                                    onValueChange={(newValues) => {
                                        setPriceRange({ min: newValues[0], max: newValues[1] });
                                    }}
                                >
                                    <Slider.Track className="bg-gray-200 relative flex-1 rounded-full h-1">
                                        <Slider.Range className="absolute bg-black rounded-full h-full" />
                                    </Slider.Track>
                                    <Slider.Thumb className="block w-4 h-4 bg-black rounded-full cursor-pointer" />
                                    <Slider.Thumb className="block w-4 h-4 bg-black rounded-full cursor-pointer" />
                                </Slider.Root>
                            </div>
                        </div>)}
                    </div>
                    <div className="border border-zinc-300 p-2">
                        <div className="text-xs text-zinc-800 font-bold flex  items-center tracking-widest cursor-pointer pb-1 transition-all duration-300 justify-between" onClick={() => toggleSection("brand")}><p>Brand</p>{openfilter.brand ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                        {openfilter.brand && brands.map((brand) =>
                        (
                            <p key={brand} onClick={() => toggleBrand(brand)} className={`text-sm hover:bg-stone-300 rounded-md cursor-pointer mt-1 hover:text-black py-1 px-2 w-full ${(selectedBrand.includes(brand)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                {brand}
                            </p>
                        ))}
                    </div>

                </div>}
            </div>
            <div className="col-span-4">
                <div className="p-4 md:p-7">
                    <div className="font-serif text-4xl lg:text-6xl py-4">Shop All</div>
                    <p className="font-sans text-sm text-zinc-800">Timeless garments designed with precision</p>
                    <div className="flex justify-between py-5 items-center">
                        <div className="text-sm font-medium text-zinc-800">{filteredProducts.length} Items</div>
                        <div>
                            <span className="font-light tracking-wider px-2 text-xs">SORT BY</span>
                            <select value={sortBy} className="w-auto border-gray-300 border text-xs p-2 focus:outline-none focus:ring-0" onChange={(e) => {
                                const newParams = new URLSearchParams(searchParams);
                                newParams.set("sort", e.target.value);
                                setSearchParams(newParams);
                            }}>
                                <option value="Featured" className="bg-cream hover:bg-stone-300">Featured</option>
                                <option value="Price: Low to High" className="bg-cream hover:bg-stone-300">Price: Low to High</option>
                                <option value="Price: High to Low" className="bg-cream hover:bg-stone-300">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="flex md:hidden items-center cursor-pointer justify-between border px-3 py-2 border-gray-300 hover:bg-gray-100 transition-all duration-300" onClick={() => setOpenFilters(prev => !prev)}>
                        <p className="text-gray-800 text-sm font-bold tracking-wider">FILTERS</p>
                        <SlidersHorizontal className="text-gray-600" size={15} />
                    </div> */}
                    <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                        {filteredProducts.map((product) => {
                            return (
                                <div key={product.id} className="py-2">
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