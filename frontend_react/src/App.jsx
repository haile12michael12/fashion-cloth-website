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
    &lt;BrowserRouter&gt;
      &lt;Header /&gt;
      &lt;Routes&gt;
        &lt;Route path="/" element={&lt;Home /&gt;} /&gt;
        &lt;Route path="/register" element={&lt;Register /&gt;} /&gt;
        &lt;Route path="/login" element={&lt;Login /&gt;} /&gt;
        &lt;Route path="/upload" element={&lt;Upload /&gt;} /&gt;
        &lt;Route path="/profile" element={&lt;Profile /&gt;} /&gt;
        &lt;Route path="/picture/:id" element={&lt;Picture /&gt;} /&gt;
        &lt;Route path="/cart" element={&lt;Cart /&gt;} /&gt;
        &lt;Route path="/checkout" element={&lt;Checkout /&gt;} /&gt;
        &lt;Route path="*" element={&lt;PageNotFound /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/BrowserRouter&gt;
  )
}

export default App