import CommentTable from '@/components/admin-component/CommentTable'
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <CommentTable />
  </>
  )
}

export default Page