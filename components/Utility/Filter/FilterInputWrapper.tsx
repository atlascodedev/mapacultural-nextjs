import React from "react";

export interface IFilterInputWrapper {
  noBorder?: boolean;
}

const FilterInputWrapper: React.FC<IFilterInputWrapper> = ({
  children,
  noBorder,
}) => {
  return (
    <div
      className={`border-gray-500 border-dashed ${
        noBorder ? "border-r-0" : "md:border-r"
      } border-opacity-70 px-10 py-3 pt-1.5`}
    >
      {children}
    </div>
  );
};

export default FilterInputWrapper;
