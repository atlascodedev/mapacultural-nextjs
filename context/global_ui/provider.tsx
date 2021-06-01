import React from "react";
import GlobalContext from "./context";
import globalUIReducer from "./reducer";
import { IGlobalState } from "./types";

const initialState: IGlobalState = {
  isLoading: false,
  feedbackOpen: false,
};

const GlobalUIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(globalUIReducer, initialState);

  const store = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export default GlobalUIProvider;
