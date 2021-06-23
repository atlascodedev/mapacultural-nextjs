import React from "react";
import { createSubArrays } from "../../helper/chunkArray";

function usePagination<T>(
  data: Array<T>,
  pageLimit: number,
  deps?: any[]
): {
  pages: Array<Array<T>>;
  activePage: Array<T>;
  activeIndex: number;
  setActivePage: (index: number) => void;
} {
  const [activePage, setActivePage] = React.useState<Array<T>>([]);
  const [pages, setPages] = React.useState<Array<T[]>>([]);
  const [activePageIndex, setActivePageIndex] = React.useState<number>(0);

  const setPageFunction = (index: number): void => {
    if (pages.length) {
      let newState = pages.filter((value, filterIndex) => {
        return filterIndex === index;
      });

      setActivePage([...newState[0]]);
      setActivePageIndex(index);
    } else {
      setActivePage([]);
    }
  };

  React.useEffect(() => {
    let chunkedArray = createSubArrays(pageLimit, data);
    setPages([...chunkedArray]);
  }, [...deps]);

  React.useEffect(() => {
    setPageFunction(0);
  }, [pages]);

  return {
    activePage: activePage,
    pages: pages,
    activeIndex: activePageIndex,
    setActivePage: setPageFunction,
  };
}

export default usePagination;
