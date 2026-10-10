# Guzupa: Timeless Fashion & Essentials

A boutique fashion e-commerce storefront for the Indian market, built with React and TypeScript.

**Live demo:** https://guzupa.venkatravipati.in/

> **Status:** The frontend is complete. The backend (Spring Boot + database) is in progress, so the app currently runs on dummy product data with simulated authentication.

## Screenshots
<img width="1068" height="609" alt="Home page" src="https://github.com/user-attachments/assets/78ee2697-6ee5-40cc-a68e-54b051a63ccd" />
<img width="1068" height="615" alt="Product page" src="https://github.com/user-attachments/assets/dfa67879-1249-433b-b4b6-71c014d5daba" />
<img width="1067" height="615" alt="cart" src="https://github.com/user-attachments/assets/2439893a-07c8-45e6-bd44-1f2adbf76b54" />


## Features
- Pages: Home, Products, Collections, Search, Product Detail, Cart, Wishlist, Account, Journal, About, Our Story, Contact
- Category filter navigation with a smooth sliding-underline animation
- Full-width hover dropdown in the navbar
- Entrance animations on the product page using Motion
- Cart, wishlist and auth state managed with React Context
- Editorial design: serif headings and a cream colour palette

## Tech Stack
- React 19 + TypeScript
- React Router 8
- Tailwind CSS 4
- Vite
- Motion (framer-motion)
- Radix UI (slider)
- lucide-react icons
- Deployed on Vercel

## Getting Started

### Prerequisites
- Node.js 20.19 or later
- npm

### Run locally
```bash
git clone https://github.com/venkat-ravipati/guzupa.git
cd guzupa
npm install
npm run dev
```

Open the address printed in your terminal (usually http://localhost:5173).

### Other commands
- `npm run build` creates a production build
- `npm run preview` previews the production build locally
- `npm run lint` runs ESLint

## Roadmap
- [ ] Backend REST API with Spring Boot and a database
- [ ] Real authentication (currently simulated)
- [ ] Checkout flow
- [ ] Product care and composition data
- [ ] Trending searches
