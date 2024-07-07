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
    <input type="password" name={name} value={value} placeholder={placeholder} onChange={onChange} className="bg-white border-none shadow-md w-[300px]"/>
  </>
  )
}

export default PasswordBox