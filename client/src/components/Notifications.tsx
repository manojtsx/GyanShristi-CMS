"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

const Notifications: React.FC = () => {
  const { user, token } = useAuth();
  const { addNotification } = useNotifications();
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API}api/notification/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg);
      }
      setNotifications(result.notifications);
    } catch (err: any) {
      addNotification(err.message, "error");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const approveOrRejectAuthor = async (userId: any, action: boolean) => {
    try {
      const response = await fetch(`${API}api/user/approve-author/${userId}?approve=${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg);
      }
      addNotification(result.msg, 'success');
      fetchNotifications();
    } catch (err: any) {
      addNotification(err.message, 'error');
    }
  }

  const approveOrRejectContent = async (contentId: any, action: boolean) => {
    try {
      const response = await fetch(`${API}api/content/${action ? "approve" : "reject"}/${contentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg);
      }
      addNotification(result.msg, 'success');
      fetchNotifications();
    } catch (err: any) {
      addNotification(err.message, 'error');
    }
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const currentNotifications = notifications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="notifications-container mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
      <div className="notifications-list space-y-4">
        {currentNotifications.map((notification: any) => (
          notification.type === "user" ? (
            <div key={notification._id} className="notification-item bg-white shadow-lg rounded-lg p-4 lg:p-6 flex justify-between items-center hover:bg-gray-100 transition duration-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{notification.title} <span className='font-bold'>requested to be an author.</span></h3>
                <p className="text-sm text-gray-600">Type: {notification.type}</p>
              </div>
              <div className="flex space-x-4">
                <FontAwesomeIcon icon={faCheck} onClick={() => approveOrRejectAuthor(notification._id, true)} className="text-green-500 text-2xl cursor-pointer hover:text-green-700 transition duration-300" />
                <FontAwesomeIcon icon={faXmark} onClick={() => approveOrRejectAuthor(notification._id, false)} className="text-red-500 text-2xl cursor-pointer hover:text-red-700 transition duration-300" />
              </div>
            </div>
          ) : (
            <div key={notification._id} className="notification-item bg-white shadow-lg rounded-lg p-4 lg:p-6 flex justify-between items-center hover:bg-gray-100 transition duration-300">
              <Link href={`/post/${notification._id}`}>
                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600">Type: {notification.type}</p>
              </Link>
              <div className="flex space-x-4">
                <FontAwesomeIcon icon={faCheck} onClick={() => approveOrRejectContent(notification._id, true)} className="text-green-500 text-2xl cursor-pointer hover:text-green-700 transition duration-300" />
                <FontAwesomeIcon icon={faXmark} onClick={() => approveOrRejectContent(notification._id, false)} className="text-red-500 text-2xl cursor-pointer hover:text-red-700 transition duration-300" />
              </div>
            </div>
          )
        ))}
      </div>
      <div className="pagination mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Notifications;