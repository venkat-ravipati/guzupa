import { NavLink } from "react-router";
import { Search, Menu, ArrowRight, Truck, MapPinned, RotateCcw, LockKeyholeIcon } from "lucide-react"
import { useRef, useState } from "react";
import dropDownImg from "../../assets/images/AboutPage/About-page-hero-img.webp"
import { useNavigate } from "react-router";
import cart from "../../assets/images/Icons/cart.svg";
import { menLinks, womenLinks, collectionsLinks } from "../../data/categories"
import { motion, AnimatePresence } from "motion/react";
import MobileMenu from "./MobileMenu";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
    const [isShopHovered, setIsShopHovered] = useState(false);
    const [showMobileMenu, setshowMobileMenu] = useState(false);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const openShop = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setIsShopHovered(true);
    };

    const closeShopWithDelay = () => {
        closeTimeout.current = setTimeout(() => {
            setIsShopHovered(false);
        }, 150);
    };

    const keyPoints = [{
        icon: Truck,
        title: "Free Shipping",
        text: "On all orders over ₹4,999"
    }, {
        icon: MapPinned,
        title: "Nationwide Delivery",
        text: "Delivering across all of India"
    }, {
        icon: RotateCcw,
        title: "Easy Returns",
        text: "7 days return policy"
    }, {
        icon: LockKeyholeIcon,
        title: "Secure Payment",
        text: "100% secure checkout"
    }]

    const activeNavLink = ({ isActive }: any) =>
        isActive ? "text-black hover:text-black" : "text-gray-600 hover:text-black";
    return (
        <>
            <nav className="font-sans border-b border-gray-300  fixed top-0 left-0 right-0 bg-cream z-50">
                <div className="flex items-center justify-between px-5 md:px-12 lg:px-20 py-4">
                    <div className="md:hidden" onClick={() => setshowMobileMenu(prev => !prev)}><Menu /></div>
                    <NavLink to="/" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }} className="text-sm font-semibold tracking-[0.3em] ml-8 md:ml-0 uppercase">Guzupa</NavLink>

                    <div className="hidden md:flex items-center md:gap-5 lg:gap-8 text-sm text-gray-600">
                        <div onMouseEnter={openShop} onClick={() => { setIsShopHovered(false) }} onMouseLeave={closeShopWithDelay} className="relative">
                            <NavLink className={activeNavLink} to="/products" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }}>Shop</NavLink>
                        </div>
                        <NavLink className={activeNavLink} to="/collections">Collections</NavLink>
                        <NavLink className={activeNavLink} to="/journal">Journal</NavLink>
                        <NavLink className={activeNavLink} to="/about">About</NavLink>
                    </div>

                    <div className="flex items-center md:justify-between justify-end gap-1 md:gap-3 lg:gap-5 text-sm text-gray-600">
                        <NavLink to="/search" className={({ isActive }) =>`flex relative  items-center hover:text-black cursor-pointer ${isActive ? "text-black" : "text-gray-600"}`}>
                            <Search size={17} className="inline mr-1 cursor-pointer" aria-label="Search" />
                            <span className="hidden md:inline">Search</span>
                            <div className="absolute -top-1 hover:border border-gray-300 rounded-2xl -left-1 -right-1 -bottom-1 inset-0 z-10 hidden md:block" />
                        </NavLink>
                        <NavLink to="/wishlist" className={({ isActive }) => `hidden md:flex hover:text-black ${isActive ? "text-black" : "text-gray-600"}`}>Wishlist</NavLink>
                        <NavLink className={activeNavLink} to="/login">
                            <span className="hidden md:block">Account</span>
                        </NavLink>
                        <NavLink to="/cart" className={`relative ${activeNavLink}`}><img src={cart} className="inline" alt="cart" />{totalItems > 0 && <span className="md:inline items-center justify-center md:absolute -right-5 font-bold top-0.5">({totalItems})</span>}</NavLink>
                    </div>
                </div>
                <AnimatePresence>
                    {isShopHovered && (
                        <motion.div className="absolute top-full pt-2 left-0 right-0 w-full transition-all duration-300 ease-in-out origin-top bg-cream border border-gray-300 shadow-lg rounded-b-xl"
                            onClick={() => { setIsShopHovered(false) }}
                            initial={{opacity:0 , pointerEvents: "none" }}
                            animate={{opacity:1 , pointerEvents: "auto" }}
                            exit={{opacity:0 , pointerEvents: "none"}}
                            transition={{ type : "tween" , duration: 0.3 , ease:"backOut"}}
                            onMouseEnter={openShop}
                            onMouseLeave={closeShopWithDelay}>
                            <div className="grid grid-cols-5 gap-5 ">
                                <div className="col-span-3">
                                    <div className="pb-4">
                                        <p className="font-bold text-xs p-3 tracking-wider xl:px-6">SHOP</p>
                                        <div className="font-serif text-4xl px-3 xl:px-6">Timeless styles,<br />thoughtfully curated.</div>
                                        <div className="grid grid-cols-3 gap-2 lg:gap-5 mt-4 text-sm h-full border-t border-gray-300 pt-4 m-1 lg:m-3">
                                            <div className="flex flex-col h-full lg:px-4 xl:px-6">
                                                <p className="font-bold text-xs py-1">MEN</p>
                                                <ul>
                                                    {menLinks.map((link, index) => (
                                                        <li key={index} className="py-1">
                                                            <NavLink to={link.href} className="text-gray-600 hover:text-black hover:px-1 transition-all duration-300 text-xs">
                                                                {link.label}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <NavLink to="/products/men" className="mt-auto font-bold  transition-all duration-300 text-xs pt-6 hover:px-2">View All Men<ArrowRight className="inline ml-1" size={16} /></NavLink>
                                            </div>
                                            <div className="flex flex-col h-full border-l border-gray-200 pl-3 lg:pl-8">
                                                <p className="font-bold text-xs py-1">WOMEN</p>
                                                <ul>
                                                    {womenLinks.map((link, index) => (
                                                        <li key={index} className="py-1">
                                                            <NavLink to={link.href} className="text-gray-600 hover:text-black hover:px-1 transition-all duration-300 text-xs">
                                                                {link.label}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>

                                                <NavLink to="/products/women" className="mt-auto  hover:px-1 transition-all duration-300  font-bold text-xs py-2">View All Women<ArrowRight className="inline ml-1" size={16} /></NavLink>
                                            </div>
                                            <div className="flex flex-col h-full border-l border-gray-200 pl-3 lg:pl-5 xl:pl-9">
                                                <p className="font-bold text-xs py-1">COLLECTIONS</p>
                                                <ul>
                                                    {collectionsLinks.map((link, index) => (
                                                        <li key={index} className="py-1">
                                                            <NavLink to={link.href} className="text-gray-600 hover:text-black hover:px-1 transition-all duration-300 text-xs">
                                                                {link.label}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <NavLink to="/collections" className="mt-auto font-bold text-xs hover:px-2 transition-all duration-300 py-2">View All Collections<ArrowRight className="inline ml-1" size={16} /></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-3">
                                        <div className="relative h-105 overflow-hidden rounded-2xl">
                                            <img src={dropDownImg} className="w-full h-full object-cover object-left" loading="eager" fetchPriority="high" alt="Explore Collections" aria-label="Explore Collections" />
                                            <div className="bg-black/20 h-full rounded-2xl w-full absolute top-0" />
                                        </div>

                                        <div className="absolute top-1/3 text-white">
                                            <div className="font-serif text-4xl px-3 lg:text-5xl xl:py-2 py-0 xl:text-6xl">Monsoon</div>
                                            <p className="font-sans text-sm xl:text-base p-3">Softness that defines<br />modern luxury.</p>
                                            <button onClick={() => { navigate("/collections") }} className="font-sans font-light border-b xl:pt-4 text-sm xl:text-base mx-3 cursor-pointer pb-1 hover:px-2 transition-all duration-300 tracking-wide">Discover Collection<ArrowRight className="inline ml-1" size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 p-5">
                                {keyPoints.map((points, index) => {
                                    const islast = index == keyPoints.length - 1;
                                    return (
                                        <div key={index} className="py-5 border-gray-300 border-t">
                                            <div className={`flex items-center justify-center pl-3 ${!islast ? "border-r  border-gray-300" : ""}`}>
                                                <div>
                                                    <points.icon size={20} />
                                                </div>
                                                <div className="px-3">
                                                    <p className="font-bold text-xs lg:text-sm">{points.title}</p>
                                                    <p className="font-light text-xs">{points.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {showMobileMenu && <MobileMenu setShowMobileMenu={setshowMobileMenu}/>}
                </AnimatePresence>
            </nav>
        </>
    )
}