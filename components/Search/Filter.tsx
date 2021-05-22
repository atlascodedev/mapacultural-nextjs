import React from "react";
import FilterBase from "./FilterBase";
import FilterInputWrapper from "./FilterInputWrapper";

export interface IFilter {
  inputItems: JSX.Element[];
}

const Filter = ({ inputItems = [] }: IFilter) => {
  return (
    <FilterBase>
      {inputItems.map((component, index) => {
        return (
          <FilterInputWrapper
            noBorder={index === inputItems.length - 1}
            key={index}
          >
            {component}
          </FilterInputWrapper>
        );
      })}
    </FilterBase>
  );
};

export default Filter;
