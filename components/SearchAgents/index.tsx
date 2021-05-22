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
import SearchAgentsSlider from "./SearchAgentsSlider";

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
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center">
        <Filter
          searchAction={() => console.log("search me")}
          inputItems={[<TextField label="Nome" />, <SearchAgentsSelectField />]}
        />
      </div>

      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        Existem 46 músicos em Taquara
      </div>

      <div className="overflow-hidden">
        <SearchAgentsSlider agentSliderItems={[1, 1, 1, 1, 1]} />
      </div>
    </div>
  );
};

export default SearchAgents;
