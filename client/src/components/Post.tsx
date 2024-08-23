"use client";
import React, { useEffect, useState, useRef } from "react";
import SpeechToTextEditor from "./SpeechToTextEditor";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Post() {
  const { token } = useAuth();
  const { addNotification } = useNotifications();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [categories, setCategories] = useState([
    {
      _id: "",
      title: "",
    },
  ]);
  const [users, setUsers] = useState([
    {
      name: "",
      _id: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoriesAndUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories
      const categoriesResponse = await fetch(`${API}api/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!categoriesResponse.ok) throw new Error("Failed to fetch categories");
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      // Fetch users excluding "viewer" role
      const usersResponse = await fetch(`${API}api/user/role?role=non-viewer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!usersResponse.ok) throw new Error("Failed to fetch users");
      const usersData = await usersResponse.json();

      console.log("Users data:", usersData); // Debugging

      // Ensure usersData is an array
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        throw new Error("Users data is not an array");
      }
    } catch (error: any) {
      addNotification(error.message, "error");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndUsers();
  }, []);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // State to hold the photo preview URL
  // Define the fileInputRef with the correct type
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      console.log("File selected:", file.name);
      // Handle file upload logic here if necessary
    }
  };
  return (
    <div className=" flex gap-x-28">
      <div className="flex flex-col items-center justify-center mb-16">
        <div className=" text-center">
          <label>Title :</label>
          <div>
            <input
              type="text"
              name="title"
              className=" h-9 rounded-lg border-gray-300 bg-gray-200"
            />
          </div>
        </div>
        <div className=" mt-4">
          <SpeechToTextEditor />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-7 mt-16">
        <div className="text-center">
          <label htmlFor="categories">Categories:</label>
          <div className={`${isCategoryOpen ? "mb-10" : "mb-0"}`}>
            <select
              id="categories"
              name="categories"
              className="rounded-lg h-10 w-[200px] text-center"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-center">
          <label htmlFor="author">Author:</label>
          <div className={`${isAuthorOpen ? "mb-10" : "mb-0"}`}>
            <select
              id="author"
              name="author"
              className="rounded-lg h-10 w-[200px] text-center"
              onClick={() => setIsAuthorOpen(!isAuthorOpen)}
            >
              <option value="">Select Author</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" text-center">
          <label>Feature Photo :</label>
          <div
            className="w-40 h-36 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center"
            onClick={handlePhotoClick}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Uploaded Photo"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Upload</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <button
          className="w-[100px] h-9 bg-[#3570E2] rounded-md text-white"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Post;
