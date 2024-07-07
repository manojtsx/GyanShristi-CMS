import React from 'react'
type PasswordBoxProps={
    name: string;
    value: string;
    placeholder: string;
};
function PasswordBox({name,value,placeholder} : PasswordBoxProps) {
  return (
    <>
    <input type="password" name={name} value={value} placeholder={placeholder} className="bg-white border-none shadow-md w-[300px]"/>
  </>
  )
}

export default PasswordBox