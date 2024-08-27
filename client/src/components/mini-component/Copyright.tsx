import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";


function Copyright() {
  return <div className="flex justify-center items-center gap-3 p-2 bg-[#1E58C8] mt-[1px] text-white dark:bg-[#181818] dark:text-[#B0B0B0]">
    <FontAwesomeIcon icon={faCopyright} className="dark:text-[#1E58C8]"/>
    <p >Copyright by GyanShristi</p>
  </div>;
}

export default Copyright;
