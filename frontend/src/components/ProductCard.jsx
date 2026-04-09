import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const BASEURL =
        import.meta.env.VITE_DJANGO_BASE_URL || "http://127.0.0.1:8000";

    return (
        <Link to={`/products/${product.id}`}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-3 sm:p-4 cursor-pointer">

                {/* Image */}
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={
                            product.image
                                ? product.image
                                : "/placeholder.jpg"
                        }
                        alt={product.name}
                        className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="mt-3">
                    <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
                        {product.name}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg font-bold text-black mt-1">
                        ₹{product.price}
                    </p>

                    {/* Button */}
                    <button className="mt-3 w-full text-xs sm:text-sm bg-black text-white py-1.5 sm:py-2 rounded-lg hover:bg-gray-800 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
