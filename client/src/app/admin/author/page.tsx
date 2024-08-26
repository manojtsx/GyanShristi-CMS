import AuthorTable from "@/components/admin-component/AuthorTable";
import React from "react";
import TopMenuAuthor from "@/components/topmenu-component/TopMenuAuthor";

function Page() {
  return (
    <div className="flex flex-col h-full">
      <TopMenuAuthor />
      <div className=" ml-14 mt-10">
        Author
        <AuthorTable />
      </div>
    </div>
  );
}

export default Page;
