import CategoryTable from "@/components/common-component/CategoryTable";
import TopMenuCategory from "@/components/topmenu-component/TopMenuCategory";
import React from "react";

function Page() {
  return (
    <div>
      <div className="flex flex-col h-full">
        <TopMenuCategory />
        <div className=" ml-14 mt-10">
          <CategoryTable />
        </div>
      </div>
    </div>
  );
}

export default Page;
