import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiAlertCircle } from "react-icons/fi"; // Import a different icon for the 500 error

function Page500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 p-4">
      <Image
        src="/500page (1).png" // Path to your image in the public directory
        alt="500 Error"
        width={400}
        height={300}
        className="mb-6"
      />

      <div className=" gap-x-2 flex">
        <FiAlertCircle className="text-3xl" />
        <p className="text-2xl font-semibold mb-2">Internal Server Error</p>
      </div>
      <p className="text-lg text-gray-600 mb-6">
        Something went wrong on our end. Please try again later.
      </p>
      <Link href="/">
        <div className="mt-3 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer">
          Go back to Home
        </div>
      </Link>
    </div>
  );
}

export default Page500;
