import React from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { ImSearch } from "react-icons/im";

function TopMenuEditor() {
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md">
      <div className="flex items-center space-x-2 pl-2">
        <p className="text-lg font-semibold text-gray-800"> All Editors</p>
        <LiaUserEditSolid className=" text-xl text-[#011936] font-semibold" />
      </div>
      <div className="flex gap-x-7 pr-8">
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
        <button className="w-[150px] h-9 bg-[#3570E2] rounded-md text-white">
          Add Editor
        </button>
      </div>
    </div>
  );
}

export default TopMenuEditor;
