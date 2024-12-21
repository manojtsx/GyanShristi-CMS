"use client";
import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "../mini-component/Pagination";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";
import { ImSearch } from "react-icons/im";
import Link from "next/link";

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
  content_id: string;
  description: string;
  created_at: string;
}

function CommentTable() {
  const [data, setData] = useState<Comment[]>([]);
  const [filteredData, setFilteredData] = useState<Comment[]>([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchComments();
  }, [currentPage, searchQuery]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${API}api/comment?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.msg || "Failed to fetch comments");
      }
      const filteredData = result.comments.filter((row: Comment) => {
        return (
          row.content.title !== "unknown" &&
          row.user.name !== "unknown" &&
          (row.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.content.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            row.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
      setFilteredData(filteredData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API}api/comment/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      setData(data.filter((row) => row._id !== id));
      setFilteredData(filteredData.filter((row) => row._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className=" text-2xl font-serif font-bold text-[#011936] drop-shadow-lg mb-4">
        All Comments
      </h1>
      <div className="flex justify-between items-center mb-3">
        <div className="relative">
          <input
            type="text"
            className="pr-10 h-9 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
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
                <Link href={`/post/${row.content_id}`} passHref>
                  <td className="px-6 py-4">{row.content.title}</td>
                </Link>
                <td className="px-1 py-4">{row.description}</td>
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
