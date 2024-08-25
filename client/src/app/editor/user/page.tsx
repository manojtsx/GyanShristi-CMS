import UserTable from '@/components/admin-component/UserTable'
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <UserTable />
  </>
  )
}

export default Page