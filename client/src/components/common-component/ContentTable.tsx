"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Pagination from "../mini-component/Pagination";
import Link from "next/link";
import { ImSearch } from "react-icons/im";

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

// Define TypeScript types
interface User {
  name: string;
  email?: string;
  _id: string;
}

interface Category {
  title: string;
  _id: string;
}

interface Content {
  title: string;
  _id: string;
  user_id: User;
  category_id: Category;
  created_at: string;
}

function ContentTable() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [data, setData] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages based on data length
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}api/content/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.msg);
        }

        setData(result.content);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        addNotification(error.message, "error");
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API}api/content/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      const result = await response.json();
      setData(data.filter((row) => row._id !== id));
      addNotification(result.msg, "success");
    } catch (error) {
      console.error("Error deleting content:", error);
      addNotification("Failed to delete content", "error");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((row) =>
    row.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <h1 className=" text-2xl font-serif font-bold text-[#011936] drop-shadow-lg mb-4">
        All Contents
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
        <div className="mr-6">
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
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Created by
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Created on
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <Link href={`/post/${row._id}`}><td className="px-6 py-4 cursor-pointer">{row.title}</td></Link>
                  <td className="px-6 py-4">{!row.user_id ? "Unknown" : row.user_id.name}</td>
                  <td className="px-6 py-4">
                    {row.category_id &&
                      row.category_id.title ? row.category_id.title : "NA"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td className="flex space-x-5 px-6 py-4">
                    <RiDeleteBin6Line
                      className="text-[#011936] text-xl cursor-pointer"
                      onClick={() => handleDelete(row._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-6 py-4">
                  No Content found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mr-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ContentTable;
