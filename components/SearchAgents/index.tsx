import { MenuItem, TextField } from "@material-ui/core";
import React from "react";
import generateMockData from "../../helper/generateMockData";
import makeNonRelativeURL from "../../helper/makeNonRelativeURL";
import usePagination from "../../hooks/usePagination";
import { categories } from "../Forms/constants";
import { IAgentModel, IAgentModelAPIData } from "../Forms/types";
import SearchDialog from "../SearchDialog";
import Filter from "../Utility/Filter";
import AtlasPagination from "../Utility/Pagination";
import PaginationButton from "../Utility/Pagination/PaginationButton";
import TagGroup from "../Utility/TagGroup";
import UserLetter from "../Utility/UserLetter";
import SearchAgentHorizontalCard from "./SearchAgentHorizontalCard";
import useSearchAgentFilter, { filterAgents } from "./useSearchAgentFilter";
import { Pagination } from "@material-ui/lab";
import SearchAgentsSlider from "./SearchAgentsSlider";

export interface ISearchAgents {
  agentsList: IAgentModel[];
}

const SearchAgents = ({ agentsList }: ISearchAgents) => {
  const [searchDialog, setSearchDialog] = React.useState<
    IAgentModel & { open: boolean; agentType: string }
  >({
    agentType: "",
    birthday_or_founding: "",
    categories: [],
    cep: "",
    cpf_or_cnpj: "",
    fullName: "",
    gender: "Homem",
    neighborhood: "Centro",
    phoneNumber: "",
    professionalRecord: "",
    publicEmail: "",
    publicName: "",
    race: "Amarela",
    registrationEmail: "",
    street: "",
    streetNumber: "",
    complement: "",
    facebook: "",
    instagram: "",
    portfolio: "",
    publicPhoneNumber: "",
    website: "",
    description: "",
    open: false,
  });

  let { active, category, name, message, setCategory, setName, setActive } =
    useSearchAgentFilter();

  let { activePage, pages, setActivePage, activeIndex } = usePagination(
    active,
    5
  );

  React.useEffect(() => {
    filterAgents("", agentsList, "Todos", setActive);
  }, []);

  // console.log(activePage, pages, active);

  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center flex-col items-center">
        <Filter
          searchAction={() =>
            filterAgents(name, agentsList, category, setActive)
          }
          inputItems={[
            <TextField
              label="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />,
            <TextField
              label="Atuação"
              value={category}
              style={{ minWidth: "150px" }}
              onChange={(event) => setCategory(event.target.value)}
              select
            >
              {[...categories, "Todos"].map((category, index) => {
                return (
                  <MenuItem value={category} key={index}>
                    {category}
                  </MenuItem>
                );
              })}
            </TextField>,
          ]}
        />

        <div className="font-bold pt-10">{message}</div>
      </div>
      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        <div className="overflow-hidden">
          <SearchAgentsSlider
            action={setSearchDialog}
            agentSliderItems={agentsList}
          />
        </div>

        {/* <div className="overflow-hidden flex flex-col items-center">
          <div className="flex flex-col gap-y-4">
            {activePage &&
              activePage.map((value, index: number) => {
                return (
                  <SearchAgentHorizontalCard
                    key={index}
                    action={() =>
                      setSearchDialog({ ...value, open: true } as any)
                    }
                    actionName={"Ver agente"}
                    categories={value.categories}
                    title={value.publicName}
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
        </div> */}

        <SearchDialog
          BackdropProps={{ open: searchDialog.open }}
          closeFn={() =>
            setSearchDialog((prevState) => {
              return { ...prevState, open: false };
            })
          }
          content={[
            [
              <div className="flex justify-center  mt-5 md:mt-0">
                <UserLetter username={searchDialog.publicName} />
              </div>,
              <div className="font-bold text-xl text-gray-700">
                {searchDialog.publicName}
              </div>,
              <TagGroup
                tags={searchDialog.categories}
                mobileMaxCols={2}
                maxCols={2}
              />,
              searchDialog.publicPhoneNumber.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Telefone 1
                  </div>
                  <div className="text-gray-500 text-sm">
                    {searchDialog.publicPhoneNumber}
                  </div>
                </div>
              ) : null,
              searchDialog.publicEmail.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">E-mail</div>
                  <div className="text-gray-500 text-sm">
                    {searchDialog.publicEmail}
                  </div>
                </div>
              ) : null,
              searchDialog.website.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">Website</div>
                  <a
                    href={makeNonRelativeURL(searchDialog.website)}
                    target="_blank"
                    className="text-special-link hover:underline text-sm"
                  >
                    {searchDialog.website}
                  </a>
                </div>
              ) : null,

              searchDialog.facebook.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Facebook
                  </div>
                  <a
                    target="_blank"
                    href={makeNonRelativeURL(searchDialog.facebook)}
                    className="text-special-link hover:underline text-sm"
                  >
                    {searchDialog.facebook}
                  </a>
                </div>
              ) : null,
              searchDialog.instagram.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Instagram
                  </div>
                  <a
                    href={makeNonRelativeURL(searchDialog.instagram)}
                    target="_blank"
                    className="text-special-link hover:underline text-sm"
                  >
                    {searchDialog.instagram}
                  </a>
                </div>
              ) : null,
            ],
            [
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">Sobre mim</div>
                <div className="text-gray-500 text-sm">
                  {searchDialog.description}
                </div>
              </div>,

              searchDialog.portfolio.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Sobre meu trabalho
                  </div>
                  <a
                    href={makeNonRelativeURL(searchDialog.portfolio)}
                    target="_blank"
                    className="text-special-link hover:underline text-sm"
                  >
                    {searchDialog.portfolio}
                  </a>
                </div>
              ) : null,
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default SearchAgents;
