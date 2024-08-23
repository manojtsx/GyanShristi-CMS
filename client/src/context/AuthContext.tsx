'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the types for the context
interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (token: string, userId: string) => Promise<void>;
  logout: () => void;
}

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide the context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>({
    _id : ""
  });

  // Load token and user from localStorage when the app initializes
  useEffect(() => {
    const fetchUser = async() =>{
      console.log(user._id)
      const storedUser =  localStorage.getItem('user');
      if(storedUser){
        const userData = JSON.parse(storedUser)
        setUser(userData)
        const response = await fetch(`${API}api/user/${userData._id}`, {
          method : "GET",
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        const newUserData = await response.json();
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      }
    fetchUser();

    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (newToken: string, userId: string) => {
    setToken(newToken);
    // Fetch user details based on userId and update user state
    const response = await fetch(`${API}api/user/${userId}`, {
    method : "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    });
    const userData = await response.json();
    console.log(userData, "hello")
    if(userData.role === 'admin'){
        router.push('/admin/dashboard')
    }else if(userData.role === 'editor'){
        router.push('/editor/dashboard');
    }else if(userData.role === 'author'){
        router.push('/author/dashboard')
    }else{
        router.push('/login');
    }
    setUser(userData);
    // Store in localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log(user)
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

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
