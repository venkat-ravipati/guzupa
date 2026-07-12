import { Routes, Route } from 'react-router'
import Home from './Pages/Home/Home'
import NotFound from './Pages/NotFound'
import MainLayout from './Layouts/MainLayout'
import ScrollToTop from './Layouts/ScrollToTop'
import { lazy, Suspense } from 'react'

const About = lazy(() => import('./Pages/About/About'));
const AdminLayout = lazy(() => import('./Layouts/AdminLayout'))
const OurStory = lazy(() => import('./Pages/About/OurStory'))
const Journal = lazy(() => import('./Pages/Journal/Journal'))

function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<div>Loading page…</div>}>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/our-story" element={<OurStory />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<AdminLayout />}>
          </Route>

          

        </Routes>
      </Suspense>
    </>
  )
}

export default App