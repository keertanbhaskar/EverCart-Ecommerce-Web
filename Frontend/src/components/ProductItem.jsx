import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className="group text-gray-700 cursor-pointer">
      <div className="overflow-hidden rounded-xl bg-stone-50 aspect-[3/4]">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-in-out"
          src={image[0]}
          alt={name}
        />
      </div>
      <div className="pt-3 px-1">
        <p className="text-sm text-gray-800 font-medium truncate">{name}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
