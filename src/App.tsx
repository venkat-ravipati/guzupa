import { Routes, Route } from 'react-router'
import Home from './Pages/Home/Home'
import NotFound from './Pages/NotFound'
import MainLayout from './Layouts/MainLayout'
import ScrollToTop from './Layouts/ScrollToTop'
import { lazy } from 'react'

const About = lazy(() => import('./Pages/About/About'));
const AdminLayout = lazy(() => import('./Layouts/AdminLayout'))
const OurStory = lazy(() => import('./Pages/About/OurStory'))
const Journal = lazy(() => import('./Pages/Journal/Journal'))
const Products = lazy(() => import('./Pages/Products/Products'))
const AuthLayout = lazy(() => import('./Layouts/AuthLayout'))
const Login = lazy(() => import('./Pages/Auth/Login'))
const MobileShopPage = lazy(() => import('./Pages/MobileMenu/MobileShopPage'))
const MobileCategoryPage = lazy(() => import('./Pages/MobileMenu/MobileCategoryPage'))
const ProductDetail = lazy(() => import('./Pages/ProductDetail/ProductDetail'))
const Cart = lazy(() => import('./Pages/Cart/Cart'))

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu/shop" element={<MobileShopPage />} />
          <Route path="/menu/:slug" element={<MobileCategoryPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/our-story" element={<OurStory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:gender" element={<Products />} />
          <Route path="/products/:gender/:subCategory" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminLayout />}>

        </Route>

      </Routes>
    </>
  )
}

export default App