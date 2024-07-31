"use client";
import React, { useState } from 'react'
import Image from "next/image";

function LatestContent() {
    const [hoveredTitle, setHoveredTitle] = useState<number | null>(null);
    const [hoveredAuthorName, setHoveredAuthorName] = useState<number | null>(null);
  
    const latestContent = [
      {image: "/GirlProfile.jpg", title: "What is Photosynthesis?", author: "Usha Gurung", date: "May 21, 2024"},
      {image: "/Girl2.jpg", title: "What is Hardware?", author: "Seezan Shrestha", date: "May 20, 2024"},
      {image: "/manProfile.jpg", title: "Components of Hardware?", author: "Manoj Shrestha", date: "May 20, 2024"},
      {image: "/GirlProfile.jpg", title: "What is Photosynthesis?", author: "Usha Gurung", date: "May 21, 2024"},
      {image: "/Girl2.jpg", title: "What is Hardware?", author: "Seezan Shrestha", date: "May 20, 2024"},
      {image: "/manProfile.jpg", title: "Components of Hardware?", author: "Manoj Shrestha", date: "May 20, 2024"},
      {image: "/GirlProfile.jpg", title: "What is Photosynthesis?", author: "Usha Gurung", date: "May 21, 2024"},
      {image: "/Girl2.jpg", title: "What is Hardware?", author: "Seezan Shrestha", date: "May 20, 2024"},
      {image: "/manProfile.jpg", title: "Components of Hardware?", author: "Manoj Shrestha", date: "May 20, 2024"}
    ];
  return (
    <div className=''>
    <div className="bg-[#525CEB] rounded-t-lg flex justify-center items-center py-3">
      <p className="text-white">See Latest Content</p>
    </div>
    {/* Contents */}
    <div className="flex items-center justify-center p-3">
      <ul className="flex flex-col items-center justify-center gap-2">
        {latestContent.map((item, index) => (
          <li key={index} className="flex items-center gap-1 relative">
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
              className="w-40 text-sm overflow-hidden text-ellipsis whitespace-nowrap text-left hover:opacity-50 cursor-default"
              onMouseEnter={() => setHoveredTitle(index)}
              onMouseLeave={() => setHoveredTitle(null)}
            >
              {item.title}
            </p>
            <div className="w-24">
              <p className="text-xs text-right overflow-hidden text-ellipsis whitespace-nowrap hover:opacity-50 cursor-default" onMouseEnter={() => setHoveredAuthorName(index)} onMouseLeave={() => setHoveredAuthorName(null)}>{item.author}</p>
              <p className="text-xs text-[rgba(0,0,0,0.52)] text-right">{item.date}</p>
            </div>
            {hoveredTitle === index && (
              <div className="absolute top-8 left-0 text-sm bg-white border border-gray-300 shadow-lg rounded-md p-2 mt-1 z-10">
                {item.title}
              </div>
            )}
            {hoveredAuthorName === index && (
              <div className="absolute bottom-10 text-sm right-0 bg-white border border-gray-300 shadow-lg rounded-md p-2 mt-1 z-10">
                {item.author}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default LatestContent