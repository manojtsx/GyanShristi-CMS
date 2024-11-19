"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';

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
        const sortedContent = data.content.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const limitedContent = sortedContent.slice(0, 10);
        setLatestContent(limitedContent);
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
      <div className="flex items-center justify-center p-3">
        <ul className="flex flex-col items-center justify-center gap-2">
          {error && <p className='text-red-500'>{error}</p>}
          {latestContent.length === 0 ? (
            <p>No latest content available</p>
          ) : (
            latestContent.map((item, index) => (
                <Link href={`/post/${item._id}`} key={index} className="flex items-center gap-1 relative">
                <div className="w-12 h-12">
                  <Image
                    src={item.thumbnail ? `${API}${item.thumbnail}` : "/default.jpg"}
                    alt="Profile Picture"
                    height={500}
                    width={500}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <p
                  className="w-40 text-sm overflow-hidden text-ellipsis whitespace-nowrap text-left hover:opacity-50"
                  onMouseEnter={() => setHoveredTitle(index)}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  {item.title}
                </p>
                <div className="w-24">
                  <p className="text-xs text-right overflow-hidden text-ellipsis whitespace-nowrap hover:opacity-50" onMouseEnter={() => setHoveredAuthorName(index)} onMouseLeave={() => setHoveredAuthorName(null)}>{item.user_id ? item.user_id.name : "Unknown"}</p>
                  <p className="text-xs text-[rgba(0,0,0,0.52)] text-right">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                {hoveredTitle === index && (
                  <div className="absolute top-8 left-0 text-sm bg-white border border-gray-300 shadow-lg rounded-md p-2 mt-1 z-10">
                    {item.title}
                  </div>
                )}
                {hoveredAuthorName === index && (
                  <div className="absolute bottom-10 text-sm right-0 bg-white border border-gray-300 shadow-lg rounded-md p-2 mt-1 z-10">
                    {item.user_id ? item.user_id.name : "Unknown"}
                  </div>
                )}
                </Link>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default LatestContent;