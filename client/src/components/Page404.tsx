import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component from Next.js
import { FiAlertTriangle } from "react-icons/fi";

function Page404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 p-4">
      <Image
        src="/404page.png" // Path to your image in the public directory
        alt="404 Error"
        width={400} // Adjust the width to fit your design
        height={300} // Adjust the height to fit your design
        className="mb-6"
      />

      <p className="text-2xl font-semibold mb-2 font-sans">Page Not Found</p>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <div className="mt-6 px-6 py-3 bg-red-700 text-white text-lg font-medium rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
          Go back to Home
        </div>
      </Link>
    </div>
  );
}

export default Page404;
