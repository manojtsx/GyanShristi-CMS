import NoOfUsers from '@/components/common-component/NoOfUsers'
import DashboardTopMenu from '@/components/DashboardTopMenu'
import LatestContent from '@/components/LatestContent'
import LineChart from '@/components/LineChart'
import SideMenuBarAuthor from '@/components/SideMenuBarAuthor'
import React from 'react'

function page() {
  return (
    <div className='' >
      <DashboardTopMenu/>
    <div className="flex p-5">
      <div className='flex flex-col w-4/6 pr-5 gap-5'>
      <div>
        <NoOfUsers />
        </div>
        <div>
        <LineChart />
        </div>
      </div>
        <div className=''>
          <LatestContent />
        </div>
    </div>
    </div>
  );
}

export default page;
