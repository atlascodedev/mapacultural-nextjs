import React from "react";
import { createSubArrays } from "../../helper/chunkArray";

function usePagination<T>(
  data: Array<T>,
  pageLimit: number
): {
  pages: Array<Array<T>>;
  activePage: Array<T>;
  setActive: React.Dispatch<React.SetStateAction<T[]>>;
} {
  const [activePage, setActivePage] = React.useState<Array<T>>([]);
  const [pages, setPages] = React.useState<Array<T[]>>([]);

  React.useEffect(() => {
    setPages(createSubArrays(pageLimit, data));
    setActivePage(pages[0]);
  }, []);

  return { activePage: activePage, pages: pages, setActive: setActivePage };
}

export default usePagination;
