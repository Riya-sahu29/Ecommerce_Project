import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function CategoryProducts() {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASEURL = import.meta.env.VITE_DJANGO_BACKEND_URL || "http://127.0.0.1:8000";

    useEffect(() => {
        setLoading(true);
        fetch(`${BASEURL}/api/products/?category=${slug}`)
            .then(res => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [slug, BASEURL]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 capitalize">{slug} Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map(product => <ProductCard key={product.id} product={product} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
}

export default CategoryProducts;
