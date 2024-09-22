"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function LatestContent() {
  const [hoveredTitle, setHoveredTitle] = useState<number | null>(null);
  const [hoveredAuthorName, setHoveredAuthorName] = useState<number | null>(null);
  const [latestContent, setLatestContent] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestContent = async () => {
      try {
        const res = await fetch(`${API}api/content/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.msg);
        }
        setLatestContent(data.content);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchLatestContent();
  }, []);

  return (
    <>  
      <div className="bg-[#525CEB] rounded-t-lg flex justify-center items-center py-3">
        <p className="text-white">See Latest Content</p>
      </div>
      {/* Contents */}
      <div className="flex items-center justify-center py-3 px-1 shadow-md">
        <ul className="flex flex-col items-center justify-center gap-2">
          {error && <p className='text-red-500'>{error}</p>}
          {latestContent.length === 0 ? (
            <p>No latest content available</p>
          ) : (
            latestContent.map((item, index) => (
              <li key={index} className="flex items-center gap-2 relative">
                <div className="w-12 h-12 text-left">
                  <Image
                    src={`${API}${item.thumbnail}`}
                    alt="Profile Picture"
                    height={500}
                    width={500}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <p
                  className="w-44 text-sm overflow-hidden text-ellipsis whitespace-nowrap text-left hover:opacity-50 cursor-default"
                  onMouseEnter={() => setHoveredTitle(index)}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  {item.title}
                </p>
                <div className="w-24 text-right">
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
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default LatestContent;