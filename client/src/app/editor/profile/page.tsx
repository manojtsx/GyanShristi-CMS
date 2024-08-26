import Profile from "@/components/Profile";
import TopMenuProfile from "@/components/topmenu-component/TopMenuProfile";
import React from "react";

function page() {
  return (
    <div className="flex flex-col h-full">
    <TopMenuProfile />
    <div className="">
      <Profile />
    </div>
  </div>
  )
}

export default page