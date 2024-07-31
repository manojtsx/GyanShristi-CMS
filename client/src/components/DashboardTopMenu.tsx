import Image from 'next/image'
import React from 'react'

function DashboardTopMenu() {
  return (
    <div className="flex justify-between items-center px-5 py-2 shadow-md w-screen">
        <p>Dashboard</p>
        <div className="w-10 h-10">
          <Image
            src="/GirlProfile.jpg"
            alt="Girl Profile Picture"
            height={500}
            width={500}
            className="h-10 w-10 rounded-full"
          />
        </div>
      </div>
  )
}

export default DashboardTopMenu