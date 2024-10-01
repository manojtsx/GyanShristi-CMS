"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useHandleDelete } from "@/utils/useHandleDelete";
import Pagination from "../mini-component/Pagination";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface User{
  _id : string;
  username : string;
  name : string;
  phone_number : string;
  email : string;
}

function UserTable() {
  const { addNotification } = useNotifications();
  const { token, user } = useAuth();
  const router = useRouter();
  const { handleDelete } = useHandleDelete();
  const [users, setUsers] = useState<User[]>([
    {
      _id: "",
      username: "",
      name: "",
      phone_number: "",
      email: "",
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleUsernameClick = (user: any) => {
    setSelectedUser(user);
    setIsPopupVisible(true);
  };

  const handleRoleChange = async (role: string) => {
    try {
      const res = await fetch(`${API}api/user/${role === 'editor' ? 'change-to-editor' : 'promote-admin'}/${selectedUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.msg);
      }
      addNotification(data.msg, "success");
      getUserList();
      handleClosePopup();
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const getUserList = async () => {
    try {
      const res = await fetch(`${API}api/user/`, {
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
     <h1 className=" text-2xl font-serif font-bold text-[#011936] drop-shadow-lg mb-4">
        All Users
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((row, index) => (
                <tr
                  key={row._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4" onClick={() => handleUsernameClick(row._id)}>{row.username}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.email}</td>
                  <td className="px-6 py-4">{row.phone_number}</td>
                  <td className="flex space-x-5 px-6 py-4">
                    <MdOutlineEdit
                      className="text-[#011936] text-xl cursor-pointer"
                      onClick={() =>
                        router.push(`/${user.role}/user/edit/${row._id}`)
                      }
                    />
                    <RiDeleteBin6Line
                      className="text-[#011936] text-xl cursor-pointer"
                      onClick={() => {
                        handleDelete(row._id.toString(), token);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-6 py-4">
                  No user found
                </td>
              </tr>
            )}
          </tbody>
          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Change Role for {selectedUser? selectedUser.username : ""}</h2>
                <button
                  onClick={() => handleRoleChange('editor')}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
                >
                  Change to Editor
                </button>
                <button
                  onClick={() => handleRoleChange('admin')}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded"
                >
                  Change to Admin
                </button>
                <button
                  onClick={handleClosePopup}
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded mt-2"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </table>
      </div>
      <div className="mb-3 flex justify-end mr-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default UserTable;
