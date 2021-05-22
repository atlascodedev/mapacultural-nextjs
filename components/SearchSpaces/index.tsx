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

const SearchSpacesSelectField = ({
  label,
  options,
}: {
  label: string;
  options: Array<{ optionLabel: string; optionValue: any }>;
}) => {
  return (
    <FormControl style={{ minWidth: "150px" }}>
      <InputLabel>{label}</InputLabel>
      <Select fullWidth onChange={() => console.log("value")}>
        {options.map((option, index: number) => {
          <MenuItem key={index} value={option.optionValue}>
            {option.optionLabel}
          </MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

const SearchSpaces = (props: ISearchSpaces) => {
  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center">
        <Filter
          searchAction={() => console.log("I search spaces")}
          inputItems={[
            <TextField label="Nome" />,
            <SearchSpacesSelectField
              label={"Bairros"}
              options={[
                { optionLabel: "Bairro 1", optionValue: "bairro00" },
                { optionLabel: "Bairro 2", optionValue: "bairro00" },
                { optionLabel: "Bairro 2", optionValue: "bairro00" },
              ]}
            />,
            <SearchSpacesSelectField
              label="Atuação"
              options={[
                { optionLabel: "Atuação 1", optionValue: "atuação000" },
                { optionLabel: "Atuação 2", optionValue: "atuação000" },
                { optionLabel: "Atuação 3", optionValue: "atuação000" },
                { optionLabel: "Atuação 4", optionValue: "atuação000" },
              ]}
            />,
          ]}
        />
      </div>
      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        Existem 46 eventos em Taquara
      </div>

      <div>
        <SearchSpaceSlider spaceList={[1, 1, 1, 1]} />
      </div>
    </div>
  );
};

export default SearchSpaces;
