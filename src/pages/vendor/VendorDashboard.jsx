import { useEffect, useState } from "react";
import { FiPackage, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import { getVendorStats } from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import StatCard from "../../components/StatCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

export default function VendorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendorStats()
      .then(({ data }) => setStats(data.data))
      .catch(() => setStats({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const vendorStatus = user?.vendor?.status;

  return (
    <DashboardLayout
      type="vendor"
      title="Vendor Dashboard"
      subtitle={`Welcome, ${user?.name}`}
    >
      {vendorStatus === "pending" && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
          Your vendor account is pending admin approval. You can manage products after approval.
        </div>
      )}
      {vendorStatus === "blocked" && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Your vendor account has been blocked. Contact admin.
        </div>
      )}
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Products" value={stats?.totalProducts ?? 0} icon={FiPackage} />
          <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} icon={FiShoppingBag} color="accent" />
          <StatCard label="Total Revenue" value={`₹${stats?.totalRevenue ?? 0}`} icon={FiDollarSign} color="green" />
        </div>
      )}
    </DashboardLayout>
  );
}
