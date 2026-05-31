import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { placeOrder } from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const total = (cart.items || []).reduce(
    (sum, i) => sum + (i.product?.price || 0) * i.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeOrder({ shippingAddress: address });
      await fetchCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Checkout (Dummy)</h1>
      <p className="mt-1 text-sm text-slate-500">No real payment — order is saved instantly.</p>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-4">
        <h2 className="font-semibold">Shipping Address</h2>
        {["street", "city", "state", "zipCode"].map((field) => (
          <input
            key={field}
            className="input-field capitalize"
            placeholder={field.replace(/([A-Z])/g, " $1")}
            value={address[field]}
            onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
            required
          />
        ))}
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Order Total</p>
          <p className="text-2xl font-bold">₹{total}</p>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
