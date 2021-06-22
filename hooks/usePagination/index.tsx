import React from "react";
import { createSubArrays } from "../../helper/chunkArray";

function usePagination<T>(
  data: Array<T>,
  pageLimit: number
): {
  pages: Array<Array<T>>;
  activePage: Array<T>;
  activeIndex: number;
  setActivePage: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
} {
  const [activePage, setActivePage] = React.useState<Array<T>>([]);
  const [pages, setPages] = React.useState<Array<T[]>>([]);
  const [activePageIndex, setActivePageIndex] = React.useState<number>(0);

  const setPageHelper = (index: number): void => {
    if (index > pages.length || index < 0) {
      return setActivePage([]);
    }

    let pagesCopy = pages;

    setActivePage(pagesCopy[index]);
    setActivePageIndex(index);
  };

  const nextPage = (): void => {
    if (pages.indexOf(activePage) === pages.length - 1) {
      return;
    } else {
      setPageHelper(pages.indexOf(activePage) + 1);
    }
  };

  const previousPage = (): void => {
    if (pages.indexOf(activePage) === 0) {
      return;
    } else {
      setPageHelper(pages.indexOf(activePage) - 1);
    }
  };

  React.useEffect(() => {
    setPages(createSubArrays(pageLimit, data));
    setPageHelper(0);
  }, []);

  React.useEffect(() => {
    setPageHelper(0);
  }, [data]);

  return {
    activePage: activePage,
    pages: pages,
    activeIndex: activePageIndex,
    setActivePage: setPageHelper,
    nextPage: nextPage,
    previousPage: previousPage,
  };
}

export default usePagination;
