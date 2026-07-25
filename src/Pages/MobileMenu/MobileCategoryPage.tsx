import { useParams, Link , useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mobileMenucategory } from "../../data/mobileMenucategory";

export default function MobileCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? mobileMenucategory[slug] : undefined;
  const navigate = useNavigate();

  if (!data) return <div className="p-5">Not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-cream flex flex-col"
    >
      <div className="flex justify-between pt-3 items-center px-5">
        <button onClick={() => navigate(-1)} aria-label="Go back">
                    <ArrowLeft size={20} />
                </button>
        <h1 className="font-serif text-4xl">{data.title}</h1>
        <div />
      </div>

      <ul className="flex flex-col px-10 py-8 flex-1">
        {data.links.map((link) => (
          <li key={link.slug ?? link.label}>
            <Link to={link.href} className="block py-3 border-b border-gray-300 text-lg font-sans">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to={data.viewAll.to}
        className="mt-auto mx-10 mb-8 py-4 items-center flex text-sm font-bold tracking-wider uppercase"
      >
        {data.viewAll.label} <ArrowRight className="inline ml-3" size={20}/>
      </Link>
    </motion.div>
  );
}