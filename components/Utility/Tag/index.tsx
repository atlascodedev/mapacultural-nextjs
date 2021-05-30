import React from "react";

export interface ITag {
  title: string;
}

const Tag = ({ title }: ITag) => {
  return (
    <div
      style={{ width: "fit-content" }}
      className="rounded-2xl text-xs  py-0.5 px-4 text-white font-black bg-tertiary-main flex justify-center items-center"
    >
      {title}
    </div>
  );
};

export default Tag;
