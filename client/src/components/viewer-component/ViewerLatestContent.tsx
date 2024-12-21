"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface Category {
  _id: string;
  title: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  profile_pic?: string;
}

interface Content {
  _id: string;
  thumbnail: string;
  title: string;
  description: string;
  user_id: User;
  category_id: Category;
  updated_at: string;
}

function ViewerLatestContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await fetch(`${API}api/content/`);
        if (!res.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await res.json();
        if (Array.isArray(data.content)) {
          setContents(data.content);
        } else {
          console.error('Content is not an array:', data.content);
          setContents([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchContents();
  }, []);

  const latestContents = contents.slice(-3);

  if (latestContents.length === 0) {
    return <div>No contents found..</div>;
  }

  return (
    <div className='bg-[#1E58C8] flex flex-col justify-center dark:bg-[#181818]'>
    <p className='text-white font-semibold text-2xl pt-5 text-center md:text-left md:px-20'>Latest Contents</p>
    <div className='flex pb-5 flex-col lg:flex-row items-center justify-around lg:px-12 w-full'>
      {latestContents.map((content) => (
        <div key={content._id} className='bg-white rounded-2xl hover:scale-105 transition-transform duration-300 mt-8'>
          <div className='flex flex-col justify-center items-center px-4 pt-4 pb-2 gap-1'>
            <div className='flex justify-between gap-2'>
              <div className='w-44'>
                <p
                  className='w-35 h-[3.2rem] font-bold text-lg overflow-hidden text-ellipsis'
                  title={content.title}
                >
                  {content.title}
                </p>
                <p
                  className='mt-2 w-35 h-[7.2rem] text-gray-500 text-sm overflow-hidden text-ellipsis'
                  title={content.description}
                >
                  {content.description}
                </p>
              </div>
              <Image 
                src={content.thumbnail ? `${API}${content.thumbnail}` : "/default.jpg"} 
                alt='Content Thumbnail' 
                width={80} 
                height={96} 
                className="h-24 w-20 object-cover" 
              />
            </div>
            <button className='text-white text-sm font-semibold bg-[#2B2E4A] rounded-full py-2 px-4 hover:bg-[#2B2E4A] hover:opacity-70' onClick={()=>router.push(`/post/${content._id}`)} title='Click to see more'>
              Read More
            </button>
          </div>
          <div className='flex justify-between items-center bg-[#E8E4E4] rounded-br-2xl rounded-bl-2xl p-4'>
            <div className='flex items-center gap-1'>
              {content.user_id ? (
                <>
                  <Image 
                    src={content.user_id.profile_pic ? `${API}${content.user_id.profile_pic}` : "/default.jpg"} 
                    alt='Author Picture' 
                    width={40} 
                    height={40} 
                    className="h-10 w-10 rounded-full" 
                  />
                  <p
                    className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm'
                    title={typeof content.user_id.name === 'string' ? content.user_id.name : "Unknown Author"}
                  >
                    {typeof content.user_id.name === 'string' ? content.user_id.name : "Unknown Author"}
                  </p>
                </>
              ) : (
                <>
                  <Image 
                    src="/default.jpg" 
                    alt='Author Picture' 
                    width={40} 
                    height={40} 
                    className="h-10 w-10 rounded-full" 
                  />
                  <p
                    className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm'
                    title="Unknown Author"
                  >
                    Unknown
                  </p>
                </>
              )}
            </div>
            <div className='text-right'>
              {content.category_id && (
                <p
                  className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold'
                  title={content.category_id.title}
                >
                  {content.category_id.title? content.category_id.title : "Unknown Category"}
                </p>
              )}
              <p
                className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#524C4C]'
                title={content.updated_at}
              >
                {new Date(content.updated_at).toLocaleString()}
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
