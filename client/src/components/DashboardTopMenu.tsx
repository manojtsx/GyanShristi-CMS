"use client"
import Image from 'next/image'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function DashboardTopMenu() {
  const { user } = useAuth();
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md">
      <p>Dashboard</p>
      <div className="w-10 h-10">
        <Link href={user ? `/${user.role}/profile` : '#'}>
        <Image
          src={user && user.profile_pic ? `${API}${user.profile_pic}` : "/GirlProfile.jpg"}
          alt="Girl Profile Picture"
          height={500}
          width={500}
          className="h-10 w-10 rounded-full"
        />
        </Link>
      </div>
    </div>
  )
}

export default DashboardTopMenu