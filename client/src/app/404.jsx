"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-white animate-pulse">404</h1>
        <p className="text-2xl text-white mt-4 animate-bounce">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg text-gray-200 mt-2">
          It looks like you've lost your way.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 px-6 py-3 bg-white text-purple-700 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
