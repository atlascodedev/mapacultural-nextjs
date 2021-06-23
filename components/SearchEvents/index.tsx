import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import makeNonRelativeURL from "../../helper/makeNonRelativeURL";
import usePagination from "../../hooks/usePagination";
import { categories } from "../Forms/constants";
import { IEventModel } from "../Forms/types";
import SearchAgentHorizontalCard from "../SearchAgents/SearchAgentHorizontalCard";
import SearchDialog from "../SearchDialog";
import Filter from "../Utility/Filter";
import TagGroup from "../Utility/TagGroup";
import UserLetter from "../Utility/UserLetter";
import SearchEventSlider from "./SearchEventSlider";
import useSearchEventFilter, { filterEvents } from "./useSearchEventFilter";
import { Pagination } from "@material-ui/lab";

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

const getRandomMonthIndex = () => {
  let randomMonths = months[Math.floor(Math.random() * 12)];

  return randomMonths;
};

const getCurrentMonthCapitalized = () => {
  let currentMonth = new Date(Date.now()).toLocaleDateString("pt-br", {
    month: "long",
  });

  let capitalizedCurrentMonth =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  return capitalizedCurrentMonth;
};

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
  const currentMonth = React.useMemo(() => {
    return getCurrentMonthCapitalized();
  }, []);

  const { active, category, message, month, setActive, setMonth, setCategory } =
    useSearchEventFilter();

  let { activeIndex, activePage, pages, setActivePage } = usePagination(
    [...active],
    6,
    [active, eventList]
  );

  React.useEffect(() => {
    setMonth(currentMonth);

    filterEvents(month, "Todos", [...eventList], setActive);
  }, []);

  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center flex-col items-center w-full">
        <Filter
          searchAction={() =>
            filterEvents(month, category, [...eventList], setActive)
          }
          inputItems={[
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

        <div className="font-bold pt-10 mb-8">{message}</div>
      </div>

      <div className="overflow-hidden flex flex-col items-center">
        <div className="flex flex-col gap-y-4 w-full items-center">
          {activePage.map((value, index) => {
            return (
              <SearchAgentHorizontalCard
                key={index}
                actionName={"Ver evento"}
                categories={value.categories}
                title={value.eventName}
                action={() => setEventDialog({ ...value, open: true })}
              />
            );
          })}
        </div>

        <div className="mt-10 mb-3">
          <Pagination
            variant="outlined"
            shape="rounded"
            count={pages.length}
            page={activeIndex + 1}
            showFirstButton
            showLastButton
            onChange={(event, value) => setActivePage(value - 1)}
          />
        </div>
      </div>

      {/* <div>
        <SearchEventSlider action={setEventDialog} eventList={active} />
      </div> */}

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
            <TagGroup
              mobileMaxCols={2}
              maxCols={2}
              tags={eventDialog.categories}
            />,
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
                <a
                  target="_blank"
                  href={makeNonRelativeURL(eventDialog.website)}
                  className="text-special-link hover:underline"
                >
                  {eventDialog.website}
                </a>
              </div>
            ) : null,

            eventDialog?.publicEmail.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">E-mail</div>
                <div className="text-gray-500">{eventDialog.publicEmail}</div>
              </div>
            ) : null,

            eventDialog.eventURL.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">
                  Link do evento
                </div>
                <a
                  target="_blank"
                  href={makeNonRelativeURL(eventDialog.eventURL)}
                  className="text-special-link hover:underline"
                >
                  {eventDialog.eventURL}
                </a>
              </div>
            ) : null,
          ],
        ]}
      />
    </div>
  );
};

export default SearchEvents;
