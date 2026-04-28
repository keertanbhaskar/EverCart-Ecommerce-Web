import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();

  return (
    <div className="bg-stone-50 rounded-2xl p-6">
      <div className="text-xl mb-4">
        <Title text1={"ORDER"} text2={"SUMMARY"} />
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <p>Subtotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>
        <div className="flex justify-between text-gray-600">
          <p>Shipping</p>
          <p>{subtotal === 0 ? "—" : `${currency}${delivery_fee}.00`}</p>
        </div>
        <hr className="border-gray-200 my-1" />
        <div className="flex justify-between font-semibold text-gray-900 text-base">
          <p>Total</p>
          <p>{currency}{subtotal === 0 ? 0 : subtotal + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
