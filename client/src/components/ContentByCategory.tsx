"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useNotifications } from "@/context/NotificationContext";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface Content {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
}

const ContentByCategory = () => {
  const { id } = useParams<{ id: string | string[] }>();
  const router = useRouter();
  const { addNotification } = useNotifications();
  const [content, setContent] = useState<Content[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const getCategoryContent = async () => {
      try {
        const res = await fetch(
          `${API}api/content/category/${id}?page=${currentPage}&limit=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.msg);
        }
        setContent(data.content);
        setTotalItems(data.totalItems); // Assuming the API returns totalItems
      } catch (err: any) {
        addNotification(err.message, "error");
      }
    };

    const getCategoryById = async () => {
      try {
        const res = await fetch(`${API}api/category/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.msg);
        }
        setCategory(data.title);
      } catch (err: any) {
        addNotification(err.message, "error");
      }
    };
    getCategoryById();
    getCategoryContent();
  }, [id, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="w-3/4 mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
        {category}
      </h1>
      {content.length > 0 ? (
        content.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:-translate-y-1 hover:shadow-xl flex flex-col lg:flex-row cursor-pointer"
            onClick={() => router.push(`/post/${item._id}`)}
          >
            <div className="lg:w-1/3 mb-4 lg:mb-0 w-48 h-48 flex-shrink-0 overflow-hidden">
              <Image
                src={`${API}${item.thumbnail}`}
                alt={item.title}
                width={192} // Ensures a fixed width (e.g., matching w-48 which is 192px)
                height={128} // Ensures a fixed height (e.g., matching h-32 which is 128px)
                className="rounded-md object-cover w-full h-full"
              />
            </div>

            <div className="lg:w-2/3 lg:pl-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-gray-500 text-sm mb-2">
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(item.created_at).toLocaleString()}
              </div>
              <div className="text-gray-500 text-sm">
                <span className="font-semibold">Updated At:</span>{" "}
                {new Date(item.updated_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-2xl font-semibold text-gray-800">
          No content found
        </div>
      )}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContentByCategory;
