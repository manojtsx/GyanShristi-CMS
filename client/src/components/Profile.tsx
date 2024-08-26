"use client";
import EditProfile from "@/components/EditProfile";
import SmallButton from "@/components/mini-component/SmallButton";
import SubmitButton from "@/components/mini-component/SubmitButton";
import Textbox from "@/components/mini-component/Textbox";
import { faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <form
      action=""
      className="flex flex-col h-screen justify-center items-center" // Light background
    >
      <div className="flex flex-col items-center gap-5 bg-[#F0F4FF] p-8 shadow-md rounded-lg">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-24 relative">
            <Image
              src="/GirlProfile.jpg"
              alt="Profile Picture"
              height={500}
              width={500}
              className="h-24 w-24 rounded-full object-cover border-4 border-[#3742FA]" // Border around image
            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="w-7 h-7 absolute bottom-0 right-0 bg-[#3742FA] text-white p-1 rounded-full cursor-pointer" // Pen icon style
            />
          </div>
          <label
            htmlFor="name"
            className="text-xl text-[#3742FA] font-semibold"
          >
            ABCD XYZ
          </label>
        </div>
        <div>
          <Link href={`/${user?.role}/edit-profile`}>
            {" "}
            <button className="bg-[#3742FA] px-4 py-2 rounded-md text-white font-medium flex justify-center items-center gap-1 hover:bg-[#2B34CC]">
              <FontAwesomeIcon icon={faPen} /> Edit
            </button>
          </Link>
          <div className="flex flex-col items-center gap-5 w-96 px-12 py-5 bg-[#F9F7F7] rounded-lg shadow-lg">
            <div className="w-full flex ">
              <p className="text-left w-24 text-[#333333] font-medium">Name:</p>
              <p className="text-left text-[#333333] font-medium">
                {user?.name || "Name"}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Username:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.username || "Username"}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Address:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.address || "123 Street"}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Contact:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.phone_number || "98XXXXXXXXX"}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Email Id:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.email || "abc@email.com"}
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="text-[#1E43C8] hover:text-[#2B34CC] font-semibold"
        >
          Change Password
        </Link>
      </div>
    </form>
  );
}

export default Profile;
