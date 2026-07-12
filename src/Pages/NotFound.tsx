import { useNavigate } from "react-router"
import Button from "../Components/Common/Button"
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  const navigate = useNavigate();
  const arrowicon = () =>{
    <ArrowRight />
  }
  return (
    <div className="pt-25 min-h-screen bg-cream font-bold text-center">
      <p className="font-sans font-medium tracking-[0.3em] border-b-2 border-gray-300 py-2 w-fit mx-auto md:mb-4">
        ERROR
      </p>

      <h1 className="font-modern-serif text-9xl md:text-[14rem] font-light tracking-wider md:leading-50 m-0">
        404
      </h1>

      <p className="font-modern-serif text-3xl md:text-6xl mt-0 leading-none">
        Page Not Found.
      </p>

      <div className="border-b-2 border-gray-300 py-3 w-20 md:w-30 m-auto"/>
      <p className="font-sans font-light py-5 tracking-wider">Looks like the page you're looking for <br/> has moved or doesn't exit.</p>
      
      <div className="grid md:flex justify-center items-center ">
        <Button onclick={() => {navigate("/")}} text="Back To Home" varient="primary" icon={ArrowRight}/>
        <span className="my-3 md:mx-3"/>
        <Button onclick={() => {navigate("/collection")}} text="SHOP COLLECTION" varient="secondary" icon={ArrowRight}/>
      </div>

      <div className="flex py-6 items-center max-w-sm mx-auto">
        <div className="flex-1 border-b-2 border-gray-300"/>
        <p className="font-sans font-medium tracking-[0.2rem] px-4">EXPLORE</p>
        <div className="flex-1 border-b-2 border-gray-300"/>
      </div>
      
      <div className="grid md:grid-cols-3">
        <Button onclick={() => {}} text="New Arrivals" varient="ghost" icon={ArrowRight}/>
        <Button onclick={() => {}} text="Best Sellers" varient="ghost" icon={ArrowRight}/>
        <Button onclick={() => {}} text="Our Journal" varient="ghost" icon={ArrowRight}/>
      </div>
    </div>
  )
}