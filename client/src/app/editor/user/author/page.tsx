import AuthorTable from "@/components/admin-component/AuthorTable"
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <AuthorTable />
  </>
  )
}

export default Page