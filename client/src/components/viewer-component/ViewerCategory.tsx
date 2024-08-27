"use client";
import React, { useEffect, useState } from 'react';

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

function ViewerCategory() {
  const [category, setCategory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const res = await fetch(`${API}api/category/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.msg);
        }
        setCategory(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    getAllCategory();
  }, []);

  return (
    <div className='bg-white flex flex-col justify-center md:items-start items-center py-12 px-5 md:px-20 gap-8 dark:bg-[#121212] dark:text-white'>
      <p className='text-2xl font-semibold '>Category</p>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='flex flex-col md:flex-row gap-5 items-center'>
        {category.length === 0 ? (
          <p>No category created till now</p>
        ) : (
          category.map((item, index) => (
            <button key={index} className='flex text-white justify-center items-center bg-[#1E58C8] rounded-full hover:bg-[#2B2E4A] hover:opacity-70 w-40 h-10'>
              {item}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewerCategory;