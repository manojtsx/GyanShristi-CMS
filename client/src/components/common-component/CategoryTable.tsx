"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Pagination from "../mini-component/Pagination";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function CategoryTable() {
  const { addNotification } = useNotifications();
  const { token, user } = useAuth();
  const router = useRouter();
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
      console.log(data);
      setCategory(data);
      // Calculate total pages based on the number of items
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  useEffect(() => {
    getCategoryList();
    1;
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}api/category/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      addNotification(data.msg, "success");
      getCategoryList();
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  }

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategory = category.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
       <h1 className=" text-2xl font-serif font-bold text-[#011936] drop-shadow-lg mb-4">
        All Category
      </h1>
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-x-3">
          <select
            id="date"
            name="date"
            className="rounded-lg h-9 w-[200px] text-center cursor-pointer border-gray-500 text-gray-600"
            value=""
            required
          >
            <option value="">Select date</option>
            <option value="">Select date</option>
          </select>
          <select
            id="category"
            name="category"
            className="rounded-lg h-9 w-[200px] text-center cursor-pointer border-gray-500 text-gray-600"
            value=""
            required
          >
            <option value="">Select category</option>
          </select>
          <button className="w-[100px] h-9 bg-[#3570E2] rounded-md text-white cursor-pointer">
            filter
          </button>
        </div>

        <div className=" mr-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6">
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
            {paginatedCategory.map((row, index) => (
              <tr
                key={row._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{startIndex + index + 1}</td>
                <td className="px-6 py-4">{row.title}</td>
                <td className="px-6 py-4">{row.user.name}</td>
                <td className="flex space-x-5 px-6 py-4">
                  <MdOutlineEdit
                    className="text-[#011936] text-xl cursor-pointer"
                    onClick={() => {
                      router.push(`/${user.role}/category/edit/${row._id}`);
                    }}
                  />
                  <RiDeleteBin6Line className="text-[#011936] text-xl cursor-pointer" onClick={()=>handleDelete(row._id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" mb-3 flex justify-end mr-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default CategoryTable;
