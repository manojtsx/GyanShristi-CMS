"use client"
import SubmitButton from '@/components/mini-component/SubmitButton'
import Textbox from '@/components/mini-component/Textbox'
import React from 'react'

function page() {
    const handleEditUserChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

    }
  return (
    <form action="" className='flex flex-col h-screen justify-center items-center'>
         <div className='w-full flex justify-between items-center'>
            <label htmlFor="createdBy" className='text-left w-32'>Created By: </label>
            <Textbox name='createdBy' value='createdBy' placeholder='createdBy' onChange={handleEditUserChange}/>
            </div>
            <div className='w-full flex justify-between items-center'>
            <label htmlFor="category" className='text-left w-32'>Category: </label>
            <Textbox name='category' value='Category' placeholder='Category' onChange={handleEditUserChange}/>
            </div>
            <SubmitButton text="Save"/>
    </form>
  )
}

export default page