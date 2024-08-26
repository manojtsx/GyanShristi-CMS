// Set the component to run only on the client side
'use client';

// Import necessary hooks and components from React and context
import React, { useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";

// Define the NotificationContainer component
const NotificationContainer = () => {
    // Destructure notifications and the removeNotification function from the notification context
    const { notifications, removeNotification } = useNotifications();

    // Use useEffect to perform side effects
    useEffect(() => {
        notifications.forEach((notification) => {
            const timerId = setTimeout(() => removeNotification(notification.id), 3000);

            // Cleanup function to clear the timeout when notification is removed
            return () => clearTimeout(timerId);
        });
    }, [notifications, removeNotification]); // Dependencies array to re-run the effect when notifications or removeNotification changes

    // Render the notification container and its notifications
    return (
        // Style the container with Tailwind CSS for fixed positioning, spacing, and z-index
        <div className="fixed top-5 right-5 z-50 flex flex-col space-y-4">
            {notifications.map((notification) => (
                <div key={notification.id} className={`notification relative bg-white shadow-lg rounded-lg p-4 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {notification.message}

                    {/* Countdown Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700" style={{ animation: 'countdown 3s linear forwards' }}></div>
                </div>
            ))}
        </div>
    );
}

export default NotificationContainer;
