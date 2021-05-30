import React from "react";
import ContentField from "./ContentField";

export interface ISearchDialogContent {
  content: Array<{ label: string; element: JSX.Element }[]>;
}

const Content = ({ content }: ISearchDialogContent) => {
  return (
    <div className="flex flex-col md:flex-row overflow-y-scroll">
      {content.map((recordArray, index) => {
        return (
          <div key={index} className="flex flex-col gap-7 p-8">
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
