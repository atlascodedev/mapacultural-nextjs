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
import SearchDialog from "../SearchDialog";
import Backdrop from "../Utility/Backdrop";
import Filter from "../Utility/Filter";
import TagGroup from "../Utility/TagGroup";
import UserLetter from "../Utility/UserLetter";
import SearchAgentsSlider from "./SearchAgentsSlider";

const SearchAgentsSelectField = () => {
  return (
    <FormControl style={{ minWidth: "150px" }}>
      <InputLabel>Atuação</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={() => console.log("value")}
        value={""}
      >
        <MenuItem value={10}>Atuação 1</MenuItem>
        <MenuItem value={20}>Atuação 2</MenuItem>
        <MenuItem value={30}>Atuaçao 3</MenuItem>
      </Select>
    </FormControl>
  );
};

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
    neighborhood: "",
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

  console.log(searchDialog.open);

  return (
    <div className="w-full h-auto overflow-hidden py-8">
      <div className="flex justify-center">
        <Filter
          searchAction={() => console.log("search me")}
          inputItems={[<TextField label="Nome" />, <SearchAgentsSelectField />]}
        />
      </div>

      <div className="w-full font-bold md:text-2xl text-center my-14 mb-7">
        Existem 46 músicos em Taquara
      </div>

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
            {
              label: "",
              element: <UserLetter username={searchDialog.fullName} />,
            },
            {
              label: "",
              element: (
                <div className="text-gray-800 text-lg font-bold">
                  {searchDialog.fullName}
                </div>
              ),
            },
            {
              label: "",
              element: <TagGroup tags={searchDialog.categories} />,
            },
            {
              label: searchDialog?.publicPhoneNumber ? "Telefone 1" : "",
              element: (
                <div className="text-gray-700">
                  {searchDialog?.publicPhoneNumber ?? ""}
                </div>
              ),
            },
            {
              label: searchDialog?.publicEmail ? "E-mail" : "",
              element: (
                <div className="text-gray-700">
                  {searchDialog?.publicEmail ?? ""}
                </div>
              ),
            },
            {
              label: searchDialog?.website ? "Website" : "",
              element: (
                <div className="text-gray-700">
                  {searchDialog?.website ?? ""}
                </div>
              ),
            },
            {
              label: searchDialog?.facebook ? "Facebook" : "",
              element: (
                <div className="text-gray-700">
                  {searchDialog?.facebook ?? ""}
                </div>
              ),
            },
            {
              label: searchDialog?.instagram ? "Instagram" : "",
              element: (
                <div className="text-gray-700">
                  {searchDialog?.instagram ?? ""}
                </div>
              ),
            },
          ],
          [
            {
              label: "Sobre mim",
              element: (
                <div className="text-gray-700">{searchDialog.description}</div>
              ),
            },
            {
              label: searchDialog?.portfolio ? "Portfolio" : "",
              element: (
                <div className="text-gray-700">
                  {searchDialog?.portfolio ?? ""}
                </div>
              ),
            },
          ],
        ]}
      />
    </div>
  );
};

export default SearchAgents;
