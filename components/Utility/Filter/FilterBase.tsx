import React from "react";
import FilterSearchButton, { IFilterSearchButton } from "./FilterSearchButton";

export interface IFilterBase extends IFilterSearchButton {}

const FilterBase: React.FC<IFilterBase> = ({ children, searchAction }) => {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:rounded-bl-3xl rounded-tl-3xl md:rounded-t-none md:rounded-b-none rounded-tr-3xl md:flex-row flex-col h-full shadow-md md:rounded-tl-3xl w-auto bg-primary-main flex justify-center items-center gap-0">
        {children}
      </div>
      <FilterSearchButton searchAction={searchAction} />
    </div>
  );
};

export default FilterBase;
