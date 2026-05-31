import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, role };
      if (role !== "vendor") delete payload.shopName;
      const user = await register(payload);
      toast.success(
        role === "vendor"
          ? "Registered! Awaiting admin approval."
          : "Account created successfully!"
      );
      if (user.role === "vendor") navigate("/vendor/dashboard");
      else navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="card">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <div className="mt-4 flex gap-2 rounded-lg bg-slate-100 p-1">
          {["user", "vendor"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition ${
                role === r ? "bg-white text-primary-700 shadow-sm" : "text-slate-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="input-field"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password (min 6 chars)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
          />
          {role === "vendor" && (
            <input
              className="input-field"
              placeholder="Shop Name"
              value={form.shopName}
              onChange={(e) => setForm({ ...form, shopName: e.target.value })}
              required
            />
          )}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="font-medium text-primary-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
