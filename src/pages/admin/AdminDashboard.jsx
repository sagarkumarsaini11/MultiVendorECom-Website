import { useEffect, useState } from "react";
import { FiUsers, FiUserCheck, FiPackage, FiShoppingBag, FiDollarSign } from "react-icons/fi";
import { getAdminStats } from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import StatCard from "../../components/StatCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(({ data }) => setStats(data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout type="admin" title="Admin Dashboard" subtitle="Platform overview">
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Users" value={stats?.totalUsers ?? 0} icon={FiUsers} />
          <StatCard label="Total Vendors" value={stats?.totalVendors ?? 0} icon={FiUserCheck} color="accent" />
          <StatCard label="Pending Vendors" value={stats?.pendingVendors ?? 0} icon={FiUserCheck} color="orange" />
          <StatCard label="Total Products" value={stats?.totalProducts ?? 0} icon={FiPackage} />
          <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} icon={FiShoppingBag} color="green" />
          <StatCard label="Total Revenue" value={`₹${stats?.totalRevenue ?? 0}`} icon={FiDollarSign} />
        </div>
      )}
    </DashboardLayout>
  );
}
