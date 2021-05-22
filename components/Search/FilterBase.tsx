import { TextField } from "@material-ui/core";
import React from "react";
import { FaSearch } from "react-icons/fa";
import FilterInputWrapper from "./FilterInputWrapper";

export interface IFilterBase {}

const FilterBase: React.FC<IFilterBase> = ({ children }) => {
  return (
    <div className="flex">
      <div className="rounded-bl-3xl h-full shadow-md rounded-tl-3xl w-auto bg-primary-main flex justify-center items-center gap-5">
        {children}
      </div>
      <div className="p-7 py-5 bg-secondary-main shadow-md flex justify-center items-center rounded-tr-3xl cursor-pointer rounded-br-3xl">
        <FaSearch className="text-white text-3xl" />
      </div>
    </div>
  );
};

export default FilterBase;
