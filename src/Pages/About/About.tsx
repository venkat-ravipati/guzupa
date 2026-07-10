import aboutHeroImage from "../../assets/images/AboutPage/About-page-hero-img.webp"
import storyClothingRack from "../../assets/images/AboutPage/about-story-clothing-rack.webp"
import approachKnitwear from "../../assets/images/AboutPage/about-approach-knitwear.webp"
import storeShowroom from "../../assets/images/AboutPage/about-store-showroom.webp"
import { Phone, Clock, MapPin, Shirt, ArrowRight, ShieldCheck, Check, Sparkles, Globe } from "lucide-react"
import Button from "../../Components/Common/Button"
export default function About() {

    const iconMap = {
        Shirt,
        ShieldCheck,
        Sparkles,
        Globe,
    } as const;

    const checkpoints = ["Carefully selected materials and craftsmanship", "Ethical production and responsible sourcing", "Long-term partnerships with trusted makers", "A seamless shopping experience, always"]

    const Qualities = [{
        id: 1,
        icon: "Shirt",
        title: "Timeless by Design",
        text: "We choose pieces that transcend trends and stand the test of time."
    }, {
        id: 2,
        icon: "ShieldCheck",
        title: "Quality First",
        text: "We work with trusted makers and prioritize quality in every detail."
    }, {
        id: 3,
        icon: "Sparkles",
        title: "Curated, Not Complicated",
        text: "Thoughtful edits that make great style simple."
    }, {
        id: 4,
        icon: "Globe",
        title: "Global Perspective",
        text: "Inspired by cultures around the world, chosen for the modern wardrobe."
    },
    ];

    const steps = [
        {
            number: "01",
            title: "We Curate",
            description: "We do the research so you don't have to. Only the best pieces make the edit."
        },
        {
            number: "02",
            title: "You Choose",
            description: "Build a wardrobe that fits your life and reflects your style."
        },
        {
            number: "03",
            title: "It Lasts",
            description: "Timeless pieces, quality materials, designed to be worn for years."
        }
    ];
    const Info = [
        {
            icon: MapPin,
            title: "Address",
            lines: ["Chinnagenahalli Main Road", "Avalahalli, KA 560049", "India"],
        },
        {
            icon: Clock,
            title: "Opening hours",
            lines: [
                "Monday - Friday: 10:00 AM - 7:00 PM",
                "Saturday: 11:00 AM - 7:00 PM",
                "Sunday: 12:00 PM - 6:00 PM",
            ],
        },
        {
            icon: Phone,
            title: "Contact",
            lines: ["+91 63619 00502", "store@guzupa.com"],
        },
    ];

    return (
        <>
            <div className="mt-13 bg-cream">
                <section>
                    <div className="grid grid-cols-1 border-b border-zinc-300 md:grid-cols-2 md:gap-15">
                        <div className="order-1 md:py-20 px-7 md:px-12 lg:px-20">
                            <p className="tracking-wider text-zinc-800 px-1 font-medium py-3">ABOUT</p>
                            <div className="font-serif text-5xl md:py-5 lg:text-6xl">About Guzupa</div>
                            <p className="font-medium text-zinc-800 py-3">Guzupa is a curated online destination for timeless menswear. We carefully select each piece for its quality, design, and lasting value — so you can build a wardrobe that endures.</p>
                            <button className="border-b-2 border-gray-200 font-medium text-black hover:px-3 py-4 px-1 md:inline block cursor-pointer tracking-[0.2em] transition-all duration-300">Our Story <ArrowRight className="inline ml-2" size={20} /></button>
                        </div>
                        <div className="md:order-2 flex relative md:h-125 overflow-hidden">
                            <img src={aboutHeroImage} className="w-full object-top h-full object-cover" loading="lazy" alt="about_hero_image" aria-label="about page image" />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-4 border-b border-zinc-300 px-4 py-6 items-center justify-center gap-2">
                        <p className="md:hidden font-serif text-3xl tracking-wide pb-3">What we stand for</p>
                        {Qualities.map((checklist) => {
                            const Icon = iconMap[checklist.icon as keyof typeof iconMap];
                            const isLast = checklist.id === Qualities.length;
                            return (
                                <div key={checklist.id} className={!isLast ? "border-b md:border-0 md:border-r border-zinc-300" : ""}>
                                    <div key={checklist.id} className="flex md:block items-center md:items-start md:px-2 lg:px-3">
                                        <div className="mb-5 p-3 md:p-0 bg-gray-200 md:bg-cream rounded-full"><Icon /></div>
                                        <div className="px-6 md:px-0">
                                            <p className="font-serif text-1xl font-bold my-2 tracking-wider">{checklist.title}</p>
                                            <p className="font-sans text-sm py-1 ">{checklist.text}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-b border-zinc-300">
                        <div className="relative md:h-125 overflow-hidden">
                            <img src={storyClothingRack} className="w-full object-top h-full object-cover" loading="lazy" aria-label="image of cloths in rack" alt="rack of cloths" />
                        </div>
                        <div className="md:py-8 px-7 md:px-5 lg:px-10">
                            <p className="font-medium font-sans text-zinc-800 tracking-wider py-2">OUR STORY</p>
                            <div className="font-serif text-4xl md:text-5xl py-3 lg:py-5 lg:text-6xl">Curating the world's <br /> best menswear.</div>
                            <div className="font-sans font-medium text-zinc-800">
                                <p>Guzupa was founded on a simple belief: great style starts with thoughtful choices. We travel, research, and collaborate with independent labels and established names to bring you pieces that define modern timelessness.</p>
                                <p className="py-5">We don't follow the seasons; we focus on what lasts.</p>
                            </div>
                            <button className="border-b-2 border-gray-200 font-medium text-black hover:px-3 px-1 md:pt-4 py-2 md:py-0 lg:pt-8 md:inline block cursor-pointer tracking-wider transition-all duration-300">Read More <ArrowRight className="inline ml-2" size={20} /></button>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:pt-6 gap-2 border-b border-zinc-300">
                        <div className="md:px-4 px-7 lg:px-8 py-4">
                            <p className="font-sans font-medium text-zinc-800 tracking-wider py-2">OUR APPROACH</p>
                            <div className="font-serif text-4xl md:text-5xl lg:text-6xl py-3 md:py-1">Intentional in<br />every detail.</div>
                            <p className="font-sans font-medium text-zinc-800 py-2 md:py-1">From the fabrics we choose to the brands we partner with, every decision is made with purpose. We believe in transparency, fair practices, and building relationships that last.</p>
                            <div>
                                {checkpoints.map((points, index) => {
                                    return (
                                        <div key={index} className="grid items-center md:block grid-cols-9 font-sans lg:font-bold text-zinc-900 md:text-sm md:font-medium pt-2 md:pt-2 lg:pt-1">
                                            <Check className="inline bg-gray-200 mr-2 md:col-span-0 col-span-1 rounded-full" size={16} />
                                            <span className="md:col-span-0 col-span-8">{points}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="relative sm:h-100 overflow-hidden pb-4 md:pb-0 px-7 md:px-0">
                            <img src={approachKnitwear} className="w-full h-full object-cover md:rounded-none rounded-2xl" loading="lazy" aria-label="Our Approach" alt="Our Approach" />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="py-5 px-7 md:px-5">
                        <p className="py-1 font-sans font-medium text-zinc-800 tracking-wider">THE GUZUPA DIFFERENCE</p>
                        <div className="grid md:grid-cols-3 grid-cols-1 md:py-3">
                            {steps.map((step, index) => {
                                const isLast = index === steps.length - 1;
                                return (
                                    <div key={step.number} className={`${!isLast ? "md:border-r border-b border-zinc-300 mt-3 md:mt-0 flex md:border-b-0 py-2 md:py-0" : "flex md:border-b-0 border-b border-zinc-300 mt-3 py-2 md:py-0 md:mt-0"}`}>
                                        <div className="font-serif text-3xl md:text-5xl px-6 py-2">{step.number}</div>
                                        <div className="px-2">
                                            <div className="font-serif text-xl md:text-2xl tracking-wider">{step.title}</div>
                                            <p className="font-sans tracking-wide text-zinc-800 text-xs md:text-sm py-1">{step.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-[#ece8e4] max-w-11/12 m-auto">
                        <div className="grid md:grid-cols-2 gap-5 p-6 lg:p-16">
                            <div className="order-1 md:order-0 md:col-start-1 md:row-start-1">
                                <p className="font-sans font-medium text-zinc-800 py-2">VISIT OUR STORE</p>
                                <h2 className="font-serif text-4xl lg:text-5xl py-5">Experience Guzupa<br />in person.</h2>
                                <p className="font-sans font-medium text-zinc-800 pr-7">Visit our showroom to explore the collection in a refined, minimalist setting and receive personalized styling assistance from our team.</p>
                                
                            </div>
                            <div className="order-2 md:col-start-2 md:row-span-2 md:row-start-1">
                                <div className="relative h-100 rounded-xl overflow-hidden">
                                    <img src={storeShowroom} className="w-full h-full object-cover" loading="lazy" aria-label="store image" alt="store image" />
                                </div>
                            </div>
                            <div className="md:py-10 order-3 md:order-0 md:col-start-1 md:row-start-2">
                                    <Button onclick={() => { }} text="Get Directions" varient="roundblack" icon={ArrowRight} />
                                </div>
                        </div>
                        <div className="border-b-2 max-w-5/6 border-zinc-300 m-auto" />
                        <div className="p-6 lg:px-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center">
                                {Info.map(({icon:Icon , title , lines } , index) => {
                                    const isLast = index === Info.length-1;
                                    return(
                                        <div key={index} className={`flex gap-2 md:justify-center border-zinc-300 ${!isLast ? "border-b md:border-b-0 md:border-r pb-3 md:pb-0" : ""}`}>
                                            <div className="py-3"><Icon size={20}/></div>
                                            <div>
                                                <p className="font-serif py-2 lg:text-2xl">{title}</p>
                                                {lines.map((line) => {
                                                    return(
                                                        <p key={line} className="pt-1 font-sans text-sm">{line}</p>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}