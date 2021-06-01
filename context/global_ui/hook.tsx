import React from "react";
import GlobalContext from "./context";

const useGlobalUI = () => {
  const context = React.useContext(GlobalContext);

  if (typeof context === "undefined") {
    throw new Error("Component is not within a Global UI Context provider.");
  }

  return context;
};

export default useGlobalUI;
