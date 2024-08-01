import NoOfUsers from '@/components/common-component/NoOfUsers';
import DashboardTopMenu from '@/components/DashboardTopMenu';
import LatestContent from '@/components/LatestContent';
import LineChart from '@/components/LineChart';
import React from 'react';

function Page() {
  return (
    <div className="flex flex-col h-full">
      <DashboardTopMenu />
      <div className="flex flex-1 p-5">
        <div className='flex flex-col flex-grow pr-5 gap-5'>
          <div className='flex-1'>
            <NoOfUsers />
          </div>
          <div>
            <LineChart />
          </div>
        </div>
        <div className='flex-1'>
          <LatestContent />
        </div>
      </div>
    </div>
  );
}

export default Page;
