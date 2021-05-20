import React from "react";
import lockPageScroll from "../../helper/lockPageScroll";

const useDocumentBodyLock = (predicate: boolean) => {
  React.useEffect(() => {
    lockPageScroll(predicate);
  }, [predicate]);
};

export default useDocumentBodyLock;
