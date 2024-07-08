import React from "react";
type SmallButton = {
  text: string;
  onClick?: () => void;
};

function SmallButton({ text, onClick }: SmallButton) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-[100px] h-10 bg-[#3570E2] text-white font-bold"
      >
        {text}
      </button>
    </>
  );
}

export default SmallButton;
