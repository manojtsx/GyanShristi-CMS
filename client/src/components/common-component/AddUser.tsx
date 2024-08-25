"use client"
import SubmitButton from '@/components/mini-component/SubmitButton'
import Textbox from '@/components/mini-component/Textbox'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationContext'
import { useRouter, useParams } from 'next/navigation'
import PasswordBox from '../mini-component/PasswordBox'

function AddUser() {
    const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
      };
  return (
<form className='flex flex-col h-screen justify-center items-center'>
        
        <div className='flex flex-col justify-center items-center gap-4 px-10 py-4 bg-[#F9F7F7]  shadow-2xl rounded-2xl'>
        <div className="w-24 relative">
              <Image
                src="/GirlProfile.jpg"
                alt="Profile Picture"
                height={500}
                width={500}
                className="h-24 w-24 rounded-full object-cover"
              />
              <FontAwesomeIcon icon={faPenToSquare} className='w-7 h-7 absolute bottom-0 right-0 cursor-pointer text-[#1E58C8]'/>
            </div>

            <div className='flex gap-12'>
            <div className='flex flex-col gap-3'>
            <div className='flex flex-col'>
            <label htmlFor="name" className='text-left pl-2 text-lg'>Name</label> 
            <Textbox name='name' value="name" placeholder='Name' onChange={handleAddUserChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="address" className='text-left pl-2 text-lg'>Address</label>
            <Textbox name='address' value="address" placeholder='Address' onChange={handleAddUserChange}/>
            </div>
            <div className='flex flex-col'>
            <label htmlFor="phone_number" className='text-left pl-2 text-lg'>Contact</label>
            <Textbox name='phone_number' value="phone_number" placeholder='Contact' onChange={handleAddUserChange}/>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="role" className='text-left pl-2 text-lg'>Role</label>
                <select name="role" id="" className='bg-white border-none rounded-md shadow-md w-[300px]'>
                    <option value="author">Author</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                </select>
                </div>
            </div>

            <div className="flex flex-col gap-3">
            <div className='flex flex-col'>
            <label htmlFor="email" className='text-left pl-2 text-lg'>Email</label>
            <Textbox name='email' value="username" placeholder='Email' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="username" className='text-left pl-2 text-lg'>Username</label>
            <Textbox name='username' value="username" placeholder='Username' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
          <label htmlFor="newPassword" className='text-left pl-2 text-lg'>New Password</label>
          <PasswordBox name='new_password' value="newPassword" placeholder='New Password' onChange={handleAddUserChange} />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="confirmNewPassword" className='text-left pl-2 text-lg'>Confirm New Password</label>
          <PasswordBox name='confirmNewPassword' value="confirmNewPassword" placeholder='Confirm New Password' onChange={handleAddUserChange} />
        </div>
            </div>
            </div>
            <SubmitButton text="Add"/>
        </div>
    </form>  )
}

export default AddUser