import loginImg from "../../assets/images/Auth/Login.webp"
import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate()
    const { isLoggedIn, login } = useAuth();
    const [active, setActive] = useState("SIGN IN");

    const tabs = ["SIGN IN", "CREATE ACCOUNT"];

    function handleSignIn(formData: FormData) {
        const email = formData.get("email") as string;
        const password = formData.get("password")as string;
        login(email, password);
        navigate("/account");
    }

    function handleSignUp(formData: FormData) {
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        login(email, password);
        navigate("/account")
    }



    return (
        <div className="pt-13 grid grid-cols-2 h-screen w-full bg-white overflow-hidden">
            <div className="relative hidden md:block h-screen overflow-hidden">
                <img src={loginImg} className="h-full w-full object-bottom-right object-cover" loading="eager" fetchPriority="high" alt="login page" />
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

            <div className="flex col-span-2 md:col-span-1 flex-col py-10 px-7 lg:px-20 xl:px-37 lg:py-15 xl:py-20">
                <div className="flex gap-6 text-xs md:text-sm text-gray-500 tracking-wider border-b font-medium">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActive(tab)}
                            className={`relative py-2 cursor-pointer hover:text-black transition-colors ${active === tab ? "text-black" : ""
                                }`}
                        >
                            {tab}
                            {active === tab && (
                                <motion.span
                                    layoutId="auth-tab-underline"
                                    className="absolute left-0 right-0 -bottom-px h-px bg-black"
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            )}
                        </button>
                    ))}
                </div>
                {active == "SIGN IN" ? (
                    <div className="md:pt-8 pt-4 pr-5">
                        <div className="font-serif text-3xl md:text-4xl">Welcome back</div>
                        <p className="font-sans text-sm md:text-sm tracking-wider py-2 md:py-3 text-zinc-500">Sign in to track orders, manage your wishlist, and check out faster.</p>
                        <form action={handleSignIn}>
                            <label htmlFor="email" className="text-xs tracking-widest text-zinc-500 font-medium block py-2 mt-2 md:mt-4">EMAIL ADDRESS</label>
                            <input type="email" id="email" required placeholder="your@email.com" autoComplete="email" name="email" className="py-3.25 px-3.5 border-gray-300 text-sm border text-black bg-cream block w-full" />
                            <label htmlFor="password" className="text-xs tracking-widest text-zinc-500 font-medium block py-2 mt-2">PASSWORD</label>
                            <input type="password" id="password" required placeholder="••••••••" name="password" autoComplete="current-password" className="py-3.25 px-3.5 border-gray-300 text-sm border text-black bg-cream block w-full" />
                            <div className="flex justify-end py-2">
                                <Link to="/forgot-password" className=" text-xs border-b text-zinc-500 hover:text-black border-zinc-500 tracking-wider my-1 py-1">Forgot password?</Link>
                            </div>
                            <button className="block p-3 w-full bg-black text-white rounded-sm tracking-wider text-sm cursor-pointer transition-all duration hover:bg-black/80 font-medium">{active}</button>
                        </form>
                        <div className="flex justify-between py-5 items-center">
                            <div className="border lg:w-full w-1/2 h-0 border-zinc-300" />
                            <div className="text-xs w-full justify-center flex text-zinc-500">OR CONTINUE WITH</div>
                            <div className="border lg:w-full w-1/2 border-zinc-300" />
                        </div>
                        <div className="flex justify-around text-sm gap-5">
                            <button className="border py-2 md:px-12 tracking-widest w-50 transition-all duration-300 hover:bg-black hover:text-white rounded-sm cursor-pointer">GOOGLE</button>
                            <button className="border py-2 md:px-12 tracking-widest w-50 transition-all duration-300 hover:bg-black hover:text-white rounded-sm cursor-pointer">APPLE</button>
                        </div>
                        <div className="flex justify-center text-xs text-zinc-500 py-5 tracking-wider gap-2">
                            <div>New to Guzupa?</div>
                            <div className="cursor-pointer border-b hover:text-black" onClick={() => setActive("CREATE ACCOUNT")}>Create an account</div>
                        </div>
                    </div>
                ) : (
                    <div className="md:pt-8 pt-4 pr-5">
                        <div className="font-serif text-3xl md:text-4xl">Join Guzupa</div>
                        <p className="font-sans text-sm md:text-sm tracking-wider py-2 md:py-3 text-zinc-500">Create an account for faster checkout and early access to new arrivals.</p>
                        <form action={handleSignUp}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="firstname" className="text-xs tracking-widest text-zinc-500 font-medium block py-2 mt-2 md:mt-4">FIRST NAME</label>
                                    <input type="text" id="firstname" required placeholder="venkat" name="firstname" autoComplete="given-name" className="py-3.25 px-3.5 border-gray-300 text-sm border text-black bg-cream block w-full" />
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="text-xs tracking-widest text-zinc-500 font-medium block py-2 mt-2 md:mt-4">LAST NAME</label>
                                    <input type="text" id="lastname" required placeholder="Ravipati" name="lastname" autoComplete="family-name" className="py-3.25 px-3.5 border-gray-300 text-sm border text-black bg-cream block w-full" />
                                </div>
                            </div>
                            <label htmlFor="email" className="text-xs tracking-widest text-zinc-500 font-medium block py-2 mt-2 md:mt-4">EMAIL ADDRESS</label>
                            <input type="email" id="email" required placeholder="you@gmail.com" name="email" autoComplete="email" className="py-3.25 px-3.5 border-gray-300 text-sm border text-black bg-cream block w-full" />
                            <label htmlFor="password" className="text-xs tracking-widest text-zinc-500 font-medium block py-2 mt-2">PASSWORD</label>
                            <input type="password" id="password" required placeholder="Create a password" name="password" autoComplete="current-password" className="py-3.25 px-3.5 border-gray-300 text-sm border text-black bg-cream block w-full" />
                            <div className="py-2 flex items-center my-1">
                                <input type="checkbox" name="promotions" id="promotions" className="accent-black" />
                                <label htmlFor="promotions" className="px-2 text-zinc-500 text-xs lg:text-sm">Send me new arrivals & offers</label>
                            </div>
                            <button className="block p-3 w-full bg-black text-white rounded-sm tracking-wider text-sm cursor-pointer transition-all duration hover:bg-black/80 font-medium">{active}</button>
                        </form>
                        <div className="flex justify-center text-xs text-zinc-500 py-5 tracking-wider gap-2">
                            <div>Already have an account?</div>
                            <div className="cursor-pointer border-b hover:text-black" onClick={() => setActive("SIGN IN")}>Sign in</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}