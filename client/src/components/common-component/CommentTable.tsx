"use client";
import React, { useState, useEffect } from "react";
import { ImReply } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../mini-component/Pagination";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface Comment {
  _id: string;
  user: {
    email: string;
    name: string;
    username: string;
  };
  content: {
    title: string;
    description: string;
  };
  description: string;
  created_at: string;
}

function CommentTable() {
  const [data, setData] = useState<Comment[]>([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API}api/comment/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg || 'Failed to fetch comments');
      }
      console.log(result);
      setData(result.comments);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API}api/comment/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :  `Bearer ${token}`
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error();
      }
      setData(data.filter((row) => row._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg mr-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-200 uppercase bg-[#011936]">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Post
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={row._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{row.user.name}</td>
                <td className="px-6 py-4">{row.content.title}</td>
                <td className="px-1 py-4">{row.description}</td>
                <td className="px-6 py-4">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="flex space-x-5 px-6 py-4">
                  <ImReply className="text-[#011936] text-xl cursor-pointer" />
                  {/* <RiDeleteBin6Line
                    className="text-[#011936] text-xl cursor-pointer"
                    onClick={() => handleDelete(row._id)}
                  /> */}
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

export default CommentTable;