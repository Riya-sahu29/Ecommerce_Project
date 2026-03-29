import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; 
import { FaShoppingCart } from 'react-icons/fa';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000";

    const handleAddToCart = async (product) => {
        try {
            setIsAdding(true);
            setError(null);
            // Just call the context function which handles the API call
            await addToCart(product);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) { 
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="w-full md:w-1/2 h-96 object-cover rounded-lg" />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-6">
                            {product.price}</p>
                        {error && <div 
                        className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4">{error}</div>}
                        <button 
                        onClick={()=> handleAddToCart(product)} disabled={isAdding} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50">
                            <FaShoppingCart /> {isAdding ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <div className="mt-4">
                            <Link to="/" className="text-blue-600 hover:text-blue-800">← Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default ProductDetail;