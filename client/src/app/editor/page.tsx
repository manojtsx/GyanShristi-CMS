import CategoryTable from "@/components/common-component/CategoryTable";
import CommentTable from "@/components/common-component/CommentTable";
import ContentTable from "@/components/common-component/ContentTable";
import UserTable from "@/components/common-component/UserTable";
import SpeechToTextEditor from "@/components/SpeechToTextEditor";
import React from "react";

export default function Page() {
  return (
    <div>
      {/* <SpeechToTextEditor /> */}
      <ContentTable />
      <CommentTable />
      <CategoryTable />
      <UserTable />
    </div>
  );
}

