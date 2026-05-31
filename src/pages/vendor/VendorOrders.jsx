import { useEffect, useState } from "react";
import { getVendorOrders } from "../../services/api";
import DashboardLayout from "../../components/DashboardLayout";
import OrderTable from "../../components/OrderTable";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVendorOrders()
      .then(({ data }) => setOrders(data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout type="vendor" title="My Orders" subtitle="Orders containing your products">
      {loading ? <LoadingSpinner size="lg" /> : <OrderTable orders={orders} showUser />}
    </DashboardLayout>
  );
}
