'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars,faXmark} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import ViewMode from "./mini-component/ViewMode";

function Navbar() {
  const [isClick, setIsClick] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const[isDarkMode, setIsDarkMode] = useState(false);

  function toggleIcon(){
    setIsDarkMode(!isDarkMode);
  }

  function toggleMenu(){
    setIsClick(!isClick);
  }
  function handleActiveLink(linkName: string){
    setActiveLink(linkName);
  }

  const navItems = [
    {id: 'home', name: 'Home', link : '/'},
    {id: 'notification', name: <FontAwesomeIcon icon={faBell} className="h-5 w-5"/>, link : '/notification'},
    {id: 'about', name: 'About', link : '/about'},
    {id: 'signup', name: 'Sign Up', link : '/register'},
    {id: 'login', name: 'Login', link : '/login'},
  ]

  return (
    <nav className="dark:bg-gray-900 dark:text-white">
      <Image src='/GyanShristiAdBanner.png' width={500} height={500} alt="Advertisement" className="w-screen h-28 object-fit" />
      <div className="h-12 flex justify-between items-center pl-1 pr-3">
      <Image src="/logo.png" alt="CMS Logo" width={45} height={45} className="rounded-[50%]"/>
        <ul className="hidden sm:flex justify-between gap-8 font-semibold">
          {navItems.map((item,index)=>(
            <Link href={item.link} key={index}> <li className={`hover:bg-[rgb(162,204,243)] p-2 ${activeLink === item.id ?'border-b-2 border-[#1E58C8]' : ''}`} onClick={() => handleActiveLink(item.id)}>{item.name}</li></Link>
          )
        )}

        <ViewMode/>

        {/* <div className='flex flex-col justify-center'>
        <div className='h-2 w-12 bg-[#E8E4E4] rounded-full absolute'></div>
        <div className='flex items-center justify-between w-14'>
         {isDarkMode ? (
         
          <FontAwesomeIcon
            icon={faMoon}
            className={`h-4 w-4  bg-white  text-black rounded-full p-1 relative translate-x-8 ${isDarkMode ? ' bg-white  text-black' : '' }`}
            onClick={toggleIcon}
          />
        ) : (
          <FontAwesomeIcon
          icon={faSun}
          className={`h-4 w-4 rounded-full bg-black  text-white p-1 relative ${!isDarkMode ? ' bg-black  text-white' : '' }`}
          onClick={toggleIcon}
        />
        )}
        </div>
    </div> */}

        </ul>
      {
        !isClick?(<FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="h-[60%] sm:hidden"/>): (<FontAwesomeIcon icon={faXmark}  onClick={toggleMenu} className="h-[60%] md:hidden"/>)
      }
      </div>
      
      {isClick && (
          <ul className="w-screen flex flex-col items-start font-semibold sm:hidden">
             {navItems.map((item, index)=>(
          <Link href={item.link} key={index}><li className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] p-2">{item.name}</li></Link>
        )
      )}    
        </ul>
      )
    }
    </nav>
  );
}

export default Navbar;