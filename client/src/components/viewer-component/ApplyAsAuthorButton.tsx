'use client'
import React from 'react';
import { useAuth}  from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';

const API = process.env.NEXT_PUBLIC_BACKEND_API;

function ApplyAsAuthorButton() {
  const { user, token } = useAuth;
  const { addNotification } = useNotifications;

  const handleApplyAsAuthor = async () => {
    try {
      if (!user) {
        throw Error('You are not logged in');
      }
      const res = await fetch(`${API}api/content/apply-as-author`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.msg);
      }
      addNotification(data.msg, 'success');
    } catch (err: any) {
      addNotification(err.message, 'error');
    }
  };

  return (
    <div>
      <button
        className='w-[160px] h-[40px] bg-[#3742FA] rounded-md text-white font-medium flex justify-center items-center hover:-translate-y-1 transition-transform duration-1000'
        onClick={handleApplyAsAuthor}
      >
        Apply as Author
      </button>
    </div>
  );
}

export default ApplyAsAuthorButton;