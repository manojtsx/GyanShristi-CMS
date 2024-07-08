"use client";
import React, { useState } from "react";
import Logo from "./mini-component/Logo";
import Textbox from "./mini-component/Textbox";
import SmallButton from "./mini-component/SmallButton";
import SubmitButton from "./mini-component/SubmitButton";
import Link from "next/link";
import PasswordBox from "./mini-component/PasswordBox";
import { useNotifications } from "@/context/NotificationContext";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface User {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  username: string;
  password: string;
  confirm_password: string
}
function Register() {
  const { addNotification } = useNotifications();
  const [isFirstForm, setIsFirstForm] = useState(true);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    username: "",
    password: "",
    confirm_password: ""
  });

  // Handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleNextClick = () => {
    setIsFirstForm(false);
  };

  // submit the form for registration
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user.password !== user.confirm_password) {
        throw new Error('Please match the password.')
      }
      const res = await fetch(`${API}api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      if (res.status === 400) {
        throw new Error(data.msg)
        return;
      }
      if (!res.ok) {
        throw new Error(data.msg)
      }
      addNotification(data.msg, 'success');
    } catch (err: any) {
      addNotification(err.message, 'error');
    }
  }
  return (
    <main className=" flex min-h-screen">
      <div className="flex flex-col items-start justify-center w-1/2 pl-40">
        <h1 className=" font-bold text-4xl">GyanShristi</h1>
        <p className=" text-gray-400 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
        </p>
        <button className="w-[200px] h-12 bg-[#3570E2] rounded-md text-white font-semibold mt-6">
          Know About Us
        </button>
      </div>
      <div className="flex justify-center items-center min-h-[90vh] w-1/2 pl-24">
        {isFirstForm ? (
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-5 bg-[#FBF9F9] p-10 rounded-lg shadow-lg"
          >
            <Logo />
            <Textbox
              name="name"
              value={user.name}
              placeholder="Full Name"
              onChange={handleInputChange}
            />
            <Textbox
              name="email"
              value={user.email}
              placeholder="Email ID"
              onChange={handleInputChange}
            />
            <Textbox
              name="phone_number"
              value={user.phone_number}
              placeholder="Contact Number"
              onChange={handleInputChange}
            />
            <Textbox
              name="address"
              value={user.address}
              placeholder="Address"
              onChange={handleInputChange}
            />
            <div className=" space-x-1">
              <Link href="/login">
                <SmallButton text="Cancel" />
              </Link>
              <SmallButton text="Next" onClick={handleNextClick} />
            </div>
          </form>
        ) : (
          // second form
          <form
            action=""
            className="flex justify-center items-center flex-col gap-5 bg-[#FBF9F9] p-10 rounded-lg shadow-lg"
          >
            <Logo />
            <Textbox
              name="username"
              value={user.username}
              placeholder="Username"
              onChange={handleInputChange}
            />
            <PasswordBox
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleInputChange}
            />
            <PasswordBox
              name="confirm_password"
              value={user.confirm_password}
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <SubmitButton text="Submit" />
          </form>
        )}
      </div>
    </main>
  );
}

export default Register;
