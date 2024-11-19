"use client"
import PasswordBox from '@/components/mini-component/PasswordBox'
import SubmitButton from '@/components/mini-component/SubmitButton'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import { useNotifications } from '@/context/NotificationContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter, useParams } from 'next/navigation'

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function EditUserPassword() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const {id : userId} = useParams();
  const [password, setPassword] = useState({
    old_password: '',
    new_password: '',
    confirmNewPassword: ""
  });
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value
    })
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try{  
        if(password.new_password !== password.confirmNewPassword){
          throw new Error('Your new password doesnot match')
  }
      const res = await fetch(`${API}api/user/change-password/${userId}`,{
        method : "PUT",
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(password)
      });
      const data = await res.json();
      if(!res.ok){
        throw Error(data.msg)
      }
      addNotification(data.msg, 'success')
      router.push(`/${user?.role}/dashboard`)
    }catch(err : any){
      addNotification(err.message, 'error')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col h-screen p-14 items-center'>
      <div className='flex flex-col justify-center items-center gap-7 px-10 py-3 shadow-lg bg-[#F9F7F7]'>
        <div className='w-full flex flex-col'>
          <label htmlFor="oldPassword" className='text-lg'>Current Password </label>
          <PasswordBox name='old_password' value={password.old_password} placeholder='Current Password' onChange={handleEditUserChange} />
        </div>
        <div className='w-full flex flex-col'>
          <label htmlFor="newPassword" className='text-lg'>New Password </label>
          <PasswordBox name='new_password' value={password.new_password} placeholder='New Password' onChange={handleEditUserChange} />
        </div>
        <div className='w-full flex flex-col'>
          <label htmlFor="confirmNewPassword" className='text-lg'>Confirm New Password </label>
          <PasswordBox name='confirmNewPassword' value={password.confirmNewPassword} placeholder='Confirm New Password' onChange={handleEditUserChange} />
        </div>
        <SubmitButton text="Save" />
      </div>
    </form>
  )
}

export default EditUserPassword