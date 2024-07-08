import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <>
      <Image
        src="/logo.png"
        alt="CMS Logo"
        height={100}
        width={100}
        className="h-52 w-52"
      />
    </>
  );
}

export default Logo;
