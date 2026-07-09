import aboutHeroImage from "../../assets/images/AboutPage/About-page-hero-img.webp"
import storyClothingRack from "../../assets/images/AboutPage/about-story-clothing-rack.webp"
import approachKnitwear from "../../assets/images/AboutPage/about-approach-knitwear.webp"
import storeShowroom from "../../assets/images/AboutPage/about-store-showroom.webp"
import { ArrowRight } from "lucide-react"
export default function About() {

    const Qualities =[{
        title:"Timeless by Design",
        text:"We choose pieces that transcend trends and stand the test of time."
    },{
        title:"Quality First",
        text:"We work with trusted makers and prioritize quality in every detail."
    },{
        title:"Curated, Not Complicated",
        text:"Thoughtful edits that make great style simple."
    },{
        title:"Global Perspective",
        text:"Inspired by cultures around the world, chosen for the modern wardrobe."
    },];
    return (
        <>
            <div className="mt-13 mb-90">
                <section>
                    <div className="grid grid-cols-1 border-b border-zinc-300 md:grid-cols-2 md:gap-15">
                        <div className="order-1 md:py-20 px-7 md:px-12 lg:px-20">
                            <p className="tracking-wider text-zinc-800 px-1 font-medium py-3">ABOUT</p>
                            <div className="font-serif text-5xl md:py-5">About Guzupa</div>
                            <p className="font-medium text-zinc-700 py-3">Guzupa is a curated online destination for timeless menswear. We carefully select each piece for its quality, design, and lasting value — so you can build a wardrobe that endures.</p>
                            <button className="border-b-2 border-gray-200 font-medium text-black hover:px-3 py-4 px-1 md:inline block cursor-pointer tracking-[0.2em] transition-all duration-300">Our Story <ArrowRight className="inline ml-2" size={20}/></button>
                        </div>
                        <div className="md:order-2 flex relative md:h-125 overflow-hidden">
                            <img src={aboutHeroImage} className="w-full object-top h-full object-cover" loading="lazy" alt="about_hero_image" aria-label="about page image" />
                        </div>
                    </div>
                </section>

                <section>
                    <div>

                    </div>
                </section>
            </div>
        </>
    )
}