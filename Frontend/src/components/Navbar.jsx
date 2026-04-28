import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, navigate } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <nav className="flex items-center justify-between py-4 border-b border-gray-100">
      <Link to="/">
        <img src={assets.logo} className="w-28" alt="logo" />
      </Link>

      {/* Desktop nav */}
      <ul className="hidden sm:flex gap-8 text-sm font-medium text-gray-600">
        {[
          { to: "/", label: "HOME" },
          { to: "/collection", label: "COLLECTION" },
          { to: "/about", label: "ABOUT" },
          { to: "/contact", label: "CONTACT" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-gray-900 transition ${isActive ? "text-gray-900" : ""}`
            }
          >
            <p>{label}</p>
            <hr className="w-full border-none h-[2px] bg-gray-900 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-5">
        <button onClick={() => setShowSearch(true)} className="text-gray-600 hover:text-gray-900 transition">
          <img src={assets.search_icon} className="w-5" alt="search" />
        </button>

        {/* Profile dropdown */}
        <div className="group relative">
          <Link to={token ? "#" : "/login"}>
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="profile" />
          </Link>
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-3 z-50">
              <div className="bg-white border border-gray-100 rounded-xl shadow-lg py-2 w-40 text-sm text-gray-600">
                <p className="px-4 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer rounded-lg mx-1 transition">My Profile</p>
                <p onClick={() => navigate("/orders")} className="px-4 py-2 hover:bg-gray-50 hover:text-gray-900 cursor-pointer rounded-lg mx-1 transition">My Orders</p>
                <hr className="my-1 border-gray-100" />
                <p onClick={logout} className="px-4 py-2 hover:bg-red-50 hover:text-red-600 cursor-pointer rounded-lg mx-1 transition">Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="cart" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* Mobile menu */}
        <button onClick={() => setVisible(true)} className="sm:hidden text-gray-600">
          <img src={assets.menu_icon} className="w-5" alt="menu" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${visible ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${visible ? "opacity-100" : "opacity-0"}`} onClick={() => setVisible(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${visible ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <span className="font-semibold text-gray-900">Menu</span>
            <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600">
              <img src={assets.cross_icon} className="w-4" alt="close" />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/collection", label: "Collection" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setVisible(false)}
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
