import React from "react";

export const ProfileIcon = () => {
  return (
    <div className="h-11 group w-11 flex flex-col rounded-lg bg-gradient-to-b cursor-pointer from-red-800 to-red-500">
      <div className="flex flex-col gap-2 my-auto" >
        <div className="w-full flex justify-around items-center ">
          <span className="h-1 w-1 group-hover:w-2 bg-white rounded-full"></span>
          <span className="h-1 w-1 bg-white group-hover:w-2 rounded-full"></span>
        </div>
        <div className="h-[2px] bg-white w-6 mx-auto"></div>
      </div>
    </div>
  );
};
