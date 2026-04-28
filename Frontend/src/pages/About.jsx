import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="border-t border-gray-100">
      <div className="text-center pt-12 pb-4">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row gap-12 my-10 items-center">
        <img src={assets.about_img} alt="about" className="w-full md:max-w-sm rounded-2xl object-cover" />
        <div className="flex flex-col gap-5 text-gray-600 text-sm leading-relaxed">
          <p>We started EverCart with a simple belief — great fashion should be accessible to everyone. From everyday basics to statement pieces, we curate collections that fit your lifestyle.</p>
          <p>Our team works directly with manufacturers to bring you quality clothing at honest prices, with a commitment to sustainable and ethical practices.</p>
          <div className="bg-stone-50 rounded-2xl p-6 mt-2">
            <p className="font-semibold text-gray-900 mb-2">Our Mission</p>
            <p>To make modern, quality fashion accessible to everyone — delivered with care, backed by trust, and built to last.</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          { title: "Quality Assurance", desc: "Every product is carefully selected and quality-checked before it reaches you." },
          { title: "Convenience", desc: "A seamless shopping experience from browsing to delivery, designed around you." },
          { title: "Customer Support", desc: "Our support team is available 24/7 to help with any questions or concerns." },
        ].map((item) => (
          <div key={item.title} className="bg-stone-50 rounded-2xl p-6 border border-gray-100">
            <p className="font-semibold text-gray-900 mb-2 text-sm">{item.title}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
