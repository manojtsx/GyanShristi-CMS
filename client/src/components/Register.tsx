"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "./mini-component/Logo";
import Textbox from "./mini-component/Textbox";
import SmallButton from "./mini-component/SmallButton";
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
  confirm_password: string;
  otp: string
}
function Register() {
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [isFirstForm, setIsFirstForm] = useState(true);
  const [showOtpContainer, setShowOtpContainer] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    username: "",
    password: "",
    confirm_password: "",
    otp: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, otp: e.target.value });
  };
  const handleNextClick = () => {
    setIsFirstForm(false);
  };

  const handlePreviousClick = () => {
    setIsFirstForm(true);
  };

  // submit the form for 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (user.password !== user.confirm_password) {
        throw new Error("Please match the password.");
      }
      const res = await fetch(`${API}api/auth/sendOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 400) {
        throw new Error(data.msg);
      }
      if (!res.ok) {
        throw new Error(data.msg);
      }
      addNotification(data.msg, "success");
      setShowOtpContainer(true);
    } catch (err: any) {
      addNotification(err.message, "error");
    }finally{
      setIsSubmitting(false);
    }
  }

  // submit the form for OTP verification
  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(false);
    try {
      const res = await fetch(`${API}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 400) {
        throw new Error(data.msg);
      }
      if (!res.ok) {
        throw new Error(data.msg);
      }
      addNotification(data.msg, "success");
      router.push("/login");
    } catch (err: any) {
      addNotification(err.message, "error");
    }finally{
      setIsSubmitting(false);
    }
  };
  return (
    <main className=" flex flex-col md:flex-row min-h-screen dark:bg-[#121212] dark:text-white mt-10">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 pl-3 md:pl-40 ">
        <h1 className=" font-bold text-4xl">GyanShristi CMS</h1>
        <p className=" text-gray-400 mt-4">
          A CMS based on Voice Recognition and Text to Speech Technology for the better management of the contents.
        </p>
        <Link href="/about">
        <button className="w-[200px] h-12 bg-[#3742FA] rounded-md text-white font-semibold mt-6 ">
          Know About Us
        </button>
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-[90vh] w-full md:w-1/2 md:pl-24 mt-10 md:mt-0">
        {!showOtpContainer ? (

          <form onSubmit={handleSubmit}>
            {isFirstForm ? (
              <div className="dark:bg-[#1A1A1A] flex justify-center items-center flex-col gap-5 bg-[#FBF9F9] p-10 rounded-lg shadow-lg">
                <Logo />
                <Textbox
                  name="name"
                  value={user.name}
                  placeholder="Full Name"
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  value={user.email}
                  name="email"
                  className="bg-white border-none shadow-md w-[300px] dark:bg-[#2C2C2C] dark:border-[#303030] dark:text-white"
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
              </div>
            ) : (
              // second form
              <div className="flex justify-center items-center flex-col gap-5 bg-[#FBF9F9] p-10 rounded-lg shadow-lg dark:bg-[#1A1A1A]">
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
                <div className=" space-x-1">
                  <SmallButton text="previous" onClick={handlePreviousClick} />

                  <button
                    type="submit"
                    className={`w-[100px] h-10 ${isSubmitting ? 'bg-[#708ec9]' : 'bg-[#3570E2]'}  text-white font-bold`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit} className="flex flex-col items-center space-y-4 p-4 bg-white shadow-md rounded-lg dark:bg-[#1A1A1A]">
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={user.otp}
            onChange={handleOtpChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className={`w-full px-4 py-2 ${isSubmitting ? 'bg-[#708ec9]' : 'bg-[#3570E2]'}} text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        )}
      </div>
    </main>
  );
}

export default Register;
