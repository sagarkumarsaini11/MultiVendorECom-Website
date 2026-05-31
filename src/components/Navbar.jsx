import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardLink =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "vendor"
        ? "/vendor/dashboard"
        : null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold text-primary-700">
          Shop<span className="text-accent-600">Verse</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/products" className="text-sm font-medium text-slate-600 hover:text-primary-600">
            Products
          </Link>
          {!user && (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
          {user?.role === "user" && (
            <>
              <Link to="/orders" className="text-sm font-medium text-slate-600 hover:text-primary-600">
                Orders
              </Link>
              <Link to="/cart" className="relative text-slate-600 hover:text-primary-600">
                <FiShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-600 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
          {dashboardLink && (
            <Link to={dashboardLink} className="text-sm font-medium text-slate-600 hover:text-primary-600">
              Dashboard
            </Link>
          )}
          {user && (
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-slate-600 hover:text-red-600">
              <FiLogOut /> Logout
            </button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link>
            {!user && (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>Register</Link>
              </>
            )}
            {user?.role === "user" && (
              <>
                <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart ({cartCount})</Link>
                <Link to="/orders" onClick={() => setMobileOpen(false)}>Orders</Link>
              </>
            )}
            {dashboardLink && (
              <Link to={dashboardLink} onClick={() => setMobileOpen(false)}>Dashboard</Link>
            )}
            {user && (
              <button onClick={handleLogout} className="flex items-center gap-2 text-left text-red-600">
                <FiUser /> Logout ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
