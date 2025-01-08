"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useHandleDelete } from "@/utils/useHandleDelete";
import Pagination from "../mini-component/Pagination";
import { ImSearch } from "react-icons/im";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface User {
  _id: string;
  username: string;
  name: string;
  phone_number: string;
  email: string;
  role: string;
}

function AuthorTable() {
  const { addNotification } = useNotifications();
  const { token, user } = useAuth();
  const router = useRouter();
  const { handleDelete } = useHandleDelete();
  const [users, setUsers] = useState<User[]>([{
    _id: "",
    username: "",
    name: "",
    phone_number: "",
    email: "",
    role: ""
  }]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleUsernameClick = (user: any) => {
    setSelectedUser(user);
    setIsPopupVisible(true);
  };

  const handleRoleChange = async (role: string) => {
    let url = '';
    if (role === 'admin') {
      url = `${API}api/user/promote-admin/${selectedUser}`;
    } else if (role === 'editor') {
      url = `${API}api/user/change-to-editor/${selectedUser}`;
    } else if (role === 'author') {
      url = `${API}api/user/change-to-author/${selectedUser}`;
    } else if (role === 'viewer') {
      url = `${API}api/user/change-to-viewer/${selectedUser}`;
    }
    try {
      const res = await fetch(url, {
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
      setUsers(data);
    } catch (err: any) {
      setUsers([]);
      addNotification(err.message, "error");
    }
  };
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10; // Number of items per page

  // Calculate total pages based on data length
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1)
  };

  // Filter data based on search query
  const filteredData = users.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) || row.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div>
      <h1 className=" text-2xl font-serif font-bold text-[#011936] drop-shadow-lg mb-4">
        All Authors
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
                    <MdOutlineEdit className="text-[#011936] text-xl cursor-pointer" onClick={() => router.push(`/${user.role}/user/edit/${row._id}`)} />
                    <RiDeleteBin6Line
                      className="text-[#011936] text-xl cursor-pointer"
                      onClick={() => { handleDelete(row._id.toString(), token) }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-6 py-4">
                  No author found
                </td>
              </tr>
            )
            }
          </tbody>
          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Change Role for {selectedUser ? selectedUser.username : ""}</h2>
                {
                  user.role === "admin" &&
                  <button
                    onClick={() => handleRoleChange('admin')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 mb-2 rounded transition duration-300"
                  >
                    Change to Admin
                  </button>
                }
                {
                  (user.role === "admin" || user.role === "editor") &&
                  <button
                    onClick={() => handleRoleChange('editor')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-2 transition duration-300"
                  >
                    Change to Editor
                  </button>
                }
                <button
                  onClick={() => handleRoleChange('author')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mb-2 transition duration-300"
                >
                  Change to Author
                </button>
                <button
                  onClick={() => handleRoleChange('viewer')}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300"
                >
                  Change to Viewer
                </button>
                <button
                  onClick={handleClosePopup}
                  className="w-full bg-red-400 text-white px-4 py-2 rounded mt-2"
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

export default AuthorTable;
