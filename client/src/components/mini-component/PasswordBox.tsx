import React from 'react'
type PasswordBoxProps={
    name: string;
    value: string;
    placeholder: string;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
};
function PasswordBox({name,value,placeholder, onChange} : PasswordBoxProps) {
  return (
    <>
    <input type="password" name={name} value={value} placeholder={placeholder} onChange={onChange} className="bg-white border-none rounded-md shadow-md w-[300px] dark:bg-[#2C2C2C] dark:border-[#303030] dark:text-white"/>
  </>
  )
}

export default PasswordBox