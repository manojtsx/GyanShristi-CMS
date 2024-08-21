import CategoryTable from '@/components/admin-component/CategoryTable'
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <CategoryTable />
  </>
  )
}

export default Page