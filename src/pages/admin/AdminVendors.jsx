import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { approveVendor, blockVendor, getAllVendors } from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getAllVendors()
      .then(({ data }) => setVendors(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleApprove = async (id) => {
    try {
      await approveVendor(id);
      toast.success("Vendor approved");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleBlock = async (id) => {
    if (!confirm("Block this vendor?")) return;
    try {
      await blockVendor(id);
      toast.success("Vendor blocked");
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const statusColor = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-emerald-100 text-emerald-800",
    blocked: "bg-red-100 text-red-800",
  };

  return (
    <DashboardLayout type="admin" title="Vendors Management" subtitle="Approve or block vendors">
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="space-y-4">
          {vendors.map((v) => (
            <div key={v._id} className="card flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">{v.shopName}</h3>
                <p className="text-sm text-slate-500">
                  {v.userId?.name} · {v.userId?.email}
                </p>
                <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColor[v.status]}`}>
                  {v.status}
                </span>
              </div>
              <div className="flex gap-2">
                {v.status !== "approved" && (
                  <button className="btn-primary" onClick={() => handleApprove(v._id)}>
                    Approve
                  </button>
                )}
                {v.status !== "blocked" && (
                  <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50" onClick={() => handleBlock(v._id)}>
                    Block
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
