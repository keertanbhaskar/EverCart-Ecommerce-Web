import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing. Lorem, ipsum
            dolor sit amet consectetur adipisicing.
          </p>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+2-234-452-6789</li>
            <li>contact@evercart.com</li>
          </ul>
        </div>
      </div>
      <div className="">
        <hr />
        <p className="py-5 text-sm text-center">
         Copyright &copy;2026 everCart.com - All Right Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer