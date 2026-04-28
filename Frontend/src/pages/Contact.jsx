import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="border-t border-gray-100">
      <div className="text-center pt-12 pb-4">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="flex flex-col md:flex-row gap-12 my-10 items-center mb-20">
        <img src={assets.contact_img} alt="contact" className="w-full md:max-w-sm rounded-2xl object-cover" />
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-semibold text-gray-900 mb-2">Our Store</p>
            <p className="text-gray-500 text-sm leading-relaxed">78508 Sam Station, Suite 234<br />Bangalore, India — 560001</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Get in Touch</p>
            <p className="text-gray-500 text-sm">Tel: (+91) 12335-56724</p>
            <p className="text-gray-500 text-sm">Email: admin@everCart.com</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">Careers at EverCart</p>
            <p className="text-gray-500 text-sm mb-4">We're always looking for passionate people to join our team.</p>
            <button className="border border-gray-900 text-gray-900 text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-gray-900 hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
