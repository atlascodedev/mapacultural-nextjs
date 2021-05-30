import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { IoClose } from "react-icons/io5";
import { IAgentModel } from "../../@types/project";
import Backdrop from "../Utility/Backdrop";
import Filter from "../Utility/Filter";
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

      <Backdrop
        className="justify-center place-items-center"
        open={searchDialog.open}
        closeFn={() =>
          setSearchDialog((prevState) => {
            return { ...prevState, open: false };
          })
        }
      >
        <div className="absolute">
          <div className="bg-white flex md:h-600px  md:max-w-800px md:min-w-800px  flex-col rounded-lg ">
            <div className="bg-secondary-light rounded-t-lg p-4 w-full flex">
              <div className="flex-grow"></div>
              <IoClose
                onClick={() =>
                  setSearchDialog((prevState) => {
                    return { ...prevState, open: false };
                  })
                }
                className=" text-white text-xl cursor-pointer"
              />
            </div>

            <div className="flex flex-col md:flex-row overflow-y-scroll">
              <div className="flex flex-col gap-7 p-8">
                <div className="h-16 w-16 rounded-full bg-secondary-main flex justify-center items-center">
                  <div className="text-white font-black text-2xl">
                    {searchDialog.fullName?.[0]?.toUpperCase() ?? "A"}
                  </div>
                </div>
                <div className="text-gray-800 font-bold text-2xl capitalize">
                  {searchDialog.fullName}
                </div>
                <div className="grid grid-flow-row md:grid-cols-3 grid-cols-2 gap-5">
                  {searchDialog.categories.map((category, index) => {
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
                    Telefone 1
                  </div>
                  <div className="text-gray-700">
                    {searchDialog.phoneNumber}
                  </div>
                </div>
                {searchDialog.publicPhoneNumber ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Telefone 2
                    </div>

                    <div className="text-gray-700">
                      {searchDialog.publicPhoneNumber}
                    </div>
                  </div>
                ) : null}
                {searchDialog.publicEmail ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      E-mail
                    </div>
                    <div className="text-gray-700">
                      {searchDialog.publicEmail}
                    </div>
                  </div>
                ) : null}
                {searchDialog.website ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Website
                    </div>

                    <div className="text-gray-700">{searchDialog.website}</div>
                  </div>
                ) : null}

                {searchDialog.facebook ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Facebook
                    </div>

                    <div className="text-gray-700">{searchDialog.facebook}</div>
                  </div>
                ) : null}

                {searchDialog.instagram ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Instagram
                    </div>

                    <div className="text-gray-700">
                      {searchDialog.instagram}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-7 p-8 md:p-12 border-gray-100 md:border-l">
                <div className="flex flex-col gap-2">
                  <div className="text-gray-800 text-xl font-extrabold">
                    Sobre mim
                  </div>

                  <div className="text-gray-700">
                    {searchDialog.description}
                  </div>
                </div>

                {searchDialog.portfolio ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-gray-800 text-xl font-extrabold">
                      Sobre meu trabalho
                    </div>
                    <div className="text-gray-700">
                      {searchDialog.portfolio}
                    </div>
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

export default SearchAgents;
