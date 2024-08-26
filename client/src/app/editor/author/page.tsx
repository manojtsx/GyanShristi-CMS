import AuthorTable from "@/components/admin-component/AuthorTable";
import TopMenuAuthor from "@/components/topmenu-component/TopMenuAuthor";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col h-full">
      <TopMenuAuthor />
      <div className=" ml-14 mt-10">
        <AuthorTable />
      </div>
    </div>
  );
}

export default Page;
