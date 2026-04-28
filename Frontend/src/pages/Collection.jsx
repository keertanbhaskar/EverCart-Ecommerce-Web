import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (val) =>
    setCategory((prev) => prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]);

  const toggleSubCategory = (val) =>
    setSubCategory((prev) => prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]);

  const applyFilter = () => {
    let copy = products.slice();
    if (showSearch && search) copy = copy.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (category.length > 0) copy = copy.filter((i) => category.includes(i.category));
    if (subCategory.length > 0) copy = copy.filter((i) => subCategory.includes(i.subCategory));
    setFilterProducts(copy);
  };

  const sortProduct = () => {
    let copy = filterProducts.slice();
    if (sortType === 'low-high') setFilterProducts(copy.sort((a, b) => a.price - b.price));
    else if (sortType === 'high-low') setFilterProducts(copy.sort((a, b) => b.price - a.price));
    else applyFilter();
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
  useEffect(() => { sortProduct(); }, [sortType]);

  const CheckboxGroup = ({ title, options, selected, onToggle }) => (
    <div className="mb-6">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">{title}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => onToggle(opt)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition flex-shrink-0 ${selected.includes(opt) ? "bg-gray-900 border-gray-900" : "border-gray-300 group-hover:border-gray-500"}`}
            >
              {selected.includes(opt) && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t border-gray-100">
      {/* Sidebar filters */}
      <div className="w-full sm:w-56 flex-shrink-0">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center justify-between w-full sm:cursor-default mb-4"
        >
          <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Filters</p>
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`} />
        </button>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          <CheckboxGroup title="Category" options={["Men", "Women", "Kids"]} selected={category} onToggle={toggleCategory} />
          <CheckboxGroup title="Type" options={["Topwear", "Bottomwear", "Winterwear"]} selected={subCategory} onToggle={toggleSubCategory} />

          {(category.length > 0 || subCategory.length > 0) && (
            <button onClick={() => { setCategory([]); setSubCategory([]); }} className="text-xs text-rose-500 hover:text-rose-600 font-medium transition">
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            <p className="text-xs text-gray-400 -mt-2">{filterProducts.length} products</p>
          </div>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 transition bg-white"
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {filterProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-2">
            <p className="text-sm">No products match your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
