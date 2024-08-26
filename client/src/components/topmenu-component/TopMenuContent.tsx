"use client";
import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import Post from "../Post";
import Video from "../Video";
import Pdf from "../Pdf";
import ContentTable from "../common-component/ContentTable";
import PostTable from "../common-component/PostTable";
import VideoTable from "../common-component/VideoTable";
import PdfTable from "../common-component/PdfTable";

function TopMenuContent() {
  const [activeLink, setActiveLink] = useState("all");
  const [showAddNew, setShowAddNew] = useState(false);

  const contentItems = [
    { id: "all", name: "All" },
    { id: "post", name: "Post" },
    { id: "video", name: "Video" },
    { id: "pdf", name: "PDF" },
  ];

  const renderContent = () => {
    switch (activeLink) {
      case "post":
        return showAddNew ? (
          <div>
            <Post />
          </div>
        ) : (
          <div>
            <PostTable />
          </div>
        );
      case "video":
        return showAddNew ? (
          <div>
            <Video />
          </div>
        ) : (
          <div>
            <VideoTable />
          </div>
        );
      case "pdf":
        return showAddNew ? (
          <div>
            <Pdf />
          </div>
        ) : (
          <div>
            <PdfTable />
          </div>
        );
      default:
        return (
          <div>
            <ContentTable />
          </div>
        );
    }
  };

  const getButtonText = () => {
    switch (activeLink) {
      case "post":
        return "Add new Post";
      case "video":
        return "Add new Video";
      case "pdf":
        return "Add new PDF";
      default:
        return "Add new Content";
    }
  };

  const handleButtonClick = () => {
    if (activeLink !== "all") {
      setShowAddNew(true); // Set showAddNew to true to display the Post component
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
              onClick={() => {
                setActiveLink(item.id);
                setShowAddNew(false); // Reset showAddNew when a different tab is clicked
              }}
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
          {activeLink !== "all" && (
            <button
              className="w-[150px] h-9 bg-[#3570E2] rounded-md text-white"
              onClick={handleButtonClick}
            >
              {getButtonText()}
            </button>
          )}
        </div>
      </div>

      {/* Render content below the TopMenuContent */}
      <div className="p-3 ml-20">{renderContent()}</div>
    </div>
  );
}

export default TopMenuContent;
