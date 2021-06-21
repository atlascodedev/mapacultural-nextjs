import React from "react";
import { createSubArrays } from "../../helper/chunkArray";

function usePagination<T>(
  data: Array<T>,
  pageLimit: number
): {
  pages: Array<Array<T>>;
  activePage: Array<T>;
  setActivePage: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
} {
  const [activePage, setActivePage] = React.useState<Array<T>>([]);
  const [pages, setPages] = React.useState<Array<T[]>>([]);

  const setPage = (index: number): void => {
    if (index > pages.length || index < 0) {
      return;
    }

    setActivePage(pages[index]);
  };

  const nextPage = (): void => {
    if (pages.indexOf(activePage) === pages.length - 1) {
      return;
    } else {
      setPage(pages.indexOf(activePage) + 1);
    }
  };

  const previousPage = (): void => {
    if (pages.indexOf(activePage) === 0) {
      return;
    } else {
      setPage(pages.indexOf(activePage) - 1);
    }
  };

  React.useEffect(() => {
    setPages(createSubArrays(pageLimit, data));
    setPage(0);
  }, []);

  React.useEffect(() => {
    setPage(0);
  }, [data, pages]);

  return {
    activePage: activePage,
    pages: pages,
    setActivePage: setPage,
    nextPage: nextPage,
    previousPage: previousPage,
  };
}

export default usePagination;
