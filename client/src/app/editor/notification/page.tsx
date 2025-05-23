import Notifications from "@/components/Notifications";
import TopMenuNotification from "@/components/topmenu-component/TopMenuNotification";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full">
      <TopMenuNotification />
      <div className="ml-16 mt-6">
        <Notifications />
      </div>
    </div>
  );
}

export default Page;
