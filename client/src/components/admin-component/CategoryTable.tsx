"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function CategoryTable() {
  const { addNotification } = useNotifications();
  const { token } = useAuth();
  const [category, setCategory] = useState([
    {
      _id: "",
      title: "",
      user: {
        name: "",
      },
    },
  ]);

  const getCategoryList = async () => {
    try {
      const res = await fetch(`${API}api/category/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCategory(data);
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  useEffect(() => {
    getCategoryList();
    1;
  }, []);

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
                <MdOutlineEdit className="text-[#011936] text-xl cursor-pointer" />
                <RiDeleteBin6Line className="text-[#011936] text-xl cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;
