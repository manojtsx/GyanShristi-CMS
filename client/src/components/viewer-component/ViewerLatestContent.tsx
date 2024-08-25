import Image from 'next/image'
import React from 'react'

function ViewerLatestContent() {
  return (
    <div className='bg-[#1E58C8] flex items-center justify-between'>
        <div className='bg-white p-5 w-80 rounded-2xl'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex justify-between gap-2'>
            <div className='w-48'>
            <p className='font-bold text-lg'>Why is Photosynthesis Important?</p>
            <p className='text-base text-[#CCC6C6]'>Get Updated with GyanShristi</p>
            </div>
            <Image src='/photosynthesis.jpeg' alt='Profile Picture' width='500' height='500' className="h-24 w-20 object-cover"/>
            </div>
            <button className='text-white text-sm font-semibold bg-[#2B2E4A] rounded-full py-2 px-4'>Read More</button>
            </div>
            <div className='flex justify-between'>
                <div className='flex'>
                <Image src='/GirlProfile.jpg' alt='Profile Picture' width='500' height='500' className="h-10 w-10 rounded-full"/>
                <p>Seezan Shrestha</p>
                </div>
                <div className='text-right'>
                    <p>Science</p>
                    <p>jan 24, 2024</p>
                </div>
            </div>
        </div>

        </div>
  )
}

export default ViewerLatestContent