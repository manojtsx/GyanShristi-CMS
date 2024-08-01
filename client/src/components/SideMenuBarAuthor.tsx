"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { BiSolidBookContent } from "react-icons/bi";
import { VscCommentDiscussion } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import Logout from "./Logout";

const SideMenuBarAuthor = () => {
  const [open, setOpen] = useState(true);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleCloseModal = () => {
    setLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    // Add your logout logic here
    setLogoutModalOpen(false);
  };

  const menuItems = [
    { icon: <GoHome />, label: "Home" },
    { icon: <BiSolidBookContent />, label: "Content" },
    { icon: <VscCommentDiscussion />, label: "Comment" },
    { icon: <FaRegBell />, label: "Notification" },
    { icon: <TbCategoryFilled />, label: "Category" },
  ];

  return (
    <div
      className={`h-screen bg-[#011936] ${
        open ? "w-56" : "w-20"
      } duration-300 relative flex flex-col`}
    >
      <BsArrowLeftShort
        className={`text-[#011936] text-2xl bg-slate-50 rounded-full border border-[#011936] absolute -right-3 top-5 cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex justify-center items-center mt-8">
        <Image
          src="/logo.png"
          width={80}
          height={80}
          className={`rounded-full border-[#011936] ${
            !open && "w-16 h-16"
          } duration-300`}
          alt="Logo"
        />
      </div>
      <ul className="mt-10 flex-grow">
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              className={`flex items-center p-3 text-gray-300 mb-2 hover:bg-gray-700 rounded-md cursor-pointer ${
                !open ? "justify-center" : "pl-6"
              } duration-300`}
            >
              <div className="text-2xl">{item.icon}</div>
              <span
                className={`ml-4 text-[#D9D9D9] ${
                  !open && "hidden"
                } duration-300`}
              >
                {item.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div
        className={`flex items-center text-gray-300 space-x-3 mb-4 hover:bg-gray-700 rounded-md cursor-pointer ${
          !open ? "justify-center" : "pl-5"
        } duration-300`}
      >
        <Image
          src="/logo.png"
          width={45}
          height={45}
          className="rounded-full border-[#011936]"
          alt="Logo"
        />
        <p className={` text-[#D9D9D9] mt-2 ${!open && "hidden"} duration-300`}>
          Usha Gurung
        </p>
      </div>
      <div
        className={`flex items-center p-1 text-[#D9D9D9] space-x-4 mb-12 hover:bg-gray-700 rounded-md cursor-pointer ${
          !open ? "justify-center" : "pl-6"
        }`}
        onClick={handleLogoutClick}
      >
        <HiOutlineLogout className=" text-[#D9D9D9] text-3xl" />
        <p className={` text-[#D9D9D9] ${!open && "hidden"} duration-300`}>
          LogOut
        </p>
      </div>
      <Logout
        isOpen={logoutModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default SideMenuBarAuthor;
