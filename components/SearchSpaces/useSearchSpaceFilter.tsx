import React from "react";
import Fuse from "fuse.js";
import { ICulturalSpaceModel } from "../Forms/types";

export const filterSpaces = (
  name: string,
  neighborhood: string,
  category: string,
  culturalSpaces: ICulturalSpaceModel[],
  callback: (...args: any[]) => void
) => {
  if (category === "Todos") {
    callback(culturalSpaces);
    return;
  }

  if (category && name.length <= 0 && neighborhood.length <= 0) {
    let spacesInternal: ICulturalSpaceModel[] = culturalSpaces.filter(
      (space, index) => {
        return space.category.includes(category as any);
      }
    );
    callback(spacesInternal);
    return;
  }

  if (category.length > 0 && neighborhood.length > 0 && name.length <= 0) {
    let spacesInternal: ICulturalSpaceModel[] = [];

    culturalSpaces.forEach((space, index) => {
      if (
        space.category.includes(category as any) &&
        space.neighborhood === neighborhood
      ) {
        spacesInternal.push(space);
      }
    });

    callback(spacesInternal);
    return;
  }

  if (name.length > 0) {
    const fuzzySpaceName = new Fuse(culturalSpaces, {
      keys: ["culturalSpaceName"],
    });
    const result = fuzzySpaceName.search(name);

    let spacesInternal: ICulturalSpaceModel[] = result.map((value, index) => {
      return value.item;
    });

    if (category.length <= 0 && neighborhood.length <= 0) {
      callback(spacesInternal);
      return;
    } else if (category.length > 0 && neighborhood.length <= 0) {
      let spacesInternalAndCategory = spacesInternal.filter((space, index) => {
        return space.category.includes(category as any);
      });

      callback(spacesInternalAndCategory);
      return;
    } else if (category.length > 0 && neighborhood.length > 0) {
      let spacesInternalAndCategoryNeighborhood = spacesInternal.filter(
        (space, index) => {
          return (
            space.category.includes(category as any) &&
            space.neighborhood === neighborhood
          );
        }
      );

      callback(spacesInternalAndCategoryNeighborhood);
      return;
    }
  }
};

const useSearchSpaceFilter = () => {
  const [name, setName] = React.useState<string>("");
  const [neighborhood, setNeighborhood] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("Todos");
  const [active, setActive] = React.useState<ICulturalSpaceModel[]>([]);

  return {
    active,
    name,
    neighborhood,
    category,
    setName,
    setNeighborhood,
    setCategory,
    setActive,
  };
};

export default useSearchSpaceFilter;
