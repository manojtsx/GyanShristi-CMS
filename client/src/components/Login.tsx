import Link from 'next/link'
import React from 'react'
import Textbox from './mini-component/Textbox'
import PasswordBox from './mini-component/PasswordBox'
import SubmitButton from './mini-component/SubmitButton'
import Image from 'next/image'
import Logo from './mini-component/Logo'


function Login() {
  return (
    <div className='flex justify-center items-center min-h-[90vh]'>
    <form action="" className='flex justify-center items-center flex-col gap-5 bg-[#FBF9F9] p-10'>
        <Logo />
        <Textbox name="username" value="username" placeholder="Username"/>
        <PasswordBox name="username" value="username" placeholder="Username"/>
        <SubmitButton text="Login"/>
        <hr />
        <p>Don't have an account? <Link href="/register">Sign Up</Link></p>
    </form>
    </div>
  )
}

export default Login