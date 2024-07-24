import Image from 'next/image'
import React from 'react'

function NoOfUsers() {
  return (
    <div >
      <div className='flex justify-between items-center px-5 py-2 shadow-md'>
        <p>Dashboard</p>
        <div className='w-10 h-10'>
        <Image src="/GirlProfile.jpg" alt="Girl Profile Picture" height={500} width={500} className='h-10 w-10 rounded-full'/>
        </div>
      </div>
      <div className='p-5'>
      <p>Hi! Welcome to the Dashboard</p>
      <div className='flex'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <div className='flex items-center gap-6'>
            <div className=' rounded-md py-4 px-5 text-xl flex flex-col justify-center items-center shadow-all'>
                <p className='text-sm '>Number Of Editor</p>
                <p className='text-sm font-medium'>3</p>
            </div>
            <div className=' rounded-md py-4 px-5 text-xl flex flex-col justify-center items-center shadow-all'>
                <p className='text-sm '>Number Of Author</p>
                <p className='text-sm font-medium'>3</p>
            </div>
            <div className=' rounded-md py-4 px-5 text-xl flex flex-col justify-center items-center shadow-all'>
                <p className='text-sm '>Number Of Content</p>
                <p className='text-sm font-medium'>3</p>
            </div>
            
        </div>

        <div className="w-full bg-[#525CEB] flex flex-col justify-center items-center py-5 rounded-md">
            <p>Number Of Viewer</p>
            <p>3</p>
        </div>
        </div>
        <div>
          
        </div>
        </div>
        </div>
    </div>
  )
}

export default NoOfUsers