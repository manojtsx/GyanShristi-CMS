"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";
import { Document, Page, pdfjs } from 'react-pdf';

const API = process.env.NEXT_PUBLIC_BACKEND_API;
// Set the workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

function Pdf() {
  const { token, user } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [pdf, setPdf] = useState({
    title: '',
    description: '',
    category_id: '',
    user_id: user._id,
    content_type: 'pdf'
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
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

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
      if (user.role === "admin" || user.role === "editor") {

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
    setPdf({ ...pdf, [name]: value });
  };

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlepdfClick = () => {
    if (pdfInputRef.current) {
      pdfInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (event.target.name === "thumbnail") {
        const fileSizeInMB = file.size / 1024 / 1024;
        if (fileSizeInMB > 5) {
          addNotification("Thumbnail size exceeds 5MB limit", "error");
          return;
        }
        setPhotoPreview(previewUrl);

      } else if (event.target.name === "pdf") {
        const fileSizeInMB = file.size / 1024 / 1024;
        if (fileSizeInMB > 100) {
          addNotification("PDF size exceeds 100MB limit", "error");
          return;
        }
        setPdfPreview(previewUrl);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", pdf.title);
    formData.append("description", pdf.description);
    formData.append("category_id", pdf.category_id);
    formData.append("user_id", pdf.user_id);
    formData.append("content_type", pdf.content_type);
    formData.append("pdf", pdfInputRef.current?.files?.[0] as Blob);
    formData.append("thumbnail", fileInputRef.current?.files?.[0] as Blob);

    try {
      const response = await fetch(`${API}api/content/add/pdf`, {
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
      setPdf({ title: '', description: '', category_id: '', user_id: '', content_type: 'pdf' });
      setPhotoPreview(null);
      setPdfPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      router.push(`/${user.role}/content`);
    } catch (error: any) {
      addNotification(error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-x-14 gap-y-10 p-8 bg-white rounded-xl shadow-lg overflow-auto">
      <div className="flex flex-col items-start justify-center md:w-2/3 max-h-full overflow-y-auto">
        <div className="w-full mb-8">
          <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={pdf.title}
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
            value={pdf.description}
            onChange={handleInputChange}
            className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="w-full mb-8">
          <label className="block text-lg font-medium text-gray-800 mb-2">Upload PDF:</label>
          <div className="max-h-[400px] overflow-auto border border-gray-300 rounded-lg">
            <input
              type="file"
              ref={pdfInputRef}
              style={{ display: 'none' }}
              name="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
            <div
              className="cursor-pointer flex items-center justify-center h-full p-4 border-dashed border-2 border-gray-300 rounded-lg"
              onClick={handlepdfClick}
            >
              {pdfPreview ? (
                <iframe
                  src={pdfPreview}
                  style={{ width: '100%', height: '1000px' }}
                >
                  This browser does not support PDFs. Please download the PDF to view it: <a href={pdfPreview}>Download PDF</a>
                </iframe>
              ) : (
                <span className="text-gray-500">Upload PDF</span>
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
            value={pdf.category_id}
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
        {
          user.role === "admin" || user.role == "editor" ?
          <div className="w-full">
            <label htmlFor="author" className="block text-lg font-medium text-gray-800 mb-2">Author:</label>
            <select
              id="author"
              name="user_id"
              value={pdf.user_id}
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
          </div> : ""
        }

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

export default Pdf;
