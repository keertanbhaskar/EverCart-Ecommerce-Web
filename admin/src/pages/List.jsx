import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const categoryBadge = {
  Men:   "bg-blue-50 text-blue-700 border border-blue-200",
  Women: "bg-pink-50 text-pink-700 border border-pink-200",
  Kids:  "bg-amber-50 text-amber-700 border border-amber-200",
};

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Remove this product?")) return;
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
      if (response.data.success) {
        toast.success("Product removed");
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const filtered = list.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">{list.length} products in your store</p>
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition w-60 bg-white"
          />
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Table head */}
        <div className="hidden md:grid grid-cols-[56px_1fr_110px_90px_60px] gap-4 px-5 py-3 border-b border-gray-100 bg-gray-50">
          {["Image", "Name", "Category", "Price", ""].map((h, i) => (
            <span key={i} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</span>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 text-sm">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          filtered.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[56px_1fr_auto] md:grid-cols-[56px_1fr_110px_90px_60px] gap-4 items-center px-5 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
            >
              <img src={item.image[0]} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.subCategory}</p>
              </div>
              <span className={`hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryBadge[item.category] || "bg-gray-100 text-gray-600"}`}>
                {item.category}
              </span>
              <p className="hidden md:block text-sm font-semibold text-gray-900">₹{item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition ml-auto md:mx-auto"
                title="Remove product"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
