import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { categories } from "../../constants";
import FieldWrapper from "../FormUtil/FieldWrapper";
import Filter from "../Utility/Filter";
import SearchEventSlider, { ISearchEventSlider } from "./SearchEventSlider";

export interface ISearchEvents extends ISearchEventSlider {}

const SearchEvents = ({ eventList }: ISearchEvents) => {
  const [eventName, setEventName] = React.useState<string>("");
  const [eventMonth, setEventMonth] = React.useState<string>("");
  const [eventCategory, setEventCategory] = React.useState<string>("");

  const months: string[] = [
    "Janeiro",
    "Feveiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center">
        <Filter
          searchAction={() => console.log("search me")}
          inputItems={[
            <TextField
              placeholder="Nome"
              label="Nome do evento"
              value={eventName}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setEventName(event.target.value)}
            />,

            <TextField
              style={{ minWidth: "120px" }}
              value={eventMonth}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEventMonth(event.target.value)
              }
              select
              label="Mês"
            >
              {months.map((month, index: number) => {
                return (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                );
              })}
            </TextField>,

            <TextField
              style={{ minWidth: "120px" }}
              label="Categoria"
              select
              value={eventCategory}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEventCategory(event.target.value)
              }
            >
              {categories.map((category, index: number) => {
                return (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </TextField>,
          ]}
        />
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
