import UserTable from '@/components/admin-component/UserTable'
import React from 'react'
import TopMenuUser from '../../../components/topmenu-component/TopMenuUser'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <div className="flex flex-col h-full">
    <TopMenuUser/>
    <div className=" ml-14 mt-10" >
  <UserTable />
  </div>
  </div>
  </>
  )
}

export default Page