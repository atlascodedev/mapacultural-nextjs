import React from "react";
import GlobalContext from "./context";

interface IUseGlobalUI {}

const useGlobalUI = ({}: IUseGlobalUI) => {
  const context = React.useContext(GlobalContext);

  if (typeof context === "undefined") {
    throw new Error("Component is not within a Global UI Context provider.");
  }

  return context;
};

export default useGlobalUI;
