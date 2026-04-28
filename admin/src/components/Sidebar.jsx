import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  {
    to: "/add",
    label: "Add Product",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    to: "/list",
    label: "Products",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
      </svg>
    ),
  },
  {
    to: "/orders",
    label: "Orders",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  return (
    <aside className="w-56 min-h-full bg-white border-r border-gray-200 py-5 px-3 flex flex-col gap-1">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Menu</p>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
