import UserTable from "@/components/common-component/UserTable";
import AuthorTable from "@/components/admin-component/AuthorTable";
import React from "react";

function Page() {
  return (
    <div>
      <div className=" ml-24">
        Author
        <AuthorTable />
      </div>
    </div>
  );
}

export default Page;
