import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";
import OrderTable from "../components/OrderTable";
import LoadingSpinner from "../components/LoadingSpinner";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(({ data }) => setOrders(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner className="min-h-[50vh]" size="lg" />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Order History</h1>
      <div className="mt-8">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
}
