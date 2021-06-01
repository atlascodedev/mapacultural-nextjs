import React from "react";
import GlobalContext from "./context";

export interface IGlobalUIConsumer {
  children(context): React.ReactNode;
}

const GlobalUIConsumer = ({ children }) => {
  return (
    <GlobalContext.Consumer>
      {(context) => {
        if (typeof context === "undefined") {
          throw new Error(
            "Component is not within a Global UI Context Provider"
          );
        }

        return children(context);
      }}
    </GlobalContext.Consumer>
  );
};

export default GlobalUIConsumer;
