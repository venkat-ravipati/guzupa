import { NavLink } from "react-router";
import { User, Search, ShoppingCart, ArrowRight } from "lucide-react"
import { useRef, useState } from "react";

export default function Navbar() {
    const [isShopHovered, setIsShopHovered] = useState(false);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openShop = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setIsShopHovered(true);
    };

    const closeShopWithDelay = () => {
        closeTimeout.current = setTimeout(() => {
            setIsShopHovered(false);
        }, 150);
    };

    const menLinks = [
        { label: 'New Arrivals', href: '/products/men/new-arrivals' },
        { label: 'Outerwear', href: '/products/men/outerwear' },
        { label: 'Knitwear', href: '/products/men/knitwear' },
        { label: 'Shirts', href: '/products/men/shirts' },
        { label: 'Trousers', href: '/products/men/trousers' },
        { label: 'T-Shirts', href: '/products/men/t-shirts' },
        { label: 'Denim', href: '/products/men/denim' },
        { label: 'Baggy Pants', href: '/products/men/baggy-pants' },
    ];

    const womenLinks = [
        { label: 'Baggy Pants', href: '/products/women/baggy-pants' },
        { label: 'Dresses', href: '/products/women/dresses' },
        { label: 'Tops', href: '/products/women/tops' },
        { label: 'Skirts', href: '/products/women/skirts' },
    ];

    const collectionsLinks = [
        { label: 'Spring / Summer', href: '/collections/spring-summer' },
        { label: 'Monsoon', href: '/collections/monsoon' },
        { label: 'Autumn / Winter', href: '/collections/autumn-winter' },
        { label: 'Back to college', href: '/collections/back-to-college' }
    ];

    const activeNavLink = ({ isActive }: any) =>
        isActive ? "text-black hover:text-black" : "text-gray-600 hover:text-black";
    return (
        <>
            <nav className="font-sans border-b border-gray-300  fixed top-0 left-0 right-0 bg-white z-50">
                <div className="flex items-center justify-between px-8 md:px-12 lg:px-20 py-4">
                    <NavLink to="/" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) }} className="text-sm font-semibold tracking-[0.3em] uppercase">Guzupa</NavLink>

                    <div className="hidden md:flex items-center md:gap-5 lg:gap-8 text-sm text-gray-600">
                        <div onMouseEnter={openShop} onMouseLeave={closeShopWithDelay} className="relative">
                            <NavLink className={activeNavLink} to="/products">Shop</NavLink>
                        </div>
                        <NavLink className={activeNavLink} to="/collections">Collections</NavLink>
                        <NavLink className={activeNavLink} to="/journal">Journal</NavLink>
                        <NavLink className={activeNavLink} to="/about">About</NavLink>
                    </div>

                    <div className="flex items-center justify-between  gap-6 md:gap-3 lg:gap-6 text-sm text-gray-600">
                        <span><Search size={17} className="inline cursor-pointer" aria-label="Search" /></span>
                        <NavLink to="/wishlist" className={({ isActive }) => `hidden md:flex ${isActive ? "text-black" : "text-gray-600"}`}>Wishlist</NavLink>
                        <NavLink className={activeNavLink} to="/account">
                            <User className="flex md:hidden w-5 h-5" aria-label="Account / profile" />
                            <span className="hidden md:block">Account</span>
                        </NavLink>
                        <NavLink to="/cart" className={activeNavLink}><ShoppingCart size={17} className="inline" aria-label="Shopping Cart" /></NavLink>
                    </div>
                </div>
                {isShopHovered && (
                    <div className="absolute top-full pt-2 left-0 right-0 w-full bg-white border border-gray-300 shadow-lg rounded-b-md" onMouseEnter={openShop} onMouseLeave={closeShopWithDelay}>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <div>
                                    <p>SHOP</p>
                                    <div>Timeless pieces,<br />designed with purpose.</div>
                                    <div className="grid grid-cols-3 gap-5 mt-4 ">
                                        <div>
                                            <p>MEN</p>
                                            <ul>
                                                {menLinks.map((link, index) => (
                                                    <li key={index}>
                                                        <NavLink to={link.href} className="text-gray-600 hover:text-black">
                                                            {link.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>

                                            <NavLink to="/products/men" >View All Men <ArrowRight className="inline"/></NavLink>
                                        </div>
                                        <div>
                                            <p>WOMEN</p>
                                            <ul>
                                                {womenLinks.map((link, index) => (
                                                    <li key={index}>
                                                        <NavLink to={link.href} className="text-gray-600 hover:text-black">
                                                            {link.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>

                                            <NavLink to="/products/women" >View All Women <ArrowRight className="inline" /></NavLink>
                                        </div>
                                        <div>
                                            <p>COLLECTIONS</p>
                                            <ul>
                                                {collectionsLinks.map((link, index) => (
                                                    <li key={index}>
                                                        <NavLink to={link.href} className="text-gray-600 hover:text-black">
                                                            {link.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>

                                            <NavLink to="/collections" >View All Collections <ArrowRight className="inline" /></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="relative h-105 overflow-hidden">
                                    <img alt="Explore Collections" aria-label="Explore Collections" />
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}