import { ArrowRight } from "lucide-react";
import { Link } from "react-router"
export default function Footer() {

    const footerLinks = [
        {
            title: "SHOP",
            links: [
                { label: "All Products", to: "/products" },
                { label: "New Arrivals", to: "/products?category=New+Arrivals" },
                { label: "Best Sellers", to: "/products?category=Bestsellers"},
            ],
        },
        {
            title: "COLLECTIONS",
            links: [
                { label: "Men", to: "/collections/men" },
                { label: "Women", to: "/collections/women" },
                { label: "Lookbook", to: "/collections/lookbook" },
            ],
        },
        {
            title: "ABOUT",
            links: [
                { label: "Our Story", to: "/about" },
                { label: "Careers", to: "/about/careers" },
            ],
        },
    ];

    return (
        <>
            <footer>
                <section>
                    <div className="w-full flex flex-col items-center bg-black/96 border-b border-b-zinc-900 text-white">
                        <h1 className="font-serif mt-7 text-4xl md:text-5xl tracking-wider">Join the Guzupa</h1>
                        <p className="text-zinc-500 my-4  font-sans text-center">Be the first to discover new collections,<br />exclusive offers, and timeless inspiration.</p>
                        <form className="border-zinc-900 border my-3 sm:flex " action={() =>{}}>
                            <label>
                                <input className="border-zinc-900 border  block focus:ring-2 outline-none focus:ring-black/20 bg-black/10 md:w-90 py-3 px-5 text-s" type="email" aria-label="email field" placeholder="ramesh@gmail.com" />
                            </label>
                            <button className="border-zinc-900 py-1.5 sm:py-0 mt-2 sm:mt-0 hover:pl-2 transition-all duration-300 hover:bg-black/70 block border w-full sm:w-10 cursor-pointer sm:flex justify-center items-center" aria-label="subscribe button"><span className="text-zinc-400 sm:hidden pr-3">subscribe</span><ArrowRight className="inline md:block text-zinc-500" size={17} /></button>
                        </form>
                        <div className="py-2 text-zinc-500 font-sans flex justify-center w-full">
                            <a href="" target="_blank" className="hover:text-white transition-all duration-300">Instagram</a>
                            <a href="" target="_blank" className="ml-6 hover:text-white transition-all duration-300">WhatsApp</a>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="w-full items-center bg-black/96 md:px-4 text-white">
                        <div className="grid grid-cols-4 md:grid-cols-8 px-5 gap-8 py-4 md:py-5 border-b-zinc-900 text-white border-b">
                            <div className="col-span-3 md:col-span-2">
                                <h3 className="font-serif text-zinc-100 text-3xl pb-1">Guzupa</h3>
                                <p className="font-sans font-light text-zinc-500">
                                    Timeless garments designed with precision, made to outlast trend
                                    cycles.
                                </p>
                            </div>

                            <div className="col-span-6 md:pl-15 grid grid-cols-3 gap-6 md:gap-4">
                                {footerLinks.map((section) => {
                                    return (
                                        <div key={section.title} className="w-full">
                                            <h4 className="text-zinc-300 font-sans py-1 font-medium tracking-wider text-xs">{section.title}</h4>
                                            <ul>
                                                {section.links.map((link) => {
                                                    return (
                                                        <li key={link.to} className="font-sans font-light text-sm text-zinc-500 hover:text-white transition-all duration-500">
                                                            <Link to={link.to}>{link.label}</Link>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="w-full text-xs text-zinc-400 font-sans h-16 px-6 md:px-5 py-1 md:py-0 items-center md:flex bg-black/96 justify-between">
                        <p className="hidden md:flex cursor-pointer transition-all duration-300 hover:text-white">&copy; {new Date().getFullYear()} Guzupa. All rights reserved.</p>
                        <div className="flex justify-between py-1 cursor-pointer md:py-0">
                            <a href="" className=" hover:text-white text-sm transition-all duration-300">code by Venkat</a>
                            <span className="md:hidden pr-5">&copy; {new Date().getFullYear()}</span>
                        </div>
                        <p className="py-1 md:py-0 cursor-pointer"><span className="hover:text-white transition-all duration-300">Privacy Policy</span><span className="px-2 md:px-4 hover:text-white transition-all duration-300">Terms & Conditions</span></p>
                    </div>
                </section>
            </footer>
        </>
    )
}