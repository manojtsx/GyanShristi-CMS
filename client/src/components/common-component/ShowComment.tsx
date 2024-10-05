"use client"
import { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BACKEND_API;

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
    parent_comment_id: string | null;
}
interface ShowCommentProps {
    comments: Comment[],
    onAddComment: (newComment: any) => void;
}
const ShowComment: React.FC<ShowCommentProps> = ({ comments, onAddComment }) => {
    const { addNotification } = useNotifications();
    const { token, user } = useAuth();
    const { id } = useParams<{ id: string | string[] }>();
    const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
    const [showReplies, setShowReplies] = useState<string | null>(null);
    const [comment, setComment] = useState<string>("");
    const [parentCommentId, setParentCommentId] = useState<string>("");

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            alert("Comment cannot be empty");
            return;
        }

        try {
            if (!user) {
                addNotification("You are not logged in", "success");
            }
            const res = await fetch(`${API}api/comment/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    description: comment,
                    content_id: id,
                    parentCommentId: parentCommentId
                }),
            });
            const newComment = await res.json();

            if (!res.ok) {
                throw new Error(newComment.msg);
            }

            onAddComment(newComment);
            setComment("");
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const renderReplies = (parentId: string) => {
        return comments
            .filter((reply) => 
             reply.parent_comment_id?.toString() === parentId)
            .map((reply) => (
                <div key={reply._id} className="reply bg-gray-100 shadow-md rounded-lg p-4 mt-4">
                    <div className="reply-header flex items-center mb-2">
                        <div className="reply-author text-sm font-semibold text-gray-900 mr-2">
                            {reply.user_id?.name || "Unknown"}
                        </div>
                        <div className="reply-date text-xs text-gray-500">
                            {new Date(reply.created_at).toLocaleDateString()}
                        </div>
                    </div>
                    <p className="reply-body text-gray-700">
                        {reply.description}
                    </p>
                </div>
            ));
    };

    return (
        <div className="comment-section mx-auto mt-6 lg:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Comments
            </h2>
            <div className="comment-form bg-white shadow-lg rounded-lg p-4 lg:p-6 mb-6 lg:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                    Leave a Comment
                </h3>
                <form onSubmit={submitComment}>
                    <textarea
                        className="w-full h-24 sm:h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3742FA] resize-none"
                        placeholder="Write your comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-4 bg-[#3742FA] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-[#5A67D8] transition duration-300"
                    >
                        Post Comment
                    </button>
                </form>
            </div>
            <div className="existing-comments space-y-6 lg:space-y-8">
                {comments.filter(comment => !comment.parent_comment_id).map((comment) => (
                    <div
                        key={comment._id}
                        className="comment bg-gray-50 shadow-md rounded-lg p-4 lg:p-6"
                    >
                        <div className="comment-header flex flex-col sm:flex-row items-start sm:items-center mb-4">
                            <div className="comment-author text-lg sm:text-xl font-bold text-gray-900 mr-2">
                                {comment.user_id?.name || "Unknown"}
                            </div>
                            <div className="comment-date text-sm text-gray-500">
                                {new Date(comment.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <p className="comment-body text-gray-700">
                            {comment.description}
                        </p>
                        <div className="flex gap-4 sm:gap-5 p-1 mt-2">
                            <p
                                className="text-[#1E58C8] underline cursor-pointer hover:no-underline"
                                onClick={() => {
                                    setShowReplyForm(showReplyForm === comment._id ? null : comment._id);
                                    setParentCommentId(comment._id);
                                }}
                            >
                                {showReplyForm === comment._id ? "Cancel Reply" : "Reply"}
                            </p>
                            <p
                                className="text-[#1E58C8] underline cursor-pointer hover:no-underline"
                                onClick={() => setShowReplies(showReplies === comment._id ? null : comment._id)}
                            >
                                {showReplies === comment._id ? "View Less Replies" : "View All Replies"}
                            </p>
                        </div>
                        {showReplyForm === comment._id && (
                            <div className="reply-form bg-gray-50 shadow-md rounded-lg p-4 lg:p-6 mt-4">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                    Your Reply
                                </h4>
                                <form onSubmit={submitComment}>
                                    <textarea
                                        className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3742FA] resize-none"
                                        placeholder="Write your reply here..."
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="mt-4 bg-[#3742FA] text-white font-semibold py-2 px-4 sm:px-6 rounded-lg hover:bg-[#5A67D8] transition duration-300"
                                    >
                                        Post Reply
                                    </button>
                                </form>
                            </div>
                        )}
                        {showReplies === comment._id && (
                            <div className="replies mt-4 space-y-4">
                                {renderReplies(comment._id)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowComment;