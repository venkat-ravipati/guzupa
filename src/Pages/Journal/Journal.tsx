import { useState } from "react";
import Articles from "../../articles";
import { ArrowLeft, ArrowRight, Dot, BookOpenText } from "lucide-react";
import { motion } from "motion/react"

interface Article {
    id: number;
    title: string;
    img: string;
    category: string;
    date: string;
    readTime: string;
    excerpt: string;
    body: string[];
}
export default function Journal() {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(3);

    const categories = ["All", "Style", "Materials", "Craft", "Culture", "Design"];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
    } as const;

    const filteredArticles = Articles.filter(
        (article) => activeCategory === "All" || article.category === activeCategory
    );


    const ArticlesGrid = filteredArticles.slice(0, visibleCount).map((article) => {
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                key={article.id} className="cursor-pointer md:bg-cream p-3 md:p-0 bg-[#ece8e4] rounded-xl" onClick={() => {setSelectedArticle(article); window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}}>
                <div className="h-40">
                    <img src={article.img} className="w-full h-full object-cover " loading="lazy" alt={article.title} />
                </div>
                <div>
                    <div className="flex font-sans pt-3 text-sm text-zinc-800 justify-between">
                        <p className="font-bold">{article.category}</p>
                        <p>{article.date}<span><Dot className="inline" />{article.readTime}</span></p>
                    </div>
                    <div className="font-serif text-2xl py-2">{article.title}</div>
                    <div className="flex items-center">
                        <p className="font-sans text-sm">{article.excerpt}</p>
                        <ArrowRight size={25} />
                    </div>
                </div>
            </motion.div>
        )
    })

    

    return (
        <>
            <div className="md:grid bg-cream md:grid-cols-5 lg:grid-cols-3 pt-13">
                <div className={` bg-cream border-r py-3 md:col-span-3 lg:col-span-2 border-zinc-300 ${selectedArticle ? "hidden md:block" : "block"}`}>
                    <div className="px-7 py-5 md:px-14 md:py-7 lg:py-8 lg:px-20">
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-6xl">Journal</h1>
                        <p className="md:text-sm lg:text-sm pt-3 text-xs md:pt-5 lg:pt-7">Insights, stories, and inspiration from the Guzupa.</p>
                    </div>

                    <div className="px-7 w-full justify-between flex md:px-14 lg:px-20">
                        <div className="w-full">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`mb-4 cursor-pointer pr-2 pl-1 md:px-3 mt-4 text-sm font-medium ${activeCategory === category
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

                    <div className="grid transition-all duration-300 grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 py-3 px-7 md:px-14 lg:px-20">
                        {ArticlesGrid}
                    </div>
                    {visibleCount < filteredArticles.length && (
                        <div className="flex justify-center p-8">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 3)}
                                className="cursor-pointer px-6 hover:bg-black hover-text py-3 text-sm font-medium border border-zinc-300 rounded-full hover:text-white transition-all duration-300"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
                <div className={`absolute md:relative bg-cream md:pt-0 md:col-span-2 lg:col-span-1 ${selectedArticle ? " index-0 z-20 overflow-y-auto" : "hidden md:block"}`}>
                    {selectedArticle && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            key={selectedArticle.id}>
                            <div>
                                <button onClick={() => setSelectedArticle(null)} className="hover:bg-hover text-sm cursor-pointer px-4 py-5 md:px-8 md:py-3 md:m-3 rounded-3xl hover:px-6 transition-all duration-300"><ArrowLeft className="inline mr-2" size={20} /> Back to Journal </button>
                                <div className="md:px-10">
                                    <p className="font-sans font-bold text-zinc-800 p-5">{selectedArticle.category}</p>
                                    <div className="font-serif text-5xl lg:text-6xl p-4">{selectedArticle.title}</div>
                                    <p className="font-sans px-4">{selectedArticle.date}<span><Dot className="inline" />{selectedArticle.readTime}</span></p>
                                    <p className="font-sans font-medium p-4">{selectedArticle.excerpt}</p>
                                    <div className="h-80">
                                        <img src={selectedArticle.img} className="object-top w-full h-full object-cover" alt={selectedArticle.title} aria-label={selectedArticle.title} loading="lazy" />
                                    </div>
                                    {selectedArticle.body.map((data, index) => {
                                        return (
                                            <p key={index} className="p-4 text-zinc-800 ">{data}</p>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="border-t border-zinc-300 p-5">
                                <div className="flex justify-between">
                                    <div className="font-serif text-2xl lg:text-3xl">You May Also Like</div>
                                    <button className="font-sans cursor-pointer text-zinc-700 hover:text-black transition-all duration-300" onClick={() => {setSelectedArticle(null); window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}}>View all</button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 p-2 lg:gap-7 ">
                                    {Articles.filter((article) => article.id !== selectedArticle.id).slice(0, 2).map((article) => {
                                        return (
                                            <div key={article.id} className="cursor-pointer" onClick={() => {setSelectedArticle(article); window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}}>
                                                <div className="h-40">
                                                    <img src={article.img} className="w-full h-full object-cover " loading="lazy" alt={article.title} aria-label={article.title} />
                                                </div>
                                                <div>
                                                    <div className="font-serif text-xl lg:text-2xl py-2 text-zinc-800">{article.title}</div>
                                                    <div className="flex font-sans text-sm text-zinc-800 justify-between">
                                                        <p className="text-zinc-800 font-bold">{article.category}</p>
                                                        <p>{article.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {!selectedArticle && (
                        <div className="h-full w-full flex flex-col justify-center items-center ">
                            <BookOpenText className="text-zinc-600" size={40} />
                            <div className="font-serif text-3xl p-4">Select an article to read</div>
                            <p className="font-sans font-medium text-zinc-800">Choose any article from the list<br />to view the full story here.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}