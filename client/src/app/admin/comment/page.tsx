import CommentTable from "@/components/common-component/CommentTable";
import TopMenuComment from "@/components/topmenu-component/TopMenuComment";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full">
      <TopMenuComment />
      <div className=" ml-14 mt-10">
        <CommentTable />
      </div>
    </div>
  );
}

export default Page;
