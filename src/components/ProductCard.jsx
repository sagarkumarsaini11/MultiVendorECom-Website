import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) return (window.location.href = "/login");
    if (user.role !== "user") return;
    await addToCart(product._id, 1);
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/products/${product._id}`} className="block aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image || "https://placehold.co/400x400?text=No+Image"}
          alt={product.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-600">
          {product.vendorId?.shopName || "Vendor"}
        </p>
        <Link to={`/products/${product._id}`}>
          <h3 className="mt-1 line-clamp-1 font-semibold text-slate-900 hover:text-primary-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
          <span className="text-xs text-slate-500">{product.stock} in stock</span>
        </div>
        {user?.role === "user" && (
          <button onClick={handleAdd} className="btn-primary mt-3 w-full gap-2">
            <FiShoppingCart /> Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
