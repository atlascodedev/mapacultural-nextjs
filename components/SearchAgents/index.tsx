import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { divIcon } from "leaflet";
import React from "react";
import { IoClose } from "react-icons/io5";
import { IAgentModel } from "../../@types/project";
import { categories } from "../../constants";
import SearchDialog from "../SearchDialog";
import Backdrop from "../Utility/Backdrop";
import Filter from "../Utility/Filter";
import TagGroup from "../Utility/TagGroup";
import UserLetter from "../Utility/UserLetter";
import SearchAgentsSlider from "./SearchAgentsSlider";

export interface ISearchAgents {
  agentsList: IAgentModel[];
}

const SearchAgents = ({ agentsList }: ISearchAgents) => {
  const [searchDialog, setSearchDialog] = React.useState<
    IAgentModel & { open: boolean }
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

  const [searchAgentCategory, setSearchAgentCategory] =
    React.useState<string>("");
  const [searchAgentName, setSearchAgentName] = React.useState<string>("");

  const [activeAgents, setActiveAgents] = React.useState<IAgentModel[]>([]);

  React.useEffect(() => {}, []);

  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center flex-col items-center">
        <Filter
          searchAction={() => console.log("search me")}
          inputItems={[
            <TextField
              label="Nome"
              value={searchAgentName}
              onChange={(event) => setSearchAgentName(event.target.value)}
            />,
            <TextField
              label="Atuação"
              style={{ minWidth: "150px" }}
              onChange={(event) => setSearchAgentCategory(event.target.value)}
              select
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem value={category} key={index}>
                    {category}
                  </MenuItem>
                );
              })}
            </TextField>,
          ]}
        />

        <div className="font-bold pt-10">
          {activeAgents.length === 0
            ? `Nenhum agente foi encontrado na categoria ${searchAgentCategory}`
            : `${activeAgents.length} foram encontrados na categoria`}
        </div>
      </div>

      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        <div className="overflow-hidden">
          <SearchAgentsSlider
            action={setSearchDialog}
            agentSliderItems={agentsList}
          />
        </div>

        <SearchDialog
          BackdropProps={{ open: searchDialog.open }}
          closeFn={() =>
            setSearchDialog((prevState) => {
              return { ...prevState, open: false };
            })
          }
          content={[
            [
              <UserLetter username={searchDialog.publicName} />,
              <div className="font-bold text-xl text-gray-700">
                {searchDialog.publicName}
              </div>,
              <TagGroup tags={searchDialog.categories} />,
              searchDialog.publicPhoneNumber.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Telefone 1
                  </div>
                  <div className="text-gray-500">
                    {searchDialog.publicPhoneNumber}
                  </div>
                </div>
              ) : null,
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">
                  Telefone 2
                </div>
                <div className="text-gray-500">{searchDialog.phoneNumber}</div>
              </div>,
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">E-mail</div>
                <div className="text-gray-500">{searchDialog.publicEmail}</div>
              </div>,
              searchDialog.website.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">Website</div>
                  <div className="text-gray-500">{searchDialog.website}</div>
                </div>
              ) : null,

              searchDialog.facebook.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Facebook
                  </div>
                  <div className="text-gray-500">{searchDialog.facebook}</div>
                </div>
              ) : null,
              searchDialog.instagram.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Instagram
                  </div>
                  <div className="text-gray-500">{searchDialog.instagram}</div>
                </div>
              ) : null,
            ],
            [
              <div className="flex flex-col">
                <div className="text-gray-700 text-lg font-bold">Sobre mim</div>
                <div className="text-gray-500">{searchDialog.description}</div>
              </div>,

              searchDialog.portfolio.length > 0 ? (
                <div className="flex flex-col">
                  <div className="text-gray-700 text-lg font-bold">
                    Sobre meu trabalho
                  </div>
                  <div className="text-gray-500">{searchDialog.portfolio}</div>
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
