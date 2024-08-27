import React from 'react'
type SubmitButton={
    text: string
}

function SubmitButton({text} : SubmitButton) {
  return (
    <>
    <button type="submit" className='w-[300px] h-11 bg-[#3742FA] hover:bg-[#2B2E4A] hover:opacity-70 rounded-md text-white font-bold dark:text-white dark:hover:bg-[#202af8]'>{text}</button>
    </>
  )
}

export default SubmitButton