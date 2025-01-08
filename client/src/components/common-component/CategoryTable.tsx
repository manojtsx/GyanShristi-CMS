"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Pagination from "../mini-component/Pagination";
import { ImSearch } from "react-icons/im";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10; // Number of items per page
  const [totalPages, setTotalPages] = useState(1);

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
      // Calculate total pages based on the number of items
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  useEffect(() => {
    getCategoryList();
  }, [category]);

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
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Filter data based on search query
  const filteredData = category.filter((row) =>
    row.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategory = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <h1 className=" text-2xl font-serif font-bold text-[#011936] drop-shadow-lg mb-4">
        All Category
      </h1>
      <div className="flex justify-between items-center mb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pr-10 h-9 border border-gray-300 rounded-lg"
            placeholder="Search..."
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ImSearch className="text-gray-500" />
          </span>
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
              {
                user.role === "admin" || user.role === "editor" ? (

                  <th scope="col" className="px-6 py-3">Action</th>
                ) : ""
              }
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
                {
                  user.role === "admin" || user.role === "editor" ? (
                    <td className="flex space-x-5 px-6 py-4">
                      <MdOutlineEdit
                        className="text-[#011936] text-xl cursor-pointer"
                        onClick={() => {
                          router.push(`/${user.role}/category/edit/${row._id}`);
                        }}
                      />
                      <RiDeleteBin6Line className="text-[#011936] text-xl cursor-pointer" onClick={() => handleDelete(row._id)} />
                    </td>
                  ) : ""}
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
