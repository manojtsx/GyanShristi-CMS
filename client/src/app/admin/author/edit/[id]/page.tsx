import SubmitButton from '@/components/mini-component/SubmitButton'
import Textbox from '@/components/mini-component/Textbox'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    const handleEditUserChange = (e : React.ChangeEvent<HTMLInputElement>) =>{

    }
  return (
    <form action="" className='flex flex-col h-screen justify-center items-center'>
        
    <div className='flex flex-col justify-center items-center w-96 gap-5 px-10 py-3 shadow-lg bg-[#F9F7F7]'>
    <div className="w-24 relative">
          <Image
            src="/GirlProfile.jpg"
            alt="Profile Picture"
            height={500}
            width={500}
            className="h-24 w-24 rounded-full object-cover"
          />
          <FontAwesomeIcon icon={faPenToSquare} className='w-7 h-7 absolute bottom-0 right-0 cursor-pointer'/>
        </div>
        <div className='w-full flex justify-between items-center'>
        <label htmlFor="name" className='text-left w-32'>Name: </label> 
        <Textbox name='name' value='Name' placeholder='Name' onChange={handleEditUserChange}/>
        </div>
        <div className='w-full flex justify-between items-center'>
        <label htmlFor="username" className='text-left w-32'>Username: </label>
        <Textbox name='username' value='Username' placeholder='Username' onChange={handleEditUserChange} />
        </div>
        <div className='w-full flex justify-between items-center'>
        <label htmlFor="address" className='text-left w-32'>Address: </label>
        <Textbox name='address' value='Address' placeholder='Address' onChange={handleEditUserChange}/>
        </div>
        <div className='w-full flex justify-between items-center'>
        <label htmlFor="contact" className='text-left w-32'>Contact: </label>
        <Textbox name='contact' value='Contact' placeholder='Contact' onChange={handleEditUserChange}/>
        </div>
        <SubmitButton text="Save"/>
        <Link href="/" className='text-[#1E43C8]'>Change Password</Link>
    </div>
</form>
  )
}

export default page