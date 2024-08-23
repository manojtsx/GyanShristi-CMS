"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjYxMDA4NDk5Njk5MmIzZDVkYjMwYyIsImlhdCI6MTcyNDI0ODQzNiwiZXhwIjoxNzI1MTEyNDM2fQ.Xe6jCTRp-thit70iTNjMyMVtokkayHveD9gbcJdT_UM';

function CategoryTable() {
  const {addNotification} = useNotifications();
  const [category, setCategory] = useState([{
    _id : "",
    title : "",
    user : {
      name : ""
    }
  }])

  const getCategoryList = async() =>{
    try{
      const res = await fetch(`${API}api/category/`,{
        method : "GET",
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      });
      const data = await res.json();
      console.log(data);
      setCategory(data);
    }catch(err : any){
      addNotification(err.message, 'error');
    }
  }

  useEffect(()=>{
    getCategoryList();1
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
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Created By
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {category.map((row, index) => (
            <tr
              key={row._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{row.title}</td>
              <td className="px-6 py-4">{row.user.name}</td>
              <td className="flex space-x-5 px-6 py-4">
                <MdOutlineEdit className="text-[#011936] text-xl" />
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

export default CategoryTable;