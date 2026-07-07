import { NavLink } from "react-router";
import { User , Search, ShoppingCart } from "lucide-react"
export default function Navbar() {
    return(
        <>
        <nav className="font-sans border-b border-gray-100  fixed top-0 left-0 right-0 bg-white z-50">
            <div className="flex items-center justify-between px-8 md:px-12 lg:px-20 py-4">
                <NavLink to="/" className="text-sm font-semibold tracking-[0.3em] uppercase">Guzupa</NavLink>

                <div className="hidden md:flex items-center md:gap-5 lg:gap-8 text-sm text-gray-600">
                    <span className="cursor-pointer">Shop</span>
                    <NavLink to="/collections">Collections</NavLink>
                    <NavLink to="/journal">Journal</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>

                <div className="flex items-center justify-between  gap-6 md:gap-3 lg:gap-6 text-sm text-gray-600">
                    <span><Search size={17} className="inline" aria-label="Search" /></span>
                    <NavLink to="/wishlist" className="hidden md:flex">Wishlist</NavLink>
                    <NavLink to="/account">
                        <User className="flex md:hidden w-5 h-5" aria-label="Account / profile"/>
                        <span className="hidden md:block">Account</span>
                    </NavLink>
                    <NavLink to="/cart"><ShoppingCart size={17} className="inline" aria-label="Shopping Cart" /></NavLink>
                </div>
            </div>
        </nav>
        </>
    )
}