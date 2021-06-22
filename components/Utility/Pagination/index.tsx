import React from "react";
import { createChunk } from "../../../helper/chunkArray";
import range from "../../../helper/range";
import PaginationButton from "./PaginationButton";
import TruncateButton from "./TruncateButton";

type PaginationList = Array<number | "truncate" | "first" | "last">;

interface IAtlasPagination {
  count: number;
}

// List should have the following structure

// ['first', 1, 2, 3 , 4, 5, 'truncate', 7, 8, 9, 10, 11, 'truncate', 12, 13, 14, 15, 16, 'last']
// First = Math.min(range(0, count))
// Last = Math.max(range(0, count))

function swapForSignals(array: any[]) {
  const structureSignals = {
    first: "FIRST",
    last: "LAST",
  };

  let tempArray = [...array];

  tempArray[0] = structureSignals.first;
  tempArray[tempArray.length - 1] = structureSignals.last;

  return tempArray;
}

function insertTruncation(array: any[], truncateAt: number = 5) {
  const chunkedArray = createChunk(truncateAt, array);

  const withTruncation = chunkedArray.map((chunk, index) => {
    return [...chunk, "TRUNCATE"];
  });

  withTruncation[withTruncation.length - 1].pop();

  return withTruncation;
}

function setActiveChunk(array: any[], index: number) {
  let slicedArray = [];

  if (index - 1 <= 0) {
    slicedArray = array.slice(index + 1, index + 6);
  } else {
    slicedArray = array.slice(index - 1, index + 4);
  }

  let tempArray = ["FIRST", ...slicedArray, "LAST"];
}

const generatePaginatedStructure = (totalPages: number) => {
  const rangeFromTotal = range(0, totalPages);

  const signaledArray = swapForSignals(rangeFromTotal);

  const withTruncation = insertTruncation(signaledArray, 3);

  const flattenedTruncation = withTruncation.flat();
};

// generatePaginatedStructure(25);

function AtlasPagination({ count }: IAtlasPagination) {
  const [active, setActive] = React.useState<number>(0);
  const [buttonList, setButtonList] = React.useState<PaginationList>([]);
  const [activeButtonList, setActiveButtonList] =
    React.useState<PaginationList>([]);

  React.useEffect(() => {}, []);

  return (
    <div className="flex gap-5">
      {activeButtonList.map((value, index) => {
        if (value == "truncate") {
          return <TruncateButton key={index} />;
        } else {
          return (
            <PaginationButton
              key={index}
              active={active === index}
              action={() => {
                setActive(index);
              }}
              label={(index + 1).toString()}
            />
          );
        }
      })}
    </div>
  );
}

export default AtlasPagination;
