"use client"
import Image from 'next/image'
import React, { useRef } from 'react'

function ViewerLatestContent() {
  const contents = [
    {
      title: 'Why is Photosynthesis Important?',
      image: '/photosynthesis.jpeg',
      authorProfile: '/GirlProfile.jpg',
      author: 'Seezan Shrestha',
      category: 'Science',
      date: 'jan 24, 2024'
    },
    {
      title: 'Why is Photosynthesis Important?',
      image: '/photosynthesis.jpeg',
      authorProfile: '/GirlProfile.jpg',
      author: 'Seezan Shrestha',
      category: 'Science',
      date: 'jan 24, 2024'
    },
    {
      title: 'Why is Photosynthesis Important?',
      image: '/photosynthesis.jpeg',
      authorProfile: '/GirlProfile.jpg',
      author: 'Seezan Shrestha',
      category: 'Science',
      date: 'jan 24, 2024'
    }
  ];

  const setTitleOnHover = (ref: React.RefObject<HTMLParagraphElement>) => {
    if (ref.current) {
      ref.current.setAttribute('title', ref.current.textContent || '');
    }
  };

  return (
    <div className='bg-[#1E58C8] flex flex-col justify-center'>
      <p className='text-white text-2xl font-bold pt-5 text-center'>Latest Contents</p>
      <div className='flex flex-col lg:flex-row items-center justify-around cursor-pointer lg:px-10'>
        {contents.map((content, index) => (
          <div key={index} className='bg-white rounded-2xl hover:scale-105 transition-transform duration-300 mt-8'>
            <div className='flex flex-col justify-center items-center px-4 pt-4 pb-2 gap-1'>
              <div className='flex justify-between gap-2'>
                <div className='w-44'>
                  <p 
                    className='font-bold text-lg overflow-hidden text-ellipsis h-24' 
                    ref={titleRef => setTitleOnHover({ current: titleRef })}
                  >
                    {content.title}
                  </p>
                  <p className='text-base text-[#CCC6C6]'>Get updated with GyanShristi</p>
                </div>
                <Image src={content.image} alt='Content Image' width='500' height='500' className="h-24 w-20 object-cover"/>
              </div>
              <button className='text-white text-sm font-semibold bg-[#2B2E4A] rounded-full py-2 px-4 hover:bg-[#2B2E4A] hover:opacity-70'>Read More</button>
            </div>
            <div className='flex justify-between items-center bg-[#E8E4E4] rounded-br-2xl rounded-bl-2xl p-4'>
              <div className='flex items-center gap-1'>
                <Image src={content.authorProfile} alt='Author Picture' width='500' height='500' className="h-10 w-10 rounded-full"/>
                <p 
                  className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-sm'
                  ref={authorRef => setTitleOnHover({ current: authorRef })}
                >
                  {content.author}
                </p>
              </div>
              <div className='text-right'>
                <p 
                  className='overflow-hidden text-ellipsis whitespace-nowrap font-semibold'
                  ref={categoryRef => setTitleOnHover({ current: categoryRef })}
                >
                  {content.category}
                </p>
                <p 
                  className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#524C4C]'
                  ref={dateRef => setTitleOnHover({ current: dateRef })}
                >
                  {content.date}
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
