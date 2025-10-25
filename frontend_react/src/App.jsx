import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import Header from "./layouts/Header"
import Upload from "./pages/upload/Upload"
import Profile from "./pages/auth/Profile"
import Picture from "./pages/pictures/Picture"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import PageNotFound from "./pages/PageNotFound"

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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App