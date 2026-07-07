export default function Button({ onclick, text , varient}: { onclick: () => void, text: string , varient: "primary" | "secondary" }) {
  function getButtonClasses(){
    if (varient === "primary") {
      return "bg-black text-white hover:bg-black/70";
    }
    return "bg-[#f6f4ee] border border-black text-black hover:bg-black hover:text-[#f6f4ee]";
  };

  return (
    <button onClick={onclick} className={getButtonClasses() + " py-4 px-15 cursor-pointer transition duration-300"}>
      {text}
    </button>
  )
}