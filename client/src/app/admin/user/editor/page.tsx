import EditorTable from "@/components/admin-component/EditorTable"
import React from 'react'

function Page({params} : {params : {id : string}}) {
  return (
  <>
  <EditorTable />
  </>
  )
}

export default Page