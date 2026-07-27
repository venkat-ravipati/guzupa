import ourMissionImage from "../../assets/images/AboutPage/OurMissionImage.webp"
import OurstoryHeroImage from "../../assets/images/CategorySection/men_grid_CategorySection.webp"
import packageImg from "../../assets/images/AboutPage/package.webp"
import stylingImg from "../../assets/images/AboutPage/stylingImg.webp"
import aboutHeroImage from "../../assets/images/AboutPage/About-page-hero-img.webp"
import { Info, ShoppingCart, Truck, RefreshCcw ,Check } from "lucide-react"
import { useNavigate } from "react-router"

export default function OurStory() {
    const navigate = useNavigate();

    const deliveryOptions = [{
        id: 1,
        icon: Info,
        text: 'Detailed product information'
    }, {
        id: 2,
        icon: ShoppingCart,
        text: 'Easy orders and secure checkout'
    }, {
        id: 3,
        icon: Truck,
        text: 'Fast and reliable shipping'
    }, {
        id: 4,
        icon: RefreshCcw,
        text: 'Hassle-free returns'
    }]

    const stylingPoints = [{
        id: 1,
        text: 'Lookbooks and style guides',
    }, {
        id: 2,
        text: 'Outfit ideas and how-tos',
    }, {
        id: 3,
        text: 'Wardrobe building tips',
    }]

    return (
        <>
            <div className="pt-13 bg-cream">
                <section>
                    <div className="grid grid-cols-1 md:gap-15 gap-5 border-b border-zinc-300  md:grid-cols-2">
                        <div className="order-1 md:py-10 px-7 md:px-12 lg:px-20">
                            <p className="tracking-widest text-zinc-800 px-1 font-medium py-4">OUR STORY</p>
                            <div className="font-serif text-5xl md:py-3 lg:text-6xl">Timeless style,<br />thoughtfully chosen.</div>
                            <p className="font-sans text-zinc-800 py-3">Guzupa is a curated destination for menswear and womenswear. We travel the world to discover and select clothing from trusted brands and makers—pieces defined by quality, design, and longevity.</p>
                        </div>
                        <div className="order-2 flex relative md:h-125 overflow-hidden">
                            <img src={OurstoryHeroImage} className="w-full object-top h-full object-cover" alt="Our Story"/>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 border-b border-zinc-300">
                        <div className="md:order-1 order-2 relative md:h-125 overflow-hidden p-4 md:p-7">
                            <img src={ourMissionImage} className="w-full h-full object-cover rounded-xl" loading="lazy" alt="Our Mission" />
                        </div>
                        <div className="md:order-2 order-1 md:p-7 px-7 md:px-12 lg:px-20">
                            <p className="font-sans text-zinc-800 font-medium py-4 tracking-wider">OUR MISSION</p>
                            <div className="font-serif text-5xl lg:text-6xl md:py-3">We curate so you<br />can live in it.</div>
                            <p className="font-sans text-zinc-800 py-3">We build relationships with brands and makers who share our values. Every piece in our collection is chosen for its quality, design, and ability to stand the test of time.</p>
                            <p className="font-sans text-zinc-800 py-3">We believe good style is not about trends, but about choosing pieces that feel right, wear well, and last.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 border-b border-zinc-300">
                        <div className="md:p-7 px-7 py-3 md:px-12 lg:px-20">
                            <div className="font-serif text-4xl lg:text-6xl md:py-3">A BETTER SHOPPING EXPERIENCE</div>
                            <p className="font-sans text-zinc-800 py-3">From browsing to delivery, we make shopping simple and reliable.</p>
                            {deliveryOptions.map((item) => (
                                <div key={item.id} className="flex items-center py-2">
                                    <p className="font-sans text-sm md:text-base text-zinc-800"><item.icon className="inline-block mr-3 bg-stone-200 rounded-full" size={20} /> {item.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="relative md:h-125 overflow-hidden p-4 md:p-7">
                            <img src={packageImg} className="w-full h-full object-cover rounded-xl" loading="lazy" alt="package" />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 border-b border-zinc-300">
                        <div className="order-2 md:order-1 relative md:h-110 overflow-hidden p-4 md:p-7">
                            <img src={stylingImg} className="w-full h-full object-cover rounded-xl" loading="lazy" alt="Styling made easy" />
                        </div>
                        <div className="order-1 md:order-2 md:p-7 px-7 py-3 md:px-12 lg:px-20">
                            <div className="font-serif text-4xl lg:text-6xl md:py-3">Styling made easy</div>
                            <p className="font-sans text-zinc-800 py-3">We provide inspiration, guidance, and recommendations to help you wear your pieces with confidence.</p>
                            {stylingPoints.map((item) => (
                                <div key={item.id} className="flex items-center py-1 md:py-2">
                                    <p className="font-sans text-sm md:text-base text-zinc-800"><Check className="inline-block mr-2 md:mr-3 bg-stone-200 rounded-full" size={20} /> {item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-[#ece8e4] w-11/12 m-auto p-4 mt-4 md:p-5 rounded-t-xl md:rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="py-3">
                            <div className="font-serif text-3xl md:text-4xl lg:text-6xl md:py-3">Continue exploring</div>
                            <p className="font-sans text-zinc-800 text-sm lg:text-base">Browse our collections or read more on the journal.</p>
                            <div className="md:flex gap-3 py-4">
                                <button onClick={() =>{navigate('/collections')}} className="bg-black w-full lg:w-auto text-white p-3 hover:text-black hover:border cursor-pointer hover:bg-cream rounded-sm mt-2  tracking-wider text-xs font-bold transition-all duration-300">SHOP COLLECTION</button>
                                <button onClick={() =>{navigate('/journal')}} className="bg-cream w-full lg:w-auto text-black rounded-sm border hover:text-white hover:bg-black cursor-pointer mt-2 font-bold tracking-wider border-black p-3 text-xs transition-all duration-300">READ THE JOURNAL</button>
                            </div>
                        </div>
                        <div className="hidden md:flex relative h-50 overflow-hidden p-4 ">
                            <img src={aboutHeroImage} className="w-full object-top h-full object-cover rounded-xl" loading="lazy" alt="About Hero"/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}