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
                <div className="text-gray-500">{eventDialog.workingHours}</div>
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

            eventDialog?.publicEmail.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">E-mail</div>
                <div className="text-gray-500">{eventDialog.workingHours}</div>
              </div>
            ) : null,

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
