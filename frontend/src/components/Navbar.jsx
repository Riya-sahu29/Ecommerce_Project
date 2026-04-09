import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import { clearTokens, getAccessToken } from '../utils/auth';

function Navbar() {
    const { cartItems } = useCart();
    const nav = useNavigate();
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        nav('/login');
    };

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                <Link to="/" className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <span role="img" aria-label="shopping-cart">🛍️</span>
                    <span>shopEase</span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-5 md:gap-6">

                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="text-sm sm:text-base text-gray-800 hover:text-blue-600 font-medium">
                                Login
                            </Link>

                            <Link to="/signup" className="text-sm sm:text-base text-gray-800 hover:text-blue-600 font-medium">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-sm sm:text-base text-gray-800 hover:text-blue-600 font-medium"
                        >
                            Logout
                        </button>
                    )}

                    <Link to="/cart" className="relative flex items-center gap-1 text-gray-800 hover:text-blue-600">
                        <FaShoppingCart className="text-lg sm:text-xl" />
                        <span className="hidden sm:inline text-sm sm:text-base">Cart</span>

                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                </div>

            </div>
        </nav>
    );

}

export default Navbar;


