"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // For navigating
import { useAuth } from "@/context/AuthContext"; // Custom AuthContext hook
import SideMenuBarEditor from "@/components/editor-component/SideMenuBarEditor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token } = useAuth(); // Assume token and isAuthenticated are available from context
  const router = useRouter();

  useEffect(() => {
    // Check if the user is not authenticated or token is missing
    if (!user || !token) {
      // Redirect to login page
      router.push("/login");
    }
  }, [user, token, router]);

  // Conditionally render only when the user is authenticated
  if (!user || !token) {
    return null; // Render nothing (or a loader if you prefer) while redirecting
  }

  return (
    <div className="flex relative">
      <div className="relative">
        <SideMenuBarEditor />
      </div>
      <div className="flex-1 overflow-y-auto ml-[14rem]">{children}</div>
    </div>
  );
}
