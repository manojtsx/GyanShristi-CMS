import React from 'react'
type SubmitButton={
    text: string
}

function SubmitButton({text} : SubmitButton) {
  return (
    <>
    <button type="submit" className='w-[300px] h-11 bg-[#3742FA] rounded-md text-white font-bold dark:text-white'>{text}</button>
    </>
  )
}

export default SubmitButton