"use client";
import React from "react";
import { BsXLg } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Logout: React.FC<LogoutModalProps> = ({ isOpen, onClose}) => {
  if (!isOpen) return null;
  const {logout} = useAuth();
  const router = useRouter();

  const onConfirm = async () => {
    await logout();
    router.push('/login');
  }
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 h-56 rounded-md shadow-lg">
        <div className=" bg-[#011936] rounded-t-md py-3 flex justify-end">
          <BsXLg
            className=" text-white text-3xl mr-3 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <p className=" flex justify-center items-center text-lg text-black mt-10">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center space-x-3 mt-2 ">
          <button
            className="px-9 py-2 font-semibold bg-gray-200 rounded hover:bg-gray-400"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-7 py-2 font-semibold bg-gray-200 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
