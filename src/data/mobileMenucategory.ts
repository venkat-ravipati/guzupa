// data/categoryConfig.ts
import { menLinks, womenLinks } from "./categories";

export interface CategoryLink {
  label: string;
  href: string;
  slug?: string;
}

interface mobileMenucategory {
  title: string;
  links: CategoryLink[];
  viewAll: { label: string; to: string };
}

export const mobileMenucategory: Record<string, mobileMenucategory> = {
  men: {
    title: "Men",
    links: menLinks,
    viewAll: { label: "View All Men", to: "/products/men" },
  },
  women: {
    title: "Women",
    links: womenLinks,
    viewAll: { label: "View All Women", to: "/products/women" },
  },
};