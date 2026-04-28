import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const statusStyle = {
  "Order Placed":     "bg-blue-50 text-blue-700 border-blue-200",
  "Packing":          "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Shipped":          "bg-purple-50 text-purple-700 border-purple-200",
  "Out for delivery": "bg-orange-50 text-orange-700 border-orange-200",
  "Delivered":        "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchAllOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) fetchAllOrders();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { fetchAllOrders(); }, [token]);

  const allStatuses = ["All", "Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"];
  const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status !== "Delivered").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track and manage all customer orders</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total orders",   value: orders.length,                  icon: "🛍️", border: "border-l-blue-400" },
          { label: "Revenue",        value: `₹${totalRevenue.toLocaleString()}`, icon: "💳", border: "border-l-emerald-400" },
          { label: "Delivered",      value: delivered,                      icon: "✅", border: "border-l-green-400" },
          { label: "Pending",        value: pending,                        icon: "🕐", border: "border-l-orange-400" },
        ].map((s) => (
          <div key={s.label} className={`bg-white border border-gray-200 border-l-4 ${s.border} rounded-xl p-4`}>
            <p className="text-xl mb-1">{s.icon}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {allStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              filter === s
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1.5 text-gray-400">
                {orders.filter((o) => o.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading orders...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm">No orders found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((order, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                {/* Order icon + id */}
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  📦
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  {/* Items */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {item.name} × {item.quantity}
                        <span className="text-gray-400 ml-1">({item.size})</span>
                      </span>
                    ))}
                  </div>

                  {/* Customer row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="font-semibold text-gray-900">
                      {order.address.firstName} {order.address.lastName}
                    </span>
                    <span className="text-gray-500">{order.address.phone}</span>
                    <span className="text-gray-400 text-xs">
                      {order.address.city}, {order.address.state}, {order.address.country}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-gray-400">
                    <span>{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                    <span>{order.paymentMethod}</span>
                    <span className={order.payment ? "text-emerald-600 font-medium" : "text-orange-500 font-medium"}>
                      {order.payment ? "Paid" : "Payment pending"}
                    </span>
                  </div>
                </div>

                {/* Right: amount + status */}
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 flex-shrink-0">
                  <p className="text-base font-bold text-gray-900">₹{order.amount}</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle[order.status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {order.status}
                  </span>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition bg-white cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
