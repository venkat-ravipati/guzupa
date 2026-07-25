import { motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function MobileShopPage() {
    const navigate = useNavigate();

    const sections = [
        { label: "Men", to: "/menu/men" },
        { label: "Women", to: "/menu/women" },
        { label: "Shop All", to: "/products" },
    ];

    const quickLinks = [
        { label: "New Arrivals", to: "/products/?category=New+Arrivals" },
        { label: "Limited Editions", to: "/products/limited-editions" },
        { label: "Timeless Essentials", to: "/products/timeless-essentials" },
        { label: "Gift Cards", to: "/products/gift-cards" },
    ];
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 h-full flex flex-col right-0 bottom-0 z-50 bg-cream"
        >
            <div className="flex justify-between pt-3 items-center px-5">
                <button onClick={() => navigate(-1)} aria-label="Go back">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="font-serif text-4xl">Shop</h1>
                <div />
            </div>
            <div className="text-5xl font-serif mx-5 py-14 border-b border-gray-300">
                Timeless styles, <br />thoughtfully curated.
            </div>
            <div className="flex flex-col py-5">
                {sections.map((section) => {
                    return (
                        <Link to={section.to} key={section.label} className="font-sans uppercase font-medium tracking-wider text-2xl justify-between px-5 py-3 flex items-center h-full" onClick={() => { }}>{section.label}<ChevronRight size={20} /></Link>

                    )
                })}
            </div>
            <div className="mx-5 py-5 border-t border-gray-300 flex flex-col ">
                {quickLinks.map((quick) => {
                    return (
                        <Link to={quick.to} key={quick.label} className="font-sans justify-between py-2 flex items-center h-full" onClick={() => { }}>{quick.label}</Link>
                    )
                })}
            </div>

        </motion.div>

    )
}