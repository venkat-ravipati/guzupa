import { useMemo, useState } from "react";
import ProductsCard from "../../Components/Product/ProductsCard";
import products from "../../products"
import { Minus, Plus, SlidersHorizontal } from "lucide-react"
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";
import * as Slider from "@radix-ui/react-slider";
import { useSearchParams } from "react-router";
import { menLinks, womenLinks } from "../../data/categories";
import { useParams } from "react-router";

export default function Products() {
  //  const [openFilters, setOpenFilters] = useState(true);
    const [openfilter, setOpenFilter] = useState({ subCategory: true, color: false, size: false, range: false, brand: false })
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    type FilterSection = keyof typeof openfilter;

    // const [selectedBrand, setSelectedBrand] = useState<string[]>([])
    // const [selectedColors, setSelectedColors] = useState<string[]>([])
    // const [selectedSize, setSelectedSize] = useState<string[]>([])
    // const [sortBy, setSortBy] = useState("Featured");
    // const [selectedCategories, setSelectedCategories] = useState<string[]>([])


    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sort") || "Featured";
    const selectedCategories = searchParams.get("category") ? [searchParams.get("category")] : [];
    const selectedColors = searchParams.getAll("color");
    const selectedSize = searchParams.getAll("size");
    const selectedBrand = searchParams.getAll("brand");

    const { gender, subCategory } = useParams();
    const menCategoryLabels = menLinks.map((link) => link.label);
    const womenCategoryLabels = womenLinks.map((link) => link.label);
    const genderCategoryLabels = gender === "women" ? womenCategoryLabels : menCategoryLabels;

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
    }, [searchParams, products,])

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter((product) => {
            const matchesCategory = selectedCategories.length == 0 || selectedCategories.includes(product.subCategory)
            const matchesColor = selectedColors.length == 0 || product.colors.some((color) => selectedColors.includes(color))
            const matchesSize = selectedSize.length == 0 || product.sizes.some((size) => selectedSize.includes(size))
            const discountPrice = getDiscountedPrice(product.price, product.discount)
            const matchesPrice = discountPrice >= priceRange.min && discountPrice <= priceRange.max;
            const matchesBrand = selectedBrand.length == 0 || selectedBrand.includes(product.brand);
            const matchesGender = gender === undefined || product.category.toLowerCase() === gender.toLowerCase();
            const matchesRouteSubCategory = subCategory === undefined || product.subCategory.toLowerCase() === subCategory.toLowerCase();
            return matchesCategory && matchesColor && matchesSize && matchesPrice && matchesBrand && matchesGender && matchesRouteSubCategory
        });
    }, [sortedProducts, searchParams, priceRange, gender, subCategory]);

    function getCategoryCount(category: string): number {
        if (category === "All") return products.length;
        return products.filter((p) => p.subCategory === category).length;
    }

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
        <section className="bg-cream pt-13">
            <div className="md:px-10 px-5 md:pt-6 pt-3 text-xs font-sans font-bold text-zinc-700"><span className="pr-2">Shop</span> / <span className="pl-2">All</span></div>
            <div className="bg-cream grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-1 p-5 md:p-4 border-r border-gray-300">
                    <div className="font-serif text-4xl lg:text-6xl md:px-6 md:pt-4">All</div>
                    <p className="font-sans font-medium text-xs text-zinc-700 md:px-6 py-2">Timeless garments designed<br />with precision</p>
                    <div className="md:block hidden mx-6 mt-3 border-t border-gray-300">
                        <div className="flex items-center justify-between py-2">
                            <p className="text-gray-800 text-xs font-bold tracking-wider">FILTERS</p>
                            <button className="text-xs lg:text-xs text-zinc-800 hover:bg-hover transition-transform transform duration-300 rounded-md hover:font-medium  cursor-pointer px-2 py-1 font-light tracking-wide" onClick={() => clearFilter()}>Clear All</button>
                        </div>
                        <div>
                            <div className="border-b border-gray-300 pb-2">
                                <div className="text-xs text-black font-bold flex items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("subCategory")}><p>Category</p>{openfilter.subCategory ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                                {openfilter.subCategory && categories.map((category) =>
                                (
                                    <div key={category} onClick={() => toggleCategory(category)} className={`text-xs hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${(category === "All" ? selectedCategories.length == 0 : selectedCategories.includes(category)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                        <p>{category}</p>
                                        <p>{getCategoryCount(category)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-b border-zinc-300 py-2 mt-1">
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer transition-all duration-300 justify-between" onClick={() => toggleSection("color")}><p>COLOR</p>{openfilter.color ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                                {openfilter.color && colors.map((color) => (
                                    <p key={color} onClick={() => toggleColor(color)} className={`text-xs hover:bg-hover rounded-md cursor-pointer mt-1  hover:text-black py-1 px-2 items-center flex w-full ${(selectedColors.includes(color)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}><span className="border w-3 h-3 block overflow-hidden mr-2 rounded-full" style={{ backgroundColor: color }} />{color}</p>
                                ))}
                            </div>
                            <div className="border-b border-gray-300 py-2">
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("size")}><p>SIZE</p>{openfilter.size ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                                <div className="grid md:grid-cols-4 grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-1">
                                    {openfilter.size && sizes.map((size) =>
                                    (
                                        <p key={size} onClick={() => toggleSize(size)} className={`text-xs flex justify-center border border-gray-300 tracking-wider rounded-md cursor-pointer mt-3 py-1 px-2 w-full ${(selectedSize.includes(size)) ? "text-white bg-black font-bold" : "text-zinc-600 font-medium hover:text-black hover:bg-hover"}`}>
                                            {size}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="border-b border-gray-300 py-2">
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("range")}><p>RANGE</p>{openfilter.range ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
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
                            <div className="border-b border-gray-300 py-2">
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("brand")}><p>Brand</p>{openfilter.brand ? (<Minus size={16} />) : (<Plus size={16} />)}</div>
                                {openfilter.brand && brands.map((brand) =>
                                (
                                    <p key={brand} onClick={() => toggleBrand(brand)} className={`text-xs hover:bg-hover rounded-md cursor-pointer mt-1 hover:text-black py-1 px-2 w-full ${(selectedBrand.includes(brand)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                        {brand}
                                    </p>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="px-4 md:px-10">
                        <div className="flex justify-between md:py-5 items-center">
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
                        <div className="grid md:grid-cols-3 grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
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
        </section>
    )
}