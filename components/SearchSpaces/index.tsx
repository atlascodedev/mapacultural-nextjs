import React from "react";
import SearchSpaceMap from "./Map";
import dynamic from "next/dynamic";
import style from "./SearchSpaces.module.scss";

const DynamicMapSSR = dynamic(() => import("./Map"), { ssr: false });

interface ISearchSpaces {}

const SearchSpaces = ({}: ISearchSpaces) => {
  return (
    <div className={style.container}>
      <div className="w-2/6 shadow-lg bg-gray-50"></div>
      <div className="w-full h-full">
        <DynamicMapSSR />
      </div>
    </div>
  );
};

export default SearchSpaces;
