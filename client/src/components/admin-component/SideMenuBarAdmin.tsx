"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { BiSolidBookContent } from "react-icons/bi";
import { VscCommentDiscussion } from "react-icons/vsc";
import { FaRegBell } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import Logout from "../Logout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const SideMenuBarAdmin = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false); //submenu
  const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal
  const [activeMenuItem, setActiveMenuItem] = useState<string>(""); // Active menu item

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
  const handleNavigation = (path?: string, label?: string) => {
    setActiveMenuItem(label || "Default Label");
    router.push(path || "/default-path");
  };

  const menuItems = [
    { icon: <GoHome />, label: "Home", path: "/admin/dashboard" },
    { icon: <BiSolidBookContent />, label: "Content", path: "/admin/content" },
    {
      icon: <VscCommentDiscussion />,
      label: "Comment",
      path: "/admin/comment",
    },
    { icon: <FaRegBell />, label: "Notification", path: "/admin/notification" },
    { icon: <TbCategoryFilled />, label: "Category", path: "/admin/category" },
    {
      icon: <FiUser />,
      label: "User",
      path: "/admin/user",
      submenu: [
        { label: "Viewer", path: "/admin/viewer" },
        { label: "Author", path: "/admin/author" },
        { label: "Editor", path: "/admin/editor" },
      ],
    },
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
      <ul className="mt-8 flex-grow">
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              className={`flex items-center p-2 text-gray-300 mb-2 hover:bg-gray-700 rounded-md cursor-pointer  ${
                activeMenuItem === item.label
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              } ${!open ? "justify-center" : "pl-6"} duration-300`}
              onClick={() => handleNavigation(item.path, item.label)}
            >
              <div className="text-2xl">{item.icon}</div>
              <span
                className={`ml-4 text-[#D9D9D9] ${
                  !open && "hidden"
                } duration-300`}
              >
                {item.label}
              </span>
              {item.submenu && open && item.label === "User" && (
                <BsChevronDown
                  className={`${!userMenuOpen && "rotate-180"} ml-16 text-sm`}
                  onClick={() => setUserMenuOpen(!userMenuOpen)} // Toggle submenu on chevron click
                />
              )}
            </div>
            {item.submenu && userMenuOpen && open && (
              <ul>
                {item.submenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`flex items-center p-1 ml-8 text-[#D9D9D9] rounded-md gap-x-4 cursor-pointer text-sm ${
                      activeMenuItem === subItem.label
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() =>
                      handleNavigation(subItem.path, subItem.label)
                    }
                  >
                    {subItem.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div
        className={`flex items-center text-gray-300 space-x-3 mb-4 hover:bg-gray-700 rounded-md cursor-pointer ${
          activeMenuItem === "Profile" ? "bg-gray-700" : "hover:bg-gray-700"
        } ${!open ? "justify-center" : "pl-5"} duration-300`}
        onClick={() => {
          setActiveMenuItem("Profile");
          router.push(`/${user.role}/profile`);
        }}
      >
        <Image
          src="/logo.png"
          width={45}
          height={45}
          className="rounded-full border-[#011936]"
          alt="Logo"
        />
        <p className={` text-[#D9D9D9] mt-2 ${!open && "hidden"} duration-300`}>
          {user?.name || "User"}
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

export default SideMenuBarAdmin;