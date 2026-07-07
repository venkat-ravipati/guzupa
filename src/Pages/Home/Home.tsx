import heroImage from "../../assets/images/Hero_Section_Guzupa.webp";
import heroImageMobile from "../../assets/images/Hero_Section_Guzupa_Mobile_View.jpg";
import Button from "../../Components/Common/Button";
import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate();
  const types = ["Women","Men","Accessories"];

  const getCurrentCollection = () => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    if (month >= 2 && month <= 6) {
      return `Spring / Summer ${year}`;
    }

    if (month >= 7 && month <= 9) {
      return `Monsoon ${year}`;
    }

    return `Autumn / Winter ${year}`;
  };




  return (
    <div>
      <div className="relative h-full flex justify-center items-center pt-13">
        <div className="relative w-full h-full">
          <img src={heroImageMobile} className="object-cover w-full md:hidden" alt="home page image" />
          <img src={heroImage} className="object-cover min-h-screen w-full hidden md:flex" alt="home page image" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute top-1/2 left-7 md:top-1/6 md:left-9 lg:top-1/4 md:m-8 text-white">
          <p className="font-sans text-s hidden md:flex my-6">{getCurrentCollection()}</p>
          <h1 className="font-serif text-7xl md:text-9xl">Timeless<br/>Essentials</h1>
          <p className="font-sans text-m  md:hidden flex mt-6 mb-9">{getCurrentCollection()}</p>
          <p className="font-sans hidden md:flex text-s md:mt-3 md:mb-15">Elevated designs. Premium materials.<br/>Made to last.</p>
          <Button onclick={() => { navigate("/collection") }} text="SHOP COLLECTION" varient="primary" />
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}