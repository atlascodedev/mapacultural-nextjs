import React from "react";
import AtlasTab from "../Utility/Tabs";

export interface ISearch {}

const Search = ({}: ISearch) => {
  return (
    <div>
      <AtlasTab
        fullWidth
        tabItems={[
          { component: <div>hello</div>, label: "Im the label" },
          { component: <div>hello motto</div>, label: "Im the label too" },
          { component: <div>You never changed</div>, label: "Motorolla" },
        ]}
      />
    </div>
  );
};

export default Search;
