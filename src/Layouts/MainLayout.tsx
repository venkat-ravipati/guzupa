import { Outlet } from "react-router";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
export default function MainLayout() {
  return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}