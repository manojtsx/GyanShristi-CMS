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
  
  function toggleMenu(){
    setIsClick(!isClick);
  }

  function handleActiveLink(linkName: string){
    setActiveLink(linkName);
    setIsClick(false);
  }

  const navItems = [
    {id: 'home', name: 'Home', link : '/'},
    {id: 'notification', name: <FontAwesomeIcon icon={faBell} className="h-5 w-5"/>, link : '/notification'},
    {id: 'about', name: 'About', link : '/about'},
    {id: 'signup', name: 'Sign Up', link : '/register'},
    {id: 'login', name: 'Login', link : '/login'},
  ]

  return (
    <nav className="dark:bg-[#1A1A1A] dark:text-white fixed top-0 left-0 w-full z-10">
      <Image src='/GyanShristiAdBanner.png' width={500} height={500} alt="Advertisement" className="w-screen h-28 object-cover" />
      <div className="h-12 flex justify-between items-center pl-1 pr-3 bg-white dark:bg-[#1A1A1A] shadow-md">
      <Image src="/logo.png" alt="CMS Logo" width={45} height={45} className="rounded-full"/>
        <ul className="hidden sm:flex justify-between gap-8 font-semibold">
          {navItems.map((item,index)=>(
            <Link href={item.link} key={index}> <li className={`dark:text-[#E0E0E0] hover:bg-[rgb(162,204,243)] dark:hover:bg-[#1E58C8] p-2 ${activeLink === item.id ?'border-b-2 border-[#1E58C8]' : ''}`} onClick={() => handleActiveLink(item.id)}>{item.name}</li></Link>
          )
        )}

        <ViewMode/>

        </ul>
      {/* {
        !isClick?(<FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="h-[60%] sm:hidden"/>): (<FontAwesomeIcon icon={faXmark}  onClick={toggleMenu} className="h-[60%] md:hidden"/>)
      }
      </div>
      
      {isClick && (
          <ul className="w-screen flex flex-col items-start font-semibold bg-white dark:bg-[#1A1A1A] sm:hidden">
             {navItems.map((item, index)=>(
          <Link href={item.link} key={index}><li className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] dark:hover:bg-[#1E58C8] p-2">{item.name}</li></Link>
        )
      )}    
        </ul>
      )
    }
    </nav>
  );
} */}

    {/* Mobile Menu Toggle */}
    <FontAwesomeIcon
          icon={isClick ? faXmark : faBars}
          onClick={toggleMenu}
          className="h-[60%] sm:hidden"
        />
      </div>

      {/* Mobile Menu */}
      {isClick && (
        <ul className="w-full flex flex-col items-start font-semibold bg-white dark:bg-[#1A1A1A] sm:hidden">
          {navItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <li
                className="w-full flex justify-center hover:bg-[rgb(162,204,243)] dark:hover:bg-[#1E58C8] p-2"
                onClick={() => handleActiveLink(item.id)}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
}
export default Navbar;