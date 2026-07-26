import heroImage from "../../assets/images/Hero_Section_Guzupa.webp";
import menCategorySection from "../../assets/images/CategorySection/men_grid_CategorySection.webp"
import womenCategorySection from "../../assets/images/CategorySection/womens_grid_CategorySection.webp"
import accessoriesCategorySection from "../../assets/images/CategorySection/Accessories_CategorySection.webp"
import Button from "../../Components/Common/Button";
import { useNavigate } from "react-router";
import productsData from "../../products";
import { ArrowRight, Heart, IndianRupee } from "lucide-react";
export default function Home() {
  const navigate = useNavigate();
  const categories = [
    { name: "Women", image: womenCategorySection, path: "/products/women" },
    { name: "Men", image: menCategorySection, path: "/products/men" },
    { name: "Accessories", image: accessoriesCategorySection, path: "/products/accessories" },
  ];

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

  const newArrivals = () => {
    return productsData
      .sort((a, b) => b.id - a.id)
      .filter((product) => product.newArrivals)
      .slice(0, 4)
      .map((product) => (
        <div
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden bg-gray-100 aspect-4/5">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <button
              onClick={() => { }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center hover:bg-white transition"
            >
              <Heart size={16} />
            </button>
          </div>
          <div className="mt-4">
            <p className="text-[10px] tracking-[0.15em] text-gray-500 uppercase mb-1">
              {product.subCategory} · {product.colors[0]}
            </p>
            <h3 className="font-medium text-sm">{product.name}</h3>
            <p className="text-sm mt-1">
              <IndianRupee className="inline" size={14} />
              {product.price}
            </p>
          </div>
        </div>
      ));
  }

  return (
    <div>
      <div className="relative h-full flex justify-center items-center pt-13">
        <div className="relative w-full h-full">
          <img src={heroImage} loading="eager" fetchPriority="high" className="object-cover min-h-screen w-full flex" alt="home page image" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute top-1/2 left-7 md:top-1/6 md:left-9 lg:top-1/4 md:m-8 text-white">
          <p className="font-sans text-s hidden md:flex my-6">{getCurrentCollection()}</p>
          <h1 className="font-serif text-7xl md:text-9xl">Timeless<br />Essentials</h1>
          <p className="font-sans text-m  md:hidden flex mt-6 mb-9">{getCurrentCollection()}</p>
          <p className="font-sans hidden md:flex text-s md:mt-3 md:mb-15">Elevated designs. Premium materials.<br />Made to last.</p>
          <Button onclick={() => { navigate("/collection") }} text="SHOP COLLECTION" varient="primary" />
        </div>
      </div>

      <section className="px-8 md:px-12 lg:px-20 md:py-10 py-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate(category.path)}
              className="relative h-105 overflow-hidden cursor-pointer group"
            >
              <img
                src={category.image} loading="lazy"
                alt={category.name}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h3 className="font-serif text-2xl md:text-3xl mb-3">{category.name}</h3>
                <span className="text-xs tracking-[0.2em] border-b border-white pb-1">{category.name === "Accessories" ? "COMING SOON" : "SHOP NOW"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 md:px-12 lg:px-20 md:py-10 py-7">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl">New Arrivals</h2>
          <button onClick={() => navigate("/products?category=New+Arrivals")} className="text-xs tracking-[0.2em] border-b border-black pb-1 cursor-pointer">
            VIEW ALL
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {newArrivals()}
        </div>
      </section>

      <section>
        <div className="relative h-70 overflow-hidden">
          <img src={heroImage} className="absolute inset-0 w-full h-full object-cover" loading="lazy" alt="capsule drop image" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-transparent" />

          <div className="relative z-10 h-full text-white items-center p-7 md:p-10">
            <div className="max-w-md text-white">
              <p className="uppercase font-sans py-4 md:py-3 text-sm tracking-widest">Exclusive Release</p>
              <h2 className="font-serif text-4xl py-4 md:py-3">Limited Capsule Drop</h2>
              <p className="font-sans text-sm tracking-wider py-2">Only available this week</p>
              <button className="font-sans text-sm hover:pl-3 transition-all duration-500 cursor-pointer my-5 border-b" onClick={() => navigate("/collections")}>Discover Now <ArrowRight size={20} className="inline ml-3" /></button>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}