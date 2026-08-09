import { useNavigate, useSearchParams } from "react-router";
import { IndianRupee, ScanSearch, Search as SearchIcon } from "lucide-react";
import products from "../../products";
import { getDiscountedPrice } from "../../utils/getDiscountedPrice";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Search() {
    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const query = searchParam.get("q") || ("")
    const [showAllResults, setShowAllResults] = useState(false);
    const quickLinks = ["shirt", "Jacket", "sweater", "jeans", "Trousers"]
    const searchResults = query ? products.filter((p) => (p.name.toLowerCase().includes(query.toLowerCase()))) : [];

    return (
        <div className="pt-20 px-7 md:px-10 min-h-max bg-cream">

            <div className="border md:border-0 rounded-md md:my-10 order md:border-b border-gray-300 font-serif text-3xl md:mx-10 px-2 justify-between items-center h-12 gap-1 md:gap-0 md:h-15 flex">
                <input type="text"
                    value={query}
                    onChange={(e) => {
                        const newParam = new URLSearchParams(searchParam);
                        if (e.target.value) {
                            newParam.set("q", e.target.value)
                        } else {
                            newParam.delete("q")
                        }
                        setSearchParam(newParam);
                    }}
                    className="border-0 order-1 font-serif focus:outline-none text-xl md:text-3xl w-full px-2 h-10 md:h-15"
                    placeholder="Search for products, collections, articles..." />
                <SearchIcon className="md:order-2 text-zinc-500 h-4 w-4 lg:h-5 lg:w-5 " />
            </div>

            {query.length === 0 ? (
                <div className="mt-15 pb-10">
                    <div className="flex flex-col justify-center border-gray-300 border-b items-center">
                        <div className="text-sm  text-zinc-700 font-medium py-3">
                            Search
                        </div>
                        <div className="text-3xl md:text-5xl font-serif py-2">Search for timeless Pieces</div>
                        <p className="text-xs md:text-sm text-zinc-500">Find products, collections or inspiration.</p>
                        <ScanSearch className="h-25 mt-5 text-zinc-600 w-15" />
                    </div>
                    <div className="md:mx-30 lg:mx-60 xl:mx-90 mt-10">
                        <div className="text-zinc-600 font-semibold tracking-wider text-xs md:text-sm md:py-4 py-2">TRY SEARCHING FOR</div>
                        <div className="grid grid-cols-3 gap-5 py-3">
                            {quickLinks.map((link) => (
                                <div key={link}
                                    onClick={() => {
                                        const newParam = new URLSearchParams(searchParam);
                                        if (link) {
                                            newParam.set("q", link)
                                        } else {
                                            newParam.delete("q")
                                        }
                                        setSearchParam(newParam);
                                    }}
                                    className="cursor-pointer border flex justify-center py-1 rounded-md font-medium tracking-wide border-gray-300 text-zinc-700 hover:bg-hover"
                                >
                                    {link}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-5">
                            {!showAllResults && <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                                className="lg:col-span-1 md:col-span-2  mt-4 md:mt-0 md:border-none border-b border-gray-300">
                                <div className="text-sm md:text-base font-medium tracking-wide mb-2">SUGGESTIONS</div>
                                {searchResults.slice(0, 5).map((sug) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                                        key={sug.id}
                                        onClick={() => {
                                            const newParam = new URLSearchParams(searchParam);
                                            if (sug.name) {
                                                newParam.set("q", sug.name)
                                            } else {
                                                newParam.delete("q")
                                            }
                                            setSearchParam(newParam);
                                        }}
                                        className="text-xs md:text-sm font-medium text-zinc-700 px-1 lg:px-2 cursor-pointer rounded-md mr-10 py-3 md:py-2 hover:bg-hover">
                                        {sug.name}
                                    </motion.div>
                                ))}
                            </motion.div>}
                        <div className={` mt-4 md:mt-0 ${showAllResults ? "lg:col-span-5 md:col-span-8" : "lg:col-span-4 md:col-span-6"} `}>
                            <div className="text-base md:text-xl mb-2 flex justify-between items-center tracking-wide text-zinc-800 font-medium">
                                <div>Products</div>
                                <div
                                    onClick={() => setShowAllResults(prev => !prev)}
                                    className={`text-sm md:text-base text-zinc-600 hover:text-zinc-800 cursor-pointer ${showAllResults && "hidden"}`}
                                >View all({searchResults.length})</div>
                            </div>

                            <div className="grid py-4 grid-cols-2 md:grid-cols-4 gap-5">
                                {(showAllResults ? searchResults : searchResults.slice(0, 4)).map((product) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                        key={product.id}
                                        onClick={() => navigate(`/product/${product.id}`)}
                                        className="w-full cursor-pointer"
                                    >
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
                                            <p className="font-sans font-semibold md:font-bold text-xs md:text-sm">{product.name}</p>
                                            {product.discount > 0 ? <div className="flex items-center pt-1 text-xs md:text-sm font-medium"><IndianRupee className="mr-1" size={15} /><span>{getDiscountedPrice(product.price, product.discount).toLocaleString("en-IN")}</span><span className="line-through pl-2">{product.price.toLocaleString("en-IN")}</span></div> : <div className="flex items-center"><IndianRupee className="mr-1" size={15} /><span>{product.price.toLocaleString("en-IN")}</span></div>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center font-medium tracking-wider">No Results Found</div>
                )
            )
            }
        </div>
    )
}