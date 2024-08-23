import CategoryTable from "@/components/admin-component/CategoryTable";
import CommentTable from "@/components/admin-component/CommentTable";
import ContentTable from "@/components/common-component/ContentTable";
import UserTable from "@/components/common-component/UserTable";
import SideMenuBarAdmin from "@/components/SideMenuBarAdmin";
import SideMenuBarAuthor from "@/components/SideMenuBarAuthor";
import SideMenuBarEditor from "@/components/SideMenuBarEditor";
import SpeechToTextEditor from "@/components/SpeechToTextEditor";
import React from "react";

export default function Page() {
  return (
    <div>
      {/* <SpeechToTextEditor /> */}
      {/* <ContentTable /> */}
      {/* <CommentTable /> */}
      {/* <CategoryTable /> */}
      {/* <UserTable /> */}
      <SideMenuBarAdmin />
    </div>
  );
}

