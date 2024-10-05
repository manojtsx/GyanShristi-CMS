"use client"
import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const GoToDashboard = () => {
    const { user } = useAuth();
    
    if (!user || (user.role !== "admin" && user.role !== "editor" && user.role !== "author")) {
        return null;
    }

    return (
        <Link href={`/${user.role}/dashboard`}>
            <div className='bg-black text-white fixed top-2 right-0 px-4 py-2 rounded-l-xl'>
                Click here to go to Dashboard
            </div>
        </Link>
    );
}

export default GoToDashboard;