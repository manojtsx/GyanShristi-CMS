"use client";
import React, { useState } from "react";
import { TbCategory2 } from "react-icons/tb";
import { ImSearch } from "react-icons/im";
import AddCategory from "../AddCategory";

function TopMenuCategory() {
  const [showCategory, setShowCategory] = useState(false);

  const handleAddCategoryClick = () => {
    setShowCategory(!showCategory);
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-2 shadow-md">
        <div className="flex items-center space-x-2 pl-2">
          <p className="text-lg font-semibold text-gray-800"> Category</p>
          <TbCategory2 className=" text-xl text-[#011936]" />
        </div>
        <div className="flex gap-x-7 pr-8">

          <button
            className="w-[150px] h-9 bg-[#3570E2] rounded-md text-white"
            onClick={handleAddCategoryClick}
          >
            Add Category
          </button>
        </div>
      </div>
      {showCategory && (
        <div className="px-5 ">
          <AddCategory />
        </div>
      )}
    </div>
  );
}

export default TopMenuCategory;
