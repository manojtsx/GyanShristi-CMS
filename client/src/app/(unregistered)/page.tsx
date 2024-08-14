import Login from "@/components/Login";
import ApplyAsAuthorButton from "@/components/mini-component/ApplyAsAuthorButton";
import Register from "@/components/Register";

import Image from "next/image";

export default function Page() {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <div>
        <p>Dashboard</p>
        
      </div>
    <div className="hidden sm:flex justify-between gap-10 px-20 py-16" >
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-1">
        <h1 className="font-medium text-4xl ">GyanShristi</h1>
        <p className="font-medium text-sm max-w-72" >An AI Based CMS with Voice Recognition and Text-to-Speech Technology</p>
        </div>
        <ApplyAsAuthorButton/>
      </div>
      <div>
        <Image src="/GyanShristi_playingLaptop.webp" alt="Browsing Laptop" width={500} height={500} className="rounded-md min-w-64"/>
      </div>
    </div>
    <div className="sm:hidden p-10 flex justify-center items-center">
    <div className="flex flex-col justify-center items-center p-5 gap-5 absolute z-10">
        <div className="flex flex-col justify-center items-center gap-1 max-w-60">
        <h1 className="font-medium text-2xl ">GyanShristi</h1>
        <p className="font-medium text-xs text-center" >An AI Based CMS with Voice Recognition and Text-to-Speech Technology</p>
        </div>
        <ApplyAsAuthorButton/>
    </div>
      <div className="relative">
        <Image src="/GyanShristi_playingLaptop.webp" alt="Browsing Laptop" width={500} height={500} className="rounded-md opacity-60"/>
      </div>    
    </div>
    </div>
  );
}
