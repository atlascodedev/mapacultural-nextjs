import React from "react";
import dynamic from "next/dynamic";
import Filter from "../Utility/Filter";
import { MenuItem, TextField } from "@material-ui/core";
import { categories, taquaraNeighborhoods } from "../../constants";
import { ICulturalSpaceModel } from "../../@types/project";
import SearchDialog from "../SearchDialog";
import UserLetter from "../Utility/UserLetter";
import TagGroup from "../Utility/TagGroup";

const DynamicMapSSR = dynamic(() => import("./Map"), { ssr: false });

interface ISearchSpaces {
  culturalSpaces: ICulturalSpaceModel[];
}

const SearchSpaces = ({ culturalSpaces }: ISearchSpaces) => {
  const [culturalSpaceName, setCulturalSpaceName] = React.useState<string>("");
  const [neighborhoodName, setNeighborhoodName] = React.useState<string>("");
  const [categoryName, setCategoryName] = React.useState<string>("");

  const [spaceDialog, setSpaceDialog] = React.useState<
    ICulturalSpaceModel & { open: boolean }
  >({
    accessibilityType: [],
    accessible: "",
    category: [],
    cep: "",
    cpf_or_cpnj: "",
    culturalSpaceCapacity: "",
    culturalSpaceEntry: "Espaço público",
    culturalSpaceHead: "",
    culturalSpaceName: "",
    culturalSpaceSphere: "Empresa",
    description: "",
    workingHours: "",
    entryTypes: "Acesso gratuito",
    neighborhood: "Centro",
    open: false,
    privateEmail: "",
    privatePhone: "",
    publicEmail: "",
    street: "",
    streetNumber: "",
    complement: "",
    entryFee: "",
    facebook: "",
    instagram: "",
    publicPhone: "",
    publicPhoneAlt: "",
    website: "",
  });

  return (
    <div className="w-full">
      <div className="flex justify-center my-5 mb-10 ">
        <Filter
          searchAction={() => console.log("problema?")}
          inputItems={[
            <TextField
              label="Nome"
              placeholder="Nome do espaço cultural"
              value={culturalSpaceName}
              onChange={(event) => setCulturalSpaceName(event.target.value)}
            />,

            <TextField
              select
              style={{ minWidth: "150px" }}
              label="Bairros"
              value={neighborhoodName}
              onChange={(event) => setNeighborhoodName(event.target.value)}
            >
              {taquaraNeighborhoods.map((neighborhood, index: number) => {
                return <MenuItem value={neighborhood}>{neighborhood}</MenuItem>;
              })}
            </TextField>,

            <TextField
              style={{ minWidth: "150px" }}
              select
              label="Atuação"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            >
              {categories.map((category, index: number) => {
                return <MenuItem value={category}>{category}</MenuItem>;
              })}
            </TextField>,
          ]}
        />
      </div>

      <div className="h-80 md:h-500px w-full flex justify-center mb-10">
        <div className="md:w-2/3 w-full h-full">
          <DynamicMapSSR
            culturalSpaces={culturalSpaces}
            action={setSpaceDialog}
          />
        </div>
      </div>
      <SearchDialog
        BackdropProps={{ open: spaceDialog.open }}
        closeFn={() =>
          setSpaceDialog((prevState) => {
            return { ...prevState, open: false };
          })
        }
        content={[
          [
            <UserLetter username={spaceDialog.culturalSpaceName} />,
            <div className="font-bold text-xl text-gray-700">
              {spaceDialog.culturalSpaceName}
            </div>,
            <TagGroup tags={spaceDialog.category} />,

            <div className="flex flex-col">
              <div className="text-gray-700 text-lg font-bold">
                Horário de funcionamento
              </div>
              <div className="text-gray-500">{spaceDialog.workingHours}</div>
            </div>,

            <div className="flex flex-col">
              <div className="text-gray-700 font-bold text-lg">Endereço</div>
              <div className="text-gray-500 text-sm">{`${spaceDialog.street}, ${
                spaceDialog.streetNumber
              }, ${spaceDialog?.complement ?? ""}, ${
                spaceDialog.neighborhood
              }, ${spaceDialog.cep}`}</div>
            </div>,

            <div className="flex flex-col">
              <div className="text-gray-700 font-bold text-lg">
                Sobre o local
              </div>
              <div className="text-gray-500 text-sm">
                {spaceDialog.description}
              </div>
            </div>,

            <div className="flex flex-col">
              <div className="text-gray-700 font-bold text-lg">
                Acessibilidade
              </div>
              <div className="text-gray-500 text-sm">
                {spaceDialog.accessible}
              </div>
            </div>,

            <div className="flex flex-col">
              <div className="text-gray-700 font-bold text-lg">
                Critérios de uso de espaço
              </div>
              <div className="text-gray-500 text-sm">
                {spaceDialog.entryTypes}
              </div>
            </div>,
          ],
        ]}
      />
    </div>
  );
};

export default SearchSpaces;
