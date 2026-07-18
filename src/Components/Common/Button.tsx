import { LucideIcon } from "lucide-react";

export default function Button({ onclick, text, varient, icon: Icon }: {
  onclick: () => void, text: string, varient: "primary" | "secondary" | "ghost" | "roundblack" | "roundwhite", icon?: LucideIcon;
}) {
  function getButtonClasses() {
    if (varient === "primary") {
      return "bg-black text-white hover:bg-black/70";
    } else if (varient === "secondary") {
      return "bg-[#f6f4ee] border border-black text-black hover:bg-black hover:text-[#f6f4ee]";
    } else if (varient === "ghost") {
      return " border-b-2 border-gray-200 font-medium text-black hover:bg-black hover:text-[#f6f4ee]"
    } else if (varient === "roundblack") {
      return "bg-black  text-white hover:bg-black/70 rounded-xl";
    } else if (varient === "roundwhite") {
      return "bg-[#f6f4ee] border border-black text-black hover:bg-black hover:text-[#f6f4ee] rounded-xl";
    }
  };
  return (
    <button onClick={onclick} className={getButtonClasses() + " py-4 px-13 md:inline block cursor-pointer tracking-[0.2em] transition-all duration-300"}>
      {text}{Icon && <Icon className="inline ml-3" size={22} />}
    </button>
  )
}
