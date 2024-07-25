import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";


function Copyright() {
  return <div className="flex justify-center items-center gap-3 p-2 bg-[#1E58C8] mt-[1px] text-white">
    <FontAwesomeIcon icon={faCopyright} />
    <p >Copyright by GyanShristi</p>
  </div>;
}

export default Copyright;
