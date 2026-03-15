import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className='w-full md:max-w-120' src={assets.contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'> 78508 Sam Station <br /> Suite 234, Bangalore ,India</p>
          <p className='text-gray-500'>Tel:(+91) 12335-56724 <br />Email:admin@everCart.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at EverCart</p>
          <p className='text-gray-500'>Learn More about teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm rounded-xl hover:bg-black hover:text-white transition-all duration-500 hover:rounded-2xl'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact