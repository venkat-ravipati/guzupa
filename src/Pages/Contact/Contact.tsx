import { Mail } from "lucide-react";
import { info } from "../../data/info";

export default function Contact() {
    return (
        <div className="pt-13 bg-cream min-h-screen">
            <p className="text-xs md:text-sm text-gray-700 font-medium px-6 md:ml-6 lg:px-14 pt-6 lg:pt-7">
                <span className="mr-1">Shop</span> / <span className="px-1">Contact</span>
            </p>
            <div className="font-serif text-4xl md:text-5xl py-4 md:py-8 px-6 md:px-19">Contact Us</div>

            <div className="flex flex-col md:flex-row gap-10 px-6 md:px-19 pb-16">
                <div className="grid grid-cols-1 md:w-1/2 gap-5">
                    {info.map(({ icon: Icon, title, lines }, index) => (
                        <div key={index} className="flex gap-2 border-zinc-300">
                            <div className="py-3"><Icon size={20} /></div>
                            <div>
                                <p className="font-serif py-2 lg:text-2xl">{title}</p>
                                {lines.map((line) => (
                                    <p key={line} className="pt-1 font-sans text-sm">{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="md:w-1/2">
                    <p className="font-serif text-2xl mb-3">Get in touch</p>
                    <p className="text-sm text-zinc-600 xl:pr-50 mb-6">
                        Have a question about an order, a product, or anything else? Send us an email and we'll get back to you.
                    </p>
                    
                        <a href="mailto:store@guzupa.com"
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm tracking-wider uppercase hover:bg-zinc-800 transition"
                    >
                        <Mail size={18} /> Email Us
                    </a>
                </div>
            </div>
        </div>
    );
}