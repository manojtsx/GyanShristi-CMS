import EditorTable from "@/components/admin-component/EditorTable";
import TopMenuEditor from "@/components/topmenu-component/TopMenuEditor";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full">
      <TopMenuEditor />
      <div className=" ml-14 mt-10">
        <EditorTable />
      </div>
    </div>
  );
}

export default Page;
