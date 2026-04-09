import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import CartPage from "./pages/CartPages.jsx";
import Navbar from "./components/Navbar.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Login from './pages/login.jsx';
import Signup from "./pages/Signup.jsx";
import CategoryProducts from "./pages/CategoryProducts.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route element={<PrivateRouter />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;