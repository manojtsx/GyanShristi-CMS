"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter, useParams } from "next/navigation";
import Loading from "./Loading";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface User {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  title: string;
}

function EditPdf() {
  const { token, user } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const { addNotification } = useNotifications();
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdf, setPdf] = useState({
    title: "",
    description: "",
    location: null as string | null,
    user_id: "",
    category_id: "",
    thumbnail: null as File | null,
    content_type: "pdf"
  });
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchPdf = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}api/content/pdf/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const pdfData = await response.json();
      if (!response.ok) throw new Error(pdfData.msg);
      setPdf({ ...pdfData.content[0], location: pdfData.content[0].location, thumbnail: pdfData.content[0].thumbnail });
      setPdfPreview(pdfData.content[0].location);
      setThumbnailPreview(pdfData.content[0].thumbnail);
    } catch (error) {
      if (error instanceof Error) {
        addNotification(error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesAndUsers = async () => {
    try {
      setLoading(true);
      const categoriesResponse = await fetch(`${API}api/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!categoriesResponse.ok) throw new Error("Failed to fetch categories");
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);

      if (user.role === "admin" || user.role === "editor") {
        const usersResponse = await fetch(`${API}api/user/role?role=non-viewer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData = await usersResponse.json();
        setUsers(usersData);
      }
    } catch (error) {
      if (error instanceof Error) {
        addNotification(error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdf();
    fetchCategoriesAndUsers();
  }, []);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    setPdf((prevPdf) => ({
      ...prevPdf,
      thumbnail: file,
    }));
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB > 5) {
        addNotification("Thumbnail size exceeds 5MB limit", "error");
        return;
      }
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", pdf.title);
    formData.append("description", pdf.description);
    formData.append("user_id", pdf.user_id);
    formData.append("category_id", pdf.category_id);
    formData.append("content_type", pdf.content_type);

    if (pdf.thumbnail && typeof pdf.thumbnail !== 'string') {
      formData.append("thumbnail", pdf.thumbnail);
    }

    try {
      const response = await fetch(`${API}api/content/edit/pdf/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }

      addNotification(data.msg, "success");
      router.push(`/${user.role}/content`);
    } catch (error) {
      if (error instanceof Error) {
        addNotification(error.message, "error");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Edit PDF</h1>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-y-6 gap-x-10">
        <div className="flex flex-col w-full md:w-1/2 space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Title:</label>
            <input
              type="text"
              className="w-full h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pdf.title}
              onChange={(e) => setPdf({ ...pdf, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Description:</label>
            <textarea
              className="w-full h-20 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pdf.description}
              onChange={(e) => setPdf({ ...pdf, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">PDF:</label>
            {pdfPreview && (
              <iframe src={`${API}${pdfPreview}`} className="mt-4 w-full max-h-72" />
            )}
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-6">
          {
            user.role === "admin" || user.role === "editor" ?
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-1">Author:</label>
              <select
                value={pdf.user_id}
                onChange={(e) => setPdf({ ...pdf, user_id: e.target.value })}
                className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Author</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div> : ""
          }

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Category:</label>
            <select
              value={pdf.category_id}
              onChange={(e) => setPdf({ ...pdf, category_id: e.target.value })}
              className="w-full h-10 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <div>
            <label className="block text-lg font-medium text-gray-800 mb-1">Thumbnail:</label>
            <div
              className="w-full h-36 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-200"
              onClick={() => fileInputRef.current?.click()}
            >
              {thumbnailPreview ? (
                <img
                  src={typeof thumbnailPreview === 'string' && !thumbnailPreview.startsWith('blob:') ? `${API}${thumbnailPreview}` : thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-gray-500">Upload Thumbnail</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white rounded-lg h-10 w-full md:w-1/4 hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPdf;