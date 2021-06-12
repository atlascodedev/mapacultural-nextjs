import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { IoClose } from "react-icons/io5";
import { IEventModel } from "../../@types/project";
import { categories } from "../../constants";
import FieldWrapper from "../FormUtil/FieldWrapper";
import SearchDialog from "../SearchDialog";
import Backdrop from "../Utility/Backdrop";
import Filter from "../Utility/Filter";
import TagGroup from "../Utility/TagGroup";
import UserLetter from "../Utility/UserLetter";
import SearchEventSlider, { ISearchEventSlider } from "./SearchEventSlider";
import useSearchEventFilter, { filterEvents } from "./useSearchEventFilter";

export interface ISearchEvents {
  eventList: IEventModel[];
}

const SearchEvents = ({ eventList }: ISearchEvents) => {
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
    neighborhood: "Centro",
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

  const {
    active,
    category,
    message,
    month,
    name,
    setActive,
    setMonth,
    setName,
    setCategory,
  } = useSearchEventFilter();

  React.useEffect(() => {
    filterEvents("", month, "Todos", eventList, setActive);
  }, []);

  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center flex-col items-center w-full">
        <Filter
          searchAction={() =>
            filterEvents(name, month, category, eventList, setActive)
          }
          inputItems={[
            <TextField
              placeholder="Nome"
              label="Nome do evento"
              value={name}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setName(event.target.value)}
            />,

            <TextField
              style={{ minWidth: "120px" }}
              value={month}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setMonth(event.target.value)
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
              value={category}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCategory(event.target.value)
              }
            >
              {[...categories, "Todos"].map((category, index: number) => {
                return (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </TextField>,
          ]}
        />

        <div className="font-bold pt-10">{message}</div>
      </div>

      <div>
        <SearchEventSlider action={setEventDialog} eventList={active} />
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
            <UserLetter username={eventDialog.eventName} />,
            <div className="font-bold text-xl text-gray-700">
              {eventDialog.eventName}
            </div>,
            <TagGroup tags={eventDialog.categories} />,
            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">
                Data do evento
              </div>
              <div className="text-gray-500">{`${new Date(
                eventDialog.startingDate
              ).toLocaleDateString("pt-br")} até ${new Date(
                eventDialog.endingDate
              ).toLocaleDateString("pt-br")}`}</div>
            </div>,
            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">
                Horário de realização
              </div>
              <div className="text-gray-500">{eventDialog.workingHours}</div>
            </div>,
            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">Valor</div>
              <div className="text-gray-500">{eventDialog.eventEntryType}</div>
            </div>,

            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">
                Tipo de evento
              </div>
              <div className="text-gray-500">{eventDialog.eventType}</div>
            </div>,

            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">Local</div>
              <div className="text-gray-500">{`${eventDialog.street}, ${
                eventDialog.streetNumber
              }, ${eventDialog.neighborhood}, ${
                eventDialog?.complement ?? ""
              }, ${eventDialog.cep}`}</div>
            </div>,
            eventDialog?.publicEmail.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">E-mail</div>
                <div className="text-gray-500">{eventDialog.publicEmail}</div>
              </div>
            ) : null,

            eventDialog?.publicPhone.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">Telefone</div>
                <div className="text-gray-500">{eventDialog.publicPhone}</div>
              </div>
            ) : null,
          ],
          [
            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">
                Sobre o evento
              </div>
              <div className="text-gray-500">{eventDialog.description}</div>
            </div>,

            eventDialog?.website.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">Website</div>
                <div className="text-gray-500">{eventDialog.website}</div>
              </div>
            ) : null,

            eventDialog?.publicEmail.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">E-mail</div>
                <div className="text-gray-500">{eventDialog.workingHours}</div>
              </div>
            ) : null,
          ],
        ]}
      />
    </div>
  );
};

export default SearchEvents;
