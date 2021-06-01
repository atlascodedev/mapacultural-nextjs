import React from "react";

export interface ISearchDialogContainer {}

const Container: React.FC<ISearchDialogContainer> = ({ children }) => {
  return (
    <div
      style={{ maxWidth: "95%" }}
      className="bg-white flex h-500px md:h-600px md:max-w-800px min-w-90pc md:min-w-800px flex-col rounded-lg max "
    >
      {children}
    </div>
  );
};

export default Container;
