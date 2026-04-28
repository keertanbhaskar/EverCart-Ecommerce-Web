import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const statusColor = {
  "Order Placed":     "bg-blue-50 text-blue-600 border-blue-200",
  "Packing":          "bg-yellow-50 text-yellow-600 border-yellow-200",
  "Shipped":          "bg-purple-50 text-purple-600 border-purple-200",
  "Out for delivery": "bg-orange-50 text-orange-600 border-orange-200",
  "Delivered":        "bg-emerald-50 text-emerald-600 border-emerald-200",
};

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        let all = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            all.push({ ...item, status: order.status, payment: order.payment, paymentMethod: order.paymentMethod, date: order.date });
          });
        });
        setOrderData(all.reverse());
      }
    } catch (error) { console.log(error); }
  };

  useEffect(() => { loadOrderData(); }, [token]);

  return (
    <div className="pt-12 border-t border-gray-100">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
          <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 font-medium">No orders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orderData.map((item, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-5 hover:border-gray-200 transition">
              <img src={item.image[0]} alt="" className="w-20 h-20 object-cover rounded-xl bg-stone-50 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{currency}{item.price}</span>
                  <span className="text-gray-300">·</span>
                  <span>Qty: {item.quantity}</span>
                  <span className="bg-stone-100 text-gray-600 text-xs px-2 py-0.5 rounded-md">{item.size}</span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                  <span>{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span>{item.paymentMethod}</span>
                  <span className={item.payment ? "text-emerald-500 font-medium" : "text-orange-400 font-medium"}>
                    {item.payment ? "Paid" : "Payment pending"}
                  </span>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusColor[item.status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {item.status}
                </span>
                <button onClick={loadOrderData} className="text-xs text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:border-gray-300 hover:text-gray-700 transition">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
