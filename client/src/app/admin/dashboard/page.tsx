import NoOfUsers from "@/components/common-component/NoOfUsers";
import DashboardTopMenu from "@/components/DashboardTopMenu";
import LatestContent from "@/components/LatestContent";
import LineChart from "@/components/LineChart";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-full">
      <DashboardTopMenu />
      <div className="flex flex-col md:flex-row p-5 gap-5 flex-grow h-full w-full">
        <div className="flex flex-col gap-2 md:w-4/6">
          <div className="flex-grow">
            <NoOfUsers />
          </div>
          <div className="flex-grow">
            <LineChart />
          </div>
        </div>
        <div className="w-2/6">
          <LatestContent />
        </div>
      </div>
    </div>
  );
}
