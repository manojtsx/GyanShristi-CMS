import Image from 'next/image'
import React from 'react'

function ViewerLatestContent() {
  return (
    <div className='bg-[#1E58C8] flex items-center justify-between'>
        <div className='bg-white'>
          <div>
            <div className='flex gap-2'>
            <div className='w-2/4'>
            <p className='font-bold text-lg'>Why is Photosynthesis Important?</p>
            <p>Get Updated with GyanShristi</p>
            </div>
            <Image src='/photosynthesis.jpeg' alt='Profile Picture' width='500' height='500' className="h-24 w-20 object-cover"/>
            </div>
            <button>Read More</button>
            </div>
            <div>
                <div>
                <Image src='/GirlProfile.jpg' alt='Profile Picture' width='500' height='500' className="h-10 w-10 rounded-full"/>
                <p>Seezan Shrestha</p>
                </div>
                <div>
                    <p>Science</p>
                    <p>jan 24, 2024</p>
                </div>
            </div>
        </div>

        </div>
  )
}

export default ViewerLatestContent