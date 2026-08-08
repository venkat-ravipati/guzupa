import partyImg from "../assets/images/CategorySection/men_grid_CategorySection.webp";
import bestSellersImg from "../assets/images/Journal/WinterLayers.webp";
import backToCollege from "../assets/images/AboutPage/About-page-hero-img.webp";
import newArrivalsImg from "../assets/images/AboutPage/about-story-clothing-rack.webp";
import weekendEditImg from "../assets/images/Journal/ColorasLanguage.webp";
import workWearImg from "../assets/images/Journal/TheSummerEdit.webp"

export const menLinks = [
    { label: 'New Arrivals', href: '/products/men/new-arrivals', slug: 'new-arrivals' },
    { label: 'Shirts', href: '/products/men/shirts', slug: 'shirts' },
    { label: 'Jeans', href: '/products/men/jeans', slug: 'jeans' },
    { label: 'T-Shirts', href: '/products/men/t-shirts', slug: 't-shirts' },
    { label: 'Denim', href: '/products/men/denim', slug: 'denim' },
    { label: 'Knitwear', href: '/products/men/knitwear', slug: 'knitwear' },
    { label: 'Trousers', href: '/products/men/trousers', slug: 'trousers' },
    { label: 'Baggys', href: '/products/men/baggys', slug: 'baggys' },
];
export const womenLinks = [
    { label: 'New Arrivals', href: '/products/women/new-arrivals', slug: 'new-arrivals' },
    { label: 'Dresses', href: '/products/women/dresses', slug: 'dresses' },
    { label: 'Tops', href: '/products/women/tops', slug: 'tops' },
    { label: 'Skirts', href: '/products/women/skirts', slug: 'skirts' },
    { label: 'Baggys', href: '/products/women/baggys', slug: 'baggys' },
];

export const collectionsLinks = [
    { label: 'New Arrivals',img:newArrivalsImg, data:'Fresh pieces, newly curated for you.', href: '/products?category=New+Arrivals' },
    { label: 'Best Sellers',img:bestSellersImg, data:'Our most-loved styles, chosen for you.', href: '/products?category=Bestsellers' },
    { label: 'Party & Occasion',img:partyImg, data:'Elevated looks for every celebration.', href: '/products' },
    { label: 'Workwear',img:workWearImg, data:'Refined pieces for every working day.', href: '/products' },
    { label: 'Back to college',img:backToCollege, data:'Easy essentials for the new semester.', href: '/products' },
    { label: 'Weekend Edit',img:weekendEditImg, data:'Relaxed styles for your days off.', href: '/products' }
];