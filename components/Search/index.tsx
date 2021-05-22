import React from "react";
import AtlasTab, { ITabs } from "../Utility/Tabs";

export interface ISearch extends ITabs {}

const Search = ({ tabItems, fullWidth }: ISearch) => {
  return (
    <div className="mt-10">
      <AtlasTab fullWidth={fullWidth} tabItems={tabItems} />
    </div>
  );
};

export default Search;
