"use client";
import SubmitButton from '@/components/mini-component/SubmitButton';
import Textbox from '@/components/mini-component/Textbox';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import PasswordBox from '@/components/mini-component/PasswordBox';
import { useRouter } from 'next/navigation';

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function AddUser() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [users, setUsers] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    role: "",
    phone_number: "",
    password: "",
    confirmPassword: ""
  });

  const handleAddUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });;
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (users.password !== users.confirmPassword) {
        throw new Error('Password mismatch.');
      }

      const res = await fetch(`${API}api/user/add`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(users),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to add user.');
      }

      addNotification(data.msg, 'success');
router.push(`/${user.role}/dashboard`)

      setUsers({
        name: "",
        username: "",
        email: "",
        address: "",
        role: "",
        phone_number: "",
        password: "",
        confirmPassword: ""
      });
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred.';
      console.error('Error adding user:', errorMsg);
      addNotification(errorMsg, 'error');
    }
  };

  return (
    <form onSubmit={handleAddUser} className='flex flex-col h-screen justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-4 px-10 py-4 bg-[#F9F7F7] shadow-2xl rounded-2xl'>
        <div className="w-24 relative">
          <Image
            src="/GirlProfile.jpg"
            alt="Profile Picture"
            height={500}
            width={500}
            className="h-24 w-24 rounded-full object-cover"
          />
          <FontAwesomeIcon icon={faPenToSquare} className='w-7 h-7 absolute bottom-0 right-0 cursor-pointer text-[#1E58C8]' />
        </div>

        <div className='flex gap-12'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label htmlFor="name" className='text-left pl-2 text-lg'>Name</label>
              <Textbox name='name' value={users.name} placeholder='Name' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="address" className='text-left pl-2 text-lg'>Address</label>
              <Textbox name='address' value={users.address} placeholder='Address' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="phone_number" className='text-left pl-2 text-lg'>Contact</label>
              <Textbox name='phone_number' value={users.phone_number} placeholder='Contact' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="role" className='text-left pl-2 text-lg'>Role</label>
              <select name="role" value={users.role} className='bg-white border-none rounded-md shadow-md w-[300px]' onChange={handleAddUserChange}>
                <option value="admin">Admin</option>
                <option value="author">Author</option>
                <option value="editor">Editor</option>
                {/* <option value="viewer">Viewer</option> */}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className='flex flex-col'>
              <label htmlFor="email" className='text-left pl-2 text-lg'>Email</label>
              <Textbox name='email' value={users.email} placeholder='Email' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="username" className='text-left pl-2 text-lg'>Username</label>
              <Textbox name='username' value={users.username} placeholder='Username' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="password" className='text-left pl-2 text-lg'>New Password</label>
              <PasswordBox name='password' value={users.password} placeholder='New Password' onChange={handleAddUserChange} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="confirmPassword" className='text-left pl-2 text-lg'>Confirm New Password</label>
              <PasswordBox name='confirmPassword' value={users.confirmPassword} placeholder='Confirm New Password' onChange={handleAddUserChange} />
            </div>
          </div>
        </div>
        <SubmitButton text="Add" />
      </div>
    </form>
  );
}

export default AddUser;
