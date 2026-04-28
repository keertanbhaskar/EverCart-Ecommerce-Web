import React from 'react';
import { assets } from '../assets/assets';

const policies = [
  { icon: assets.exchange_icon, title: "Easy Exchange", desc: "Hassle-free exchange on all orders" },
  { icon: assets.quality_icon,  title: "7-Day Returns",  desc: "Free returns within 7 days" },
  { icon: assets.support_img,   title: "24/7 Support",   desc: "We're here whenever you need us" },
];

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-16">
      {policies.map((p) => (
        <div key={p.title} className="flex items-center gap-4 bg-stone-50 rounded-2xl px-6 py-5">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <img src={p.icon} alt={p.title} className="w-6 h-6" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
            <p className="text-gray-500 text-xs mt-0.5">{p.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;
