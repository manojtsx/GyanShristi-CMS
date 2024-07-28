"use client";
import Image from "next/image";
import React, { useState } from "react";
import LineChart from "../LineChart";

function NoOfUsers() {
  const [hoveredTitle, setHoveredTitle] = useState("");

  const latestContent = [
    {image: "/GirlProfile.jpg", title: "What is Photosynthesis?", author: "Usha Gurung", date: "May 21, 2024"},
    {image: "/Girl2.jpg", title: "What is Hardware?", author: "Seezan Shrestha", date: "May 20, 2024"},
    {image: "/manProfile.jpg", title: "Components of Hardware?", author: "Manoj Shrestha", date: "May 20, 2024"}
  ];

  return (
    <div>
      {/* Top Navbar */}
      <div className="flex justify-between items-center px-5 py-2 shadow-md">
        <p>Dashboard</p>
        <div className="w-10 h-10">
          <Image
            src="/GirlProfile.jpg"
            alt="Girl Profile Picture"
            height={500}
            width={500}
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
      {/* Main body part*/}
      <div className="p-5 flex flex-col gap-5">
        <p>Hi! Welcome to the Dashboard</p>
        <div className="flex gap-5">
          {/* No of Users */}
          <div className="flex flex-col gap-5 justify-center items-center">
            <div className="flex items-center gap-6">
              <div className="rounded-md py-4 px-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Editors</p>
                <p className="text-sm font-medium">3</p>
              </div>
              <div className="rounded-md py-4 px-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Authors</p>
                <p className="text-sm font-medium">3</p>
              </div>
              <div className="rounded-md py-4 px-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Contents</p>
                <p className="text-sm font-medium">3</p>
              </div>
            </div>

            <div className="w-full bg-[#525CEB] flex flex-col justify-center items-center py-5 rounded-md">
              <p>Number Of Viewers</p>
              <p>3</p>
            </div>
          </div>
          {/* Latest Content */}
          <div>
            <div className="bg-[#525CEB] rounded-t-lg flex justify-center items-center py-3">
              <p className="text-white">See Latest Content</p>
            </div>
            {/* Contents */}
            <div className="flex items-center justify-center p-2">
              <ul className="flex flex-col items-center justify-center gap-3">
                {latestContent.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 relative">
                    <div className="w-12 h-12">
                      <Image
                        src={item.image}
                        alt="Profile Picture"
                        height={500}
                        width={500}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <p
                      className="w-52 overflow-hidden text-ellipsis whitespace-nowrap text-left hover:opacity-50 cursor-default"
                      onMouseEnter={() => setHoveredTitle(item.title)}
                      onMouseLeave={() => setHoveredTitle("")}
                    >
                      {item.title}
                    </p>
                    <div className="min-w-32">
                      <p className="text-sm text-right">{item.author}</p>
                      <p className="text-sm text-[rgba(0,0,0,0.52)] text-right">{item.date}</p>
                    </div>
                    {hoveredTitle === item.title && (
                      <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-lg rounded-md p-2 mt-1 z-10">
                        {item.title}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <LineChart/>
      </div>
    </div>
  );
}

export default NoOfUsers;