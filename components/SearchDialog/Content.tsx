import React from "react";
import ContentField from "./ContentField";

export interface ISearchDialogContent {
  content: Array<JSX.Element[]>;
}

const Content = ({ content }: ISearchDialogContent) => {
  return (
    <div className="flex flex-col md:flex-row overflow-y-scroll h-full my-8  ">
      {content.map((recordArray, index) => {
        return (
          <div
            key={index}
            className="flex flex-col md:w-1/2 gap-7 p-8 py-2 md:py-8   md:h-full h-auto border-l border-gray-200"
          >
            {recordArray.map((record, index) => {
              if (record) {
                return <div key={index}>{record}</div>;
              } else {
                null;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Content;
