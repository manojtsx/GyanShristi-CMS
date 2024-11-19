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

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function EditCategory() {
  const {token, user} = useAuth();
  const {addNotification} = useNotifications();
  const router = useRouter();
  const {id:categoryId} = useParams();

  const [category, setCategory] = useState({
    user_id : "",
    title : "",
    ownerName : ""
  });

  const [users, setUsers] = useState([
    {
      name: "",
      _id: "",
    },
  ]);

  useEffect(()=>{
    const getAllNonViewerList = async() =>{
      try{

        // Fetch users excluding "viewer" role
        const usersResponse = await fetch(`${API}api/user/role?role=non-viewer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const usersData = await usersResponse.json();
      if (!usersResponse.ok) throw new Error(usersData.msg);
    
      // Ensure usersData is an array
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        throw new Error("Users data is not an array");
      }
    }catch(err : any){
      addNotification(err.message, "error");
    
    }
    }
    const getCategory = async() =>{
        try {
          const response = await fetch(`${API}api/category/${categoryId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch category');
          }
  
          const categoryData = await response.json();
          setCategory({
            ...categoryData,
            ownerName: categoryData.ownerName || "Unknown"
          });
        } catch (error) {
          addNotification('Failed to fetch category', 'error');
        }
      };
  
      if (categoryId) {
        getCategory();
        getAllNonViewerList();
      }
  },[categoryId, token])

    const handleEditUserChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
      const value = e.target.value;
      setCategory({
        ...category,
        user_id: value,
        ownerName: users.find(user => user._id === value)?.name || "Unknown"
      });
    }
    const handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
    
      setCategory((prevCategory) => ({
          ...prevCategory,
          title: value,
      }));
  };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const response = await fetch(`${API}api/category/edit/${categoryId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
           title : category.title, 
           user_id : category.user_id
          })
        });
        
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.msg);
        }
    
        addNotification(result.msg, 'success');
        router.push(`/${user.role}/category`); // Redirect to the profile or any other desired route
      } catch (err: any) {
        addNotification(err.message, 'error');
      }
    };
    
  return (
    <div>
         <form onSubmit={handleEditSubmit} className='flex flex-col h-screen mt-14 items-center'>
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
        <select
              id="author"
              name="author"
              className="rounded-lg h-10 w-[200px] text-center"
              value={category.user_id}
              onChange={(e) =>{
                setCategory({ ...category, user_id: e.target.value })
              }
              }
              required  
            >
              <option value="">Select Author</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
        </div>
        <div className='w-full flex flex-col'>
        <label htmlFor="title" className='w-32 text-lg'>Title </label>
        <input name='title' value={category.title} placeholder='Enter a title' onChange={handleTitleChange}/>
        </div>
        <SubmitButton text="Save"/>
    </div>
</form>
    </div>
  )
}

export default EditCategory