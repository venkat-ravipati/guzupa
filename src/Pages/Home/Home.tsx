import heroImage from "../../assets/images/Hero_Section_Guzupa.webp";
import heroImageMobile from "../../assets/images/Hero_Section_Guzupa_Mobile_View.jpg";
export default function Home() {

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
      <div className="h-full flex justify-center items-center pt-13">
        <img src={heroImageMobile} className="object-cover w-full md:hidden" alt="home page image" />
        <img src={heroImage} className="object-cover w-full hidden md:flex" alt="home page image" />
      </div>
      <div>
        <p className="font-sans text-m mt-4">{getCurrentCollection()}</p>
        <h1 className="font-serif text-4xl">Timeless<br/>Essentials</h1>
        <p className="font-sans text-m mt-4">Elevated designs. Premium materials.<br/>Made to last.</p>
      </div>
    </div>
  )
}