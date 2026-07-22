import { useMemo, useState } from "react";
import ProductsCard from "../../Components/Product/ProductsCard";
import products from "../../products"
import { SlidersHorizontal, X, ChevronDown } from "lucide-react"
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";
import * as Slider from "@radix-ui/react-slider";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { menLinks, womenLinks } from "../../data/categories";
import { motion, AnimatePresence } from "motion/react";

export default function Products() {
    const [openFilters, setOpenFilters] = useState(false);
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
    const navigate = useNavigate();

    const { gender, subCategory } = useParams();
    const menCategoryLabels = menLinks.map((link) => link.label);
    const womenCategoryLabels = womenLinks.map((link) => link.label);
    const genderCategoryLabels = gender === "women" ? womenCategoryLabels : menCategoryLabels;
    const genderLinks = gender === "women" ? womenLinks : menLinks;

    const toggleSection = (section: FilterSection) => {
        setOpenFilter((prev) => ({ ...prev, [section]: !prev[section] }))
    }

    const toggleMobileSection = (section: FilterSection) => {
        setOpenFilter((prev) => ({
            subCategory: false,
            color: false,
            size: false,
            range: false,
            brand: false,
            [section]: !prev[section],
        }));
    };

    const categories = ["All", "New Arrivals", "Shirts", "T-Shirts", "Jackets", "Knitwear", "Jeans", "Trousers", "Baggys"];
    const colors = ["Black", "White", "Navy", "Grey", "Blue", "Light Blue", "Green", "Olive"]
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
    const brands = ["Urban Wear", "Modern Fit", "Polo Club", "Winter Co", "Street Wear", "Denim Co", "Urban Denim"]


    const tagline = gender === "women" ? "Curated womenswear for every occasion." : gender === "men" ? "Curated menswear for every occasion." : "Timeless styles, thoughtfully curated.";


    const sortedProducts = useMemo(() => {
        if (sortBy == "Price: Low to High") {
            return [...products].sort((a, b) => a.price - b.price);
        } else if (sortBy == "Price: High to Low") {
            return [...products].sort((a, b) => b.price - a.price);
        } else {
            return [...products].sort((a, b) => {
                const aPriority = a.newArrivals || a.bestseller;
                const bPriority = b.newArrivals || b.bestseller;
                const priorityDiff = Number(bPriority) - Number(aPriority);
                if (priorityDiff !== 0) {
                    return priorityDiff;
                }
                return b.id - a.id;
            });
        }
    }, [searchParams, products,])

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter((product) => {
            const matchesCategory = selectedCategories.length == 0 ? true : selectedCategories.includes("New Arrivals") ? product.newArrivals === true : selectedCategories.includes("Bestsellers") ? product.bestseller === true : selectedCategories.includes(product.subCategory); const matchesColor = selectedColors.length == 0 || product.colors.some((color) => selectedColors.includes(color))
            const matchesSize = selectedSize.length == 0 || product.sizes.some((size) => selectedSize.includes(size))
            const discountPrice = getDiscountedPrice(product.price, product.discount)
            const matchesPrice = discountPrice >= priceRange.min && discountPrice <= priceRange.max;
            const matchesBrand = selectedBrand.length == 0 || selectedBrand.includes(product.brand);
            const matchesGender = gender === undefined || product.category.toLowerCase() === gender.toLowerCase();
            const matchesRouteSubCategory = subCategory === undefined ? true : subCategory === "new-arrivals" ? product.newArrivals === true : product.subCategory.toLowerCase() === subCategory.toLowerCase();
            return matchesCategory && matchesColor && matchesSize && matchesPrice && matchesBrand && matchesGender && matchesRouteSubCategory
        });
    }, [sortedProducts, searchParams, priceRange, gender, subCategory]);

    function getCategoryCount(category: string): number {
        if (category === "All") { return (!gender ? products.length : (products.filter((p) => p.category.toLowerCase() === gender).length)); }
        else if (category === "new-arrivals" || category === "New Arrivals") {
            return products.filter((p) => (!gender ? (p.newArrivals === true) : (p.category.toLowerCase() === gender && p.newArrivals === true))).length
        }
        return products.filter((p) => (!gender ? (p.subCategory.toLocaleLowerCase() === category.toLocaleLowerCase()) : (p.category.toLocaleLowerCase() === gender && p.subCategory.toLowerCase() === category.toLocaleLowerCase()))).length;
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
    function capitalize(word: string): string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const header = gender ? capitalize(gender) : "All"

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
    } as const;

    return (
        <section className="bg-cream pt-13">
            <div className="md:px-10 px-5 md:pt-6 pt-3 text-xs font-sans font-bold text-zinc-700"><span className="pr-1">Shop</span> / <span className="pl-1">{!gender && (<span>All</span>)}{gender && (<span>{capitalize(gender)}</span>)} {subCategory && (<span className="pl-1">/ <span className="pl-1">{capitalize(subCategory)}</span></span>)}</span></div>
            <div className="bg-cream grid grid-cols-1 md:grid-cols-5">
                <div className="col-span-1 p-5 md:p-4 border-r border-gray-300">
                    <div className="font-serif text-4xl lg:text-6xl md:px-6 md:pt-4">{header}</div>
                    <p className="font-sans font-medium text-xs text-zinc-700 md:px-6 py-2">{tagline}</p>
                    <div className="md:block hidden mx-6 mt-3 pt-2 border-t border-gray-300">
                        <div className="flex items-center justify-between py-1">
                            <p className="text-gray-800 text-xs font-bold tracking-wider">FILTERS</p>
                            <button className="text-xs lg:text-xs text-zinc-800 hover:bg-hover transition-transform transform duration-300 rounded-md hover:font-medium  cursor-pointer px-2 py-1 font-light tracking-wide"
                                onClick={() => {
                                    setPriceRange({ min: 0, max: 5000 });
                                    if (!gender) { clearFilter(); }
                                    else {
                                        navigate(`/products/${gender}`);

                                    }
                                }}>
                                Clear All</button>
                        </div>
                        <div>
                            <div className="border-b border-gray-300 pb-2">
                                <div className="text-xs text-black font-bold flex items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("subCategory")}><p>Category</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.subCategory ? "rotate-180" : "rotate-0"}`} /></div>
                                {openfilter.subCategory && (
                                    !gender ? (
                                        (categories.map((category) =>
                                        (
                                            <div key={category} onClick={() => toggleCategory(category)} className={`text-xs hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${(category === "All" ? selectedCategories.length == 0 : selectedCategories.includes(category)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                                <p>{category}</p>
                                                <p>{getCategoryCount(category)}</p>
                                            </div>
                                        )))
                                    ) : (<div>
                                        <div onClick={() => navigate(`/products/${gender}`)} className={`text-xs hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${(!subCategory) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                            <p>All</p>
                                            <p>{getCategoryCount("All")}</p>
                                        </div>
                                        {genderLinks.map((link) => (
                                            <div key={link.href} onClick={() => navigate(`/products/${gender}/${link.slug}`)} className={`text-xs hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${((subCategory == link.slug)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                                <p>{link.label}</p>
                                                <p>{getCategoryCount(link.slug)}</p>
                                            </div>
                                        ))}
                                    </div>
                                    )
                                )
                                }

                            </div>
                            <div className="border-b border-zinc-300 py-2 mt-1">
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer transition-all duration-300 justify-between" onClick={() => toggleSection("color")}><p>COLOR</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.color ? "rotate-180" : "rotate-0"}`} /></div>
                                {openfilter.color && colors.map((color) => (
                                    <p key={color} onClick={() => toggleColor(color)} className={`text-xs hover:bg-hover rounded-md cursor-pointer mt-1  hover:text-black py-1 px-2 items-center flex w-full ${(selectedColors.includes(color)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}><span className="border w-3 h-3 block overflow-hidden mr-2 rounded-full" style={{ backgroundColor: color }} />{color}</p>
                                ))}
                            </div>
                            <div className="border-b border-gray-300 py-2">
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("size")}><p>SIZE</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.size ? "rotate-180" : "rotate-0"}`} /></div>
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
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("range")}><p>RANGE</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.range ? "rotate-180" : "rotate-0"}`} /></div>
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
                                <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleSection("brand")}><p>Brand</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.brand ? "rotate-180" : "rotate-0"}`} /></div>
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
                            <div className="text-sm font-medium hidden md:block text-zinc-800">{filteredProducts.length} Items</div>
                            <div className="flex md:hidden items-center w-1/3 cursor-pointer justify-center border px-3 py-2 border-gray-300 hover:bg-hover bg-cream transition-all duration-300" onClick={() => setOpenFilters(prev => !prev)}>
                                <p className="text-gray-800 text-xs font-bold tracking-wider">FILTERS</p>
                                <SlidersHorizontal className="text-gray-600 inline ml-2" size={15} />
                            </div>
                            <div>
                                <span className="font-light tracking-wider px-2 text-xs">SORT BY</span>
                                <select value={sortBy} className="w-auto border-gray-300 border text-xs p-2 focus:outline-none focus:ring-0" onChange={(e) => {
                                    const newParams = new URLSearchParams(searchParams);
                                    newParams.set("sort", e.target.value);
                                    setSearchParams(newParams);
                                }}>
                                    <option value="Featured" className="bg-cream hover:bg-hover">Featured</option>
                                    <option value="Price: Low to High" className="bg-cream hover:bg-hover">Price: Low to High</option>
                                    <option value="Price: High to Low" className="bg-cream hover:bg-hover">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-sm font-medium md:hidden px-4 mt-3 text-zinc-800">{filteredProducts.length} Items</div>
                        <div className="grid md:grid-cols-3 grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
                            {filteredProducts.map((product) => {
                                return (
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.2 }}
                                        variants={cardVariants} 
                                        key={product.id} className="py-2">
                                        <ProductsCard product={product} />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {openFilters && (
                    <div className="fixed inset-0 z-50 h-auto md:hidden ">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/10" onClick={() => setOpenFilters(false)} />
                        <motion.div
                            initial={{ y: "100vh" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100vh" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                            className="absolute left-0 right-0 rounded-t-2xl bottom-0 w-full h-[80%]  bg-cream p-5 overflow-y-auto">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-800 text-sm font-bold tracking-wider">Filters</p>
                                <button onClick={() => setOpenFilters(false)}><X size={20} /></button>
                            </div>
                            <div className="flex items-center justify-between py-2 mt-2 border-b border-gray-300">
                                <p className="text-gray-800 text-xs font-light tracking-wider">{filteredProducts.length} Items</p>
                                <button className="text-xs lg:text-xs text-zinc-800 underline hover:bg-hover transition-transform transform duration-300 rounded-md hover:font-medium cursor-pointer px-2 py-1 font-light tracking-wide"
                                    onClick={() => {
                                        setPriceRange({ min: 0, max: 5000 });
                                        if (!gender) { clearFilter(); }
                                        else {
                                            navigate(`/products/${gender}`);

                                        }
                                    }}>
                                    Clear All</button>
                            </div>
                            <div className="h-auto pb-70">
                                <div className="border-b border-gray-300 py-2">
                                    <div className="text-xs text-black font-bold flex items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleMobileSection("subCategory")}><p>Category</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.subCategory ? "rotate-180" : "rotate-0"}`} /></div>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openfilter.subCategory ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                        {openfilter.subCategory && (
                                            !gender ? (
                                                (categories.map((category) =>
                                                (
                                                    <div key={category} onClick={() => toggleCategory(category)} className={`text-sm hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${(category === "All" ? selectedCategories.length == 0 : selectedCategories.includes(category)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                                        <p>{category}</p>
                                                        <p>{getCategoryCount(category)}</p>
                                                    </div>
                                                )))
                                            ) : (<div>
                                                <div onClick={() => navigate(`/products/${gender}`)} className={`text-sm hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${(!subCategory) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                                    <p>All</p>
                                                    <p>{getCategoryCount("All")}</p>
                                                </div>
                                                {genderLinks.map((link) => (
                                                    <div key={link.href} onClick={() => navigate(`/products/${gender}/${link.slug}`)} className={`text-sm hover:bg-hover px-2 justify-between rounded-md flex cursor-pointer mt-1 hover:text-black py-1 w-full ${((subCategory == link.slug)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                                        <p>{link.label}</p>
                                                        <p>{getCategoryCount(link.slug)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            )
                                        )
                                        }</div>

                                </div>
                                <div className="border-b border-zinc-300 py-2 mt-1">
                                    <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer transition-all duration-300 justify-between" onClick={() => toggleMobileSection("color")}><p>COLOR</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.color ? "rotate-180" : "rotate-0"}`} /></div>
                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openfilter.color ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                        {openfilter.color && colors.map((color) => (
                                            <p key={color} onClick={() => toggleColor(color)} className={`text-sm hover:bg-hover rounded-md cursor-pointer mt-1  hover:text-black py-1 px-2 items-center flex w-full ${(selectedColors.includes(color)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}><span className="border w-3 h-3 block overflow-hidden mr-2 rounded-full" style={{ backgroundColor: color }} />{color}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleMobileSection("size")}><p>SIZE</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.size ? "rotate-180" : "rotate-0"}`} /></div>
                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openfilter.size ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                        <div className="grid md:grid-cols-4 grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-1">
                                            {openfilter.size && sizes.map((size) =>
                                            (
                                                <p key={size} onClick={() => toggleSize(size)} className={`text-sm flex justify-center border border-gray-300 tracking-wider rounded-md cursor-pointer mt-3 py-2 px-2 w-full ${(selectedSize.includes(size)) ? "text-white bg-black font-bold" : "text-zinc-600 font-medium hover:text-black hover:bg-hover"}`}>
                                                    {size}
                                                </p>
                                            ))}</div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleMobileSection("range")}><p>RANGE</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.range ? "rotate-180" : "rotate-0"}`} /></div>
                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openfilter.range ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
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
                                </div>
                                <div className="border-b border-gray-300 py-2">
                                    <div className="text-xs text-black font-bold flex  items-center tracking-wide cursor-pointer py-1 transition-all duration-300 justify-between" onClick={() => toggleMobileSection("brand")}><p>Brand</p><ChevronDown size={16} className={`transition-transform duration-200 mr-2 ${openfilter.brand ? "rotate-180" : "rotate-0"}`} /></div>
                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openfilter.brand ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                        {openfilter.brand && brands.map((brand) =>
                                        (
                                            <p key={brand} onClick={() => toggleBrand(brand)} className={`text-sm hover:bg-hover rounded-md cursor-pointer mt-1 hover:text-black py-1 px-2 w-full ${(selectedBrand.includes(brand)) ? "text-black font-bold" : "text-zinc-600 font-medium"}`}>
                                                {brand}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="fixed bottom-0 left-0 w-full px-2 py-4 bg-cream">
                                <button className="m-auto p-3 font-medium w-full text-sm  bg-black text-white rounded-xl border" onClick={() => setOpenFilters(false)} >Apply filters ( {filteredProducts.length} )</button>
                                <span className="py-2 block" />
                                <button className="m-auto p-3 w-full font-medium text-sm text-black bg-white rounded-xl border"
                                    onClick={() => {
                                        setPriceRange({ min: 0, max: 5000 });
                                        if (!gender) { clearFilter(); }
                                        else {
                                            navigate(`/products/${gender}`);

                                        }
                                    }}>
                                    Clear all
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}