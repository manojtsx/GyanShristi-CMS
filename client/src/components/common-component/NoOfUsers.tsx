"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function NoOfUsers() {
  const [userCounts, setUserCounts] = useState({
    admin: 0,
    editor: 0,
    author: 0,
    viewer: 0,
  });

  const [contentCount, setContentCount] = useState(0);
  const { addNotification } = useNotifications();

  const getUserCount = async () => {
    try {
      const res = await fetch(`${API}api/user/count-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      }

      setUserCounts(data);
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  const getContentCount = async () => {
    try {
      const res = await fetch(`${API}api/content/count-content`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      }

      setContentCount(data.totalContent);
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  useEffect(() => {
    getUserCount();
    getContentCount();
  }, []);
  
  return (
            <div className="flex gap-4 w-full">
              <div className="rounded-md bg-[#3742FA] text-white w-1/4 py-5 flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Editors</p>
                <p className="text-sm font-medium">{userCounts.editor}</p>
              </div>
              <div className="rounded-md bg-[#3742FA] text-white w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Authors</p>
                <p className="text-sm font-medium">{userCounts.author}</p>
              </div>
              <div className="rounded-md bg-[#3742FA] text-white w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Contents</p>
                <p className="text-sm font-medium">{contentCount}</p>
              </div>
              <div className="rounded-md bg-[#3742FA] text-white w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Viewers</p>
                <p className="text-sm font-medium">{userCounts.viewer}</p>
              </div>
            </div>  
              
  );
}

export default NoOfUsers; 