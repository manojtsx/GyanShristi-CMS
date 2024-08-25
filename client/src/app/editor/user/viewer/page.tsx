import ViewerTable from '@/components/admin-component/ViewerTable'
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <ViewerTable />
  </>
  )
}

export default Page