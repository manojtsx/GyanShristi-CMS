// About.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faVolumeUp, faMicrophone, faFolderOpen, faGlobe } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import ApplyAsAuthorButton from '@/components/viewer-component/ApplyAsAuthorButton';

const About = () => {
  return (
    <div className="min-h-screen dark:bg-[#121212] dark:text-[#E0E0E0] ">
        {/* Hero Section Top Image*/}
          <Image
            src="/GyanShristiBanner.png"
            alt="Gyanshristi" width={1000} height={1000}
            className="h-96 w-screen object-cover"
          />
        {/* Introduction Section */}
        <section className="py-8 bg-white text-center px-6 md:flex justify-around dark:bg-[#1A1A1A] dark:text-[#B0B0B0]">
          {/* <div className="max-w-3xl mx-auto flex"> */}
          <div className='flex flex-col px-1 items-center justify-center mb-5 md:w-96 md:gap-1'>
            <h2 className="text-2xl font-bold text-[#3D52A0] pb-1 md:text-3xl dark:text-[#E0E0E0]">About Gyanshristi</h2>
            <p className=" text-xs text-center md:text-sm md:mb-6 dark:text-[#B0B0B0]">
              Gyanshristi is a cutting-edge AI-powered Content Management System designed to simplify and elevate content creation. From generating written content to audio and digital asset management, Gyanshristi provides a seamless experience.
            </p>
            <div className='hidden md:flex'>
            <ApplyAsAuthorButton/>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center absolute z-10 animate-bounce hover:animate-none md:hidden'>
            <ApplyAsAuthorButton/>
            </div>
          <Image
              src="/AboutPageGirlImage.webp"
              alt="Gyanshristi Overview" width={500} height={500}
              className="rounded-lg shadow-lg mx-auto relative opacity-65 md:opacity-100"
            />   
          </div>
        </section>

        {/* Key Features Section */}
<section className="py-16 dark:bg-[#121212]">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-2xl md:text-3xl font-bold text-[#3D52A0] text-center mb-12 dark:text-[#E0E0E0]">Key Features</h2>
    <div className="flex flex-col md:flex-row gap-10 md:justify-around md:gap-14">

      {/* Feature 1 */}
      <div className="w-full md:w-80 lg:w-96 dark:from-[#1E58C8] dark:to-[#3A77E5] dark:hover:bg-gradient-to-r dark:hover:from-[#285BA8] dark:hover:to-[#3A77E5] bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:-translate-y-5 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center dark:bg-[#1E58C8]">
        <h3 className="text-xl font-semibold text-white">Text-to-Speech</h3>
        </div>
        <div className="p-6 text-center dark:bg-[#1A1A1A]">
        <FontAwesomeIcon icon={faVolumeUp} className="text-3xl text-[#3570E2] mb-4" />
          
          <p className="text-gray-700 dark:text-[#B0B0B0]">
            Convert written text into natural-sounding speech for engaging and dynamic audio content.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="w-full md:w-80 lg:w-96 bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:-translate-y-5 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200 dark:from-[#1E58C8] dark:to-[#3A77E5] dark:hover:bg-gradient-to-r dark:hover:from-[#285BA8] dark:hover:to-[#3A77E5]">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center dark:bg-[#1E58C8]">
        <h3 className="text-xl font-semibold text-white">Voice Recognition</h3>
        </div>
        <div className="p-6 text-center dark:bg-[#1A1A1A]">
        <FontAwesomeIcon icon={faMicrophone} className="text-3xl text-[#3570E2] mb-4"/>     
          <p className="text-gray-700 dark:text-[#B0B0B0]">
            Utilize voice commands to create and edit content hands-free, enhancing your productivity and flexibility.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="w-full md:w-80 lg:w-96 bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:-translate-y-5 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200 dark:from-[#1E58C8] dark:to-[#3A77E5] dark:hover:bg-gradient-to-r dark:hover:from-[#285BA8] dark:hover:to-[#3A77E5]">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center dark:bg-[#1E58C8]">
        <h3 className="text-xl font-semibold text-white">Content Management</h3>
        </div>
        <div className="p-6 text-center dark:bg-[#1A1A1A]">
        <FontAwesomeIcon icon={faFolderOpen} className="text-3xl text-[#3570E2] mb-4" />  
          <p className="text-gray-700 dark:text-[#B0B0B0]">
            Manage and organize your digital assets effortlessly with our robust content management system.
          </p>
        </div>
      </div>
      
    </div>
  </div>
</section>



        {/* Why Choose Us Section */}
        <section className="py-12  text-center px-6 bg-[#1E58C8] dark:bg-[#1A1A1A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 dark:text-[#E0E0E0]">Why Choose Gyanshristi?</h2>
            <div className="grid md:gap-6 gap-10 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <div className='w-36 h-36 overflow-hidden rounded-full mb-1'>
                <Image
                  src="/Innovation.jpg" 
                  alt="Innovation" width={500} height={500}
                  className="w-36 h-36 mb-4 transform transition-transform duration-1000 hover:scale-150 object-cover"
                />
                </div>
                <h3 className="text-lg text-[#ececee] font-semibold md:mb-2 dark:text-[#E0E0E0]">Innovation</h3>
                <p className="text-sm text-[#ececee] text-center dark:text-[#B0B0B0]">
                  Cutting-edge AI technology for exceptional content creation.
                </p>
              </div>
              <div className="flex flex-col items-center">
              <div className='w-36 h-36 overflow-hidden rounded-full mb-1'>
                <Image
                  src="/UserFriendly.webp" 
                  alt="User-Friendly" width={500} height={500}
                  className="w-36 h-36 rounded-full mb-4 transform transition-transform duration-1000 hover:scale-150 object-cover"
                />
                </div>
                <h3 className="text-lg text-[#ececee] font-semibold md:mb-2 dark:text-[#E0E0E0]">User-Friendly</h3>
                <p className="text-sm text-[#ececee] text-center dark:text-[#B0B0B0]">
                  An intuitive interface that's easy to navigate and use.
                </p>
              </div>
              <div className="flex flex-col items-center">
              <div className='w-36 h-36 overflow-hidden rounded-full mb-1'>
                <Image
                  src="/Accessibility.jpg" 
                  alt="Accessibility" width={500} height={500}
                  className="w-36 h-36 rounded-full mb-4 transform transition-transform duration-1000 hover:scale-150 object-cover"
                />
                </div>
                <h3 className="text-lg text-[#ececee] font-semibold md:mb-2 dark:text-[#E0E0E0]">Accessibility</h3>
                <p className="text-sm text-[#ececee] text-center dark:text-[#B0B0B0]">
                  Features like TTS and voice recognition for all users.
                </p>
              </div>
              <div className="flex flex-col items-center">
              <div className='w-36 h-36 overflow-hidden rounded-full mb-1'>
                <Image
                  src="/GlobalReach.webp" 
                  alt="Global Reach" width={500} height={500}
                  className="w-36 h-36 rounded-full mb-4 transform transition-transform duration-1000 hover:scale-150 object-cover"
                />
                </div>
                <h3 className="text-lg text-[#ececee] font-semibold md:mb-2 dark:text-[#E0E0E0]">Global Reach</h3>
                <p className="text-sm text-[#ececee] text-center dark:text-[#B0B0B0]">
                  Multilingual support to engage a worldwide audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-12 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3570E2] mb-4 dark:text-[#E0E0E0]">Our Commitment</h2>
            <p className="text-base dark:text-[#B0B0B0]">
              At Gyanshristi, we are dedicated to providing a reliable, innovative platform for content creators. We continually improve our services to ensure you have the best tools at your disposal.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        {/* <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3D52A0] text-center mb-8">Explore Gyanshristi</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/"
                  alt="Feature 1" width={500} height={500}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/"
                  alt="Feature 2" width={500} height={500}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="transform transition-transform duration-500 hover:scale-105">
                <Image
                  src="/"
                  alt="Feature 3" width={500} height={500}
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section> */}
        
    </div>
  );
};

export default About;
