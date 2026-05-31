import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { deleteProduct, getAllProducts } from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getAllProducts()
      .then(({ data }) => setProducts(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <DashboardLayout type="admin" title="All Products" subtitle="Manage products from all vendors">
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <div key={p._id} className="card flex gap-4">
              <img src={p.image || "https://placehold.co/80"} alt="" className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-500">
                  {p.vendorId?.shopName} · ₹{p.price}
                </p>
              </div>
              <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700">
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
