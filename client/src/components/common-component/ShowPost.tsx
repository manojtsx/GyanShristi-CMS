"use client";
import React, { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Loading from "../Loading";
import "./ShowPost.css";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from 'jspdf';
import ShowComment from "./ShowComment";
import ShowAdvertisement from "./ShowAdvertisement";

interface ContentData {
  title: string;
  description: string;
  blog: string;
  location: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  userOwner: User;
  category_id: string[];
  content_type: string;
  status: string;
  _id: string;
  fileContent: string; // Added this field to handle HTML content directly
}
interface User {
  name: string;
  profile_pic: string;
}
interface Comment {
  _id: string;
  description: string;
  user_id: User;
  content_id: string;
  created_at: string;
}

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const ShowPost: React.FC = () => {
  const { token } = useAuth();
  const pathname = usePathname();
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams<{ id: string | string[] }>(); // Extracting the content ID from the URL params
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isReset, setIsReset] = useState(true);

  const fetchContentById = async (contentId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API}api/content/post/${contentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg);
      }
      setContentData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      const contentId = Array.isArray(id) ? id[0] : id; // Ensure id is a string
      fetchContentById(contentId);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    return () => {
      //directly calling this reduces time to stop speech
      speechSynthesis.cancel();
    };
  }, [pathname])

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${API}api/comment/comments?contentId=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg);
      }
      setComments(result.comments);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  }


  function calculateDaysAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const difference = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return difference > 0 ? difference.toString() : "Today";
  }
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!contentData) {
    return <div>{error}</div>;
  }

  const { title, description, thumbnail, created_at, updated_at, blog } =
    contentData;

  let utterance: SpeechSynthesisUtterance | null = null; // Stores the speech utterance instance

  // Function to initialize the speech
  const startSpeech = () => {
    // Create a new SpeechSynthesisUtterance instance
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blog;
    const blogText = tempDiv.textContent || "";
    const newUtterance = new SpeechSynthesisUtterance(blogText);

    newUtterance.onend = () => {
      setIsSpeaking(false); // Speech has ended
      setIsReset(true); // Reset the state after speaking
    };

    // Cancel any ongoing speech synthesis
    speechSynthesis.cancel();

    // Speak the new utterance
    speechSynthesis.speak(newUtterance);

    // Update the state
    setIsSpeaking(true);
    setIsReset(false);
  };

  // Function to handle the Speak button
  const handleSpeak = () => {
    if (isSpeaking && !isReset) {
      // If currently speaking and not reset, handle reset
      handleReset();
    } else {
      startSpeech(); // Start a new speech
    }
  };

  // Function to pause the speech
  const handlePause = () => {
    if (speechSynthesis.speaking) {
      setIsSpeaking(false);
      speechSynthesis.pause(); // Pause the speech
    }
  };

  // Function to resume the speech
  const handleResume = () => {
    if (speechSynthesis.paused || !isSpeaking) {
      speechSynthesis.resume(); // Resume the paused speech
      setIsSpeaking(true);
    }
    if (isReset) {
      startSpeech(); // Start a new speech if reset
    }
  };

  // Function to reset the speech
  const handleReset = () => {
    setIsSpeaking(false);
    setIsReset(true);
    speechSynthesis.cancel(); // Cancel and reset the speech
  };


  const handleDownload = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 10;
    let cursorY = 20;

    // Create a temporary DOM element to strip HTML tags
    const tempElement = document.createElement('div');
    tempElement.innerHTML = blog;
    const plainText = tempElement.textContent || tempElement.innerText || '';

    // Split the plain text into lines that fit within the specified width
    const lines = doc.splitTextToSize(plainText, maxLineWidth);

    // Add title
    doc.setFontSize(24);
    doc.text(title, margin, cursorY);
    cursorY += lineHeight;

    // Add description
    doc.setFontSize(12);
    const descriptionLines = doc.splitTextToSize(description, maxLineWidth);
    descriptionLines.forEach((line: string | string[]) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });
    cursorY += lineHeight; // Add extra space after the description

    // Add author name and profile picture
    if (contentData.userOwner) {
      const img = document.createElement('img');
      img.src = `${API}${contentData.userOwner.profile_pic}`;
      img.onload = () => {
        doc.addImage(img, 'JPEG', margin, cursorY, 20, 20);
        doc.text(`Author: ${contentData.userOwner.name}`, margin + 25, cursorY + 10);
        cursorY += 30;
      };
    } else {
      doc.text(`Author: Unknown`, margin, cursorY);
      cursorY += lineHeight;
    }

    // Add created at and updated at
    doc.text(`Created at: ${created_at}`, margin, cursorY);
    cursorY += lineHeight;
    doc.text(`Updated at: ${updated_at}`, margin, cursorY);
    cursorY += lineHeight * 2;

    // Add the blog content
    doc.setFontSize(12);
    lines.forEach((line: string | string[]) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage();
        cursorY = margin;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    // Save the PDF with the title as the filename
    doc.save(`${title}.pdf`);
  };

  return (
    <div className="flex flex-col lg:flex-row mx-auto p-4 lg:py-8 lg:px-12">
      <div className="flex-1 lg:mr-8 mb-8 lg:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-left text-gray-900 uppercase tracking-tight mb-6 relative">
          {title}
          <span className="block w-24 lg:w-32 h-1 bg-gradient-to-r from-[#3742FA] to-[#5A67D8] mt-4 rounded-md"></span>
        </h1>
        <img
          src={`${API}${thumbnail}`}
          alt="Thumbnail"
          className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
        />
        <p className="text-base sm:text-lg text-gray-700 mb-4">{description}</p>
        <div className="flex flex-col sm:flex-row sm: justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600 mb-6 bg-yellow-50 p-4 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <div className="w-10 h-10">
                <Image
                  src={
                    contentData.userOwner
                      ? `${API}${contentData.userOwner.profile_pic}`
                      : ""
                  }
                  alt={
                    contentData.userOwner
                      ? contentData.userOwner.name
                      : "Unknown"
                  }
                  height={500}
                  width={500}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <p className="font-semibold text-black">
                {contentData.userOwner ? contentData.userOwner.name : "Unknown"}
              </p>
            </div>
            <p className="text-xs text-gray-700 text-right">
              Information and communication technology
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <strong className="text-gray-900 text-xs mr-1">Created:</strong>
              <span className="text-xs">
                {new Date(created_at).toLocaleDateString()}
              </span>
              <span className="ml-2 text-gray-700 text-xs">
                {calculateDaysAgo(created_at)} ago
              </span>
            </div>
            <div className="flex items-center">
              <strong className="text-gray-900 mr-1 text-xs">Updated:</strong>
              <span className="text-xs">
                {new Date(updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-1 items-center justify-center">
            {/* Show either "Speak" or "Reset" based on isSpeaking and isReset states */}

            <button
              className="w-16 p-2 rounded-md bg-[#3742FA] text-white"
              onClick={isSpeaking ? handleReset : handleSpeak}
            >
              {isSpeaking ? "Reset" : "Speak"}
            </button>

            {/* Pause or Resume buttons */}
            <FontAwesomeIcon
              icon={faPause}
              onClick={handlePause}
              title="Pause"
              className={`border-2 p-2 ${isSpeaking ? "text-[#3742FA] cursor-pointer" : "text-gray-500"
                }`}
            // Show Pause when speech is playing
            />
            <FontAwesomeIcon
              icon={faPlay}
              onClick={handleResume}
              title="Resume"
              className={`border-2 p-2 ${!isSpeaking ? "text-[#3742FA] cursor-pointer" : "text-gray-500"
                }`} // Show Resume when speech is paused or reset
            />
            <FontAwesomeIcon
              icon={faDownload}
              onClick={handleDownload}
              title="Download"
              className="border-2 p-2 text-[#3742FA] cursor-pointer"
            />
          </div>
        </div>
        <div className="content-body text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: blog }}></div>
        </div>
        <ShowComment comments={comments} onAddComment={handleAddComment} />
      </div>
      <ShowAdvertisement />
    </div>
  );
};

export default ShowPost;
