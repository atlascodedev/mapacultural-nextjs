import React from "react";
import SearchSpaceMap from "./Map";
import dynamic from "next/dynamic";
import style from "./SearchSpaces.module.scss";
import Filter from "../Utility/Filter";
import { TextField } from "@material-ui/core";

const DynamicMapSSR = dynamic(() => import("./Map"), { ssr: false });

interface ISearchSpaces {}

const SearchSpaces = ({}: ISearchSpaces) => {
  const [culturalSpaceName, setCulturalSpaceName] = React.useState<string>("");
  const [neighborhoodName, setNeighborhoodName] = React.useState<string>("");
  const [categoryName, setCategoryName] = React.useState<string>("");

  return (
    <div>
      <div className="flex justify-center">
        <Filter
          searchAction={() => console.log("problema?")}
          inputItems={[
            <TextField
              label="Nome"
              placeholder="Nome do espaço cultural"
              value={culturalSpaceName}
              onChange={(event) => setCategoryName(event.target.value)}
            />,
            <TextField
              select
              value={neighborhoodName}
              onChange={(event) => setNeighborhoodName(event.target.value)}
            ></TextField>,
          ]}
        />
      </div>

      <div className={style.container}>
        <div className={style.infoContainer}></div>
        <div className={style.mapContainer}>
          <DynamicMapSSR />
        </div>
      </div>
    </div>
  );
};

export default SearchSpaces;
