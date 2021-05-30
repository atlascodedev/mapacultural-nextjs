import React from "react";
import ContentField from "./ContentField";

export interface ISearchDialogContent {
  content: Array<{ label: string; element: JSX.Element }[]>;
}

const Content = ({ content }: ISearchDialogContent) => {
  return (
    <div className="flex flex-col md:flex-row overflow-y-scroll h-full ">
      {content.map((recordArray, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:w-1/2 gap-7 p-8 h-full border-l border-gray-200"
          >
            {recordArray.map((record, index) => {
              return (
                <ContentField
                  key={index}
                  element={record.element}
                  label={record.label}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Content;
