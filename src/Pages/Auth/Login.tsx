import loginImg from "../../assets/images/Auth/Login.webp"

export default function Login() {
    return (
        <div className="pt-13 grid grid-cols-2 h-screen w-full bg-cream overflow-hidden">
            <div className="relative hidden md:block h-screen overflow-hidden">
                <img src={loginImg} className="h-full w-full object-bottom-right object-cover" loading="lazy" alt="login page" />
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20" />
                <div className="text-white flex flex-col bottom-0 p-15 left-0 right-0 absolute top-0">
                    <p className="text-zinc-400 font-sans tracking-wider py-3 uppercase md:text-xs lg:text-sm">Member Access</p>
                    <div className="font-serif md:text-4xl lg:text-5xl xl:text-6xl py-2">Your world<br />of timeless<br />essentials.</div>
                    <div className="mt-auto">
                        <div className="font-serif italic text-zinc-400 py-4 xl:text-xl">"Membership means early access to every capsule<br />drop, before it reaches the shop floor."</div>
                        <p className="font-sans text-zinc-400 font-medium text-xs xl:text-sm tracking-widest xl:py-4">The Guzupa Journal</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-35 py-23">
                <div className="flex gap-6 text-sm text-gray-500 tracking-wider py-2 border-b">
                    <div>SIGN IN</div>
                    <div>CREATE ACCOUNT</div>
                </div>
            </div>
        </div>
    )
}