import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { IoClose } from "react-icons/io5";
import { IEventModel } from "../../@types/project";
import { categories } from "../../constants";
import FieldWrapper from "../FormUtil/FieldWrapper";
import Backdrop from "../Utility/Backdrop";
import Filter from "../Utility/Filter";
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

      <Backdrop
        open={eventDialog.open}
        closeFn={() =>
          setEventDialog((prevState) => {
            return { ...prevState, open: false };
          })
        }
      >
        <div className="flex px-2  w-full items-center  justify-center">
          <div
            style={{ maxHeight: "90%" }}
            className="bg-white flex md:h-600px  flex-col rounded-lg "
          >
            <div className="bg-secondary-light rounded-t-lg p-4 w-full flex">
              <div className="flex-grow"></div>
              <IoClose
                onClick={() =>
                  setEventDialog((prevState) => {
                    return { ...prevState, open: false };
                  })
                }
                className=" text-white text-xl cursor-pointer"
              />
            </div>

            <div className="flex flex-col md:flex-row overflow-y-scroll">
              <div className="flex flex-col gap-7 p-8">
                <div className="h-16 w-16 rounded-full bg-secondary-main p-5 relative flex justify-center items-center">
                  <div className="text-white font-black text-3xl ">
                    {eventDialog.eventName?.[0]?.toUpperCase() ?? "A"}
                  </div>
                </div>
                <div className="text-gray-800 font-bold text-2xl capitalize">
                  {eventDialog.eventName}
                </div>
                <div className="grid grid-flow-row md:grid-cols-3 grid-cols-2 gap-5">
                  {eventDialog.categories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className="text-xs text-white bg-tertiary-dark font-bold rounded-2xl p-2 px-3 flex justify-center items-center"
                      >
                        {category}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Data do evento
                  </div>
                  <div className="text-gray-700">
                    {new Date(
                      eventDialog.startingDate.toString()
                    ).toLocaleDateString("pt-br")}{" "}
                    até{" "}
                    {new Date(
                      eventDialog.endingDate.toString()
                    ).toLocaleDateString("pt-br")}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Horário de realização
                  </div>

                  <div className="text-gray-700">
                    {eventDialog.workingHours}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Classificação indicativo
                  </div>

                  <div className="text-gray-700">
                    {eventDialog.eventAgeRestriction}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Valor
                  </div>
                  <div className="text-gray-700">{eventDialog.eventFee}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Tipo de evento
                  </div>
                  <div className="text-gray-700">{eventDialog.eventType}</div>
                </div>

                {eventDialog.eventType === "Físico" ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Local
                    </div>

                    <div className="text-gray-700">
                      {`${eventDialog.street}, ${eventDialog.streetNumber}, ${eventDialog.complement}, ${eventDialog.cep}`}
                    </div>
                  </div>
                ) : null}

                {eventDialog.publicEmail.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      E-mail
                    </div>
                    <div className="text-gray-700">
                      {eventDialog.publicEmail}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-7 p-8 md:p-12 border-gray-100 md:border-l">
                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Sobre o evento
                  </div>

                  <div className="text-gray-700">{eventDialog.description}</div>
                </div>

                {eventDialog.website.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Link do site
                    </div>
                    <div className="text-gray-700">{eventDialog.website}</div>
                  </div>
                ) : null}

                {eventDialog.eventURL.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Link do evento
                    </div>
                    <div className="text-gray-700">{eventDialog.eventURL}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default SearchEvents;
