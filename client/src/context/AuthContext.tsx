'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

// Define the types for the context
interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => void;
}

// Call the backend API
const API = process.env.NEXT_PUBLIC_BACKEND_API;

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide the context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);  // New loading state

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));

        // Optional: Fetch updated user data from the server
        const userData = JSON.parse(storedUser);
        try {
          const response = await fetch(`${API}api/user/${userData._id}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          } else {
            logout();
            router.push('/login');
            return;
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          logout();
          router.push('/login');
          return; 
        }
      } else {
        setLoading(false);  // Set loading to false if no token or user is found
      }

      setLoading(false);  // Set loading to false after initialization
    };

    initializeAuth();
  }, []);

  const login = async (newToken: string, userId: string) => {
    setToken(newToken);
    // Fetch user details based on userId and update user state
    const response = await fetch(`${API}api/user/${userId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${newToken}`,
      },
    });
    const userData = await response.json();
    console.log(userData, "hello");
    if (userData.role === 'admin') {
      router.push('/admin/dashboard');
    } else if (userData.role === 'editor') {
      router.push('/editor/dashboard');
    } else if (userData.role === 'author') {
      router.push('/author/dashboard');
    } else {
      router.push('/');
    }
    setUser(userData);
    // Store in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return <Loading />;  // Render a loading state while initializing
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};