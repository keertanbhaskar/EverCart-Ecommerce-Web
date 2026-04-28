import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const setImage = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const toggleSize = (size) =>
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const resetForm = () => {
    setName(""); setDescription(""); setPrice("");
    setImages([false, false, false, false]);
    setSizes([]); setBestseller(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      images.forEach((img, i) => img && formData.append(`image${i + 1}`, img));

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });
      if (response.data.success) {
        toast.success("Product added!");
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const inputCls = "w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-2xl">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Add product</h1>
        <p className="text-sm text-gray-500 mt-0.5">Fill in the details below to add a new product to your store</p>
      </div>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">

        {/* Images */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Product images</h2>
          <div className="flex gap-3 flex-wrap">
            {images.map((img, i) => (
              <label
                key={i}
                htmlFor={`image${i}`}
                className="relative w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-emerald-500 cursor-pointer overflow-hidden transition group bg-gray-50"
              >
                {img ? (
                  <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-400 group-hover:text-emerald-500 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs">Photo {i + 1}</span>
                  </div>
                )}
                <input onChange={(e) => setImage(i, e.target.files[0])} type="file" id={`image${i}`} hidden accept="image/*" />
              </label>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">Upload up to 4 product images. First image will be the cover.</p>
        </div>

        {/* Basic info */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-800">Product details</h2>
          <div>
            <label className={labelCls}>Product name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className={inputCls} type="text" placeholder="e.g. Men's Cotton T-Shirt" required />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className={inputCls + " resize-none h-24"} placeholder="Describe the product..." required />
          </div>
        </div>

        {/* Category & Price */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Category & pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Sub-category</label>
              <select onChange={(e) => setSubCategory(e.target.value)} className={inputCls}>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Price (₹)</label>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className={inputCls} type="number" placeholder="0.00" required />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Available sizes</h2>
          <div className="flex gap-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                  sizes.includes(size)
                    ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                    : "bg-white border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">Bestseller</p>
            <p className="text-xs text-gray-500 mt-0.5">Show this product in the bestseller section on the homepage</p>
          </div>
          <button
            type="button"
            onClick={() => setBestseller((p) => !p)}
            className={`relative w-11 h-6 rounded-full transition-colors ${bestseller ? "bg-emerald-500" : "bg-gray-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${bestseller ? "translate-x-5" : ""}`} />
          </button>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <button type="button" onClick={resetForm} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Discard
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition disabled:opacity-60">
            {loading ? "Saving..." : "Save product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
