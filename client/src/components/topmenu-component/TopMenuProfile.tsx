"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function TopMenuProfile() {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md">
      <p className="text-lg font-semibold text-gray-800 pl-2">Profile</p>
      <div className="w-10 h-10">
      <Link href={`/${user.role}/profile`}>
        <Image
          src={user.profile_pic ? `${API}${user.profile_pic}` : "/default.jpg"}
          alt="Girl Profile Picture"
          height={500}
          width={500}
          className="h-10 w-10 rounded-full"
        />
        </Link>
      </div>
    </div>
  );
}

export default TopMenuProfile;
