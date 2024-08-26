import React, { useEffect, useState } from "react";
import Image from "next/image";
import SubmitButton from "@/components/mini-component/SubmitButton";

function AddCategory() {
  const [category, setCategory] = useState({
    user_id: "",
    title: "",
    ownerName: "",
  });

  const [users, setUsers] = useState([
    {
      name: "",
      _id: "",
    },
  ]);

  return (
    <div>
      <form className="flex flex-col h-screen justify-center items-center">
        <div className="w-24 relative">
          <Image
            src="/GirlProfile.jpg"
            alt="Profile Picture"
            height={500}
            width={500}
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-7 px-10 py-3 shadow-lg bg-[#F9F7F7]">
          <div className="w-full flex flex-col">
            <label htmlFor="createdBy" className="w-32 text-lg">
              Created By{" "}
            </label>
            <select
              id="author"
              name="author"
              className="rounded-lg h-10 w-[200px] text-center"
              value={category.user_id}
              required
            >
              <option value="">Select Author</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="title" className="w-32 text-lg">
              Title{" "}
            </label>
            <input
              name="title"
              value={category.title}
              placeholder="Enter a title"
            />
          </div>
          <SubmitButton text="Add" />
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
