import React from "react";

export interface IPaginationButton {
  action: (...args: any[]) => void;
  label: string;
  active: boolean;
}

const PaginationButton = ({ action, label, active }: IPaginationButton) => {
  return (
    <button
      onClick={action}
      className={` focus:outline-none py-1 px-4 text-center  border-secondary-main border-2 hover:bg-secondary-main hover:text-white font-bold md:text-sm rounded-md ${
        active ? "bg-secondary-main text-white" : "bg-white text-gray-800"
      }`}
    >
      {label}
    </button>
  );
};

export default PaginationButton;
