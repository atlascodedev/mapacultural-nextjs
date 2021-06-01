import React from "react";
import { DispatchGlobalUI, IGlobalState } from "./types";

const GlobalContext =
  React.createContext<
    { state: IGlobalState; dispatch: DispatchGlobalUI } | undefined
  >(undefined);

export default GlobalContext;
