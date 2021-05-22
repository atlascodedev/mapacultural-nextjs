import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import Filter from "../Utility/Filter";
import SearchAgentCard from "./SearchAgentCard";

const SearchAgentsSelectField = () => {
  return (
    <FormControl style={{ minWidth: "150px" }}>
      <InputLabel>Atuação</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={() => console.log("value")}
        value={""}
      >
        <MenuItem value={10}>Atuação 1</MenuItem>
        <MenuItem value={20}>Atuação 2</MenuItem>
        <MenuItem value={30}>Atuaçao 3</MenuItem>
      </Select>
    </FormControl>
  );
};

export interface ISearchAgents {}

const SearchAgents = (props: ISearchAgents) => {
  return (
    <div className="w-full h-auto flex flex-col py-8">
      <Filter
        searchAction={() => console.log("search me")}
        inputItems={[<TextField label="Nome" />, <SearchAgentsSelectField />]}
      />

      <div className="w-full font-bold md:text-2xl text-center my-14">
        Existem 46 músicos em Taquara
      </div>

      <SearchAgentCard />
    </div>
  );
};

export default SearchAgents;
