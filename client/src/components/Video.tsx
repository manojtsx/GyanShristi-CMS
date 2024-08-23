"use client";
import React, { useState, useRef } from "react";

function Video() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
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
      console.log("File selected:", file.name);
      // Handle file upload logic here if necessary
    }
  };
  return (
    <div className=" flex gap-x-28">
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="text-center">
          <label>Title :</label>
          <div>
            <input
              type="text"
              name="title"
              className=" h-9 rounded-lg border-gray-300 bg-gray-200"
            />
          </div>
        </div>
        <div className=" mt-5 w-[550px] h-80 border border-gray-300 rounded-lg">
          <input type="file" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-7 mt-20">
        <div className="text-center">
          <label htmlFor="categories">Categories:</label>
          <div className={`${isCategoryOpen ? "mb-10" : "mb-0"}`}>
            <select
              id="categories"
              name="categories"
              className="rounded-lg h-10 w-[200px] text-center"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <option value="option1">Math</option>
              <option value="option2">Science</option>
              <option value="option3">Computer</option>
            </select>
          </div>
        </div>
        <div className="text-center">
          <label htmlFor="author">Author:</label>
          <div className={`${isAuthorOpen ? "mb-10" : "mb-0"}`}>
            <select
              id="author"
              name="author"
              className="rounded-lg h-10 w-[200px] text-center"
              onClick={() => setIsAuthorOpen(!isAuthorOpen)}
            >
              <option value="option1">usha gurung</option>
              <option value="option2">seezan shrestha</option>
              <option value="option3">Manoj shrestha</option>
            </select>
          </div>
        </div>
        <div className=" text-center">
          <label>Feature Photo :</label>
          <div
            className="w-40 h-36 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-center"
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
            onChange={handleFileChange}
          />
        </div>
        <button
          className="w-[100px] h-9 bg-[#3570E2] rounded-md text-white"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Video;
