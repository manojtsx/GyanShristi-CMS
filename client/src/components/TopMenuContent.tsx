"use client";
import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import Post from "./Post";
import Video from "./Video";
import Pdf from "./Pdf";
import ContentTable from "./common-component/ContentTable";

function TopMenuContent() {
  const [activeLink, setActiveLink] = useState("all");

  const contentItems = [
    { id: "all", name: "All" },
    { id: "post", name: "Post" },
    { id: "video", name: "Video" },
    { id: "pdf", name: "PDF" },
  ];

  const renderContent = () => {
    switch (activeLink) {
      case "post":
        return (
          <div className="">
            <Post />
          </div>
        );
      case "video":
        return (
          <div className="">
            <Video />
          </div>
        );
      case "pdf":
        return (
          <div className="">
            <Pdf />
          </div>
        );
      default:
        return (
          <div className="">
            <ContentTable />
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-2 shadow-md">
        <ul className="hidden sm:flex justify-between gap-x-8 font-semibold">
          {contentItems.map((item, index) => (
            <li
              key={index}
              className={`p-2 ${
                activeLink === item.id
                  ? "bg-slate-300 border-b-2 border-[#1E58C8]"
                  : "hover:bg-slate-300"
              }`}
              onClick={() => setActiveLink(item.id)}
            >
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-7 pr-8">
          <div className="relative">
            <input
              type="text"
              value=""
              className="pr-10 h-9 border border-gray-300 rounded-lg"
              placeholder="Search..."
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ImSearch className="text-gray-500" />
            </span>
          </div>
          <button
            className="w-[150px] h-9 bg-[#3570E2] rounded-md text-white"
            onClick={() => setActiveLink("post")}
          >
            Add new Post
          </button>
        </div>
      </div>

      {/* Render content below the TopMenuContent */}
      <div className="p-3 ml-20">{renderContent()}</div>
    </div>
  );
}

export default TopMenuContent;
