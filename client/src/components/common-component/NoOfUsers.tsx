"use client";
import Image from "next/image";
import React, { useState } from "react";
import LineChart from "../LineChart";

function NoOfUsers() {
  
  return (
          <div className="flex flex-col justify-between">
            <div className="flex gap-4">
              <div className="rounded-md w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Editors</p>
                <p className="text-sm font-medium">3</p>
              </div>
              <div className="rounded-md w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Authors</p>
                <p className="text-sm font-medium">3</p>
              </div>
              <div className="rounded-md w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Contents</p>
                <p className="text-sm font-medium">3</p>
              </div>
              <div className="rounded-md w-1/4 py-5 text-xl flex flex-col justify-center items-center shadow-all">
                <p className="text-sm">Number Of Viewers</p>
                <p className="text-sm font-medium">3</p>
              </div>
            </div>  
            </div>  
  );
}

export default NoOfUsers; 