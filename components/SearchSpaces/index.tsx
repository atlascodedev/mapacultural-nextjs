import React from "react";
import dynamic from "next/dynamic";
import Filter from "../Utility/Filter";
import { MenuItem, TextField } from "@material-ui/core";
import { categories, taquaraNeighborhoods } from "../../constants";
import { ICulturalSpaceModel } from "../../@types/project";
import Backdrop from "../Utility/Backdrop";
import { IoClose } from "react-icons/io5";
import { ISearchSpaceMap } from "./Map";
import SearchDialog from "../SearchDialog";
import UserLetter from "../Utility/UserLetter";
import Tag from "../Utility/Tag";
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
            {
              label: "",
              element: <UserLetter username={spaceDialog.culturalSpaceName} />,
            },
            {
              label: "",
              element: <TagGroup tags={spaceDialog.category} />,
            },
            {
              label: "Horário de funcionamento",
              element: <div></div>,
            },
          ],
        ]}
      />
    </div>
  );
};

export default SearchSpaces;
