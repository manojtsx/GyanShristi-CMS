"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { ImReply } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjYxMDA4NDk5Njk5MmIzZDVkYjMwYyIsImlhdCI6MTcyNDI0ODQzNiwiZXhwIjoxNzI1MTEyNDM2fQ.Xe6jCTRp-thit70iTNjMyMVtokkayHveD9gbcJdT_UM';

function CommentTable() {
  const { addNotification } = useNotifications();
  const [comments, setComments] = useState([{
    _id : "",
    description : "",
    content : {
      title : ""
    },
    user : {
      name : ""
    }
  }]);

  const getCommentList = async () => {
    try {
      const res = await fetch(`${API}api/comment/`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setComments(data.comments); // Assuming data.comments is the array of comments
    } catch (err : any) {
      addNotification(err.message, 'error');
    }
  };

  useEffect(() => {
    getCommentList();
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
              Comment
            </th>
            <th scope="col" className="px-6 py-3">
              Commentor
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((row, index) => (
            <tr
              key={row._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{row.description}</td>
              <td className="px-6 py-4">{row.user?.name || "unknown"}</td>
              <td className="px-6 py-4">{row.content?.title || "unknown"}</td>

              <td className="flex space-x-5 px-6 py-4">
                <ImReply className="text-[#011936] text-xl" />
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

export default CommentTable;
