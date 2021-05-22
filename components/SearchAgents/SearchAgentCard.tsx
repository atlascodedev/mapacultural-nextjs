import React from "react";
import { BsArrowRight } from "react-icons/bs";

export interface ISearchAgentCard {}

const SearchAgentCard = (props: ISearchAgentCard) => {
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
            A
          </div>
        </div>

        <div className="mb-20 mt-5">
          <div className="text-gray-900 font-bold mb-4 text-xl">
            Antonio Lucas Bastos Francisco de Lima
          </div>
          <div>
            <button className="rounded-2xl focus:outline-none outline-none bg-tertiary-main text-white font-bold text-base px-5 py-0.5">
              Literatura
            </button>
          </div>
        </div>
      </div>
      <div className="w-full items-center px-8 cursor-pointer py-4 text-xl rounded-b-md flex gap-5 font-bold text-white bg-secondary-main focus:outline-none outline-none">
        <div>Ver perfil</div>
        <BsArrowRight className="text-white text-4xl leading-none " />
      </div>
    </div>
  );
};

export default SearchAgentCard;
