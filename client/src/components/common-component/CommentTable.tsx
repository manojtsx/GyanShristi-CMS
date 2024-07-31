"use client";
import React, { useState } from "react";
import { ImReply } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";

function CommentTable() {
  const [data, setData] = useState([
    {
      id: 1,
      user: "seezon",
      post: "post1",
      comment: "very helpful content",
      date: "June 2",
    },
    // Add more rows here if needed
  ]);

  const handleDelete = (id: any) => {
    setData(data.filter((row) => row.id !== id));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          {data.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{row.user}</td>
              <td className="px-6 py-4">{row.post}</td>
              <td className="px-1 py-4">{row.comment}</td>
              <td className="px-6 py-4">{row.date}</td>
              <td className="flex space-x-5 px-6 py-4">
                <ImReply className="text-[#011936] text-xl" />
                <RiDeleteBin6Line
                  className="text-[#011936] text-xl cursor-pointer"
                  onClick={() => handleDelete(row.id)}
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
