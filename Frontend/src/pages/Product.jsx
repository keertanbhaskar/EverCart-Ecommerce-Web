import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { ProductId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const found = products.find((item) => item._id.toString() === ProductId);
    if (found) { setProductData(found); setImage(found.image[0]); }
  }, [ProductId, products]);

  if (!productData) return <div className="min-h-[60vh]" />;

  return (
    <div className="border-t border-gray-100 pt-10">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 flex-1">
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[500px]">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl cursor-pointer flex-shrink-0 transition border-2 ${image === img ? "border-gray-900" : "border-transparent hover:border-gray-300"}`}
                alt=""
              />
            ))}
          </div>
          <div className="flex-1 bg-stone-50 rounded-2xl overflow-hidden aspect-square sm:aspect-auto">
            <img src={image} alt={productData.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 max-w-md">
          <h1 className="font-display text-2xl font-semibold text-gray-900 mb-2">{productData.name}</h1>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} className="w-3.5" alt="" />)}
            <img src={assets.star_dull_icon} className="w-3.5" alt="" />
            <span className="text-xs text-gray-400 ml-1">(122 reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-4">{currency}{productData.price}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{productData.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${s === size ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-xl text-sm transition mb-6"
          >
            Add to Cart
          </button>

          <div className="bg-stone-50 rounded-xl p-4 flex flex-col gap-2 text-xs text-gray-500">
            <p className="flex items-center gap-2"><span>✓</span> 100% Original Product</p>
            <p className="flex items-center gap-2"><span>✓</span> Cash on delivery available</p>
            <p className="flex items-center gap-2"><span>✓</span> Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description tabs */}
      <div className="mt-16">
        <div className="flex border-b border-gray-200 mb-6">
          <button className="px-6 py-3 text-sm font-semibold text-gray-900 border-b-2 border-gray-900">Description</button>
          <button className="px-6 py-3 text-sm text-gray-500 hover:text-gray-700 transition">Reviews (122)</button>
        </div>
        <div className="text-sm text-gray-500 leading-relaxed max-w-2xl flex flex-col gap-3">
          <p>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.</p>
          <p>Made from premium quality fabric ensuring comfort and durability for everyday wear.</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
