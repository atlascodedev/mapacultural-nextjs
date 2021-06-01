import React from "react";
import GlobalContext from "./context";
import globalUIReducer from "./reducer";
import { IGlobalState } from "./types";

const initialState: IGlobalState = {
  isLoading: false,
};

const GlobalUIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(globalUIReducer, initialState);

  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalUIProvider;
