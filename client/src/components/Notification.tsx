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
        // For each notification, set a timeout to remove the notification after 3 seconds
        notifications.forEach((notification) => {
            setTimeout(() => removeNotification(notification.id), 3000);
        })
    }, [notifications, removeNotification]) // Dependencies array to re-run the effect when notifications or removeNotification changes

    // Render the notification container and its notifications
    return (
        // Style the container with Tailwind CSS for fixed positioning, spacing, and z-index
        <div className="fixed top-5 right-5 z-50 flex flex-col space-y-4">
            {notifications.map((notification) => (
                // Render each notification with a dynamic style based on its type
                <div key={notification.id} className={`notification bg-white shadow-lg rounded-lg p-4 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                    {notification.message} // Display the notification message
                </div>
            ))}
        </div>
    );
}

export default NotificationContainer;