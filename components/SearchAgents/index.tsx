import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import Search from "../Search";
import Filter from "../Utility/Filter";

const SearchAgentsSelectField = () => {
  return (
    <FormControl style={{ minWidth: "150px" }}>
      <InputLabel>Age</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={() => console.log("value")}
        value={""}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export interface ISearchAgents {}

const SearchAgents = (props: ISearchAgents) => {
  return (
    <div className="w-full h-auto flex flex-col">
      <Filter
        searchAction={() => console.log("search me")}
        inputItems={[<TextField label="Nome" />, <SearchAgentsSelectField />]}
      />
    </div>
  );
};

export default SearchAgents;
