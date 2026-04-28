import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-[520px] bg-stone-50 rounded-2xl overflow-hidden mt-4">
      {/* Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 px-10 sm:px-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-rose-400"></span>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">New Season</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            Latest<br />Arrivals
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Discover our newest collection — crafted for style, comfort, and every occasion.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-gray-700 transition"
          >
            Shop Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="w-full sm:w-1/2 relative overflow-hidden">
        <img src={assets.hero_img} alt="hero" className="w-full h-full object-cover" />
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
          <p className="text-xs text-gray-500">This season's pick</p>
          <p className="text-sm font-semibold text-gray-900">Trending Styles</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
