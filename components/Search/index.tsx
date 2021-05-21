import React from "react";
import Tabs from "./Tabs";

export interface ISearch {}

const Search = ({}: ISearch) => {
  return (
    <div>
      <Tabs tabItems={[1, 1, 1, 1]} />
    </div>
  );
};

export default Search;
