import { TextField } from "@material-ui/core";
import React from "react";
import AtlasTab from "../Utility/Tabs";
import Filter from "./Filter";

export interface ISearch {}

const Search = ({}: ISearch) => {
  return (
    <div>
      <Filter
        inputItems={[
          <TextField label="hello" />,
          <TextField label="hello two" />,
        ]}
      />

      <AtlasTab
        fullWidth
        tabItems={[
          {
            component: <div>hello</div>,
            label: "Im the label",
          },
          { component: <div>hello motto</div>, label: "Im the label too" },
          { component: <div>You never changed</div>, label: "Motorolla" },
        ]}
      />
    </div>
  );
};

export default Search;
