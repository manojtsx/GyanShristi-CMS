"use client"
import SubmitButton from '@/components/mini-component/SubmitButton'
import Textbox from '@/components/mini-component/Textbox'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationContext'
import { useRouter } from 'next/navigation'

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function EditProfile() {
  const {user, token} = useAuth();
  const {addNotification} = useNotifications();
  const router = useRouter();
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || '',
    username: user?.username || '',
    address: user?.address || '',
    phone_number: user?.phone_number.toString() || ''
  })
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}api/user/${user?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedUser)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg);
      }

      console.log('User updated successfully:', result);
      addNotification(result.msg, 'success')
      router.push(`/${user?.role}/profile`)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
      // Optionally update localStorage and context here
    } catch (error : any) {
      console.error('Error updating user:', error);
      addNotification(error.message,'error')
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col h-screen p-14 items-center'>
        
        <div className='flex flex-col justify-center items-center w-96 gap-5 px-10 py-3 shadow-lg bg-[#F9F7F7]'>
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
            <div className='w-full flex justify-between items-center'>
            <label htmlFor="name" className='text-left w-32'>Name: </label> 
            <Textbox name='name' value={updatedUser.name} placeholder='Name' onChange={handleEditUserChange}/>
            </div>
            <div className='w-full flex justify-between items-center'>
            <label htmlFor="username" className='text-left w-32'>Username: </label>
            <Textbox name='username' value={updatedUser.username} placeholder='Username' onChange={handleEditUserChange} />
            </div>
            <div className='w-full flex justify-between items-center'>
            <label htmlFor="address" className='text-left w-32'>Address: </label>
            <Textbox name='address' value={updatedUser.address} placeholder='Address' onChange={handleEditUserChange}/>
            </div>
            <div className='w-full flex justify-between items-center'>
            <label htmlFor="phone_number" className='text-left w-32'>Contact: </label>
            <Textbox name='phone_number' value={updatedUser.phone_number} placeholder='Contact' onChange={handleEditUserChange}/>
            </div>
            <SubmitButton text="Save"/>
            <Link href={`/${user.role}/change-password`} className='text-[#1E43C8]'>Change Password</Link>
        </div>
    </form>
  )
}

export default EditProfile