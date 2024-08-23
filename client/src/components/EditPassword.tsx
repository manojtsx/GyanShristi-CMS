"use client"
import PasswordBox from '@/components/mini-component/PasswordBox'
import SubmitButton from '@/components/mini-component/SubmitButton'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

function EditPassword() {
    const handleEditUserChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

    }
  return (
    <form action="" className='flex flex-col h-screen justify-center items-center'>
<div className='flex flex-col justify-center items-center gap-7 px-10 py-3 shadow-lg bg-[#F9F7F7]'>
   <div className='w-full flex flex-col'>
   <label htmlFor="currentPassword" className='text-lg'>Current Password </label>
   <PasswordBox name='currentPassword' value='currentPassword' placeholder='Current Password' onChange={handleEditUserChange}/>
   </div>
   <div className='w-full flex flex-col'>
   <label htmlFor="newPassword" className='text-lg'>New Password </label>
   <PasswordBox name='newPassword' value='newPassword' placeholder='New Password' onChange={handleEditUserChange}/>
   </div>
   <div className='w-full flex flex-col'>
   <label htmlFor="confirmNewPassword" className='text-lg'>Confirm New Password </label>
   <PasswordBox name='confirmNewPassword' value='confirmNewPassword' placeholder='Confirm New Password' onChange={handleEditUserChange}/>
   </div>
   <SubmitButton text="Save"/>
</div>
</form>
  )
}

export default EditPassword