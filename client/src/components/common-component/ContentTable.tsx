"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
  category_id: Category[];
  created_at: string;
}

function ContentTable() {
  const { token } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [data, setData] = useState<Content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}api/content/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch content data");
        }

        const result = await response.json();
        setData(result.content);
      } catch (error) {
        console.error("Error fetching data:", error);
        addNotification("Failed to load content data", "error");
      }
    };

    fetchData();
  }, [token, addNotification]);

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

  return (
    <div className="w-[1000px] overflow-x-auto shadow-md sm:rounded-lg mt-9">
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
        {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{row.title}</td>
                <td className="px-6 py-4">{row.user_id.name}</td>
                <td className="px-6 py-4">
                  {row.category_id && row.category_id[0] && row.category_id[0].title}
                </td>
                <td className="px-6 py-4">
                  {new Date(row.created_at).toLocaleDateString()}
                </td>
                <td className="flex space-x-5 px-6 py-4">
                  <MdOutlineEdit
                    className="text-[#011936] text-xl cursor-pointer"
                    onClick={() => router.push(`/edit/${row._id}`)}
                  />
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
  );
}

export default ContentTable;
