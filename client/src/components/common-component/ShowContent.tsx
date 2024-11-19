"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useNotifications } from '@/context/NotificationContext';
import Loading from '../Loading';
import ShowVideo from './ShowVideo';
import ShowPdf from './ShowPdf';
import ShowPost from './ShowPost';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface User {
  name: string;
  profile_pic: string;
}

interface Content {
  _id: string;
  title: string;
  description: string;
  content_type: 'pdf' | 'video' | 'post';
  location?: string;
  blog?: string;
  thumbnail: string;
  status: 'Pending' | 'Uploaded' | 'Rejected';
  user_id: string;
  userOwner: User;
  category_id?: string;
  created_at: string;
  updated_at: string;
  downloadUrl: string;
}

const ShowContent: React.FC = () => {
  const { id } = useParams<{ id: string | string[] }>(); 
  const { addNotification } = useNotifications();
  const [content, setContent] = useState<Content | null>(null);
  const [userOwner, setUserOwner] = useState<User | null>(null);

  const getContent = async () => {
    try {
      const response = await fetch(`${API}api/content/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw Error(result.msg);
      }
      setContent(result.content);
      setUserOwner(result.userOwner);
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  }

  useEffect(() => {
    getContent();
  }, []);

  if (!content) {
    return <Loading />;
  }

  if (content.content_type === "video") {
    return <ShowVideo 
      id ={content._id}
      title={content.title} 
      description={content.description} 
      thumbnail={content.thumbnail} 
      profilePic={userOwner?.profile_pic} 
      name={userOwner?.name} 
      createdAt={content.created_at} 
      updatedAt={content.updated_at} 
      location={content.location} 
    />;
  }

  if (content.content_type === "pdf") {
    return <ShowPdf 
      id ={content._id}
      title={content.title} 
      description={content.description} 
      thumbnail={content.thumbnail} 
      profilePic={userOwner?.profile_pic} 
      name={userOwner?.name} 
      createdAt={content.created_at} 
      updatedAt={content.updated_at} 
      location={content.location}
    />;
  }

  if (content.content_type === "post") {
    return <ShowPost />;
  }

  return null;
};

export default ShowContent;