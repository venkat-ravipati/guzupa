import { Outlet } from "react-router";
import Navbar from "../Components/Layout/Navbar";

export default function AuthLayout(){
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}