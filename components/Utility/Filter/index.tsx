import React from "react";
import FilterBase, { IFilterBase } from "./FilterBase";
import FilterInputWrapper from "./FilterInputWrapper";

export interface IFilter extends IFilterBase {
  inputItems: JSX.Element[];
}

const Filter = ({ inputItems = [], searchAction }: IFilter) => {
  return (
    <FilterBase searchAction={searchAction}>
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
