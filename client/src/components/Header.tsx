import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../context/authStore';
import { useCartStore } from '../context/cartStore';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { totalItems } = useCartStore();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            MERN Store
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-primary-600 transition">
              Products
            </Link>

            <Link to="/cart" className="relative hover:text-primary-600 transition">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="hover:text-primary-600 transition flex items-center gap-1">
                  <User size={20} />
                  {user?.firstName}
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-red-600 transition flex items-center gap-1"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-primary-600 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
