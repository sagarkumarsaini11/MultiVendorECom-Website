export default function OrderTable({ orders, showUser = false }) {
  if (!orders?.length) {
    return (
      <div className="card py-12 text-center text-slate-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            {showUser && <th className="px-4 py-3">Customer</th>}
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-mono text-xs">{order._id.slice(-8)}</td>
              {showUser && (
                <td className="px-4 py-3">
                  {order.userId?.name || order.user?.name || "—"}
                  <br />
                  <span className="text-xs text-slate-500">
                    {order.userId?.email || order.user?.email}
                  </span>
                </td>
              )}
              <td className="px-4 py-3">
                <ul className="space-y-1">
                  {(order.products || []).map((p, i) => (
                    <li key={i} className="text-xs">
                      {p.name} × {p.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-3 font-semibold">
                ₹{order.vendorTotal ?? order.totalAmount}
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium capitalize text-primary-700">
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
