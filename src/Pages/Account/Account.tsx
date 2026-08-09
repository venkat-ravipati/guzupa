import { useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react"
import { useWishlist } from "../../context/WishlistContext";

export default function Account(){
    const { isLoggedIn, logOut }= useAuth();
    const navigate = useNavigate();
const { wishlistItems } = useWishlist();
    useEffect(() => {
        if(!isLoggedIn){
            navigate("/login")
        }
    },[isLoggedIn,navigate])

    if (!isLoggedIn) {
        return null;
    }

    return(
        <div className="pt-13 bg-cream">
            <div className="pt-13 bg-cream min-h-screen">
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="font-serif text-4xl mb-3">My Account</h1>
        <p className="text-zinc-600 mb-8">Full account features — order history, saved addresses, and profile settings — are coming soon.</p>
        
        <div className="border border-gray-300 rounded-md p-6 text-left mb-6">
            <h2 className="font-serif text-xl mb-2">Wishlist</h2>
            <p className="text-sm text-zinc-600">
                {wishlistItems.length > 0 
                    ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} saved.`
                    : "You haven't saved anything yet."}
            </p>
            <button onClick={() => navigate("/wishlist")} className="text-sm underline mt-2 cursor-pointer">View Wishlist</button>
        </div>

        <button onClick={() => { logOut(); navigate("/"); }} className="text-sm underline text-zinc-600 cursor-pointer hover:text-black">
            Log Out
        </button>
    </div>
</div>
        </div>
    )
}