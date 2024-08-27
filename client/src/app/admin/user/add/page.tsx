import AddUser from '@/components/common-component/AddUser'
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <AddUser />
  </>
  )
}

export default Page