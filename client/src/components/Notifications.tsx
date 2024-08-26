"use client";
import React, { useState } from "react";
import Pagination from "./mini-component/Pagination";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Assuming you have a list of notifications stored in state
  // Calculate the total number of pages
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // Get the notifications for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

        <div className=" mr-20">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div className="">
        <div className=" h-[450px] border border-gray-300 rounded-lg p-4 mr-20 shadow-all relative overflow-x-auto bg-slate-100 ">
          {paginatedNotifications.map((notification, index) => (
            <div
              key={index}
              className="p-3 mb-2 border-b border-gray-200"
            ></div>
          ))}
        </div>
      </div>
      <div className=" mb-3 flex justify-end mr-20">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Notifications;
