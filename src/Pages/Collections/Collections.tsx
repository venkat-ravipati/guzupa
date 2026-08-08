import { useNavigate } from "react-router"
import { collectionsLinks } from "../../data/categories"
import { motion } from "motion/react"

export default function Collections() {
    const navigate = useNavigate()

    return (
        <div className="bg-cream pt-13">
            <p className="text-xs md:text-sm text-gray-700 font-medium px-6 md:ml-6 lg:px-14 pt-6 lg:pt-7">
                <span className="mr-1">Shop</span> / <span className="px-1">Collections</span>
            </p>
            <div className="text-3xl md:text-5xl font-serif px-6 md:px-13 lg:px-19 pt-3 md:pt-5">
                Collections
            </div>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-13 lg:px-19 pt-3 md:pt-5 pb-10">

                {collectionsLinks.map((collection) => (
                    <div
                        key={collection.label}
                        onClick={() => navigate(collection.href)}
                        className="relative h-80 overflow-hidden cursor-pointer group"
                    >
                        <img
                            src={collection.img}
                            alt={collection.label}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                            <h3 className="font-serif text-2xl md:text-3xl mb-2">{collection.label}</h3>
                            <p className="text-sm">{collection.data}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}