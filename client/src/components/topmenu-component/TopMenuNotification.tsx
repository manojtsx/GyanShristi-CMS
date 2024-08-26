import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { ImSearch } from "react-icons/im";

function TopMenuNotification() {
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md">
      <div className="flex items-center space-x-2 pl-2">
        <p className="text-lg font-semibold text-gray-800">Notification</p>
        <IoMdNotifications className=" text-xl text-[#011936]" />
      </div>
      <div className="relative">
        <input
          type="text"
          className="pr-10 h-9 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          placeholder="Search..."
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <ImSearch className="text-gray-500" />
        </span>
      </div>
    </div>
  );
}

export default TopMenuNotification;
