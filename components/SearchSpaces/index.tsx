import React from "react";
import dynamic from "next/dynamic";
import Filter from "../Utility/Filter";
import { MenuItem, TextField } from "@material-ui/core";
import { categories, taquaraNeighborhoods } from "../../constants";
import { ICulturalSpaceModel } from "../../@types/project";
import SearchDialog from "../SearchDialog";
import UserLetter from "../Utility/UserLetter";
import TagGroup from "../Utility/TagGroup";
import useSearchSpaceFilter, { filterSpaces } from "./useSearchSpaceFilter";

const DynamicMapSSR = dynamic(() => import("./Map"), { ssr: false });

interface ISearchSpaces {
  culturalSpaces: ICulturalSpaceModel[];
}

const SearchSpaces = ({ culturalSpaces }: ISearchSpaces) => {
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

  const {
    category,
    name,
    neighborhood,
    setCategory,
    setName,
    setNeighborhood,
    active,
    setActive,
  } = useSearchSpaceFilter();

  return (
    <div className="w-full">
      <div className="flex justify-center my-5 mb-10 ">
        <Filter
          searchAction={() =>
            filterSpaces(
              name,
              neighborhood,
              category,
              culturalSpaces,
              setActive
            )
          }
          inputItems={[
            <TextField
              label="Nome"
              placeholder="Nome do espaço cultural"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />,

            <TextField
              select
              style={{ minWidth: "150px" }}
              label="Bairros"
              value={neighborhood}
              onChange={(event) => setNeighborhood(event.target.value)}
            >
              {taquaraNeighborhoods.map((neighborhood, index: number) => {
                return (
                  <MenuItem key={index} value={neighborhood}>
                    {neighborhood}
                  </MenuItem>
                );
              })}
            </TextField>,

            <TextField
              style={{ minWidth: "150px" }}
              select
              label="Atuação"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
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
      </div>

      <div className="h-80 md:h-500px w-full flex justify-center mb-10">
        <div className="md:w-2/3 w-full h-full">
          <DynamicMapSSR culturalSpaces={active} action={setSpaceDialog} />
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
            <TagGroup
              mobileMaxCols={2}
              maxCols={2}
              tags={spaceDialog.category}
            />,

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

            spaceDialog?.website?.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 font-bold text-lg">Website</div>
                <div className="text-gray-500 text-sm">
                  {spaceDialog?.website}
                </div>
              </div>
            ) : null,

            spaceDialog?.instagram.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 font-bold text-lg">Instagram</div>
                <div className="text-gray-500 text-sm">
                  {spaceDialog?.instagram}
                </div>
              </div>
            ) : null,

            spaceDialog?.facebook.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 font-bold text-lg">Facebook</div>
                <div className="text-gray-500 text-sm">
                  {spaceDialog?.facebook}
                </div>
              </div>
            ) : null,

            spaceDialog?.publicPhone.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 font-bold text-lg">
                  Telefone 1
                </div>
                <div className="text-gray-500 text-sm">
                  {spaceDialog?.publicPhone}
                </div>
              </div>
            ) : null,

            spaceDialog?.publicPhoneAlt?.length > 0 ? (
              <div className="flex flex-col">
                <div className="text-gray-700 font-bold text-lg">
                  Telefone 2
                </div>
                <div className="text-gray-500 text-sm">
                  {spaceDialog?.publicPhoneAlt}
                </div>
              </div>
            ) : null,

            spaceDialog?.publicEmail?.length > 0 ? (
              <div className="flex flex-col mb-5">
                <div className="text-gray-700 font-bold text-lg">E-mail</div>
                <div className="text-gray-500 text-sm">
                  {spaceDialog?.publicEmail}
                </div>
              </div>
            ) : null,
          ],
          [
            <div className="flex flex-col">
              <div className="text-gray-700 font-bold text-lg">
                Sobre o local
              </div>
              <div className="text-gray-500 text-sm">
                {spaceDialog.description}
              </div>
            </div>,
          ],
        ]}
      />
    </div>
  );
};

export default SearchSpaces;
