import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="bg-white border-b border-gray-100 py-4 px-4">
      <div className="flex items-center max-w-lg mx-auto bg-stone-50 border border-gray-200 rounded-full px-5 py-2.5 gap-3">
        <img src={assets.search_icon} className="w-4 text-gray-400" alt="" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          type="text"
          placeholder="Search products..."
          autoFocus
        />
        <button onClick={() => setShowSearch(false)}>
          <img src={assets.cross_icon} className="w-3 opacity-50 hover:opacity-100 transition" alt="close" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
