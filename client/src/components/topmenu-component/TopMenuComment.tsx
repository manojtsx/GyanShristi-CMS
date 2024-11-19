import React from "react";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { ImSearch } from "react-icons/im";

function TopMenuComment() {
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md">
      <div className="flex items-center space-x-2 pl-2">
        <p className="text-lg font-semibold text-gray-800">Comment</p>
        <TfiCommentsSmiley className=" text-lg mb-5 text-[#011936]" />
      </div>
     
    </div>
  );
}

export default TopMenuComment;
