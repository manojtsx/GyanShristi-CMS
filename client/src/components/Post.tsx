"use client";
import React, { useEffect, useState, useRef } from "react";
import SpeechToTextEditor from "./SpeechToTextEditor";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Post() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
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
  const [post, setPost] = useState({
    title: "",
    description: "",
    blog: "",
    user_id: "",
    category_id: "",
    content_type: "post",
  });

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
      const usersData = await usersResponse.json();
      if (!usersResponse.ok) throw new Error(usersData.msg);

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
      // Handle file upload logic here if necessary
    }
  };

  const handleBlogChange = (newBlogContent: string) => {
    setPost((prevPost) => ({
      ...prevPost,
      blog: newBlogContent,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Prepare the FormData object
      const formData = new FormData();

      // Append text fields from the post state
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("blog", post.blog);
      formData.append("user_id", post.user_id);
      formData.append("category_id", post.category_id);
      formData.append("content_type", post.content_type);

      // If a photo has been selected, append it to the formData
      if (fileInputRef.current?.files?.[0]) {
        formData.append("thumbnail", fileInputRef.current.files[0]);
      }

      // Make the POST request with the FormData
      const response = await fetch(`${API}api/content/add/post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // No need for "Content-Type": "multipart/form-data"
          // as the browser sets it automatically with the correct boundary.
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }

      addNotification(data.msg, "success");

      // Optionally, clear the form after successful submission
      setPost({
        title: "",
        description: "",
        blog: "",
        user_id: "",
        category_id: "",
        content_type: "post"
      });
      setPhotoPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.push(`/${user.role}/content`)
    } catch (error: any) {
      addNotification(error.message, "error");
    }
  };

  return (
       <div className="flex flex-col md:flex-row gap-y-10 gap-x-14 p-8 bg-white rounded-xl shadow-lg overflow-auto">
      <div className="flex flex-col items-start justify-center md:w-2/3 max-h-full overflow-y-auto">
        <div className="w-full mb-8">
          <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className="w-full mb-8">
          <label htmlFor="description" className="block text-lg font-medium text-gray-800 mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            required
          />
        </div>
        <div className="w-full mb-8">
          <label className="block text-lg font-medium text-gray-800 mb-2">Content:</label>
          <div className="max-h-[400px] overflow-auto">
            <SpeechToTextEditor value={post.blog} onChange={handleBlogChange} />
          </div>
        </div>
      </div>
    
      <div className="flex flex-col items-start justify-start md:w-1/3 gap-y-6">
        <div className="w-full">
          <label htmlFor="categories" className="block text-lg font-medium text-gray-800 mb-2">
            Categories:
          </label>
          <select
            id="categories"
            name="categories"
            className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={post.category_id}
            onChange={(e) => setPost({ ...post, category_id: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
    
        <div className="w-full">
          <label htmlFor="author" className="block text-lg font-medium text-gray-800 mb-2">
            Author:
          </label>
          <select
            id="author"
            name="author"
            className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={post.user_id}
            onChange={(e) => setPost({ ...post, user_id: e.target.value })}
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
    
        <div className="w-full">
          <label className="block text-lg font-medium text-gray-800 mb-2">Featured Photo:</label>
          <div
            className="w-full h-36 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all"
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
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
    
        <button
          className="self-start w-32 h-10 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-semibold mt-4"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Post;