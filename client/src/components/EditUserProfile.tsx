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
import { profile } from 'console'

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function EditUserProfile() {
  const { user, token } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const { id: userId } = useParams();
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    username: '',
    address: '',
    phone_number: '',
    profile_pic: ''
  })

  useEffect(() => {
    const getUpdatedUser = async () => {
      try {
        const res = await fetch(`${API}api/user/${userId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();

        const updatedData = {
          ...data,
          phone_number: data.phone_number.toString(),
        };

        setUpdatedUser(updatedData);
      } catch (err: any) {
        addNotification(err.message, 'error')
      }
    }
    getUpdatedUser();
  }
    , [])
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value.toString()
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}api/user/${userId}`, {
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
      addNotification(result.msg, 'success')
      router.push(`/${user?.role}/dashboard`)

      // Optionally update localStorage and context here
    } catch (error: any) {
      console.error('Error updating user:', error);
      addNotification(error.message, 'error')
    }
  };

  return (

    <form onSubmit={handleSubmit} className='flex flex-col h-screen p-14 items-center'>

      <div className='flex flex-col justify-center items-center w-96 gap-5 px-10 py-3 shadow-lg bg-[#F9F7F7]'>
        <div className="w-24 relative">
          <Image
            src={updatedUser.profile_pic ? `${API}${updatedUser.profile_pic}` : '/default.jpg'}
            alt="Profile Picture"
            height={500}
            width={500}
            className="h-24 w-24 rounded-full object-cover"
          />

        </div>
        <div className='w-full flex justify-between items-center'>
          <label htmlFor="name" className='text-left w-32'>Name: </label>
          <Textbox name='name' value={updatedUser.name} placeholder='Name' onChange={handleEditUserChange} />
        </div>
        <div className='w-full flex justify-between items-center'>
          <label htmlFor="username" className='text-left w-32'>Username: </label>
          <Textbox name='username' value={updatedUser.username} placeholder='Username' onChange={handleEditUserChange} />
        </div>
        <div className='w-full flex justify-between items-center'>
          <label htmlFor="address" className='text-left w-32'>Address: </label>
          <Textbox name='address' value={updatedUser.address} placeholder='Address' onChange={handleEditUserChange} />
        </div>
        <div className='w-full flex justify-between items-center'>
          <label htmlFor="phone_number" className='text-left w-32'>Contact: </label>
          <Textbox name='phone_number' value={updatedUser.phone_number} placeholder='Contact' onChange={handleEditUserChange} />
        </div>
        <SubmitButton text="Save" />
        <Link href={`/${user.role}/user/edit/password/${userId}`} className='text-[#1E43C8]'>Change Password</Link>
      </div>
    </form>
  )
}

export default EditUserProfile