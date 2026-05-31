import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiShoppingCart, FiMinus, FiPlus } from "react-icons/fi";
import { getProduct } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then(({ data }) => setProduct(data.data))
      .catch(() => toast.error("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    if (!user) return toast.error("Please login first");
    if (user.role !== "user") return toast.error("Only customers can add to cart");
    await addToCart(product._id, qty);
  };

  if (loading) return <LoadingSpinner className="min-h-[60vh]" size="lg" />;
  if (!product) return <p className="py-20 text-center">Product not found</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          <img
            src={product.image || "https://placehold.co/600x600"}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-primary-600">
            {product.vendorId?.shopName}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-3xl font-bold text-primary-700">₹{product.price}</p>
          <p className="mt-2 text-sm text-slate-500">{product.stock} items in stock</p>
          <p className="mt-6 text-slate-600">{product.description || "No description."}</p>

          {user?.role === "user" && product.stock > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-lg border border-slate-300">
                <button
                  className="px-3 py-2"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button
                  className="px-3 py-2"
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                >
                  <FiPlus />
                </button>
              </div>
              <button onClick={handleAdd} className="btn-primary gap-2">
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
