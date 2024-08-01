import NoOfUsers from "@/components/common-component/NoOfUsers";
import SideMenuBarAdmin from "@/components/SideMenuBarAdmin";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <SideMenuBarAdmin />
    </div>
  );
}

export default Page;
