import { Link } from "react-router-dom";
import { FiArrowRight, FiShield, FiTruck, FiHeadphones } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ limit: 8 })
      .then(({ data }) => setProducts(data.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Shop from trusted vendors in one place
            </h1>
            <p className="mt-4 text-lg text-primary-100">
              Multi-vendor marketplace with secure checkout, real-time inventory, and vendor dashboards.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-700 shadow-lg hover:bg-primary-50">
                Browse Products <FiArrowRight />
              </Link>
              <Link to="/register" className="inline-flex items-center gap-2 rounded-lg border-2 border-white/80 px-6 py-3 font-semibold text-white hover:bg-white/10">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: FiShield, title: "Secure Shopping", desc: "JWT auth & role-based access" },
            { icon: FiTruck, title: "Fast Delivery", desc: "Dummy checkout flow ready" },
            { icon: FiHeadphones, title: "24/7 Support", desc: "Multi-vendor order tracking" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card flex items-start gap-4">
              <div className="rounded-lg bg-primary-50 p-3 text-primary-600">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-sm font-medium text-primary-600 hover:underline">
              View all →
            </Link>
          </div>
          {loading ? (
            <LoadingSpinner className="py-16" size="lg" />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
