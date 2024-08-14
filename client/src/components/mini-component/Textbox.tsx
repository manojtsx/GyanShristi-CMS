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
        className="bg-white border-none shadow-md w-[300px] dark:bg-gray-400 dark:text-white"
      />
    </>
  );
}

export default Textbox;
