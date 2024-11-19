"use client";
import EditProfile from "@/components/EditProfile";
import SmallButton from "@/components/mini-component/SmallButton";
import SubmitButton from "@/components/mini-component/SubmitButton";
import Textbox from "@/components/mini-component/Textbox";
import { faPen, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Profile() {
  const { user, token } = useAuth();
  const { addNotification } = useNotifications();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profile_pic || null);

  const handleProfileClick = () => {
    setIsPopupVisible(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
      if(file){
        const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB > 5) {
        addNotification("Profile Picture size exceeds 5MB limit", "error");
        return;
      }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        // Implement the file upload logic here
        const formData = new FormData();
        formData.append("profile-pic", selectedFile);
        const response = await fetch(`${API}api/user/upload-profile-picture/${user._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.msg);
        }
        addNotification(result.msg, "success");
        // Close the popup after upload
        setIsPopupVisible(false);
      }
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  return (
    <div
      className="flex flex-col h-screen justify-center items-center" // Light background
    >
      <div className="flex flex-col items-center gap-5 bg-[#F0F4FF] p-8 shadow-md rounded-lg">
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="w-24 relative cursor-pointer" onClick={handleProfileClick}>
            <Image
              src={previewUrl ? `${API}${previewUrl}` : "/default.jpg"}
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

          {isPopupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Upload Profile Picture</h2>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {previewUrl && (
                  <div className="mt-4">
                    <img src={previewUrl ? `${API}${previewUrl}` : "/default.jpg"} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                  </div>
                )}
                <button
                  onClick={handleUpload}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsPopupVisible(false)}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <label
            htmlFor="name"
            className="text-xl text-[#3742FA] font-semibold"
          >
            {user?.name}
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
                {user?.name}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Username:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.username}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Address:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.address}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Contact:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.phone_number}
              </p>
            </div>

            <div className="w-full flex">
              <p className="text-left w-24 text-[#333333] font-medium">
                Email Id:
              </p>
              <p className="text-left text-[#333333] font-medium">
                {user?.email}
              </p>  
            </div>
          </div>
        </div>

        <Link href={`/${user?.role}/change-password`} className="text-[#1E43C8] hover:text-[#2B34CC] font-semibold">
          Change Password
        </Link>
      </div>
    </div>
  );
}

export default Profile;
