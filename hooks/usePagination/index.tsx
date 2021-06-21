import React from "react";
import { createSubArrays } from "../../helper/chunkArray";

function usePagination<T>(
  data: Array<T>,
  pageLimit: number
): {
  pages: Array<Array<T>>;
  activePage: Array<T>;
  setActivePage: React.Dispatch<React.SetStateAction<T[]>>;
} {
  const [activePage, setActivePage] = React.useState<Array<T>>([]);
  const [pages, setPages] = React.useState<Array<T[]>>([]);

  React.useEffect(() => {
    setPages(createSubArrays(pageLimit, data));
    setActivePage(pages[0]);
  }, []);

  const nextPage = (): void => {
    if (pages.indexOf(activePage) === pages.length - 1) {
      return;
    } else {
      setActivePage(pages[pages.indexOf(activePage) + 1]);
    }
  };

  const previousPage = (): void => {
    if (pages.indexOf(activePage) === 0) {
      return;
    } else {
      setActivePage(pages[pages.indexOf(activePage) - 1]);
    }
  };

  return { activePage: activePage, pages: pages, setActivePage: setActivePage };
}

export default usePagination;
