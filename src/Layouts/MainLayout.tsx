import { Outlet } from "react-router";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import { Suspense } from "react";
export default function MainLayout() {
    return (
        <>
            <div className="flex flex-col bg-cream min-h-screen">
                <Navbar />
                <main className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}