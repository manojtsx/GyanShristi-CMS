import React from 'react';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface ShowPdfProps {
  title: string;
  description: string;
  thumbnail: string;
  profilePic: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  location?: string;
}

const ShowPdf: React.FC<ShowPdfProps> = ({
  title,
  description,
  thumbnail,
  profilePic,
  name,
  createdAt,
  updatedAt,
    location
}) => {
    console.log("ShowPdfProps", title, description, thumbnail, profilePic, name, createdAt, updatedAt);
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="relative">
        <img className="w-full h-64 object-cover" src={`${API}${thumbnail}`} alt="PDF Thumbnail" />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full mr-4" src={`${API}${profilePic}`} alt="User Profile" />
          <div>
            <p className="text-gray-900 font-bold">{name}</p>
            <p className="text-gray-600 text-sm">Created at: {new Date(createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 text-sm">Updated at: {new Date(updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <iframe
          src={`${API}${location}`}
          className="w-full h-screen border-2 border-gray-300 rounded-lg"
          title="PDF Viewer"
        ></iframe>
        <div className="mt-4 flex justify-end">
          <a
            href={`${API}${location}`}
            download
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowPdf;