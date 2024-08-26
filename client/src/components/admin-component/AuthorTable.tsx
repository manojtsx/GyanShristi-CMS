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

function AuthorTable() {
  const { addNotification } = useNotifications();
  const { token, user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([
    {
      _id: 1,
      username: "",
      name: "",
      phone_number: "",
      email: "",
    },
  ]);

  const getUserList = async () => {
    try {
      console.log(token, "hello");
      const res = await fetch(`${API}api/user/role?role=author`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.msg);
      }
      if (res.status === 404) {
        addNotification(data.msg, "error");
        return;
      }
      console.log(data);
      setUsers(data);
    } catch (err: any) {
      setUsers([]);
      addNotification(err.message, "error");
    }
  };
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages based on data length
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Get the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    getUserList();
  }, []);
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-200 uppercase bg-[#011936]">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((row, index) => (
              <tr
                key={row._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{row.username}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{row.phone_number}</td>
                <td className="flex space-x-5 px-6 py-4">
                  <MdOutlineEdit
                    className="text-[#011936] text-xl cursor-pointer"
                    onClick={() =>
                      router.push(`/${user.role}/author/edit/${row._id}`)
                    }
                  />
                  <RiDeleteBin6Line className="text-[#011936] text-xl cursor-pointer" />
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

export default AuthorTable;
