// Enforce this module to run only in the client-side environment
"use client"

// Import necessary React hooks and types
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a notification object
interface Notification {
    id: number; // Unique identifier for each notification
    message: string; // Text content of the notification
    type: 'error' | 'success'; // Type of notification, used for styling and semantics
}

// Define the shape of the context for managing notifications
interface NotificationContextType {
    notifications: Notification[]; // Array of current notifications
    addNotification: (message: string, type: 'error' | 'success') => void; // Function to add a new notification
    removeNotification: (id: number) => void; // Function to remove an existing notification by its id
}

// Create a React context for notifications with an undefined initial value
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Custom hook to use the notification context
export const useNotifications = () => {
    const context = useContext(NotificationContext); // Consume the notification context

    // Throw an error if the hook is used outside of a NotificationProvider
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider')
    }
    return context; // Return the context value
}

// Component to provide the notification context to its children
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]); // State to hold the list of notifications

    // Function to add a new notification
    const addNotification = (message: string, type: 'error' | 'success') => {
        const id = new Date().getTime(); // Use the current timestamp as a unique id
        setNotifications((prev) => [...prev, { id, message, type }]); // Add the new notification to the state
    }

    // Function to remove a notification by its id
    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id)); // Filter out the notification to be removed
    }

    // Provide the notification context to child components
    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}