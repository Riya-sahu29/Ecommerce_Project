import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BACKEND_URL || "http://127.0.0.1:8000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch(`${BASEURL}/api/products/`),
                    fetch(`${BASEURL}/api/categories/`)
                ]);

                if (!productsRes.ok || !categoriesRes.ok) {
                    throw new Error("Network response was not ok");
                }

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();

                setProducts(productsData);
                setCategories(categoriesData);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">🛍️ shopEase</h1>
                    <h2 className="text-3xl font-semibold mb-6">Explore the Future of Shopping</h2>
                    <p className="text-xl mb-8">shopEase – Your Ultimate Shopping Destination</p>
                    <a href="#products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        Start Shopping
                    </a>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.slice(0, 3).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Category */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center mb-12">Shop by Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((category) => (
                            <Link key={category.id} to={`/category/${category.slug}`} className="bg-gray-100 rounded-lg p-8 text-center hover:bg-gray-200 transition-colors cursor-pointer block">
                                <div className="mb-4">
                                    {category.image ? (
                                        <img 
                                            src={category.image} 
                                            alt={category.name} 
                                            className="w-16 h-16 mx-auto object-cover rounded-full"
                                        />
                                    ) : (
                                        <div className="text-6xl">
                                            {category.name === 'Electric' ? '⚡' : 
                                             category.name === 'Water Bottles' ? '🍼' : 
                                             category.name === 'Balls' ? '⚽' : 
                                             category.name === 'Glass' ? '🥂' :
                                             category.name === 'Perfume' ? '🧴' : 
                                             category.name === 'Iron Box' ? '🔥' : '🛍️'}
                                        </div>
                                    )}
                                </div>
                                <h4 className="text-2xl font-semibold">{category.name}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </section> 

            {/* All Products */}
            <section id="products" className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center mb-12">All Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500">No products available.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-lg mb-4">🤖</p>
                    <p>&copy; 2025 shopEase. All rights reserved.</p>
                </div>
            </footer> */}
            <footer className="bg-gray-900 text-gray-300 mt-10">
  <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

    {/* Company */}
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">shopEase</h3>
      <p className="text-sm sm:text-base">
        Your one-stop shop for quality products at affordable prices.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm sm:text-base">
        <li><a href="/" className="hover:text-white">Home</a></li>
        <li><a href="/products" className="hover:text-white">Products</a></li>
        <li><a href="/cart" className="hover:text-white">Cart</a></li>
      </ul>
    </div>

    {/* Customer Service */}
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Customer Service</h3>
      <ul className="space-y-2 text-sm sm:text-base">
        <li><a href="#" className="hover:text-white">Help Center</a></li>
        <li><a href="#" className="hover:text-white">Returns</a></li>
        <li><a href="#" className="hover:text-white">Shipping Info</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Contact Us</h3>
      <p className="text-sm sm:text-base">Email: support@shopease.com</p>
      <p className="text-sm sm:text-base">Phone: +91 98765 43210</p>
    </div>

  </div>

  <div className="border-t border-gray-700 text-center py-4 text-sm sm:text-base">
    © 2025 shopEase. All rights reserved.
  </div>
</footer>
        </div>
    );
}

export default ProductList;