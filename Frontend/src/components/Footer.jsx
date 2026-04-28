import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-10 py-12">
        <div>
          <img src={assets.logo} className="w-28 mb-5" alt="logo" />
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Your go-to destination for modern fashion. Quality clothing for every style and every occasion.
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Company</p>
          <ul className="flex flex-col gap-2.5 text-sm text-gray-500">
            {["Home", "About Us", "Delivery", "Privacy Policy"].map((item) => (
              <li key={item} className="hover:text-gray-900 cursor-pointer transition">{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">Get in Touch</p>
          <ul className="flex flex-col gap-2.5 text-sm text-gray-500">
            <li>+91 12335-56724</li>
            <li>contact@evercart.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-400">
        &copy; 2026 EverCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
