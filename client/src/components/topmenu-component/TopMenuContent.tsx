"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImSearch } from "react-icons/im";
import ContentTable from "../common-component/ContentTable";
import PostTable from "../common-component/PostTable";
import VideoTable from "../common-component/VideoTable";
import PdfTable from "../common-component/PdfTable";
import { useAuth } from "@/context/AuthContext";

function TopMenuContent() {
  const [activeLink, setActiveLink] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  const contentItems = [
    { id: "all", name: "All" },
    { id: "post", name: "Posts" },
    { id: "video", name: "Videos" },
    { id: "pdf", name: "PDFs" },
  ];

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      try {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Simulate a successful fetch
        setLoading(false);
      } catch (err) {
        setError("Failed to load content data");
        setLoading(false);
      }
    };

    fetchData();
  }, [activeLink]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    switch (activeLink) {
      case "post":
        return <PostTable />;
      case "video":
        return <VideoTable />;
      case "pdf":
        return <PdfTable />;
      default:
        return <ContentTable />;
    }
  };

  const handleButtonClick = () => {
    switch (activeLink) {
      case "post":
        router.push(`/${user.role}/content/add-post`);
        break;
      case "video":
        router.push(`/${user.role}/content/add-video`);
        break;
      case "pdf":
        router.push(`/${user.role}/content/add-pdf`);
        break;
      default:
        break;
    }
  };

  const getButtonText = () => {
    switch (activeLink) {
      case "post":
        return "Add Post";
      case "video":
        return "Add Video";
      case "pdf":
        return "Add PDF";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-5 py-2 shadow-md">
        <ul className="hidden sm:flex justify-between gap-x-8 font-semibold">
          {contentItems.map((item, index) => (
            <li
              key={index}
              className={`p-2 ${
                activeLink === item.id
                  ? "bg-slate-300 border-b-2 border-[#1E58C8]"
                  : "hover:bg-slate-300"
              }`}
              onClick={() => {
                setActiveLink(item.id);
                setLoading(true);
                setError(null);
              }}
            >
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-7 pr-8">
          
          {activeLink !== "all" && (
            <button
              className="w-[150px] h-9 bg-[#3570E2] rounded-md text-white"
              onClick={handleButtonClick}
            >
              {getButtonText()}
            </button>
          )}
        </div>
      </div>

      {/* Render content below the TopMenuContent */}
      <div className="p-3 ml-12 mt-5">{renderContent()}</div>
    </div>
  );
}

export default TopMenuContent;