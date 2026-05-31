import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Cart() {
  const { cart, loading, updateQuantity, removeItem } = useCart();
  const items = cart.items || [];

  const total = items.reduce((sum, item) => {
    const p = item.product;
    return sum + (p?.price || 0) * item.quantity;
  }, 0);

  if (loading) return <LoadingSpinner className="min-h-[50vh]" size="lg" />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="card mt-8 py-16 text-center">
          <p className="text-slate-500">Your cart is empty.</p>
          <Link to="/products" className="btn-primary mt-4 inline-flex">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div key={item._id} className="card flex gap-4">
                <img
                  src={item.product?.image || "https://placehold.co/100"}
                  alt=""
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{item.product?.name}</h3>
                    <p className="text-primary-700 font-bold">₹{item.product?.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <button
                        className="px-2 py-1"
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      >
                        <FiMinus />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        className="px-2 py-1"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card h-fit">
            <h2 className="font-semibold">Order Summary</h2>
            <div className="mt-4 flex justify-between border-t pt-4">
              <span>Total</span>
              <span className="text-xl font-bold">₹{total}</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-6 block w-full text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
