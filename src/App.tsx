import { Routes, Route } from 'react-router'
import Home from './Pages/Home/Home'
import NotFound from './Pages/NotFound'
import MainLayout from './Layouts/MainLayout'
import ScrollToTop from './Layouts/ScrollToTop'


function App() {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<NotFound />} />
        </Route>

        
      </Routes>
    </>
  )
}

export default App