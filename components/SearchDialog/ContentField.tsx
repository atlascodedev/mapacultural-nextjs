import React from "react";

export interface ISearchDialogContentField {
  label: string;
  element: JSX.Element;
}

const ContentField = ({ element, label }: ISearchDialogContentField) => {
  return (
    <div className="flex flex-col  gap-2">
      <div className="text-gray-800 font-bold text-2xl capitalize">{label}</div>
      {element}
    </div>
  );
};

export default ContentField;
