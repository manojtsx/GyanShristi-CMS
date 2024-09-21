import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type PasswordBoxProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordBox({ name, value, placeholder, onChange }: PasswordBoxProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative w-[300px]">
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-white border-none rounded-md shadow-md w-full dark:bg-[#2C2C2C] dark:border-[#303030] dark:text-white"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-2 text-gray-500 dark:text-gray-300"
      >
        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
      </button>
    </div>
  );
}

export default PasswordBox;