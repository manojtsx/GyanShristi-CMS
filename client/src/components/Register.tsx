"use client";
import React, { useState } from "react";
import Logo from "./mini-component/Logo";
import Textbox from "./mini-component/Textbox";
import SmallButton from "./mini-component/SmallButton";
import SubmitButton from "./mini-component/SubmitButton";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  username: string;
  password: string;
}
function Register() {
  const [isFirstForm, setIsFirstForm] = useState(true);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    username: "",
    password: "",
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
            action=""
            className="flex justify-center items-center flex-col gap-5 bg-[#FBF9F9] p-10 rounded-lg shadow-lg"
          >
            <Logo />
            <Textbox
              name="name"
              value="name"
              placeholder="Name"
              onChange={handleInputChange}
            />
            <Textbox
              name="email"
              value="email"
              placeholder="Email ID"
              onChange={handleInputChange}
            />
            <Textbox
              name="Phone_number"
              value="Phone_Number"
              placeholder="Contact Number"
              onChange={handleInputChange}
            />
            <Textbox
              name="address"
              value="address"
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
              value="username"
              placeholder="Username"
              onChange={handleInputChange}
            />
            <Textbox
              name="password"
              value="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
            <Textbox
              name="confirm_password"
              value="confirm_password"
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
