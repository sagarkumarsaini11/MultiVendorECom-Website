import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import OrderTable from "../../components/OrderTable";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then(({ data }) => setOrders(data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout type="admin" title="All Orders" subtitle="Platform-wide order history">
      {loading ? <LoadingSpinner size="lg" /> : <OrderTable orders={orders} showUser />}
    </DashboardLayout>
  );
}
