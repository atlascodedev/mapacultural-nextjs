import React from "react";
import Filter from "../Utility/Filter";
import SearchEventSlider, { ISearchEventSlider } from "./SearchEventSlider";

export interface ISearchEvents extends ISearchEventSlider {}

const SearchEvents = ({ eventList }: ISearchEvents) => {
  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center">
        <Filter searchAction={() => console.log("search me")} inputItems={[]} />
      </div>

      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        Existem 46 eventos em Taquara
      </div>

      <div>
        <SearchEventSlider eventList={eventList} />
      </div>
    </div>
  );
};

export default SearchEvents;
