"use client"
import React, { useEffect, useState } from 'react';
import ShowAdvertisement from './ShowAdvertisement';
import ShowComment from './ShowComment';
import { useAuth } from '@/context/AuthContext';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface ShowVideoProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  profilePic: string | null | undefined;
  name: string | null | undefined;
  createdAt: string;
  updatedAt: string;
  location?: string;
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

const ShowVideo: React.FC<ShowVideoProps> = ({
  id,
  title,
  description,
  thumbnail,
  profilePic,
  name,
  createdAt,
  updatedAt,
  location
}) => {
  const { token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  }

  return (
    <div className="container mx-auto p-4 lg:py-8 lg:px-12 flex gap-8 lg:flex-row">
      <div className="flex-1 bg-white shadow-lg rounded-lg my-4">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src={`${API}${thumbnail}`}
            alt="Video Thumbnail"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={`${API}${profilePic}` || "/user.png"}
              alt="User Profile"
            />
            <div>
              <p className="text-gray-900 font-bold">{name || "Unknown"}</p>
              <p className="text-gray-600 text-sm">
                Created at: {new Date(createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm">
                Updated at: {new Date(updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <iframe
            src={`${API}${location}`}
            className="w-full h-96 border-2 border-gray-300 rounded-lg"
            title="Video Viewer"
            allowFullScreen
          ></iframe>
          <div className="mt-4 flex justify-end">
            <a
              href={`${API}${location}`}
              download
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Download Video
            </a>
          </div>
        </div>
        <div className="p-6">
          <ShowComment comments={comments} onAddComment={handleAddComment} />
        </div>
      </div>
      <ShowAdvertisement />
    </div>
  );
};

export default ShowVideo;