import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"
import Upload from "./pages/upload/Upload"
import Profile from "./pages/auth/Profile"
import Picture from "./pages/pictures/Picture"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import PageNotFound from "./pages/PageNotFound"
// Lazy load AI Feature Pages
import { lazy, Suspense } from "react"
import Spinner from "./ui/Spinner"

const AIStylistPage = lazy(() => import("./pages/ai/AIStylistPage"))
const VirtualTryOnPage = lazy(() => import("./pages/ai/VirtualTryOnPage"))
const LookBookPage = lazy(() => import("./pages/ai/LookBookPage"))
const MoodBoardPage = lazy(() => import("./pages/ai/MoodBoardPage"))
const StyleQuizPage = lazy(() => import("./pages/ai/StyleQuizPage"))

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/picture/:id" element={<Picture />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* AI Feature Routes with Lazy Loading */}
        <Route path="/ai/stylist" element={
          <Suspense fallback={<Spinner />}>
            <AIStylistPage />
          </Suspense>
        } />
        <Route path="/ai/try-on" element={
          <Suspense fallback={<Spinner />}>
            <VirtualTryOnPage />
          </Suspense>
        } />
        <Route path="/ai/look-book" element={
          <Suspense fallback={<Spinner />}>
            <LookBookPage />
          </Suspense>
        } />
        <Route path="/ai/mood-board" element={
          <Suspense fallback={<Spinner />}>
            <MoodBoardPage />
          </Suspense>
        } />
        <Route path="/ai/style-quiz" element={
          <Suspense fallback={<Spinner />}>
            <StyleQuizPage />
          </Suspense>
        } />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App