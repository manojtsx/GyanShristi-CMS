import ViewerTable from "@/components/admin-component/ViewerTable";
import React from "react";
import TopMenuViewer from "@/components/topmenu-component/TopMenuViewer";

function page() {
  return (
    <div className="flex flex-col h-full">
      <TopMenuViewer />
      <div className=" ml-14 mt-10">
        <ViewerTable />
      </div>
    </div>
  );
}

export default page;
