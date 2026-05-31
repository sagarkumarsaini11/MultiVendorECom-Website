import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  createProduct,
  deleteProduct,
  getVendorProducts,
  updateProduct,
} from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import ProductForm from "../../components/ProductForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

export default function VendorProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    getVendorProducts()
      .then(({ data }) => setProducts(data.data))
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      if (editing) {
        await updateProduct(editing._id, formData);
        toast.success("Product updated");
      } else {
        await createProduct(formData);
        toast.success("Product created");
      }
      setShowForm(false);
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (user?.vendor?.status !== "approved") {
    return (
      <DashboardLayout type="vendor" title="My Products" subtitle="Awaiting approval">
        <div className="card py-12 text-center text-slate-500">
          Your vendor account must be approved by an admin before you can manage products.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="vendor" title="My Products" subtitle="Add, edit, or remove your listings">
      <div className="mb-4 flex justify-end">
        <button
          className="btn-primary gap-2"
          onClick={() => {
            setEditing(null);
            setShowForm(!showForm);
          }}
        >
          <FiPlus /> {showForm && !editing ? "Cancel" : "Add Product"}
        </button>
      </div>

      {(showForm || editing) && (
        <div className="mb-6">
          <ProductForm
            initial={editing || {}}
            onSubmit={handleSubmit}
            loading={saving}
            submitLabel={editing ? "Update Product" : "Create Product"}
          />
        </div>
      )}

      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p._id} className="card flex flex-wrap items-center gap-4">
              <img src={p.image || "https://placehold.co/80"} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-500">₹{p.price} · Stock: {p.stock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn-secondary gap-1"
                  onClick={() => {
                    setEditing(p);
                    setShowForm(true);
                  }}
                >
                  <FiEdit2 /> Edit
                </button>
                <button className="rounded-lg border border-red-200 px-3 py-2 text-red-600 hover:bg-red-50" onClick={() => handleDelete(p._id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
