import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div className='h-200 w-200'>
        <Image src="/logo.png" alt="CMS Logo" height={200} width={200} className='object-cover'/>
    </div>
  )
}

export default Logo