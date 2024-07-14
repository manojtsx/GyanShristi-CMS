'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars,faXmark} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isClick, setIsClick] = useState(false);
  function toggleMenu(){
    setIsClick(!isClick);
  }
  return (
    <nav className="">
      <div className="h-12 flex justify-between items-center pl-1 pr-3" onClick={toggleMenu}>
      <Image src="/logo.png" alt="CMS Logo" width={45} height={45} className="rounded-[50%]"/>
      <ul className="hidden sm:flex justify-end gap-8 font-semibold">
          <li className="flex justify-center hover:bg-[rgb(162,204,243)] place-self-center p-2"><Link href="">Home</Link></li>
          <li className="flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href="">Notification</Link></li> 
          <li className="flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href="">Sign Up</Link></li>
          <li className="flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href="">Login</Link></li>
        </ul>
      {
        !isClick?(<FontAwesomeIcon icon={faBars} className="h-[60%] sm:hidden"/>): (<FontAwesomeIcon icon={faXmark} className="h-[60%] md:hidden"/>)
      }
      </div>
      {isClick && (
          <ul className="w-screen flex flex-col items-center font-semibold sm:hidden">
          <li className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] place-self-center p-2"><Link href="">Home</Link></li>
          <li className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href="">Notification</Link></li> 
          <li className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href="">Sign Up</Link></li>
          <li className="w-[inherit] flex justify-center hover:bg-[rgb(162,204,243)] p-2"><Link href="">Login</Link></li>
        </ul>
      )
    }
    </nav>
  );
}

export default Navbar;
