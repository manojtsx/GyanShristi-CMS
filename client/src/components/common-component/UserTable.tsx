"use client";
import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

function UserTable() {
  const [data, setData] = useState([
    {
      id: 1,
      username: "usha",
      phone: "9816624525",
      email: "ushagurung@gmail.com",
      profile: "",
    },
    // Add more rows here if needed
  ]);

  const handleDelete = (id: any) => {
    setData(data.filter((row) => row.id !== id));
  };

  return (
    <div className=" w-[1000px] overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 uppercase bg-[#011936]">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              username
            </th>
            <th scope="col" className="px-6 py-3">
              phone.no
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              profile pic
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
              <td className="px-6 py-4">{row.id}</td>
              <td className="px-6 py-4">{row.username}</td>
              <td className="px-6 py-4">{row.phone}</td>
              <td className="px-1 py-4">{row.email}</td>
              <td className="px-6 py-4">{row.profile}</td>
              <td className="flex space-x-5 px-6 py-4">
                <MdOutlineEdit className="text-[#011936] text-xl cursor-pointer" />
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

export default UserTable;
