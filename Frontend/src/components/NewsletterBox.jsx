import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (e) => e.preventDefault();

  return (
    <div className="bg-stone-50 rounded-2xl px-8 py-14 text-center my-10">
      <p className="font-display text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
        Get 20% off your first order
      </p>
      <p className="text-gray-500 text-sm mb-8">
        Subscribe to our newsletter and be the first to know about new arrivals and exclusive deals.
      </p>
      <form onSubmit={onSubmitHandler} className="flex items-center max-w-md mx-auto bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm">
        <input
          className="flex-1 px-5 py-3 text-sm outline-none text-gray-700 placeholder-gray-400"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-gray-900 text-white text-xs font-semibold px-6 py-3 hover:bg-gray-700 transition rounded-full m-1"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
