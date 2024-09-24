import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { ImSearch } from "react-icons/im";

function TopMenuNotification() {
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md h-16">
      <div className="flex items-center space-x-2 pl-2">
        <p className="text-lg font-semibold text-gray-800">Notification</p>
        <IoMdNotifications className=" text-xl text-[#011936]" />
      </div>
      
    </div>
  );
}

export default TopMenuNotification;
