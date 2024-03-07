import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/menu/Menu";
import LandingPage from "./pages/landingpage/LandingPage";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/Header/Header";
import About from "./pages/about/About";
import Cart from "./components/cart/Cart";
import OrderStatus from "./pages/orderstatus/OrderStatus";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderstatus" element={<OrderStatus />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
