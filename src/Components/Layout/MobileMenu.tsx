import { X, Search, User, Heart, ShoppingCart, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "react-router";
import { getCurrentCollection } from "../../utils/getCurrentCollection";

type Props = { setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>; }

export default function MobileMenu({ setShowMobileMenu }: Props) {

    const mainLinks = [
        { label: "SHOP", to: "/menu/shop", expandable: true },
        { label: "COLLECTIONS", to: "/collections", expandable: true },
        { label: "JOURNAL", to: "/journal" },
        { label: "ABOUT", to: "/about" },
    ];
    
    return (
        <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 z-10 inset-0 bg-cream bottom-0 left-0 right-0 py-5">
            <div className="flex justify-between px-5">
                <div />
                <div className="text-sm font-semibold tracking-[0.3em] uppercase">GUZUPA</div>
                <button onClick={() => setShowMobileMenu(false)}><X size={20} /></button>
            </div>
            <div className="px-7 py-8 h-full flex flex-col">
                <div className="flex flex-col justify-between py-8">
                    {mainLinks.map((main) => {
                        return (
                        <Link to={main.to} key={main.label} className="font-serif text-4xl py-4 justify-between flex items-center h-full" onClick={() => setShowMobileMenu(false) }>{main.label}{main.expandable && <ChevronRight />}</Link>
                        )
                    })}
                </div>
                <div className="border-t border-gray-400 h-2/6 flex flex-col justify-between text-black py-7">
                    <Link to="/search" onClick={() => setShowMobileMenu(false)} className="flex items-center py-1"><Search className="inline mr-2" size={20} />Search</Link>
                    <Link to="/wishlist" onClick={() => setShowMobileMenu(false)} className="flex items-center py-1"><Heart className="inline mr-2" size={20} />Wishlist</Link>
                    <Link to="/login" onClick={() => setShowMobileMenu(false)} className="flex items-center py-1"><User className="inline mr-2" size={20} />Account</Link>
                    <Link to="/cart" onClick={() => setShowMobileMenu(false)} className="flex items-center py-1"><ShoppingCart className="inline mr-2" size={20} />Cart</Link>
                </div>
                <div className="border-t border-gray-400 h-20 text-sm text-zinc-700 flex items-center">
                    {getCurrentCollection()}
                </div>
            </div>
        </motion.div>
    )
}