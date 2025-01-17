"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Textbox from './mini-component/Textbox'
import PasswordBox from './mini-component/PasswordBox'
import SubmitButton from './mini-component/SubmitButton'
import Image from 'next/image'
import Logo from './mini-component/Logo'
import { useNotifications } from '@/context/NotificationContext'
import { useAuth } from '@/context/AuthContext'

interface User {
  username : string, 
  password : string
}

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Login() {
  const {addNotification} = useNotifications();
  const {login} = useAuth();
  const router = useRouter();
  const [user,setUser] = useState<User>({username : "", password : ""});
  
  // Handle the input change 
  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name] : value})
  }

  // submit the form into the server for login
  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await fetch(`${API}api/auth/login`,{
        method : "POST",
        headers :{
          'Content-Type' : 'application/json'
        },
        body  : JSON.stringify(user)
      });

      // Check if response status is 400
      if(res.status === 400){
        const errorData = await res.json();
        addNotification(errorData.msg,'error');
        return;
      }
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.msg);
      }
      await login(data.token, data.login.user_id);
      addNotification(data.msg, 'success');
    }catch(err : any){
      addNotification(err.message, 'error');
    } 
  }
  return (
    <div className='flex justify-center pt-5 pb-5 min-h-[90vh] dark:bg-[#121212]'>
    <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-8 bg-[#FBF9F9] p-10 shadow-lg rounded-md dark:bg-[#1A1A1A] dark:text-white'>
        <Logo />
        <Textbox name="username" value={user.username} placeholder="Username" onChange={handleInputChange}/>
        <PasswordBox name="password" value={user.password} placeholder="Password" onChange={handleInputChange}/>
        <SubmitButton text="Login"/>
        <hr />
        <p className='dark:text-[#B0B0B0]'>Don't have an account? <Link href="/register" className='font-bold text-black'>Sign Up</Link></p>
        <p className='dark:text-[#B0B0B0]'>Forgot your password? <Link href="/forget-password" className='font-bold text-black'>Click Here</Link></p>
    </form>
    </div>
  )
}

export default Login