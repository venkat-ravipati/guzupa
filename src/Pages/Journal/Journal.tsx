import { useState } from "react";
import Articles from "../../Articles.json"

export default function Journal() {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Style", "Materials", "Craft", "Culture", "Design"];


    return (
        <>
            <div className="pt-13 mb-90 bg-cream">
                <div className="px-7 py-5 md:px-14 md:py-7 lg:py-8 lg:px-20">
                    <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl">Journal</h1>
                    <p className="md:text-sm lg:text-sm pt-3 text-xs md:pt-5 lg:pt-7">Insights, stories, and inspiration from the Atelier.</p>
                </div>

                <div className="px-7 justify-between flex md:px-14 lg:px-20">
                    <div>
                        {categories.map((category) => (
                        <button
                            key={category}
                            className={`mb-4 cursor-pointer px-2 mt-4 text-sm font-medium ${
                                activeCategory === category
                                    ? "text-Black border-b-2"
                                    : "text-zinc-800"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                    </div>
                </div>

            </div>
        </>
    )
}