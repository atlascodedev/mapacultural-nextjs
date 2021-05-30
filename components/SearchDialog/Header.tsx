import React from "react";
import { IoClose } from "react-icons/io5";

export interface ISearchDialogHeader {
  closeFn: (...args: any[]) => void;
}

const Header = ({ closeFn }: ISearchDialogHeader) => {
  return (
    <div className="bg-secondary-light rounded-t-lg p-4  flex">
      <div className="flex-grow"></div>
      <IoClose
        onClick={closeFn}
        className=" text-white text-xl cursor-pointer"
      />
    </div>
  );
};

export default Header;
