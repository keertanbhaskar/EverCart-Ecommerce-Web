import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: "",
  });

  const onChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((p) => p._id === items));
            if (itemInfo) { itemInfo.size = item; itemInfo.quantity = cartItems[items][item]; orderItems.push(itemInfo); }
          }
        }
      }
      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };
      if (method === "cod") {
        const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) { setCartItems({}); navigate("/orders"); }
        else toast.error(response.data.message);
      }
    } catch (error) { toast.error(error.message); }
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 transition bg-stone-50";

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row gap-10 pt-10 border-t border-gray-100 min-h-[80vh]">
      {/* Left */}
      <div className="flex-1">
        <div className="text-xl mb-6">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <input required onChange={onChange} name="firstName" value={formData.firstName} className={inputCls} type="text" placeholder="First name" />
            <input required onChange={onChange} name="lastName" value={formData.lastName} className={inputCls} type="text" placeholder="Last name" />
          </div>
          <input required onChange={onChange} name="email" value={formData.email} className={inputCls} type="email" placeholder="Email address" />
          <input required onChange={onChange} name="street" value={formData.street} className={inputCls} type="text" placeholder="Street address" />
          <div className="flex gap-3">
            <input required onChange={onChange} name="city" value={formData.city} className={inputCls} type="text" placeholder="City" />
            <input onChange={onChange} name="state" value={formData.state} className={inputCls} type="text" placeholder="State" />
          </div>
          <div className="flex gap-3">
            <input required onChange={onChange} name="zipcode" value={formData.zipcode} className={inputCls} type="number" placeholder="Zipcode" />
            <input required onChange={onChange} name="country" value={formData.country} className={inputCls} type="text" placeholder="Country" />
          </div>
          <input required onChange={onChange} name="phone" value={formData.phone} className={inputCls} type="number" placeholder="Phone number" />
        </div>
      </div>

      {/* Right */}
      <div className="w-full lg:w-96 flex flex-col gap-5">
        <CartTotal />

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="text-base mb-4">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          <div className="flex flex-col gap-3">
            {[
              { id: "stripe", label: null, logo: assets.stripe_logo },
              { id: "razorpay", label: null, logo: assets.razorpay_logo },
              { id: "cod", label: "Cash on Delivery", logo: null },
            ].map(({ id, label, logo }) => (
              <div
                key={id}
                onClick={() => setMethod(id)}
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${method === id ? "border-rose-400 bg-rose-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition ${method === id ? "border-rose-500 bg-rose-500" : "border-gray-300"}`} />
                {logo ? <img className="h-5" src={logo} alt={id} /> : <p className="text-sm font-medium text-gray-700">{label}</p>}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-xl text-sm transition">
          Place Order →
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
