import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="h-12 bg-gray-500 flex justify-between items-center pl-1 pr-1">
      <Image src="/logo.png" alt="CMS Logo" width={45} height={45} className="rounded-[50%]"/>
      <FontAwesomeIcon icon={faBars} className="h-[70%]"/> 
      <ul className="hidden">
        <li>Home</li>
        <li>Notification</li> 
        <li>Sign Up</li>
        <li>Login</li>
      </ul>
    </div>
  );
}

export default Navbar;
