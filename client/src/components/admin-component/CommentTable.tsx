"use client";
import { useNotifications } from "@/context/NotificationContext";
import React, { useEffect, useState } from "react";
import { ImReply } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import Loading from "../Loading";

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

interface Comment {
  _id: string;
  user: {
    email: string;
    name: string;
    username: string;
  };
  content: {
    title: string;
    description: string;
  };
  description: string;
  created_at: string;
}

function CommentTable() {
  const { addNotification } = useNotifications();
  const { token } = useAuth();
  const [comments, setComments] = useState([
    {
      _id: "",
      description: "",
      content: {
        title: "",
      },
      user: {
        name: "",
      },
    },
  ]);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [selectedComment, setSelectedComment] = useState<{
    _id: string;
    description: string;
    content: { title: string };
    user: { name: string };
  } | null>(null);
  const [reply, setReply] = useState("");
  const [parentCommentId, setParentCommentId] = useState<string>("");

  const getCommentList = async () => {
    try {
      const res = await fetch(`${API}api/comment/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setComments(data.comments); // Assuming data.comments is the array of comments
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  const handleReplyClick = (comment: { _id: string; description: string; content: { title: string }; user: { name: string } }) => {
    setSelectedComment(comment);
    setShowReplyBox(true);
    setParentCommentId(comment._id);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reply.trim()) {
      alert("Reply cannot be empty");
      return;
    }

    try {
      if (!token) {
        addNotification("You are not logged in", "error");
        return;
      }

      const res = await fetch(`${API}api/comment/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: reply,
          content_id: selectedComment?.content.title,
          parentCommentId: parentCommentId
        }),
      });

      const newReply = await res.json();

      if (!res.ok) {
        throw new Error(newReply.msg);
      }

      addNotification("Reply added successfully", "success");
      setShowReplyBox(false);
      setReply("");
      getCommentList(); // Refresh the comment list
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 uppercase bg-[#011936]">
          <tr>
            <th scope="col" className="px-6 py-3">
              SN
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
            <th scope="col" className="px-6 py-3">
              Commentor
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((row, index) => (
            <tr
              key={row._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{row.description}</td>
              <td className="px-6 py-4">{row.user?.name || "unknown"}</td>
              <td className="px-6 py-4">{row.content?.title || "unknown"}</td>

              <td className="flex space-x-5 px-6 py-4">
                <ImReply
                  className="text-[#011936] text-xl cursor-pointer"
                  onClick={() => handleReplyClick(row)}
                />
                <RiDeleteBin6Line className="text-[#011936] text-xl cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showReplyBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Reply to Comment</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setShowReplyBox(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleReplySubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentTable;