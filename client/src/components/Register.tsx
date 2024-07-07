import React from "react";

function Register() {
  return (
    <div className=" flex justify-center mt-8">
      <form className="flex flex-col items-center w-72 h-96 border-gray-200 rounded-md shadow-2xl bg-[#FBF9F9]">
        <input
          type="text"
          name="name"
          placeholder=" Name"
          className="py-2 px-2 block w-64 border-gray-200 shadow-md mt-5 placeholder-gray-200"
        />
        <input type="email" name="email" placeholder="Email ID" />
        <input type="text" name="Phone_Number" placeholder="Contact Number" />
        <input type="text" name="address" placeholder="Address" />
      </form>
    </div>
  );
}
export default Register;
