

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPages.jsx";
import Navbar from "./components/Navbar.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Login from './pages/login.jsx';
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="section-hero">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<PrivateRouter />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;