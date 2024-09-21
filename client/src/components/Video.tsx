"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function Video() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [video, setVideo] = useState({
    title: '',
    description: '',
    category_id: '',
    user_id: '',
    content_type: 'video'
  });
  const [categories, setCategories] = useState([
    {
      _id: "",
      title: ""
    }
  ]);
  const [users, setUsers] = useState([{
    name: "",
    _id: ""
  }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVideo({ ...video, [name]: value });
    console.log(video)
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVideoClick = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (event.target.name === "thumbnail") {
        setPhotoPreview(previewUrl);

      } else if (event.target.name === "video") {
        setVideoPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", video.title);
    formData.append("description", video.description);
    formData.append("category_id", video.category_id);
    formData.append("user_id", video.user_id);
    formData.append("content_type", video.content_type);
    formData.append("video", videoInputRef.current?.files?.[0] as Blob);
    formData.append("thumbnail", fileInputRef.current?.files?.[0] as Blob);

    try {
      const response = await fetch(`${API}api/content/add/video`, {
        method: "POST",
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
      setVideo({ title: '', description: '', category_id: '', user_id: '', content_type: 'video' });
      setPhotoPreview(null);
      setVideoPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (videoInputRef.current) videoInputRef.current.value = '';
      router.push(`/${user.role}/content`);
    } catch (error: any) {
      addNotification(error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-y-10 gap-x-14 p-8 bg-white rounded-xl shadow-lg overflow-auto">
    <div className="flex flex-col items-start justify-center md:w-2/3 max-h-full overflow-y-auto">
      <div className="w-full mb-8">
        <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={video.title}
          onChange={handleInputChange}
          className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="w-full mb-8">
        <label htmlFor="description" className="block text-lg font-medium text-gray-800 mb-2">Description:</label>
        <input
          type="text"
          name="description"
          value={video.description}
          onChange={handleInputChange}
          className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="w-full mb-8">
        <label className="block text-lg font-medium text-gray-800 mb-2">Content:</label>
        <div className="max-h-[400px] overflow-auto border border-gray-300 rounded-lg">
          <input
            type="file"
            ref={videoInputRef}
            style={{ display: 'none' }}
            name="video"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
          <div
            className="cursor-pointer flex items-center justify-center h-full p-4 border-dashed border-2 border-gray-300 rounded-lg"
            onClick={handleVideoClick}
          >
            {videoPreview ? (
              <video
                src={videoPreview}
                controls
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Upload Video</span>
            )}
          </div>
        </div>
      </div>
    </div>
  
    <div className="flex flex-col items-start justify-start md:w-1/3 gap-y-6">
      <div className="w-full">
        <label htmlFor="categories" className="block text-lg font-medium text-gray-800 mb-2">Categories:</label>
        <select
          id="categories"
          name="category_id"
          value={video.category_id}
          onChange={handleInputChange}
          className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
  
      <div className="w-full">
        <label htmlFor="author" className="block text-lg font-medium text-gray-800 mb-2">Author:</label>
        <select
          id="author"
          name="user_id"
          value={video.user_id}
          onChange={handleInputChange}
          className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Author</option>
          {users.map((user: any) => (
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
          style={{ display: 'none' }}
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
  
      <button
        className="self-start w-32 h-10 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-semibold mt-4"
        type="submit"
      >
        Save
      </button>
    </div>
  </form>
    
  );
}

export default Video;
