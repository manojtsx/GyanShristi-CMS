"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface Category {
  _id: string;
  title: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  profile_pic: string;
}

interface Content {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  user_id: User;
  category_id: Category[];
  updated_at: string;
}

function ViewerLatestContent() {
  const [contents, setContents] = useState<Content[]>([]);

  // Fetch the latest content from the backend
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await fetch(`${API}api/content/`);
        if (!res.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await res.json();
        setContents(data.content); // Assuming data.content is the array of contents
      } catch (error) {
        console.error(error);
      }
    };

    fetchContents();
  }, []);

  // Slice to get the last three contents
  const latestContents = contents.slice(-3);

  if(latestContents.length === 0){
    return <div>No contents found..</div>
  }

  return (
    <div className='bg-[#1E58C8] flex flex-col justify-center dark:bg-[#181818]'>
      <p className='text-white font-semibold text-2xl  pt-5 text-center md:text-left md:px-20'>Latest Contents</p>
      <div className='flex pb-5 flex-col lg:flex-row items-center justify-around cursor-pointer lg:px-12'>
        {latestContents.map((content) => (
          <div key={content._id} className='bg-white rounded-2xl hover:scale-105 transition-transform duration-300 mt-8'>
            <div className='flex flex-col justify-center items-center px-4 pt-4 pb-2 gap-1'>
              <div className='flex justify-between gap-2'>
                <div className='w-44'>
                  <p
                    className='font-bold text-lg overflow-hidden text-ellipsis h-24'
                    title={content.title} // Using title attribute for tooltip
                  >
                    {content.title}
                  </p>
                  <p className='text-base text-[#CCC6C6]'>Get updated with GyanShristi</p>
                </div>
                {/* <Image 
                  src={`../../../../${content.thumbnail.replace('\\', '/')}`} // Ensure forward slashes in URL
                  alt='Content Thumbnail' 
                  width='500' 
                  height='500' 
                  className="h-24 w-20 object-cover" 
                /> */}
              </div>
              <button className='text-white text-sm font-semibold bg-[#2B2E4A] rounded-full py-2 px-4 hover:bg-[#2B2E4A] hover:opacity-70'>
                Read More
              </button>
            </div>
            <div className='flex justify-between items-center bg-[#E8E4E4] rounded-br-2xl rounded-bl-2xl p-4'>
              <div className='flex items-center gap-1'>
                {/* <Image src={content.user_id.profile_pic || ""} alt='Author Picture' width='500' height='500' className="h-10 w-10 rounded-full" /> */}
                <p
                  className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm'
                  title={content.user_id.name} // Using title attribute for tooltip
                >
                  {content.user_id.name}
                </p>
              </div>
              <div className='text-right'>
                {/* <p
                  className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold'
                  title={content.category_id[0]?.title} // Using title attribute for tooltip
                >
                  {content.category_id[0]?.title}
                </p> */}
                <p
                  className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#524C4C]'
                  title={content.updated_at} // Using title attribute for tooltip
                >
                  {new Date(content.updated_at).toLocaleDateString()} {/* Format date if needed */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewerLatestContent;
