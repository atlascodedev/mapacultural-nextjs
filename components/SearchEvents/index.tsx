import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { IoClose } from "react-icons/io5";
import { IEventModel } from "../../@types/project";
import { categories } from "../../constants";
import FieldWrapper from "../FormUtil/FieldWrapper";
import SearchDialog from "../SearchDialog";
import Backdrop from "../Utility/Backdrop";
import Filter from "../Utility/Filter";
import UserLetter from "../Utility/UserLetter";
import SearchEventSlider, { ISearchEventSlider } from "./SearchEventSlider";

export interface ISearchEvents {
  eventList: IEventModel[];
}

const SearchEvents = ({ eventList }: ISearchEvents) => {
  const [eventName, setEventName] = React.useState<string>("");
  const [eventMonth, setEventMonth] = React.useState<string>("");
  const [eventCategory, setEventCategory] = React.useState<string>("");

  const [eventDialog, setEventDialog] = React.useState<
    IEventModel & { open: boolean }
  >({
    categories: [],
    eventType: "Físico",
    startingDate: "",
    privatePhone: "",
    cep: "",
    complement: "",
    eventURL: "",
    neighborhood: "",
    publicPhone: "",
    street: "",
    streetNumber: "",
    website: "",
    workingHours: "",
    open: false,
    description: "",
    eventAgeRestriction: "10",
    eventEntryType: "Acesso gratuito",
    eventFrequency: "Anual",
    eventHead: "",
    eventName: "",
    privateEmail: "",
    eventFee: "",
    endingDate: "",
    publicEmail: "",
  });

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
        <SearchEventSlider action={setEventDialog} eventList={eventList} />
      </div>

      <SearchDialog
        BackdropProps={{ open: eventDialog.open }}
        closeFn={() =>
          setEventDialog((prevState) => {
            return { ...prevState, open: false };
          })
        }
        content={[
          [
            {
              label: "",
              element: <UserLetter username={eventDialog.eventName} />,
            },
            {
              label: "",
              element: (
                <div className="text-gray-800 capitalize font-bold text-xl">
                  {eventDialog.eventName}
                </div>
              ),
            },
            {
              label: "Data do evento",
              element: (
                <div className="text-gray-700">
                  {`${new Date(
                    eventDialog.startingDate.toString()
                  ).toLocaleDateString("pt-br")} até ${new Date(
                    eventDialog.endingDate.toString()
                  ).toLocaleDateString("pt-br")}`}
                </div>
              ),
            },
            {
              label: "Horário de realização",
              element: (
                <div className="text-gray-700">{eventDialog.workingHours}</div>
              ),
            },
            {
              label: "Classificação indicativa",
              element: (
                <div className="text-gray-700">
                  {eventDialog.eventAgeRestriction}
                </div>
              ),
            },
            {
              label: "Valor",
              element: (
                <div className="text-gray-700">
                  {eventDialog.eventEntryType}
                </div>
              ),
            },
            {
              label: "Local",
              element: (
                <div>{`${eventDialog.street}, ${eventDialog.streetNumber}, ${
                  eventDialog?.complement ?? ""
                }, ${eventDialog.cep}`}</div>
              ),
            },

            {
              label: "E-mail",
              element: (
                <div className="text-gray-700">
                  {eventDialog?.publicEmail ?? ""}
                </div>
              ),
            },
            {
              label: "Telefone",
              element: (
                <div className="text-gray-700">
                  {eventDialog?.publicPhone ?? ""}
                </div>
              ),
            },
          ],
          [
            {
              label: "Sobre o evento",
              element: (
                <div className="text-gray-700">{eventDialog.description}</div>
              ),
            },
            {
              label: eventDialog?.website ? "Website do evento" : "",
              element: (
                <div className="text-gray-700">
                  {eventDialog?.website ?? ""}
                </div>
              ),
            },
            {
              label: eventDialog?.eventURL ? "Link do evento (virtual)" : "",
              element: (
                <div className="text-gray-700">
                  {eventDialog?.eventURL ?? ""}
                </div>
              ),
            },
          ],
        ]}
      />
    </div>
  );
};

export default SearchEvents;
