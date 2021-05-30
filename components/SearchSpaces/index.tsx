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
    closingHours: "",
    cpf_or_cpnj: "",
    culturalSpaceCapacity: "",
    culturalSpaceEntry: "Espaço público",
    culturalSpaceHead: "",
    culturalSpaceName: "",
    culturalSpaceSphere: "Empresa",
    description: "",
    entryTypes: "Acesso gratuito",
    neighborhood: "",
    open: false,
    openingHours: "",
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
        closeFn={() => console.log("ok")}
        BackdropProps={{ open: true }}
        content={[
          [
            { label: "", element: <UserLetter username="Matheus" /> },
            {
              label: "",
              element: (
                <div className="text-gray-700 font-bold">Alexandre Fritsch</div>
              ),
            },
            {
              label: "",
              element: (
                <TagGroup
                  truncate={2}
                  tags={["Feel", "Beatiful", "Something", "Real"]}
                />
              ),
            },
          ],
          [],
        ]}
      />
      {/* <Backdrop
        className="justify-center place-items-center"
        open={spaceDialog.open}
        closeFn={() =>
          setSpaceDialog((prevState) => {
            return { ...spaceDialog, open: false };
          })
        }
      >
        <div className="flex px-2 items-center justify-center">
          <div className="bg-white flex h-500px md:h-600px md:max-w-800px md:min-w-800px  flex-col rounded-lg max">
            <div className="bg-secondary-light rounded-t-lg p-4  flex">
              <div className="flex-grow"></div>
              <IoClose
                onClick={() =>
                  setSpaceDialog((prevState) => {
                    return { ...prevState, open: false };
                  })
                }
                className=" text-white text-xl cursor-pointer"
              />
            </div>

            <div className="flex flex-col md:flex-row overflow-y-scroll">
              <div className="flex flex-col gap-7 p-8">
                <div className="h-16 w-16 rounded-full bg-secondary-main p-5 relative flex justify-center items-center">
                  <div className="text-white font-black text-3xl ">
                    {spaceDialog.culturalSpaceName?.[0]?.toUpperCase() ?? "A"}
                  </div>
                </div>
                <div className="text-gray-800 font-bold text-2xl capitalize">
                  {spaceDialog.culturalSpaceName}
                </div>
                <div className="grid grid-flow-row md:grid-cols-3 grid-cols-2 gap-5">
                  {spaceDialog.category.map((category, index) => {
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
              </div>

              <div className="flex flex-col gap-7 p-8 md:p-12 border-gray-100 md:border-l"></div>
            </div>
          </div>
        </div>
      </Backdrop> */}
    </div>
  );
};

export default SearchSpaces;
