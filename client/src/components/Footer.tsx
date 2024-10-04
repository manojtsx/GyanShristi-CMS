import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareFacebook, faSquareInstagram, faSquareGithub} from '@fortawesome/free-brands-svg-icons'; 
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className=' bg-[#1E58C8] pt-10 pb-10 dark:bg-[#181818] dark:text-[#E0E0E0]'>
        {/* Mobile Responsive */}
        <div className='sm:hidden text-white flex flex-col gap-7 p-5'>
        <div className='flex flex-col gap-2'>
            <p className='text-lg font-semibold'>Contact Us</p>
            <ul className='text-[15px] flex flex-col gap-1 mb-5'>
                <li className='flex gap-2'><FontAwesomeIcon icon={faPhone} className='pt-[4px] dark:text-[#1E58C8]'/>9800000000</li>
                <li className='flex gap-2'><FontAwesomeIcon icon={faEnvelope} className='pt-[4px] dark:text-[#1E58C8]'/>abcde@gmail.com</li>
                <li className='flex gap-2'><FontAwesomeIcon icon={faLocationDot} className='pt-[4px] dark:text-[#1E58C8]'/><address>Damauli, Tanahun</address></li>
            </ul>
        <hr className='border-[rgb(216,197,197)]'/>
        </div>
        <div className='flex flex-col gap-5'>
            <div className='flex gap-5'>
            <p className='text-lg font-semibold'>Social Media</p>
            <ul className='flex gap-2'>
                <li><FontAwesomeIcon icon={faLinkedin} className='size-[35px] dark:text-[#3570E2]' /></li>
                <li><FontAwesomeIcon icon={faSquareFacebook} className='size-[35px] dark:text-[#3570E2]' /></li>
                <li><FontAwesomeIcon icon={faSquareInstagram} className='size-[35px] dark:text-[#3570E2]' /></li>
                <li><FontAwesomeIcon icon={faSquareGithub} className='size-[35px] dark:text-[#3570E2]' /></li>
            </ul>
            </div>
        <hr className='border-[rgb(216,197,197)]'/>
        </div>
        <form action="" className='flex flex-col gap-2'>
            <label htmlFor="newsletter" className='font-semibold text-lg'>Newsletter Signup</label>
            <input type='text' name='newsletter' placeholder='Username' className='max-w-56 rounded-[10px] border-none'/>
            <button className='h-[35px] max-w-56 bg-[#3570E2] rounded-[10px]'>Submit</button>
        </form>
        </div>
        {/* Big Screen Responsive */}
        <div className='flex justify-around text-white'>
        <div className='hidden sm:flex flex-col gap-2'>
            <p className='text-lg font-semibold'>Contact Us</p>
            <ul className='text-[15px] flex flex-col gap-1'>
                <li className='flex gap-2'><FontAwesomeIcon icon={faPhone} className='pt-[4px] dark:text-[#1E58C8]'/>9800000000</li>
                <li className='flex gap-2'><FontAwesomeIcon icon={faEnvelope} className='pt-[4px] dark:text-[#1E58C8]'/>abcde@gmail.com</li>
                <li className='flex gap-2'><FontAwesomeIcon icon={faLocationDot} className='pt-[4px] dark:text-[#1E58C8]'/><address>Damauli, Tanahun</address></li>
            </ul>
        </div>
        <div className='hidden sm:flex flex-col'>
            <p className='text-lg font-semibold'>Social Media</p>
            <ul className='flex'>
                <li><FontAwesomeIcon icon={faLinkedin} className='size-[35px] dark:text-[#3570E2]' /></li>
                <li><FontAwesomeIcon icon={faSquareFacebook} className='size-[35px] dark:text-[#3570E2]' /></li>
                <li><FontAwesomeIcon icon={faSquareInstagram} className='size-[35px] dark:text-[#3570E2]' /></li>
                <li><FontAwesomeIcon icon={faSquareGithub} className='size-[35px] dark:text-[#3570E2]' /></li>
            </ul>
        </div>
                           <div>
              <h3 className="text-lg font-semibold text-white mb-2">Other Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="/member" className="text-white hover:underline">Member</a>
                </li>
                <li>
                  <a href="/about" className="text-white hover:underline">About</a>
                </li>
                <li>
                  <a href="/login" className="text-white hover:underline">Login</a>
                </li>
                <li>
                  <a href="/register" className="text-white hover:underline">Register</a>
                </li>
              </ul>
            </div>
        </div>
    </footer>
  );
}

export default Footer