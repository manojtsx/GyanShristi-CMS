import React from "react";
type TextBoxProps = {
  name: string;
  value: string;
  placeholder: string;
};


function Textbox({ name, value, placeholder }: TextBoxProps) {
  return (
    <>
      <input type="text" name={name} value={value} placeholder={placeholder} className="bg-white border-none shadow-md w-[300px]"/>
    </>
  );
}

export default Textbox;
