import React from 'react'

function ViewerCategory() {
    const category =["Category1", "Category2", "Category3", "Category4", "Category5"];
  return (
    <div className='bg-white flex flex-col justify-center md:items-start items-center py-12 px-5 md:px-20 gap-8 dark:bg-[#121212] dark:text-white'>
        <p className='text-2xl font-semibold '>Category</p>
        <div className='flex flex-col md:flex-row gap-5 items-center'>
        {
            category.map((item, index) => (
                <button key={index} className='flex text-white justify-center items-center bg-[#1E58C8] rounded-full hover:bg-[#2B2E4A] hover:opacity-70 w-40 h-10'>
                {item}
                </button>
            ))
        }
        </div>
    </div>
  )
}

export default ViewerCategory