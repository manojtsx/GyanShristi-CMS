import React from 'react'
import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect} from 'react'

function ViewMode() {
    const[isDarkMode, setIsDarkMode] = useState(false);

  function toggleIcon(){
    setIsDarkMode(!isDarkMode);
  }

useEffect(() => {
    if(isDarkMode){
      document.body.classList.add('dark');
    }
    else{
      document.body.classList.remove('dark');
    }
    }, [isDarkMode]);

  return (
    <div className='flex flex-col justify-center'>
    <div className='h-2 w-12 bg-[#E8E4E4] rounded-full absolute'></div>
    <div className='flex items-center justify-between w-14'>
     {isDarkMode ? (
     
      <FontAwesomeIcon
        icon={faMoon}
        className={`h-4 w-4  bg-white cursor-pointer text-black rounded-full p-1 relative translate-x-8 ${isDarkMode ? ' bg-white  text-black' : '' }`}
        onClick={toggleIcon}
      />
    ) : (
      <FontAwesomeIcon
      icon={faSun}
      className={`h-4 w-4 rounded-full bg-black cursor-pointer  text-white p-1 relative ${!isDarkMode ? ' bg-black  text-white' : '' }`}
      onClick={toggleIcon}
    />
    )}
    </div>
</div>
  )
}

export default ViewMode