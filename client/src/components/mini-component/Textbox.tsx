import React from "react";
type TextBoxProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Textbox({ name, value, placeholder, onChange }: TextBoxProps) {
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-white border-none rounded-md shadow-md w-[300px] dark:bg-[#2C2C2C] dark:border-[#303030] dark:text-white"
      />
    </>
  );
}

export default Textbox;
