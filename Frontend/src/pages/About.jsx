import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className="w-full md:max-w-112.5" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum
            dolor sit amet consectetur.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            perspiciatis dolorem in praesentium illo cupiditate quidem quas
            architecto accusantium? Iusto repellendus exercitationem corrupti
            fugit sed sunt deserunt mollitia laborum debitis! Veniam tenetur,
            quo quidem aperiam enim odit dignissimos rerum sequi ullam? Modi
            officia commodi vero necessitatibus vel illo optio repellat tenetur,
            tempore eaque amet odit, deserunt iste aut laudantium sequi.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>
            We meticulously select and vet each product to ensure it meets our
            stringent
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience: </b>
          <p className='text-gray-600'>
            With our user-friendly interface and hassle-free ordering process,
            shopping
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer service </b>
          <p className='text-gray-600'>
            We provide exceptional customer service to ensure a smooth and
            satisfying shopping experience. Our support team is always ready to
            assist you with quick and reliable solutions.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
}

export default About