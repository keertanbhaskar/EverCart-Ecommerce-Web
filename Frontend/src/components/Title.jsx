import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-3">
      <p className="text-gray-400 font-medium tracking-wide">
        {text1} <span className="text-gray-900 font-semibold">{text2}</span>
      </p>
      <span className="w-10 h-0.5 bg-rose-400 rounded-full"></span>
    </div>
  );
};

export default Title;
