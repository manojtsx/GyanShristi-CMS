"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function EditorTable() {
  const {addNotification} = useNotifications();
  const {token, user}=useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([{
    _id : 1,
    username : "",
    name : "",
    phone_number : "",
    email : ""
  }])
  

  const getUserList = async() =>{
    try{
      const res = await fetch(`${API}api/user/role?role=editor`,{
        method : "GET",
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data)
      if(res.status === 404){
        addNotification(data.msg, 'error');
        return; 
      }
      console.log(data);
      setUsers(data);
    }catch(err : any){
      addNotification(err.message, 'error');
    }
  }

  useEffect(()=>{
    getUserList();
  },[])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 uppercase bg-[#011936]">
          <tr>
            <th scope="col" className="px-6 py-3">
              SN
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
             Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((row,index) => (
            <tr
              key={row._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{row.username}</td>
              <td className="px-6 py-4">{row.name}</td>
              <td className="px-6 py-4">{row.email}</td>
              <td className="px-6 py-4">{row.phone_number}</td>
              <td className="flex space-x-5 px-6 py-4">
                <MdOutlineEdit className="text-[#011936] text-xl" onClick={()=> router.push(`/${user.role}/user/edit/${row._id}`)} />
                <RiDeleteBin6Line
                  className="text-[#011936] text-xl cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditorTable;
