import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({ _id: items, size: item, quantity: cartItems[items][item] });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="pt-12 border-t border-gray-100">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
          <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
          <button onClick={() => navigate("/collection")} className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-full hover:bg-gray-700 transition">
            Browse Collection
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 mb-10">
            {cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;
              return (
                <div key={index} className="flex items-center gap-5 bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-200 transition">
                  <img src={productData.image[0]} alt="" className="w-20 h-20 object-cover rounded-xl bg-stone-50 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{productData.name}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-gray-900 font-semibold text-sm">{currency}{productData.price}</span>
                      <span className="bg-stone-100 text-gray-600 text-xs px-2.5 py-1 rounded-lg font-medium">{item.size}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition text-sm">−</button>
                      <span className="px-3 py-1.5 text-sm font-medium text-gray-900 border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 transition text-sm">+</button>
                    </div>
                    <button onClick={() => updateQuantity(item._id, item.size, 0)} className="text-gray-300 hover:text-red-400 transition p-1">
                      <img src={assets.bin_icon} className="w-4" alt="remove" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <div className="w-full sm:w-96">
              <CartTotal />
              <button onClick={() => navigate("/place-order")} className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-xl text-sm transition mt-4">
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
