'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars,faXmark} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isClick, setIsClick] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  function toggleMenu(){
    setIsClick(!isClick);
  }
  function handleActiveLink(linkName: string){
    setActiveLink(linkName);
  }

  const navItems = [
    {id: 'home', name: 'Home', link : ''},
    {id: 'notification', name: 'Notification', link : ''},
    {id: 'signup', name: 'Sign Up', link : ''},
    {id: 'login', name: 'Login', link : ''},
  ]

  return (
    <nav>
      <div className="h-12 flex justify-between items-center pl-1 pr-3">
      <Image src="/logo.png" alt="CMS Logo" width={45} height={45} className="rounded-[50%]"/>
        <ul className="hidden sm:flex justify-between gap-8 font-semibold">
          {navItems.map((item,index)=>(
            <li key={index} className={`hover:bg-[rgb(162,204,243)] p-2 ${activeLink === item.id ?'border-b-2 border-[#1E58C8]' : ''}`} onClick={() => handleActiveLink(item.id)}><Link href={item.link}>{item.name}</Link></li>
          )
        )}
        </ul>
      {
        !isClick?(<FontAwesomeIcon icon={faBars} onClick={toggleMenu} className="h-[60%] sm:hidden"/>): (<FontAwesomeIcon icon={faXmark}  onClick={toggleMenu} className="h-[60%] md:hidden"/>)
      }
      </div>
      
      {isClick && (
          <ul className="w-screen flex flex-col items-start font-semibold sm:hidden">
             {navItems.map((item, index)=>(
          <li key={index} className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href={item.link}>{item.name}</Link></li>
        )
      )}    
        </ul>
      )
    }

    </nav>
  );
}

export default Navbar;