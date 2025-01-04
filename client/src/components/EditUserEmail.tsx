"use client";

import React, { useState } from "react";
import PasswordBox from "@/components/mini-component/PasswordBox";
import SubmitButton from "@/components/mini-component/SubmitButton";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";

// Backend API URL
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function EditUserEmail() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const { id: userId } = useParams();

  const [newEmail, setNewEmail] = useState("");

  // Handle input changes
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}api/user/change-email/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ new_email: newEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to update email");
      }

      addNotification(data.msg, "success");
      router.push(`/${user?.role}/dashboard`);
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-screen p-14 items-center">
      <div className="flex flex-col justify-center items-center gap-7 px-10 py-3 shadow-lg bg-[#F9F7F7]">
        <div className="w-full flex flex-col">
          <label htmlFor="new_email" className="text-lg">
            New Email
          </label>
          <PasswordBox
            name="new_email"
            value={newEmail}
            placeholder="New Email"
            onChange={handleEditUserChange}
          />
        </div>
        <SubmitButton text="Save" />
      </div>    
    </form>
  );
}

export default EditUserEmail;
