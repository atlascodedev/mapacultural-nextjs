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
      } border-opacity-70 px-14 py-4`}
    >
      {children}
    </div>
  );
};

export default FilterInputWrapper;
