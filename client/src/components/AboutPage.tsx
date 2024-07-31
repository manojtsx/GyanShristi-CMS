// About.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faVolumeUp, faMicrophone, faFolderOpen, faGlobe } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        
        {/* Hero Section */}
        <div className="relative h-64 flex items-center justify-center bg-gradient-to-r from-[#3570E2] to-[#1E58C8]">
          <img
            src="AboutPageTopImage.webp" // Replace with your hero image URL
            alt="Gyanshristi"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <h1 className="relative text-4xl font-bold text-white drop-shadow-lg px-4">
            Welcome to Gyanshristi
          </h1>
        </div>

        {/* Introduction Section */}
        <section className="py-12 bg-white text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3D52A0] mb-6">About Gyanshristi</h2>
            <p className="text-gray-700 text-base mb-6">
              Gyanshristi is a cutting-edge AI-powered Content Management System designed to simplify and elevate content creation. From generating written content to audio and digital asset management, Gyanshristi provides a seamless experience.
            </p>
            <img
              src="AboutPageGirlImage.webp" // Replace with a relevant image URL
              alt="Gyanshristi Overview"
              className="w-full max-w-md rounded-lg shadow-lg mx-auto"
            />
          </div>
        </section>

        {/* Key Features Section */}
<section className="py-16">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-[#3D52A0] text-center mb-12">Key Features</h2>
    <div className="flex flex-wrap justify-center gap-14">
      
      {/* Feature 1 */}
      <div className="w-full md:w-80 lg:w-96 bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center">
        <h3 className="text-xl font-semibold text-white">AI-Powered Content</h3>
        </div>
        <div className="p-5 text-center ">
        <FontAwesomeIcon icon={faRobot} className="text-3xl text-[#3570E2] mb-4" />
          <p className="text-gray-700">
            Generate high-quality content effortlessly with advanced AI tools designed for ease and efficiency.
          </p>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="w-full md:w-80 lg:w-96 bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center">
        <h3 className="text-xl font-semibold text-white">Text-to-Speech</h3>
        </div>
        <div className="p-6 text-center">
        <FontAwesomeIcon icon={faVolumeUp} className="text-3xl text-[#3570E2] mb-4" />
          
          <p className="text-gray-700">
            Convert written text into natural-sounding speech for engaging and dynamic audio content.
          </p>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="w-full md:w-80 lg:w-96 bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center">
        <h3 className="text-xl font-semibold text-white">Voice Recognition</h3>
        </div>
        <div className="p-6 text-center">
        <FontAwesomeIcon icon={faMicrophone} className="text-3xl text-[#3570E2] mb-4"/>     
          <p className="text-gray-700">
            Utilize voice commands to create and edit content hands-free, enhancing your productivity and flexibility.
          </p>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="w-full md:w-80 lg:w-96 bg-gradient-to-r from-amber-50  to-indigo-100 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-indigo-200">
        <div className="bg-[#3570E2] p-5 flex items-center justify-center">
        <h3 className="text-xl font-semibold text-white">Content Management</h3>
        </div>
        <div className="p-6 text-center">
        <FontAwesomeIcon icon={faFolderOpen} className="text-3xl text-[#3570E2] mb-4" />  
          <p className="text-gray-700">
            Manage and organize your digital assets effortlessly with our robust content management system.
          </p>
        </div>
      </div>
      
    </div>
  </div>
</section>



        {/* Why Choose Us Section */}
        <section className="py-12  text-center px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3D52A0] mb-6">Why Choose Gyanshristi?</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <img
                  src="GlobalReach.webp" 
                  alt="Innovation"
                  className="w-24 h-24 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#3570E2] mb-2">Innovation</h3>
                <p className="text-gray-700 text-sm text-center">
                  Cutting-edge AI technology for exceptional content creation.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="UserFriendly.webp" 
                  alt="User-Friendly"
                  className="w-24 h-24 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#3570E2] mb-2">User-Friendly</h3>
                <p className="text-gray-700 text-sm text-center">
                  An intuitive interface that's easy to navigate and use.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="Accessibility.jpg" 
                  alt="Accessibility"
                  className="w-24 h-24 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#3570E2] mb-2">Accessibility</h3>
                <p className="text-gray-700 text-sm text-center">
                  Features like TTS and voice recognition for all users.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="Innovation.jpg" 
                  alt="Global Reach"
                  className="w-24 h-24 rounded-full mb-4 transform transition-transform duration-500 hover:scale-105 object-cover"
                />
                <h3 className="text-lg font-semibold text-[#3570E2] mb-2">Global Reach</h3>
                <p className="text-gray-700 text-sm text-center">
                  Multilingual support to engage a worldwide audience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="py-12 bg-[#3570E2] text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Our Commitment</h2>
            <p className="text-white text-base">
              At Gyanshristi, we are dedicated to providing a reliable, innovative platform for content creators. We continually improve our services to ensure you have the best tools at your disposal.
            </p>
          </div>
        </section>

        {/* Image Gallery */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#3D52A0] text-center mb-8">Explore Gyanshristi</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="transform transition-transform duration-500 hover:scale-105">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Feature 1"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="transform transition-transform duration-500 hover:scale-105">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Feature 2"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="transform transition-transform duration-500 hover:scale-105">
                <img
                  src="https://via.placeholder.com/400x300"
                  alt="Feature 3"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default About;
