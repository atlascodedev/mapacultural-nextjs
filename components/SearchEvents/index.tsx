import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import Filter from "../Utility/Filter";
import SearchSpaceSlider from "./SearchSpaceSlider";

export interface ISearchSpaces {}

const SearchEvents = (props: ISearchSpaces) => {
  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        Existem 46 eventos em Taquara
      </div>

      <div>
        <SearchSpaceSlider spaceList={[1, 1, 1, 1]} />
      </div>
    </div>
  );
};

export default SearchEvents;
