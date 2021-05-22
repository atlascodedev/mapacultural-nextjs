import React from "react";
import { FaSearch } from "react-icons/fa";

export interface IFilterSearchButton {
  searchAction: (...args: any[]) => void;
}

const FilterSearchButton = ({ searchAction }: IFilterSearchButton) => {
  return (
    <button
      onClick={searchAction}
      className="rounded-bl-3xl focus:outline-none rounded-br-3xl md:rounded-bl-none  p-7 py-5 bg-secondary-main shadow-md flex justify-center items-center md:rounded-tr-3xl cursor-pointer md:rounded-br-3xl"
    >
      <FaSearch className="text-white text-3xl" />
    </button>
  );
};

export default FilterSearchButton;
