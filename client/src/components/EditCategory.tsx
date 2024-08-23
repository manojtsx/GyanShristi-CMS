"use client"
import SubmitButton from '@/components/mini-component/SubmitButton'
import Textbox from '@/components/mini-component/Textbox'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EditCategory() {
    const handleEditUserChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

    }
  return (
    <div>
         <form action="" className='flex flex-col h-screen justify-center items-center'>
      <div className="w-24 relative">
              <Image
                src="/GirlProfile.jpg"
                alt="Profile Picture"
                height={500}
                width={500}
                className="h-24 w-24 rounded-full object-cover"
              />
              <FontAwesomeIcon icon={faPenToSquare} className='w-7 h-7 absolute bottom-0 right-0 cursor-pointer'/>
            </div>
    <div className='flex flex-col justify-center items-center gap-7 px-10 py-3 shadow-lg bg-[#F9F7F7]'>
        <div className='w-full flex flex-col'>
        <label htmlFor="createdBy" className='w-32 text-lg'>Created By </label>
        <Textbox name='createdBy' value='createdBy' placeholder='Created By' onChange={handleEditUserChange}/>
        </div>
        <div className='w-full flex flex-col'>
        <label htmlFor="category" className='w-32 text-lg'>Category </label>
        <Textbox name='category' value='Contact' placeholder='Category' onChange={handleEditUserChange}/>
        </div>
        <SubmitButton text="Save"/>
    </div>
</form>
    </div>
  )
}

export default EditCategory