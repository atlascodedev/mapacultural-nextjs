import { Tooltip } from "@material-ui/core";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

export interface ISearchCard {
  name: string;
  tags: string[];
  action: (...args: any[]) => void;
  actionName: string;
}

const SearchEventCard = ({ action, actionName, name, tags }: ISearchCard) => {
  return (
    <div
      style={{ backgroundColor: "#F7F7F7" }}
      className="w-80 shadow-xl rounded-t-md h-auto"
    >
      <div className="flex flex-col flex-grow  pt-5 px-8">
        <div className="flex">
          <div
            className={
              "rounded-full text-3xl h-10 w-10 text-white font-extrabold capitalize text-center bg-secondary-main p-8 flex justify-center items-center"
            }
          >
            {name[0].toUpperCase()}
          </div>
        </div>

        <div className="mb-20 mt-5">
          <div className="text-gray-900 font-bold mb-4 text-xl capitalize">
            {name}
          </div>
          <div className="flex gap-3">
            <button className="rounded-2xl focus:outline-none outline-none bg-tertiary-main text-white font-bold text-base px-5 py-0.5">
              {tags[0]}
            </button>

            <Tooltip
              title={
                <div className="flex flex-col p-1 gap-3 text-base">
                  {tags.map((value, index) => {
                    if (index !== 0) {
                      return <div key={index}>{value}</div>;
                    }
                  })}
                </div>
              }
            >
              <div className="bg-tertiary-dark cursor-pointer text-white w-10 h-7 flex justify-center items-center rounded-3xl">
                + {tags.length - 1}
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        onClick={action}
        className="w-full items-center px-8 cursor-pointer py-4 text-xl rounded-b-md flex gap-5 font-bold text-white bg-secondary-main focus:outline-none outline-none"
      >
        <div>{actionName}</div>
        <BsArrowRight className="text-white text-4xl leading-none " />
      </div>
    </div>
  );
};

export default SearchEventCard;
