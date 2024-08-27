"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import Textbox from './mini-component/Textbox';
import PasswordBox from './mini-component/PasswordBox';
import SubmitButton from './mini-component/SubmitButton';
import Logo from './mini-component/Logo';
import { useNotifications } from '@/context/NotificationContext';
import { useAuth } from '@/context/AuthContext';
import Loading from './Loading';

interface User {
  username: string;
  password: string;
}

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Login() {
  const { addNotification } = useNotifications();
  const { login } = useAuth();
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State for error message

  // Handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Submit the form to the server for login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null); // Reset error before making the request

    try {
      const res = await fetch(`${API}api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (res.status === 400) {
        const errorData = await res.json();
        setError(errorData.msg); // Set the error message
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg);
      }

      addNotification(data.msg, 'success');
      await login(data.token, data.login.user_id);
      setLoading(false)
    } catch (err: any) {
      setError(err.message); // Set the error message
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='flex justify-center items-center min-h-[90vh] dark:bg-[#121212]'>
      <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-8 bg-[#FBF9F9] p-10 shadow-lg rounded-md dark:bg-[#1A1A1A] dark:text-white'>
        <Logo />
        <Textbox name="username" value={user.username} placeholder="Username" onChange={handleInputChange} />
        <PasswordBox name="password" value={user.password} placeholder="Password" onChange={handleInputChange} />
        {/* Display the error message in red, if any */}
        {error && <p className="text-red-500">{error}</p>}
        <SubmitButton text="Login" />
        <hr />
        <p className='dark:text-[#B0B0B0]'>Don't have an account? <Link href="/register" className='font-bold '>Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
