"use client"
import React from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { ImSearch } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
function TopMenuAuthor() {
  const {user} = useAuth();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md">
      <div className="flex items-center space-x-2 pl-2">
        <p className="text-lg font-semibold text-gray-800"> All Authors</p>
        <HiPencilSquare className=" text-lg text-[#011936]" />
      </div>
      <div className="flex gap-x-7 pr-8">
        
        <button className="w-[150px] h-9 bg-[#3570E2] rounded-md text-white cursor-pointer" onClick={()=>router.push(`/${user.role}/user/add`)}>
          Add User
        </button>
      </div>
    </div>
  );
}

export default TopMenuAuthor;
