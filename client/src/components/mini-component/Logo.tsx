import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div>
        <Image src="/logo.png" alt="CMS Logo" height={200} width={200} className="rounded-full"/>
    </div>
  )
}

export default Logo;
